"use client";
import { Hero } from "../NavBar/Hero";
import NavBar from "../NavBar/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />

      <Hero />

      <div className="mx-auto max-w-2xl my-6 ">
        {/* <Input variant="primary" onChange={() => {}} /> */}
      </div>
    </>
  );
}
