export interface IImage {
  medium: string;
  original: string;
}

export class Image {
  medium;
  original;
  constructor(props: IImage) {
    const { medium, original } = props;
    this.medium = medium;
    this.original = original;
  }
}
