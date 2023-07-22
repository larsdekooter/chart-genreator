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
      className="w-fit bg-[#fbfbff] px-20 py-10 h-fit flex flex-col justify-center items-center rounded-2xl"
      id={id}
    >
      <h1 className="text-4xl">Labels</h1>
      <div className="flex flex-col items-center">
        <ArrayInputComponent placeholder={placeholder} />
        <ArrayInputComponent placeholder={placeholder} />
        <ArrayInputComponent placeholder={placeholder} />
      </div>
      <button
        className={`${spaceMono.className} w-fit p-3 bg-[#f4f4f5] rounded-xl hover:border-[#bed7f1] border-[2px] hover:bg-[#e0ecf8] border-[#f4f4f5] mb-5`}
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
    </div>
  );
}
