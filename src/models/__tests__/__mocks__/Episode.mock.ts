import { MOCK_RATING } from "@/models/__tests__/__mocks__/Rating.mock";
import { MOCK_SHOW } from "@/models/__tests__/__mocks__/Show.mock";
import type { IEpisode } from "@/models/Episode";

export const MOCK_EPISODE: IEpisode = {
  id: 2458704,
  name: "The Hulk",
  airtime: "09:00",
  runtime: 180,
  rating: MOCK_RATING,
  image: null,
  show: MOCK_SHOW,
};
