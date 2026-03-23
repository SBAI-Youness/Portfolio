---
title: "Confidential"
platform: "TryHackMe"
difficulty: "Easy"
date: "2026-03-23"
tags: ["forensics", "pdf", "qrcode"]
excerpt: "We got our hands on a confidential case file from some self-declared \"black hat hackers\"... it looks like they have a secret invite code."
icon: "https://tryhackme-images.s3.amazonaws.com/room-icons/6c9609e592b4ac47833804790222c091.png"
roomUrl: "https://tryhackme.com/room/confidential"
---

## 🧾 Room Description

We got our hands on a confidential case file from some self-declared "black hat hackers".
It looks like they have a **secret invite code hidden inside a QR code**, but it’s covered by an image in a PDF.

👉 Our goal is to uncover what that QR code contains.

---

## 🔍 Initial Analysis

The challenge provides a **PDF file**.
You can either use the **AttackBox** from TryHackMe or your own machine (e.g., Kali Linux).
If needed, the file can be transferred using tools like `nc`.

First, I checked the file type:

```bash
file Repdf.pdf
```

![File Command Screenshot](/assets/writeups/thm-rooms/confidential/file.png)

### 📌 Result

The file is identified as a normal PDF.
Nothing unusual is revealed at this stage.

---

## 👀 Inspecting the PDF

I opened the PDF to examine its contents.

![PDF View Screenshot](/assets/writeups/thm-rooms/confidential/pdf_view.png)

### 📌 Observation

* A **QR code** is visible
* Part of it is covered by a **red triangle**

👉 This suggests the QR code is intentionally being hidden.

---

## 🧠 Investigating Further

Since PDFs can contain multiple images and layers, I decided to extract all embedded images.

```bash
pdfimages -j Repdf.pdf images
```

![pdfimages Screenshot](/assets/writeups/thm-rooms/confidential/pdfimages.png)

### 📌 Extracted Images

The command generated multiple images:

* `images-000.ppm` → QR code + background
* `images-001.ppm` → red triangle
* `images-002.ppm` → extra/empty

---

## 🔑 Key Discovery

I opened the main image:

```bash
xdg-open images-000.ppm
```

![Clean QR Screenshot](/assets/writeups/thm-rooms/confidential/clean_qr.png)

### 📌 Result

The QR code is fully visible without the triangle.

👉 This confirms:

* The triangle is a **separate image layer**
* It was placed on top to **hide the QR code**

---

## 📱 Decoding the QR Code

I scanned the clean QR code using my phone and found the flag.

![QR Scan on Phone Screenshot](/assets/writeups/thm-rooms/confidential/qr_scan_phone.png)

Alternative methods include using a script or an online QR code scanner.

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExanJoMWdmeGJwbmM1OWIxcnYwZWNvNGdsa2JqaHB6azg1cmExcnV0aCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/26tPnAAJxXTvpLwJy/giphy.gif" width="400" className="mx-auto rounded-lg shadow-lg my-6">

---

## 📚 What I Learned

* PDFs can contain **multiple embedded images**
* Layers can be used to **hide important data**
* `pdfimages` is useful for extracting hidden content
* Always analyze files beyond what is immediately visible

---

## 🏁 Conclusion

This challenge was simple but effective.
The QR code was not encrypted or encoded in a complex way - it was just **visually hidden**.
By extracting the images inside the PDF, the obstruction was removed and the hidden data became clear.

👉 Sometimes the solution is not about exploitation —
it’s just **looking deeper at what’s already there**.
