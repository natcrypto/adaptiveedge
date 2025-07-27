# Quick Hosting Guide for Your Domain

## What You'll Need
- FTP/SFTP access to your domain
- Or file management access through your hosting control panel

## Option 1: Frontend Only (Simplest)

This deploys just the website without the contact form backend.

### Steps:
1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload files:**
   - Go to your hosting file manager or use FTP
   - Upload everything from `dist/public/` folder to your domain's web root
   - Web root is usually: `public_html/`, `www/`, or `htdocs/`

3. **Configure your server** (if needed):
   - Make sure your server serves `index.html` for all routes
   - Most modern hosting providers handle this automatically

**That's it!** Your website will be live at your domain.

## Option 2: Full-Stack (With Contact Form)

This includes the backend so the contact form works.

### Requirements:
- Node.js support on your hosting (VPS or cloud hosting)
- PostgreSQL database access

### Steps:
1. **Upload all project files** to your server
2. **SSH into your server** and navigate to project folder
3. **Install and build:**
   ```bash
   npm install
   cp .env.example .env
   # Edit .env with your database URL
   npm run build
   ```
4. **Start the server:**
   ```bash
   npm start
   ```
5. **Set up a process manager:**
   ```bash
   npm install -g pm2
   pm2 start dist/index.js --name adaptive-edge
   ```

## Common Hosting Providers

### Shared Hosting (cPanel/Plesk)
- Use Option 1 (Frontend Only)
- Upload via File Manager or FTP
- Examples: Hostinger, Namecheap, GoDaddy

### VPS/Cloud Hosting
- Use Option 2 (Full-Stack)  
- SSH access required
- Examples: DigitalOcean, Linode, Vultr

### Managed Node.js Hosting
- Upload project files
- Set environment variables in control panel
- Examples: Railway, Render, Heroku

## File Structure After Build

```
dist/
├── public/          ← Upload this for frontend-only
│   ├── index.html
│   ├── assets/
│   └── ...
└── index.js         ← Backend server file
```

## Quick Test

After uploading, visit your domain. You should see:
- Beautiful hero section with murmuration animation
- Interactive cursor birds (on desktop)
- All sections working properly
- Contact form (if using full-stack option)

## Need Help?

The exact steps depend on your hosting provider. Most common issues:
- **File permissions**: Make sure uploaded files are readable
- **Database connection**: Check your DATABASE_URL in .env
- **Node.js version**: Ensure Node.js 18+ is installed

What type of hosting do you have for your domain?