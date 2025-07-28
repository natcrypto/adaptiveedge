# DigitalOcean Deployment Guide for adaptiveedge.uk

## Prerequisites
- DigitalOcean Droplet (Ubuntu 20.04+ recommended)
- Domain (adaptiveedge.uk) pointed to your droplet's IP
- SSH access to your server

## Step 1: Server Setup

### Connect to your droplet:
```bash
ssh root@your-droplet-ip
```

### Install Node.js 18+:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs
```

### Install PM2 (Process Manager):
```bash
npm install -g pm2
```

### Install Nginx (Web Server):
```bash
apt update
apt install nginx
```

## Step 2: Upload Your Code

### Option A: GitHub (Recommended)
```bash
cd /var/www
git clone https://github.com/yourusername/adaptive-edge-website.git
cd adaptive-edge-website
```

### Option B: Direct Upload
- Use SCP/SFTP to upload your project files
- Place in `/var/www/adaptive-edge-website/`

## Step 3: Environment Configuration

### Create .env file:
```bash
cd /var/www/adaptive-edge-website
nano .env
```

### Add your environment variables:
```env
DATABASE_URL=your_database_url_from_replit_here
NODE_ENV=production
PORT=5000
```

**To get DATABASE_URL:**
1. In your Replit project, check the "Secrets" tab
2. Copy the DATABASE_URL value
3. Paste it in the .env file above

## Step 4: Install and Build

```bash
# Install dependencies
npm install

# Create database tables
npm run db:push

# Build production files
npm run build

# Test the build
npm start
```

If everything works, stop it (Ctrl+C) and continue to PM2 setup.

## Step 5: Process Manager Setup

### Start with PM2:
```bash
pm2 start dist/index.js --name adaptive-edge
pm2 startup
pm2 save
```

### Check status:
```bash
pm2 status
pm2 logs adaptive-edge
```

## Step 6: Nginx Configuration

### Create Nginx config:
```bash
nano /etc/nginx/sites-available/adaptive-edge
```

### Add this configuration:
```nginx
server {
    listen 80;
    server_name adaptiveedge.uk www.adaptiveedge.uk;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Enable the site:
```bash
ln -s /etc/nginx/sites-available/adaptive-edge /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

## Step 7: SSL Certificate (HTTPS)

### Install Certbot:
```bash
apt install certbot python3-certbot-nginx
```

### Get SSL certificate:
```bash
certbot --nginx -d adaptiveedge.uk -d www.adaptiveedge.uk
```

Follow the prompts to complete SSL setup.

## Step 8: Firewall Setup

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

## Step 9: Test Your Deployment

### Test the website:
```bash
curl https://adaptiveedge.uk
```

### Test contact form:
```bash
curl -X POST https://adaptiveedge.uk/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Production Test","email":"test@adaptiveedge.uk","company":"Adaptive Edge","message":"Testing live deployment"}'
```

## Step 10: GitHub Sync Setup (Optional)

### For easy updates via GitHub:
```bash
# Add GitHub webhook or manual sync
cd /var/www/adaptive-edge-website
git pull origin main
npm install
npm run build
pm2 restart adaptive-edge
```

## Maintenance Commands

### View logs:
```bash
pm2 logs adaptive-edge
nginx error log: tail -f /var/log/nginx/error.log
```

### Restart services:
```bash
pm2 restart adaptive-edge
systemctl restart nginx
```

### Update deployment:
```bash
cd /var/www/adaptive-edge-website
git pull origin main
npm install
npm run build
pm2 restart adaptive-edge
```

## DigitalOcean Specific Tips

### Monitoring:
- Enable DigitalOcean monitoring in your droplet dashboard
- Set up alerts for CPU/memory usage

### Backups:
- Enable automatic backups in DigitalOcean
- Consider database backups for your contact form data

### Scaling:
- Start with a $5-10/month droplet
- Scale up if needed based on traffic

## Troubleshooting

### Site not loading:
```bash
pm2 status        # Check if app is running
nginx -t          # Check Nginx config
systemctl status nginx
```

### Database connection issues:
```bash
# Check if DATABASE_URL is set correctly
cat /var/www/adaptive-edge-website/.env
pm2 logs adaptive-edge | grep -i database
```

### SSL issues:
```bash
certbot certificates  # Check certificate status
nginx -t              # Verify Nginx config
```

## Summary

After following these steps:
- ✅ Your website will be live at https://adaptiveedge.uk
- ✅ Contact form will save to database permanently
- ✅ Murmuration and cursor birds will work perfectly
- ✅ Auto-restart on server reboot
- ✅ SSL encryption enabled

Your production-ready website with full database integration will be running on DigitalOcean!