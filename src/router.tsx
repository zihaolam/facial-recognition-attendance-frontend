import { FC, useEffect, ReactNode, useState } from "react";
import { Loader } from "components";
import * as Routes from "routes";
import { useNavigate, createBrowserRouter } from "react-router-dom";
import { checkLoggedIn } from "utils/auth";
import Home from "Home";

const Protected: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  useEffect(() => {
    checkLoggedIn()
      .catch(() => navigate("/login"))
      .finally(() => setCheckingAuth(false));
  }, []);

  if (checkingAuth) return <Loader />;
  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: "/login",
    loader: Loader,
    element: <Routes.LoginRoute />,
  },
  {
    path: "/",
    element: <Home />,
    loader: Loader,
    children: [
      {
        path: "",
        element: (
          <Protected>
            <Routes.AttendanceRoute />
          </Protected>
        ),
      },
      {
        path: "register",
        element: (
          <Protected>
            <Routes.RegisterRoute />
          </Protected>
        ),
      },
      {
        path: "user",
        element: (
          <Protected>
            <Routes.UserRoute />
          </Protected>
        ),
      },
      {
        path: "user/:userId",
        element: (
          <Protected>
            <Routes.UserShowRoute />
          </Protected>
        ),
      },
      {
        path: "event",
        element: (
          <Protected>
            <Routes.EventRoute />
          </Protected>
        ),
      },
      {
        path: "event/:eventId",
        element: (
          <Protected>
            <Routes.EventShowRoute />
          </Protected>
        ),
      },
    ],
  },
]);
