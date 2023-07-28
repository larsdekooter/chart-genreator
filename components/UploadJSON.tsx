import { spaceMono } from "@/lib/fonts";
import { create } from "domain";
import { ChangeEvent, useState } from "react";
import { Root, createRoot } from "react-dom/client";
import ChartComponent from "./Chart";
import { flushSync } from "react-dom";

export default function UploadJSON() {
  const [canvasRoot, setCanvasRoot] = useState({ render: "" } as
    | Root
    | { render: string });
  const [jsonRoot, setJSONRoot] = useState({ render: "" } as
    | Root
    | { render: string });
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const json = JSON.parse(e.target?.result as string);
      if (!json.data || !json.type) return alert("Json is invalid");
      const chart = (
        <ChartComponent
          data={json.data}
          options={json.options}
          type={json.type}
          id="exampleCanvas"
          isExample={false}
        />
      );
      if (!(typeof canvasRoot.render === "string")) {
        flushSync(() => {
          (canvasRoot as Root).render(chart);
        });
      } else {
        const r = createRoot(
          document.getElementById("exampleCanvasWrapper") as Element
        );
        setCanvasRoot(r);
        flushSync(() => {
          r.render(chart);
        });
      }
    };
    reader.readAsText(file);
    const uploadJSONWrapper = document.getElementById(
      "uploadJSONWrapper"
    ) as HTMLDivElement;
    let child: HTMLElement;
    //@ts-ignore
    for (child of uploadJSONWrapper.children) {
      child.remove();
    }
    if (!(typeof canvasRoot.render === "string")) {
      flushSync(() => {
        (canvasRoot as Root).render(
          <>
            <label
              htmlFor="jsonUpload"
              className={`text-center text-white ${spaceMono.className} border-white border-dashed border-[1px] rounded-lg px-10 py-2 cursor-pointer hover:scale-105 duration-200 `}
              id="label"
            >
              Upload JSON
            </label>
            <input
              type="file"
              id="jsonUpload"
              className="hidden"
              accept="application/json"
              onChange={handleInput}
            />
          </>
        );
      });
    } else {
      const r = createRoot(
        document.getElementById("uploadJSONWrapper") as HTMLDivElement
      );
      setJSONRoot(r);
      flushSync(() => {
        r.render(
          <>
            <label
              htmlFor="jsonUpload"
              className={`text-center text-white ${spaceMono.className} border-white border-dashed border-[1px] rounded-lg px-10 py-2 cursor-pointer hover:scale-105 duration-200 `}
              id="label"
            >
              Upload JSON
            </label>
            <input
              type="file"
              id="jsonUpload"
              className="hidden"
              accept="application/json"
              onChange={handleInput}
            />
          </>
        );
      });
    }
  };
  return (
    <div className="flex items-center" id="uploadJSONWrapper">
      <label
        htmlFor="jsonUpload"
        className={`text-center text-white ${spaceMono.className} border-white border-dashed border-[1px] rounded-lg px-10 py-2 cursor-pointer hover:scale-105 duration-200 `}
        id="label"
      >
        Upload JSON
      </label>
      <input
        type="file"
        id="jsonUpload"
        className="hidden"
        accept="application/json"
        onChange={handleInput}
      />
    </div>
  );
}
