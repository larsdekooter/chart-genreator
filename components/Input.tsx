"use client";
import { MouseEvent, ReactNode, useState } from "react";

export default function Input({
  children,
  text,
}: {
  children?: ReactNode;
  text: string;
}) {
  function wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  const [isExpanded, setExpanded] = useState(false);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!isExpanded) {
      setExpanded(true);
      const menu = event.target as HTMLDivElement;
      menu.style.borderColor = "black";
      const children = menu.children;
      const menuOptions = [];
      //@ts-ignore
      for (let child of children) {
        if (child instanceof HTMLOptionElement) menuOptions.push(child);
        else if (child instanceof HTMLSpanElement) {
          if (child.id === "arrow") {
            child.style.transform = "rotate(180deg) ";
          } else if (child.id === "input") {
            // child.style.color = "black";
          }
        }
      }
      let top = 4;
      menu.classList.remove("bg-white");
      for (let option of menuOptions) {
        option.style.display = "block";
        wait(10).then(() => {
          option.style.top = `${top}rem`;
          option.style.zIndex = "0";
          top += 3;
        });
      }
      return;
    } else {
      const menu = event.target as HTMLDivElement;
      window.document.documentElement.classList.contains("dark")
        ? "#2e2d2d"
        : "#dee2e6";
      const children = menu.children;
      const menuOptions = [];
      //@ts-ignore
      for (let child of children) {
        if (child instanceof HTMLOptionElement) menuOptions.push(child);
        else if (child instanceof HTMLSpanElement) {
          if (child.id === "arrow") {
            child.style.transform = "rotate(0deg)";
          } else if (child.id === "input") {
            // child.style.color = "#9CA38F";
          }
        }
      }

      menu.classList.add("bg-white");
      for (let option of menuOptions) {
        option.style.top = "0";
        option.style.zIndex = "-10";
        wait(200).then(() => (option.style.display = "none"));
        if (menuOptions.indexOf(option) + 1 === menuOptions.length)
          setExpanded(false);
      }
    }

    return;
  };
  return (
    <button
      className="min-w-[20rem] border-[#dee2e6] border-2 border-solid rounded h-12 relative cursor-pointer  p-3 duration-200 dark:bg-gray-700"
      onClick={handleClick}
    >
      <span
        id="input"
        className="w-3/4 absolute left-5 top-1/4 text-left text-[#9CA38F]  pointer-events-none dark:text-white"
      >
        {text}
      </span>
      <span
        id="arrow"
        className="absolute right-2 select-none duration-200 -mt-[4%]"
      >
        ⬇️
      </span>
      {children}
    </button>
  );
}
