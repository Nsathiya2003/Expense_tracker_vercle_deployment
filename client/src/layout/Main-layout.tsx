// import { Outlet } from "react-router-dom";
// import Header from "./Header/Header";
// import SideBar from "./Sidebar";
// import { MobileHeader } from "./Header/MobileHeader";

// export default function MainLayout() {
//   return (
//     <div className="flex min-h-screen bg-gray-900 text-white">
//       {/* Sidebar (desktop only for now) */}
//       <div className="hidden md:block">
//         <SideBar />
//       </div>

//       {/* Main Content */}
//       <div className="flex flex-col flex-1 min-h-screen">
//         <div className="block md:hidden">
//           <MobileHeader />
//         </div>

//         <div className="hidden md:block">
//           <Header />
//         </div>

//         <main className="flex-1 p-6 overflow-y-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import SideBar from "./Sidebar";
import { MobileHeader } from "./Header/MobileHeader";
import { useAppContext } from "../context/AppContext";

export default function MainLayout() {
  const { open, setOpen } = useAppContext();

  return (
    // <div className="flex min-h-screen bg-gray-900 text-white">
    //   {/* ================= DESKTOP SIDEBAR ================= */}
    //   <div className="hidden md:block">
    //     <SideBar />
    //   </div>

    //   {/* ================= MOBILE SIDEBAR ================= */}
    //   <div
    //     className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300
    //     ${
    //       open
    //         ? "opacity-100 pointer-events-auto"
    //         : "opacity-0 pointer-events-none"
    //     }`}
    //   >
    //     {/* Backdrop */}
    //     <div
    //       className="absolute inset-0 bg-black/50"
    //       onClick={() => setOpen(false)}
    //     />

    //     {/* Sidebar panel */}
    //     <div
    //       className={`absolute left-0 top-0 h-full w-72 bg-[#548f54]
    //       transform transition-transform duration-300 ease-in-out lg:h-full
    //       ${open ? "translate-x-0" : "-translate-x-full"}`}
    //     >
    //       <SideBar />
    //     </div>
    //   </div>

    //   {/* ================= MAIN CONTENT ================= */}
    //   <div className="flex flex-col flex-1 min-h-screen">
    //     {/* Mobile Header */}
    //     <div className="md:hidden">
    //       <MobileHeader />
    //     </div>

    //     {/* Desktop Header */}
    //     <div className="hidden md:block">
    //       <Header />
    //     </div>

    //     <main className="flex-1 p-6 overflow-y-auto mt-4">
    //       <Outlet />
    //     </main>
    //   </div>
    // </div>
    <div className="flex min-h-[100dvh] w-full bg-gray-900 text-white overflow-hidden">
      {/* ================= DESKTOP + TABLET SIDEBAR ================= */}
      <div className="hidden md:block fixed left-0 top-0 h-[100dvh] w-72 z-30 bg-[#548f54]">
        <SideBar />
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300
      ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }
    `}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setOpen(false)}
        />

        {/* Sidebar panel */}
        <div
          className={`absolute left-0 top-0 h-[100dvh] w-72 bg-[#548f54]
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
        >
          <SideBar />
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex flex-col flex-1 min-h-[100dvh] md:ml-72 bg-gray-900">
        {/* Mobile Header */}
        <div className="md:hidden">
          <MobileHeader />
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block">
          <Header />
        </div>

        <main className="flex-1 p-6 overflow-y-auto bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
