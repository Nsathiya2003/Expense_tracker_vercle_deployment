import { MdTrendingDown, MdToday } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";

interface Props {
  totalExpense: number;
  todayExpense: number;
  recordCount: number;
}

export default function ExpenseSummaryCards({
  totalExpense,
  todayExpense,
  recordCount,
}: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5 px-0 sm:px-6">
      {/* Total Expenses */}
      <div className="rounded-xl p-3 flex flex-col gap-1 bg-red-500/10 border border-red-400/30">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-red-300">Total Expenses</p>
          <MdTrendingDown className="text-red-400 text-sm" />
        </div>
        <p className="text-lg font-bold text-white leading-tight">
          ₹{totalExpense.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Today's Expenses */}
      <div className="rounded-xl p-3 flex flex-col gap-1 bg-orange-500/10 border border-orange-400/30">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-orange-300">
            Today's Expenses
          </p>
          <MdToday className="text-orange-400 text-sm" />
        </div>
        <p className="text-lg font-bold text-white leading-tight">
          ₹{todayExpense.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Total Records */}
      <div className="col-span-2 sm:col-span-1 rounded-xl p-3 flex flex-col gap-1 bg-amber-500/10 border border-amber-400/30">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-amber-300">Total Records</p>
          <IoDocumentTextOutline className="text-amber-400 text-sm" />
        </div>
        <p className="text-lg font-bold text-white leading-tight">
          {recordCount.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
