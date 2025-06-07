"use client";

import { Provider } from "react-redux";
import { store } from "../../lib/store";
import { MantineProvider } from "@mantine/core";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider>
      <Provider store={store}>{children}</Provider>
    </MantineProvider>
  );
}
