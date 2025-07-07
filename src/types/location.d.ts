export interface Location {
  _id: string;
  path: string;
  name: {
    en: string;
    ar: string;
  };
  pathName: {
    en: string;
    ar: string;
  };
  type: "CITY" | "COMMUNITY" | "SUBCOMMUNITY" | "TOWER";
}
