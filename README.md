# Getting Started with GitHub

## Table of Contents
- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Basic Git Commands](#basic-git-commands)
- [Working with Repositories](#working-with-repositories)
- [Branching and Merging](#branching-and-merging)
- [Best Practices](#best-practices)

## Prerequisites
1. Install Git from [https://git-scm.com/downloads](https://git-scm.com/downloads)
2. Create a GitHub account at [https://github.com](https://github.com)
3. Configure Git with your credentials:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

## Initial Setup

### Creating a New Repository
1. On GitHub.com, click the '+' icon and select 'New repository'
2. Fill in repository details:
   - Repository name
   - Description (optional)
   - Public/Private setting
   - Initialize with README (recommended)
3. Click 'Create repository'

### Cloning an Existing Repository
```bash
git clone https://github.com/username/repository.git
cd repository
```

## Basic Git Commands

### Daily Workflow Commands
```bash
# Check status of your files
git status

# Add files to staging area
git add filename    # Add specific file
git add .          # Add all files

# Commit changes
git commit -m "Your descriptive commit message"

# Push changes to remote repository
git push origin main

# Pull latest changes
git pull origin main
```

## Working with Repositories

### Initialize a Local Repository
```bash
mkdir my-project
cd my-project
git init
```

### Connect to Remote Repository
```bash
git remote add origin https://github.com/username/repository.git
git branch -M main
git push -u origin main
```

## Branching and Merging

### Branch Management
```bash
# Create and switch to new branch
git checkout -b feature-branch

# Switch between branches
git checkout main

# List all branches
git branch

# Merge branch into main
git checkout main
git merge feature-branch
```

## Best Practices

### Commit Messages
- Use clear, descriptive commit messages
- Start with a verb in imperative mood ("Add", "Fix", "Update")
- Keep messages concise but informative

### .gitignore
Create a .gitignore file to exclude unnecessary files:
```bash
# Example .gitignore
node_modules/
.env
.DS_Store
*.log
```

### Pull Requests
1. Create a new branch for your feature
2. Make your changes and commit them
3. Push the branch to GitHub
4. Open a Pull Request on GitHub
5. Add description and request reviews
6. Address feedback and merge when approved

### Security Best Practices
- Never commit sensitive information (API keys, passwords)
- Use environment variables for secrets
- Regularly update dependencies
- Review access permissions

## Additional Resources
- [GitHub Documentation](https://docs.github.com)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com)
- [GitHub Learning Lab](https://lab.github.com)

## Need Help?
- Check GitHub's [Help Documentation](https://help.github.com)
- Visit [GitHub Community Forum](https://github.community)
- Search [Stack Overflow](https://stackoverflow.com/questions/tagged/github)
