import {
  collection,
  type DocumentData,
  getDocs,
  getFirestore,
  limit,
  query,
  type QueryConstraint,
  type QueryDocumentSnapshot,
  startAfter,
  where,
  //startAfter,
} from 'firebase/firestore';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { type GSK_EVENT } from 'src/services/library/types/events';

const db = getFirestore();

export const useQueryStore = defineStore('queryStore', {
  state: () => {
    const eventsList: GSK_EVENT[] = [];
    const queryText = '';
    const limit = 25;
    const lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData> | null = null;
    const selectedCategory = '';
    const profileId = '';
    return {
      eventsList,
      queryText,
      limit,
      lastVisible: lastVisible as QueryDocumentSnapshot<DocumentData, DocumentData> | null,
      selectedCategory,
      profileId,
    };
  },

  getters: {
    getEventsList: (state) => {
      return state.eventsList;
    },
    getQueryText: (state) => {
      return state.queryText;
    },
    getLimit: (state) => {
      return state.limit;
    },
    getLastVisible: (state) => {
      return state.lastVisible;
    },
    getSelectedCategory: (state) => {
      return state.selectedCategory;
    },
    getProfileId: (state) => {
      return state.profileId;
    },
  },

  actions: {
    setEventsList(events: GSK_EVENT[]) {
      this.eventsList = events;
    },
    setQueryText(query: string) {
      console.log('Query Text: ', query);
      this.queryText = query?.toLocaleLowerCase() || '';
    },
    setLimit(limit: number) {
      this.limit = limit;
    },
    setLastVisible(lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData> | null) {
      this.lastVisible = lastVisible;
    },
    setSelectedCategory(category: string) {
      this.selectedCategory = category;
    },
    setProfileId(profileId: string) {
      this.profileId = profileId;
      console.log('Profile ID: ', this.profileId);
    },
    async refreshQuery() {
      this.eventsList = [];
      if (!this.profileId) {
        return;
      }
      const collectionPath = `CV/${this.profileId}/events`;

      const queryParams: QueryConstraint[] = [];
      if (this.queryText) {
        queryParams.push(where('searchableText', 'array-contains-any', this.queryText.split(' ')));
      }
      if (this.lastVisible) {
        queryParams.push(startAfter(this.lastVisible));
      }
      queryParams.push(limit(this.limit));
      console.log('Query Params: ', queryParams);
      const q = query(collection(db, collectionPath), ...queryParams);

      console.log('Query: ', q);

      const querySnapshot = await getDocs(q);
      const newResults: GSK_EVENT[] = [];
      querySnapshot.forEach((doc) => {
        const event = doc.data();
        event.startDate = event?.startDate ? new Date(event.startDate) : null;
        event.endDate = event?.endDate ? new Date(event.endDate) : null;
        event.lastUpdated = event?.lastUpdated ? new Date(event.lastUpdated) : null;
        event.createdDate = event?.createdDate ? new Date(event.createdDate) : null;
        event.categories = event?.categories ? event.categories : [];
        event.isPublic = event?.isPublic ? event.isPublic : false;
        event.isFeatured = event?.isFeatured ? event.isFeatured : false;
        event.priority = event?.priority ? event.priority : -1;
        event.content = event?.content ? event.content : [];
        event.id = doc.id;
        newResults.push(event as GSK_EVENT);
      });
      this.eventsList = [...this.eventsList, ...newResults];
      this.setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQueryStore, import.meta.hot));
}
