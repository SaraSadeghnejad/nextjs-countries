"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";


import { useRouter } from "next/navigation";
import { useGetCountriesQuery } from "@/state/api";
import { ColumnCell } from "@/types/type";


export const useLogic = () => {
  const router = useRouter();

  const [draftData, setDraftData] = useState<ColumnCell>([]);
  const { data } = useGetCountriesQuery();

  const columnsCell = [
    {
      header: (
        { column: col }: { column: MyColumnDef } // Explicitly typing the function parameter
      ) => (
        <Button
          variant="ghost"
          onClick={() => col.toggleSorting(col.getIsSorted() === "asc")}
        >
          Country Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      accessorKey: "Country Name",
    },

    { header: "Capital", accessorKey: "Capital" },
    { header: "Population", accessorKey: "Population" },
    { header: "Area", accessorKey: "Area" },
    {
      header: "Flag",
      accessorKey: "Flag",
       cell: ({ row }) => {
        return (
          <img src={row.getValue("Flag")} width={40} height={30}/>
        );
      
    },
    },
  ];
  type MyColumnDef = ColumnDef<ColumnCell, string>; // Define your ColumnDef type

  // Inside your component or where you use useEffect
  // useEffect(() => {
  //   if (columnsCell) {
  //     const formattedColumns: ColumnCell = columnsCell.map((column: any) => ({
  //       header: (
  //         { column: col }: { column: MyColumnDef } // Explicitly typing the function parameter
  //       ) => (
  //         <Button
  //           variant="ghost"
  //           onClick={() => col.toggleSorting(col.getIsSorted() === "asc")}
  //         >
  //           {column}
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       ),
  //       accessorKey: column, // The key in the data — should also map accurately to MyColumnData
  //     }));
  //     setColumns(formattedColumns);
  //   }
  // }, [data]);

  useEffect(() => {
    const newArr = data?.map((entry, index) => {
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
