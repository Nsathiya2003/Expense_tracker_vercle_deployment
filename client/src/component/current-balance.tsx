import { IoWalletOutline } from "react-icons/io5";
import { useMemo } from "react";
import { useGetIncome, useIncomeBalance } from "../api/income/income-hooks";
import { useGetExpense } from "../api/expense/expense-hooks";

export default function CurrentBalanceCards() {
  const { data: incomeData } = useGetIncome();
  const { data: expenseData } = useGetExpense();
  const { data: incomeBalanceData } = useIncomeBalance();

  const totalIncome = useMemo(() => {
    if (!incomeData?.data) return 0;
    return incomeData.data.reduce(
      (sum: number, item: { income_amount?: number }) =>
        sum + (item.income_amount || 0),
      0
    );
  }, [incomeData?.data]);

  const totalExpense = useMemo(() => {
    if (!expenseData?.data) return 0;
    return expenseData.data.reduce(
      (sum: number, item: { expense_amount?: number }) =>
        sum + (item.expense_amount || 0),
      0
    );
  }, [expenseData?.data]);

  const currentBalance = totalIncome - totalExpense;

  const getBalanceColor = () => {
    if (currentBalance >= totalIncome * 0.5) return "text-green-400";
    if (currentBalance >= 0) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5 px-4 sm:px-6">
      {/* Current Balance */}
      <div className="rounded-xl p-3 flex flex-col gap-1 bg-blue-500/10 border border-blue-400/30">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-blue-300">Current Balance</p>
          <IoWalletOutline className="text-blue-400 text-sm" />
        </div>
        <p
          className={`text-lg font-bold text-white leading-tight ${getBalanceColor()}`}
        >
          ₹{incomeBalanceData?.data?.balanceAmount || 0}
        </p>
        <p className="text-gray-400 text-xs mt-1">
          {currentBalance >= 0 ? "✓ Balance Available" : "⚠ Balance Low"}
        </p>
      </div>

      {/* Total Income */}
      <div className="rounded-xl p-3 flex flex-col gap-1 bg-green-500/10 border border-green-400/30">
        <p className="text-xs font-medium text-green-300">Total Income</p>
        <p className="text-lg font-bold text-white">
          ₹{incomeBalanceData?.data?.totalIncome || 0}
        </p>
        <p className="text-gray-400 text-xs mt-1">All recorded income</p>
      </div>

      {/* Total Expenses */}
      <div className="col-span-2 sm:col-span-1 rounded-xl p-3 flex flex-col gap-1 bg-red-500/10 border border-red-400/30">
        <p className="text-xs font-medium text-red-300">Total Expenses</p>
        <p className="text-lg font-bold text-white">
          ₹{incomeBalanceData?.data?.totalExpense || 0}
        </p>
        <p className="text-gray-400 text-xs mt-1">All recorded expenses</p>
      </div>
    </div>
  );
}
