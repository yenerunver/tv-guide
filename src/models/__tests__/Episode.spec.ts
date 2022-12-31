import { describe, it, expect } from "vitest";
import { MOCK_EPISODE } from "./__mocks__/Episode.mock";
import { Episode } from "../Episode";
import { Show } from "../Show";
import { Country } from "../Country";

describe("Episode model", () => {
  it("creates properly", () => {
    const episode = new Episode(MOCK_EPISODE);
    expect(episode).toHaveProperty("id");
    expect(episode).toHaveProperty("name");
    expect(episode).toHaveProperty("airtime");
    expect(episode).toHaveProperty("show");
  });

  it("getShow", () => {
    const episode = new Episode(MOCK_EPISODE);
    expect(episode.getShow()).toBeInstanceOf(Show);
  });

  it("getAirTime", () => {
    const episode = new Episode(MOCK_EPISODE);
    expect(episode.getAirTime(60, 180)).toEqual("11:00");
    expect(episode.getAirTime(30, -270)).toEqual("04:00");
  });

  it("getImage", () => {
    const episode = new Episode(MOCK_EPISODE);
    expect(episode.getImage("medium")).toEqual(
      "/placeholder.episode.medium.png"
    );
    expect(episode.getImage("original")).toEqual(
      "/placeholder.episode.original.png"
    );
  });

  it("getEpisodesByGenre", () => {
    const episode = new Episode(MOCK_EPISODE);
    expect(Episode.getEpisodesByGenre([episode])).toEqual({ Other: [episode] });
  });

  it("getEpisodesByNetwork", () => {
    const episode = new Episode(MOCK_EPISODE);
    expect(Episode.getEpisodesByNetwork([episode])).toEqual({
      ESPN: [episode],
    });
  });

  it("getGenres", () => {
    const episode = new Episode(MOCK_EPISODE);
    expect(Episode.getGenres([episode])).toEqual(["Other"]);
  });

  it("getNetworks", () => {
    const episode = new Episode(MOCK_EPISODE);
    expect(Episode.getNetworks([episode])).toEqual(["ESPN"]);
  });
});
