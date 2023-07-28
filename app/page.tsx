"use client";

import LineAndBarComponents from "@/components/LineAndBar/index";
import BubbleAndScatterComponents from "@/components/BubbleAndScatter/index";
import PieAndDoughnut from "@/components/PieAndDoughnut/index";
import ChartComponent from "@/components/Chart";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import Option from "@/components/Option";
import Utils from "@/lib/Utils";
import { spaceMono } from "@/lib/fonts";
import { hexToRGBA } from "@/lib/functions";
import {
  PartialChartData,
  PartialChartOptions,
  PartialOtherChartData,
} from "@/lib/types";

import { useState } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { BubbleDataPoint, ChartDataset } from "chart.js";

export default function Home() {
  const [chartData, setChartData] = useState({
    datasets: [],
  } as PartialChartData);
  const [chartOptions, setChartOptions] = useState({} as PartialChartOptions);
  const [chartOpacity, setChartOpacity] = useState(1);
  const [otherChartData, setOtherChartData] = useState(
    {} as PartialOtherChartData
  );

  const [chartType, setChartType] = useState(
    "" as "line" | "bar" | "bubble" | "doughnut" | "pie" | "scatter"
  );
  return (
    <Layout>
      <div className="flex flex-col items-center overflow-x-hidden h-full">
        <div id="exampleCanvasWrapper">
          <ChartComponent
            data={{
              labels: Utils.MONTHS,
              datasets: [
                {
                  data: Utils.numbers({
                    count: 12,
                    min: 0,
                    max: 100,
                  }),

                  backgroundColor: Utils.transparantize(
                    Utils.CHART_COLORS.red,
                    0.5
                  ),
                  borderColor: Utils.CHART_COLORS.red,
                  label: "Example",
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  ticks: { color: "#978f8f" },
                },
                x: {
                  ticks: { color: "#978f8f" },
                },
              },
              elements: {
                line: {
                  tension: 0,
                  borderWidth: 2,
                  fill: "start",
                },
                point: { backgroundColor: "rgba(47, 97, 68, 1)" },
              },
              plugins: {
                title: {
                  display: true,
                  text: "Example Chart",
                  color: "#978f8f",
                },
                legend: {
                  labels: {
                    color: "#978f8f",
                  },
                },
              },
            }}
            type="line"
            isExample={true}
            id="exampleCanvas"
          />
        </div>
        <h1 className={`text-4xl my-5 ${spaceMono.className} dark:text-white`}>
          Download Chart
        </h1>
        <Input text="Choose File Type">
          {["JPG", "PNG"].map((type) => (
            <Option
              key={type}
              value={type}
              onChoose={(event) => {
                Utils.downloadChart(
                  event.currentTarget.value as "PNG" | "JPG",
                  "exampleCanvas",
                  "Example_Chart"
                );
              }}
            >
              {type}
            </Option>
          ))}
        </Input>
        <div className="h-1 w-screen overflow-hidden border-t-[#eaecef] border-t-2 border-dashed mt-40"></div>
        <>
          <h1
            className={`text-4xl my-5 ${spaceMono.className} dark:text-white`}
          >
            Create your own Chart
          </h1>
          <h1
            className={`text-3xl my-5 ${spaceMono.className} dark:text-white`}
          >
            Line and Bar chart
          </h1>
          <Input text="Choose your type of Chart">
            {["Line", "Bar"].map((type) => (
              <Option
                key={type}
                value={type}
                onChoose={(e) => {
                  setChartType(
                    e.currentTarget.value.toLowerCase() as
                      | "line"
                      | "bar"
                      | "bubble"
                      | "doughnut"
                      | "pie"
                      | "scatter"
                  );
                }}
              >
                {type}
              </Option>
            ))}
          </Input>
          <div className="h-96"></div>
          <div className="flex flex-row justify-evenly w-full">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <LineAndBarComponents.ArrayInputWrapper
                  placeholder="Chart Labels"
                  id="labelsInput"
                />
                <button
                  className={`${spaceMono.className} w-fit p-3 bg-green-400 rounded-xl hover:border-green-500 border-[1px] border-b-green-400 hover:bg-green-300 duration-200`}
                  onClick={(e) => {
                    const AIW = document.getElementById("labelsInput");
                    const parentOfInputs = AIW?.children?.item(
                      1
                    ) as HTMLDivElement;
                    const values = [];
                    let child: HTMLInputElement;
                    //@ts-ignore
                    for (child of parentOfInputs.children) {
                      values.push(child.value);
                    }
                    const input = AIW?.children
                      .item(AIW.children.length - 1)
                      ?.children.item(0) as HTMLInputElement;
                    setChartOpacity(Number(input.value));
                    const data = chartData;
                    data.labels = values.filter((value) => value !== "");
                    setChartData(data);
                  }}
                >
                  Confirm Labels
                </button>
              </div>
              <div className="flex flex-col items-center">
                <LineAndBarComponents.OtherDataWrapper />
                <button
                  className={`${spaceMono.className} w-fit p-3 bg-green-400 rounded-xl hover:border-green-500 border-[1px] border-b-green-400 hover:bg-green-300 duration-200`}
                  onClick={(e) => {
                    const { currentTarget: target } = e;
                    const parent = target.parentElement as HTMLDivElement;
                    const fill = (
                      parent.children
                        .item(0)
                        ?.children.item(1)
                        ?.children.item(0) as HTMLInputElement
                    ).checked;
                    const data = otherChartData;
                    data.fill = fill;
                    setOtherChartData(data);
                  }}
                >
                  Confirm Other Data
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <LineAndBarComponents.ArrayDatasetWrapper id="datasetInput" />
              <button
                className={`${spaceMono.className} w-fit p-3 bg-green-400 rounded-xl hover:border-green-500 border-[1px] border-b-green-400 hover:bg-green-300 duration-200`}
                onClick={(e) => {
                  const ADW = document.getElementById("datasetInput");
                  const parentOfDatasets = ADW?.children.item(1);
                  let divChild: HTMLDivElement;
                  const datasets = [];
                  //@ts-ignore
                  for (divChild of parentOfDatasets?.children) {
                    // [0: DataInputs[], 1: AddDataButton, 2: BackgroundColorH1, 3: ColorInput, 4: LabelInput, 5: BorderLine]
                    const dataInputs = divChild.children.item(0);
                    const backgroundColorInput = divChild.children.item(
                      3
                    ) as HTMLInputElement;
                    const labelInput = divChild.children.item(
                      4
                    ) as HTMLInputElement;
                    const dataValues: number[] = [];
                    let inputChild: HTMLInputElement;
                    //@ts-ignore
                    for (inputChild of dataInputs?.children) {
                      dataValues.push(parseInt(inputChild.value));
                    }
                    let backgroundColor = backgroundColorInput.value;
                    const borderColor = hexToRGBA(backgroundColor, 1);
                    backgroundColor = hexToRGBA(backgroundColor, chartOpacity);
                    const label = labelInput.value;
                    datasets.push({
                      data: dataValues,
                      backgroundColor,
                      label,
                      borderColor,
                    });
                  }
                  const data = chartData;
                  data.datasets = datasets;
                  setChartData(data);
                }}
              >
                Confirm Datasets
              </button>
            </div>
          </div>
          <div className="h-20"></div>
          <button
            className={`${spaceMono.className} w-fit py-3 px-96 text-2xl bg-blue-400 rounded-xl hover:border-blue-500 border-[1px] border-b-blue-400 hover:bg-blue-300 duration-200`}
            onClick={(e) => {
              const data = chartData;
              const type = chartType;
              const chart = (
                <ChartComponent
                  data={data}
                  type={type}
                  options={{
                    elements: {
                      line: { fill: otherChartData.fill ? "start" : undefined },
                    },
                  }}
                  id="customLineOrBarChart"
                />
              );
              const chartHolderDiv = document.getElementById(
                "chartHolder"
              ) as HTMLDivElement;
              const root = createRoot(chartHolderDiv);
              flushSync(() => {
                root.render(chart);
              });
            }}
          >
            Generate Chart
          </button>
          <div
            className="h-[400px] w-[1000px] border-[1px] border-dashed border-black dark:border-white my-20 flex items-center"
            id="chartHolder"
          ></div>
          <Input text="Choose File Type">
            {["JPG", "PNG"].map((type) => (
              <Option
                key={type}
                value={type}
                onChoose={(event) => {
                  Utils.downloadChart(
                    event.currentTarget.value as "PNG" | "JPG",
                    "customLineOrBarChart",
                    "Custom_Chart"
                  );
                }}
              >
                {type}
              </Option>
            ))}
          </Input>
        </>
        <div className="h-1 w-screen overflow-hidden border-t-[#eaecef] border-t-2 border-dashed mt-40"></div>
        <>
          <h1
            className={`text-3xl my-5 ${spaceMono.className} dark:text-white`}
          >
            Bubble And Scatter chart
          </h1>
          <Input text="Choose your type of Chart">
            {["Bubble", "Scatter"].map((type) => (
              <Option
                key={type}
                value={type}
                onChoose={(e) => {
                  setChartType(
                    e.currentTarget.value.toLowerCase() as
                      | "line"
                      | "bar"
                      | "bubble"
                      | "doughnut"
                      | "pie"
                      | "scatter"
                  );
                }}
              >
                {type}
              </Option>
            ))}
          </Input>
          <div className="h-96"></div>
          <div className="flex flex-row justify-evenly w-full">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <BubbleAndScatterComponents.ArrayInputWrapper
                  placeholder="X position"
                  id="labelsInputBubbleOrScatter"
                />
                <button
                  className={`${spaceMono.className} w-fit p-3 bg-green-400 rounded-xl hover:border-green-500 border-[1px] border-b-green-400 hover:bg-green-300 duration-200`}
                  onClick={(e) => {
                    const AIW = document.getElementById(
                      "labelsInputBubbleOrScatter"
                    );
                    const parentOfInputs = AIW?.children?.item(
                      1
                    ) as HTMLDivElement;
                    const values = [];
                    let child: HTMLInputElement;
                    //@ts-ignore
                    for (child of parentOfInputs.children) {
                      values.push(child.value);
                    }
                    const input = AIW?.children
                      .item(AIW.children.length - 1)
                      ?.children.item(0) as HTMLInputElement;
                    setChartOpacity(Number(input.value));
                    const data = chartData;
                    data.labels = values.filter((value) => value !== "");
                    setChartData(data);
                  }}
                >
                  Confirm Opacity
                </button>
              </div>
              <div className="flex flex-col items-center"></div>
            </div>
            <div className="flex flex-col items-center">
              <BubbleAndScatterComponents.ArrayDatasetWrapper id="datasetInputBubbleOrScatter" />
              <button
                className={`${spaceMono.className} w-fit p-3 bg-green-400 rounded-xl hover:border-green-500 border-[1px] border-b-green-400 hover:bg-green-300 duration-200`}
                onClick={(e) => {
                  const ADW = document.getElementById(
                    "datasetInputBubbleOrScatter"
                  );
                  const parentOfDatasets = ADW?.children.item(1);
                  let divChild: HTMLDivElement;
                  const datasets = [];
                  //@ts-ignore
                  for (divChild of parentOfDatasets?.children) {
                    // [0: DataInputs[], 1: AddDataButton, 2: BackgroundColorH1, 3: ColorInput, 4: LabelInput, 5: RadiusInput 6: BorderLine]
                    const dataInputs = divChild.children.item(0);
                    const backgroundColorInput = divChild.children.item(
                      3
                    ) as HTMLInputElement;
                    const labelInput = divChild.children.item(
                      4
                    ) as HTMLInputElement;
                    const radiusInput = divChild.children.item(
                      5
                    ) as HTMLInputElement;
                    const dataValues: BubbleDataPoint[] = [];
                    //@ts-ignore
                    for (let i = 0; i < dataInputs?.children.length; i++) {
                      let child = dataInputs?.children.item(
                        i
                      ) as HTMLDivElement;
                      const xPos = child.children.item(0) as HTMLInputElement;
                      const yPos = child.children.item(1) as HTMLInputElement;

                      dataValues.push({
                        x: parseInt(xPos.value),
                        y: parseInt(yPos.value),
                        r: parseInt(radiusInput.value),
                      });
                    }
                    let backgroundColor = backgroundColorInput.value;
                    const borderColor = hexToRGBA(backgroundColor, 1);
                    backgroundColor = hexToRGBA(backgroundColor, chartOpacity);
                    const label = labelInput.value;

                    datasets.push({
                      data: dataValues,
                      backgroundColor,
                      label,
                      borderColor,
                    });
                  }
                  const data = chartData;
                  data.datasets = datasets;
                  setChartData(data);
                }}
              >
                Confirm Datasets
              </button>
            </div>
          </div>
          <div className="h-20"></div>
          <button
            className={`${spaceMono.className} w-fit py-3 px-96 text-2xl bg-blue-400 rounded-xl hover:border-blue-500 border-[1px] border-b-blue-400 hover:bg-blue-300 duration-200`}
            onClick={(e) => {
              const data = chartData;
              const type = chartType;
              const chart = (
                <ChartComponent
                  data={data}
                  type={type}
                  options={{
                    elements: {
                      line: { fill: otherChartData.fill ? "start" : undefined },
                    },
                  }}
                  id="customBubbleOrScatterChart"
                />
              );
              const chartHolderDiv = document.getElementById(
                "chartHolder2"
              ) as HTMLDivElement;
              const root = createRoot(chartHolderDiv);
              flushSync(() => {
                root.render(chart);
              });
            }}
          >
            Generate Chart
          </button>
          <div
            className="h-[400px] w-[1000px] border-[1px] border-dashed border-black dark:border-white my-20 flex items-center"
            id="chartHolder2"
          ></div>
          <Input text="Choose File Type">
            {["JPG", "PNG"].map((type) => (
              <Option
                key={type}
                value={type}
                onChoose={(event) => {
                  Utils.downloadChart(
                    event.currentTarget.value as "PNG" | "JPG",
                    "customBubbleOrScatterChart",
                    "Custom_Chart"
                  );
                }}
              >
                {type}
              </Option>
            ))}
          </Input>
        </>
        <div className="h-1 w-screen overflow-hidden border-t-[#eaecef] border-t-2 border-dashed mt-40"></div>
        <>
          <h1
            className={`text-3xl my-5 ${spaceMono.className} dark:text-white`}
          >
            Pie and Doughnut Chart
          </h1>
          <Input text="Choose your type of Chart">
            {["Pie", "Doughnut"].map((type) => (
              <Option
                key={type}
                value={type}
                onChoose={(e) => {
                  setChartType(
                    e.currentTarget.value.toLowerCase() as
                      | "line"
                      | "bar"
                      | "bubble"
                      | "doughnut"
                      | "pie"
                      | "scatter"
                  );
                }}
              >
                {type}
              </Option>
            ))}
          </Input>
          <div className="h-96"></div>
          <div className="flex flex-row justify-evenly w-full">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <PieAndDoughnut.ArrayInputWrapper id="labelsInputPieOr" />
                <button
                  className={`${spaceMono.className} w-fit p-3 bg-green-400 rounded-xl hover:border-green-500 border-[1px] border-b-green-400 hover:bg-green-300 duration-200`}
                  onClick={(e) => {
                    const AIW = document.getElementById("labelsInputPieOr");
                    const parentOfInputs = AIW?.children?.item(
                      1
                    ) as HTMLDivElement;
                    const values = [];
                    let child: HTMLInputElement;
                    //@ts-ignore
                    for (child of parentOfInputs.children) {
                      values.push(child.value);
                    }
                    const input = AIW?.children
                      .item(AIW.children.length - 1)
                      ?.children.item(0) as HTMLInputElement;
                    setChartOpacity(Number(input.value));
                    const data = chartData;
                    data.labels = values.filter((value) => value !== "");
                    setChartData(data);
                    console.log(chartData);
                  }}
                >
                  Confirm Labels
                </button>
              </div>
              <div className="flex flex-col items-center"></div>
            </div>
            <div className="flex flex-col items-center">
              <PieAndDoughnut.ArrayDatasetWrapper id="datasetInputPieOrDoughnut" />
              <button
                className={`${spaceMono.className} w-fit p-3 bg-green-400 rounded-xl hover:border-green-500 border-[1px] border-b-green-400 hover:bg-green-300 duration-200`}
                onClick={(e) => {
                  const ADW = document.getElementById(
                    "datasetInputPieOrDoughnut"
                  );
                  const parentOfDatasets = ADW?.children.item(1);
                  let divChild: HTMLDivElement;
                  const datasets: ChartDataset[] = [];
                  //@ts-ignore
                  for (divChild of parentOfDatasets?.children) {
                    // [0: DataInputs[], 1: AddDataButton, 2: LabelInput, 3: BorderLine]
                    const dataInputs = divChild.children.item(0);

                    const labelInput = divChild.children.item(
                      2
                    ) as HTMLInputElement;
                    const dataValues: number[] = [];
                    const colorValues: string[] = [];
                    //@ts-ignore
                    for (let i = 0; i < dataInputs?.children.length; i++) {
                      let child = dataInputs?.children.item(
                        i
                      ) as HTMLDivElement;
                      const data = child.children.item(0) as HTMLInputElement;
                      const backgroundColorInput = child.children.item(
                        1
                      ) as HTMLInputElement;

                      dataValues.push(parseInt(data.value));
                      const backgroundColor = hexToRGBA(
                        backgroundColorInput.value,
                        chartOpacity
                      );
                      colorValues.push(backgroundColor);
                    }
                    const label = labelInput.value;

                    datasets.push({
                      data: dataValues,
                      label,
                      backgroundColor: colorValues,
                    });
                  }
                  const data = chartData;
                  data.datasets = datasets;
                  setChartData(data);
                }}
              >
                Confirm Datasets
              </button>
            </div>
          </div>
          <div className="h-20"></div>
          <button
            className={`${spaceMono.className} w-fit py-3 px-96 text-2xl bg-blue-400 rounded-xl hover:border-blue-500 border-[1px] border-b-blue-400 hover:bg-blue-300 duration-200`}
            onClick={(e) => {
              const data = chartData;
              const type = chartType;
              const chart = (
                <ChartComponent
                  data={data}
                  type={type}
                  options={{
                    elements: {
                      line: { fill: otherChartData.fill ? "start" : undefined },
                    },
                  }}
                  id="customPieOrDoughnut"
                />
              );
              const chartHolderDiv = document.getElementById(
                "chartHolder3"
              ) as HTMLDivElement;
              const root = createRoot(chartHolderDiv);
              flushSync(() => {
                root.render(chart);
              });
            }}
          >
            Generate Chart
          </button>
          <div
            className="h-[400px] w-[1000px] border-[1px] border-dashed border-black dark:border-white my-20 flex items-center"
            id="chartHolder3"
          ></div>
          <Input text="Choose File Type">
            {["JPG", "PNG"].map((type) => (
              <Option
                key={type}
                value={type}
                onChoose={(event) => {
                  Utils.downloadChart(
                    event.currentTarget.value as "PNG" | "JPG",
                    "customPieOrDoughnut",
                    "Custom_Chart"
                  );
                }}
              >
                {type}
              </Option>
            ))}
          </Input>
        </>
        <div className="h-1 w-screen overflow-hidden border-t-[#eaecef] border-t-2 border-dashed mt-40"></div>
        <>
          <h1
            className={`text-3xl my-5 ${spaceMono.className} dark:text-white`}
          >
            Radar and Polar Area Chart
          </h1>
          <Input text="Choose your type of Chart">
            {["radar", "polarArea"].map((type) => (
              <Option
                key={type}
                value={type}
                onChoose={(e) => {
                  setChartType(
                    e.currentTarget.value.toLowerCase() as
                      | "line"
                      | "bar"
                      | "bubble"
                      | "doughnut"
                      | "pie"
                      | "scatter"
                  );
                }}
              >
                {type}
              </Option>
            ))}
          </Input>
          <div className="h-96"></div>
          <div className="flex flex-row justify-evenly w-full">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <PieAndDoughnut.ArrayInputWrapper id="labelsInputRadarOrPolar" />
                <button
                  className={`${spaceMono.className} w-fit p-3 bg-green-400 rounded-xl hover:border-green-500 border-[1px] border-b-green-400 hover:bg-green-300 duration-200`}
                  onClick={(e) => {
                    const AIW = document.getElementById(
                      "labelsInputRadarOrPolar"
                    );
                    const parentOfInputs = AIW?.children?.item(
                      1
                    ) as HTMLDivElement;
                    const values = [];
                    let child: HTMLInputElement;
                    //@ts-ignore
                    for (child of parentOfInputs.children) {
                      values.push(child.value);
                    }
                    const input = AIW?.children
                      .item(AIW.children.length - 1)
                      ?.children.item(0) as HTMLInputElement;
                    setChartOpacity(Number(input.value));
                    const data = chartData;
                    data.labels = values.filter((value) => value !== "");
                    setChartData(data);
                    console.log(chartData);
                  }}
                >
                  Confirm Labels
                </button>
              </div>
              <div className="flex flex-col items-center"></div>
            </div>
            <div className="flex flex-col items-center">
              <PieAndDoughnut.ArrayDatasetWrapper id="datasetInputRadarOrPolar" />
              <button
                className={`${spaceMono.className} w-fit p-3 bg-green-400 rounded-xl hover:border-green-500 border-[1px] border-b-green-400 hover:bg-green-300 duration-200`}
                onClick={(e) => {
                  const ADW = document.getElementById(
                    "datasetInputRadarOrPolar"
                  );
                  const parentOfDatasets = ADW?.children.item(1);
                  let divChild: HTMLDivElement;
                  const datasets: ChartDataset[] = [];
                  //@ts-ignore
                  for (divChild of parentOfDatasets?.children) {
                    // [0: DataInputs[], 1: AddDataButton, 2: LabelInput, 3: BorderLine]
                    const dataInputs = divChild.children.item(0);

                    const labelInput = divChild.children.item(
                      2
                    ) as HTMLInputElement;
                    const dataValues: number[] = [];
                    const colorValues: string[] = [];
                    //@ts-ignore
                    for (let i = 0; i < dataInputs?.children.length; i++) {
                      let child = dataInputs?.children.item(
                        i
                      ) as HTMLDivElement;
                      const data = child.children.item(0) as HTMLInputElement;
                      const backgroundColorInput = child.children.item(
                        1
                      ) as HTMLInputElement;

                      dataValues.push(parseInt(data.value));
                      const backgroundColor = hexToRGBA(
                        backgroundColorInput.value,
                        chartOpacity
                      );
                      colorValues.push(backgroundColor);
                    }
                    const label = labelInput.value;

                    datasets.push({
                      data: dataValues,
                      label,
                      backgroundColor: colorValues,
                    });
                  }
                  const data = chartData;
                  data.datasets = datasets;
                  setChartData(data);
                }}
              >
                Confirm Datasets
              </button>
            </div>
          </div>
          <div className="h-20"></div>
          <button
            className={`${spaceMono.className} w-fit py-3 px-96 text-2xl bg-blue-400 rounded-xl hover:border-blue-500 border-[1px] border-b-blue-400 hover:bg-blue-300 duration-200`}
            onClick={(e) => {
              const data = chartData;
              const type = chartType;
              const chart = (
                <ChartComponent
                  data={data}
                  type={type}
                  options={{
                    elements: {
                      line: { fill: otherChartData.fill ? "start" : undefined },
                    },
                  }}
                  id="customRadarOrPolarChart"
                />
              );
              const chartHolderDiv = document.getElementById(
                "chartHolder4"
              ) as HTMLDivElement;
              const root = createRoot(chartHolderDiv);
              flushSync(() => {
                root.render(chart);
              });
            }}
          >
            Generate Chart
          </button>
          <div
            className="h-[400px] w-[1000px] border-[1px] border-dashed border-black dark:border-white my-20 flex items-center"
            id="chartHolder4"
          ></div>
          <Input text="Choose File Type">
            {["JPG", "PNG"].map((type) => (
              <Option
                key={type}
                value={type}
                onChoose={(event) => {
                  Utils.downloadChart(
                    event.currentTarget.value as "PNG" | "JPG",
                    "customRadarOrPolarChart",
                    "Custom_Chart"
                  );
                }}
              >
                {type}
              </Option>
            ))}
          </Input>
        </>
      </div>
    </Layout>
  );
}
