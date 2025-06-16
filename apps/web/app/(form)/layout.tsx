"use client";
import { ReactNode, useState } from "react";
import SideBar from "../_components/SideBar";
import { useForms } from "../_hooks/useGetForms";

export default function ({ children }: { children: ReactNode }) {
  useForms();

  return (
    <div className="fixed w-full  bg-[#ffffff] border-r-1  border-gray-200  flex  ">
      <SideBar />
      {children}
    </div>
  );
}
