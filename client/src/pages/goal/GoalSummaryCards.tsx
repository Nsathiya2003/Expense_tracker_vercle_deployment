import { FiCheckCircle, FiClock, FiList } from "react-icons/fi";

interface Props {
  totalGoals: number;
  completedGoals: number;
  pendingGoals: number;
}

export default function GoalSummaryCards({
  totalGoals,
  completedGoals,
  pendingGoals,
}: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
      {/* Total Goals */}
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
          <p className="text-xs font-medium text-green-300">Total Goals</p>
          <FiList className="text-green-400 text-sm" />
        </div>

        <p className="text-lg font-bold text-white leading-tight">
          {totalGoals > 0 ? totalGoals.toLocaleString("en-IN") : 0}
        </p>
      </div>

      {/* Completed Goals */}
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
          <p className="text-xs font-medium text-blue-300">Completed</p>
          <FiCheckCircle className="text-blue-400 text-sm" />
        </div>

        <p className="text-lg font-bold text-white leading-tight">
          {completedGoals.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Pending Goals */}
      <div
        className="
          col-span-2 sm:col-span-1
          rounded-xl
          p-3
          flex items-center justify-between
          bg-red-500/10
          border border-red-400/30
        "
      >
        <div>
          <p className="text-xs font-medium text-red-300">Pending</p>
          <p className="text-base font-semibold text-white">
            {pendingGoals.toLocaleString("en-IN")}
          </p>
        </div>

        <FiClock className="text-red-400 text-sm" />
      </div>
    </div>
  );
}
