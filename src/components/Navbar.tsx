import { FC, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaPlusCircle, FaRegClipboard } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import AWSLogo from "assets/aws_logo.png";

const NavbarItem: FC<{
  icon: ReactNode;
  onClick: () => void;
  title: string;
  hoverState: boolean;
}> = ({ icon, onClick, title, hoverState }) => (
  <button
    className={`font-semibold relative text-white  p-4 hover:rounded-r-none group shadow-lg ${
      hoverState
        ? "bg-white text-secondary rounded-2xl"
        : "rounded-xl hover:bg-gray-700"
    } duration-100`}
    onClick={onClick}
  >
    {icon}
    <span
      className={`absolute top-1/2 -translate-y-1/2 -ml-2 left-full whitespace-nowrap group-hover:opacity-100 opacity-0 duration-150 bg-gray-700 px-5 rounded-r-xl py-4 text-sm text-white shadow-lg
    ${hoverState ? "bg-white text-secondary" : "hover:bg-gray-700"}`}
    >
      {title}
    </span>
  </button>
);

const routes = [
  { Icon: FaUser, path: "user", title: "Users" },
  { Icon: FaRegClipboard, path: "", title: "Attendance" },
  { Icon: FaPlusCircle, path: "register", title: "Register User" },
  { Icon: MdEvent, path: "event", title: "Event" },
];

const Navbar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <div className="w-32"></div>
      <div className="w-20 mx-6 mt-4 bg-secondary h-[calc(100vh-32px)] fixed z-50 flex flex-col rounded-2xl">
        <div className="mx-3 mt-8 flex justify-center">
          <img src={AWSLogo} alt="aws logo" className="w-8" />
        </div>
        <div className="flex flex-col items-center mt-6 space-y-3">
          {routes.map(({ path, Icon, title }, index) => (
            <NavbarItem
              onClick={() => navigate("/" + path)}
              key={title + index}
              icon={<Icon className="w-5 h-5 z-50" />}
              title={title}
              hoverState={location.pathname.split("/")[1] === path}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
