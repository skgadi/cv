// src/boot/firebase.ts
import { boot } from 'quasar/wrappers'; // Import from Quasar for typing
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

// Your Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const initializeFirebase = (): { app: FirebaseApp; auth: Auth } => {
  const app: FirebaseApp = initializeApp(firebaseConfig);
  const auth: Auth = getAuth(app);
  return { app, auth };
};

const { auth } = initializeFirebase();

export default boot(({ app: quasarApp }) => {
  // Attach auth to the global properties for easy access in components
  quasarApp.config.globalProperties.$auth = auth; // e.g., this.$auth in components
});
