import axios from "axios";

const create = async (values: any) => {
  const { data } = await axios.post("/properties", values);
  return data;
};

const propertyService = {
  create,
};

export default propertyService;
