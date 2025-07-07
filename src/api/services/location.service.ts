import axios from "axios";

const search = async (query: string) => {
  const { data } = await axios.get("/locations", { params: { query } });
  return data;
};

const locationService = {
  search,
};

export default locationService;
