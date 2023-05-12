export interface player {
  id?: string;
  name: string;
  type: Type;
  city: string;
  country: string;
  picture_link?: string;
}

export enum Type {
  Contract = "Contract",
  Fulltime = "Fulltime",
  Local = "Local",
}
