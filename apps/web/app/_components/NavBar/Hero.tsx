import Button from "@repo/ui/button";
export function Hero() {
  return (
    <div className=" flex flex-col justify-between h-[350px] pt-20  p-5">
      <div className="flex flex-col gap-6">
        <div className="text-6xl font-bold text-center">
          The simplest way to create forms
        </div>
        <div className="text-2xl font-[500] text-gray-500 text-center max-w-2xl  mx-auto">
          Say goodbye to boring forms. Meet 100XForms — the free, intuitive form
          builder you’ve been looking for.
        </div>
      </div>

      <div className="flex flex-col mx-auto items-center gap-1 ">
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
        <span className="text-xs text-slate-400">No sign up required</span>
      </div>
    </div>
  );
}
