import Button from "@repo/ui/button";
import Logo from "../../../components/Logo";
import { redirect, useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
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
              key={index}
              onClick={() => router.push(`${item.route}`)}
            >
              {item.title}
            </Button>
          );
        })}
        <Button variant="primary" onClick={() => router.push("/create")}>
          {/* <Link href={"/create"} prefetch={false}> */}
          Create form
          {/* <LoadingIndicator /> */}
          {/* </Link> */}
        </Button>
      </div>
    </div>
  );
}
