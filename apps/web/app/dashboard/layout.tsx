import { ReactNode } from "react";

export default function ({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
      {/* ideally sidebar should be here not sure we have to check it */}
    </div>
  );
}
