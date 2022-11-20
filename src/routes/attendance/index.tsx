import { FC } from "react";
import { useQuery } from "react-query";
import { api, queryKeys } from "api";
import { AttendanceSchema } from "api/attendance/schemas";
import { CgSpinnerAlt } from "react-icons/cg";
import { formatDate } from "utils/formatDate";

const headers = ["Date", "Image", "Student ID"];

const AttendanceRoute: FC = () => {
  const { data: attendances, isLoading } = useQuery(
    [queryKeys.attendance],
    () => api.attendance.get()
  );

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-end  ml-2 mt-5">
        <div className="font-bold text-2xl mb-5">Attendance</div>
        <div>
          Total: {attendances?.length || "0"}
          <span className="text-sm ml-1 text-gray-700">records</span>
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
          ) : attendances?.length ? (
            attendances?.map((attendance: AttendanceSchema) => (
              <tr key={attendance.sk}>
                <td>{formatDate(attendance.timestamp)}</td>
                <td>
                  <img
                    className="h-12 w-15 object-cover"
                    src={attendance.faceImagePath}
                  />
                </td>
                <td>{attendance.pk}</td>
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

export default AttendanceRoute;
