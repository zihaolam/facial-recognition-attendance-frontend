import { useForm } from "react-hook-form";

export interface LoginFormValues {
  username: string;
  password: string;
}

export const useLoginForm = () => useForm<LoginFormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });