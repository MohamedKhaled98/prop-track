export interface ContactOption {
  type: string;
  value: string;
}
export interface Agent {
  _id: string;
  fullName: string;
  email: string;
  contactOptions: ContactOption[];
}
