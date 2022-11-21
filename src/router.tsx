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
    loader: () => <Loader isLoading={true} />,
    element: <Routes.LoginRoute />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
    loader: () => <Loader isLoading={true} />,
    children: [
      {
        path: "",
        element: <Routes.UserRoute />,
      },
      // {
      //   path: "attendance",
      //   element: <Routes.AttendanceRoute />,
      // },
      {
        path: "register",
        element: <Routes.RegisterRoute />,
      },
      {
        path: "user",
        element: <Routes.UserRoute />,
      },
      {
        path: "user/:userId",
        element: <Routes.UserShowRoute />,
      },
      {
        path: "event",
        element: <Routes.EventRoute />,
      },
      {
        path: "event/new",
        element: <Routes.NewEventRoute />,
      },
      {
        path: "event/:eventId",
        element: <Routes.EventShowRoute />,
      },
    ],
  },
]);
