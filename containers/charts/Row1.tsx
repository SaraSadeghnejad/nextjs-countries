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
            <Tooltip formatter={(value) => numberFormat(value)} />{" "}
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
            <Tooltip formatter={(value) => numberFormat(value)} />{" "}
            {/* Format tooltip numbers */}
            <Bar dataKey="area" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Example of Line Chart (Use with caution - ensure scales are appropriate) */}
      {/* <div className="mb-4">
        <h3 className="text-lg font-semibold">Population vs. Area</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={countryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="population" label={{ value: 'Population', angle: -90, position: 'insideLeft' }} tickFormatter={numberFormat} />
            <YAxis yAxisId="area" orientation="right" label={{ value: 'Area', angle: 90, position: 'insideRight' }} tickFormatter={numberFormat} />
            <Tooltip />
            <Legend />
            <Line yAxisId="population" type="monotone" dataKey="population" stroke="#8884d8" />
            <Line yAxisId="area" type="monotone" dataKey="area" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
}

export default Row1;
