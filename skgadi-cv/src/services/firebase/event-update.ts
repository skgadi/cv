import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { type GSK_EVENT } from 'src/services/library/types/events';

const db = getFirestore();

/**
 * Create a new event in Firebase
 * @param {GSK_EVENT} event - The event object to be created
 * @param {string} profileId - The profileId of the event creator
 * @param {boolean} [isAdmin=false] - Flag to indicate if the user is an admin
 * @returns {string} - The ID of the created event
 * @throws {Error} - Throws an error if the event creation fails
 * @description This function creates a new event in Firebase and returns the ID of the created event.
 * It uses the Firestore database to store the event data.
 */
export async function createOrUpdateEvent(
  event: GSK_EVENT,
  profileId: string,
  isAdmin = false,
): Promise<string> {
  // Check if the user is admin or not.
  if (!isAdmin) {
    console.log('User is not an admin');
    throw new Error('User is not an admin');
  }
  if (!event) {
    console.log('Event is not defined');
    throw new Error('Event is not defined');
  }
  if (!profileId) {
    console.log('Profile ID is not defined');
    throw new Error('Profile ID is not defined');
  }
  if (!event.id) {
    console.log('Event ID is not defined');
    throw new Error('Event ID is not defined');
  }
  try {
    const collectionName = `CV/${profileId}/events`;
    const docRef = doc(db, collectionName, event.id);
    await setDoc(docRef, event, { merge: true });
    return event.id;
  } catch (error) {
    console.error('Error creating event: ', error);
    throw new Error('Error creating event');
  }
}
