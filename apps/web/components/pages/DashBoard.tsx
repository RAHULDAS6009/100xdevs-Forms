"use client";
import Button from "@repo/ui/button";
import axios from "axios";
import { BACKEND_URL } from "./EditPage";
import { redirect } from "next/navigation";
import { useForms } from "../../hooks/useGetForms";
import { Form } from "../../types";
import { useAppDispatch } from "../../lib/hooks";
import { addForm } from "../../lib/slices/FormSlice";
import { ReactNode } from "react";
import { Input } from "@repo/ui/input";
import { CiSearch } from "react-icons/ci";

export default function DashBoard() {
  const { allforms, loading } = useForms() || [];

  const dispatch = useAppDispatch();

  return (
    <div className="w-full max-w-4xl mx-auto pt-10">
      <div className="flex">
        <Button
          variant="primary"
          onClick={async () => {
            const res = await axios.post(
              `${BACKEND_URL}/form`,
              {
                title: "Untitled",
              },
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            );
            console.log(res);
            dispatch(addForm(res.data.form));
            redirect(`/forms/${res.data.form.id}/edit`);
          }}
          className="flex gap-2 items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Create a form
        </Button>
        <Input
          placeholder="Search here"
          type="text"
          position="right"
          icon={<CiSearch />}
        />
      </div>

      <div className="flex flex-col gap-5 pt-10">
        {loading && <div>loading..........</div>}
        {allforms.map((form: Form, index) => {
          return (
            <div
              key={index}
              className="rounded-md p-4 bg-neutral-100 hover:bg-neutral-200 flex justify-between items-center"
            >
              <span className="font-medium text-neutral-400">{form.title}</span>
              <div className="flex gap-3 h-full">
                <Button2 onClick={() => redirect(`forms/${form.id}/edit`)}>
                  Edit
                </Button2>
                {form.isPublished && (
                  <>
                    <Button2
                      onClick={() => {
                        redirect(`/r/${form.id}`);
                      }}
                    >
                      Link
                    </Button2>
                    <Button2
                      onClick={() => {
                        redirect(`/forms/${form.id}/submissions `);
                      }}
                    >
                      Submission
                    </Button2>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Button2({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="text-slate-400 rounded-md px-4 font-normal hover:bg-neutral-300 py-0.5 h-full cursor-pointer "
      onClick={onClick}
    >
      {children}
    </button>
  );
}
