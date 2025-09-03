Secret Reconstruction using Lagrange Interpolation

This project implements Shamir’s Secret Sharing reconstruction in JavaScript, where the secret (constant term c) is recovered using Lagrange interpolation at x = 0.

It supports:

Shares in multiple bases (binary, octal, decimal, hex, etc.)

BigInt arithmetic for very large numbers

Reconstruction from JSON input

📌 Problem Statement

We are given shares of a polynomial in JSON format:

Each share has an index (x) and a value (y) stored in some base-N.

At least k shares are required to reconstruct the secret.

The secret corresponds to the constant term (c) of the polynomial.

🧮 How It Works

Convert base-N encoded values to BigInt.

Parse into (x, y) pairs.

Apply Lagrange interpolation formula at x = 0.

Output the reconstructed secret.

📝 Example Input
{
  "keys": { "n": 4, "k": 3 },
  "1": { "base": "10", "value": "4" },
  "2": { "base": "2", "value": "111" },
  "3": { "base": "10", "value": "12" },
  "6": { "base": "4", "value": "213" }
}

✅ Example Output
Test Case 1 — Reconstructed secret: 3
Test Case 2 — Reconstructed secret: -6290016743746469796


⚠️ Note: Negative values appear because interpolation is done with raw integers. In real cryptographic use, this would be computed mod a large prime.

🚀 Run the Code

Clone this repo

Run with Node.js:

node main.js

📂 Project Files

main.js → Implementation of base conversion, share parsing, and Lagrange interpolation

testcases.json → Example test cases

🎯 Applications

Cryptography

Shamir’s Secret Sharing (SSS)

Polynomial interpolation
