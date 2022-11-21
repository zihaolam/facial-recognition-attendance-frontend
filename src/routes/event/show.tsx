import { api, queryKeys } from "api";
import { Loader } from "components";
import { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getKeyData } from "utils/stringTransform";

const EventShowRoute: FC = () => {
  const { eventId } = useParams();
  const { data: event, isLoading } = useQuery(
    [queryKeys.event, eventId],
    () => api.event.getOne(eventId),
    { enabled: Boolean(eventId) }
  );

  return (
    <div className="mt-1 relative">
      <Loader isLoading={isLoading} />
      <h3 className="text-xl font-bold text-center mb-4">{event?.name}</h3>
      <div className="py-4 flex flex-col">
        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
          <div className="col-span-1">
            <div className="font-semibold text-md">Description</div>
            <div>{event?.description}</div>
          </div>
          <div className="col-span-1">
            <div className="font-semibold text-md">Location</div>
            <div>{event?.location}</div>
          </div>
          <div className="col-span-1">
            <div className="font-semibold text-md">Date</div>
            <div>{event?.date}</div>
          </div>
          <div className="col-span-1">
            <div className="font-semibold text-md">Start Time</div>
            <div>{event?.startTime}</div>
          </div>
          <div className="col-span-1">
            <div className="font-semibold text-md">End Time</div>
            <div>{event?.endTime}</div>
          </div>
          <div className="col-span-1">
            <div className="font-semibold text-md">Number of attendees</div>
            <div>{event?.attendeeCount}</div>
          </div>
        </div>
      </div>

      <h4 className="font-semibold text-md mb-2 mt-8 text-center">
        Registered Attendees
      </h4>
      <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                <div className="flex items-center gap-2"></div>
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                <div className="flex items-center gap-2">Name</div>
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                <div className="flex items-center justify-center gap-2">
                  Status
                </div>
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                <div className="flex items-center justify-center gap-2">
                  Arrival Time
                </div>
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {event?.attendees?.map((attendee) => (
              <tr key={attendee.sk}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  <img
                    className="rounded-full w-10 h-10 object-cover border border-gray-200"
                    src={attendee.faceImagePath}
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {getKeyData(attendee.sk, 2)}
                </td>
                <td className="whitespace-nowrap text-center px-4 py-2 text-gray-700">
                  {Boolean(attendee.arrivalTime) ? (
                    <strong className="rounded bg-green-100 px-2 py-1.5 text-xs font-medium text-green-700">
                      Checked-in
                    </strong>
                  ) : (
                    <strong className="rounded bg-red-100 px-2 py-1.5 text-xs font-medium text-amber-700">
                      Not checked-in
                    </strong>
                  )}
                </td>
                <td
                  className={`whitespace-nowrap text-center px-4 py-2 ${
                    attendee.arrivalTime ? "text-gray-700" : "text-gray-400"
                  }`}
                >
                  {attendee.arrivalTime || "None"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventShowRoute;
