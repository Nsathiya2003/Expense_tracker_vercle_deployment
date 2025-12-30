import type { GoalData, GoalHistoryData, IncomeData } from "./types";

export type IncomeItem = {
  _id: string;
  category: string;
  income_amount: number;
  income_date: string;
  payment_receive_mode: string;
  notes: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  __v: number;
};

export interface GoalFilterResponse {
  status: boolean;
  message: string;
  data: GoalData[];
  pagination: {
    page: number;
    limit: number;
    totalRecords: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface GoalDataTypes {
  _id: string;
  goal_name: string;
  allocated_amount: number;
  target_amount: number;
}
export interface GoalHistoryFilterResponse {
  status: boolean;
  message: string;
  data: GoalHistoryData[];
  pagination: {
    page: number;
    limit: number;
    totalRecords: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface GoalIncomeFilterResponse {
  status: boolean;
  message: string;
  data: IncomeData[];
  pagination: {
    page: number;
    limit: number;
    totalRecords: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalIncomeAmount: number;
    totalGoalContribution: number;
  };
}

export interface DashboardSummaryCard {
  totalUsers: number;
  totalIncome: number;
  totalExpenses: number;
  totalBudgets: number;
  totalIncomeAmount: number;
  totalExpenseAmount: number;
  totalBudgetAmount: number;
}

export interface NotificationTypeResponse {
  status: boolean;
  message: string;
  data: NotificationItem[];
  pagination: {
    page: number;
    limit: number;
    totalRecords: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
export interface NotificationItem {
  _id: string;
  title: string;
  message: string;
  fullMessage: string;
  read: boolean;
  createdAt: string;
}
