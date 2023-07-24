import { spaceMono } from "@/lib/fonts";
import ArrayInputComponent from "./ArrayInputComponent";
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
      className="w-fit bg-[#fbfbff] px-20 py-10 h-fit flex flex-col justify-center items-center rounded-2xl dark:bg-[#2b2a2a] "
      id={id}
    >
      <h1
        className={`text-4xl ${spaceMono.className} dark:text-white text-center`}
      >
        Opacity
      </h1>
      <label
        htmlFor="range2"
        className={`${spaceMono.className} dark:text-white`}
      >
        Opacity of Background
      </label>
      <div className="flex flex-row items-center mb-2">
        <input
          type="range"
          name="range2"
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
        <div className="h-10 w-10 bg-[rgba(255,0,9)] ml-5 grid place-items-center"></div>
        <span className="dark:text-white mx-2">1.0</span>
      </div>
    </div>
  );
}
