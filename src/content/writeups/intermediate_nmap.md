---
title: "Intermediate Nmap"
platform: "TryHackMe"
difficulty: "Easy"
date: "2026-02-23"
tags: ["nmap", "ssh", "netcat", "linux"]
excerpt: "Can you combine your great nmap skills with other tools to log in to this machine?"
icon: "https://tryhackme-images.s3.amazonaws.com/room-icons/01aff3c76024f34b0582ad59e2138bfd.png"
roomUrl: "https://tryhackme.com/room/intermediatenmap"
---

## 🔍 Initial Enumeration

Since the room name hints directly at **Nmap**, we begin with a full
port scan to understand the attack surface.

### 🔎 Service Enumeration

``` bash
nmap -sV <TARGET_IP>
```

![Nmap Full Scan Screenshot](/assets/writeups/intermediate_nmap/scan.png)

From the scan results, we discover:

-   **Port 22** → SSH
-   **Port 2222** → Another SSH service
-   **Port 31337** → Unknown service

Even better, Nmap reveals credentials for the service on port 31337:

Username: ubuntu\
Password: Dafdas!!/str0ng

This is a strong indicator that these credentials will be useful later.

------------------------------------------------------------------------

## 🔌 Investigating Port 31337

We connect to the service manually to confirm its behavior.

``` bash
nc <TARGET_IP> 31337
```

![Port 31337 Netcat Screenshot](/assets/writeups/intermediate_nmap/netcat_connection_to_port_31337.png)

The service responds, confirming the Nmap output.
However, it does not directly provide a shell or flag.

Since we now have credentials, the logical next step is to test them
against the available SSH services.

------------------------------------------------------------------------

## 🔐 Gaining SSH Access

``` bash
ssh ubuntu@<TARGET_IP> -p 22
```

![SSH 22 Successful Login Screenshot](/assets/writeups/intermediate_nmap/ssh_connection.png)

Authentication succeeds and we gain shell access using the provided credentials.

------------------------------------------------------------------------

## 🗂 Post-Login Enumeration

With shell access established, we begin basic Linux enumeration:

- Inspect current directory  
- List available users  
- Check other home directories  

![User Enumeration Screenshot](/assets/writeups/intermediate_nmap/user_enum.png)

While exploring the filesystem, we discover another user's home
directory containing the flag file.

------------------------------------------------------------------------

## 🏁 Capturing the Flag

Navigating to the discovered directory reveals the flag:

![Flag Screenshot](/assets/writeups/intermediate_nmap/flag.png)

The flag is successfully retrieved.