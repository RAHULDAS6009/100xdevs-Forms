import { redirect } from "next/navigation";

export default async function Page() {
  //may be call the api

  const session = false;
  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/landingpage");
  }
}
