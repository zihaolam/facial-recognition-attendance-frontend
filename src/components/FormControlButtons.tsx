import { FC } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";

const FormControlButtons: FC<{
  isLoading: boolean;
  reset: () => void;
}> = ({ isLoading, reset }) => (
  <div className="flex gap-x-1 mt-3 justify-end">
    <button
      className="rounded-md flex justify-center items-center bg-gray-500 text-white font-bold hover:ring-2 hover:ring-offset-2 hover:ring-gray-900 mr-1 duration-200 disabled:cursor-not-allowed h-10 w-24"
      type="reset"
      disabled={isLoading}
      onClick={() => reset()}
    >
      Reset
    </button>
    <button
      className="rounded-md flex justify-center items-center bg-gray-900 text-white font-bold hover:ring-2 hover:ring-offset-2 hover:ring-gray-900 disabled:ring-2 disabled:ring-offset-2 disabled:ring-gray-900 mr-1 duration-200 disabled:opacity-90 disabled:cursor-not-allowed h-10 w-24"
      disabled={isLoading}
      type="submit"
    >
      {isLoading ? (
        <CgSpinnerTwoAlt className="h-full animate-spin" />
      ) : (
        "Submit"
      )}
    </button>
  </div>
);

export default FormControlButtons;
