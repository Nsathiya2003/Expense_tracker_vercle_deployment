// import { BiEdit } from "react-icons/bi";
// import { MdDelete, MdKeyboardArrowDown } from "react-icons/md";
// import { FiFilter, FiSearch } from "react-icons/fi";
// import React, { useState, useCallback, useMemo } from "react";
// import FilterDialog from "../../dialog/filter";
// import { IoIosArrowForward } from "react-icons/io";
// import { IoIosArrowBack } from "react-icons/io";
// import TableLoader from "../../utils/TableLoader";
// import { DeleteDialog } from "../../dialog/delete-dialog";
// import type { BudgetData } from "../../types/types";
// import { useFindAllGoal } from "../../api/goal/goal-hooks";
// import type { GoalDataTypes } from "../../types/response-types";
// import {
//   useBudgetFilter,
//   useDeleteBudget,
// } from "../../api/budget/budget-hooks";

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

// export default function BudgetTable({
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
//   const { data: filterData, isLoading } = useBudgetFilter(filters);
//   const { data: GoalData } = useFindAllGoal();
//   // Delete mutation
//   const deleteMutation = useDeleteBudget({
//     onSuccess: () => {
//       setDeleteDialog(false);
//       setDeleteId(null);
//     },
//   });

//   // Memoized income data
//   const budgetData = useMemo(() => filterData?.data || [], [filterData?.data]);
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

//   console.log({ budgetData });

//   // Calculate summary stats

//   const totalBudget = Number(paginatedData?.totalBudgetAmount);
//   const totalBudgetExceededCounts = Number(paginatedData?.budgetExceededCounts);
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
//     <div className="overflow-x-auto mt-10 px-6 text-gray-200">
//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <div className="bg-gradient-to-br from-green-500 to-green-600 bg-opacity-20 border border-green-500 border-opacity-30 rounded-lg p-4">
//           <p className="text-white-300 text-sm font-medium">Total Budget</p>
//           <p className="text-green-100 text-2xl font-bold mt-1">
//             ₹{totalBudget > 0 && totalBudget.toLocaleString("en-IN")}
//           </p>
//         </div>
//         <div className="bg-gradient-to-br from-blue-500 to-blue-600 bg-opacity-20 border border-blue-500 border-opacity-30 rounded-lg p-4">
//           <p className="text-white-300 text-sm font-medium">
//             Contributed to Goals
//           </p>
//           <p className="text-blue-100 text-2xl font-bold mt-1">
//             ₹{totalBudgetExceededCounts.toLocaleString("en-IN")}
//           </p>
//         </div>
//         <div className="bg-gradient-to-br from-orange-500 to-orange-500 bg-opacity-20 border border-orange-600 border-opacity-40 rounded-lg p-4">
//           <p className="text-white-300 text-sm font-medium">Total Records</p>
//           <p className="text-white text-2xl font-bold mt-1">
//             {recordCount.toLocaleString("en-IN")}
//           </p>
//         </div>
//       </div>

//       {/* Header Section */}
//       <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
//         <h1 className="text-[#54af54] font-bold text-2xl tracking-wide flex items-center gap-2">
//           <span className="text-3xl">💰</span>
//           View Budget
//         </h1>

//         {/* Search Box and Filter Icon */}
//         <div className="flex items-center gap-2">
//           <div className="flex items-center border border-gray-600 rounded-lg bg-[rgba(255,255,255,0.1)] backdrop-blur-md overflow-hidden hover:border-gray-500 transition">
//             <FiSearch className="mx-3 text-gray-400" size={18} />
//             <input
//               type="text"
//               placeholder="Search income..."
//               value={filters.search}
//               onChange={(e) => handleSearch(e.target.value)}
//               className="w-[250px] h-11 px-0 bg-transparent text-white placeholder:text-gray-400 focus:outline-none"
//             />
//           </div>
//           <button
//             onClick={() => setFilterOpen(true)}
//             className="bg-[#548f54] hover:bg-[#468f46] text-white p-2.5 rounded-lg transition"
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
//               <th className="py-4 px-4 text-left font-semibold">
//                 Budget Amount
//               </th>
//               {/* <th className="py-4 px-4 text-left font-semibold">Month</th> */}
//               <th className="py-4 px-4 text-left font-semibold">Start Date</th>
//               <th className="py-4 px-4 text-left font-semibold">
//                 Notification Type
//               </th>

//               <th className="py-4 px-4 text-center font-semibold">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {isLoading ? (
//               <TableLoader />
//             ) : budgetData.length > 0 ? (
//               budgetData.map((item: BudgetData, index: number) => (
//                 <tr
//                   key={item._id}
//                   className={`border-b border-gray-700 hover:bg-[rgba(84,175,84,0.1)] transition ${
//                     index % 2 === 0
//                       ? "bg-[rgba(255,255,255,0.02)]"
//                       : "bg-[rgba(255,255,255,0.05)]"
//                   }`}
//                 >
//                   <td className="py-4 px-4 font-semibold text-white">
//                     <span className="bg-blue-500 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
//                       {item.budget_category || "N/A"}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4 font-bold text-green-400">
//                     ₹{item.budget_amount?.toLocaleString("en-IN") || 0}
//                   </td>
//                   {/* <td className="py-4 px-4 font-semibold text-white">
//                     <span className="bg-blue-500 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
//                       {item.budget_month || "N/A"}
//                     </span>
//                   </td> */}
//                   <td className="py-4 px-4 text-gray-300 text-sm">
//                     <span className="bg-gray-700 bg-opacity-50 px-2 py-1 rounded">
//                       {new Date(item.budget_start_date).toLocaleDateString(
//                         "en-IN",
//                         {
//                           year: "numeric",
//                           month: "short",
//                           day: "numeric",
//                         }
//                       )}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4 font-bold text-green-400">
//                     {!item.budget_exceeded
//                       ? `Percentage - ${item.reach_percentage}`
//                       : `Exceeded`}
//                   </td>
//                   <td className="py-4 px-4">
//                     <div className="flex justify-center items-center gap-2">
//                       {/* Edit */}
//                       <button
//                         onClick={() => onEdit(item._id)}
//                         className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition transform hover:scale-110"
//                         title="Edit Income"
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
//                         title="Delete Income"
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
//                   colSpan={7}
//                   className="text-center py-12 text-gray-400 text-base"
//                 >
//                   <div className="flex flex-col items-center gap-2">
//                     <p className="text-3xl">📭</p>
//                     <p>No budget records found</p>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Page Limit Dropdown & Results Display */}
//       <div className="flex justify-between items-center my-6 flex-wrap gap-4 px-2">
//         <div className="text-gray-400 text-sm font-medium">
//           Showing{" "}
//           <span className="text-white font-semibold">{budgetData.length}</span>{" "}
//           of{" "}
//           <span className="text-[#548f54] font-semibold">{filters.limit}</span>{" "}
//           records
//         </div>
//         <div className="flex items-center gap-3">
//           <span className="text-gray-400 text-sm">Rows per page:</span>
//           <div className="relative">
//             <select
//               className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg pr-8 pl-3 cursor-pointer border border-gray-600 hover:border-gray-500 transition focus:outline-none focus:ring-2 focus:ring-[#548f54] focus:ring-opacity-50"
//               value={filters.limit}
//               onChange={(e) => handleLimitChange(Number(e.target.value))}
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//               <option value={50}>50</option>
//             </select>
//             <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//               <MdKeyboardArrowDown size={18} />
//             </span>
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
//                       ? "bg-[#548f54] text-white shadow-lg"
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
//         className="absolute top-[420px] right-[80px] bg-[#2E2E48] text-white p-6 rounded-2xl
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

//           {/* Goal Filter */}
//           <div className="mb-4">
//             <label className="text-sm text-gray-300 mb-2 font-medium block">
//               Filter by Goal
//             </label>
//             <div className="relative">
//               <select
//                 name="goal_id"
//                 className="h-11 w-full px-4 pr-10 rounded-lg border border-gray-400
//                   bg-[rgba(255,255,255,0.15)] text-white text-sm
//                   focus:outline-none focus:ring-2 focus:ring-green-400
//                   transition-all duration-200 appearance-none"
//                 style={{
//                   backgroundColor: "rgba(255,255,255,0.15)",
//                   color: "white",
//                 }}
//                 value={tempFilters.goal_id}
//                 onChange={handleFilterChange}
//               >
//                 <option
//                   value=""
//                   style={{ backgroundColor: "#2E2E48", color: "white" }}
//                 >
//                   All Goals
//                 </option>
//                 {GoalData?.data && GoalData.data.length > 0 ? (
//                   GoalData.data.map((item: GoalDataTypes) => (
//                     <option
//                       value={item._id}
//                       key={item._id}
//                       style={{ backgroundColor: "#2E2E48", color: "white" }}
//                     >
//                       {item.goal_name}
//                     </option>
//                   ))
//                 ) : (
//                   <option
//                     disabled
//                     style={{ backgroundColor: "#2E2E48", color: "white" }}
//                   >
//                     No goals available
//                   </option>
//                 )}
//               </select>
//               <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//                 <MdKeyboardArrowDown size={18} />
//               </span>
//             </div>
//           </div>

//           {/* Filter Buttons */}
//           <div className="flex gap-2 mt-6">
//             <button
//               onClick={handleApplyFilters}
//               className="flex-1 bg-[#548f54] hover:bg-[#468f46] text-white font-medium py-2 px-4 rounded-lg transition"
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

import { useState, useCallback, useMemo } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useFindAllGoal } from "../../api/goal/goal-hooks";
import {
  useBudgetFilter,
  useDeleteBudget,
} from "../../api/budget/budget-hooks";
import type { BudgetData } from "../../types/types";
import type { GoalDataTypes } from "../../types/response-types";

import BudgetSummaryCards from "./BudgetSummaryCards";
import BudgetMobileControls from "./BudgetMobileControls";
import BudgetMobileCards from "./BudgetMobileCards";

import FilterDialog from "../../dialog/filter";
import { DeleteDialog } from "../../dialog/delete-dialog";
import BudgetTableDesktop from "./BudgetDesktop";

export interface FilterState {
  page: number;
  limit: number;
  search: string;
  fromDate: string;
  toDate: string;
  deadline_date: string;
  status: string;
  goal_id: string;
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
};

export default function BudgetTable({
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

  /* ================= API CALLS ================= */
  const { data: filterData, isLoading } = useBudgetFilter(filters);
  const { data: GoalData } = useFindAllGoal();

  const deleteMutation = useDeleteBudget({
    onSuccess: () => {
      setDeleteDialog(false);
      setDeleteId(null);
    },
  });

  /* ================= MEMOIZED DATA ================= */
  const budgetData: BudgetData[] = useMemo(
    () => filterData?.data || [],
    [filterData?.data]
  );

  const pagination = filterData?.pagination;

  const totalPages = pagination?.totalPages || 1;
  const hasPrevPage = pagination?.hasPrevPage;
  const hasNextPage = pagination?.hasNextPage;

  const totalBudget = Number(pagination?.totalBudgetAmount || 0);
  const exceededCount = Number(pagination?.budgetExceededCounts || 0);
  const recordCount = Number(pagination?.totalRecords || 0);

  /* ================= HANDLERS ================= */
  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const handleSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  }, []);

  const handleLimitChange = useCallback((limit: number) => {
    setFilters((prev) => ({ ...prev, limit, page: 1 }));
  }, []);

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

  /* ================= RENDER ================= */
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
      {/* ================= SUMMARY ================= */}
      <BudgetSummaryCards
        totalBudget={totalBudget}
        totalExceeded={exceededCount}
        recordCount={recordCount}
      />

      {/* ================= MOBILE CONTROLS ================= */}
      <BudgetMobileControls
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
      <BudgetMobileCards
        isLoading={isLoading}
        budgetData={budgetData}
        onEdit={onEdit}
        onDelete={(id) => {
          setDeleteId(id);
          setDeleteDialog(true);
        }}
      />

      {/* ================= DESKTOP CONTROLS ================= */}
      <div className="hidden md:flex items-center justify-between mb-4">
        <input
          type="text"
          value={filters.search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search budget..."
          className="
            h-11
            w-72
            px-4
            rounded-lg
            bg-[#2E2E48]
            border border-gray-700
            text-sm
            text-white
            placeholder:text-gray-400
          "
        />

        <div className="flex items-center gap-3">
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
        <BudgetTableDesktop
          isLoading={isLoading}
          budgetData={budgetData}
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
                        ? "bg-green-600 text-white shadow-lg"
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
        <>
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

          <div className="mb-4">
            <label className="text-sm text-gray-300 mb-2 font-medium block">
              Filter by Goal
            </label>

            <select
              name="goal_id"
              value={tempFilters.goal_id}
              onChange={handleFilterChange}
              className="h-11 w-full px-4 rounded-lg bg-[rgba(255,255,255,0.15)] text-white"
            >
              <option value="">All Goals</option>
              {GoalData?.data?.map((goal: GoalDataTypes) => (
                <option key={goal._id} value={goal._id}>
                  {goal.goal_name}
                </option>
              ))}
            </select>
          </div>
        </>
      </FilterDialog>

      {/* ================= DELETE DIALOG ================= */}
      <DeleteDialog
        open={deleteDialog}
        deleteId={deleteId}
        onClose={() => setDeleteDialog(false)}
        onDelete={(id: string) => deleteMutation.mutate(id)}
      />
    </div>
  );
}
