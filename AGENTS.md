# Project Instructions & Deployment Guide: HeySis PWA

## 🚀 Deployment Instructions (Firebase Hosting)

### Production Deployment
* **Firebase Project ID:** (configured via `firebase use`)
* **Standard Deployment:**
```bash
npm run deploy
```

---

### ⚠️ macOS Node.js Note (If multiple versions installed)
If you have multiple Node.js versions (e.g. experimental Node 26 + LTS Node 20) and Firebase CLI OAuth encounters localhost issues:
- Run with LTS: `/usr/local/bin/node /opt/homebrew/bin/firebase` (or `npm run deploy:local`).
