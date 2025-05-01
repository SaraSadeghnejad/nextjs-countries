"use client"
import { useMemo } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { format } from "d3-format";
import { useGetCountriesQuery } from "@/state/api";
import { CountryData } from "./Row2";



interface ChartData {
  name: string;
  value: number;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

const numberFormat = format(".2s");

const generateContinentData = (
  data: CountryData[] | undefined,
  continent: string
): ChartData[] => {
  if (!data) return [];

  return data
    .filter((country: CountryData) => country.continents?.includes(continent))
    .map((country: CountryData) => ({
      name: country.name.common,
      value: country.population,
    }));
};

const renderPieChart = (data: ChartData[], continent: string) => {
  if (!data || data.length === 0) {
    return <div>No data available for {continent}</div>;
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-center mb-4">{continent}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={false}
          >
            {data.map((_entry: ChartData, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [
              `${numberFormat(value as number)}`,
              name,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const Row3 = () => {
  const { data } = useGetCountriesQuery();

  const continentData = useMemo(
    () => ({
      asia: generateContinentData(data, "Asia"),
      africa: generateContinentData(data, "Africa"),
      europe: generateContinentData(data, "Europe"),
      northAmerica: generateContinentData(data, "North America"),
      southAmerica: generateContinentData(data, "South America"),
      oceania: generateContinentData(data, "Oceania"),
    }),
    [data]
  );

  return (
    <>
      <CardHeader>Population by Continent</CardHeader>
      <Card className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {renderPieChart(continentData.asia, "Asia")}
        {renderPieChart(continentData.africa, "Africa")}
        {renderPieChart(continentData.europe, "Europe")}
        {renderPieChart(continentData.northAmerica, "North America")}
        {renderPieChart(continentData.southAmerica, "South America")}
        {renderPieChart(continentData.oceania, "Oceania")}
      </Card>
    </>
  );
};
export default Row3;
