import Button from "@repo/ui/button";
import Image from "next/image";
import Link from "next/link";
import LoadingIndicator from "../../../components/LoadingIndicator";
export function Hero() {
  return (
    <div className=" flex flex-col  h-[950px] pt-20  p-5">
      <div className="flex flex-col gap-6">
        <div className="text-6xl font-bold text-center">
          The{" "}
          <span className=" relative">
            simplest
            <Image
              className="w-full absolute bottom-0 right-0 mt-2"
              src={"/title-highlight-2.png"}
              width={100}
              height={50}
              alt=""
            />
          </span>{" "}
          way to create forms
        </div>
        <div className="text-2xl font-[500] text-gray-500 text-center max-w-2xl  mx-auto">
          Say goodbye to boring forms. Meet 100XForms — the free, intuitive form
          builder you’ve been looking for.
        </div>
      </div>

      <div className="flex flex-col mx-auto items-center gap-1  pt-16">
        <Link href={"/create"}>
          <Button variant="primary" className="flex items-center gap-3">
            Create a free form
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="size-4 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Button>
        </Link>
        <span className="text-xs text-slate-400">No sign up required</span>
      </div>

      {/*  */}
      <div className="mx-auto max-w-2xl    pt-12 drop-shadow-2xl transition-all ease-in-out duration-300 scale-100 hover:scale-105 cursor-pointer    ">
        <div
          className="h-10 rounded-t-2xl flex gap-2 pt-3
        pl-2 bg-neutral-100
        border-t border-x border-neutral-300

        "
        >
          <div className="rounded-full size-4 bg-neutral-300"></div>
          <div className="rounded-full size-4 bg-neutral-300"></div>
          <div className="rounded-full size-4 bg-neutral-300"></div>
        </div>
        <video
          className="border  border-neutral-300"
          muted
          autoPlay
          loop
          playsInline
        >
          <source
            src="https://tally.so/videos/demo/just-type-card.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
