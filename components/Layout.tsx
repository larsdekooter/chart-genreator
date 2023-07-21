import { ReactNode } from "react";
import Header from "./Header";

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <div className="flex justify-center">
      <Header />
      <main className="mt-32">{children}</main>
    </div>
  );
}
