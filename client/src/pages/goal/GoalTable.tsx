// import { BiEdit } from "react-icons/bi";
// import { MdDelete } from "react-icons/md";
// import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// // import { IoEye } from "react-icons/io5";
// import { useState } from "react";
// import FilterDialog from "../../dialog/filter";
// import { useDeleteGoal, useGoalFilter } from "../../api/goal/goal-hooks";
// import type { GoalData } from "../../types/types";
// import TableLoader from "../../utils/TableLoader";
// import { DeleteDialog } from "../../dialog/delete-dialog";
// // import { FiFilter } from "react-icons/fi";

// export default function GoalTable({
//   onEdit,
// }: {
//   onEdit: (id: string) => void;
// }) {
//   // const navigate = useNavigate();
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [deleteDialog, setDeleteDialog] = useState(false);
//   const [deleteId, setDeleteId] = useState<string | null>(null);

//   const [filters, setFilters] = useState({
//     page: 1,
//     limit: 10,
//     search: "",
//     fromDate: "",
//     toDate: "",
//     deadline_date: "",
//     status: "",
//   });
//   const [tempFilters, setTempFilters] = useState({ ...filters });

//   // --- Fetch filtered + paginated goals ---
//   const { data: filterData, isLoading } = useGoalFilter(filters);

//   const goals = filterData?.data || [];
//   const totalPages = filterData?.pagination?.totalPages || 1;
//   const hasPrevPage = filterData?.pagination?.hasPrevPage;
//   const hasNextPage = filterData?.pagination?.hasNextPage;

//   // const handleFilter = () => {
//   //   setFilterOpen(true);
//   // };

//   // --- Handlers ---
//   const handlePageChange = (newPage: number) => {
//     setFilters((prev) => ({ ...prev, page: newPage }));
//   };

//   const handleSearch = (value: string) => {
//     setFilters((prev) => ({ ...prev, search: value, page: 1 }));
//   };

//   console.log(filters, "filters----");

//   // const viewHistory = () => navigate("/goal-history");

//   const handleDelete = (item: GoalData) => {
//     setDeleteDialog(true);
//     setDeleteId(item?._id);
//   };

//   // delete mutation (top-level hook)
//   const deleteMutation = useDeleteGoal({
//     onSuccess: () => {
//       setDeleteDialog(false);
//       setDeleteId(null);
//     },
//   });

//   return (
//     <div className="overflow-x-auto text-gray-200">
//       <div className="flex flex-wrap items-center justify-between mb-6">
//         <h1 className="text-[#548f54] font-semibold text-2xl tracking-wide">
//           View Goals
//         </h1>

//         {/* Search Box + Filter Icon */}
//         <div className="flex items-center gap-3">
//           {/* Search Input */}
//           <div className="flex items-center border border-gray-600 rounded-lg bg-[rgba(255,255,255,0.1)] backdrop-blur-md overflow-hidden mt-10">
//             <input
//               type="text"
//               name="search"
//               id="search"
//               placeholder="Search here..."
//               value={filters.search}
//               onChange={(e) => handleSearch(e.target.value)}
//               className="w-[250px] h-11 px-4 bg-transparent text-white placeholder:text-gray-400 focus:outline-none"
//             />
//           </div>

//           {/* Filter Icon */}
//           {/* <FiFilter
//             className="text-[#548f54] text-2xl cursor-pointer hover:text-[#6ecf6e] transition"
//             onClick={handleFilter}
//           /> */}
//         </div>
//       </div>

//       {/* Table Container */}
//       <div className="bg-[rgba(255,255,255,0.05)] border border-gray-700 shadow-lg backdrop-blur-md rounded-2xl overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-[#2E2E48] text-white uppercase text-xs tracking-wider">
//             <tr>
//               <th className="py-4 px-4 text-left font-semibold">Goal Name</th>
//               <th className="py-4 px-4 text-left font-semibold">
//                 Target Amount
//               </th>
//               <th className="py-4 px-4 text-left font-semibold">
//                 Allocated Amount
//               </th>
//               <th className="py-4 px-4 text-left font-semibold">Target Date</th>
//               <th className="py-4 px-4 text-left font-semibold">Status</th>
//               <th className="py-4 px-4 text-center font-semibold">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {isLoading ? (
//               <TableLoader />
//             ) : (
//               <>
//                 {goals.length > 0 ? (
//                   goals.map((item: GoalData, index: number) => (
//                     <tr
//                       key={item._id}
//                       className={`border-b border-gray-700 hover:bg-[rgba(255,255,255,0.08)] transition-colors ${
//                         index % 2 === 0 ? "bg-[rgba(255,255,255,0.03)]" : ""
//                       }`}
//                     >
//                       <td className="py-4 px-4 font-medium text-white">
//                         {item.goal_name}
//                       </td>
//                       <td className="py-4 px-4 text-green-400 font-semibold">
//                         ₹{item.target_amount?.toLocaleString()}
//                       </td>
//                       <td className="py-4 px-4 text-blue-400">
//                         ₹{item.allocated_amount?.toLocaleString()}
//                       </td>
//                       <td className="py-4 px-4 text-gray-300">
//                         {new Date(item?.deadline_date).toLocaleDateString(
//                           "en-IN"
//                         )}
//                       </td>
//                       <td className="py-4 px-4">
//                         <span
//                           className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
//                             item.status === "PENDING"
//                               ? "bg-red-500 bg-opacity-20 text-red-300 border border-red-500 border-opacity-40"
//                               : item.status === "completed"
//                               ? "bg-green-500 bg-opacity-20 text-green-300 border border-green-500 border-opacity-40"
//                               : "bg-gray-500 bg-opacity-20 text-gray-300 border border-gray-500 border-opacity-40"
//                           }`}
//                         >
//                           {item.status}
//                         </span>
//                       </td>

//                       <td className="py-4 px-4 flex items-center justify-center gap-4">
//                         {/* Edit */}
//                         <div className="relative group">
//                           <BiEdit
//                             className="text-blue-400 text-lg cursor-pointer hover:text-blue-300 transition-colors"
//                             onClick={() => onEdit(item._id)}
//                             title="Edit"
//                           />
//                           <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg border border-gray-700">
//                             Edit Goal
//                           </span>
//                         </div>
//                         {/* Delete */}
//                         <div className="relative group">
//                           <MdDelete
//                             className="text-red-500 text-lg cursor-pointer hover:text-red-400 transition-colors"
//                             onClick={() => handleDelete(item)}
//                             title="Delete"
//                           />
//                           <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg border border-gray-700">
//                             Delete Goal
//                           </span>
//                         </div>
//                         {/* View */}
//                         {/* <div className="relative group">
//                           <IoEye
//                             className="text-green-500 text-lg cursor-pointer hover:text-green-400 transition-colors"
//                             onClick={viewHistory}
//                             title="View History"
//                           />
//                           <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg border border-gray-700">
//                             View History
//                           </span>
//                         </div> */}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       className="text-center py-8 text-gray-400 text-base"
//                     >
//                       No goals found. Create your first goal to get started!
//                     </td>
//                   </tr>
//                 )}
//               </>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Page Limit Dropdown */}
//       <div className="flex justify-start items-center gap-3 mt-6 mb-4">
//         <span className="text-gray-400 text-sm">Rows per page:</span>

//         <div className="relative">
//           <select
//             className="bg-gray-800 text-white px-3 py-1.5 rounded-lg pr-8 pl-3 cursor-pointer border border-gray-600 hover:border-gray-400 transition focus:outline-none focus:ring-2 focus:ring-[#548f54] focus:ring-opacity-50"
//             value={filters.limit}
//             onChange={(e) =>
//               setFilters((prev) => ({
//                 ...prev,
//                 limit: Number(e.target.value),
//                 page: 1,
//               }))
//             }
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//             <option value={50}>50</option>
//           </select>
//         </div>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-2 mt-8 mb-6">
//           {/* Prev Button */}
//           <IoIosArrowBack
//             onClick={() => hasPrevPage && handlePageChange(filters.page - 1)}
//             className={`text-2xl cursor-pointer transition ${
//               !hasPrevPage
//                 ? "text-gray-500 cursor-not-allowed"
//                 : "text-gray-300 hover:text-[#548f54]"
//             }`}
//           />

//           {/* Page Numbers */}
//           {[...Array(totalPages)].map((_, index) => {
//             const pageNum = index + 1;
//             return (
//               <button
//                 key={pageNum}
//                 onClick={() => handlePageChange(pageNum)}
//                 className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
//                   filters.page === pageNum
//                     ? "bg-[#548f54] text-white shadow-lg"
//                     : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
//                 }`}
//               >
//                 {pageNum}
//               </button>
//             );
//           })}

//           {/* Next Button */}
//           <IoIosArrowForward
//             onClick={() => hasNextPage && handlePageChange(filters.page + 1)}
//             className={`text-2xl cursor-pointer transition ${
//               !hasNextPage
//                 ? "text-gray-500 cursor-not-allowed"
//                 : "text-gray-300 hover:text-[#548f54]"
//             }`}
//           />
//         </div>
//       )}

//       {/* Filter Dialog */}
//       <FilterDialog
//         open={filterOpen}
//         onClose={() => {
//           // Cancel clicked: reset dialog fields, trigger API with original/default filters
//           const defaultFilters = {
//             page: 1,
//             limit: 10,
//             search: "",
//             fromDate: "",
//             toDate: "",
//             deadline_date: "",
//             status: "",
//           };

//           // Option 1: Restore previous applied filters (no API call)
//           // setTempFilters(filters);
//           // setFilterOpen(false);

//           // Option 2: Reset filters to default and trigger API call
//           setTempFilters(defaultFilters); // reset dialog inputs
//           setFilters(defaultFilters); // triggers API call with default values
//           setFilterOpen(false);
//         }}
//         onApply={() => {
//           // Apply clicked: take the temp values and call API
//           setFilters({
//             page: 1, // reset page
//             limit: tempFilters.limit,
//             search: tempFilters.search,
//             fromDate: tempFilters.fromDate,
//             toDate: tempFilters.toDate,
//             deadline_date: tempFilters.deadline_date,
//             status: tempFilters.status,
//           }); // triggers API
//           setFilterOpen(false);
//         }}
//         className="absolute top-[380px] right-[80px] bg-[#2E2E48] text-white p-6 rounded-2xl
//     shadow-2xl border border-gray-700 w-[360px]
//     data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp"
//       >
//         <>
//           {/* Date Fields */}
//           <div className="flex items-center gap-4">
//             <div>
//               <label className="block text-sm text-gray-300 mb-1">
//                 From Date
//               </label>
//               <input
//                 type="date"
//                 name="fromDate"
//                 value={tempFilters.fromDate}
//                 onChange={(e) =>
//                   setTempFilters((prev) => ({
//                     ...prev,
//                     [e.target.name]: e.target.value,
//                   }))
//                 }
//                 className="w-full bg-[#3a3a5c] border border-gray-600 rounded-lg px-2 py-2 text-white focus:outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-gray-300 mb-1">
//                 To Date
//               </label>
//               <input
//                 type="date"
//                 name="toDate"
//                 value={tempFilters.toDate}
//                 onChange={(e) =>
//                   setTempFilters((prev) => ({
//                     ...prev,
//                     [e.target.name]: e.target.value,
//                   }))
//                 }
//                 className="w-full bg-[#3a3a5c] border border-gray-600 rounded-lg px-2 py-2 text-white focus:outline-none"
//               />
//             </div>
//           </div>

//           {/* Target Date */}
//           <div>
//             <label className="block text-sm text-gray-300 mb-1">
//               Target Date
//             </label>
//             <input
//               type="date"
//               name="deadline_date"
//               value={tempFilters.deadline_date}
//               onChange={(e) =>
//                 setTempFilters((prev) => ({
//                   ...prev,
//                   [e.target.name]: e.target.value,
//                 }))
//               }
//               className="w-full bg-[#3a3a5c] border border-gray-600 rounded-lg px-2 py-2 text-white focus:outline-none"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-300 mb-1 font-medium">
//               Status
//             </label>
//             <select
//               name="status"
//               value={tempFilters.status}
//               onChange={(e) =>
//                 setTempFilters((prev) => ({
//                   ...prev,
//                   [e.target.name]: e.target.value,
//                 }))
//               }
//               className="w-full bg-[#3a3a5c] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none text-sm"
//             >
//               <option value="" disabled>
//                 Select Status
//               </option>
//               <option value="PENDING">Pending</option>
//               <option value="COMPLETED">Completed</option>
//             </select>
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
// import { useFindAllGoal } from "../../api/goal/goal-hooks";
import { useGoalFilter, useDeleteGoal } from "../../api/goal/goal-hooks";
import type { GoalData } from "../../types/types";

import GoalSummaryCards from "./GoalSummaryCards";
import GoalMobileControls from "./GoalMobileControls";
import GoalMobileCards from "./GoalMobileCards";

import FilterDialog from "../../dialog/filter";
import { DeleteDialog } from "../../dialog/delete-dialog";
import GoalTableDesktop from "./GoalDesktopControl";

export interface FilterState {
  page: number;
  limit: number;
  search: string;
  fromDate: string;
  toDate: string;
  deadline_date: string;
  status: string;
}

const DEFAULT_FILTERS: FilterState = {
  page: 1,
  limit: 10,
  search: "",
  fromDate: "",
  toDate: "",
  deadline_date: "",
  status: "",
};

export default function GoalTable({
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
  const { data: filterData, isLoading } = useGoalFilter(filters);
  // const { data: allGoals } = useFindAllGoal();

  const deleteMutation = useDeleteGoal({
    onSuccess: () => {
      setDeleteDialog(false);
      setDeleteId(null);
    },
  });

  /* ================= MEMOIZED DATA ================= */
  const goalData: GoalData[] = useMemo(
    () => filterData?.data || [],
    [filterData?.data]
  );
  const pagination = filterData?.pagination;
  const totalPages = pagination?.totalPages || 1;
  const hasPrevPage = pagination?.hasPrevPage;
  const hasNextPage = pagination?.hasNextPage;

  const totalGoals = Number(pagination?.totalRecords || 0);
  const completedGoals = goalData.filter(
    (g) => g.status === "completed"
  ).length;
  const pendingGoals = goalData.filter((g) => g.status === "PENDING").length;

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
    <div className="mt-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-gray-200">
      {/* ================= SUMMARY ================= */}
      <GoalSummaryCards
        totalGoals={totalGoals}
        completedGoals={completedGoals}
        pendingGoals={pendingGoals}
      />

      {/* ================= MOBILE CONTROLS ================= */}
      <GoalMobileControls
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
      <GoalMobileCards
        isLoading={isLoading}
        goalData={goalData}
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
          placeholder="Search goals..."
          className="h-11 w-72 px-4 rounded-lg bg-[#2E2E48] border border-gray-700 text-sm text-white placeholder:text-gray-400"
        />

        <div className="flex items-center gap-3">
          <select
            value={filters.limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
            className="h-11 px-3 rounded-lg bg-[#2E2E48] border border-gray-700 text-sm text-white"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>

          <button
            onClick={() => setFilterOpen(true)}
            className="h-11 px-5 rounded-lg  bg-blue-500 hover:bg-green-700 text-white text-sm font-medium"
          >
            Filter
          </button>
        </div>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block w-full">
        <GoalTableDesktop
          isLoading={isLoading}
          goalData={goalData}
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
            className={`p-2 rounded-lg transition ${
              !hasPrevPage
                ? "text-gray-600 cursor-not-allowed bg-gray-800/30"
                : "text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700"
            }`}
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
                  className={`min-w-[40px] h-10 rounded-lg text-sm font-medium transition ${
                    filters.page === pageNum
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => hasNextPage && handlePageChange(filters.page + 1)}
            disabled={!hasNextPage}
            className={`p-2 rounded-lg transition ${
              !hasNextPage
                ? "text-gray-600 cursor-not-allowed bg-gray-800/30"
                : "text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700"
            }`}
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
        className="absolute top-[740px] right-[80px] bg-[#2E2E48] text-white p-6 rounded-2xl shadow-2xl border border-gray-700 w-[360px]"
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
            Status
          </label>
          <select
            name="status"
            value={tempFilters.status}
            onChange={handleFilterChange}
            className="h-11 w-full px-4 rounded-lg bg-[rgba(255,255,255,0.15)] text-white"
          >
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
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
