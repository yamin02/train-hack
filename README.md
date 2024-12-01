
## 🚂 Bangladesh Railway Ticket Hacking Toolkit 🎫

### 🔥 Ultimate Ticket Booking Automation Script 🔥

### 🖥️ Compatibility
- 🐧 **Linux Users**: `new.js`
- 💻 **Windows Users**: `hack-windows.js`

### 🛠️ Setup & Installation

1. **Dependencies Deployment**
```bash
npm install
```

### 🔐 Configuration Customization

#### Personal Credentials
Replace the placeholders with your authentication details:

```javascript
.then(() => page.type("#mobile_number", "[YOUR MOBILE NUMBER]"))
.then(() => page.type("#password", "[YOUR SECRET PASSWORD]"))
```

#### 🗺️ Route & Travel Specifications
Customize your journey parameters:

```javascript
const routes = ["Dhaka", "Chattogram"];
const date = "20-Oct-2024";

var selectorBtn = '[Selector Button of Train Type]';
var page2 = await browser.newPage();
page2.setDefaultTimeout(30 * 1000);
await page2
  // Additional configuration steps
.then(() => page2.select("#select-bogie", "[Get the Bogie Number]")) 
```

### 🚀 Execution

```bash
node hack-windows.js
```

### ⚠️ Disclaimer
- Use responsibly
- Respect railway booking system policies
- For educational purposes only

### 🛡️ Security Note
- Never share your actual credentials
- Use unique, strong passwords
- Consider ethical implications of automated booking

---

### 🤖 Troubleshooting
- Ensure latest Node.js version
- Check network connectivity
- Verify site's current structure matches selectors
- Check the path of chromium installion

Enjoy your automated ticket booking adventure! 🎉🚉
