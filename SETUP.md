# Google Authentication Setup Guide

## 1. Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/flashcard_app"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## 2. Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

## 3. Set up Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set up the OAuth consent screen
6. Choose "Web application" as the application type
7. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
8. Copy the Client ID and Client Secret to your `.env` file

## 4. Database Setup

1. Make sure your PostgreSQL database is running
2. Run the database migration:
   ```bash
   npx prisma db push
   ```

## 5. Start the Development Server

```bash
npm run dev
```

## 6. Test the Authentication

1. Visit `http://localhost:3000`
2. Click "Login" or "Get Started"
3. You should be redirected to the login page
4. Click "Continue with Google"
5. Complete the Google OAuth flow
6. You should be redirected to the dashboard

## Troubleshooting

- Make sure your database is running and accessible
- Verify all environment variables are set correctly
- Check that your Google OAuth redirect URIs match exactly
- Ensure your NextAuth secret is at least 32 characters long
