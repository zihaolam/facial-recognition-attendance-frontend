import { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  CreateUserFormValues,
  defaultCreateUserFormValues,
  UserSchema,
} from "api/user/schemas";
import { api } from "api";
import { encodeFileAsBase64 } from "utils/fileHelper";
import { useMutation } from "react-query";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { getKeyData } from "utils/stringTransform";

const processInput = async (file: File) => ({
  faceImage: await encodeFileAsBase64(file),
  fullName: file.name?.split(".")[0],
});

function RegistrationForm() {
  const { handleSubmit, control, reset } = useForm<CreateUserFormValues>({
    defaultValues: defaultCreateUserFormValues,
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: "faceImages",
  });

  const [successfulSignups, setSuccessfulSignups] = useState<UserSchema[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalOpenRef = useRef<HTMLLabelElement>(null);

  const { mutate, isLoading } = useMutation((data: CreateUserFormValues) =>
    api.user.create(data).then((response) => {
      setSuccessfulSignups(response);
      modalOpenRef.current?.click();
      reset();
    })
  );

  const registerUser = (data: CreateUserFormValues) => {
    mutate(data);
  };

  const addFiles = async (files: FileList) => {
    for (const file of files) {
      append(await processInput(file));
    }
  };

  return (
    <>
      <label
        htmlFor="signupSuccessMessage"
        className="hidden"
        ref={modalOpenRef}
      ></label>

      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="signupSuccessMessage"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Successful Registrations</h3>
          <div className="py-4 flex flex-col gap-2">
            {successfulSignups.map(({ pk }) => (
              <span key={pk}>name: {getKeyData(pk)}</span>
            ))}
          </div>
          <div className="modal-action">
            <label htmlFor="signupSuccessMessage" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(registerUser)}>
        <div className="flex mt-5 gap-3">
          <input
            type="file"
            accept="image/*"
            multiple={true}
            onChange={async (e) => {
              if (!e.target.files?.length) return;
              addFiles(e.target.files);
            }}
            ref={fileInputRef}
            className="hidden"
          />
          <div
            className="border-dashed mt-2 border-gray-300 border-2 w-full h-64 rounded-lg flex items-center justify-center"
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={async (e) => {
              e.preventDefault();
              if (!e.dataTransfer.files?.length) return;
              addFiles(e.dataTransfer.files);
            }}
          >
            <div className="flex space-x-4 items-center">
              <div>Drop files here</div>
              <div className="font-semibold text-xl">or</div>
              <button
                className="rounded px-5 py-1.5 text-white bg-gray-700 hover:ring-2 hover:ring-offset-2 hover:ring-gray-500 mr-1 duration-200"
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                Select File
              </button>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex justify-start gap-1 flex-wrap">
            {fields.map((_userInput, index) => (
              <div
                key={index}
                className="w-40 h-40 flex justify-center items-center bg-gray-100 rounded relative duration-200 group"
              >
                <div className="w-full h-full bg-gray-200 bg-opacity-50 absolute opacity-0 group-hover:opacity-100 duration-200 flex items-center justify-center">
                  <button
                    type="button"
                    className="rounded bg-red-600 text-white duration-200 text-xs px-2 py-1"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </div>
                <img
                  src={_userInput.faceImage}
                  className="w-full max-h-full object-cover"
                />
              </div>
            ))}
          </div>
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
        </div>
      </form>
    </>
  );
}

export default RegistrationForm;
