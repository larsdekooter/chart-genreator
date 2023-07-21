import { ChartData, ChartOptions } from "chart.js";

export type PartialChartData = Partial<ChartData>;
export type PartialChartOptions = Partial<ChartOptions>;
export type ChartType =
  | "line"
  | "bar"
  | "bubble"
  | "doughnut"
  | "pie"
  | "scatter";
