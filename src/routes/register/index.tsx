import { RegistrationForm } from "components";
import { FC } from "react";

const RegisterRoute: FC = () => {
  return (
    <div>
      <div className="font-bold text-2xl my-5 ml-2">Batch Upload</div>
      <RegistrationForm />
    </div>
  );
};

export default RegisterRoute;
