"use client";
import { ReactNode, useState } from "react";
import SideBar from "../_components/SideBar";

export default function ({ children }: { children: ReactNode }) {
  return (
    <div className="  bg-[#ffffff] border-r-1  border-gray-200  flex  ">
      <SideBar />
      {children}
    </div>
  );
}
