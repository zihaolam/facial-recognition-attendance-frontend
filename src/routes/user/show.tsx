import { api, queryKeys } from "api";
import { Loader } from "components";
import { FC, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getKeyData } from "utils/stringTransform";
import { Line } from "react-chartjs-2";

import { getAllDaysInMonth } from "utils/dateHelper";
import LineGraph from "./chart";

const dateNow = new Date();
const daysInMonth: [string, number][] = getAllDaysInMonth(
  dateNow.getFullYear(),
  dateNow.getMonth()
).map((day) => [day, 0]);

const UserShowRoute: FC = () => {
  const { userId } = useParams();
  const [attendanceDataset, setAttendanceDataset] = useState<
    Map<string, number>
  >(new Map<string, number>());

  const [registeredDataset, setRegisteredDataset] = useState<
    Map<string, number>
  >(new Map<string, number>());

  const [loadingGraph, setLoadingGraph] = useState<boolean>(true);

  const incrementDatasetValue = (map: Map<string, number>, k: string) =>
    map.set(k, map.get(k)! + 1);

  const { data: user, isLoading: isLoadingUser } = useQuery(
    [queryKeys.user, userId],
    () => api.user.getOne(userId!),
    {
      enabled: Boolean(userId),
      onSuccess: (data) => {
        const _attendanceDataset = new Map<string, number>(daysInMonth);
        const _registeredDataset = new Map<string, number>(daysInMonth);

        data.attendances.forEach((attendance) => {
          if (attendance.arrivalTime)
            incrementDatasetValue(_attendanceDataset, attendance.date);
          incrementDatasetValue(_registeredDataset, attendance.date);
        });

        setRegisteredDataset(_registeredDataset);
        setAttendanceDataset(_attendanceDataset);
        setLoadingGraph(false);
      },
    }
  );

  const eventsParticipated = useMemo(
    () =>
      user?.attendances?.reduce(
        (acc, attendance) => (acc += Boolean(attendance.arrivalTime) ? 1 : 0),
        0
      ) || 0,
    [user]
  );

  const participationRate =
    (eventsParticipated / user?.attendances.length!) * 100;

  if (isLoadingUser) return <Loader />;

  return (
    <main className="flex flex-col">
      <Loader isLoading={loadingGraph || isLoadingUser} />
      <Link
        to="/user"
        className="hover:underline duration-200 mb-4 mt-1 font-semibold text-secondary"
      >
        &lt; Back to Users
      </Link>
      <div className="h-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-100 rounded-t-xl"></div>
      <div className="flex flex-col space-x-3 items-center -mt-24">
        <img
          src={user?.faceImagePath}
          className="w-32 h-32 object-cover rounded-full ml-1 border-4 border-gray-500 border-opacity-10"
        />
        <div className="font-semibold text-2xl mb-2 text-secondary">
          {getKeyData(user?.pk, 1)}
        </div>
      </div>

      <div className="border border-gray-200 -mt-[72px] border-t-0 rounded-b-xl pb-8">
        <div className="flex items-start justify-center space-x-12 mt-20 px-4 pb-4">
          <div className="flex space-x-6">
            <div className="stats">
              <div className="stat bg-gradient-to-r from-orange-200 via-orange-100 to-orange-100">
                <div className="stat-title">Events Registered:</div>
                <div className="stat-value">{user?.attendances.length}</div>
              </div>
            </div>
            <div className="stats">
              <div className="stat bg-gradient-to-r from-orange-200 via-orange-100 to-orange-100">
                <div className="stat-title">Events Participated:</div>
                <div className="stat-value">{eventsParticipated}</div>
              </div>
            </div>
            <div className="stats">
              <div className="stat bg-gradient-to-r from-orange-200 via-orange-100 to-orange-100">
                <div className="stat-title">Participation Rate:</div>
                <div className="stat-value">
                  {Number.isNaN(participationRate) ? 0 : participationRate}%
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 px-6">
          <div className="rounded-xl shadow-lg bg-gradient-to-r from-orange-200 via-orange-100 to-orange-100 flex-1">
            <div className="px-5 py-3">
              <div className="stat-title text-center">Events Attended</div>
              <LineGraph
                data={{
                  labels: [...attendanceDataset.keys()],
                  datasets: [
                    {
                      label: "Events Attended",
                      data: [...attendanceDataset.values()],
                    },
                  ],
                }}
              />
            </div>
          </div>
          <div className="rounded-xl shadow-lg bg-gradient-to-r from-orange-200 via-orange-100 to-orange-100 flex-1">
            <div className="px-5 py-3">
              <div className="stat-title text-center">Events Registered</div>
              <LineGraph
                data={{
                  labels: [...registeredDataset.keys()],
                  datasets: [
                    {
                      label: "Events Attended",
                      data: [...registeredDataset.values()],
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserShowRoute;
