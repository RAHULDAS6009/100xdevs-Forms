import Button from "@repo/ui/button";
import Logo from "../components/Logo";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NavBar() {
  const router = useRouter();
  return (
    <div className="w-full flex justify-between p-4 items-center">
      <Logo />

      <div className="flex gap-4">
        {[
          { title: "Pricing Section", route: "/" },
          { title: "Login", route: "/signin" },
          { title: "Sign up", route: "/signup" },
        ].map((item, index) => {
          return (
            <Link href={`${item.route}`} key={index}>
              <Button
                variant="secondary"
                key={index}
                // onClick={() => router.push(`${item.route}`)}
              >
                {item.title}
              </Button>
            </Link>
          );
        })}
        <Link href={"/create"}>
          <Button variant="primary">
            {/* <Link href={"/create"} prefetch={false}> */}
            Create form
            {/* <LoadingIndicator /> */}
            {/* </Link> */}
          </Button>
        </Link>
      </div>
    </div>
  );
}
