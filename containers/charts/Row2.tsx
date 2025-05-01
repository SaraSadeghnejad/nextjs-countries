"use client"
import { useMemo, useState } from "react";
import { CardHeader } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "d3-format";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCountriesQuery } from "@/state/api";

// Define interfaces for type safety
export interface CountryData {
  capital: string;
  flags: {png:string};
  continents: string[];
  name: {
    common: string;
  };
  population: number;
  area: number;
}

interface FormattedCountryData {
  name: string;
  population: number;
  area: number;
}

interface CountryOption {
  value: string;
  label: string;
}

const numberFormat = format(".2s");

const Row2 = () => {
  const { data } = useGetCountriesQuery();
  const [country1, setCountry1] = useState<string>("");
  const [country2, setCountry2] = useState<string>("");

  // Format country data
  const countryData = useMemo(() => {
    if (!data) return [];
    return data.map(
      (item: CountryData): FormattedCountryData => ({
        name: item.name?.common || "Unknown",
        population: item.population || 0,
        area: item.area || 0,
      })
    );
  }, [data]);

  // Filter selected countries
  const selectedCountriesData = useMemo(() => {
    if (!country1 || !country2) return [];

    return countryData.filter(
      (country: FormattedCountryData) =>
        country.name === country1 || country.name === country2
    );
  }, [country1, country2, countryData]);

  // Create country options for select
  const countryOptions = useMemo(() => {
    return countryData.map(
      (country: FormattedCountryData): CountryOption => ({
        value: country.name,
        label: country.name,
      })
    );
  }, [countryData]);

  return (
    <div className="w-full h-full p-6">
      <CardHeader>Country Comparison</CardHeader>
      <div className="flex flex-col sm:flex-row space-x-4 mb-4 justify-center gap-2">
        <Select value={country1} onValueChange={setCountry1}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Country 1" />
          </SelectTrigger>
          <SelectContent>
            {countryOptions.length > 0 ? (
              countryOptions.map((country: CountryOption) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="loading" disabled>
                Loading countries...
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        <Select value={country2} onValueChange={setCountry2}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Country 2" />
          </SelectTrigger>
          <SelectContent>
            {countryOptions.length > 0 ? (
              countryOptions.map((country: CountryOption) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="loading" disabled>
                Loading countries...
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      {selectedCountriesData.length === 2 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={selectedCountriesData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value: number) => numberFormat(value)} />
            <Tooltip
              formatter={(value: number) => [numberFormat(value), "Value"]}
            />
            <Legend />
            <Bar dataKey="population" fill="#8884d8" name="Population" />
            <Bar dataKey="area" fill="#82ca9d" name="Area" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center mt-4">Select two countries to compare.</div>
      )}
    </div>
  );
};

export default Row2;
