"use client";
import { useState } from "react";

export default function SideBar() {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <>
      {!open && (
        <img
          className="bg-slate-100 size-6 p-1 rounded-md"
          onClick={() => setOpen(true)}
          src={"rightdoublearrow.svg"}
          alt="sww"
        />
      )}
      <div
        className={`${open ? "w-72  translate-x-8 " : "w-0  translate-x-0 overflow-hidden   invisible"} group    ease-in-out transition-all duration-200 transform 
  h-full border-r-2 border-gray-200`}
      >
        <div className="flex justify-between ">
          Rahul{" "}
          <div className={` invisible group-hover:visible   `}>
            <img
              onClick={() => setOpen(false)}
              className="hover:bg-slate-100 size-6 p-1 rounded-md"
              src={"leftdoublearrow.svg"}
              alt="sww"
            />
          </div>
        </div>
        <div>Workspace</div>
        <div>form1 1</div>

        <div>form 2</div>

        <div>form 3</div>
      </div>
    </>
  );
}
