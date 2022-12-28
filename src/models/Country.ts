import {
  getCountry,
  getTimezone,
  getAllCountries,
} from "countries-and-timezones";
import type { Country as CountryType } from "countries-and-timezones";

export interface ICountry {
  name: string;
  code: string;
  timezone: string;
  offset: number | null;
}

export class Country {
  name;
  code;
  timezone;
  offset;

  constructor(props: ICountry) {
    const { name, code, timezone, offset } = props;
    this.name = name;
    this.code = code;
    this.timezone = timezone;
    this.offset = offset;
  }

  static getCountryByCode = (
    code: string,
    timezone: string = "",
    offset: number | null = null
  ) => {
    const country = getCountry(code);
    if (!country) return null;
    if (!timezone) timezone = country.timezones[0]; // get one of the timezones for simplicity
    if (!offset) offset = getTimezone(timezone)!.utcOffset;
    return new Country({
      name: country.name,
      code,
      timezone,
      offset,
    });
  };

  static getCountryByTimezone = (timezone: string) => {
    const countryTimezone = getTimezone(timezone);
    if (!countryTimezone) return null;
    const [countryCode] = countryTimezone.countries;
    const { utcOffset: offset } = countryTimezone;
    return Country.getCountryByCode(countryCode, timezone, offset);
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

  static convertTimeBetweenTimezones = (
    time: string,
    sourceOffset: number,
    targetOffset: number
  ): string => {
    let [hours, minutes] = time.split(":").map((string) => Number(string)); // convert to single digit
    // convert hours and minutes to UTC
    hours -= sourceOffset / 60;
    minutes -= sourceOffset % 60;
    // convert hours and minutes to target
    hours += targetOffset / 60;
    minutes += targetOffset % 60;
    // adding extra minutes to hours
    if (minutes > 60) {
      hours += minutes / 60;
      minutes = minutes % 60;
    }
    // getting rid of extra hours
    if (hours > 23) hours %= 24;
    // returning them as 2-digit again
    return `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}`;
  };
}
