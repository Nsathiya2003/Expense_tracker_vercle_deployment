import { FiDollarSign, FiAlertTriangle, FiList } from "react-icons/fi";

interface Props {
  totalBudget: number;
  totalExceeded: number;
  recordCount: number;
}

export default function BudgetSummaryCards({
  totalBudget,
  totalExceeded,
  recordCount,
}: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
      {/* Total Budget */}
      <div
        className="
          rounded-xl
          p-3
          flex flex-col gap-1
          bg-green-500/10
          border border-green-400/30
        "
      >
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-green-300">Total Budget</p>
          <FiDollarSign className="text-green-400 text-sm" />
        </div>

        <p className="text-lg font-bold text-white leading-tight">
          ₹{totalBudget > 0 ? totalBudget.toLocaleString("en-IN") : 0}
        </p>
      </div>

      {/* Exceeded Budgets */}
      <div
        className="
          rounded-xl
          p-3
          flex flex-col gap-1
          bg-red-500/10
          border border-red-400/30
        "
      >
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-red-300">Exceeded</p>
          <FiAlertTriangle className="text-red-400 text-sm" />
        </div>

        <p className="text-lg font-bold text-white leading-tight">
          {totalExceeded.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Total Records */}
      <div
        className="
          col-span-2 sm:col-span-1
          rounded-xl
          p-3
          flex items-center justify-between
          bg-blue-500/10
          border border-blue-400/30
        "
      >
        <div>
          <p className="text-xs font-medium text-blue-300">Total Records</p>
          <p className="text-base font-semibold text-white">
            {recordCount.toLocaleString("en-IN")}
          </p>
        </div>

        <FiList className="text-blue-400 text-sm" />
      </div>
    </div>
  );
}
