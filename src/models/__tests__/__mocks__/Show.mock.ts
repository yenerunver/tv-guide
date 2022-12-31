import { MOCK_RATING } from "@/models/__tests__/__mocks__/Rating.mock";
import { MOCK_NETWORK } from "@/models/__tests__/__mocks__/Network.mock";
import type { IShow } from "@/models/Show";

export const MOCK_SHOW: IShow = {
  id: 9530,
  name: "College GameDay",
  language: "English",
  genres: [],
  runtime: 180,
  premiered: "1987-09-05",
  ended: null,
  schedule: null,
  rating: MOCK_RATING,
  network: MOCK_NETWORK,
  image: {
    medium:
      "https://static.tvmaze.com/uploads/images/medium_portrait/33/83373.jpg",
    original:
      "https://static.tvmaze.com/uploads/images/original_untouched/33/83373.jpg",
  },
  summary:
    "<p><b>College GameDay</b> is an ESPN entertainment show previewing college football games. It first aired in 1987 with Tim Brando as host and Lee Corso and Beano Cook as commentators, giving an overview of college football games, but the show underwent a radical transformation beginning in 1993, and began incorporating live broadcasts. The official name of the show is <i>College GameDay built by The Home Depot</i>. There is a separate radio broadcast, <i>ESPN Radio College GameDay</i>, on ESPN Radio. Today, the only original cast member remaining is Lee Corso. Rece Davis serves as host and Kirk Herbstreit is Corso's counterpart. Starting in 2008, Desmond Howardhas been added to the cast in the show's introduction. Craig James served as an analyst from 1990 to 1995. Erin Andrews joined the <i>GameDay</i> crew as a co-host and contributor in 2010, replaced in 2012 by Samantha Ponder. On September 5, 2015, Rece Davis (also host of the college basketball version of <i>GameDay</i>), replaced Chris Fowler as host of the college football version, which itself started its 29th season on that day.</p><p>The show is known for its prediction segment that appears on each broadcast. Typically there are three predictors: Corso, Herbstreit, and an invited guest, usually a celebrity, prominent athlete, or radio personality associated with the host university or school for that week. The end of the show always concludes with a catch phrase and prediction from Corso, who subsequently dons the mascot's headgear of the school he predicts to win the game, usually to the ire or excitement of local fans. Beginning with the 2013 season, <i>GameDay</i> airs for three hours on ESPN. Previously, beginning in 2010, the first hour of the show was broadcast on ESPNU at 9am ET, with the 2 remaining hours of the show on ESPN from 10am-noon ET.</p>",
  updated: 1672470345,
};
