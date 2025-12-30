import {
  FaCommentDollar,
  FaChartLine,
  FaCog,
  FaMoneyBillWave,
} from "react-icons/fa";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";
import { MdDashboard } from "react-icons/md";

export const SidebarItems = [
  {
    label: "Dashboard",
    title: "Dashboard",
    icon: MdDashboard,
    routes: "/dashboard",
    description: "Manage all our expenses and incomes",
  },
  {
    label: "Transaction",
    title: "Transaction",
    icon: FaCommentDollar,
    routes: "/transaction/income",
    description: "Manage transactions (both expense and income)",
    subItems: [
      {
        label: "Income",
        title: "Income",
        icon: GiReceiveMoney,
        routes: "/transaction/income",
        description: "Income data management",
      },
      {
        label: "Expense",
        title: "Expense",
        icon: GiPayMoney,
        routes: "/transaction/expense",
        description: "Expense data management",
      },
      {
        label: "Budget",
        title: "Budget",
        icon: FaMoneyBillWave,
        routes: "/transaction/budget",
        description: "Budget data management",
      },
    ],
  },
  {
    label: "Saving Goals",
    title: "Saving Goals",
    icon: FaChartLine,
    routes: "/goal",
    description: "View goal",
  },
  {
    label: "Profile Setting",
    title: "Profile Setting",
    icon: FaCog,
    routes: "/profile-setting",
    description: "Manage application settings",
  },
  {
    label: "Notifications",
    title: "Notifications",
    icon: IoIosNotifications,
    routes: "/notification",
    description: "Manage application notification",
  },
  // {
  //   label: "Logout",
  //   title: "Logout",
  //   icon: IoIosLogOut,
  //   routes: "/",
  //   description: "Logout",
  // },
];
