---
title: "Agent T"
platform: "TryHackMe"
difficulty: "Easy"
date: "2026-02-19"
tags: ["web", "linux"]
excerpt: "Something seems a little off with the server."
icon: "https://tryhackme-images.s3.amazonaws.com/room-icons/5dbc4e7d8515e7bc05b7742f26944ae9.png"
roomUrl: "https://tryhackme.com/room/agentt"
---

## 🔍 Initial Access

Since the room description immediately suggests a website, the first
instinct is to visit the target IP in the browser and inspect the
application manually.

However, proper enumeration is critical, so we begin with a service
version scan to confirm which services are exposed.

### 🔎 Service Enumeration

``` bash
nmap -sV <TARGET_IP>
```

![Nmap Scan Screenshot](/assets/writeups/agentt/scan.png)

From the scan results, we observe that **port 80 (HTTP)** is open.

More importantly, the service version reveals that the server is running
**PHP 8.1.0-dev** using the CLI server.\
The presence of the *"dev"* tag is unusual and immediately suspicious,
as development builds should never be exposed in production
environments.

------------------------------------------------------------------------

### 🌐 Web Enumeration

Since HTTP is open, we now browse to the target IP.

![Website Screenshot](/assets/writeups/agentt/website.png)

The page appears to be a simple themed website. Inspecting the source
code does not reveal any obvious vulnerabilities.

Clicking through the available links shows that most of them are
non-functional, suggesting this is more of a template page than a fully
developed web application.

------------------------------------------------------------------------

### 📂 Directory Enumeration

To ensure nothing is hidden, we perform directory brute-forcing:

``` bash
gobuster dir -u http://<TARGET_IP> -w /usr/share/wordlists/dirb/common.txt
```

![FFUF Scan Screenshot](/assets/writeups/agentt/directory_enumeration.png)

No additional directories or hidden endpoints are discovered.

------------------------------------------------------------------------


### 💥 Exploitation

Given the suspicious **PHP 8.1.0-dev** version discovered earlier, we research known vulnerabilities associated with it.

A publicly available exploit exists for this development build on Exploit-DB:

https://www.exploit-db.com/exploits/49933

This exploit targets a backdoor present in early PHP 8.1 development versions and allows remote command execution.

We download the exploit and save it as:

``` bash
web-exploit.py
```

Then execute it:

``` bash
python3 web-exploit.py
```

![Exploit Execution Screenshot](/assets/writeups/agentt/exploit.png)

Successful execution grants command execution on the target system.

------------------------------------------------------------------------

### 🏁 Capturing the Flag

With command execution established, we enumerate the filesystem and
locate the flag file:

``` bash
/flag.txt
```

![Flag Screenshot](/assets/writeups/agentt/flag.png)

The user flag is successfully retrieved.