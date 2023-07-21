"use client";

import Utils from "@/lib/Utils";
import { spaceMono } from "@/lib/fonts";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
  BarElement,
  ArcElement,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

import { Bar, Line, Scatter, Bubble, Doughnut, Pie } from "react-chartjs-2";

import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";

type ChartTypes = "line" | "bar" | "bubble" | "doughnut" | "pie" | "scatter";

export default function ChartComponent({
  data,
  options,
  type,
  isExample = false,
}: {
  data: ChartData;
  options: ChartOptions<ChartTypes>;
  type: ChartTypes;
  isExample?: boolean;
}) {
  if (!isExample) {
    const width = 1000;
    const height = 400;
    switch (type) {
      case "line":
        return (
          <Line
            data={data as ChartData<"line">}
            width={width}
            height={height}
            options={options}
          />
        );
      case "bar":
        return (
          <Bar
            data={data as ChartData<"bar">}
            height={height}
            width={width}
            options={options}
          />
        );
      case "bubble":
        return (
          <Bubble
            data={data as ChartData<"bubble">}
            height={height}
            width={width}
            options={options}
          />
        );
      case "doughnut":
        return (
          <Doughnut
            data={data as ChartData<"doughnut">}
            height={height}
            width={width}
            options={options}
          />
        );
      case "pie":
        return (
          <Pie
            data={data as ChartData<"pie">}
            height={height}
            width={width}
            options={options}
          />
        );
      case "scatter":
        return (
          <Scatter
            data={data as ChartData<"scatter">}
            height={height}
            width={width}
            options={options}
          />
        );

      default:
        return (
          <Line
            data={data as ChartData<"line">}
            width={1000}
            height={height}
            options={options}
          />
        );
    }
  } else {
    const width = 1000;
    const height = 400;
    switch (type) {
      case "line":
        return (
          <>
            <Line
              data={data as ChartData<"line">}
              width={width}
              height={height}
              options={options}
            />
            <button
              className={`p-3 bg-[#f4f4f5] rounded-xl hover:border-[#bed7f1] hover:border-[2px] hover:bg-[#e0ecf8] border-[#f4f4f5]  ${spaceMono.className}`}
              onClick={(event) => {
                const button = event.currentTarget as HTMLButtonElement;
                const parentElement = button.parentElement;
                const canvasElement = parentElement
                  ?.getElementsByTagName("canvas")
                  .item(0);
                canvasElement?.remove();
                data.datasets.map((set) => {
                  set.data = Utils.numbers({ count: 200, min: 0, max: 100 });
                  return set;
                });
                const newCanvas = (
                  <Line
                    data={data as ChartData<"line">}
                    height={height}
                    width={width}
                    options={options}
                  />
                );

                if (!parentElement) return;
                const root = createRoot(parentElement);
                flushSync(() => {
                  root.render(newCanvas);
                });
                parentElement.appendChild(button);
              }}
            >
              Change Data
            </button>
          </>
        );
      case "bar":
        return (
          <>
            <Bar
              data={data as ChartData<"bar">}
              height={height}
              width={width}
              options={options}
            />
            <button
              className={`p-3 bg-[#f4f4f5] rounded-xl hover:border-[#bed7f1] hover:border-[2px] hover:bg-[#e0ecf8] border-[#f4f4f5]  ${spaceMono.className}`}
              onClick={(event) => {
                const button = event.currentTarget as HTMLButtonElement;
                const parentElement = button.parentElement;
                const canvasElement = parentElement
                  ?.getElementsByTagName("canvas")
                  .item(0);
                canvasElement?.remove();
                data.datasets.map((set) => {
                  set.data = Utils.numbers({ count: 200, min: 0, max: 100 });
                  return set;
                });
                const newCanvas = (
                  <Bar
                    data={data as ChartData<"bar">}
                    height={height}
                    width={width}
                    options={options}
                  />
                );

                if (!parentElement) return;
                const root = createRoot(parentElement);
                flushSync(() => {
                  root.render(newCanvas);
                });
                parentElement.appendChild(button);
              }}
            >
              Change Data
            </button>
          </>
        );
      case "bubble":
        return (
          <>
            <Bubble
              data={data as ChartData<"bubble">}
              height={height}
              width={width}
              options={options}
            />{" "}
            <button
              className={`p-3 bg-[#f4f4f5] rounded-xl hover:border-[#bed7f1] hover:border-[2px] hover:bg-[#e0ecf8] border-[#f4f4f5]  ${spaceMono.className}`}
              onClick={(event) => {
                const button = event.currentTarget as HTMLButtonElement;
                const parentElement = button.parentElement;
                const canvasElement = parentElement
                  ?.getElementsByTagName("canvas")
                  .item(0);
                canvasElement?.remove();
                data.datasets.map((set) => {
                  set.data = Utils.bubbles({ count: 200, min: 0, max: 100 });
                  return set;
                });
                const newCanvas = (
                  <Bubble
                    data={data as ChartData<"bubble">}
                    height={height}
                    width={width}
                    options={options}
                  />
                );

                if (!parentElement) return;
                const root = createRoot(parentElement);
                flushSync(() => {
                  root.render(newCanvas);
                });
                parentElement.appendChild(button);
              }}
            >
              Change Data
            </button>
          </>
        );
      case "doughnut":
        return (
          <>
            <Doughnut
              data={data as ChartData<"doughnut">}
              height={height}
              width={width}
              options={options}
            />{" "}
            <button
              className={`p-3 bg-[#f4f4f5] rounded-xl hover:border-[#bed7f1] hover:border-[2px] hover:bg-[#e0ecf8] border-[#f4f4f5]  ${spaceMono.className}`}
              onClick={(event) => {
                const button = event.currentTarget as HTMLButtonElement;
                const parentElement = button.parentElement;
                const canvasElement = parentElement
                  ?.getElementsByTagName("canvas")
                  .item(0);
                canvasElement?.remove();
                data.datasets.map((set) => {
                  set.data = Utils.numbers({ count: 200, min: 0, max: 100 });
                  return set;
                });
                const newCanvas = (
                  <Doughnut
                    data={data as ChartData<"doughnut">}
                    height={height}
                    width={width}
                    options={options}
                  />
                );

                if (!parentElement) return;
                const root = createRoot(parentElement);
                flushSync(() => {
                  root.render(newCanvas);
                });
                parentElement.appendChild(button);
              }}
            >
              Change Data
            </button>
          </>
        );
      case "pie":
        return (
          <>
            <Pie
              data={data as ChartData<"pie">}
              height={height}
              width={width}
              options={options}
            />{" "}
            <button
              className={`p-3 bg-[#f4f4f5] rounded-xl hover:border-[#bed7f1] hover:border-[2px] hover:bg-[#e0ecf8] border-[#f4f4f5]  ${spaceMono.className}`}
              onClick={(event) => {
                const button = event.currentTarget as HTMLButtonElement;
                const parentElement = button.parentElement;
                const canvasElement = parentElement
                  ?.getElementsByTagName("canvas")
                  .item(0);
                canvasElement?.remove();
                data.datasets.map((set) => {
                  set.data = Utils.numbers({ count: 200, min: 0, max: 100 });
                  return set;
                });
                const newCanvas = (
                  <Pie
                    data={data as ChartData<"pie">}
                    height={height}
                    width={width}
                    options={options}
                  />
                );

                if (!parentElement) return;
                const root = createRoot(parentElement);
                flushSync(() => {
                  root.render(newCanvas);
                });
                parentElement.appendChild(button);
              }}
            >
              Change Data
            </button>
          </>
        );
      case "scatter":
        return (
          <>
            <Scatter
              data={data as ChartData<"scatter">}
              height={height}
              width={width}
              options={options}
            />{" "}
            <button
              className={`p-3 bg-[#f4f4f5] rounded-xl hover:border-[#bed7f1] hover:border-[2px] hover:bg-[#e0ecf8] border-[#f4f4f5]  ${spaceMono.className}`}
              onClick={(event) => {
                const button = event.currentTarget as HTMLButtonElement;
                const parentElement = button.parentElement;
                const canvasElement = parentElement
                  ?.getElementsByTagName("canvas")
                  .item(0);
                canvasElement?.remove();
                data.datasets.map((set) => {
                  set.data = Utils.bubbles({ count: 200, min: 0, max: 100 });
                  return set;
                });
                const newCanvas = (
                  <Scatter
                    data={data as ChartData<"scatter">}
                    height={height}
                    width={width}
                    options={options}
                  />
                );

                if (!parentElement) return;
                const root = createRoot(parentElement);
                flushSync(() => {
                  root.render(newCanvas);
                });
                parentElement.appendChild(button);
              }}
            >
              Change Data
            </button>
          </>
        );

      default:
        return (
          <>
            <Line
              data={data as ChartData<"line">}
              width={1000}
              height={height}
              options={options}
            />{" "}
            <button
              className={`p-3 bg-[#f4f4f5] rounded-xl hover:border-[#bed7f1] hover:border-[2px] hover:bg-[#e0ecf8] border-[#f4f4f5]  ${spaceMono.className}`}
              onClick={(event) => {
                const button = event.currentTarget as HTMLButtonElement;
                const parentElement = button.parentElement;
                const canvasElement = parentElement
                  ?.getElementsByTagName("canvas")
                  .item(0);
                canvasElement?.remove();
                data.datasets.map((set) => {
                  set.data = Utils.numbers({ count: 200, min: 0, max: 100 });
                  return set;
                });
                const newCanvas = (
                  <Line
                    data={data as ChartData<"line">}
                    height={height}
                    width={width}
                    options={options}
                  />
                );

                if (!parentElement) return;
                const root = createRoot(parentElement);
                flushSync(() => {
                  root.render(newCanvas);
                });
                parentElement.appendChild(button);
              }}
            >
              Change Data
            </button>
          </>
        );
    }
  }
}
