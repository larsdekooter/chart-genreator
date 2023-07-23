import { spaceMono } from "@/lib/fonts";

export default function OtherDataWrapper({}) {
  return (
    <div className="w-fit bg-[#fbfbff] px-20 py-10 h-fit flex flex-col justify-center items-center rounded-2xl dark:bg-[#2b2a2a] mt-5">
      <h1 className={`${spaceMono.className} text-4xl dark:text-white mb-5`}>
        Other Data
      </h1>
      <div className="flex flex-row-reverse justify-evenly w-full">
        <input type="checkbox" className="checkbox dark:bg-white" name="fill" />
        <label
          htmlFor="fill"
          className={`dark:text-white ${spaceMono.className} mx-5`}
        >
          Fill chart:
        </label>
      </div>
    </div>
  );
}
