"use client";
import { Input } from "@repo/ui/input";
import { MdMail } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import Button from "@repo/ui/button";

export default function AuthLayout({ type }: { type: "signin" | "signup" }) {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <LabelComponent label="Name" />
          <Input
            placeholder="Type email"
            position="left"
            icon={<IoPersonCircleSharp size={20} />}
          />
        </div>

        <div className="flex flex-col gap-2">
          <LabelComponent label="Email" />
          <Input
            placeholder="Type email"
            position="left"
            icon={<MdMail size={20} />}
          />
        </div>

        <div className="flex flex-col gap-2">
          <LabelComponent label="Password" />

          <Input
            position="left"
            placeholder="Type email"
            icon={<RiLockPasswordFill size={20} />}
          />
        </div>

        <Button variant="primary">Sign I n</Button>
      </div>
    </div>
  );
}

export function LabelComponent({ label }: { label: string }) {
  return <span className="font-normal  labelAnimate  ">{label}</span>;
}
