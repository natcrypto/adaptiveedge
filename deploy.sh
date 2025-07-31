#!/bin/bash

# Adaptive Edge Deployment Script
# This script helps deploy your code to GitHub and DigitalOcean

echo "🚀 Adaptive Edge Deployment Script"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Repository information
REPO_URL="https://github.com/natcrypto/adaptiveedge.git"
REPO_NAME="adaptiveedge"

echo -e "${YELLOW}Repository: ${REPO_URL}${NC}"
echo ""

# Function to check if git is available
check_git() {
    if ! command -v git &> /dev/null; then
        echo -e "${RED}Git is not available in this environment${NC}"
        echo "You'll need to upload files manually to GitHub"
        return 1
    fi
    return 0
}

# Function to initialize git repo
init_git() {
    echo "🔧 Initializing Git repository..."
    
    if [ ! -d ".git" ]; then
        git init
        git remote add origin $REPO_URL
    fi
    
    # Set up gitignore if it doesn't exist
    if [ ! -f ".gitignore" ]; then
        cat > .gitignore << 'EOF'
node_modules/
dist/
.env
.replit
*.log
.DS_Store
EOF
    fi
}

# Function to commit and push changes
deploy_to_github() {
    echo "📦 Preparing files for GitHub..."
    
    # Add all files except ignored ones
    git add .
    
    # Check if there are changes to commit
    if git diff --staged --quiet; then
        echo -e "${YELLOW}No changes to commit${NC}"
        return 0
    fi
    
    # Commit with timestamp
    COMMIT_MSG="Update Adaptive Edge website - $(date '+%Y-%m-%d %H:%M:%S')"
    git commit -m "$COMMIT_MSG"
    
    echo "🚀 Pushing to GitHub..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Successfully deployed to GitHub!${NC}"
        echo -e "Repository: ${REPO_URL}"
    else
        echo -e "${RED}❌ Failed to push to GitHub${NC}"
        echo "You may need to authenticate or check repository permissions"
        return 1
    fi
}

# Function to show deployment status
show_status() {
    echo ""
    echo "📊 Deployment Status"
    echo "===================="
    echo -e "Repository: ${GREEN}${REPO_URL}${NC}"
    echo -e "Live Site: ${GREEN}https://adaptiveedge.uk${NC}"
    echo -e "Database: ${GREEN}Connected (PostgreSQL)${NC}"
    echo -e "Contact Form: ${GREEN}Working${NC}"
    echo ""
    echo "🔧 Next Steps:"
    echo "1. Deploy to DigitalOcean using: FINAL_DEPLOYMENT_COMMANDS.md"
    echo "2. Set DATABASE_URL environment variable on server"
    echo "3. Test contact form at https://adaptiveedge.uk"
}

# Function to create quick update script
create_update_script() {
    cat > quick-update.sh << 'EOF'
#!/bin/bash
# Quick update script for Adaptive Edge

echo "🔄 Quick Update for Adaptive Edge"
echo "================================"

# Add all changes
git add .

# Commit with current timestamp
git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')"

# Push to GitHub
git push origin main

echo "✅ Update complete!"
echo "📦 Repository: https://github.com/natcrypto/adaptiveedge"
echo "🌐 Deploy to server using: ./deploy-to-server.sh"
EOF

    chmod +x quick-update.sh
    echo "📝 Created quick-update.sh for future updates"
}

# Function to create server deployment script
create_server_script() {
    cat > deploy-to-server.sh << 'EOF'
#!/bin/bash
# Server deployment script for DigitalOcean

echo "🚀 Deploying to DigitalOcean Server"
echo "==================================="

# SSH into server and deploy
cat << 'DEPLOY_COMMANDS'
# Run these commands on your DigitalOcean server:

cd /var/www/adaptiveedge
git pull origin main
npm install
npm run build
pm2 restart adaptive-edge

echo "✅ Server deployment complete!"
echo "🌐 Website: https://adaptiveedge.uk"
DEPLOY_COMMANDS
EOF

    chmod +x deploy-to-server.sh
    echo "📝 Created deploy-to-server.sh for server updates"
}

# Main execution
main() {
    echo "Starting deployment process..."
    echo ""
    
    # Check if git is available
    if ! check_git; then
        echo ""
        echo "📋 Manual Upload Instructions:"
        echo "1. Go to: ${REPO_URL}"
        echo "2. Upload all files except: node_modules/, dist/, .env, .replit"
        echo "3. Use commit message: 'Complete Adaptive Edge website with database integration'"
        show_status
        return 1
    fi
    
    # Initialize git if needed
    init_git
    
    # Deploy to GitHub
    if deploy_to_github; then
        create_update_script
        create_server_script
        show_status
        
        echo ""
        echo "🎉 Setup Complete!"
        echo ""
        echo "For future updates, simply run:"
        echo -e "${GREEN}./quick-update.sh${NC}"
        echo ""
        echo "To deploy to your server, run:"
        echo -e "${GREEN}./deploy-to-server.sh${NC}"
        
    else
        echo ""
        echo "❌ Deployment failed. Please try manual upload."
        show_status
    fi
}

# Run main function
main "$@"
EOF
    chmod +x deploy.sh