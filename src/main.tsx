import ReactDOM from "react-dom/client";
import "./index.css";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports.js";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { router } from "router";

Amplify.configure(awsconfig);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
