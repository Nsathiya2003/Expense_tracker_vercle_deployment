import Cards from "../component/dashboard-cards";
import IncomeExpenseChart from "../component/dashboard-chart-bar";
import SpendHistory from "../component/spend-history";
import WelcomeProfileComponent from "../component/welcome-profile";

export default function Dashboard() {
  return (
    <div className="flex justify-center px-3 sm:px-6 lg:px-2">
      <div className="w-full max-w-[1800px]">
        {/* Profile */}
        <WelcomeProfileComponent />

        {/* -------------------- Row 1: Cards -------------------- */}
        <div className="grid gap-4 sm:gap-6 lg:gap-2">
          <Cards />
        </div>

        {/* -------------------- Row 2: Charts -------------------- */}
        <div
          className="grid gap-2 sm:gap-6 mt-6 lg:ml-6 g-2"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          <IncomeExpenseChart />
          <SpendHistory />
        </div>
      </div>
    </div>
  );
}
