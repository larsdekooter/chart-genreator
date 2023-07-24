import { spaceMono } from "@/lib/fonts";
import { renderToStaticMarkup } from "react-dom/server";
import ArrayDatasetComponentPosition from "./ArrayDatasetComponentPosition";

export default function ArrayDatasetComponent({}: {}) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center w-full">
        <ArrayDatasetComponentPosition />
        <ArrayDatasetComponentPosition />
        <ArrayDatasetComponentPosition />
      </div>
      <button
        className={`${spaceMono.className} w-fit p-3 bg-[#f4f4f5] rounded-xl hover:border-[#bed7f1] border-[2px] hover:bg-[#e0ecf8] border-[#f4f4f5] mb-5 dark:bg-[#242222] dark:border-[#242222] dark:text-white dark:hover:border-[blue]`}
        onClick={(e) => {
          const { currentTarget: target } = e;
          const { parentElement: parent } = target;
          const newInput = renderToStaticMarkup(
            <ArrayDatasetComponentPosition />
          );
          const placeholder = document.createElement("div");
          placeholder.innerHTML = newInput;
          const node = placeholder.firstChild;
          if (!node) return;
          parent?.children.item(0)?.appendChild(node);
        }}
        name="addDataButton2"
      >
        Add Data
      </button>
      <h1 className={`${spaceMono.className} dark:text-white`}>
        Background Color
      </h1>
      <input
        type="color"
        className="w-72 h-10 rounded-2xl px-5 py-2 my-5 border-[1px] border-black border-dashed dark:bg-gray-800 dark:border-white dark:text-white"
      />
      <input
        type="text"
        className="w-72 my-5 rounded-2xl p-2 bg-[#f4f4f5] outline-none border-[1px] border-black border-dashed dark:bg-gray-800 dark:border-white dark:text-white"
        placeholder="Label"
      />
      <input
        type="number"
        className="w-72 my-5 rounded-2xl p-2 bg-[#f4f4f5] outline-none border-[1px] border-black border-dashed dark:bg-gray-800 dark:border-white dark:text-white"
        placeholder="Radius (Only for Bubble Chart)"
      />
      <div className="w-full border-t-[1px] border-black border-dashed mb-5 dark:border-white"></div>
    </div>
  );
}
