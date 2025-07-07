import axios from "axios";

const submitInquiry = async (values: any) => {
  await axios.post("/inquiries", values);
};
const fetchInquiries = async (query: any) => {
  const { data } = await axios.get("/inquiries", { params: query });
  return data;
};
const inquiryService = {
  submitInquiry,
  fetchInquiries,
};

export default inquiryService;
