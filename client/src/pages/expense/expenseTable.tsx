// import { BiEdit } from "react-icons/bi";
// import { MdDelete } from "react-icons/md";
// import { FiFilter, FiSearch } from "react-icons/fi";
// import React, { useState, useCallback, useMemo } from "react";
// import FilterDialog from "../../dialog/filter";
// import { IoIosArrowForward } from "react-icons/io";
// import { IoIosArrowBack } from "react-icons/io";
// import { useExpenseFilter } from "../../api/expense/expense-hooks";
// import TableLoader from "../../utils/TableLoader";
// import { DeleteDialog } from "../../dialog/delete-dialog";
// import { useDeleteExpense } from "../../api/expense/expense-hooks";
// import { useIncomeBalance } from "../../api/income/income-hooks";

// interface FilterState {
//   page: number;
//   limit: number;
//   search: string;
//   fromDate: string;
//   toDate: string;
// }

// const DEFAULT_FILTERS: FilterState = {
//   page: 1,
//   limit: 10,
//   search: "",
//   fromDate: "",
//   toDate: "",
// };

// interface ExpenseData {
//   _id: string;
//   expense_category: string;
//   expense_amount: number;
//   expense_date: string;
//   payment_mode: string;
//   notes?: string;
//   budget_category?: string;
//   is_recurring?: boolean;
//   tags?: string[];
// }

// export default function ExpenseTable({
//   onEdit,
// }: {
//   onEdit: (id: string) => void;
// }) {
//   const [deleteDialog, setDeleteDialog] = useState(false);
//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
//   const [tempFilters, setTempFilters] = useState<FilterState>({ ...filters });

//   // Get expense data
//   const { data: filterData, isLoading } = useExpenseFilter(filters);

//   //get income balance
//   const { data: incomeBalanceData, isPending } = useIncomeBalance();

//   console.log(
//     "Income Balance Data:",
//     isPending,
//     incomeBalanceData?.data?.balanceAmount
//   );

//   // Delete mutation
//   const deleteMutation = useDeleteExpense({
//     onSuccess: () => {
//       setDeleteDialog(false);
//       setDeleteId(null);
//     },
//   });

//   // Memoized expense data
//   const expenseData = useMemo(() => filterData?.data || [], [filterData?.data]);
//   const paginatedData = useMemo(
//     () => filterData?.pagination || null,
//     [filterData?.pagination]
//   );
//   const totalPages = useMemo(
//     () => filterData?.pagination?.totalPages || 1,
//     [filterData?.pagination?.totalPages]
//   );
//   const hasPrevPage = filterData?.pagination?.hasPrevPage;
//   const hasNextPage = filterData?.pagination?.hasNextPage;

//   // Calculate summary stats
//   const totalExpense = Number(paginatedData?.totalExpenseAmount || 0);
//   const todayExpense = Number(paginatedData?.todayExpenseAmount || 0);
//   const recordCount = Number(paginatedData?.totalRecords || 0);

//   // Handle page change
//   const handlePageChange = useCallback((newPage: number) => {
//     setFilters((prev) => ({ ...prev, page: newPage }));
//   }, []);

//   // Handle search
//   const handleSearch = useCallback((value: string) => {
//     setFilters((prev) => ({ ...prev, search: value, page: 1 }));
//   }, []);

//   // Handle limit change
//   const handleLimitChange = useCallback((limit: number) => {
//     setFilters((prev) => ({
//       ...prev,
//       limit,
//       page: 1,
//     }));
//   }, []);

//   // Handle filter changes
//   const handleFilterChange = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//       const { name, value } = event.target;
//       setTempFilters((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     },
//     []
//   );

//   // Handle apply filters
//   const handleApplyFilters = useCallback(() => {
//     setFilters({
//       page: 1,
//       limit: tempFilters.limit,
//       search: tempFilters.search,
//       fromDate: tempFilters.fromDate,
//       toDate: tempFilters.toDate,
//     });
//     setFilterOpen(false);
//   }, [tempFilters]);

//   // Handle clear filters
//   const handleClearFilters = useCallback(() => {
//     setTempFilters(DEFAULT_FILTERS);
//     setFilters(DEFAULT_FILTERS);
//     setFilterOpen(false);
//   }, []);

//   return (
//     <div className="overflow-x-auto mt-10 px-6 text-gray-200">
//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <div className="bg-gradient-to-br from-red-500 to-red-600 bg-opacity-20 border border-red-500 border-opacity-30 rounded-lg p-4">
//           <p className="text-white-300 text-sm font-medium">Total Expenses</p>
//           <p className="text-red-100 text-2xl font-bold mt-1">
//             ₹{totalExpense > 0 && totalExpense.toLocaleString("en-IN")}
//           </p>
//         </div>
//         <div className="bg-gradient-to-br from-orange-500 to-orange-600 bg-opacity-20 border border-orange-500 border-opacity-30 rounded-lg p-4">
//           <p className="text-white-300 text-sm font-medium">Today's Expenses</p>
//           <p className="text-orange-100 text-2xl font-bold mt-1">
//             ₹{todayExpense.toLocaleString("en-IN")}
//           </p>
//         </div>
//         <div className="bg-gradient-to-br from-amber-500 to-amber-600 bg-opacity-20 border border-amber-600 border-opacity-40 rounded-lg p-4">
//           <p className="text-white-300 text-sm font-medium">Total Records</p>
//           <p className="text-white text-2xl font-bold mt-1">
//             {recordCount.toLocaleString("en-IN")}
//           </p>
//         </div>
//       </div>

//       {/* Header Section */}
//       <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
//         <h1 className="text-[#c17a6b] font-bold text-2xl tracking-wide flex items-center gap-2">
//           <span className="text-3xl">💸</span>
//           View Expenses
//         </h1>

//         {/* Search Box and Filter Icon */}
//         <div className="flex items-center gap-2">
//           <div className="flex items-center border border-gray-600 rounded-lg bg-[rgba(255,255,255,0.1)] backdrop-blur-md overflow-hidden hover:border-gray-500 transition">
//             <FiSearch className="mx-3 text-gray-400" size={18} />
//             <input
//               type="text"
//               placeholder="Search expenses..."
//               value={filters.search}
//               onChange={(e) => handleSearch(e.target.value)}
//               className="w-[250px] h-11 px-0 bg-transparent text-white placeholder:text-gray-400 focus:outline-none"
//             />
//           </div>
//           <button
//             onClick={() => setFilterOpen(true)}
//             className="bg-[#c17a6b] hover:bg-[#d48976] text-white p-2.5 rounded-lg transition"
//             title="Filter"
//           >
//             <FiFilter size={20} />
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-[rgba(255,255,255,0.05)] border border-gray-700 shadow-lg backdrop-blur-md rounded-xl overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-gradient-to-r from-[#2E2E48] to-[#3E3E5E] text-white uppercase text-xs tracking-wider">
//             <tr>
//               <th className="py-4 px-4 text-left font-semibold">Category</th>
//               <th className="py-4 px-4 text-left font-semibold">Amount</th>
//               <th className="py-4 px-4 text-left font-semibold">Date</th>
//               <th className="py-4 px-4 text-left font-semibold">
//                 Payment Mode
//               </th>
//               <th className="py-4 px-4 text-left font-semibold">
//                 Budget Category
//               </th>
//               <th className="py-4 px-4 text-left font-semibold">Tags</th>
//               <th className="py-4 px-4 text-center font-semibold">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {isLoading ? (
//               <TableLoader />
//             ) : expenseData.length > 0 ? (
//               expenseData.map((item: ExpenseData, index: number) => (
//                 <tr
//                   key={item._id}
//                   className={`border-b border-gray-700 hover:bg-[rgba(193,122,107,0.1)] transition ${
//                     index % 2 === 0
//                       ? "bg-[rgba(255,255,255,0.02)]"
//                       : "bg-[rgba(255,255,255,0.05)]"
//                   }`}
//                 >
//                   <td className="py-4 px-4 font-semibold text-white">
//                     <span className="bg-red-500 bg-opacity-20 text-red-300 px-3 py-1 rounded-full text-xs font-medium">
//                       {item.expense_category || "N/A"}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4 font-bold text-red-400">
//                     ₹{item.expense_amount?.toLocaleString("en-IN") || 0}
//                   </td>
//                   <td className="py-4 px-4 text-gray-300 text-sm">
//                     <span className="bg-gray-700 bg-opacity-50 px-2 py-1 rounded">
//                       {new Date(item.expense_date).toLocaleDateString("en-IN", {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4">
//                     <span className="bg-orange-500 bg-opacity-20 text-orange-300 px-3 py-1 rounded-full text-xs font-medium">
//                       {item.payment_mode || "N/A"}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4">
//                     {item.budget_category ? (
//                       <span className="bg-purple-500 bg-opacity-20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
//                         {item.budget_category}
//                       </span>
//                     ) : (
//                       <span className="text-gray-500 text-xs">—</span>
//                     )}
//                   </td>
//                   <td className="py-4 px-4">
//                     <div className="flex flex-wrap gap-1">
//                       {item.tags && item.tags.length > 0 ? (
//                         item.tags.map((tag, idx) => (
//                           <span
//                             key={idx}
//                             className="bg-cyan-500 bg-opacity-20 text-cyan-300 px-2 py-1 rounded text-xs"
//                           >
//                             #{tag}
//                           </span>
//                         ))
//                       ) : (
//                         <span className="text-gray-500 text-xs">—</span>
//                       )}
//                       {item.is_recurring && (
//                         <span className="bg-yellow-500 bg-opacity-20 text-yellow-300 px-2 py-1 rounded text-xs flex items-center gap-1">
//                           🔄 Recurring
//                         </span>
//                       )}
//                     </div>
//                   </td>
//                   <td className="py-4 px-4">
//                     <div className="flex justify-center items-center gap-2">
//                       {/* Edit */}
//                       <button
//                         onClick={() => onEdit(item._id)}
//                         className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition transform hover:scale-110"
//                         title="Edit Expense"
//                       >
//                         <BiEdit size={18} />
//                       </button>
//                       {/* Delete */}
//                       <button
//                         onClick={() => {
//                           setDeleteId(item._id);
//                           setDeleteDialog(true);
//                         }}
//                         className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition transform hover:scale-110"
//                         title="Delete Expense"
//                       >
//                         <MdDelete size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan={6}
//                   className="text-center py-12 text-gray-400 text-base"
//                 >
//                   <div className="flex flex-col items-center gap-2">
//                     <p className="text-3xl">📭</p>
//                     <p>No expense records found</p>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Page Limit Dropdown */}
//       <div className="flex justify-between items-center my-6 flex-wrap gap-3">
//         <div className="text-gray-400 text-sm">
//           Showing {expenseData.length} of {filters.limit} records
//         </div>
//         <div className="flex items-center gap-3">
//           <span className="text-gray-400 text-sm">Rows per page:</span>
//           <div className="relative">
//             <select
//               className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg pr-8 pl-3 cursor-pointer border border-gray-600 hover:border-gray-500 transition"
//               value={filters.limit}
//               onChange={(e) => handleLimitChange(Number(e.target.value))}
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//               <option value={50}>50</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-2 mt-8 mb-6">
//           {/* Prev Button */}
//           <button
//             onClick={() => hasPrevPage && handlePageChange(filters.page - 1)}
//             disabled={!hasPrevPage}
//             className={`p-2 rounded-lg transition ${
//               !hasPrevPage
//                 ? "text-gray-600 cursor-not-allowed bg-gray-800 bg-opacity-30"
//                 : "text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700"
//             }`}
//           >
//             <IoIosArrowBack size={20} />
//           </button>

//           {/* Page Numbers */}
//           <div className="flex items-center gap-1">
//             {[...Array(totalPages)].map((_, index) => {
//               const pageNum = index + 1;
//               return (
//                 <button
//                   key={pageNum}
//                   onClick={() => handlePageChange(pageNum)}
//                   className={`min-w-[40px] h-10 rounded-lg text-sm font-medium transition ${
//                     filters.page === pageNum
//                       ? "bg-[#c17a6b] text-white shadow-lg"
//                       : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
//                   }`}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Next Button */}
//           <button
//             onClick={() => hasNextPage && handlePageChange(filters.page + 1)}
//             disabled={!hasNextPage}
//             className={`p-2 rounded-lg transition ${
//               !hasNextPage
//                 ? "text-gray-600 cursor-not-allowed bg-gray-800 bg-opacity-30"
//                 : "text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700"
//             }`}
//           >
//             <IoIosArrowForward size={20} />
//           </button>
//         </div>
//       )}

//       {/* Filter Dialog */}
//       <FilterDialog
//         open={filterOpen}
//         onClose={handleClearFilters}
//         onApply={handleApplyFilters}
//         className="absolute top-[740px] right-[80px] bg-[#2E2E48] text-white p-6 rounded-2xl
//           shadow-2xl border border-gray-700 w-[360px]"
//       >
//         <>
//           {/* Date Range */}
//           <div className="flex flex-col gap-3 mb-4">
//             <label className="text-sm text-gray-300 font-medium">
//               Date Range
//             </label>
//             <div className="flex items-center gap-2">
//               <input
//                 type="date"
//                 name="fromDate"
//                 value={tempFilters.fromDate}
//                 onChange={handleFilterChange}
//                 className="flex-1 bg-[#3a3a5c] border border-gray-600 rounded-lg px-2 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//               />
//               <span className="text-gray-400">→</span>
//               <input
//                 type="date"
//                 name="toDate"
//                 value={tempFilters.toDate}
//                 onChange={handleFilterChange}
//                 className="flex-1 bg-[#3a3a5c] border border-gray-600 rounded-lg px-2 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//               />
//             </div>
//           </div>

//           {/* Filter Buttons */}
//           <div className="flex gap-2 mt-6">
//             <button
//               onClick={handleApplyFilters}
//               className="flex-1 bg-[#c17a6b] hover:bg-[#d48976] text-white font-medium py-2 px-4 rounded-lg transition"
//             >
//               Apply
//             </button>
//             <button
//               onClick={handleClearFilters}
//               className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition"
//             >
//               Clear
//             </button>
//           </div>
//         </>
//       </FilterDialog>

//       {/* Delete Dialog */}
//       <DeleteDialog
//         open={deleteDialog}
//         onClose={() => setDeleteDialog(false)}
//         onDelete={(id: string) => deleteMutation.mutate(id)}
//         deleteId={deleteId}
//       />
//     </div>
//   );
// }

import React, { useState, useCallback, useMemo } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import FilterDialog from "../../dialog/filter";
import { DeleteDialog } from "../../dialog/delete-dialog";

import {
  useExpenseFilter,
  useDeleteExpense,
} from "../../api/expense/expense-hooks";
// import { useIncomeBalance } from "../../api/income/income-hooks";
import ExpenseSummaryCards from "./expenseSummaryCards";
import ExpenseMobileControls from "./expenseMobileControls";
import ExpenseMobileCards from "./expenseMobileCards";
import ExpenseTableDesktop from "./expenseTableDesktop";

interface FilterState {
  page: number;
  limit: number;
  search: string;
  fromDate: string;
  toDate: string;
}

const DEFAULT_FILTERS: FilterState = {
  page: 1,
  limit: 10,
  search: "",
  fromDate: "",
  toDate: "",
};

export interface ExpenseData {
  _id: string;
  expense_category: string;
  expense_amount: number;
  expense_date: string;
  payment_mode: string;
  notes?: string;
  budget_category?: string;
  is_recurring?: boolean;
  tags?: string[];
}

export default function ExpenseTable({
  onEdit,
}: {
  onEdit: (id: string) => void;
}) {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [tempFilters, setTempFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
  });

  // API: Get filtered expenses
  const { data: filterData, isLoading } = useExpenseFilter(filters);

  // API: Get income balance (optional for showing available budget)
  // const { data: incomeBalanceData, isPending } = useIncomeBalance();

  // Delete mutation
  const deleteMutation = useDeleteExpense({
    onSuccess: () => {
      setDeleteDialog(false);
      setDeleteId(null);
    },
  });

  // Memoized expense data and pagination
  const expenseData = useMemo(() => filterData?.data || [], [filterData?.data]);
  const paginatedData = useMemo(
    () => filterData?.pagination || null,
    [filterData?.pagination]
  );
  const totalPages = useMemo(
    () => filterData?.pagination?.totalPages || 1,
    [filterData?.pagination?.totalPages]
  );
  const hasPrevPage = filterData?.pagination?.hasPrevPage;
  const hasNextPage = filterData?.pagination?.hasNextPage;

  // Summary stats
  const totalExpense = Number(paginatedData?.totalExpenseAmount || 0);
  const todayExpense = Number(paginatedData?.todayExpenseAmount || 0);
  const recordCount = Number(paginatedData?.totalRecords || 0);

  // Handlers
  const handlePageChange = useCallback((newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  }, []);

  const handleSearch = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value, page: 1 }));
  }, []);

  const handleLimitChange = useCallback((limit: number) => {
    setFilters((prev) => ({ ...prev, limit, page: 1 }));
  }, []);

  const handleFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setTempFilters((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleApplyFilters = useCallback(() => {
    setFilters({
      page: 1,
      limit: tempFilters.limit,
      search: tempFilters.search,
      fromDate: tempFilters.fromDate,
      toDate: tempFilters.toDate,
    });
    setFilterOpen(false);
  }, [tempFilters]);

  const handleClearFilters = useCallback(() => {
    setTempFilters(DEFAULT_FILTERS);
    setFilters(DEFAULT_FILTERS);
    setFilterOpen(false);
  }, []);

  return (
    <div
      className="
      mt-10
      w-full
      max-w-[1400px]
      mx-auto
      px-4
      sm:px-6
      lg:px-8
      text-gray-200
    "
    >
      {/* ================= SUMMARY CARDS ================= */}
      <ExpenseSummaryCards
        totalExpense={totalExpense}
        todayExpense={todayExpense}
        recordCount={recordCount}
      />

      {/* ================= MOBILE CONTROLS ================= */}
      <ExpenseMobileControls
        page={filters.page}
        totalPages={totalPages}
        search={filters.search}
        limit={filters.limit}
        onSearch={handleSearch}
        onPrev={() => handlePageChange(filters.page - 1)}
        onNext={() => handlePageChange(filters.page + 1)}
        onLimitChange={handleLimitChange}
      />

      {/* ================= MOBILE CARDS ================= */}
      <ExpenseMobileCards
        isLoading={isLoading}
        expenseData={expenseData}
        onEdit={onEdit}
        onDelete={(id) => {
          setDeleteId(id);
          setDeleteDialog(true);
        }}
      />

      {/* ================= DESKTOP CONTROLS ================= */}
      <div className="hidden md:flex items-center justify-between mb-4">
        {/* Search */}
        <input
          type="text"
          value={filters.search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search expense..."
          className="
          h-11
          w-72
          px-4
          rounded-lg
          bg-[#2E2E48]
          border border-gray-700
          text-sm text-white
          placeholder:text-gray-400
        "
        />

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Limit */}
          <select
            value={filters.limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
            className="
            h-11
            px-3
            rounded-lg
            bg-[#2E2E48]
            border border-gray-700
            text-sm
            text-white
          "
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>

          {/* Filter */}
          <button
            onClick={() => setFilterOpen(true)}
            className="
            h-11
            px-5
            rounded-lg
            bg-blue-500
            hover:bg-blue-600
            text-white
            text-sm
            font-medium
          "
          >
            Filter
          </button>
        </div>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block w-full">
        <ExpenseTableDesktop
          isLoading={isLoading}
          expenseData={expenseData}
          onEdit={onEdit}
          setDeleteId={setDeleteId}
          setDeleteDialog={setDeleteDialog}
        />
      </div>

      {/* ================= DESKTOP PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="hidden md:flex justify-center items-center gap-2 mt-8 mb-6">
          <button
            onClick={() => hasPrevPage && handlePageChange(filters.page - 1)}
            disabled={!hasPrevPage}
            className={`
            p-2 rounded-lg transition
            ${
              !hasPrevPage
                ? "text-gray-600 cursor-not-allowed bg-gray-800/30"
                : "text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700"
            }
          `}
          >
            <IoIosArrowBack size={20} />
          </button>

          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`
                  min-w-[40px]
                  h-10
                  rounded-lg
                  text-sm
                  font-medium
                  transition
                  ${
                    filters.page === pageNum
                      ? "bg-[#c17a6b] text-white shadow-lg"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                `}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => hasNextPage && handlePageChange(filters.page + 1)}
            disabled={!hasNextPage}
            className={`
            p-2 rounded-lg transition
            ${
              !hasNextPage
                ? "text-gray-600 cursor-not-allowed bg-gray-800/30"
                : "text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700"
            }
          `}
          >
            <IoIosArrowForward size={20} />
          </button>
        </div>
      )}

      {/* ================= FILTER DIALOG ================= */}
      <FilterDialog
        open={filterOpen}
        onClose={handleClearFilters}
        onApply={handleApplyFilters}
        className="
        absolute
        top-[740px]
        right-[80px]
        bg-[#2E2E48]
        text-white
        p-6
        rounded-2xl
        shadow-2xl
        border border-gray-700
        w-[360px]
      "
      >
        <div className="flex flex-col gap-3 mb-4">
          <label className="text-sm text-gray-300 font-medium">
            Date Range
          </label>

          <div className="flex items-center gap-2">
            <input
              type="date"
              name="fromDate"
              value={tempFilters.fromDate}
              onChange={handleFilterChange}
              className="
              flex-1
              bg-[#3a3a5c]
              border border-gray-600
              rounded-lg
              px-2
              py-2
              text-white
              text-sm
            "
            />
            <span className="text-gray-400">→</span>
            <input
              type="date"
              name="toDate"
              value={tempFilters.toDate}
              onChange={handleFilterChange}
              className="
              flex-1
              bg-[#3a3a5c]
              border border-gray-600
              rounded-lg
              px-2
              py-2
              text-white
              text-sm
            "
            />
          </div>
        </div>
      </FilterDialog>

      {/* ================= DELETE DIALOG ================= */}
      <DeleteDialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        onDelete={(id: string) => deleteMutation.mutate(id)}
        deleteId={deleteId}
      />
    </div>
  );
}
