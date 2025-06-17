"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import EditorPreview from "../EditorPreview";
import { Editor } from "../DynamicEditor";
import Button from "@repo/ui/button";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { setForms, updateForm } from "../../../lib/slices/FormSlice";
import axios from "axios";
import { redirect, usePathname } from "next/navigation";
import { FaCircleArrowLeft } from "react-icons/fa6";
// import { useRouter } from "next/router";
export const BACKEND_URL = "http://localhost:5000";

export default function EditPage({ formid }: { formid?: string }) {
  const router = usePathname();
  if (!formid) return <div>No blocks</div>;
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.form);
  const findForm = state.find((form) => formid == form.id);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleKeyDown = (e: KeyboardEvent) => {};

  useEffect(() => {
    console.log(router);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputRef, open]);

  return (
    <div
      className={`transition-all duration-200 ease-in-out ${
        open
          ? "fixed inset-0 z-50 bg-white scale-110 opacity-100"
          : "relative h-screen overflow-y-auto w-full scale-100 opacity-90"
      }`}
    >
      <div
        className={`fixed  w-full ${open ? "z-80 top-10 right-15" : "z-10 top-0 right-0 bg-white"} flex justify-end gap-5 pr-5 py-2 `}
      >
        <div
          className={"cursor-pointer"}
          onClick={() => {
            setOpen(!open);
          }}
        >
          {!open ? (
            <Button
              variant="secondary"
              onClick={() => {
                dispatch(
                  updateForm({
                    id: String(formid),
                    title: title,
                  })
                );
              }}
            >
              Preview
            </Button>
          ) : (
            <Button variant="outlined">Back to editor</Button>
          )}
        </div>
        {!open && (
          <div className="cursor-pointer">
            <Button
              // disabled={window.location.pathname.endsWith("/create")}
              disabled={router.endsWith("/create")}
              variant="primary"
              className={`${router.endsWith("/create") ? "cursor-not-allowed" : ""}`}
              onClick={async () => {
                console.log(title, "asasas");
                alert("asas");
                const res = await axios.put(
                  `${BACKEND_URL}/form/${formid}`,
                  {
                    title: title,
                    blocks: findForm?.blocks,
                    isPublished: true,
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                console.log(res);
                redirect(`/r/${formid}`);
              }}
            >
              Publish
            </Button>
          </div>
        )}
      </div>
      {/* <Button
        onClick={() => {
          redirect("/");
        }}
        variant="secondary"
        className="fixed top-10 left-10 hover:bg-neutral-300"
      >
        <FaCircleArrowLeft size={40} />
      </Button> */}

      <div className="w-full h-[30%] bg-amber-100 "></div>
      <div className="mx-auto max-w-2xl   h-[70%] ">
        <div className="-translate-y-15 flex flex-col items-start ">
          <Image
            className=" rounded-full cursor-pointer  translate-0 hover:-translate-y-1 shadow-2xl shadow-slate-400"
            src={"/form-logo.jpg"}
            alt="form logo"
            width={100}
            height={100}
          />
          <input
            tabIndex={-1}
            ref={inputRef}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              console.log(title);
            }}
            className="outline-none text-[50px] font-bold "
            placeholder="Title"
            type="text"
          />
          <div className=" -translate-x-18 w-full">
            {open ? (
              <EditorPreview formid={formid} />
            ) : (
              <Editor formid={formid} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
