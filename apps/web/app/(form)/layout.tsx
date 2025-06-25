"use client";
import { ReactNode, useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { useForms } from "../../hooks/useGetForms";

export default function ({ children }: { children: ReactNode }) {
  useForms();

  return (
    <div className="fixed w-full  bg-[#ffffff] border-r-1  border-gray-200  flex  ">
      <SideBar />
      {children}
    </div>
  );
}
