import { create } from "zustand";
import type { ListingsFilter } from "../types/listing";

type Store = {
  initialized: boolean;
  query: ListingsFilter;
  setQuery: (query: ListingsFilter) => void;
};

export const useListingsQueryStore = create<Store>(set => ({
  initialized: false,
  query: {
    filter: {
      offeringType: "rent",
      amenities: [],
      bedroomsValue: [],
      bathroomsValue: [],
    },
    limit: 5,
    page: 1,
  },
  setQuery: (query: ListingsFilter) => {
    set({ query, initialized: true });
  },
}));
