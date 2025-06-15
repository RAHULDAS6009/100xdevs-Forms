import Button from "@repo/ui/button";

export default function DashBoard() {
  return (
    <div className="mx-auto">
      <Button variant="primary" className="flex gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Create a form
      </Button>
    </div>
  );
}
