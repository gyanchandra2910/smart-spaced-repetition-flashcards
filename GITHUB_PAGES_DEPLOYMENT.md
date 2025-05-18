## GitHub Pages Deployment Instructions

Follow these steps to deploy your Smart Spaced Repetition Flashcards app to GitHub Pages:

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account.
2. Click on the "+" icon in the top-right corner and select "New repository."
3. Name your repository `smart-spaced-repetition-flashcards`
4. Choose "Public" for the repository visibility.
5. Click "Create repository."

### Step 2: Update Your package.json

Already done! We have:
- Added `homepage` field with your GitHub Pages URL
- Added `predeploy` and `deploy` scripts
- Installed the `gh-pages` package as a dev dependency

Just make sure to replace `YOUR_GITHUB_USERNAME` in the homepage URL with your actual GitHub username.

### Step 3: Initialize Git Repository and Push to GitHub

Run these commands in your project folder:

```bash
# Initialize a git repository if you haven't already
git init

# Add all files to git
git add .

# Commit your changes
git commit -m "Initial commit"

# Add the remote repository
git remote add origin https://github.com/gyanchandra2910/smart-spaced-repetition-flashcards.git

# Push to GitHub
git push -u origin main
# If the above fails, try with 'master' instead of 'main'
# git push -u origin master
```

### Step 4: Deploy to GitHub Pages

Run the deploy script:

```bash
npm run deploy
```

This will:
1. Build your React app (`npm run build`)
2. Deploy it to the gh-pages branch of your GitHub repository

### Step 5: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to the "GitHub Pages" section
4. In the "Source" dropdown, select "gh-pages" and save

### Step 6: Access Your Live Site

After a few minutes, your site should be live at:
`https://gyanchandra2910.github.io/smart-spaced-repetition-flashcards`

### Troubleshooting

- **Blank Page**: If you see a blank page, check the browser console for errors. It might be a path issue.
- **404 Errors**: Make sure your repository is public, and GitHub Pages is enabled.
- **Path Issues**: Using HashRouter instead of BrowserRouter (which we've already done) should fix most path issues.

### Updating Your Site

Whenever you make changes to your code:

1. Commit your changes to git
2. Run `npm run deploy` again to update your GitHub Pages site
