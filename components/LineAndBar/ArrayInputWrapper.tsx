import { ReactNode } from "react";
import ArrayInputComponent from "./ArrayInputComponent";
import { spaceMono } from "@/lib/fonts";
import { renderToStaticMarkup } from "react-dom/server";

export default function ArrayInputWrapper({
  id,
  placeholder,
}: {
  id: string;
  placeholder: string;
}) {
  return (
    <div
      className="w-fit bg-[#fbfbff] px-20 py-10 h-fit flex flex-col justify-center items-center rounded-2xl dark:bg-[#2b2a2a]"
      id={id}
    >
      <h1
        className={`text-4xl ${spaceMono.className} dark:text-white text-center`}
      >
        Labels and <br />
        Opacity
      </h1>
      <div className="flex flex-col items-center">
        <ArrayInputComponent placeholder={placeholder} />
        <ArrayInputComponent placeholder={placeholder} />
        <ArrayInputComponent placeholder={placeholder} />
      </div>
      <button
        className={`${spaceMono.className} w-fit p-3 bg-[#f4f4f5] rounded-xl hover:border-[#bed7f1] border-[2px] hover:bg-[#e0ecf8] border-[#f4f4f5] mb-5 dark:bg-[#242222] dark:border-[#242222] dark:text-white dark:hover:border-[blue]`}
        onClick={(e) => {
          const { currentTarget: target } = e;
          const { parentElement: parent } = target;
          if (!parent) return;
          const { children } = parent;
          const div = children.item(1);
          if (!div) return;
          const element = <ArrayInputComponent placeholder={placeholder} />;
          const stringElement = renderToStaticMarkup(element);
          const holder = document.createElement("div");
          holder.innerHTML = stringElement;
          const node = holder.firstChild;
          if (!node) return;
          div.appendChild(node);
        }}
      >
        Add Label
      </button>
      <label
        htmlFor="range"
        className={`${spaceMono.className} dark:text-white`}
      >
        Opacity of Background
      </label>
      <div className="flex flex-row items-center mb-2">
        <input
          type="range"
          name="range"
          min={0}
          max={1}
          step={0.1}
          defaultValue={1}
          onChange={(e) => {
            const target = e.currentTarget as HTMLInputElement;
            const parent = target.parentElement;
            const opDiv = parent?.children.item(1) as HTMLDivElement;
            opDiv.classList.remove(`bg-[rgba(255,0,0,.5})]`);
            opDiv.style.opacity = target.value;
            (parent?.children.item(2) as HTMLSpanElement).innerText =
              target.value;
          }}
        />
        <div
          className={`h-10 w-10 bg-[rgba(255,0,0)] ml-5 grid place-items-center`}
        ></div>
        <span className="dark:text-white mx-2">1.0</span>
      </div>
    </div>
  );
}
