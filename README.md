# Smart Utility Toolkit (Lab Assignment 1)

A collection of lightweight Node.js utilities built strictly with Node.js core modules (`process`, `http`, `fs`, `crypto`).

---

## Folder Structure

```
Assignment-1/
├── calculator.js
├── app.js
├── server.js
├── fileManager.js
├── dice.js
├── test.txt
├── modules/
│   ├── isEven.js
│   └── logger.js
└── README.md
```

---

## Commands to Run

### 1. Calculator
```bash
node calculator.js add 10 5
node calculator.js sub 10 4
node calculator.js mul 6 7
node calculator.js div 20 4
```

### 2. Custom Modules Demo
```bash
node app.js
```

### 3. HTTP Server
```bash
node server.js
```
Open in browser or test via curl:
- `http://localhost:3000/`
- `http://localhost:3000/about`
- `http://localhost:3000/contact`

### 4. File Manager
```bash
node fileManager.js
```

### 5. Dice Generator
```bash
node dice.js
node dice.js 3
```
