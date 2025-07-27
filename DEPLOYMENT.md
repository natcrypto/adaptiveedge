# Deployment Guide

This guide covers deploying the Adaptive Edge website to your own domain using various hosting methods.

## Build Process

First, build the project for production:

```bash
npm run build
```

This creates optimized files in the `dist/` directory.

## Method 1: Traditional Web Hosting (Shared/VPS)

### For Static Hosting (Frontend Only)
If you want to deploy just the frontend:

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Upload contents of `dist/public/` to your web root:**
   - Upload via FTP/SFTP to your domain's public_html or www folder
   - Or use your hosting provider's file manager

3. **Configure your web server** (if needed):
   - Ensure your server serves `index.html` for all routes
   - Set up proper MIME types for modern file formats

### For Full-Stack Hosting (Frontend + Backend)

1. **Upload all project files** to your server
2. **Install Node.js** on your server (18+ required)
3. **Install dependencies:**
   ```bash
   npm install --production
   ```
4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and settings
   ```
5. **Build the project:**
   ```bash
   npm run build
   ```
6. **Start the server:**
   ```bash
   npm start
   ```
7. **Set up a process manager** (PM2 recommended):
   ```bash
   npm install -g pm2
   pm2 start dist/index.js --name adaptive-edge
   pm2 startup
   pm2 save
   ```

## Method 2: VPS/Cloud Server (Ubuntu/CentOS)

### Prerequisites
- Ubuntu 20.04+ or CentOS 8+
- Root or sudo access
- Your domain pointed to the server IP

### Setup Steps

1. **Install Node.js:**
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # CentOS/RHEL
   curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
   sudo yum install -y nodejs
   ```

2. **Install PM2:**
   ```bash
   sudo npm install -g pm2
   ```

3. **Clone or upload your project:**
   ```bash
   cd /var/www
   # Upload your files or clone from GitHub
   # git clone https://github.com/yourusername/adaptive-edge-website.git
   cd adaptive-edge-website
   ```

4. **Install dependencies and build:**
   ```bash
   npm install
   cp .env.example .env
   # Edit .env with your settings
   npm run build
   ```

5. **Start with PM2:**
   ```bash
   pm2 start dist/index.js --name adaptive-edge
   pm2 startup
   pm2 save
   ```

6. **Set up Nginx reverse proxy:**
   ```bash
   sudo apt install nginx  # Ubuntu
   # sudo yum install nginx  # CentOS
   ```

   Create `/etc/nginx/sites-available/adaptive-edge`:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

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

   Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/adaptive-edge /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

7. **Set up SSL with Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

## Method 3: Docker Deployment

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build

EXPOSE 5000
CMD ["node", "dist/index.js"]
```

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
    restart: unless-stopped
```

Deploy:
```bash
docker-compose up -d
```

## Method 4: Static Site Generators (Frontend Only)

If you want to deploy just the frontend as a static site:

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Upload `dist/public/` contents** to:
   - **Netlify**: Drag and drop the folder
   - **GitHub Pages**: Push to gh-pages branch
   - **Firebase Hosting**: Use Firebase CLI
   - **Your own server**: Upload to web root

## Database Setup

For full-stack deployment, you'll need a PostgreSQL database:

### Option 1: Cloud Database
- **Neon**: Free PostgreSQL (recommended)
- **Supabase**: PostgreSQL with additional features
- **PlanetScale**: MySQL alternative
- **Railway**: PostgreSQL with easy deployment

### Option 2: Self-Hosted Database
Install PostgreSQL on your server:
```bash
# Ubuntu
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres createdb adaptive_edge
sudo -u postgres createuser --interactive
```

## Environment Variables

Set these in your `.env` file:
```env
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
PORT=5000
```

## Domain Configuration

1. **Point your domain** to your server's IP address
2. **Set up DNS records:**
   - A record: yourdomain.com → your-server-ip
   - CNAME: www.yourdomain.com → yourdomain.com

## Security Checklist

- [ ] Enable firewall (UFW on Ubuntu)
- [ ] Set up SSL certificate
- [ ] Use environment variables for secrets
- [ ] Enable fail2ban for SSH protection
- [ ] Regular backups of database
- [ ] Keep Node.js and dependencies updated

## Troubleshooting

**Port issues**: Make sure port 5000 is open in your firewall
**Database connection**: Verify DATABASE_URL is correct
**Static files**: Ensure Nginx serves static files efficiently
**SSL issues**: Check certificate renewal with certbot

## Need Help?

The exact steps depend on your hosting provider. Common providers:
- **DigitalOcean**: VPS with good documentation
- **Linode**: Similar to DigitalOcean
- **AWS EC2**: More complex but scalable
- **Hostinger/Namecheap**: Shared hosting options