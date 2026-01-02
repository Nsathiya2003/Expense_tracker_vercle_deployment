import { apiClient } from "../apiClient";
import { handleRequest } from "../requestHandler";

export const dashboardApi = {
  getDashboardSummaryCards: () =>
    handleRequest(apiClient.get("dashboard/summaryCards")),
  monthlyExpenseIncome: () =>
    handleRequest(apiClient.get("dashboard/monthlyExpenseIncome")),
  spendHistory: () => handleRequest(apiClient.get("dashboard/spend-history")),
};
