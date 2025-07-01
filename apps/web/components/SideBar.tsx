"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import { useForms } from "../hooks/useGetForms";

export default function SideBar() {
  const [open, setOpen] = useState<boolean>(true);

  const router = usePathname();

  const forms = useForms() || [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {!(router.split("/")[1] == "r") && !router.endsWith("create") && (
        <div
          className={`${open ? "z-20" : "outline-none border-r-2 border-gray-200"} `}
        >
          {/* Show open button if sidebar is closed */}
          {!open && (
            <Image
              src="/rightdoublearrow.svg"
              alt="Open Sidebar"
              width={20}
              height={20}
              onClick={() => setOpen(true)}
              className="bg-slate-100 p-1 rounded-md cursor-pointer fixed top-3 left-2 "
            />
          )}

          <div
            tabIndex={0}
            className={`
          ${open ? "w-72 " : "w-0  invisible overflow-hidden"}       
          transition-all duration-200 transform ease-in-out
          group/sidebar outline-none border-r-2 border-gray-200 bg-white  h-screen   px-4 py-2
        `}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-600 flex items-center gap-1">
                <Image
                  className={`cursor-pointer transition-all ease-in-out ${!open ? "translate-y-8 -translate-x-3 visible z-20" : "translate-y-0"}`}
                  src="/user-profile.svg"
                  alt="user image"
                  width={28}
                  height={28}
                />
                {"User"}
              </span>

              <div className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200">
                <div className="relative group/arrow ">
                  <Image
                    src="/leftdoublearrow.svg"
                    alt="Close Sidebar"
                    height={20}
                    width={20}
                    onClick={() => setOpen(false)}
                    className="transition-all duration-200 ease-in-out cursor-pointer 
                           hover:bg-slate-100 size-6 p-1 rounded-md"
                  />
                  <div
                    className="absolute mt-2 px-2 py-1 translate-x-1/2 
                           text-xs text-white bg-gray-700 rounded shadow-lg
                           invisible group-hover/arrow:visible group-hover/arrow:translate-x-0 ease-in-out   transition-transform duration-75 
                           whitespace-nowrap "
                  >
                    Close Sidebar <br />
                    <span className="text-gray-300 text-[10px]">Ctrl + /</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-gray-600 font-medium">
              <div
                onClick={() => {
                  redirect("/dashboard");
                }}
              >
                <SideComponent title="Home" />
              </div>
              <div className="text-xs">Workspace</div>
              {forms.allforms.map((form, index) => (
                <SideComponent key={index} title={`${form.title}`} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SideComponent({ title }: { title: string }) {
  return (
    <div className="pl-5 transition-all ease-in-out duration-200 bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 flex justify-between p-1 rounded-md cursor-pointer">
      {title}
      {title !== "Home" && (
        <Image
          className="hover:bg-slate-200 transition-all ease-in-out duration-200 rounded-md p-0.5 cursor-pointer"
          src="/ellipsis-horizontal.svg"
          alt="ellipsis-horizontal"
          width={20}
          height={20}
        />
      )}
    </div>
  );
}
