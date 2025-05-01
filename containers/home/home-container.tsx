
"use client"
import { DataTable } from "../../components/table/data-table";
import { useLogic } from "./useLogic";
import Loader from "@/components/Loader";

const HomeContainer = () => {
  const { columnsCell, draftData, data } = useLogic();

  return (
    <>
      {draftData && draftData?.length > 0 ? (
        <DataTable columns={columnsCell} data={draftData} />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default HomeContainer;
