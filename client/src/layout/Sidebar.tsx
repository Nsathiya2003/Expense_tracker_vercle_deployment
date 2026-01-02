import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { SidebarItems } from "../data/Sidebar-items";
import logo from "../assets/images.jpg";
import { useAppContext } from "../context/AppContext";

export default function SideBar() {
  const { setOpen } = useAppContext();
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

  return (
    <aside
      className="
      fixed md:static
      top-0 left-0
      h-[100dvh] md:h-screen
      w-72
      bg-transparent
      p-4 pt-6
      overflow-y-auto
    "
    >
      {/* ===== Brand ===== */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <img
          src={logo}
          alt="Expense Tracker"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex flex-col justify-center">
          <span className="text-base font-semibold text-white/95 tracking-wide">
            Expense Tracker
          </span>
          <span className="mt-0.5 text-[11px] text-white/60 tracking-wide">
            Save smart. Spend wiser.
          </span>
        </div>
      </div>

      {/* ===== Menu ===== */}
      <div className="mt-10 text-white text-base font-medium pl-1">
        {SidebarItems.map((item, index) => {
          const Icon = item.icon;
          const hasSubItems = !!item.subItems;

          return (
            <div key={index}>
              <NavLink
                to={item.routes}
                onClick={() => {
                  if (hasSubItems) {
                    setOpenSubMenu(openSubMenu === index ? null : index);
                  } else {
                    setOpen(false);
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 mt-3 rounded-lg transition-colors
                ${
                  isActive
                    ? "bg-[#72c072] text-black font-semibold"
                    : "hover:bg-[#415941]"
                }`
                }
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Label */}
                <span className="flex-1">{item.label}</span>

                {/* Arrow */}
                {hasSubItems && (
                  <MdKeyboardArrowDown
                    className={`transition-transform ${
                      openSubMenu === index ? "rotate-180" : ""
                    }`}
                  />
                )}
              </NavLink>

              {/* ===== Sub Menu ===== */}
              {hasSubItems && openSubMenu === index && (
                <ul className="ml-10 mt-1 space-y-1">
                  {item.subItems.map((sub, subIndex) => {
                    const SubIcon = sub.icon;
                    return (
                      <NavLink
                        key={subIndex}
                        to={sub.routes}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
                        ${
                          isActive
                            ? "bg-[#72c072] text-black font-semibold"
                            : "hover:bg-[#4b664b]"
                        }`
                        }
                      >
                        <SubIcon className="w-6 h-6 text-white" />
                        <span>{sub.label}</span>
                      </NavLink>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
