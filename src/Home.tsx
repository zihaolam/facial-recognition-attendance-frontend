import { Navbar } from "components";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="m-5 flex-1 z-40 bg-gray">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
