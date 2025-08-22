# Netlify Deployment Guide for Guardian AI

## Environment Variables Setup on Netlify

When deploying to Netlify, you need to configure your environment variables in the Netlify dashboard. Here's how:

### 1. Access Netlify Environment Variables

1. Go to your Netlify dashboard
2. Select your Guardian AI site
3. Navigate to **Site settings** > **Environment variables**
4. Click **Add a variable** for each environment variable

### 2. Required Environment Variables

Add these variables with your actual values:

#### Firebase Configuration (Required for Authentication & Database)
```
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### AI API Keys (Optional but Recommended)
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

#### Development Settings (Optional)
```
VITE_USE_FIREBASE_EMULATOR=false
```

### 3. How to Add Variables in Netlify

1. **Variable Name**: Enter the exact name (e.g., `VITE_FIREBASE_API_KEY`)
2. **Value**: Paste your API key or configuration value
3. **Scopes**: Leave as "All deploy contexts" unless you need different values for different environments
4. Click **Create variable**

### 4. Important Notes

#### Security
- ✅ All variables starting with `VITE_` are exposed to the client-side code
- ✅ This is intentional for frontend applications
- ✅ Firebase and AI API keys are designed to be used in client-side applications
- ✅ Firebase security rules protect your data, not the API keys

#### Variable Names
- ✅ Must start with `VITE_` to be accessible in your React app
- ✅ Use exact names as shown above
- ❌ Don't add quotes around values in Netlify dashboard
- ❌ Don't include spaces before or after values

### 5. Testing Your Deployment

After setting environment variables:

1. **Trigger a new deploy** (Netlify will automatically redeploy when you add variables)
2. **Check the deploy logs** for any environment variable related errors
3. **Test authentication** on your live site
4. **Test AI features** to ensure API keys are working

### 6. Verification Steps

Once deployed, you can verify your setup by:

1. Opening browser console on your live site
2. Looking for these log messages:
   - `✅ Firebase initialized successfully`
   - `🤖 AI Service Configuration: ✅ Available`
3. Testing authentication methods
4. Testing AI chat functionality

### 7. Common Issues and Solutions

#### Issue: "Firebase configuration incomplete"
**Solution**: Ensure all Firebase environment variables are set in Netlify dashboard

#### Issue: "AI responses will use mock data"
**Solution**: Add `VITE_GEMINI_API_KEY` or `VITE_OPENAI_API_KEY` in Netlify dashboard

#### Issue: Authentication not working
**Solution**: 
1. Check Firebase authorized domains include your Netlify domain
2. Verify all Firebase environment variables are correct

#### Issue: Environment variables not loading
**Solution**:
1. Ensure variable names start with `VITE_`
2. Trigger a new deployment after adding variables
3. Check for typos in variable names

### 8. Netlify-Specific Features

#### Build Environment
- Netlify automatically loads environment variables during build
- Variables are available to Vite during the build process
- No additional configuration needed in `netlify.toml`

#### Deploy Previews
- Environment variables are available in deploy previews
- Test your changes before merging to main branch

#### Branch Deploys
- You can set different environment variables for different branches
- Useful for staging vs production environments

### 9. Security Best Practices

#### What's Safe to Expose
- ✅ Firebase configuration (protected by security rules)
- ✅ AI API keys (designed for client-side use)
- ✅ Public API endpoints

#### What to Keep Secret
- ❌ Database passwords
- ❌ Server-side API keys
- ❌ Private keys or certificates

### 10. Environment Variable Checklist

Before deploying, ensure you have:

- [ ] All Firebase configuration variables set
- [ ] At least one AI API key (Gemini or OpenAI)
- [ ] Variables start with `VITE_` prefix
- [ ] No extra spaces or quotes around values
- [ ] Firebase authorized domains include your Netlify domain

### 11. Monitoring and Debugging

#### Check Deployment Logs
1. Go to Netlify dashboard > Deploys
2. Click on latest deploy
3. Check build logs for environment variable issues

#### Runtime Debugging
1. Open browser console on live site
2. Look for configuration messages
3. Test each feature to ensure APIs are working

## Example Netlify Environment Variables Setup

In your Netlify dashboard, you should have variables like:

```
Name: VITE_FIREBASE_API_KEY
Value: AIzaSyC7K8F9X2mN5pQ3rT6uV8wY1zB4cD7eF9g

Name: VITE_FIREBASE_PROJECT_ID  
Value: guardian-ai-12345

Name: VITE_GEMINI_API_KEY
Value: AIzaSyD8L9K0F1X3mO6pR4sU9vZ2aE5fG8hI0j

Name: VITE_OPENAI_API_KEY
Value: sk-1234567890abcdef...
```

This setup ensures your Guardian AI application will work perfectly on Netlify with all features enabled!