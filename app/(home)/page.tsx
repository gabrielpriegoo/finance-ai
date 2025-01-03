import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransacationsPieCharts from "./_components/transacations-pie-charts";
import { getDashboard } from "../_data/get-dashboard";

interface Props {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");

  if (monthIsInvalid) {
    redirect("?month=01");
  }

  const dashboard = await getDashboard(month);
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <div className="grid grid-cols-[2fr,1fr]">
          <SummaryCards month={month} {...dashboard} />
        </div>
        <div className="grid grid-cols-3 grid-rows-1 gap-6">
          <TransacationsPieCharts month={month} {...dashboard} />
        </div>
      </div>
    </>
  );
};

export default Home;
