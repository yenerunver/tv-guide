import type { IRating } from "@/models/Rating";
import type { ISchedule } from "@/models/Schedule";
import type { INetwork } from "@/models/Network";
import type { ICountry } from "@/models/Country";
import type { IExternals } from "@/models/Externals";
import type { IImage } from "@/models/Image";
import { Schedule } from "@/models/Schedule";
import { Network } from "@/models/Network";
import { Rating } from "@/models/Rating";
import { Country } from "@/models/Country";
import { Externals } from "@/models/Externals";
import { Image } from "@/models/Image";

export interface IShow {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string;
  officialSite: string;
  schedule: ISchedule;
  rating: IRating;
  weight: number;
  network: INetwork;
  webChannel: INetwork;
  dvdCountry: ICountry;
  externals: IExternals;
  image: IImage;
  summary: string;
  updated: number;
  _links: {
    self: {
      href: string;
    };
    previousepisode: {
      href: string;
    };
    nextepisode: {
      href: string;
    };
  };
}
export class Show {
  id;
  url;
  name;
  type;
  language;
  genres;
  status;
  runtime;
  averageRuntime;
  premiered;
  ended;
  officialSite;
  schedule;
  rating;
  weight;
  network;
  webChannel;
  dvdCountry;
  externals;
  image;
  summary;
  updated;
  _links;

  constructor(props: IShow) {
    const {
      id,
      url,
      name,
      type,
      language,
      genres,
      status,
      runtime,
      averageRuntime,
      premiered,
      ended,
      officialSite,
      schedule,
      rating,
      weight,
      network,
      webChannel,
      dvdCountry,
      externals,
      image,
      summary,
      updated,
      _links,
    } = props;
    this.id = id;
    this.url = url;
    this.name = name;
    this.type = type;
    this.language = language;
    this.genres = genres.length ? genres : ["Other"];
    this.status = status;
    this.runtime = runtime;
    this.averageRuntime = averageRuntime;
    this.premiered = premiered;
    this.ended = ended;
    this.officialSite = officialSite;
    this.schedule = new Schedule(schedule);
    this.rating = new Rating(rating);
    this.weight = weight;
    if (network) this.network = new Network(network);
    if (webChannel) this.webChannel = new Network(webChannel);
    if (dvdCountry) this.dvdCountry = new Country(dvdCountry);
    if (externals) this.externals = new Externals(externals);
    if (image) this.image = new Image(image);
    this.summary = summary;
    this.updated = updated;
    this._links = _links;
  }

  getName = (): string => this.name;
  getNetwork = (): Network | null => this.network || null;

  getWebChannel = (): Network | null => this.webChannel || null;

  getNetworkName = (): string =>
    this.getNetwork()
      ? this.getNetwork()!.name
      : this.getWebChannel()
      ? this.getWebChannel()!.name
      : "No Network";

  getNetworkCountry = (): Country | null =>
    this.getNetwork()
      ? this.getNetwork()!.country
      : this.getWebChannel()
      ? this.getWebChannel()!.country
      : null;

  getNetworkAndCountryName = (): string =>
    this.getNetworkCountry()
      ? this.getNetworkName() +
        (this.getNetworkCountry ? ", " + this.getNetworkCountry()!.name : "")
      : "No Network";

  getRating = (): number | null => this.rating!.average;

  getGenres = (): string[] => this.genres;

  getGenresJoint = (): string => this.getGenres().join(", ");

  getImage = (size: "medium" | "original"): string => {
    if (!this.image)
      return `${import.meta.env.BASE_URL || "/"}placeholder.show.${size}.png`;
    return this.image[size];
  };

  getEndedLocaleDate = (locale: string) =>
    this.ended
      ? new Date(this.ended).toLocaleDateString(locale, {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "-";

  getPremieredLocaleDate = (locale: string) =>
    this.premiered
      ? new Date(this.premiered).toLocaleDateString(locale, {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "-";

  getExternals = () => this.externals;

  static getTop5 = (shows: Show[]) => {
    const showsWithRatings = shows.filter((show) => show.getRating() !== null);
    showsWithRatings.sort((a, b) => {
      if (a.getRating()! < b.getRating()!) return 1;
      if (a.getRating()! > b.getRating()!) return -1;
      return 0;
    });
    return showsWithRatings.slice(0, 5);
  };
}
