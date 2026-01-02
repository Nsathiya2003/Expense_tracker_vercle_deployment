import { BiEdit } from "react-icons/bi";
import type { ExpenseData } from "./expenseTable";
import { MdDelete } from "react-icons/md";

interface ExpenseTableDesktopProps {
  isLoading: boolean;
  expenseData: ExpenseData[];
  onEdit: (id: string) => void;
  setDeleteId: (id: string) => void;
  setDeleteDialog: (open: boolean) => void;
}

export default function ExpenseTableDesktop({
  isLoading,
  expenseData,
  onEdit,
  setDeleteId,
  setDeleteDialog,
}: ExpenseTableDesktopProps) {
  if (isLoading)
    return <p className="text-center py-6 text-gray-400">Loading...</p>;
  //   if (!expenseData.length)
  //     return (
  //       <p className="text-center py-6 text-gray-400 hidden md:block">
  //         No expense records found
  //       </p>
  //     );

  return (
    <div
      className="hidden md:block bg-[rgba(255,255,255,0.05)] border border-gray-700 
    shadow-lg backdrop-blur-md rounded-xl overflow-hidden"
    >
      <table className="w-full text-sm">
        <thead className="bg-gradient-to-r from-[#2E2E48] to-[#3E3E5E] text-white uppercase text-xs tracking-wider">
          <tr>
            <th className="py-4 px-4 text-left font-semibold">Category</th>
            <th className="py-4 px-4 text-left font-semibold">Amount</th>
            <th className="py-4 px-4 text-left font-semibold">Payment Mode</th>
            <th className="py-4 px-4 text-left font-semibold">Date</th>
            <th className="py-4 px-4 text-center font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {expenseData.length > 0 ? (
            expenseData.map((item, index) => (
              <tr
                key={item._id}
                className={`border-b border-gray-700 hover:bg-[rgba(84,175,84,0.1)] transition ${
                  index % 2 === 0
                    ? "bg-[rgba(255,255,255,0.02)]"
                    : "bg-[rgba(255,255,255,0.05)]"
                }`}
              >
                <td className="py-4 px-4 font-semibold text-white">
                  <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-medium">
                    {item.expense_category}
                  </span>
                </td>
                <td className="py-4 px-4 font-bold text-red-400">
                  ₹{item.expense_amount.toLocaleString("en-IN")}
                </td>
                <td className="py-4 px-4 text-gray-300">
                  <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs">
                    {item.payment_mode}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-300 text-sm">
                  <span className="bg-gray-700/50 px-2 py-1 rounded">
                    {new Date(item.expense_date).toLocaleDateString("en-IN")}
                  </span>
                </td>
                <td className="py-4 px-4 flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(item._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                  >
                    <BiEdit />
                  </button>
                  <button
                    onClick={() => {
                      setDeleteId(item._id);
                      setDeleteDialog(true);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-12 text-gray-400">
                <div className="flex flex-col items-center gap-2">
                  <p className="text-3xl">📭</p>
                  <p>No expense records found</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
