import type { IRating } from "@/models/Rating";
import type { IImage } from "@/models/Image";
import type { IShow } from "@/models/Show";
import { Rating } from "@/models/Rating";
import { Image } from "@/models/Image";
import { Show } from "@/models/Show";
import { Country } from "@/models/Country";

export interface IEpisode {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string;
  airtime: string;
  airstamp: number;
  runtime: number;
  rating: IRating;
  image: IImage;
  summary: string;
  show: IShow;
  _links: {
    self: {
      href: string;
    };
    show: {
      href: string;
    };
  };
}

export class Episode {
  id;
  url;
  name;
  season;
  number;
  type;
  airdate;
  airtime;
  airstamp;
  runtime;
  rating;
  image;
  summary;
  show;
  _links;
  constructor(props: IEpisode) {
    const {
      id,
      url,
      name,
      season,
      number,
      type,
      airdate,
      airtime,
      airstamp,
      runtime,
      rating,
      image,
      summary,
      show,
      _links,
    } = props;
    this.id = id;
    this.url = url;
    this.name = name;
    this.season = season;
    this.number = number;
    this.type = type;
    this.airdate = airdate;
    this.airtime = airtime;
    this.airstamp = airstamp;
    this.runtime = runtime;
    this.rating = new Rating(rating);
    if (image) this.image = new Image(image);
    this.summary = summary;
    this.show = new Show(show);
    this._links = _links;
  }

  getShow = (): Show => this.show;

  getAirTime = (sourceOffset: number, targetOffset: number): string =>
    this.airtime
      ? Country.convertTimeBetweenTimezones(
          this.airtime,
          sourceOffset,
          targetOffset
        )
      : "No AirTime";

  getImage = (size: "medium" | "original"): string => {
    if (!this.image)
      return `${
        import.meta.env.BASE_URL || "/"
      }placeholder.episode.${size}.png`;
    return this.image[size];
  };

  static getEpisodesByGenre = (episodes: Episode[]) => {
    const result: { [genre: string]: Episode[] } = {};
    Episode.getGenres(episodes).forEach((genre) => {
      result[genre] = episodes.filter((episode) =>
        episode.show.genres.includes(genre)
      );
    });
    return result;
  };

  static getEpisodesByNetwork = (episodes: Episode[]) => {
    const result: { [network: string]: Episode[] } = {};
    Episode.getNetworks(episodes).forEach((network) => {
      result[network] = episodes.filter(
        (episode) => episode.getShow().getNetworkName() === network
      );
    });
    return result;
  };

  static getGenres = (episodes: Episode[]) => {
    let genres: string[] = [];
    episodes.forEach((episode) => {
      genres = [...genres, ...episode.show.genres];
    });
    return genres
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();
  };

  static getNetworks = (episodes: Episode[]) => {
    let networks: string[] = [];
    episodes.forEach((episode) => {
      networks = [...networks, ...[episode.getShow().getNetworkName()]];
    });
    return networks
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();
  };
}
