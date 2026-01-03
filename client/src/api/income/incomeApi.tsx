import { apiClient } from "../apiClient";
import { handleRequest } from "../requestHandler";

export interface CreateIncomePayload {
  income_category: string;
  income_amount: number;
  income_date: Date;
  payment_receive_mode: string;
  notes: string;
  saving_contribution: boolean;
  goal_id: string | null;
  goal_contribute_amount: number;
}

export interface filterIncomePayload {
  page: number;
  limit: number;
}

export const incomeApi = {
  createIncome: (body: CreateIncomePayload) =>
    handleRequest(apiClient.post("/api/income/create", body)),
  getIncome: () => handleRequest(apiClient.get("/api/income/find")),
  getIncomeById: (id: string | null) =>
    handleRequest(apiClient.get(`/api/income/get/${id}`)),
  updateIncome: (body: CreateIncomePayload, id: string | null) =>
    handleRequest(apiClient.put(`/api/income/update/${id}`, body)),
  deleteIncome: (id: string) =>
    handleRequest(apiClient.delete(`/api/income/delete/${id}`)),
  useFilterIncome: (body: filterIncomePayload) =>
    handleRequest(apiClient.post("/api/income/filter", body)),
  getIncomeBalance: () =>
    handleRequest(apiClient.get("/api/income/incomeBalance/total")),
};
