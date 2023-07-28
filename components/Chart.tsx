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
  RadialLinearScale,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Title,
  Tooltip,
  Legend
);

import {
  Bar,
  Line,
  Scatter,
  Bubble,
  Doughnut,
  Pie,
  PolarArea,
  Radar,
} from "react-chartjs-2";

import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";

type ChartTypes =
  | "line"
  | "bar"
  | "bubble"
  | "doughnut"
  | "pie"
  | "scatter"
  | "polarArea"
  | "radar";

export default function ChartComponent({
  data,
  options,
  type,
  isExample = false,
  id,
}: {
  data: ChartData;
  options: ChartOptions<ChartTypes>;
  type: ChartTypes;
  isExample?: boolean;
  id: string;
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
            options={options as ChartOptions<"line">}
            id={id}
          />
        );
      case "bar":
        return (
          <Bar
            data={data as ChartData<"bar">}
            height={height}
            width={width}
            options={options as ChartOptions<"bar">}
            id={id}
          />
        );
      case "bubble":
        return (
          <Bubble
            data={data as ChartData<"bubble">}
            height={height}
            width={width}
            options={options as ChartOptions<"bubble">}
            id={id}
          />
        );
      case "doughnut":
        return (
          <Doughnut
            data={data as ChartData<"doughnut">}
            height={height}
            width={width}
            options={options as ChartOptions<"doughnut">}
            id={id}
          />
        );
      case "pie":
        return (
          <Pie
            data={data as ChartData<"pie">}
            height={height}
            width={width}
            options={options as ChartOptions<"pie">}
            id={id}
          />
        );
      case "scatter":
        return (
          <Scatter
            data={data as ChartData<"scatter">}
            height={height}
            width={width}
            options={options as ChartOptions<"scatter">}
            id={id}
          />
        );
      case "polarArea":
        return (
          <PolarArea
            data={data as ChartData<"polarArea">}
            height={height}
            width={width}
            options={options as ChartOptions<"polarArea">}
            id={id}
            className="bg-white"
          />
        );
      case "radar":
        return (
          <Radar
            data={data as ChartData<"radar">}
            height={height}
            width={width}
            options={options as ChartOptions<"radar">}
            id={id}
            className="bg-white"
          />
        );
      default:
        return (
          <Line
            data={data as ChartData<"line">}
            width={1000}
            height={height}
            options={options as ChartOptions<"line">}
            id={id}
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
              options={options as ChartOptions<"line">}
              id={id}
            />
            <button
              className={`p-3 bg-[#f4f4f5] rounded-xl hover:border-[#bed7f1] border-[2px] hover:bg-[#e0ecf8] border-[#f4f4f5]  ${spaceMono.className} dark:bg-[#242222] dark:border-[#242222] dark:text-white dark:hover:border-[blue]`}
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
                    options={options as ChartOptions<"line">}
                    id={id}
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
              options={options as ChartOptions<"bar">}
              id={id}
            />
            <button
              className={`p-3 bg-[#f4f4f5] rounded-xl hover:border-[#bed7f1] border-[2px] hover:bg-[#e0ecf8] border-[#f4f4f5]  ${spaceMono.className} dark:bg-[#242222] dark:border-[#242222] dark:text-white dark:hover:border-[blue]`}
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
                    options={options as ChartOptions<"bar">}
                    id={id}
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
              options={options as ChartOptions<"bubble">}
              id={id}
            />{" "}
            <button
              className={`p-3 bg-[#f4f4f5] rounded-xl hover:border-[#bed7f1] border-[2px] hover:bg-[#e0ecf8] border-[#f4f4f5]  ${spaceMono.className} dark:bg-[#242222] dark:border-[#242222] dark:text-white dark:hover:border-[blue]`}
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
                    options={options as ChartOptions<"bubble">}
                    id={id}
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
              options={options as ChartOptions<"doughnut">}
              id={id}
            />{" "}
            <button
              className={`p-3 bg-[#f4f4f5] rounded-xl hover:border-[#bed7f1] border-[2px] hover:bg-[#e0ecf8] border-[#f4f4f5]  ${spaceMono.className} dark:bg-[#242222] dark:border-[#242222] dark:text-white dark:hover:border-[blue]`}
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
                    options={options as ChartOptions<"doughnut">}
                    id={id}
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
              options={options as ChartOptions<"pie">}
              id={id}
            />{" "}
            <button
              className={`p-3 bg-[#f4f4f5] rounded-xl hover:border-[#bed7f1] border-[2px] hover:bg-[#e0ecf8] border-[#f4f4f5]  ${spaceMono.className} dark:bg-[#242222] dark:border-[#242222] dark:text-white dark:hover:border-[blue]`}
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
                    options={options as ChartOptions<"pie">}
                    id={id}
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
              options={options as ChartOptions<"scatter">}
              id={id}
            />{" "}
            <button
              className={`p-3 bg-[#f4f4f5] rounded-xl hover:border-[#bed7f1] border-[2px] hover:bg-[#e0ecf8] border-[#f4f4f5]  ${spaceMono.className} dark:bg-[#242222] dark:border-[#242222] dark:text-white dark:hover:border-[blue]`}
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
                    options={options as ChartOptions<"scatter">}
                    id={id}
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
      case "polarArea": {
        return (
          <>
            <PolarArea
              data={data as ChartData<"polarArea">}
              width={width}
              height={height}
              options={options as ChartOptions<"polarArea">}
              id={id}
              className="bg-white"
            />
            <button
              className={`p-3 bg-[#f4f4f5] rounded-xl hover:border-[#bed7f1] border-[2px] hover:bg-[#e0ecf8] border-[#f4f4f5]  ${spaceMono.className} dark:bg-[#242222] dark:border-[#242222] dark:text-white dark:hover:border-[blue]`}
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
                  <PolarArea
                    data={data as ChartData<"polarArea">}
                    height={height}
                    width={width}
                    options={options as ChartOptions<"polarArea">}
                    id={id}
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
      case "radar":
        return (
          <>
            <Radar
              data={data as ChartData<"radar">}
              width={width}
              height={height}
              options={options as ChartOptions<"radar">}
              id={id}
              className="bg-white"
            />
            <button
              className={`p-3 bg-[#f4f4f5] rounded-xl hover:border-[#bed7f1] border-[2px] hover:bg-[#e0ecf8] border-[#f4f4f5]  ${spaceMono.className} dark:bg-[#242222] dark:border-[#242222] dark:text-white dark:hover:border-[blue]`}
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
                  <Radar
                    data={data as ChartData<"radar">}
                    height={height}
                    width={width}
                    options={options as ChartOptions<"radar">}
                    id={id}
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
              options={options as ChartOptions<"line">}
              id={id}
            />{" "}
            <button
              className={`p-3 bg-[#f4f4f5] rounded-xl hover:border-[#bed7f1] border-[2px] hover:bg-[#e0ecf8] border-[#f4f4f5]  ${spaceMono.className} dark:bg-[#242222] dark:border-[#242222] dark:text-white dark:hover:border-[blue]`}
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
                    options={options as ChartOptions<"line">}
                    id={id}
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
