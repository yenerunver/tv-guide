export interface ISchedule {
  time: string;
  days: string[];
}

export class Schedule {
  time;
  days;
  constructor(props: ISchedule) {
    const { time, days } = props;
    this.time = time;
    this.days = days;
  }
}
