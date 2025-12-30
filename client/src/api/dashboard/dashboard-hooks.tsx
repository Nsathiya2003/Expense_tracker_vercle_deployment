import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "./dashboardApi";

export const useDashboardSummaryCards = () => {
  return useQuery({
    queryKey: ["dashboardSummaryCards"],
    queryFn: () => dashboardApi.getDashboardSummaryCards(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useMonthlyExpenseIncome = () => {
  return useQuery({
    queryKey: ["monthlyExpenseIncome"],
    queryFn: () => dashboardApi.monthlyExpenseIncome(),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

export const useSpendHistory = () => {
  return useQuery({
    queryKey: ["spendHistory"],
    queryFn: () => dashboardApi.spendHistory(),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
