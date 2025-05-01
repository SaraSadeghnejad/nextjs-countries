"use client"

import { CardHeader } from "@/components/ui/card";
import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
  Legend,
  Line,
  LineChart,
} from "recharts";

import { format } from "d3-format"; // Import d3-format for number formatting
import { useGetCountriesQuery } from "@/state/api";

type Props = {};

const numberFormat = format(".2s"); // Format numbers with 2 significant digits and SI prefix

function Row1({}: Props) {
  const { data } = useGetCountriesQuery();

  const countryData = useMemo(() => {
    if (!data) return [];

    return data.map((item) => ({
      name: item.name?.common || "Unknown", // Handle missing names
      population: item.population || 0, // Handle missing population
      area: item.area || 0, // Handle missing area
    }));
  }, [data]);

  if (!countryData || countryData.length === 0) {
    return <div>Loading data...</div>; // Or a more sophisticated loading indicator
  }

  return (
    <div className="w-full h-full">
      <CardHeader>Country Data</CardHeader>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Population</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={countryData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={numberFormat} /> {/* Format Y-axis numbers */}
            <Tooltip formatter={(value) => numberFormat(value as number)} />{" "}
            {/* Format tooltip numbers */}
            <Area
              type="monotone"
              dataKey="population"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Area</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={countryData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={numberFormat} /> {/* Format Y-axis numbers */}
            <Tooltip formatter={(value) => numberFormat(value as number)} />{" "}
            {/* Format tooltip numbers */}
            <Bar dataKey="area" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Row1;
