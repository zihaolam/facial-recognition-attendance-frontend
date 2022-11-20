import { FC } from "react";
import { login } from "utils/auth";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { LoginFormValues, useLoginForm } from "./forms";

const LoginRoute: FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useLoginForm();

  const { mutate, isLoading } = useMutation(
    ({ username, password }: LoginFormValues) =>
      login(username, password).then(() => navigate("/"))
  );

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Pattern"
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main
          aria-label="Main"
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <div className="text-right relative text-2xl xl:-mt-12 font-bold text-gray-900 sm:text-3xl md:text-4xl">
              <span>Attendance Dashboard</span>
              <span className="text-xs leading-relaxed font-medium absolute -bottom-4 text-gray-500 right-0">
                Powered by Amazon Rekognition.
              </span>
            </div>

            <form
              onSubmit={handleSubmit((data) => mutate(data))}
              className="flex flex-col space-y-4 items-end mt-12"
            >
              <input
                type="text"
                placeholder="Username"
                {...register("username", {
                  required: { value: true, message: "Username is required" },
                })}
                className="w-full rounded-md border-gray-200 bg-white text-center placeholder:text-gray-400 shadow-sm"
              />
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                })}
                className="w-full rounded-md border-gray-200 bg-white text-center placeholder:text-gray-400 shadow-sm"
              />
              <button
                className="inline-block shrink-0 rounded-md bg-blue-600 w-full mt-2 py-3 text-sm font-medium text-white transition hover:bg-blue-200 hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 disabled:bg-blue-200"
                type="submit"
                disabled={isLoading}
              >
                Log in
              </button>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default LoginRoute;
