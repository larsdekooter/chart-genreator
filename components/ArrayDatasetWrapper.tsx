import { spaceMono } from "@/lib/fonts";
import ArrayDatasetComponent from "./ArrayDatasetComponent";
import { renderToStaticMarkup } from "react-dom/server";

export default function ArrayDatasetWrapper({ id }: { id: string }) {
  return (
    <div
      className="w-fit bg-[#fbfbff] px-20 py-10 h-fit flex flex-col justify-center items-center rounded-2xl"
      id={id}
    >
      <h1 className={`text-4xl ${spaceMono.className}`}>Datasets</h1>

      <div className="flex flex-col items-center">
        <ArrayDatasetComponent />
      </div>
      <button
        className={`${spaceMono.className} w-fit p-3 bg-[#f4f4f5] rounded-xl hover:border-[#bed7f1] border-[2px] hover:bg-[#e0ecf8] border-[#f4f4f5] mb-5`}
        onClick={(e) => {
          const { currentTarget: target } = e;
          const { parentElement: parent } = target;
          if (!parent) return;
          const { children } = parent;
          const div = children.item(1); // Div that contains all the ArrayDatasetComponents;
          const placeholder = document.createElement("div");
          placeholder.innerHTML = renderToStaticMarkup(
            <ArrayDatasetComponent />
          );
          const el = placeholder.firstChild;
          if (!el) return;
          div?.appendChild(el);
          document.getElementsByName("addDataButton").forEach((button) => {
            button.onclick = (e) => {
              const { srcElement: target } = e;
              //@ts-ignore
              const { parentElement: parent } = target;
              const newInput = renderToStaticMarkup(
                <input
                  type="number"
                  className="w-72 my-5 rounded-2xl p-2 bg-[#f4f4f5] outline-none border-[1px] border-black border-dashed "
                  placeholder="Data"
                />
              );

              const placeholder = document.createElement("div");
              placeholder.innerHTML = newInput;
              const node = placeholder.firstChild;
              if (!node) return;
              parent?.children.item(0)?.appendChild(node);
            };
          });
        }}
      >
        Add Dataset
      </button>
    </div>
  );
}
