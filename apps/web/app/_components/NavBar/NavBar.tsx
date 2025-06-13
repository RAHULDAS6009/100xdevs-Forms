import Button from "@repo/ui/button";
import Logo from "../../../components/Logo";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="w-full flex justify-between p-4 items-center">
      <Logo />

      <div className="flex gap-4">
        {["Pricing", "Login", "Sign up"].map((item, index) => {
          return (
            <Button variant="secondary" key={index}>
              {item}
            </Button>
          );
        })}
        <Button variant="primary">
          <Link href={"/create"}>Create form</Link>
        </Button>
      </div>
    </div>
  );
}
