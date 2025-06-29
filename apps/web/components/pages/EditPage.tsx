"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import EditorPreview from "../EditorPreview";
import { Editor } from "../DynamicEditor";
import Button from "@repo/ui/button";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { updateForm } from "../../lib/slices/FormSlice";
import axios from "axios";
import { redirect, usePathname } from "next/navigation";
export const BACKEND_URL = "http://localhost:5005";

export default function EditPage({ formid }: { formid: string }) {
  const router = usePathname();
  if (!formid) return <div>No blocks</div>;
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
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
          ? "fixed inset-0 overflow-y-auto z-50 bg-white scale-110 opacity-100"
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
                setLoading(true);

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

                redirect(`/r/${formid}`);
              }}
            >
              {loading ? (
                <>
                  <div role="status" className="px-6 ">
                    <svg
                      aria-hidden="true"
                      className="w-6 h-5   text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </>
              ) : (
                "Publish"
              )}
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
            // value={findForm?.title}
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
