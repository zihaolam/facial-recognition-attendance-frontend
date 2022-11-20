import { FC } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";

const Loader: FC = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <CgSpinnerTwoAlt className="w-12 h-12 text-gray-300 animate-spin" />
    </div>
  );
};

export default Loader;
