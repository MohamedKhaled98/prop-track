import axios from "axios";

const signup = async (values: any) => {
  const { data } = await axios.post("/agents", values);
  return data;
};

const agentSerice = {
  signup,
};

export default agentSerice;
