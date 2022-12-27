import type { ICountry } from "@/models/Country";

export interface INetwork {
  id: number;
  name: string;
  country: ICountry;
  officialSite: string;
}

export class Network {
  id;
  name;
  country;
  officialSite;
  constructor(props: INetwork) {
    const { id, name, country, officialSite } = props;
    this.id = id;
    this.name = name;
    this.country = country;
    this.officialSite = officialSite;
  }
}
