export default function ArrayDatasetComponentInputs() {
  return (
    <div className="flex w-full items-center justify-evenly">
      <input
        type="number"
        className="w-28 my-2 rounded-2xl p-2 bg-[#f4f4f5] outline-none border-[1px] border-black border-dashed dark:bg-gray-800 dark:border-white dark:text-white"
        placeholder="Data"
      />
      <input
        type="color"
        className="w-28 h-10 rounded-2xl px-5 py-2 my-5 border-[1px] border-black border-dashed dark:bg-gray-800 dark:border-white dark:text-white"
      />
    </div>
  );
}
