import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Environment variable validation and logging
const validateEnvironmentVariables = () => {
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN', 
    'VITE_FIREBASE_PROJECT_ID'
  ];
  
  const missing = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missing.length > 0) {
    console.warn('⚠️ Missing Firebase environment variables:', missing);
    console.log('💡 For production deployment, ensure these are set in your hosting platform:');
    missing.forEach(varName => console.log(`   - ${varName}`));
  }
  
  // Log environment info (without exposing sensitive values)
  console.log('🔧 Environment Info:');
  console.log(`   - Mode: ${import.meta.env.MODE}`);
  console.log(`   - Dev: ${import.meta.env.DEV}`);
  console.log(`   - Prod: ${import.meta.env.PROD}`);
  console.log(`   - Firebase configured: ${!!(import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID)}`);
};

// Run validation
validateEnvironmentVariables();

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if Firebase config is available
const isFirebaseConfigured = !!(firebaseConfig.apiKey && 
                                firebaseConfig.authDomain && 
                                firebaseConfig.projectId);

let app;
let auth;
let db;

if (isFirebaseConfigured) {
  try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);

    // Connect to emulators in development if enabled
    if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
      console.log('🔧 Connecting to Firebase emulators...');
      
      try {
        connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
        connectFirestoreEmulator(db, 'localhost', 8080);
        console.log('✅ Connected to Firebase emulators');
      } catch (emulatorError) {
        console.warn('⚠️ Could not connect to emulators, using production Firebase');
      }
    }

    console.log('✅ Firebase initialized successfully');
    console.log(`   - Project: ${firebaseConfig.projectId}`);
    console.log(`   - Environment: ${import.meta.env.PROD ? 'Production' : 'Development'}`);
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
    throw error;
  }
} else {
  console.warn('⚠️ Firebase configuration incomplete. Using mock services.');
  console.log('📋 For production deployment, set these environment variables in your hosting platform:');
  console.log('   - VITE_FIREBASE_API_KEY');
  console.log('   - VITE_FIREBASE_AUTH_DOMAIN'); 
  console.log('   - VITE_FIREBASE_PROJECT_ID');
  console.log('   - VITE_FIREBASE_STORAGE_BUCKET');
  console.log('   - VITE_FIREBASE_MESSAGING_SENDER_ID');
  console.log('   - VITE_FIREBASE_APP_ID');
  
  // Create mock services for development
  auth = {
    currentUser: null,
    onAuthStateChanged: (callback: any) => {
      callback(null);
      return () => {};
    }
  } as any;
  
  db = {} as any;
}

export { auth, db, isFirebaseConfigured };
export default app;