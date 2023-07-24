export default function ArrayDatasetComponentPosition() {
  return (
    <div className="flex w-full justify-evenly">
      <input
        type="number"
        className="w-28 my-5 rounded-2xl p-2 bg-[#f4f4f5] outline-none border-[1px] border-black border-dashed dark:bg-gray-800 dark:border-white dark:text-white"
        placeholder="X position"
      />
      <input
        type="number"
        className="w-28 my-5 rounded-2xl p-2 bg-[#f4f4f5] outline-none border-[1px] border-black border-dashed dark:bg-gray-800 dark:border-white dark:text-white"
        placeholder="Y position"
      />
    </div>
  );
}
