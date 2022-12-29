export interface IExternals {
  tvrage: number | null;
  thetvdb: number | null;
  imdb: string | null;
}

export class Externals {
  tvrage;
  thetvdb;
  imdb;
  constructor(props: IExternals) {
    const { tvrage, thetvdb, imdb } = props;
    this.tvrage = tvrage;
    this.thetvdb = thetvdb;
    this.imdb = imdb;
  }

  getIMDbUrl = () =>
    this.imdb ? `https://www.imdb.com/title/${this.imdb}` : "";

  getTheTVDBUrl = () =>
    this.thetvdb ? `https://thetvdb.com/search?query=${this.thetvdb}` : "";

  getTheTVRageUrl = () =>
    this.tvrage ? `https://www.tvrage.com/shows/id-${this.tvrage}` : "";
}
