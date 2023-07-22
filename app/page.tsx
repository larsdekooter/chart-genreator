"use client";

import ArrayInputWrapper from "@/components/ArrayInputWrapper";
import ChartComponent from "@/components/Chart";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import Option from "@/components/Option";
import Utils from "@/lib/Utils";
import { spaceMono } from "@/lib/fonts";
import { PartialChartData, PartialChartOptions } from "@/lib/types";
import { ChartType } from "chart.js";

import { useState } from "react";

export default function Home() {
  const [chartData, setChartData] = useState({} as PartialChartData);
  const [chartOptions, setChartOptions] = useState({} as PartialChartOptions);
  const [type, setType] = useState("" as ChartType);
  return (
    <Layout>
      <div className="flex flex-col items-center overflow-x-hidden h-full">
        <div>
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

                  backgroundColor: Utils.CHART_COLORS.blue,
                  label: "Example",
                  borderRadius: Number.MAX_VALUE,
                  barThickness: 70,
                },
              ],
            }}
            options={{
              elements: {
                line: {
                  tension: 0,
                  borderWidth: 2,
                  borderColor: "rgba(47, 97, 68, 1)",
                  fill: "start",
                  backgroundColor: "rgba(47, 97, 68, 0.3)",
                },
                point: { backgroundColor: "rgba(47, 97, 68, 1)" },
              },
              plugins: {
                title: {
                  display: true,
                  text: "Example Chart",
                },
              },
            }}
            type="line"
            isExample={true}
            id="exampleCanvas"
          />
        </div>
        <h1 className={`text-4xl my-5 ${spaceMono.className}`}>
          Download Chart
        </h1>
        <Input text="Choose File Type">
          {["JPG", "PNG", "Mov", "TEST", "More test"].map((type) => (
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
          <h1 className={`text-4xl my-5 ${spaceMono.className}`}>
            Create your own Chart
          </h1>
          <Input text="Choose your type of Chart">
            {["Line", "Bar", "Bubble", "Doughnut", "Pie", "Scatter"].map(
              (type) => (
                <Option
                  key={type}
                  value={type}
                  onChoose={(e) => {
                    setType(
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
              )
            )}
          </Input>
          <div className="h-96"></div>
          <ArrayInputWrapper placeholder="Chart Labels" id="labelsInput" />
          <button
            className={`${spaceMono.className} w-fit p-3 bg-green-400 rounded-xl hover:border-green-500 border-[1px] border-b-green-400 hover:bg-green-300 duration-200`}
            onClick={(e) => {
              const AIW = document.getElementById("labelsInput");
              const parentOfInputs = AIW?.children?.item(1) as HTMLDivElement;
              const values = [];
              let child: HTMLInputElement;
              //@ts-ignore
              for (child of parentOfInputs.children) {
                values.push(child.value);
              }
              const data = chartData;
              data.labels = values.filter((value) => value !== "");
              setChartData(data);
            }}
          >
            Confirm Labels
          </button>
          <div className="h-40"></div>
        </>
      </div>
    </Layout>
  );
}
