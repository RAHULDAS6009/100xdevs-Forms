import { ReactNode } from "react";
import SideBar from "../_components/SideBar";

export default function ({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-screen bg-[#ffffff] border-r-1 border-gray-200 flex   ">
      <SideBar />

      {children}
      {/* ideally sidebar should be here not sure we have to check it */}
    </div>
  );
}
