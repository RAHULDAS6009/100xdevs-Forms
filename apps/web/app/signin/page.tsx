"use client";
import { Input } from "@repo/ui/input";
import { MdMail } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiAlignLeft, RiLockPasswordFill } from "react-icons/ri";
import { FaCircleArrowLeft } from "react-icons/fa6";

import Button from "@repo/ui/button";
import { redirect } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../_components/pages/EditPage";

export default function Page({ type }: { type: "signin" | "signup" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Button
        onClick={() => {
          redirect("/");
        }}
        variant="secondary"
        className="fixed top-10 left-10 hover:bg-neutral-300"
      >
        <FaCircleArrowLeft size={40} />
      </Button>
      <div className="flex flex-col gap-5">
        {type == "signup" && (
          <div className="flex flex-col gap-2">
            <LabelComponent label="Name" />
            <Input
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Type Name"
              position="left"
              icon={<IoPersonCircleSharp size={20} />}
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <LabelComponent label="Email" />
          <Input
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Type email"
            position="left"
            icon={<MdMail size={20} />}
          />
        </div>

        <div className="flex flex-col gap-2">
          <LabelComponent label="Password" />

          <Input
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            position="left"
            placeholder="Type email"
            icon={<RiLockPasswordFill size={20} />}
          />
        </div>

        <Button
          variant="primary"
          onClick={async () => {
            const res = await axios.post(`${BACKEND_URL}/${type}`, {
              name: form.name,
              email: form.email,
              password: form.password,
            });

            console.log(res);

            type == "signin" &&
              localStorage.setItem("token", "Bearer " + res.data.token);
          }}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}

export function LabelComponent({ label }: { label: string }) {
  return <span className="font-normal  labelAnimate  ">{label}</span>;
}
