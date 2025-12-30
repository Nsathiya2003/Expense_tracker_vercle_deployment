// // import FilterDialog from "../../dialog/filter";
// import { useState, useMemo } from "react";
// import { BiEdit } from "react-icons/bi";
// import { MdDelete } from "react-icons/md";
// import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// import { IoEye } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import { useViewGoalHistory } from "../../api/goal/goal-hooks";
// import TableLoader from "../../utils/TableLoader";
// import type { GoalHistoryData } from "../../types/types";
// import { MdOutlineList, MdGridView } from "react-icons/md";

// export default function GoalHistoryTable() {
//   const navigate = useNavigate();
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [filters, setFilters] = useState({ page: 1, limit: 10 });

//   const { data: filterData, isLoading } = useViewGoalHistory(filters);
//   const goalsHistory: GoalHistoryData[] = filterData?.data || [];
//   const pag = filterData?.pagination || {};
//   const totalPages = pag?.totalPages || 1;
//   const hasPrevPage = pag?.hasPrevPage;
//   const hasNextPage = pag?.hasNextPage;
//   const totalRecords = pag?.totalRecords || 0;

//   const handlePageChange = (newPage: number) => {
//     setFilters((prev) => ({ ...prev, page: newPage }));
//   };

//   const formatAmount = (amt?: number | string) => {
//     const num = Number(amt || 0);
//     return `₹${num.toLocaleString("en-IN")}`;
//   };

//   const empty = !isLoading && goalsHistory.length === 0;

//   const showingCountText = useMemo(() => {
//     const start = (filters.page - 1) * filters.limit + 1;
//     const end = Math.min(
//       filters.page * filters.limit,
//       totalRecords || goalsHistory.length
//     );
//     if (totalRecords === 0) return "Showing 0 of 0 records";
//     return `Showing ${start}-${end} of ${totalRecords} records`;
//   }, [filters.page, filters.limit, totalRecords, goalsHistory.length]);

//   return (
//     <div className="w-full max-w-[1100px] mx-auto mt-8">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6 gap-3">
//         <div>
//           <h1 className="text-[#548f54] font-semibold text-2xl tracking-wide">
//             Goal History
//           </h1>
//           <p className="text-gray-400 text-sm mt-1">
//             A timeline of savings and contributions
//           </p>
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="flex items-center border border-gray-600 rounded-lg bg-[rgba(255,255,255,0.03)] overflow-hidden">
//             <input
//               type="text"
//               placeholder="Search history..."
//               className="w-[240px] h-11 px-4 bg-transparent text-white placeholder:text-gray-400 focus:outline-none"
//             />
//           </div>

//           <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.03)] border border-gray-700 rounded-lg p-1">
//             <button
//               onClick={() => setViewMode("list")}
//               className={`p-2 rounded-md ${
//                 viewMode === "list" ? "bg-gray-800" : "hover:bg-gray-800"
//               }`}
//               title="List view"
//             >
//               <MdOutlineList className="text-xl text-gray-200" />
//             </button>
//             <button
//               onClick={() => setViewMode("grid")}
//               className={`p-2 rounded-md ${
//                 viewMode === "grid" ? "bg-gray-800" : "hover:bg-gray-800"
//               }`}
//               title="Grid view"
//             >
//               <MdGridView className="text-xl text-gray-200" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="bg-[rgba(255,255,255,0.03)] border border-gray-700 rounded-2xl p-4 shadow-md">
//         {isLoading ? (
//           <div className="py-16">
//             <TableLoader />
//           </div>
//         ) : empty ? (
//           <div className="py-16 text-center text-gray-400">
//             <p className="text-3xl">📭</p>
//             <p className="mt-3">No goal history found.</p>
//           </div>
//         ) : (
//           <>
//             {/* Grid View */}
//             {viewMode === "grid" ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {goalsHistory.map((item) => (
//                   <div
//                     key={item.id}
//                     className="bg-[#12121a] border border-gray-800 rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition"
//                   >
//                     <div>
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <h3 className="text-white font-semibold text-lg">
//                             {item.income_type}
//                           </h3>
//                         </div>
//                         <div className="text-right">
//                           <div className="text-green-300 font-bold text-lg">
//                             {formatAmount(item.allocated_amount)}
//                           </div>
//                           <div className="text-gray-400 text-xs mt-1">
//                             {new Date(item.createdAt).toLocaleDateString(
//                               "en-IN"
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="mt-4 flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <button
//                           className="text-blue-400 hover:text-blue-300"
//                           title="Edit"
//                         >
//                           <BiEdit />
//                         </button>
//                         <button
//                           className="text-red-500 hover:text-red-400"
//                           title="Delete"
//                         >
//                           <MdDelete />
//                         </button>
//                       </div>
//                       <button
//                         onClick={() => navigate(`/goal-history/${item.id}`)}
//                         className="text-sm text-[#548f54] font-medium hover:underline"
//                       >
//                         View details
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               /* List View */
//               <div className="divide-y divide-gray-800">
//                 {goalsHistory.map((item) => (
//                   <div
//                     key={item.id}
//                     className="py-4 flex items-center justify-between"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2b2b3f] to-[#20202b] flex items-center justify-center text-xl text-white">
//                         💸
//                       </div>
//                       <div>
//                         <div className="text-white font-semibold">
//                           {item.income_type}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-6">
//                       <div className="text-right">
//                         <div className="text-green-300 font-bold">
//                           {formatAmount(item.allocated_amount)}
//                         </div>
//                         <div className="text-gray-400 text-xs">
//                           {new Date(item.createdAt).toLocaleDateString("en-IN")}
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <button
//                           className="text-blue-400 hover:text-blue-300"
//                           title="Edit"
//                         >
//                           <BiEdit />
//                         </button>
//                         <button
//                           className="text-red-500 hover:text-red-400"
//                           title="Delete"
//                         >
//                           <MdDelete />
//                         </button>
//                         <button
//                           onClick={() => navigate(`/goal-history/${item.id}`)}
//                           className="text-[#548f54] hover:underline text-sm"
//                         >
//                           View
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Footer: showing + rows per page + pagination */}
//       <div className="flex items-center justify-between gap-4 mt-4">
//         <div className="text-gray-400 text-sm">{showingCountText}</div>

//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-2">
//             <span className="text-gray-400 text-sm">Rows per page:</span>
//             <select
//               value={filters.limit}
//               onChange={(e) =>
//                 setFilters((p) => ({
//                   ...p,
//                   limit: Number(e.target.value),
//                   page: 1,
//                 }))
//               }
//               className="bg-gray-800 text-white px-3 py-1.5 rounded-lg pr-8 pl-3 cursor-pointer border border-gray-600 hover:border-gray-400 transition"
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//               <option value={50}>50</option>
//             </select>
//           </div>

//           {/* Pagination controls */}
//           {totalPages > 1 && (
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() =>
//                   hasPrevPage && handlePageChange(filters.page - 1)
//                 }
//                 disabled={!hasPrevPage}
//                 className={`p-2 rounded-lg transition ${
//                   !hasPrevPage
//                     ? "text-gray-600 cursor-not-allowed"
//                     : "text-gray-300 hover:text-white"
//                 }`}
//               >
//                 <IoIosArrowBack />
//               </button>

//               <div className="flex items-center gap-1">
//                 {[...Array(totalPages)].map((_, i) => {
//                   const pageNum = i + 1;
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => handlePageChange(pageNum)}
//                       className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
//                         filters.page === pageNum
//                           ? "bg-[#548f54] text-white"
//                           : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//                       }`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
//               </div>

//               <button
//                 onClick={() =>
//                   hasNextPage && handlePageChange(filters.page + 1)
//                 }
//                 disabled={!hasNextPage}
//                 className={`p-2 rounded-lg transition ${
//                   !hasNextPage
//                     ? "text-gray-600 cursor-not-allowed"
//                     : "text-gray-300 hover:text-white"
//                 }`}
//               >
//                 <IoIosArrowForward />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
