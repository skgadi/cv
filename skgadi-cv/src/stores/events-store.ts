import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { type GSK_EVENT } from 'src/services/library/types/events';

const db = getFirestore();

export const useEventsStore = defineStore('eventsStore', {
  state: () => {
    const availableEvent = null as GSK_EVENT | null;

    return { availableEvent };
  },

  getters: {
    getAvailableEvent: (state) => state.availableEvent,
  },

  actions: {
    setAvailableEvent(event: GSK_EVENT | null) {
      this.availableEvent = event;
    },
    getEventById: async (id: string, profileId: string) => {
      try {
        if (!id) {
          console.log('Event ID is not defined');
          return null;
        }
        if (!profileId) {
          console.log('Profile ID is not defined');
          return null;
        }
        useEventsStore().setAvailableEvent(null);
        const collectionName = `CV/${profileId}/events`;
        const docRef = doc(db, collectionName, id);
        // get the document
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Convert Firestore Timestamp to JavaScript Date
          const convertedData = {
            ...data,
            startDate: data?.startDate?.toDate() || new Date(),
            endDate: data?.endDate?.toDate() || new Date(),
            lastUpdated: data?.lastUpdated?.toDate() || new Date(),
            createdDate: data?.createdDate?.toDate() || new Date(),
          } as GSK_EVENT;
          useEventsStore().setAvailableEvent(convertedData);
        }
      } catch (error) {
        console.log('Error fetching event: ', error);
        //throw new Error('Error fetching event');
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEventsStore, import.meta.hot));
}
