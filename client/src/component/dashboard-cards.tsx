import { useDashboardSummaryCards } from "../api/dashboard/dashboard-hooks";
import { CardItems } from "../data/dashboard-card-items";

export default function Cards() {
  const { data, isLoading, isError } = useDashboardSummaryCards();

  /* -------------------- Loading -------------------- */
  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-4 sm:gap-6 mt-4 sm:mt-6 lg:mt-8 px-3 sm:px-6 lg:px-10">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="flex-1 min-w-[300px] h-36 sm:h-40 bg-[#2E362E]/70 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  /* -------------------- Error -------------------- */
  if (isError) {
    return (
      <p className="text-red-500 mt-6 px-3 sm:px-6">
        Failed to load dashboard summary.
      </p>
    );
  }

  const summary = data?.data;

  /* -------------------- Cards -------------------- */
  return (
    <div
      className="grid gap-4 sm:gap-6 mt-10 sm:mt-6 lg:mt-8 px-3 sm:px-6 lg:px-8"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
    >
      {CardItems.map((item, index) => {
        const Icon = item.icon;
        const apiData = summary?.[item.key];
        const progress =
          item.key === "budget"
            ? Math.min(
                (summary?.expense?.total / apiData?.total) * 100 || 0,
                100
              )
            : Math.min((apiData?.count / 10) * 100, 100);

        return (
          <div
            key={index}
            className="bg-gradient-to-br from-[#2E362E] to-[#1F251F] text-white p-4 sm:p-5 lg:p-6 rounded-xl shadow-md h
            over:shadow-lg transition-all"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2
                  className="text-sm sm:text-base lg:text-[15px] font-semibold"
                  style={{ color: item.color }}
                >
                  {item.label}
                </h2>
                <p className="text-xs sm:text-sm text-gray-400">
                  {item.description}
                </p>
              </div>
              <div
                className="p-2 rounded-md"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <Icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
            </div>

            {/* Amount */}
            <div className="mb-2">
              <p className="text-xs sm:text-sm text-gray-400 mb-1">
                Total Amount
              </p>
              <h3
                className="text-xl sm:text-2xl lg:text-[26px] font-bold"
                style={{ color: item.color }}
              >
                ₹{apiData?.total?.toLocaleString() ?? 0}
              </h3>
            </div>

            {/* Records */}
            <div className="flex justify-between items-center mb-2 text-xs sm:text-sm">
              <span className="text-gray-400">Records (30 days)</span>
              <span className="font-semibold">{apiData?.count ?? 0}</span>
            </div>

            {/* Progress */}
            <div className="mb-3">
              <div className="h-1.5 bg-[#3A423A] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${progress}%`, backgroundColor: item.color }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center text-xs sm:text-sm text-gray-400">
              <span>Last 30 days</span>
              <span className="flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                Active
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
