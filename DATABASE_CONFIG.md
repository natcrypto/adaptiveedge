# Database Configuration for Your Server

## Option 1: Cloud Database (Recommended - Easiest)

### Neon Database (Free & Easy)
1. Go to [neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Copy the connection string
4. Set as environment variable on your server

### Supabase (PostgreSQL + Dashboard)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings > Database
4. Copy connection string
5. Set as environment variable

### Railway (Simple Setup)
1. Go to [railway.app](https://railway.app)
2. Create PostgreSQL database
3. Copy connection string from variables tab

## Option 2: Self-Hosted Database

### If you have VPS/Dedicated Server:

**Install PostgreSQL:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# CentOS/RHEL
sudo yum install postgresql-server postgresql-contrib
sudo postgresql-setup initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Create Database:**
```bash
sudo -u postgres psql
CREATE DATABASE adaptive_edge;
CREATE USER adaptiveedge WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE adaptive_edge TO adaptiveedge;
\q
```

**Connection String:**
```
postgresql://adaptiveedge:your_secure_password@localhost:5432/adaptive_edge
```

## Option 3: Shared Hosting with Database

### cPanel/Plesk Hosting:
1. Login to your hosting control panel
2. Find "PostgreSQL Databases" or "Databases"  
3. Create new database named "adaptive_edge"
4. Create database user with full permissions
5. Note the connection details provided

### Connection String Format:
```
postgresql://username:password@hostname:port/database_name
```

## Setting Environment Variables

### Method 1: .env File
Create `.env` file on your server:
```bash
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
PORT=5000
```

### Method 2: Server Environment Variables
```bash
# Add to ~/.bashrc or ~/.profile
export DATABASE_URL="postgresql://username:password@host:port/database"
export NODE_ENV="production"
export PORT="5000"
```

### Method 3: Process Manager (PM2)
```bash
pm2 start dist/index.js --name adaptive-edge --env production
# Or with environment file
pm2 start ecosystem.config.js
```

## Database Schema Setup

After configuring the connection, run this on your server:

```bash
# Install dependencies
npm install

# Push database schema (creates tables)
npm run db:push

# Build and start
npm run build
npm start
```

## Testing Database Connection

Test your database connection:
```bash
# Test API endpoint
curl -X POST http://your-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","company":"Test Co","message":"Testing"}'

# Check if contact was saved
curl http://your-domain.com/api/contacts
```

## Common Connection String Examples

### Local Database:
```
postgresql://username:password@localhost:5432/adaptive_edge
```

### Cloud Database (Neon):
```
postgresql://username:password@ep-hostname.us-east-1.aws.neon.tech/neondb
```

### Shared Hosting:
```
postgresql://cpanel_user:password@localhost:5432/cpanel_user_adaptive_edge
```

## Security Notes

- Use strong passwords
- Keep DATABASE_URL secure (never commit to Git)
- Consider SSL connections for production
- Regular database backups recommended

## Troubleshooting

**Connection Refused:**
- Check if PostgreSQL is running
- Verify port 5432 is open
- Check firewall settings

**Authentication Failed:**
- Verify username/password
- Check user permissions
- Ensure database exists

**Tables Not Found:**
- Run `npm run db:push` to create tables
- Check database name in connection string

## Quick Setup Commands

For fastest setup on your server:
```bash
# 1. Upload your files
# 2. Set environment variable
export DATABASE_URL="your_connection_string_here"

# 3. Install and setup
npm install
npm run db:push
npm run build
npm start
```

Your contact form will then save to the database permanently!

## Need Help?

What type of hosting do you have? I can provide specific instructions for:
- Shared hosting (cPanel)
- VPS (DigitalOcean, Linode, etc.)
- Cloud platforms (Vercel, Netlify, Railway)
- Dedicated servers