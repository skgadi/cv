// src/boot/firebase.ts
import { boot } from 'quasar/wrappers'; // Import from Quasar for typing
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth, onAuthStateChanged, type User } from 'firebase/auth';

import { ref, type App as VueApp } from 'vue'; // Import from Vue for reactivity

// Your Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: 'AIzaSyDIunbg6U_KrMT9IVZb3PC0n1CdnqAVs-Q',
  authDomain: 'skgadi-online.firebaseapp.com',
  databaseURL: 'https://skgadi-online.firebaseio.com',
  projectId: 'skgadi-online',
  storageBucket: 'skgadi-online.firebasestorage.app',
  messagingSenderId: '548913744762',
  appId: '1:548913744762:web:f7ae3e09cec59fec4e24c3',
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

const user = ref<User | null>(null); // Reactive ref for the user

onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser;
});

export default boot(({ app }: { app: VueApp }) => {
  app.provide('auth', auth); // Provide auth for injection
  app.provide('user', user); // Provide the reactive user ref
});

// Export for direct use if needed
export { auth, user };
