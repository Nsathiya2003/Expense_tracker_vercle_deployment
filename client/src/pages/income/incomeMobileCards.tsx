import React from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import type { IncomeData } from "../../types/types";
import TableLoader from "../../utils/TableLoader";

interface IncomeMobileCardsProps {
  incomeData: IncomeData[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const IncomeMobileCards: React.FC<IncomeMobileCardsProps> = ({
  incomeData,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) return <TableLoader />;

  // if (!incomeData.length) {
  //   return (
  //     <div className="text-center py-16 text-gray-400 text-sm">
  //       No income records found
  //     </div>
  //   );
  // }

  return (
    <div className="md:hidden pb-24">
      {incomeData.length === 0 ? (
        /* ===== NO DATA STATE ===== */
        <div className="flex items-center justify-center h-10">
          <p className="text-sm text-gray-400 italic">No data found</p>
        </div>
      ) : (
        /* ===== DATA LIST ===== */
        <div className="space-y-5">
          {incomeData.map((item) => (
            <div
              key={item._id}
              className="
              rounded-2xl
              bg-[#1f1f2e]
              border border-gray-700
              overflow-hidden
            "
            >
              {/* ===== Top Section ===== */}
              <div className="p-4 space-y-2">
                {/* Category & Date */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-blue-400">
                    {item.income_category || "Income"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(item.income_date).toLocaleDateString("en-IN")}
                  </span>
                </div>

                {/* Amount */}
                <div className="text-2xl font-bold text-green-400">
                  ₹{item.income_amount?.toLocaleString("en-IN") || 0}
                </div>

                {/* Balance */}
                <div className="text-xs text-gray-400">
                  Balance:&nbsp;
                  <span className="text-gray-200 font-medium">
                    ₹{item.current_income_amount?.toLocaleString("en-IN") || 0}
                  </span>
                </div>

                {/* Goal Contribution */}
                {item.saving_contribution && (
                  <div className="text-xs text-blue-300">
                    Goal Contribution:&nbsp;
                    <span className="font-semibold text-red-400">
                      ₹
                      {item.goal_contribute_amount?.toLocaleString("en-IN") ||
                        0}
                    </span>
                  </div>
                )}
              </div>

              {/* ===== Status + Actions ===== */}
              <div
                className="
              flex items-center justify-between
              px-4 py-3
              bg-[#26263a]
              border-t border-gray-700
            "
              >
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    item.saving_contribution
                      ? "bg-green-500/20 text-green-300"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {item.saving_contribution ? "Contributed" : "Not Contributed"}
                </span>

                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(item._id)}
                    className="p-2 rounded-lg bg-blue-500/20 text-blue-400 active:scale-95"
                  >
                    <BiEdit size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(item._id)}
                    className="p-2 rounded-lg bg-red-500/20 text-red-400 active:scale-95"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IncomeMobileCards;
