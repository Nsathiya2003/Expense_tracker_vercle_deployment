import { apiClient } from "../apiClient";
import { handleRequest } from "../requestHandler";

export interface CreateExpensePayload {
  expense_category: string;
  expense_amount: number;
  expense_date: Date;
  payment_mode: string;
  notes: string;
  budget_category?: string; // e.g., 'Essential', 'Non-Essential', 'Savings'
  is_recurring?: boolean;
  tags?: string[]; // e.g., 'work', 'personal', 'urgent'
}

export interface filterExpensePayload {
  page: number;
  limit: number;
  search?: string;
  fromDate?: string;
  toDate?: string;
}

export interface CheckBudgetLimitPayload {
  expense_amount: number;
  category: string;
  expense_date: Date;
}

export const expenseApi = {
  createExpense: (body: CreateExpensePayload) =>
    handleRequest(apiClient.post("/expense/create", body)),
  getExpense: () => handleRequest(apiClient.get("/expense/find")),
  getExpenseById: (id: string | null) =>
    handleRequest(apiClient.get(`/expense/get/${id}`)),
  updateExpense: (body: CreateExpensePayload, id: string | null) =>
    handleRequest(apiClient.put(`/expense/update/${id}`, body)),
  deleteExpense: (id: string) =>
    handleRequest(apiClient.delete(`/expense/delete/${id}`)),
  useFilterExpense: (body: filterExpensePayload) =>
    handleRequest(apiClient.post("/expense/filter", body)),
  checkBudgetLimit: (body: CheckBudgetLimitPayload) =>
    handleRequest(apiClient.post("/expense/checkBudgetLimit", body)),
};
