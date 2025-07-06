# UGC NET Answer Checker Chrome Extension

![License](https://img.shields.io/github/license/VikasKumarPatel/UGC-NET-Answer-Checker)
![Version](https://img.shields.io/badge/version-1.0-blue)

A Chrome extension to help UGC NET aspirants automatically compare their submitted answers with the official answer key, calculate marks, and export results to a CSV file.

---

## 📦 Features
- ✅ Fetch correct answers from UGC NET official portal.
- 📥 Upload saved answer sheet (HTML).
- 🔢 Calculate correct answers and marks.
- 📊 Show detailed result summary (Paper 1 & 2).
- 📄 Export data as CSV.

---

## 🧰 Requirements
- Google Chrome Browser
- Extension works locally — no data is sent to external servers.

---

## 🚀 Installation & Usage

### Option 1: Download Prebuilt Release (Recommended)
1. Go to the [Releases](https://github.com/VikasKumarPatel/UGC-NET-Answer-Checker/releases) page.
2. Download the latest `.zip` file (e.g., `ugcnet-extension-1.0.zip`).
3. Extract the ZIP file to a folder.
4. Open Chrome and go to `chrome://extensions/`
5. Enable **Developer Mode** (top right corner).
6. Click **Load Unpacked** and select the extracted folder.

### Option 2: Clone or Download the Repository Manually
```
git clone https://github.com/your-username/ugc-net-answer-checker.git
```
Then follow steps 4–6 above to load the extension.

### 3. Use the Extension
1. Visit the UGC NET answer key page.
2. Click the extension icon → **Fetch Correct Answers**.
3. Upload your saved answer sheet HTML → **Upload Your Answer Sheet**.
4. Click **Process & Export Result**.
5. View your marks and download CSV result.

---

## 📝 CSV Format
Each row in the CSV file contains:
- Serial Number
- Question Number
- Question ID
- Selected Option
- Correct Option
- Marks (2 for correct, 0 for wrong)

[//]: # (---)

[//]: # (## 📂 Repository Structure)

[//]: # (```)

[//]: # (ugc-net-answer-checker/)

[//]: # (├── manifest.json)

[//]: # (├── popup.html)

[//]: # (├── popup.js)

[//]: # (├── background.js)

[//]: # (├── content.js)

[//]: # (├── icons/)

[//]: # (│   └── icon.png)

[//]: # (```)

[//]: # (---)

[//]: # (## 📸 Screenshots)

[//]: # (_Add your screenshots here if needed._)

---

## 🧑‍💻 Credits
Developed by [Vikas Kumar Patel](https://github.com/vikasKumarPatel)

Follow me:
- 🔗 [GitHub](https://github.com/vikasKumarPatel)
- 💼 [LinkedIn](https://www.linkedin.com/in/vikaskumarpatel1080/)
- 📸 [Instagram](https://www.instagram.com/haccrac/)
- ▶️ [YouTube](https://www.youtube.com/c/cyberguardian)

---

## 📃 License
This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing
Pull requests are welcome! Feel free to fork the repo and submit changes via PR.
