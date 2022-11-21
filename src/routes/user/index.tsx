import { FC } from "react";
import { useQuery } from "react-query";
import { api, queryKeys } from "api";
import { CgSpinnerAlt } from "react-icons/cg";
import { UserSchema } from "api/user/schemas";
import { getKeyData } from "utils/stringTransform";
import { formatDate } from "utils/dateHelper";
import { Link } from "react-router-dom";
import { BiLinkExternal } from "react-icons/bi";

const headers = ["Image", "Created At", "Name", ""];

const UserRoute: FC = () => {
  const { data: users, isLoading } = useQuery([queryKeys.user], () =>
    api.user.getAll()
  );

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-end  ml-2 mt-5">
        <div className="font-bold text-2xl mb-5">Users</div>
        <div className="text-xs mr-2">
          Total: {users?.length || "0"}
          <span className="text-sm ml-1 text-gray-700">users</span>
        </div>
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4} className="text-center">
                <CgSpinnerAlt className="w-8 h-8 animate-spin mx-auto" />
              </td>
            </tr>
          ) : users?.length ? (
            users?.map((user: UserSchema) => (
              <tr key={user.pk}>
                <td>
                  <img
                    className="w-12 h-12 object-cover rounded-full border border-gray-300"
                    src={user.faceImagePath}
                  />
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td>{getKeyData(user.pk, 1)}</td>
                <td>
                  <Link
                    to={`/user/${user.pk}`}
                    className="inline-flex gap-x-1 items-center px-2 py-1 bg-primary rounded text-white"
                  >
                    <span>View</span>
                    <BiLinkExternal />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-gray-600">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserRoute;
