# Lukash Tirkey - Professional Portfolio & Resume

This repository contains my personal portfolio website and professional resume, designed to showcase my experience, education, and transition into information technology (IT) and sales/service roles.

## 🌟 Live Demo
You can view the interactive version of this portfolio live on GitHub Pages:
**[Link to your portfolio site]** *(Once deployed, update this link to `https://<your-username>.github.io/<your-repo-name>/`)*

---

## 📂 Project Structure
*   `index.html` - The semantic, fully responsive HTML5 page containing all portfolio sections.
*   `style.css` - Custom styling with a modern dark-by-default design, light mode toggle, glassmorphic layout, hover animations, and a print stylesheet.
*   `script.js` - Logic for dark/light mode toggling (with persistence), quick-copy functionality for contact information, and scroll animations.
*   `resume.md` - A clean, plain-text Markdown-formatted resume ideal for quick parsing or updating GitHub profile profiles.

---

## 💻 Technical Stack
*   **Structure:** HTML5 (Semantic and Accessible)
*   **Styling:** Vanilla CSS3 (Custom Variables, Flexbox, Grid, Media Queries, Glassmorphic effects)
*   **Interactivity:** Vanilla JavaScript (ES6+, LocalStorage, Event Listeners)

---

## 🚀 How to Deploy on GitHub Pages
To make this website live on the internet using GitHub for free, follow these simple steps:

### Step 1: Create a GitHub Repository
1. Log in to your GitHub account.
2. Click the **New** button to create a new repository.
3. Name it (e.g., `lukash-portfolio`).
4. Keep the repository **Public**.
5. Do *not* initialize it with a README (since this repository already contains one).
6. Click **Create repository**.

### Step 2: Push the Files to GitHub
Open your terminal (or Git Bash) in this project directory and run the following commands:
```bash
git init
git add .
git commit -m "Initial commit: Portfolio website and resume"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/lukash-portfolio.git
git push -u origin main
```
*(Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username).*

### Step 3: Enable GitHub Pages
1. Go to your repository settings page on GitHub.
2. In the left sidebar under the **Code and automation** section, click on **Pages**.
3. Under **Build and deployment**, set the Source to **Deploy from a branch**.
4. Under **Branch**, select `main` and `/ (root)`.
5. Click **Save**.
6. Wait 1–2 minutes, and GitHub will provide a link at the top of the page (e.g., `https://YOUR_GITHUB_USERNAME.github.io/lukash-portfolio/`).

---

## 🖨️ How to Export as a PDF Resume
This website includes built-in print optimization styles. To generate a high-quality physical or PDF resume directly from your browser:
1. Open the live portfolio website in Google Chrome, Microsoft Edge, or Safari.
2. Click the **"Download Resume"** / **"Print CV"** button in the header (or press `Ctrl + P` / `Cmd + P`).
3. In the print dialog:
   * **Destination:** Select *Save as PDF*.
   * **Layout:** *Portrait*.
   * **Paper size:** *A4* or *Letter*.
   * **Headers and Footers:** *Uncheck* this option to remove browser titles/timestamps.
   * **Background graphics:** *Uncheck* this option to ensure a clean white background with optimal text contrast.
4. Click **Save** to download your professionally formatted PDF resume!
