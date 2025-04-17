// Type definitions for all our data models

export interface DriversData {
  Category: string;
  Driver: string;
  'Apr-25': string | number;
  'May-25': string | number;
  'Jun-25': string | number;
  'Jul-25': string | number;
  'Aug-25': string | number;
  'Sep-25': string | number;
  'Oct-25': string | number;
  'Nov-25': string | number;
  'Dec-25': string | number;
  Notes: string;
  [key: string]: any;
}

export interface RevModelData {
  Revenue_Stream: string;
  Formula: string;
  'Apr-25': string | number;
  'May-25': string | number;
  'Jun-25': string | number;
  'Jul-25': string | number;
  'Aug-25': string | number;
  'Sep-25': string | number;
  'Oct-25': string | number;
  'Nov-25': string | number;
  'Dec-25': string | number;
  Notes: string;
  [key: string]: any;
}

export interface CostModelData {
  Expense_Category: string;
  Type: string;
  'Apr-25': string | number;
  'May-25': string | number;
  'Jun-25': string | number;
  'Jul-25': string | number;
  'Aug-25': string | number;
  'Sep-25': string | number;
  'Oct-25': string | number;
  'Nov-25': string | number;
  'Dec-25': string | number;
  Notes: string;
  [key: string]: any;
}

export interface ForecastData {
  Metric: string;
  Formula: string;
  'Apr-25': string | number;
  'May-25': string | number;
  'Jun-25': string | number;
  'Jul-25': string | number;
  'Aug-25': string | number;
  'Sep-25': string | number;
  'Oct-25': string | number;
  'Nov-25': string | number;
  'Dec-25': string | number;
  Notes: string;
  [key: string]: any;
}

export interface ScenariosData {
  Parameter: string;
  Base_Case: string | number;
  Optimistic: string | number;
  Conservative: string | number;
  Current: string;
  Notes: string;
  [key: string]: any;
}

export interface TargetsData {
  Metric: string;
  Target: string | number;
  Warning_Threshold: string | number;
  Critical_Threshold: string | number;
  Notes: string;
  [key: string]: any;
}

export interface MonthData {
  month: string;
  revenue: number;
  expenses: number;
  cashBalance: number;
  runway: number;
  target: number;
  burnMultiple?: number;
  gap?: number;
}

export interface RevenueStreamData {
  name: string;
  'Apr-25': number;
  'May-25': number;
  'Jun-25': number;
  'Jul-25': number;
  'Aug-25': number;
  'Sep-25': number;
  'Oct-25': number;
  'Nov-25': number;
  'Dec-25': number;
  [key: string]: any;
}

export interface ProgramData {
  name: string;
  margin: number;
  target: number;
}

export const months = ['Apr-25', 'May-25', 'Jun-25', 'Jul-25', 'Aug-25', 'Sep-25', 'Oct-25', 'Nov-25', 'Dec-25'];
