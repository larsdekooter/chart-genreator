import { ReactNode } from "react";

export default function ArrayInputComponent({
  children,
  placeholder,
}: {
  children?: ReactNode;
  placeholder: string;
}) {
  return (
    <input
      type="number"
      className="w-72 my-5 rounded-2xl p-2 bg-[#f4f4f5] outline-none border-[1px] border-black border-dashed dark:bg-gray-800 dark:border-white dark:text-white"
      placeholder={placeholder}
    />
  );
}
