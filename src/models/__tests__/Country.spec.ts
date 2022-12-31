import { describe, it, expect } from "vitest";
import { Country } from "../Country";
import { MOCK_COUNTRY } from "./__mocks__/Country.mock";

describe("Country model", () => {
  it("creates properly", () => {
    const country = new Country(MOCK_COUNTRY);
    expect(country).toHaveProperty("name");
    expect(country).toHaveProperty("code");
    expect(country).toHaveProperty("timezone");
    expect(country).toHaveProperty("offset");
  });

  it("getCountryByCode", () => {
    const country = new Country(MOCK_COUNTRY);
    expect(Country.getCountryByCode(MOCK_COUNTRY.code)).toEqual(country);
  });

  it("getCountryByTimezone", () => {
    const country = new Country(MOCK_COUNTRY);
    expect(Country.getCountryByTimezone(MOCK_COUNTRY.timezone)).toEqual(
      country
    );
  });

  it("convertTimeBetweenTimezones", () => {
    expect(Country.convertTimeBetweenTimezones("15:30", 60, 180)).toEqual(
      "17:30"
    );
    expect(Country.convertTimeBetweenTimezones("23:30", 60, 210)).toEqual(
      "02:00"
    );
  });
});
