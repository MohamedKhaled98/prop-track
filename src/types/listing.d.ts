import type { Agent } from "./agent";
import type { BaseQueryFilter } from "./common";
import type { Location } from "./location";

interface Price {
  value: number;
  period: string;
}
interface Size {
  value: number;
  unit: string;
}

export interface Listing {
  _id: string;
  title: string;
  description: string;
  propertyType: string;
  offeringType: string;
  bathroomsValue: number;
  bedroomsValue: number;
  price: Price;
  size: Size;
  locationRef: string;
  location: Location;
  images: string[];
  amenities: string[];
  publishedDate: string;
  agent: Agent;
}

export interface ListingsFilter extends BaseQueryFilter {
  filter: {
    propertyType?: string;
    offeringType: string;
    location?: string;
    price?: {
      value: number;
      period: string;
    };
    size?: number;
    amenities: string[];
    bedroomsValue: number[];
    bathroomsValue: number[];
  };
}
