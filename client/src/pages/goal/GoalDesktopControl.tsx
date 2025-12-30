import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import type { GoalData } from "../../types/types";

interface GoalTableDesktopProps {
  isLoading: boolean;
  goalData: GoalData[];
  onEdit: (id: string) => void;
  setDeleteId: (id: string) => void;
  setDeleteDialog: (open: boolean) => void;
}

export default function GoalTableDesktop({
  isLoading,
  goalData,
  onEdit,
  setDeleteId,
  setDeleteDialog,
}: GoalTableDesktopProps) {
  if (isLoading) {
    return (
      <p className="text-center py-6 text-gray-400 hidden md:block">
        Loading...
      </p>
    );
  }

  return (
    <div className="hidden md:block bg-[rgba(255,255,255,0.05)] border border-gray-700 shadow-lg backdrop-blur-md rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        {/* ================= TABLE HEAD ================= */}
        <thead className="bg-gradient-to-r from-[#2E2E48] to-[#3E3E5E] text-white uppercase text-xs tracking-wider">
          <tr>
            <th className="py-4 px-4 text-left font-semibold">Goal Name</th>
            <th className="py-4 px-4 text-left font-semibold">Target Amount</th>
            <th className="py-4 px-4 text-left font-semibold">
              Allocated Amount
            </th>
            <th className="py-4 px-4 text-left font-semibold">Target Date</th>
            <th className="py-4 px-4 text-left font-semibold">Status</th>
            <th className="py-4 px-4 text-center font-semibold">Actions</th>
          </tr>
        </thead>

        {/* ================= TABLE BODY ================= */}
        <tbody>
          {goalData.map((item, index) => (
            <tr
              key={item._id}
              className={`border-b border-gray-700 hover:bg-[rgba(84,175,84,0.1)] transition ${
                index % 2 === 0
                  ? "bg-[rgba(255,255,255,0.02)]"
                  : "bg-[rgba(255,255,255,0.05)]"
              }`}
            >
              {/* Goal Name */}
              <td className="py-4 px-4 font-semibold text-white">
                {item.goal_name}
              </td>

              {/* Target Amount */}
              <td className="py-4 px-4 font-bold text-green-400">
                ₹{item.target_amount?.toLocaleString("en-IN")}
              </td>

              {/* Allocated Amount */}
              <td className="py-4 px-4 font-bold text-blue-400">
                ₹{item.allocated_amount?.toLocaleString("en-IN")}
              </td>

              {/* Target Date */}
              <td className="py-4 px-4 text-gray-300 text-sm">
                <span className="bg-gray-700/50 px-2 py-1 rounded">
                  {new Date(item.deadline_date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </td>

              {/* Status */}
              <td className="py-4 px-4 font-semibold">
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                    item.status === "PENDING"
                      ? "bg-red-500 bg-opacity-20 text-red-300 border border-red-500 border-opacity-40"
                      : item.status === "In-progress"
                      ? "bg-yellow-500 bg-opacity-20 text-yellow-300 border border-yellow-500 border-opacity-40"
                      : item.status === "completed"
                      ? "bg-green-500 bg-opacity-20 text-green-300 border border-green-500 border-opacity-40"
                      : "bg-gray-500 bg-opacity-20 text-gray-300 border border-gray-500 border-opacity-40"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              {/* Actions */}
              <td className="py-4 px-4 flex justify-center gap-2">
                <button
                  onClick={() => onEdit(item._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                  title="Edit Goal"
                >
                  <BiEdit />
                </button>

                <button
                  onClick={() => {
                    setDeleteId(item._id);
                    setDeleteDialog(true);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                  title="Delete Goal"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}

          {/* Empty State */}
          {goalData.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-12 text-gray-400">
                <div className="flex flex-col items-center gap-2">
                  <p className="text-3xl">📭</p>
                  <p>No goal records found</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
