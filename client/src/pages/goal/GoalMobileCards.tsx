import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import type { GoalData } from "../../types/types";

interface Props {
  isLoading: boolean;
  goalData: GoalData[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function GoalMobileCards({
  isLoading,
  goalData,
  onEdit,
  onDelete,
}: Props) {
  if (isLoading) {
    return (
      <div className="md:hidden text-center text-gray-400 py-10">
        Loading goals...
      </div>
    );
  }

  if (!goalData || goalData.length === 0) {
    return (
      <div className="md:hidden flex items-center justify-center h-64">
        <p className="text-sm text-gray-400 italic">No goals found</p>
      </div>
    );
  }

  return (
    <div className="md:hidden space-y-5 pb-24">
      {goalData.map((item) => (
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
            {/* Goal Name & Status */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-blue-400">
                {item.goal_name || "Goal"}
              </span>

              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  item.status === "PENDING"
                    ? "bg-red-500/20 text-red-300"
                    : item.status === "completed"
                    ? "bg-green-500/20 text-green-300"
                    : "bg-gray-500/20 text-gray-300"
                }`}
              >
                {item.status}
              </span>
            </div>

            {/* Target Amount */}
            <div className="text-lg font-bold text-green-400">
              Target: ₹{item.target_amount?.toLocaleString("en-IN") || 0}
            </div>

            {/* Allocated Amount */}
            <div className="text-sm text-blue-300">
              Allocated: ₹{item.allocated_amount?.toLocaleString("en-IN") || 0}
            </div>

            {/* Deadline Date */}
            <div className="text-xs text-gray-400">
              Target Date:&nbsp;
              <span className="text-gray-200 font-medium">
                {new Date(item.deadline_date).toLocaleDateString("en-IN")}
              </span>
            </div>
          </div>

          {/* ===== Actions ===== */}
          <div
            className="
              flex items-center justify-between
              px-4 py-3
              bg-[#26263a]
              border-t border-gray-700
            "
          >
            <span className="text-xs text-gray-400">Goal Actions</span>

            <div className="flex gap-3">
              <button
                onClick={() => onEdit(item._id)}
                className="
                  p-2 rounded-lg
                  bg-blue-500/20 text-blue-400
                  active:scale-95
                "
              >
                <BiEdit size={18} />
              </button>

              <button
                onClick={() => onDelete(item._id)}
                className="
                  p-2 rounded-lg
                  bg-red-500/20 text-red-400
                  active:scale-95
                "
              >
                <MdDelete size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
