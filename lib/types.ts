import { ChartData, ChartOptions } from "chart.js";

export type PartialChartData = ChartData;
export type PartialChartOptions = Partial<ChartOptions>;

export type ChartType =
  | "line"
  | "bar"
  | "bubble"
  | "doughnut"
  | "pie"
  | "scatter";

export type PartialOtherChartData = Partial<{ fill: boolean }>;
