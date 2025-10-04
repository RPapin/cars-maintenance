# Railway Deployment Setup

## Issues Fixed
1. ✅ Fixed Dockerfile frontend build path issue
2. ✅ Added proper error handling for missing environment variables
3. ✅ Changed railway.json to use Dockerfile builder

## Required Environment Variables

Set these in your Railway project dashboard:

### Database (PostgreSQL)
```
DB_HOST=your-postgres-host
DB_USER=your-postgres-user
DB_PASSWORD=your-postgres-password
DB_NAME=your-postgres-database
DB_PORT=5432
```

### Application
```
NODE_ENV=production
JWT_SECRET=your-secure-jwt-secret-here
```

## How to Set Environment Variables in Railway

1. Go to your Railway project dashboard
2. Select your service
3. Go to the "Variables" tab
4. Add each variable above

## Adding PostgreSQL Database

1. In Railway dashboard, click "New" → "Database" → "PostgreSQL"
2. Copy the connection details to the environment variables above
3. The database will automatically create tables when your app connects

## Testing the Deployment

After setting environment variables:
1. Redeploy your service in Railway
2. Check logs for any startup errors
3. Visit your app URL
4. Test the health endpoint: `https://your-app.railway.app/api/health`

## Troubleshooting

- **502 Error**: Usually missing environment variables or database connection issues
- **404 on frontend routes**: Frontend build path issue (should be fixed now)
- **Database connection errors**: Check your PostgreSQL service is running and variables are correct