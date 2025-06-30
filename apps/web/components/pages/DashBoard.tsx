"use client";
import Button from "@repo/ui/button";
import axios from "axios";
import { BACKEND_URL } from "./EditPage";
import { redirect } from "next/navigation";
import { useForms } from "../../hooks/useGetForms";
import { Form } from "../../types";
import { useAppDispatch } from "../../lib/hooks";
import { addForm } from "../../lib/slices/FormSlice";

export default function DashBoard() {
  const forms = useForms() || [];
  const dispatch = useAppDispatch();

  return (
    <div className="w-full max-w-4xl mx-auto ">
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
          className="flex gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
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
      </div>

      <div className="flex flex-col gap-5 pt-10">
        {forms.map((form: Form, index) => {
          return (
            <div
              onClick={() => redirect(`forms/${form.id}/edit`)}
              key={index}
              className="rounded-md p-4 bg-neutral-100 hover:bg-neutral-200 flex justify-between"
            >
              <span className="font-medium text-neutral-400">{form.title}</span>
              {form.isPublished ? "Edit" : null}
              {form.isPublished ? "Link" : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
