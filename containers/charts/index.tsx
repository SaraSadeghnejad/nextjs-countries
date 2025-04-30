
import { Card } from "@/components/ui/card";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";

function Dashboard() {
  return (
    <Card className="mx-10 p-6">
      <Row2 />
      <Row1 />
      <Row3 />
    </Card>
  );
}

export default Dashboard;
