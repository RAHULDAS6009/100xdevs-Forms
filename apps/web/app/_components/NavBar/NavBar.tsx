import Button from "@repo/ui/button";
import Logo from "../../../components/Logo";
import { redirect } from "next/navigation";
import Link from "next/link";
import LoadingIndicator from "../../../components/LoadingIndicator";

export default function NavBar() {
  return (
    <div className="w-full flex justify-between p-4 items-center">
      <Logo />

      <div className="flex gap-4">
        {[
          { title: "Pricing", route: "/" },
          { title: "Login", route: "/signin" },
          { title: "Sign up", route: "/signup" },
        ].map((item, index) => {
          return (
            <Button
              variant="secondary"
              onClick={() => {
                redirect(`${item.route}`);
              }}
              key={index}
            >
              {item.title}
            </Button>
          );
        })}
        <Button variant="primary" onClick={() => redirect("/create")}>
          {/* <Link href={"/create"} prefetch={false}> */}
          Create form
          {/* <LoadingIndicator /> */}
          {/* </Link> */}
        </Button>
      </div>
    </div>
  );
}
