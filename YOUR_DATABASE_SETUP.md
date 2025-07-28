# Your Database Setup for adaptiveedge.uk

## Database Already Configured ✅

Your PostgreSQL database is already set up and working! Here's what you need for your server:

## Connection String for Your Server

You'll need to set this environment variable on your adaptiveedge.uk server:

```bash
DATABASE_URL="the_database_url_from_this_replit_project"
```

**To get your connection string:**
1. Check your Replit project's environment variables
2. Look for `DATABASE_URL` 
3. Copy that exact value to your server

## Quick Server Setup

### Option 1: Environment Variable (Recommended)
```bash
# On your server, create .env file:
echo 'DATABASE_URL="your_connection_string_here"' > .env
echo 'NODE_ENV=production' >> .env
echo 'PORT=5000' >> .env
```

### Option 2: Export in Shell
```bash
export DATABASE_URL="your_connection_string_here"
export NODE_ENV=production
export PORT=5000
```

## Deploy to Your Server

1. **Upload all project files** to your server
2. **Set the DATABASE_URL** (from above)
3. **Install and run:**
   ```bash
   npm install
   npm run db:push    # Creates the database tables
   npm run build      # Builds the production files
   npm start          # Starts the server
   ```

## Database Tables

Your database already has these tables created:
- `users` - For user management (if needed later)
- `contacts` - For contact form submissions

## Testing on Your Server

After deployment, test the contact form:
```bash
curl -X POST https://adaptiveedge.uk/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@adaptiveedge.uk","company":"Test","message":"Testing production contact form"}'
```

## Production Process Manager

For production, use PM2 to keep your server running:
```bash
npm install -g pm2
pm2 start dist/index.js --name adaptive-edge
pm2 startup  # Auto-start on server reboot
pm2 save
```

## That's It!

Your database is already configured and tested. You just need to:
1. Get the DATABASE_URL from this Replit project
2. Set it as an environment variable on your server
3. Upload and run the code

The contact form will then save all submissions permanently to your database!

## Need the Exact Connection String?

I can help you find the exact DATABASE_URL value you need for your server. What type of server setup do you have for adaptiveedge.uk?