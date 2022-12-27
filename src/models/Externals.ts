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
}
