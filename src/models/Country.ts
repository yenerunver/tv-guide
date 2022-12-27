import {
  getCountry,
  getTimezone,
  getAllCountries,
} from "countries-and-timezones";
import type { Country as CountryType } from "countries-and-timezones";

export class Country {
  name: string;
  code: string;
  timezone: string;

  constructor(name: string, code: string, timezone: string) {
    this.name = name;
    this.code = code;
    this.timezone = timezone;
  }

  static getCountryByCode = (code: string, timezone: string = "") => {
    const country = getCountry(code);
    if (!country) return null;
    return new Country(country.name, code, timezone || country.timezones[0]);
  };

  static getCountryByTimezone = (timezone: string) => {
    const countryTimezone = getTimezone(timezone);
    if (!countryTimezone) return null;
    const [countryCode] = countryTimezone.countries;
    return Country.getCountryByCode(countryCode, timezone);
  };

  static getAllCountries = () => {
    return (
      Object.values(getAllCountries())
        // Shrinking the country list for demo purposes
        .filter((country: CountryType) =>
          ["AU", "CN", "DE", "IN", "NL", "TR", "UK", "US"].includes(country.id)
        )
        .map((country: CountryType) => country.id)
        .map((countryCode: string) => Country.getCountryByCode(countryCode))
    );
  };
}
