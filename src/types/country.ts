// Shared type definitions for all country-related data
export interface CountryData {
  name: {
    common: string;
  };
  population: number;
  area: number;
  capital: string[];
  flags: {
    png: string;
  };
  continents: string[];
}

export interface ChartData {
  name: string;
  population: number;
}

export interface ContinentData {
  asia: ChartData[];
  africa: ChartData[];
  europe: ChartData[];
  southAmerica: ChartData[];
  northAmerica: ChartData[];
  oceania: ChartData[];
}
