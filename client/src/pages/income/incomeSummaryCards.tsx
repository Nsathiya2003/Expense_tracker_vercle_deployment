import { FiDollarSign, FiList, FiTarget } from "react-icons/fi";

interface Props {
  totalIncome: number;
  totalContributed: number;
  recordCount: number;
}

export default function IncomeSummaryCards({
  totalIncome,
  totalContributed,
  recordCount,
}: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
      {/* Total Income */}
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
          <p className="text-xs font-medium text-green-300">Total Income</p>
          <FiDollarSign className="text-green-400 text-sm" />
        </div>
        <p className="text-lg font-bold text-white leading-tight">
          ₹{totalIncome > 0 ? totalIncome.toLocaleString("en-IN") : 0}
        </p>
      </div>

      {/* Contributed */}
      <div
        className="
          rounded-xl
          p-3
          flex flex-col gap-1
          bg-blue-500/10
          border border-blue-400/30
        "
      >
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-blue-300">Contributed</p>
          <FiTarget className="text-blue-400 text-sm" />
        </div>
        <p className="text-lg font-bold text-white leading-tight">
          ₹{totalContributed.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Records */}
      <div
        className="
          col-span-2 sm:col-span-1
          rounded-xl
          p-3
          flex items-center justify-between
          bg-orange-500/10
          border border-orange-400/30
        "
      >
        <div>
          <p className="text-xs font-medium text-orange-300">Total Records</p>
          <p className="text-base font-semibold text-white">
            {recordCount.toLocaleString("en-IN")}
          </p>
        </div>
        <FiList className="text-orange-400 text-sm" />
      </div>
    </div>
  );
}
