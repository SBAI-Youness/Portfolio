---
title: "Intro"
platform: "CTF"
difficulty: "Easy"
category: "rev"
ctfName: "ST4F1T"
date: "2026-03-08"
tags: ["rev", "ghidra", "xor"]
excerpt: "Kaychbh ldakchi li drna f lbootcamp la?"
---

# ST4F1T - Intro

## Challenge Description

We are given a binary file named `intro`.

---

## Initial Recon

### File Inspection
Start by identifying the binary:

```bash
file intro
```

![File Command Output Screenshot](/assets/writeups/ctf/st4f1t/rev/intro/file.png)

### Why this matters
- **ELF 64-bit** → standard Linux executable for x86-64 systems  
- **PIE (Position Independent Executable)** → addresses are randomized at runtime (ASLR), but this doesn’t affect static analysis  
- **Dynamically linked** → uses shared libraries (like libc)  
- **Not stripped** → very important, function names and symbols are still present → makes reversing much easier  

👉 From this alone, we know this binary will be easy to analyze statically.

---

## Strings Analysis
Next step:
```bash
strings intro
```
![Strings Command Output Screenshot](/assets/writeups/ctf/st4f1t/rev/intro/strings.png)

### Why use strings?
This quickly reveals:
- hardcoded messages
- function names
- hints about program behavior

### Interesting findings
- `SHOW_FAKE_FLAG`
- `fake_flag`
- The printed message

👉 This suggests:
- The program likely checks an environment variable
- There may be a fake vs real behavior

---

## Running the Program
```bash
./intro
```

![Program Execution Screenshot](/assets/writeups/ctf/st4f1t/rev/intro/execution.png)

When running the program, we waited for it to finish execution.
However, at the end we didn’t get anything meaningful.
The program simply displays a message and then exits after a delay, without revealing anything else.

### Why this matters
- No interactive input required  
- No obvious flag printed  
- The delay suggests the program is intentionally slowing down analysis  
- This pushes us toward deeper inspection tools  

---

## Dynamic Analysis with ltrace
```bash
ltrace ./intro
```

![ltrace Screenshot](/assets/writeups/ctf/st4f1t/rev/intro/ltrace.png)

### Why use ltrace?
It shows runtime library calls such as:
- environment variable checks  
- output functions  
- delays  

### Observations
- The binary checks `SHOW_FAKE_FLAG`
- Since it is not set, it prints only the message
- `sleep(30)` is just used to slow analysis

---

## Testing the Environment Variable
```bash
SHOW_FAKE_FLAG=1 ./intro
```

![Environment Variable Testing Screenshot](/assets/writeups/ctf/st4f1t/rev/intro/env_testing.png)

This reveals a **fake flag**, confirming:
- environment variable controls a decoy path  
- this is not the real solution  

---

## Static Analysis with Ghidra
We open the binary in Ghidra.

### Why Ghidra?
Because runtime analysis only shows limited behavior.
Static analysis helps uncover:
- hidden functions  
- unused code paths  
- real flag logic  

### Main Function
```c
undefined8 main(void)
{
  char *pcVar1;

  pcVar1 = getenv("SHOW_FAKE_FLAG");
  if (pcVar1 != (char *)0x0) {
    puts(fake_flag);
  }
  puts("ghi 9lb chwiya wghatl9ah");
  sleep(0x1e);
  return 0;
}
```

![Main Function Screenshot](/assets/writeups/ctf/st4f1t/rev/intro/main.png)

#### What we do here
We first reconstruct program logic from the decompiled view:
- identify calls like `getenv`  
- check conditional branches  
- understand execution flow  

#### Key observation
- The fake flag is only printed if `SHOW_FAKE_FLAG` is set  
- The real flag is not referenced anywhere in `main`  

👉 So `main` is intentionally incomplete from a solver’s perspective.

### Hidden Function: reveal_real_flag
```c
void reveal_real_flag(void)
{
  byte local_38 [23];
  undefined1 local_21;
  undefined1 local_11;
  ulong local_10;

  local_11 = 0x5a;
  for (local_10 = 0; local_10 < 0x17; local_10 = local_10 + 1) {
    local_38[local_10] = real_flag_xor[local_10] ^ 0x5a;
  }
  local_21 = 0;
  puts((char *)local_38);
  return;
}
```

![Hidden Function Screenshot](/assets/writeups/ctf/st4f1t/rev/intro/hidden_function.png)

#### What we do here
We inspect all discovered functions and focus on ones that:
- are not referenced in `main`  
- contain suspicious logic (loops, XOR, buffers)  

#### What we find
This function:
- reads a byte array (`real_flag_xor`)  
- applies XOR with `0x5a`  
- prints the result  

#### Why this matters
- This is clearly the real flag generator  
- However, it is never called during execution  

👉 That means we must extract the data manually.

### Extracting Encoded Data
From `.flagdata` section:
![real_flag_xor Screenshot](/assets/writeups/ctf/st4f1t/rev/intro/real_flag_xor.png)

#### What we do here
We locate the `.flagdata` section and:
- identify the byte array used by `reveal_real_flag`  
- copy all 23 bytes exactly (based on loop bound `0x17`)  

```text
09 0e 6e 1c 6b 0e 21 28 3f 2c 05 29 6e 32 36 05 2d 6e 63 33 36 6e 27
```

#### Why this works
The loop in the function defines exactly how many bytes are used, so this section is the encoded flag storage.

### Decoding the Flag
```python
data = [0x09,0x0e,0x6e,0x1c,0x6b,0x0e,0x21,0x28,0x3f,0x2c,
        0x05,0x29,0x6e,0x32,0x36,0x05,0x2d,0x6e,0x63,0x33,
        0x36,0x6e,0x27]

flag = ''.join(chr(b ^ 0x5a) for b in data)
print(flag)
```

#### What we do here
We reverse the XOR operation:
- each byte was encoded using XOR with `0x5a`  
- XOR is reversible, so applying it again restores the original text  

![Flag Decoding Screenshot](/assets/writeups/ctf/st4f1t/rev/intro/flag_decoding.png)

---

## Takeaway
- `file` reveals binary structure and constraints
- `strings` gives early hints
- running the program shows limited visible behavior
- `ltrace` exposes environment variable logic
- Ghidra reveals hidden functions not executed in runtime
- XOR is a common obfuscation technique

---

## Final Thoughts
The program is intentionally misleading at runtime.
The real flag is not shown during execution and must be recovered through static analysis and decoding hidden data.
