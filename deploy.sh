#!/bin/bash

# Adaptive Edge Website Deployment Script
# This script builds the project and prepares it for deployment

echo "🚀 Building Adaptive Edge Website..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📁 Files ready for deployment:"
    echo "   - dist/public/ (Frontend files - upload to your web root)"
    echo "   - dist/index.js (Backend server - for full-stack hosting)"
    echo ""
    echo "🌐 Next steps:"
    echo "   1. Upload dist/public/* to your domain's web folder"
    echo "   2. Or upload entire project for full-stack hosting"
    echo "   3. Set up database if using backend features"
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed hosting instructions"
else
    echo "❌ Build failed. Please check for errors above."
    exit 1
fi