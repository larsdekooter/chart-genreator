import { spaceMono } from "@/lib/fonts";
import ArrayDatasetComponent from "./ArrayDatasetComponent";

export default function ArrayDatasetWrapper({ id }: { id: string }) {
  return (
    <div
      className="w-fit bg-[#fbfbff] px-20 py-10 h-fit flex flex-col justify-center items-center rounded-2xl dark:bg-[#2b2a2a]"
      id={id}
    >
      <h1 className={`text-4xl ${spaceMono.className} dark:text-white`}>
        Datasets
      </h1>

      <div className="flex flex-col items-center">
        <ArrayDatasetComponent />
      </div>
    </div>
  );
}
