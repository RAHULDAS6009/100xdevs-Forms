"use client";
import { KeyboardEventHandler, useEffect, useState } from "react";

export default function SideBar() {
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.ctrlKey && e.key === "/") {
        console.log("I am here");
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

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
        tabIndex={0}
        className={`${open ? "w-72  translate-x-8 " : "w-0  translate-x-0 overflow-hidden   invisible"} group  outline-none   ease-in-out transition-all duration-200 transform 
  h-full border-r-2 border-gray-200`}
      >
        <div className="flex justify-between ">
          Rahul{" "}
          <div className={` invisible group-hover:visible   `}>
            <img
              onClick={() => setOpen(false)}
              className="transition transform ease-in-out duration-200 cursor-pointer hover:bg-slate-100 size-6 p-1 rounded-md"
              src={"leftdoublearrow.svg"}
              alt="sww"
            ></img>
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
