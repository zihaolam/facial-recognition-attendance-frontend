import { FC } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";

interface LoaderProps {
  isLoading?: boolean;
}

const Loader: FC<LoaderProps> = ({ isLoading = false }) => {
  return isLoading ? (
    <div
      className={`fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-gray-100 bg-opacity-90`}
    >
      <CgSpinnerTwoAlt className="w-12 h-12 text-gray-300 animate-spin" />
    </div>
  ) : null;
};

export default Loader;
