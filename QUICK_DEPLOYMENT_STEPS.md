# Quick Deployment Steps for GitHub Pages

Here are the exact steps to deploy your Smart Spaced Repetition Flashcards app to GitHub Pages:

## 1. Create the Repository

Go to GitHub and create a new repository named `smart-spaced-repetition-flashcards` at:
https://github.com/new

Make sure it's set to "Public".

## 2. Initialize and Push to GitHub

Run these commands in your project folder:

```bash
# Initialize git if not already done
git init

# Add all files to git
git add .

# Commit your changes
git commit -m "Initial commit"

# Add the remote repository
git remote add origin https://github.com/gyanchandra2910/smart-spaced-repetition-flashcards.git

# Push to GitHub
git push -u origin main
```

If the push to `main` fails, try with `master` instead:

```bash
git push -u origin master
```

## 3. Deploy to GitHub Pages

Run:

```bash
npm run deploy
```

## 4. Configure GitHub Pages Settings

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to "Pages" (in the left sidebar)
4. In the "Build and deployment" section:
   - For "Source", select "Deploy from a branch"
   - For "Branch", select "gh-pages" and "/" (root), then click "Save"

## 5. Access Your Live Site

After a few minutes, your site will be live at:
https://gyanchandra2910.github.io/smart-spaced-repetition-flashcards

## Updating Your Site in the Future

Whenever you make changes:

```bash
# Add and commit your changes
git add .
git commit -m "Description of changes"

# Push to GitHub
git push

# Deploy updated site
npm run deploy
```
