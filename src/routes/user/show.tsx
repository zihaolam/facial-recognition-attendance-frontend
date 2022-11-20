import { api, queryKeys } from "api";
import { Loader } from "components";
import { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getKeyData } from "utils/stringTransform";

const UserShowRoute: FC = () => {
  const { userId } = useParams();
  const { data: user, isLoading: isLoadingUser } = useQuery(
    [queryKeys.user, userId],
    () => api.user.getOne(userId!),
    { enabled: Boolean(userId) }
  );

  if (isLoadingUser) return <Loader />;

  return (
    <main className="flex flex-col">
      <div className="bg-gray-100 rounded-xl px-10 py-7">
        <div className="font-bold text-2xl">{getKeyData(user?.pk)}</div>
        <div className="">Classes Attended:</div>
      </div>
    </main>
  );
};

export default UserShowRoute;
