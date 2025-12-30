import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSpendHistory } from "../api/dashboard/dashboard-hooks";
// import { spendData } from "../data/spend-history-items";

export default function SpendHistory() {
  const { data: spendDataResponse } = useSpendHistory();

  return (
    <div className="flex-1 min-w-[280px] sm:min-w-[320px] lg:min-w-[400px] xl:min-w-[500px] bg-[#2E362E] p-4 rounded-2xl mt-6 shadow-md hover:shadow-lg transition-all">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Spend History (Last Month)
      </h2>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={spendDataResponse?.data || []}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4ADE80" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1E1E2E",
              border: "1px solid #444",
              borderRadius: "10px",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#22C55E"
            strokeWidth={3}
            fill="url(#colorExpense)"
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
