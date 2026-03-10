---
title: "Ronaldinho"
platform: "CTF"
difficulty: "Easy"
category: "osint"
ctfName: "ST4F1T"
date: "2026-03-09"
tags: ["osint"]
excerpt: "3ndak idriblik Ronaldinho"
---
------------------------------------

# ST4F1T - Ronaldinho

## Challenge Description

Opening the challenge page shows the following description:

![Challenge Page](/assets/writeups/ctf/st4f1t/osint/ronaldinho/ronaldinho.png)

A download button provides an image related to the challenge.

---

## The Provided Image

The downloaded file contains an image of Ronaldinho dribbling during a match against Arsenal.

![Ronaldinho Image](/assets/writeups/ctf/st4f1t/osint/ronaldinho/ronaldinho_image.png)

Since the challenge looked like a typical steganography task, the first step was analyzing the image.

---

## Initial Analysis

Common steganography checks were performed:

* `steghide extract`
* `exiftool`
* `strings`
* metadata inspection

None of these revealed any hidden data.

At this point, the image appeared to be a **distraction**.

---

## Rethinking the Hint

The author later gave a hint:

> once you open the image, ronaldinho dribbled you

This suggests that the image might **mislead the player**, just like a dribble in football.

So instead of focusing on the image, the next step was inspecting the **challenge page itself**.

---

## Inspecting the Page

Using the browser developer tools reveals something unusual inside the challenge description.

![Inspect Hidden Characters](/assets/writeups/ctf/st4f1t/osint/ronaldinho/inspect.png)

Inside the HTML we can see many strange entities such as:

```
&zwnj;  &zwj;  &#xFEFF;  &#x200C;
```

These are **zero-width Unicode characters**.

---

## What Are Zero-Width Characters?

Zero-width characters are special **Unicode characters that exist in text but are not visible when rendered**.  
They occupy **no visual space**, which means the text appears completely normal to the user.

Example characters used in this challenge:

| Character | Name                         | Unicode |
|-----------|------------------------------|---------|
| `&zwnj;`  | Zero Width Non-Joiner        | U+200C  |
| `&zwj;`   | Zero Width Joiner            | U+200D  |
| `&#xFEFF;`| Zero Width No-Break Space    | U+FEFF  |

<br>

Because these characters are invisible, the page visually displays:
```
3ndak idriblik Ronaldinho
```

However, the actual HTML text contains **many hidden zero-width characters inserted between the words**, which can be used to store hidden data.

---

## How Data Is Hidden

These invisible characters can be used to encode binary data.

A simple mapping is used:

```
ZWJ  → 1
ZWNJ → 0
```

A sequence of these characters forms **binary values**, which can then be converted into ASCII text.

This technique is called **zero-width steganography**.

---

## Extracting the Hidden Data

To retrieve the hidden message:

1. Copy the full text containing the invisible characters.
2. Decode the sequence of zero-width characters.
3. Convert the resulting binary into text.

This reveals the **flag**.

---

## Solution

The flag was hidden using **zero-width Unicode characters inside the challenge description**, not inside the image.

Key idea:

* The image was a distraction.
* The real payload was hidden in the **HTML text using invisible characters**.

---

## Takeaway

Always inspect the **HTML source or page content** in OSINT and web challenges.

Sometimes the hidden data is not inside the provided files but directly embedded in the webpage itself.
