import { apiClient } from "../apiClient";
import { handleRequest } from "../requestHandler";

export const dashboardApi = {
  getDashboardSummaryCards: () =>
    handleRequest(apiClient.get("/api/dashboard/summaryCards")),
  monthlyExpenseIncome: () =>
    handleRequest(apiClient.get("/api/dashboard/monthlyExpenseIncome")),
  spendHistory: () => handleRequest(apiClient.get("/api/dashboard/spend-history")),
};
