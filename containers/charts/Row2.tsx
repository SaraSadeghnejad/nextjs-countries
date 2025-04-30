"use client"
import { CardHeader } from "@/components/ui/card";
import { useMemo, useState } from "react";
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
import { useGetCountriesQuery } from "@/state/api";

type Props = {};

const numberFormat = format(".2s");

function Row2({}: Props) {
  const { data } = useGetCountriesQuery();
  const [country1, setCountry1] = useState("");
  const [country2, setCountry2] = useState("");

  const countryData = useMemo(() => {
    if (!data) return [];

    return data.map((item) => ({
      name: item.name?.common || "Unknown",
      population: item.population || 0,
      area: item.area || 0,
    }));
  }, [data]);

  const selectedCountriesData = useMemo(() => {
    if (!country1 || !country2) return [];

    return countryData.filter(
      (country) => country.name === country1 || country.name === country2
    );
  }, [country1, country2, countryData]);

  const handleCountry1Change = (event) => {
    setCountry1(event.target.value);
  };

  const handleCountry2Change = (event) => {
    setCountry2(event.target.value);
  };

  const countryOptions = useMemo(() => {
    return countryData.map((country) => (
      <option key={country.name} value={country.name}>
        {country.name}
      </option>
    ));
  }, [countryData]);

  return (
    <div className="w-full h-full">
      <CardHeader>Country Comparison</CardHeader>

      <div className="flex space-x-4 mb-4 justify-center">
        <div>
          <label
            htmlFor="country1"
            className="block text-sm font-medium text-gray-700"
          >
            Country 1:
          </label>
          <select
            id="country1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={country1}
            onChange={handleCountry1Change}
          >
            <option value="">Select Country 1</option>
            {countryOptions}
          </select>
        </div>

        <div>
          <label
            htmlFor="country2"
            className="block text-sm font-medium text-gray-700"
          >
            Country 2:
          </label>
          <select
            id="country2"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={country2}
            onChange={handleCountry2Change}
          >
            <option value="">Select Country 2</option>
            {countryOptions}
          </select>
        </div>
      </div>

      {selectedCountriesData.length === 2 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={selectedCountriesData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={numberFormat} />
            <Tooltip formatter={(value) => numberFormat(value)} />
            <Legend />
            <Bar dataKey="population" fill="#8884d8" name="Population" />
            <Bar dataKey="area" fill="#82ca9d" name="Area" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div>Select two countries to compare.</div>
      )}
    </div>
  );
}

export default Row2;
