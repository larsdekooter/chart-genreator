"use client";

import { MouseEvent, MouseEventHandler, ReactNode } from "react";

export default function Option({
  children,
  value,
  onClick,
}: {
  children?: ReactNode;
  value: string;
  onClick: (
    event: MouseEvent<HTMLOptionElement, globalThis.MouseEvent>
  ) => MouseEventHandler<HTMLOptionElement> | undefined | void;
}) {
  return (
    <option
      className="appearance-none w-full h-full absolute text-left top-0 -z-10 duration-200 border-x-2 border-[#dee2e6] border-solid left-0 pl-5 pt-2 cursor-pointer hover:bg-slate-200 capitalize hidden"
      onClick={(event) => {
        const optionClicked = event.currentTarget as HTMLOptionElement;
        const menu = optionClicked.parentElement;
        if (!menu) return;
        const menuChildren = menu.children;
        //@ts-ignore
        for (let child of menuChildren) {
          if (child.id === "input") {
            child.innerText = optionClicked.value;
          }
        }
        return;
        onClick(event);
      }}
      value={value}
    >
      {children}
    </option>
  );
}
