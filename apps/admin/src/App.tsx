import { RouterProvider } from "react-router";
import "@repo/types";
import "@repo/ui/lib/utils";
import { router } from "./routes";

export function App() {
  return <RouterProvider router={router} />;
}
