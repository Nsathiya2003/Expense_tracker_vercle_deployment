import { apiClient } from "../apiClient";
import { handleRequest } from "../requestHandler";

export interface CreateBudgetPayload {
  budget_category: string;
  budget_amount: number;
  notes: string;
  // budget_month: string;
  budget_start_date: Date;
  budget_end_date: Date;
  need_notification: boolean;
  budget_exceeded: boolean;
  budget_reaches: boolean;
  reach_percentage?: number;
}

export interface filterBudgetPayload {
  page: number;
  limit: number;
  search?: string;
  fromDate?: string;
  toDate?: string;
}

export interface updateBudgetPayload extends CreateBudgetPayload {
  id: string;
}
export const budgetApi = {
  createBudget: (body: CreateBudgetPayload) =>
    handleRequest(apiClient.post("/budget/create", body)),
  getBudgets: () => handleRequest(apiClient.get("/budget/find")),
  getBudgetById: (id: string | null) =>
    handleRequest(apiClient.get(`/budget/get/${id}`)),
  updateBudget: (body: updateBudgetPayload, id: string | null) =>
    handleRequest(apiClient.put(`/budget/update/${id}`, body)),
  deleteBudget: (id: string) =>
    handleRequest(apiClient.delete(`/budget/delete/${id}`)),
  filterBudget: (body: filterBudgetPayload) =>
    handleRequest(apiClient.post("/budget/filter", body)),
};
