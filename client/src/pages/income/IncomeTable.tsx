// import { BiEdit } from "react-icons/bi";
// import { MdDelete, MdKeyboardArrowDown } from "react-icons/md";
// import { FiFilter, FiSearch } from "react-icons/fi";
// import React, { useState, useCallback, useMemo } from "react";
// import FilterDialog from "../../dialog/filter";
// import { IoIosArrowForward } from "react-icons/io";
// import { IoIosArrowBack } from "react-icons/io";
// import { useIncomeFilter } from "../../api/income/income-hooks";
// import TableLoader from "../../utils/TableLoader";
// import { DeleteDialog } from "../../dialog/delete-dialog";
// import { useDeleteIncome } from "../../api/income/income-hooks";
// import type { IncomeData } from "../../types/types";
// import { useFindAllGoal } from "../../api/goal/goal-hooks";
// import type { GoalDataTypes } from "../../types/response-types";

// export interface FilterState {
//   page: number;
//   limit: number;
//   search: string;
//   fromDate: string;
//   toDate: string;
//   deadline_date: string;
//   status: string;
//   goal_id: string;
// }

// const DEFAULT_FILTERS: FilterState = {
//   page: 1,
//   limit: 10,
//   search: "",
//   fromDate: "",
//   toDate: "",
//   deadline_date: "",
//   status: "",
//   goal_id: "",
// };

// export default function IncomeTable({
//   onEdit,
// }: {
//   onEdit: (id: string) => void;
// }) {
//   const [deleteDialog, setDeleteDialog] = useState(false);
//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
//   const [tempFilters, setTempFilters] = useState<FilterState>({ ...filters });

//   // Get income data
//   const { data: filterData, isLoading } = useIncomeFilter(filters);
//   const { data: GoalData } = useFindAllGoal();
//   // Delete mutation
//   const deleteMutation = useDeleteIncome({
//     onSuccess: () => {
//       setDeleteDialog(false);
//       setDeleteId(null);
//     },
//   });

//   // Memoized income data
//   const incomeData = useMemo(() => filterData?.data || [], [filterData?.data]);
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

//   console.log({ incomeData });

//   // Calculate summary stats

//   const totalIncome = Number(paginatedData?.totalIncomeAmount);
//   const totalContributed = Number(paginatedData?.totalGoalContribution);
//   const recordCount = Number(paginatedData?.totalRecords);

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
//       deadline_date: tempFilters.deadline_date,
//       status: tempFilters.status,
//       goal_id: tempFilters.goal_id,
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
//     // <div className="mt-10 px-4 sm:px-6 text-gray-200 w-full max-w-full overflow-hidden">
//     //   {/* Summary Cards */}
//     //   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//     //     <div className="bg-gradient-to-br from-green-500 to-green-600 bg-opacity-20 border border-green-500 border-opacity-30 rounded-lg p-4">
//     //       <p className="text-white-300 text-sm font-medium">Total Income</p>
//     //       <p className="text-green-100 text-2xl font-bold mt-1">
//     //         ₹{totalIncome > 0 && totalIncome.toLocaleString("en-IN")}
//     //       </p>
//     //     </div>
//     //     <div className="bg-gradient-to-br from-blue-500 to-blue-600 bg-opacity-20 border border-blue-500 border-opacity-30 rounded-lg p-4">
//     //       <p className="text-white-300 text-sm font-medium">
//     //         Contributed to Goals
//     //       </p>
//     //       <p className="text-blue-100 text-2xl font-bold mt-1">
//     //         ₹{totalContributed.toLocaleString("en-IN")}
//     //       </p>
//     //     </div>
//     //     <div className="bg-gradient-to-br from-orange-500 to-orange-500 bg-opacity-20 border border-orange-600 border-opacity-40 rounded-lg p-4">
//     //       <p className="text-white-300 text-sm font-medium">Total Records</p>
//     //       <p className="text-white text-2xl font-bold mt-1">
//     //         {recordCount.toLocaleString("en-IN")}
//     //       </p>
//     //     </div>
//     //   </div>
//     //   {/* Header Section */}
//     //   <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
//     //     <h1 className="text-[#54af54] font-bold text-2xl tracking-wide flex items-center gap-2">
//     //       <span className="text-3xl">💰</span>
//     //       View Income
//     //     </h1>

//     //     {/* Search Box and Filter Icon */}
//     //     <div className="flex items-center gap-2">
//     //       <div className="flex items-center border border-gray-600 rounded-lg bg-[rgba(255,255,255,0.1)] backdrop-blur-md overflow-hidden hover:border-gray-500 transition">
//     //         <FiSearch className="mx-3 text-gray-400" size={18} />
//     //         <input
//     //           type="text"
//     //           placeholder="Search income..."
//     //           value={filters.search}
//     //           onChange={(e) => handleSearch(e.target.value)}
//     //           className="w-[250px] h-11 px-0 bg-transparent text-white placeholder:text-gray-400 focus:outline-none"
//     //         />
//     //       </div>
//     //       <button
//     //         onClick={() => setFilterOpen(true)}
//     //         className="bg-[#548f54] hover:bg-[#468f46] text-white p-2.5 rounded-lg transition"
//     //         title="Filter"
//     //       >
//     //         <FiFilter size={20} />
//     //       </button>
//     //     </div>
//     //   </div>
//     //   return (
//     //   <div className="mt-10 px-4 sm:px-6 text-gray-200 w-full max-w-full overflow-hidden">
//     //     {/* Summary Cards */}
//     //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//     //       <div className="bg-gradient-to-br from-green-500 to-green-600 bg-opacity-20 border border-green-500 border-opacity-30 rounded-lg p-4">
//     //         <p className="text-white-300 text-sm font-medium">Total Income</p>
//     //         <p className="text-green-100 text-2xl font-bold mt-1">
//     //           ₹{totalIncome > 0 && totalIncome.toLocaleString("en-IN")}
//     //         </p>
//     //       </div>
//     //       <div className="bg-gradient-to-br from-blue-500 to-blue-600 bg-opacity-20 border border-blue-500 border-opacity-30 rounded-lg p-4">
//     //         <p className="text-white-300 text-sm font-medium">
//     //           Contributed to Goals
//     //         </p>
//     //         <p className="text-blue-100 text-2xl font-bold mt-1">
//     //           ₹{totalContributed.toLocaleString("en-IN")}
//     //         </p>
//     //       </div>
//     //       <div className="bg-gradient-to-br from-orange-500 to-orange-500 bg-opacity-20 border border-orange-600 border-opacity-40 rounded-lg p-4">
//     //         <p className="text-white-300 text-sm font-medium">Total Records</p>
//     //         <p className="text-white text-2xl font-bold mt-1">
//     //           {recordCount.toLocaleString("en-IN")}
//     //         </p>
//     //       </div>
//     //     </div>

//     //     {/* Header Section */}
//     //     <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
//     //       <h1 className="text-[#54af54] font-bold text-2xl tracking-wide flex items-center gap-2">
//     //         <span className="text-3xl">💰</span>
//     //         View Income
//     //       </h1>

//     //       {/* Search Box and Filter Icon */}
//     //       <div className="flex items-center gap-2">
//     //         <div className="flex items-center border border-gray-600 rounded-lg bg-[rgba(255,255,255,0.1)] backdrop-blur-md overflow-hidden hover:border-gray-500 transition">
//     //           <FiSearch className="mx-3 text-gray-400" size={18} />
//     //           <input
//     //             type="text"
//     //             placeholder="Search income..."
//     //             value={filters.search}
//     //             onChange={(e) => handleSearch(e.target.value)}
//     //             className="w-[250px] h-11 px-0 bg-transparent text-white placeholder:text-gray-400 focus:outline-none"
//     //           />
//     //         </div>
//     //         <button
//     //           onClick={() => setFilterOpen(true)}
//     //           className="bg-[#548f54] hover:bg-[#468f46] text-white p-2.5 rounded-lg transition"
//     //           title="Filter"
//     //         >
//     //           <FiFilter size={20} />
//     //         </button>
//     //       </div>
//     //     </div>

//     //     {/* Table */}
//     //     <div
//     //       className="hidden md:block bg-[rgba(255,255,255,0.05)] border border-gray-700
//     //   shadow-lg backdrop-blur-md rounded-xl overflow-hidden"
//     //     >
//     //       <table className="w-full text-sm">
//     //         <thead className="bg-gradient-to-r from-[#2E2E48] to-[#3E3E5E] text-white uppercase text-xs tracking-wider">
//     //           <tr>
//     //             <th className="py-4 px-4 text-left font-semibold">Category</th>
//     //             <th className="py-4 px-4 text-left font-semibold">
//     //               Total Amount
//     //             </th>
//     //             <th className="py-4 px-4 text-left font-semibold">Balance</th>
//     //             <th className="py-4 px-4 text-left font-semibold">
//     //               Goal Contribution
//     //             </th>
//     //             <th className="py-4 px-4 text-left font-semibold">Goal Name</th>
//     //             <th className="py-4 px-4 text-left font-semibold">
//     //               Contributed Amount
//     //             </th>
//     //             <th className="py-4 px-4 text-left font-semibold">
//     //               Income Date
//     //             </th>
//     //             <th className="py-4 px-4 text-center font-semibold">Actions</th>
//     //           </tr>
//     //         </thead>

//     //         <tbody>
//     //           {isLoading ? (
//     //             <TableLoader />
//     //           ) : incomeData.length > 0 ? (
//     //             incomeData.map((item: IncomeData, index: number) => (
//     //               <tr
//     //                 key={item._id}
//     //                 className={`border-b border-gray-700 hover:bg-[rgba(84,175,84,0.1)] transition ${
//     //                   index % 2 === 0
//     //                     ? "bg-[rgba(255,255,255,0.02)]"
//     //                     : "bg-[rgba(255,255,255,0.05)]"
//     //                 }`}
//     //               >
//     //                 <td className="py-4 px-4 font-semibold text-white">
//     //                   <span className="bg-blue-500 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
//     //                     {item.income_category || "N/A"}
//     //                   </span>
//     //                 </td>
//     //                 <td className="py-4 px-4 font-bold text-green-400">
//     //                   ₹{item.income_amount?.toLocaleString("en-IN") || 0}
//     //                 </td>
//     //                 <td className="py-4 px-4 font-bold text-green-400">
//     //                   ₹
//     //                   {item.current_income_amount?.toLocaleString("en-IN") || 0}
//     //                 </td>
//     //                 <td className="py-4 px-4">
//     //                   <span
//     //                     className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
//     //                       item.saving_contribution
//     //                         ? "bg-green-500 bg-opacity-20 text-green-300 border border-green-500 border-opacity-30"
//     //                         : "bg-gray-500 bg-opacity-20 text-gray-400 border border-gray-500 border-opacity-30"
//     //                     }`}
//     //                   >
//     //                     {item.saving_contribution ? "✓ Yes" : "✗ No"}
//     //                   </span>
//     //                 </td>
//     //                 <td className="py-4 px-4 text-gray-300">
//     //                   {typeof item.goal_id === "object" &&
//     //                   item.goal_id?.goal_name ? (
//     //                     <span className="bg-purple-500 bg-opacity-20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
//     //                       {item.goal_id.goal_name}
//     //                     </span>
//     //                   ) : (
//     //                     <span className="text-gray-500">—</span>
//     //                   )}
//     //                 </td>
//     //                 <td className="py-4 px-4 text-center font-bold text-amber-400">
//     //                   ₹
//     //                   {(item.goal_contribute_amount || 0).toLocaleString(
//     //                     "en-IN"
//     //                   )}
//     //                 </td>
//     //                 <td className="py-4 px-4 text-gray-300 text-sm">
//     //                   <span className="bg-gray-700 bg-opacity-50 px-2 py-1 rounded">
//     //                     {new Date(item.income_date).toLocaleDateString(
//     //                       "en-IN",
//     //                       {
//     //                         year: "numeric",
//     //                         month: "short",
//     //                         day: "numeric",
//     //                       }
//     //                     )}
//     //                   </span>
//     //                 </td>
//     //                 <td className="py-4 px-4">
//     //                   <div className="flex justify-center items-center gap-2">
//     //                     {/* Edit */}
//     //                     <button
//     //                       onClick={() => onEdit(item._id)}
//     //                       className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition transform hover:scale-110"
//     //                       title="Edit Income"
//     //                     >
//     //                       <BiEdit size={18} />
//     //                     </button>
//     //                     {/* Delete */}
//     //                     <button
//     //                       onClick={() => {
//     //                         setDeleteId(item._id);
//     //                         setDeleteDialog(true);
//     //                       }}
//     //                       className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition transform hover:scale-110"
//     //                       title="Delete Income"
//     //                     >
//     //                       <MdDelete size={18} />
//     //                     </button>
//     //                   </div>
//     //                 </td>
//     //               </tr>
//     //             ))
//     //           ) : (
//     //             <tr>
//     //               <td
//     //                 colSpan={7}
//     //                 className="text-center py-12 text-gray-400 text-base"
//     //               >
//     //                 <div className="flex flex-col items-center gap-2">
//     //                   <p className="text-3xl">📭</p>
//     //                   <p>No income records found</p>
//     //                 </div>
//     //               </td>
//     //             </tr>
//     //           )}
//     //           {/* Mobile View (Cards) */}
//     //           <div className="md:hidden space-y-4">
//     //             {isLoading ? (
//     //               <TableLoader />
//     //             ) : incomeData.length > 0 ? (
//     //               incomeData.map((item: IncomeData) => (
//     //                 <div
//     //                   key={item._id}
//     //                   className="bg-[rgba(255,255,255,0.05)] border border-gray-700 rounded-xl p-4 space-y-2"
//     //                 >
//     //                   <div className="flex justify-between items-center">
//     //                     <span className="text-sm font-semibold text-blue-300">
//     //                       {item.income_category || "N/A"}
//     //                     </span>
//     //                     <span className="text-xs text-gray-400">
//     //                       {new Date(item.income_date).toLocaleDateString(
//     //                         "en-IN"
//     //                       )}
//     //                     </span>
//     //                   </div>

//     //                   <div className="flex justify-between text-sm">
//     //                     <span className="text-gray-400">Amount</span>
//     //                     <span className="font-bold text-green-400">
//     //                       ₹{item.income_amount?.toLocaleString("en-IN") || 0}
//     //                     </span>
//     //                   </div>

//     //                   <div className="flex justify-between text-sm">
//     //                     <span className="text-gray-400">Balance</span>
//     //                     <span className="font-bold text-green-400">
//     //                       ₹
//     //                       {item.current_income_amount?.toLocaleString(
//     //                         "en-IN"
//     //                       ) || 0}
//     //                     </span>
//     //                   </div>

//     //                   <div className="flex justify-between text-sm">
//     //                     <span className="text-gray-400">Goal</span>
//     //                     <span className="text-gray-300">
//     //                       {typeof item.goal_id === "object" &&
//     //                       item.goal_id?.goal_name
//     //                         ? item.goal_id.goal_name
//     //                         : "—"}
//     //                     </span>
//     //                   </div>

//     //                   <div className="flex justify-between items-center pt-2">
//     //                     <span
//     //                       className={`text-xs px-2 py-1 rounded-full ${
//     //                         item.saving_contribution
//     //                           ? "bg-green-500/20 text-green-300"
//     //                           : "bg-gray-500/20 text-gray-400"
//     //                       }`}
//     //                     >
//     //                       {item.saving_contribution
//     //                         ? "✓ Contributed"
//     //                         : "✗ Not Contributed"}
//     //                     </span>

//     //                     <div className="flex gap-2">
//     //                       <button
//     //                         onClick={() => onEdit(item._id)}
//     //                         className="bg-blue-500 text-white p-2 rounded-lg"
//     //                       >
//     //                         <BiEdit size={16} />
//     //                       </button>
//     //                       <button
//     //                         onClick={() => {
//     //                           setDeleteId(item._id);
//     //                           setDeleteDialog(true);
//     //                         }}
//     //                         className="bg-red-500 text-white p-2 rounded-lg"
//     //                       >
//     //                         <MdDelete size={16} />
//     //                       </button>
//     //                     </div>
//     //                   </div>
//     //                 </div>
//     //               ))
//     //             ) : (
//     //               <div className="text-center py-12 text-gray-400">
//     //                 No income records found
//     //               </div>
//     //             )}
//     //           </div>
//     //         </tbody>
//     //       </table>
//     //     </div>

//     //     {/* Page Limit Dropdown */}
//     //     <div className="flex justify-between items-center my-6 flex-wrap gap-3">
//     //       <div className="text-gray-400 text-sm">
//     //         Showing {incomeData.length} of {filters.limit} records
//     //       </div>
//     //       <div className="flex items-center gap-3">
//     //         <span className="text-gray-400 text-sm">Rows per page:</span>
//     //         <div className="relative">
//     //           <select
//     //             className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg pr-8 pl-3 cursor-pointer border border-gray-600 hover:border-gray-500 transition"
//     //             value={filters.limit}
//     //             onChange={(e) => handleLimitChange(Number(e.target.value))}
//     //           >
//     //             <option value={5}>5</option>
//     //             <option value={10}>10</option>
//     //             <option value={20}>20</option>
//     //             <option value={50}>50</option>
//     //           </select>
//     //           {/* <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//     //           <MdKeyboardArrowDown size={18} />
//     //         </span> */}
//     //         </div>
//     //       </div>
//     //     </div>

//     //     {/* Pagination */}
//     //     {totalPages > 1 && (
//     //       <div className="flex justify-center items-center gap-2 mt-8 mb-6">
//     //         {/* Prev Button */}
//     //         <button
//     //           onClick={() => hasPrevPage && handlePageChange(filters.page - 1)}
//     //           disabled={!hasPrevPage}
//     //           className={`p-2 rounded-lg transition ${
//     //             !hasPrevPage
//     //               ? "text-gray-600 cursor-not-allowed bg-gray-800 bg-opacity-30"
//     //               : "text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700"
//     //           }`}
//     //         >
//     //           <IoIosArrowBack size={20} />
//     //         </button>

//     //         {/* Page Numbers */}
//     //         <div className="flex items-center gap-1">
//     //           {[...Array(totalPages)].map((_, index) => {
//     //             const pageNum = index + 1;
//     //             return (
//     //               <button
//     //                 key={pageNum}
//     //                 onClick={() => handlePageChange(pageNum)}
//     //                 className={`min-w-[40px] h-10 rounded-lg text-sm font-medium transition ${
//     //                   filters.page === pageNum
//     //                     ? "bg-[#548f54] text-white shadow-lg"
//     //                     : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
//     //                 }`}
//     //               >
//     //                 {pageNum}
//     //               </button>
//     //             );
//     //           })}
//     //         </div>

//     //         {/* Next Button */}
//     //         <button
//     //           onClick={() => hasNextPage && handlePageChange(filters.page + 1)}
//     //           disabled={!hasNextPage}
//     //           className={`p-2 rounded-lg transition ${
//     //             !hasNextPage
//     //               ? "text-gray-600 cursor-not-allowed bg-gray-800 bg-opacity-30"
//     //               : "text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700"
//     //           }`}
//     //         >
//     //           <IoIosArrowForward size={20} />
//     //         </button>
//     //       </div>
//     //     )}

//     //     {/* Filter Dialog */}
//     //     <FilterDialog
//     //       open={filterOpen}
//     //       onClose={handleClearFilters}
//     //       onApply={handleApplyFilters}
//     //       className="absolute top-[420px] right-[80px] bg-[#2E2E48] text-white p-6 rounded-2xl
//     //       shadow-2xl border border-gray-700 w-[360px]"
//     //     >
//     //       <>
//     //         {/* Date Range */}
//     //         <div className="flex flex-col gap-3 mb-4">
//     //           <label className="text-sm text-gray-300 font-medium">
//     //             Date Range
//     //           </label>
//     //           <div className="flex items-center gap-2">
//     //             <input
//     //               type="date"
//     //               name="fromDate"
//     //               value={tempFilters.fromDate}
//     //               onChange={handleFilterChange}
//     //               className="flex-1 bg-[#3a3a5c] border border-gray-600 rounded-lg px-2 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//     //             />
//     //             <span className="text-gray-400">→</span>
//     //             <input
//     //               type="date"
//     //               name="toDate"
//     //               value={tempFilters.toDate}
//     //               onChange={handleFilterChange}
//     //               className="flex-1 bg-[#3a3a5c] border border-gray-600 rounded-lg px-2 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//     //             />
//     //           </div>
//     //         </div>

//     //         {/* Goal Filter */}
//     //         <div className="mb-4">
//     //           <label className="text-sm text-gray-300 mb-2 font-medium block">
//     //             Filter by Goal
//     //           </label>
//     //           <div className="relative">
//     //             <select
//     //               name="goal_id"
//     //               className="h-11 w-full px-4 pr-10 rounded-lg border border-gray-400
//     //               bg-[rgba(255,255,255,0.15)] text-white text-sm
//     //               focus:outline-none focus:ring-2 focus:ring-green-400
//     //               transition-all duration-200 appearance-none"
//     //               style={{
//     //                 backgroundColor: "rgba(255,255,255,0.15)",
//     //                 color: "white",
//     //               }}
//     //               value={tempFilters.goal_id}
//     //               onChange={handleFilterChange}
//     //             >
//     //               <option
//     //                 value=""
//     //                 style={{ backgroundColor: "#2E2E48", color: "white" }}
//     //               >
//     //                 All Goals
//     //               </option>
//     //               {GoalData?.data && GoalData.data.length > 0 ? (
//     //                 GoalData.data.map((item: GoalDataTypes) => (
//     //                   <option
//     //                     value={item._id}
//     //                     key={item._id}
//     //                     style={{ backgroundColor: "#2E2E48", color: "white" }}
//     //                   >
//     //                     {item.goal_name}
//     //                   </option>
//     //                 ))
//     //               ) : (
//     //                 <option
//     //                   disabled
//     //                   style={{ backgroundColor: "#2E2E48", color: "white" }}
//     //                 >
//     //                   No goals available
//     //                 </option>
//     //               )}
//     //             </select>
//     //             <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//     //               <MdKeyboardArrowDown size={18} />
//     //             </span>
//     //           </div>
//     //         </div>

//     //         {/* Filter Buttons */}
//     //         <div className="flex gap-2 mt-6">
//     //           <button
//     //             onClick={handleApplyFilters}
//     //             className="flex-1 bg-[#548f54] hover:bg-[#468f46] text-white font-medium py-2 px-4 rounded-lg transition"
//     //           >
//     //             Apply
//     //           </button>
//     //           <button
//     //             onClick={handleClearFilters}
//     //             className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition"
//     //           >
//     //             Clear
//     //           </button>
//     //         </div>
//     //       </>
//     //     </FilterDialog>

//     //     {/* Delete Dialog */}
//     //     <DeleteDialog
//     //       open={deleteDialog}
//     //       onClose={() => setDeleteDialog(false)}
//     //       onDelete={(id: string) => deleteMutation.mutate(id)}
//     //       deleteId={deleteId}
//     //     />
//     //   </div>
//     //   );
//     //   {/* Table */}
//     //   <div
//     //     className="hidden md:block bg-[rgba(255,255,255,0.05)] border border-gray-700
//     //   shadow-lg backdrop-blur-md rounded-xl overflow-hidden"
//     //   >
//     //     <table className="w-full text-sm">
//     //       <thead className="bg-gradient-to-r from-[#2E2E48] to-[#3E3E5E] text-white uppercase text-xs tracking-wider">
//     //         <tr>
//     //           <th className="py-4 px-4 text-left font-semibold">Category</th>
//     //           <th className="py-4 px-4 text-left font-semibold">
//     //             Total Amount
//     //           </th>
//     //           <th className="py-4 px-4 text-left font-semibold">Balance</th>
//     //           <th className="py-4 px-4 text-left font-semibold">
//     //             Goal Contribution
//     //           </th>
//     //           <th className="py-4 px-4 text-left font-semibold">Goal Name</th>
//     //           <th className="py-4 px-4 text-left font-semibold">
//     //             Contributed Amount
//     //           </th>
//     //           <th className="py-4 px-4 text-left font-semibold">Income Date</th>
//     //           <th className="py-4 px-4 text-center font-semibold">Actions</th>
//     //         </tr>
//     //       </thead>

//     //       <tbody>
//     //         {isLoading ? (
//     //           <TableLoader />
//     //         ) : incomeData.length > 0 ? (
//     //           incomeData.map((item: IncomeData, index: number) => (
//     //             <tr
//     //               key={item._id}
//     //               className={`border-b border-gray-700 hover:bg-[rgba(84,175,84,0.1)] transition ${
//     //                 index % 2 === 0
//     //                   ? "bg-[rgba(255,255,255,0.02)]"
//     //                   : "bg-[rgba(255,255,255,0.05)]"
//     //               }`}
//     //             >
//     //               <td className="py-4 px-4 font-semibold text-white">
//     //                 <span className="bg-blue-500 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
//     //                   {item.income_category || "N/A"}
//     //                 </span>
//     //               </td>
//     //               <td className="py-4 px-4 font-bold text-green-400">
//     //                 ₹{item.income_amount?.toLocaleString("en-IN") || 0}
//     //               </td>
//     //               <td className="py-4 px-4 font-bold text-green-400">
//     //                 ₹{item.current_income_amount?.toLocaleString("en-IN") || 0}
//     //               </td>
//     //               <td className="py-4 px-4">
//     //                 <span
//     //                   className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
//     //                     item.saving_contribution
//     //                       ? "bg-green-500 bg-opacity-20 text-green-300 border border-green-500 border-opacity-30"
//     //                       : "bg-gray-500 bg-opacity-20 text-gray-400 border border-gray-500 border-opacity-30"
//     //                   }`}
//     //                 >
//     //                   {item.saving_contribution ? "✓ Yes" : "✗ No"}
//     //                 </span>
//     //               </td>
//     //               <td className="py-4 px-4 text-gray-300">
//     //                 {typeof item.goal_id === "object" &&
//     //                 item.goal_id?.goal_name ? (
//     //                   <span className="bg-purple-500 bg-opacity-20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
//     //                     {item.goal_id.goal_name}
//     //                   </span>
//     //                 ) : (
//     //                   <span className="text-gray-500">—</span>
//     //                 )}
//     //               </td>
//     //               <td className="py-4 px-4 text-center font-bold text-amber-400">
//     //                 ₹
//     //                 {(item.goal_contribute_amount || 0).toLocaleString("en-IN")}
//     //               </td>
//     //               <td className="py-4 px-4 text-gray-300 text-sm">
//     //                 <span className="bg-gray-700 bg-opacity-50 px-2 py-1 rounded">
//     //                   {new Date(item.income_date).toLocaleDateString("en-IN", {
//     //                     year: "numeric",
//     //                     month: "short",
//     //                     day: "numeric",
//     //                   })}
//     //                 </span>
//     //               </td>
//     //               <td className="py-4 px-4">
//     //                 <div className="flex justify-center items-center gap-2">
//     //                   {/* Edit */}
//     //                   <button
//     //                     onClick={() => onEdit(item._id)}
//     //                     className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition transform hover:scale-110"
//     //                     title="Edit Income"
//     //                   >
//     //                     <BiEdit size={18} />
//     //                   </button>
//     //                   {/* Delete */}
//     //                   <button
//     //                     onClick={() => {
//     //                       setDeleteId(item._id);
//     //                       setDeleteDialog(true);
//     //                     }}
//     //                     className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition transform hover:scale-110"
//     //                     title="Delete Income"
//     //                   >
//     //                     <MdDelete size={18} />
//     //                   </button>
//     //                 </div>
//     //               </td>
//     //             </tr>
//     //           ))
//     //         ) : (
//     //           <tr>
//     //             <td
//     //               colSpan={7}
//     //               className="text-center py-12 text-gray-400 text-base"
//     //             >
//     //               <div className="flex flex-col items-center gap-2">
//     //                 <p className="text-3xl">📭</p>
//     //                 <p>No income records found</p>
//     //               </div>
//     //             </td>
//     //           </tr>
//     //         )}
//     //       </tbody>
//     //     </table>
//     //   </div>
//     //   {/* Page Limit Dropdown */}
//     //   <div className="flex justify-between items-center my-6 flex-wrap gap-3">
//     //     <div className="text-gray-400 text-sm">
//     //       Showing {incomeData.length} of {filters.limit} records
//     //     </div>
//     //     <div className="flex items-center gap-3">
//     //       <span className="text-gray-400 text-sm">Rows per page:</span>
//     //       <div className="relative">
//     //         <select
//     //           className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg pr-8 pl-3 cursor-pointer border border-gray-600 hover:border-gray-500 transition"
//     //           value={filters.limit}
//     //           onChange={(e) => handleLimitChange(Number(e.target.value))}
//     //         >
//     //           <option value={5}>5</option>
//     //           <option value={10}>10</option>
//     //           <option value={20}>20</option>
//     //           <option value={50}>50</option>
//     //         </select>
//     //         {/* <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//     //           <MdKeyboardArrowDown size={18} />
//     //         </span> */}
//     //       </div>
//     //     </div>
//     //   </div>
//     //   {/* Pagination */}
//     //   {totalPages > 1 && (
//     //     <div className="flex justify-center items-center gap-2 mt-8 mb-6">
//     //       {/* Prev Button */}
//     //       <button
//     //         onClick={() => hasPrevPage && handlePageChange(filters.page - 1)}
//     //         disabled={!hasPrevPage}
//     //         className={`p-2 rounded-lg transition ${
//     //           !hasPrevPage
//     //             ? "text-gray-600 cursor-not-allowed bg-gray-800 bg-opacity-30"
//     //             : "text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700"
//     //         }`}
//     //       >
//     //         <IoIosArrowBack size={20} />
//     //       </button>

//     //       {/* Page Numbers */}
//     //       <div className="flex items-center gap-1">
//     //         {[...Array(totalPages)].map((_, index) => {
//     //           const pageNum = index + 1;
//     //           return (
//     //             <button
//     //               key={pageNum}
//     //               onClick={() => handlePageChange(pageNum)}
//     //               className={`min-w-[40px] h-10 rounded-lg text-sm font-medium transition ${
//     //                 filters.page === pageNum
//     //                   ? "bg-[#548f54] text-white shadow-lg"
//     //                   : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
//     //               }`}
//     //             >
//     //               {pageNum}
//     //             </button>
//     //           );
//     //         })}
//     //       </div>

//     //       {/* Next Button */}
//     //       <button
//     //         onClick={() => hasNextPage && handlePageChange(filters.page + 1)}
//     //         disabled={!hasNextPage}
//     //         className={`p-2 rounded-lg transition ${
//     //           !hasNextPage
//     //             ? "text-gray-600 cursor-not-allowed bg-gray-800 bg-opacity-30"
//     //             : "text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700"
//     //         }`}
//     //       >
//     //         <IoIosArrowForward size={20} />
//     //       </button>
//     //     </div>
//     //   )}
//     //   {/* Filter Dialog */}
//     //   <FilterDialog
//     //     open={filterOpen}
//     //     onClose={handleClearFilters}
//     //     onApply={handleApplyFilters}
//     //     className="absolute top-[420px] right-[80px] bg-[#2E2E48] text-white p-6 rounded-2xl
//     //       shadow-2xl border border-gray-700 w-[360px]"
//     //   >
//     //     <>
//     //       {/* Date Range */}
//     //       <div className="flex flex-col gap-3 mb-4">
//     //         <label className="text-sm text-gray-300 font-medium">
//     //           Date Range
//     //         </label>
//     //         <div className="flex items-center gap-2">
//     //           <input
//     //             type="date"
//     //             name="fromDate"
//     //             value={tempFilters.fromDate}
//     //             onChange={handleFilterChange}
//     //             className="flex-1 bg-[#3a3a5c] border border-gray-600 rounded-lg px-2 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//     //           />
//     //           <span className="text-gray-400">→</span>
//     //           <input
//     //             type="date"
//     //             name="toDate"
//     //             value={tempFilters.toDate}
//     //             onChange={handleFilterChange}
//     //             className="flex-1 bg-[#3a3a5c] border border-gray-600 rounded-lg px-2 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//     //           />
//     //         </div>
//     //       </div>

//     //       {/* Goal Filter */}
//     //       <div className="mb-4">
//     //         <label className="text-sm text-gray-300 mb-2 font-medium block">
//     //           Filter by Goal
//     //         </label>
//     //         <div className="relative">
//     //           <select
//     //             name="goal_id"
//     //             className="h-11 w-full px-4 pr-10 rounded-lg border border-gray-400
//     //               bg-[rgba(255,255,255,0.15)] text-white text-sm
//     //               focus:outline-none focus:ring-2 focus:ring-green-400
//     //               transition-all duration-200 appearance-none"
//     //             style={{
//     //               backgroundColor: "rgba(255,255,255,0.15)",
//     //               color: "white",
//     //             }}
//     //             value={tempFilters.goal_id}
//     //             onChange={handleFilterChange}
//     //           >
//     //             <option
//     //               value=""
//     //               style={{ backgroundColor: "#2E2E48", color: "white" }}
//     //             >
//     //               All Goals
//     //             </option>
//     //             {GoalData?.data && GoalData.data.length > 0 ? (
//     //               GoalData.data.map((item: GoalDataTypes) => (
//     //                 <option
//     //                   value={item._id}
//     //                   key={item._id}
//     //                   style={{ backgroundColor: "#2E2E48", color: "white" }}
//     //                 >
//     //                   {item.goal_name}
//     //                 </option>
//     //               ))
//     //             ) : (
//     //               <option
//     //                 disabled
//     //                 style={{ backgroundColor: "#2E2E48", color: "white" }}
//     //               >
//     //                 No goals available
//     //               </option>
//     //             )}
//     //           </select>
//     //           <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//     //             <MdKeyboardArrowDown size={18} />
//     //           </span>
//     //         </div>
//     //       </div>

//     //       {/* Filter Buttons */}
//     //       <div className="flex gap-2 mt-6">
//     //         <button
//     //           onClick={handleApplyFilters}
//     //           className="flex-1 bg-[#548f54] hover:bg-[#468f46] text-white font-medium py-2 px-4 rounded-lg transition"
//     //         >
//     //           Apply
//     //         </button>
//     //         <button
//     //           onClick={handleClearFilters}
//     //           className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition"
//     //         >
//     //           Clear
//     //         </button>
//     //       </div>
//     //     </>
//     //   </FilterDialog>
//     //   {/* Delete Dialog */}
//     //   <DeleteDialog
//     //     open={deleteDialog}
//     //     onClose={() => setDeleteDialog(false)}
//     //     onDelete={(id: string) => deleteMutation.mutate(id)}
//     //     deleteId={deleteId}
//     //   />
//     // </div>
//     <></>
//   );
// }

import React, { useState, useCallback, useMemo } from "react";
import {
  useIncomeFilter,
  useDeleteIncome,
} from "../../api/income/income-hooks";
import { useFindAllGoal } from "../../api/goal/goal-hooks";
import type { GoalData, IncomeData } from "../../types/types";
// import type { GoalDataTypes } from "../../types/response-types";

import FilterDialog from "../../dialog/filter";
import { DeleteDialog } from "../../dialog/delete-dialog";

import IncomeMobileCards from "./incomeMobileCards";
import IncomeTableDesktop from "./incomeTableDesktop";
import IncomeSummaryCards from "./incomeSummaryCards";
import IncomeMobileControls from "./incomeMobileControl";

export interface FilterState {
  page: number;
  limit: number;
  search: string;
  fromDate: string;
  toDate: string;
  deadline_date: string;
  status: string;
  goal_id: string;
  income_date: "";
}

const DEFAULT_FILTERS: FilterState = {
  page: 1,
  limit: 10,
  search: "",
  fromDate: "",
  toDate: "",
  deadline_date: "",
  status: "",
  goal_id: "",
  income_date: "",
};

export default function IncomeTable({
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

  /* -------------------- API Calls -------------------- */
  const { data: filterData, isLoading } = useIncomeFilter(filters);
  const { data: GoalData } = useFindAllGoal();

  const deleteMutation = useDeleteIncome({
    onSuccess: () => {
      setDeleteDialog(false);
      setDeleteId(null);
    },
  });

  /* -------------------- Memoized Data -------------------- */
  const incomeData: IncomeData[] = useMemo(
    () => filterData?.data || [],
    [filterData?.data]
  );

  const pagination = filterData?.pagination;

  const totalPages = pagination?.totalPages || 1;
  const hasPrevPage = pagination?.hasPrevPage;
  const hasNextPage = pagination?.hasNextPage;

  const totalIncome = Number(pagination?.totalIncomeAmount || 0);
  const totalContributed = Number(pagination?.totalGoalContribution || 0);
  const recordCount = Number(pagination?.totalRecords || 0);

  // /* -------------------- Handlers -------------------- */
  // const handlePageChange = useCallback((page: number) => {
  //   setFilters((prev) => ({ ...prev, page }));
  // }, []);

  // const handleSearch = useCallback((search: string) => {
  //   setFilters((prev) => ({ ...prev, search, page: 1 }));
  // }, []);

  // const handleLimitChange = useCallback((limit: number) => {
  //   setFilters((prev) => ({ ...prev, limit, page: 1 }));
  // }, []);

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setTempFilters((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleApplyFilters = useCallback(() => {
    setFilters({ ...tempFilters, page: 1 });
    setFilterOpen(false);
  }, [tempFilters]);

  const handleClearFilters = useCallback(() => {
    setTempFilters(DEFAULT_FILTERS);
    setFilters(DEFAULT_FILTERS);
    setFilterOpen(false);
  }, []);

  // Handle search
  const handleSearch = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value, page: 1 }));
  }, []);

  //   // Handle page change
  const handlePageChange = useCallback((newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  }, []);

  //   const totalPages = pagination?.totalPages || 1;
  // const hasPrevPage = pagination?.hasPrevPage;
  // const hasNextPage = pagination?.hasNextPage;

  // const handlePageChange = useCallback((page: number) => {
  //   setFilters((prev) => ({ ...prev, page }));
  // }, []);

  // const handleSearch = useCallback((search: string) => {
  //   setFilters((prev) => ({ ...prev, search, page: 1 }));
  // }, []);

  const handleLimitChange = useCallback((limit: number) => {
    setFilters((prev) => ({ ...prev, limit, page: 1 }));
  }, []);

  /* -------------------- Render -------------------- */

  return (
    <div className="mt-10 px-4 sm:px-6 text-gray-200 w-full max-w-full overflow-hidden">
      <IncomeSummaryCards
        totalIncome={totalIncome}
        totalContributed={totalContributed}
        recordCount={recordCount}
      />

      <div className="space-y-4">
        {/* Mobile Search & Pagination */}
        <IncomeMobileControls
          page={filters.page}
          totalPages={totalPages}
          search={filters.search}
          limit={filters.limit}
          onSearch={handleSearch}
          onPrev={() => handlePageChange(filters.page - 1)}
          onNext={() => handlePageChange(filters.page + 1)}
          onLimitChange={(limit) =>
            setFilters((prev) => ({ ...prev, limit, page: 1 }))
          }
        />

        {/* Mobile Cards */}
        <IncomeMobileCards
          isLoading={isLoading}
          incomeData={incomeData}
          onEdit={onEdit}
          onDelete={(id) => {
            setDeleteId(id); // select record
            setDeleteDialog(true); // open modal
          }}
        />

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center justify-between mb-4">
          {/* Search */}
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search income..."
            className="
      h-11 w-72 px-4
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
              className="h-11 px-3 rounded-lg bg-[#2E2E48] border border-gray-700 text-sm text-white"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>

            {/* Filter Button */}
            <button
              onClick={() => setFilterOpen(true)}
              className="
        h-11 px-5 rounded-lg
        bg-blue-500 hover:bg-blue-600
        text-white text-sm font-medium
      "
            >
              Filter
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <IncomeTableDesktop
          isLoading={isLoading}
          incomeData={incomeData}
          onEdit={onEdit}
          setDeleteId={setDeleteId}
          setDeleteDialog={setDeleteDialog}
        />

        {/* Desktop Pagination */}
        <div className="hidden md:flex items-center justify-between mt-4">
          <span className="text-sm text-gray-400">
            Page {filters.page} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={!hasPrevPage}
              onClick={() => handlePageChange(filters.page - 1)}
              className="
        px-4 py-2 rounded-lg
        bg-[#2E2E48] border border-gray-700
        text-sm text-white
        disabled:opacity-40
      "
            >
              Prev
            </button>

            <button
              disabled={!hasNextPage}
              onClick={() => handlePageChange(filters.page + 1)}
              className="
        px-4 py-2 rounded-lg
        bg-[#2E2E48] border border-gray-700
        text-sm text-white
        disabled:opacity-40
      "
            >
              Next
            </button>
          </div>
        </div>

        {/* Delete Dialog */}
        <DeleteDialog
          open={deleteDialog}
          deleteId={deleteId}
          onClose={() => setDeleteDialog(false)}
          onDelete={(id: string) => deleteMutation.mutate(id)}
        />

        <FilterDialog
          open={filterOpen}
          onClose={handleClearFilters}
          onApply={handleApplyFilters}
          className="absolute top-[420px] right-[80px] bg-[#2E2E48] text-white p-6 rounded-2xl 
             shadow-2xl border border-gray-700 w-[360px]"
        >
          <>
            {/* Date Range */}
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
                  className="flex-1 bg-[#3a3a5c] border border-gray-600 rounded-lg px-2 py-2 text-white text-sm"
                />
                <span className="text-gray-400">→</span>
                <input
                  type="date"
                  name="toDate"
                  value={tempFilters.toDate}
                  onChange={handleFilterChange}
                  className="flex-1 bg-[#3a3a5c] border border-gray-600 rounded-lg px-2 py-2 text-white text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-4">
              <label className="text-sm text-gray-300 font-medium">
                Income Date
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  name="income_date"
                  value={tempFilters.income_date}
                  onChange={handleFilterChange}
                  className="flex-1 bg-[#3a3a5c] border border-gray-600 rounded-lg px-2 py-2 text-white text-sm"
                />
              </div>
            </div>

            {/* Goal Filter */}
            <div className="mb-4">
              <label className="text-sm text-gray-300 mb-2 font-medium block">
                Filter by Goal
              </label>

              <select
                name="goal_id"
                value={tempFilters.goal_id}
                onChange={handleFilterChange}
                className={`h-11 w-full min-w-0 px-4 pr-10 rounded-lg border transition-all text-sm
    appearance-none focus:outline-none shadow-sm`}
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  // color: "white",
                }}
              >
                <option
                  value=""
                  style={{ backgroundColor: "#2E2E48", color: "white" }}
                >
                  All Goals
                </option>

                {GoalData?.data?.map((goal: GoalData) => (
                  <option
                    key={goal._id}
                    value={goal._id}
                    style={{ backgroundColor: "#2E2E48", color: "white" }}
                  >
                    {goal.goal_name}
                  </option>
                ))}
              </select>
            </div>
          </>
        </FilterDialog>
      </div>
    </div>
  );
}
