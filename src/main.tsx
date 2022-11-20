import ReactDOM from "react-dom/client";
import "./index.css";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./aws-exports.js";
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import { Loader } from "components";
import { QueryClient, QueryClientProvider } from "react-query";
import { FC, ReactNode, useEffect, useState } from "react";
import { checkLoggedIn } from "utils/auth";
import { router } from "router";

Amplify.configure(awsconfig);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
