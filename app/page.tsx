"use client";

import ChartComponent from "@/components/Chart";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import Option from "@/components/Option";
import Utils from "@/lib/Utils";

export default function Home() {
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
                  barThickness: 25,
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
          />
        </div>
        <Input>
          {["line", "bar", "bubble", "doughnut", "pie", "scatter"].map(
            (type) => (
              <Option key={type} value={type} onClick={() => {}}>
                {type}
              </Option>
            )
          )}
        </Input>
      </div>
    </Layout>
  );
}
