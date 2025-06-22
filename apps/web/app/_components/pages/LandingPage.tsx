"use client";
import { Hero } from "../NavBar/Hero";
import NavBar from "../NavBar/NavBar";
import DownloadCSV from "../../../components/DownloadCSV";
const data =
  "Name,Age,Profession\nJohn Doe,30,Developer\nJane Smith,25,Designer";

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
