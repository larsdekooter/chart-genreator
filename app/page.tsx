"use client";

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
      <div className="flex flex-col items-start">
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
            type="bar"
            isExample={true}
            id="exampleCanvas"
          />
        </div>
        <h1 className={`text-4xl my-5 ${spaceMono.className}`}>
          Download Chart
        </h1>
        <Input text="Choose file type">
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
      </div>
    </Layout>
  );
}
