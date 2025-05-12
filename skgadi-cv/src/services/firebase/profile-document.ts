import { getFirestore, setDoc, query, collection, where, getDocs, doc } from 'firebase/firestore';
import { isLoggedIn } from 'src/services/firebase/auth'; // Import the isLoggedIn function
import type { GSK_PROFILE } from '../library/types/profile';

const db = getFirestore();

export function getProfileDocumentSnapshot(userId: string, checkLogin = true) {
  try {
    if (checkLogin) {
      // Check if the user is logged in or not.
      if (!isLoggedIn()) {
        console.log('User is not logged in');
        return null;
      }
    }
    // If the user is logged in, proceed to get the document snapshot
    const cvCollection = collection(db, 'CV');
    const q = query(cvCollection, where('uid', '==', userId));
    return q;
  } catch (error) {
    console.error('Error fetching profile document:', error);
    throw error;
  }
}

export async function setProfileDocument(userId: string, data: GSK_PROFILE) {
  try {
    const profileSnamshot = getProfileDocumentSnapshot(userId);
    if (!profileSnamshot) {
      console.log('No profile snapshot found');
      return;
    }
    // see if doc exists
    const docRef = (await getDocs(profileSnamshot))?.docs?.[0]?.ref;
    if (docRef) {
      console.log('Document already exists, updating...');
      // If the document exists, update it
      // get the document reference
      // update the document
      await setDoc(docRef, data, { merge: true });
    } else {
      console.log('Document does not exist, creating new one...');
      // If the document does not exist, create a new one

      const docRef = doc(db, 'CV', data.id);
      // set the document
      await setDoc(docRef, data, { merge: true });
    }
  } catch (error) {
    console.error('Error writing document:', error);
    throw error;
  }
}
