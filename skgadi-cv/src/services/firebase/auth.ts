import { signInWithPopup, GoogleAuthProvider, getAuth, type Auth } from 'firebase/auth';

export const login = async (): Promise<void> => {
  const auth: Auth | null = getAuth(); // Get the auth instance
  if (!auth) return; // Safety check
  try {
    const provider = new GoogleAuthProvider(); // Create a Google provider
    const result = await signInWithPopup(auth, provider); // Perform sign-in
    console.log('Logged in:', result.user);
    // The user ref should update automatically via onAuthStateChanged
  } catch (error) {
    console.error('Login error:', error);
    // Handle error (e.g., show a Quasar notification)
    // Example: import { Notify } from 'quasar'; Notify.create('Login failed: ' + error.message);
  }
};

export const logout = async (): Promise<void> => {
  const auth: Auth | null = getAuth(); // Get the auth instance
  if (!auth) return; // Safety check
  try {
    await auth.signOut(); // Perform sign-out
    console.log('Logged out');
  } catch (error) {
    console.error('Logout error:', error);
    // Handle error (e.g., show a Quasar notification)
    // Example: import { Notify } from 'quasar'; Notify.create('Logout failed: ' + error.message);
  }
};

export const isLoggedIn = (): boolean => {
  const auth: Auth | null = getAuth(); // Get the auth instance
  if (!auth) return false; // Safety check
  return !!auth.currentUser; // Check if the user is logged in
};

export const getUser = () => {
  const auth: Auth | null = getAuth(); // Get the auth instance
  if (!auth) return null; // Safety check
  return auth.currentUser; // Return the current user
};
