import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import type { IncomeData } from "../../types/types";
import TableLoader from "../../utils/TableLoader";

interface Props {
  isLoading: boolean;
  incomeData: IncomeData[];
  onEdit: (id: string) => void;
  setDeleteId: (id: string) => void;
  setDeleteDialog: (v: boolean) => void;
}

export default function IncomeTableDesktop({
  isLoading,
  incomeData,
  onEdit,
  setDeleteId,
  setDeleteDialog,
}: Props) {
  return (
    <div
      className="hidden md:block bg-[rgba(255,255,255,0.05)] border border-gray-700 
      shadow-lg backdrop-blur-md rounded-xl overflow-hidden"
    >
      <table className="w-full text-sm">
        <thead className="bg-gradient-to-r from-[#2E2E48] to-[#3E3E5E] text-white uppercase text-xs tracking-wider">
          <tr>
            <th className="py-4 px-4 text-left font-semibold">Category</th>
            <th className="py-4 px-4 text-left font-semibold">Total Amount</th>
            <th className="py-4 px-4 text-left font-semibold">Balance</th>
            <th className="py-4 px-4 text-left font-semibold">
              Goal Contribution
            </th>
            <th className="py-4 px-4 text-left font-semibold">Goal Name</th>
            <th className="py-4 px-4 text-left font-semibold">
              Contributed Amount
            </th>
            <th className="py-4 px-4 text-left font-semibold">Income Date</th>
            <th className="py-4 px-4 text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <TableLoader />
          ) : incomeData.length > 0 ? (
            incomeData.map((item: IncomeData, index: number) => (
              <tr
                key={item._id}
                className={`border-b border-gray-700 hover:bg-[rgba(84,175,84,0.1)] transition ${
                  index % 2 === 0
                    ? "bg-[rgba(255,255,255,0.02)]"
                    : "bg-[rgba(255,255,255,0.05)]"
                }`}
              >
                <td className="py-4 px-4 font-semibold text-white">
                  <span className="bg-blue-500 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                    {item.income_category || "N/A"}
                  </span>
                </td>
                <td className="py-4 px-4 font-bold text-green-400">
                  ₹{item.income_amount?.toLocaleString("en-IN") || 0}
                </td>
                <td className="py-4 px-4 font-bold text-green-400">
                  ₹{item.current_income_amount?.toLocaleString("en-IN") || 0}
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                      item.saving_contribution
                        ? "bg-green-500 bg-opacity-20 text-green-300 border border-green-500 border-opacity-30"
                        : "bg-gray-500 bg-opacity-20 text-gray-400 border border-gray-500 border-opacity-30"
                    }`}
                  >
                    {item.saving_contribution ? "✓ Yes" : "✗ No"}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-300">
                  {typeof item.goal_id === "object" &&
                  item.goal_id?.goal_name ? (
                    <span className="bg-purple-500 bg-opacity-20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
                      {item.goal_id.goal_name}
                    </span>
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </td>
                <td className="py-4 px-4 text-center font-bold text-amber-400">
                  ₹{(item.goal_contribute_amount || 0).toLocaleString("en-IN")}
                </td>
                <td className="py-4 px-4 text-gray-300 text-sm">
                  <span className="bg-gray-700 bg-opacity-50 px-2 py-1 rounded">
                    {new Date(item.income_date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-center items-center gap-2">
                    {/* Edit */}
                    <button
                      onClick={() => onEdit(item._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition transform hover:scale-110"
                      title="Edit Income"
                    >
                      <BiEdit size={18} />
                    </button>
                    {/* Delete */}
                    <button
                      onClick={() => {
                        setDeleteId(item._id);
                        setDeleteDialog(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition transform hover:scale-110"
                      title="Delete Income"
                    >
                      <MdDelete size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="text-center py-12 text-gray-400 text-base"
              >
                <div className="flex flex-col items-center gap-2">
                  <p className="text-3xl">📭</p>
                  <p>No income records found</p>
                </div>
              </td>
            </tr>
          )}
          {/* Mobile View (Cards) */}
          {/* <div className="md:hidden space-y-4">
            {isLoading ? (
              <TableLoader />
            ) : incomeData.length > 0 ? (
              incomeData.map((item: IncomeData) => (
                <div
                  key={item._id}
                  className="bg-[rgba(255,255,255,0.05)] border border-gray-700 rounded-xl p-4 space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-blue-300">
                      {item.income_category || "N/A"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(item.income_date).toLocaleDateString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Amount</span>
                    <span className="font-bold text-green-400">
                      ₹{item.income_amount?.toLocaleString("en-IN") || 0}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Balance</span>
                    <span className="font-bold text-green-400">
                      ₹
                      {item.current_income_amount?.toLocaleString("en-IN") || 0}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Goal</span>
                    <span className="text-gray-300">
                      {typeof item.goal_id === "object" &&
                      item.goal_id?.goal_name
                        ? item.goal_id.goal_name
                        : "—"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.saving_contribution
                          ? "bg-green-500/20 text-green-300"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {item.saving_contribution
                        ? "✓ Contributed"
                        : "✗ Not Contributed"}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(item._id)}
                        className="bg-blue-500 text-white p-2 rounded-lg"
                      >
                        <BiEdit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteId(item._id);
                          setDeleteDialog(true);
                        }}
                        className="bg-red-500 text-white p-2 rounded-lg"
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-400">
                No income records foundss
              </div>
            )}
          </div> */}
        </tbody>
      </table>
    </div>
  );
}
