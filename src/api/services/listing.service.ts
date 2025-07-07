import axios from "axios";
import type { ListingsFilter } from "../../types/listing";

const fetchListings = async (filters: ListingsFilter) => {
  const { data } = await axios.post("/", filters);
  return data;
};

const listingService = {
  fetchListings,
};

export default listingService;
