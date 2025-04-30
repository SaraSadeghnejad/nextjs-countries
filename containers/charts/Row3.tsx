"use client"
import { Card, CardHeader } from "@/components/ui/card";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "d3-format";
import { useGetCountriesQuery } from "@/state/api";

type Props = {};

const numberFormat = format(".2s");

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
]; // More colors

const generateContinentData = (data, continent) => {
  if (!data) return [];

  return data
    .filter((item) => item.continents && item.continents.includes(continent)) // Filter by continent
    .map((item) => ({
      name: item.name?.common || "Unknown",
      population: item.population || 0,
    }));
};

function Row3({}: Props) {
  const { data } = useGetCountriesQuery();

  const asiaData = useMemo(() => generateContinentData(data, "Asia"), [data]);
  const africaData = useMemo(
    () => generateContinentData(data, "Africa"),
    [data]
  );
  const europeData = useMemo(
    () => generateContinentData(data, "Europe"),
    [data]
  );
  const southAmericaData = useMemo(
    () => generateContinentData(data, "South America"),
    [data]
  );
    const northAmericaData = useMemo(
      () => generateContinentData(data, "North America"),
      [data]
    );
  const oceaniaData = useMemo(
    () => generateContinentData(data, "Oceania"),
    [data]
  );
  const renderPieChart = (data, continent) => {
    if (!data || data.length === 0) {
      return <div>No data available for {continent}.</div>;
    }

    return (
      <div className="mt-4 ">
        <h3 className="text-lg font-semibold text-center">{continent}</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              dataKey="population"
              isAnimationActive={false}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={false} // Remove labels
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${numberFormat(value)}`, name]}
            />
            {/* <Legend /> */}
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <>
      <CardHeader>Population by Continent</CardHeader>
      <div className=" w-full h-full">
        {renderPieChart(asiaData, "Asia")}
        {renderPieChart(africaData, "Africa")}
        {renderPieChart(europeData, "Europe")}
        {renderPieChart(southAmericaData, "South America")}
        {renderPieChart(northAmericaData, "North America")}
        {renderPieChart(oceaniaData, "Oceania")}
      </div>
    </>
  );
}

export default Row3;
