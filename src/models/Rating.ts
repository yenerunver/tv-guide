export interface IRating {
  average: number | null;
}

export class Rating {
  average;
  constructor(props: IRating) {
    const { average } = props;
    this.average = average;
  }
}
