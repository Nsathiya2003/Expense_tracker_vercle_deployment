// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { IoIosArrowBack } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// // import GoalHistoryTable from "./goalHistory-table";
// import { MdCheckCircle } from "react-icons/md";

// const data = [
//   { month: "Jan", saved: 3000 },
//   { month: "Feb", saved: 2500 },
//   { month: "Mar", saved: 4000 },
//   { month: "Apr", saved: 2000 },
// ];

// export default function GoalHistory() {
//   const goal = {
//     name: "Buy a Bike",
//     target: 20000,
//     saved: 9500,
//     startDate: "2025-01-01",
//     targetDate: "2025-06-30",
//     category: "Personal",
//   };

//   const progress = (goal.saved / goal.target) * 100;
//   const navigate = useNavigate();

//   const handleNavigate = () => {
//     navigate("/goal");
//   };

//   return (
//     <>
//       {/* Back Button */}
//       <div className="mb-6">
//         <button
//           onClick={handleNavigate}
//           className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-gray-600
//           bg-[rgba(84,143,84,0.2)] hover:bg-[rgba(84,143,84,0.35)] text-white transition-all duration-200
//           hover:border-[#548f54] focus:outline-none focus:ring-2 focus:ring-[#548f54] focus:ring-offset-2 focus:ring-offset-[#1a1a2e]"
//         >
//           <IoIosArrowBack className="text-lg" />
//           <span className="font-medium">Back to Goals</span>
//         </button>
//       </div>

//       {/* Main Content Grid */}
//       <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[1200px] mx-auto">
//         {/* Left: Summary Card */}
//         <div className="bg-[rgba(255,255,255,0.05)] border border-gray-700 p-6 rounded-2xl shadow-lg backdrop-blur-md w-full lg:w-1/2 transition-all hover:shadow-xl hover:border-gray-600">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-lg font-semibold text-[#548f54] flex items-center gap-2">
//               <MdCheckCircle className="text-xl" />
//               Goal Summary
//             </h2>
//             <span className="text-xs font-medium text-gray-300 bg-[#2E2E48] px-3 py-1.5 rounded-full border border-gray-600">
//               {goal.category}
//             </span>
//           </div>

//           {/* Goal Details */}
//           <div className="space-y-4 mb-6">
//             {/* Goal Name */}
//             <div className="flex justify-between items-center pb-3 border-b border-gray-700">
//               <span className="text-gray-400 text-sm">Goal Name</span>
//               <span className="text-white font-semibold text-right">
//                 {goal.name}
//               </span>
//             </div>

//             {/* Target Amount */}
//             <div className="flex justify-between items-center pb-3 border-b border-gray-700">
//               <span className="text-gray-400 text-sm">Target Amount</span>
//               <span className="text-green-400 font-semibold">
//                 ₹{goal.target.toLocaleString()}
//               </span>
//             </div>

//             {/* Saved So Far */}
//             <div className="flex justify-between items-center pb-3 border-b border-gray-700">
//               <span className="text-gray-400 text-sm">Saved So Far</span>
//               <span className="text-blue-400 font-semibold">
//                 ₹{goal.saved.toLocaleString()}
//               </span>
//             </div>

//             {/* Remaining */}
//             <div className="flex justify-between items-center">
//               <span className="text-gray-400 text-sm">Remaining</span>
//               <span className="text-orange-400 font-semibold">
//                 ₹{(goal.target - goal.saved).toLocaleString()}
//               </span>
//             </div>
//           </div>

//           {/* Progress Section */}
//           <div className="bg-[rgba(84,143,84,0.1)] border border-[#548f54] border-opacity-30 rounded-lg p-4">
//             <div className="flex justify-between items-center mb-3">
//               <span className="text-gray-300 text-sm font-medium">
//                 Progress
//               </span>
//               <span className="text-sm font-bold text-[#548f54]">
//                 {progress.toFixed(1)}%
//               </span>
//             </div>
//             <div className="w-full bg-[#2E2E48] rounded-full h-3.5 overflow-hidden shadow-inner">
//               <div
//                 className="bg-gradient-to-r from-[#548f54] to-[#6ecf6e] h-3.5 rounded-full transition-all duration-700 shadow-lg"
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//             <div className="mt-2 flex justify-between text-xs text-gray-400">
//               <span>0</span>
//               <span>50%</span>
//               <span>100%</span>
//             </div>
//           </div>

//           {/* Timeline */}
//           <div className="mt-6 grid grid-cols-2 gap-4">
//             <div className="bg-[#2E2E48] rounded-lg p-3">
//               <span className="text-xs text-gray-500 block mb-1">
//                 Start Date
//               </span>
//               <span className="text-white font-semibold text-sm">
//                 {goal.startDate}
//               </span>
//             </div>
//             <div className="bg-[#2E2E48] rounded-lg p-3">
//               <span className="text-xs text-gray-500 block mb-1">
//                 Target Date
//               </span>
//               <span className="text-white font-semibold text-sm">
//                 {goal.targetDate}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Right: Bar Chart */}
//         <div className="bg-[rgba(255,255,255,0.05)] border border-gray-700 p-6 rounded-2xl shadow-lg backdrop-blur-md w-full lg:w-1/2 transition-all hover:shadow-xl hover:border-gray-600">
//           <h2 className="text-lg font-semibold mb-5 text-[#548f54] flex items-center gap-2">
//             <span className="text-xl">📊</span>
//             Monthly Savings Progress
//           </h2>
//           <div className="bg-[#2E2E48] rounded-lg p-4">
//             <ResponsiveContainer width="100%" height={240}>
//               <BarChart
//                 data={data}
//                 margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
//               >
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="#3E3E56"
//                   vertical={false}
//                 />
//                 <XAxis
//                   dataKey="month"
//                   stroke="#999"
//                   fontSize={12}
//                   style={{ fontWeight: "500" }}
//                 />
//                 <YAxis
//                   stroke="#999"
//                   fontSize={12}
//                   style={{ fontWeight: "500" }}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#252545",
//                     borderRadius: "10px",
//                     border: "1px solid #3E3E56",
//                     fontSize: "12px",
//                     padding: "8px",
//                   }}
//                   formatter={(value) => `₹${value.toLocaleString()}`}
//                   labelStyle={{ color: "#ffffff" }}
//                 />
//                 <Bar
//                   dataKey="saved"
//                   fill="rgba(84,143,84,0.85)"
//                   radius={[8, 8, 0, 0]}
//                   barSize={30}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Goal History Table */}
//       {/* <div className="mt-8">
//         <GoalHistoryTable />
//       </div> */}
//     </>
//   );
// }
