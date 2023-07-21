import { spaceMono } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed w-[98vw] h-16 bg-[#4b4747] top-2 rounded-2xl flex justify-evenly content-center text-center flex-wrap">
      <h1 className={`${spaceMono.className} text-white text-2xl `}>
        Chart Creator
      </h1>
      <Link href={"https://www.chartjs.org/"}>
        <Image
          src={"/chartjs-logo.svg"}
          alt="Chart.js"
          width={60}
          height={60}
          className="absolute top-0"
        />
      </Link>
    </header>
  );
}
