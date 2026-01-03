import { apiClient } from "../apiClient";
import { handleRequest } from "../requestHandler";

export type CreateGoalPayload = {
  goal_name: string;
  target_amount: number;
  deadline_date: Date;
  notes: string;
};

export interface UpdateGoalPayload extends CreateGoalPayload {
  id: string;
}

export type filter_body = {
  page: number;
  limit: number;
};

export const GoalApi = {
  createGoal: (body: CreateGoalPayload) =>
    handleRequest(apiClient.post("/api/goal/add", body)),
  findGoal: () => handleRequest(apiClient.get("/api/goal/find")),
  findOne: (id: string | null) =>
    handleRequest(apiClient.get(`/api/goal/get/${id}`)),
  updateGoal: (body: UpdateGoalPayload) =>
    handleRequest(apiClient.put(`/api/goal/update/${body?.id}`, body)),
  deleteGoal: (id: string) =>
    handleRequest(apiClient.delete(`/api/goal/delete/${id}`)),
  filterGoal: (body: filter_body) =>
    handleRequest(apiClient.post("/api/goal/filter", body)),
  ViewGoalHistory: (body: filter_body) =>
    handleRequest(apiClient.post("/api/goal/viewGoalHistory", body)),
};
