# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for your application.

## Prerequisites

- Google Cloud Platform account
- Your application domain (for production) or localhost (for development)

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (if not already enabled)

## Step 2: Configure OAuth Consent Screen

1. Go to **APIs & Services** > **OAuth consent screen**
2. Choose **External** user type (unless you're using Google Workspace)
3. Fill in the required information:
   - App name: Your application name
   - User support email: Your email
   - App domain: Your domain (optional for testing)
   - Developer contact information: Your email
4. Add scopes (you can start with basic ones):
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
   - `openid`
5. Add test users if in testing mode

## Step 3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client ID**
3. Choose **Web application**
4. Configure the settings:
   - **Name**: Your app name
   - **Authorized JavaScript origins**: 
     - For development: `http://localhost:3000`
     - For production: `https://yourdomain.com`
   - **Authorized redirect URIs**:
     - For development: `http://localhost:5000/api/auth/google/callback`
     - For production: `https://yourdomain.com/api/auth/google/callback`

## Step 4: Configure Environment Variables

### Backend (.env file in backend folder)
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_here
PORT=5000
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local file in frontend folder)
```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

## Step 5: Get Your Credentials

1. After creating the OAuth client, you'll see a modal with your credentials
2. Copy the **Client ID** and **Client Secret**
3. Add them to your environment files as shown above

## Important Notes

- **Client ID** is public and safe to use in frontend code
- **Client Secret** should NEVER be exposed in frontend code - only use it on the backend
- For production, make sure to update the authorized domains
- Test the authentication flow in incognito mode to ensure it works for new users

## Testing

1. Start your backend server: `cd backend && npm start`
2. Start your frontend: `cd frontend && npm run dev`
3. Go to `http://localhost:3000/login`
4. Click "Sign in with Google"
5. Complete the OAuth flow

## Troubleshooting

- **Error 400: redirect_uri_mismatch**: Check that your redirect URIs in Google Console match exactly
- **Invalid client**: Verify your Client ID is correct in both environment files
- **Access blocked**: Make sure your OAuth consent screen is configured and published (or add test users)

## Security Best Practices

1. Always use HTTPS in production
2. Regularly rotate your Client Secret
3. Set up proper CORS policies
4. Validate all tokens on the backend
5. Implement proper session management