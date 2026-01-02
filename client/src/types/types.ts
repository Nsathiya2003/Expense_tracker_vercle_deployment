import type { ReactNode } from "react";

//user registration
export interface FormData {
  username: string;
  mobileNumber: string;
  emailId: string;
  password: string;
  lastName: string;
}

//user login
export interface LoginData {
  emailId: string;
  password: string;
}
export interface MainLayoutProps {
  children: ReactNode; // tells TS that children can be any valid React elements
}

export interface AppContextType {
  open: boolean;
  setOpen: (value: boolean) => void;
  // errorMsg: any;
  // setErrorMsg: (value: any) => void;
  data: {
    username: string;
  };
  previewUrl: string | null;
}

export interface FilterAttributes {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export interface IncomeData {
  income_category: string;
  income_amount: number;
  income_date: Date;
  payment_mode: string;
  notes: string;
  saving_contribution: boolean;
  goal_contribute_amount: number;
  _id: string;
  payment_receive_mode: string;
  goal_id: {
    goal_name: string;
  };
  current_income_amount: number;
}

export interface GoalData {
  goal_name: string;
  target_amount: number;
  deadline_date: Date;
  notes: string;
  _id: string;
  status: string;
  allocated_amount: number;
}

export interface GoalHistoryData {
  id: string;
  goal_id: {
    goal_name: string;
    target_amount: string;
    allocated_amount: number;
    deadline_date: Date;
  };
  allocated_amount: number;
  income_type: string;
  createdAt: Date;
}

export interface BudgetData {
  budget_category: string;
  budget_amount: number;
  budget_month: string;
  budget_start_date: Date;
  budget_end_date: Date;
  notes: string;
  need_Notification: boolean;
  budget_exceeded: boolean;
  budget_reaches: boolean;
  reach_percentage: string;
  _id: string;
}
