"use client"
import { useEffect, useState } from "react";
import { useGetCountriesQuery } from "@/state/api";
 type Data = {
          "Country Name": string;
         Capital: string;
          Population: string;
          Area: number;
          Flag: string;
          id: number;
        }[]
      | undefined 

export const useLogic = () => {

  const [draftData, setDraftData] = useState<Data>([]);
  const { data } = useGetCountriesQuery();

  const columnsCell = [
    {
      header:' Country Name',
      accessorKey: "Country Name",
    },

    { header: "Capital", accessorKey: "Capital" },
    { header: "Population", accessorKey: "Population" },
    { header: "Area", accessorKey: "Area" },
    {
      header: "Flag",
      accessorKey: "Flag",
      cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
        return <img src={row.getValue("Flag")} width={40} height={30} />;
      },
    },
  ];

  useEffect(() => {
    const newArr= data?.map((entry, index) => {
      return {
        "Country Name": entry.name.common,
        Capital: entry.capital?.[0],
        Population: Number(entry.population).toLocaleString(),
        Area: entry?.area,
        Flag: entry.flags?.png,
        id: index + 10, // Use entry.id if available, otherwise generate by index
      };
    });
    setDraftData(newArr);
  }, [data]);
  return {
    data,
    draftData,
    columnsCell,
  };
};
