import React, { ReactNode, type JSX } from "react";

export function Card({ children }: { children: ReactNode }): JSX.Element {
  return <div className="text-blue-800 bg-amber-500 underline">{children}</div>;
}
