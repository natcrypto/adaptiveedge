# Seamless Development Workflow for Adaptive Edge

## Current Limitation

Unfortunately, this Replit environment has Git restrictions that prevent direct GitHub pushes. However, I've created the most efficient workflow possible for seamless updates.

## One-Time Setup (Manual Upload)

Since direct Git connection isn't available, you'll need to do the initial upload manually:

### Step 1: Upload to GitHub
1. Go to https://github.com/natcrypto/adaptiveedge
2. Upload all project files (use UPLOAD_TO_NATCRYPTO_REPO.md guide)
3. This is a one-time step

### Step 2: Clone to DigitalOcean
```bash
# On your DigitalOcean server
cd /var/www
git clone https://github.com/natcrypto/adaptiveedge.git
cd adaptiveedge
```

## Seamless Future Updates

After the initial setup, future updates become seamless:

### Option 1: Direct Server Updates (Fastest)
```bash
# On your DigitalOcean server
cd /var/www/adaptiveedge
git pull origin main
npm install
npm run build
pm2 restart adaptive-edge
```

### Option 2: Replit Export → GitHub → Server
1. **Export from Replit**: Download project as ZIP
2. **Update GitHub**: Upload changed files to your repository
3. **Deploy**: Run `git pull` on your server

## Automation Scripts Created

I've created helper scripts for you:

### `deploy.sh`
- Attempts Git deployment (if available)
- Shows deployment status and next steps
- Creates additional helper scripts

### `quick-update.sh` (Generated)
- Quick commit and push for small changes
- Timestamped commits
- One-command updates

### `deploy-to-server.sh` (Generated)
- Server deployment commands
- Automated restart process

## Most Efficient Workflow

For ongoing development:

1. **Make changes in Replit** (your development environment)
2. **Test locally** (contact form, animations, etc.)
3. **Export and upload** changed files to GitHub
4. **Deploy to server**: `git pull && npm run build && pm2 restart`

## Alternative: Direct Server Development

Once your code is on the server, you could develop directly there:

```bash
# SSH into your DigitalOcean server
ssh root@your-server-ip

# Navigate to your project
cd /var/www/adaptiveedge

# Make changes directly
nano client/src/components/contact-section.tsx

# Test and deploy
npm run build
pm2 restart adaptive-edge
```

## GitHub Sync Strategy

For seamless GitHub sync:

1. **Development Branch**: Use a `dev` branch for active development
2. **Production Branch**: Keep `main` for stable releases
3. **Automated Deployment**: Set up GitHub Actions (optional)

## Contact Form Database

Your contact form will work seamlessly once deployed because:
- Database connection string is in deployment guides
- Schema is already defined and tested
- API endpoints are ready for production

## Next Steps

1. **Upload initial code** to https://github.com/natcrypto/adaptiveedge
2. **Deploy to your server** using FINAL_DEPLOYMENT_COMMANDS.md
3. **Test everything** at https://adaptiveedge.uk
4. **Use efficient update workflow** for future changes

The setup process is one-time, but after that, updates to your live site become very streamlined!