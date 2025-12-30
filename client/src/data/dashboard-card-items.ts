import { FaMoneyBillWave, FaWallet, FaPiggyBank } from "react-icons/fa";

export const CardItems = [
  {
    key: "income",
    label: "Income",
    description: "Total income received",
    icon: FaMoneyBillWave,
    color: "#00C8DC",
  },
  {
    key: "expense",
    label: "Expense",
    description: "Total expenses spent",
    icon: FaWallet,
    color: "#FF6B6B",
  },
  {
    key: "budget",
    label: "Budget",
    description: "Total planned budget",
    icon: FaPiggyBank,
    color: "#4ADE80",
  },
];
