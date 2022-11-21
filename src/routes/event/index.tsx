import { FC } from "react";
import { useQuery } from "react-query";
import { api, queryKeys } from "api";
import { CgSpinnerAlt } from "react-icons/cg";
import { formatDate } from "utils/dateHelper";
import { EventSchema } from "api/event/schemas";
import { Link } from "react-router-dom";
import { getKeyData } from "utils/stringTransform";
import { BiLinkExternal } from "react-icons/bi";

const headers = ["Date", "Name", "Registered Attendees", ""];

const EventRoute: FC = () => {
  const { data: events, isLoading } = useQuery([queryKeys.event], () =>
    api.event.getAll()
  );

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between mt-5 mb-3">
        <div className="font-bold text-2xl">Events</div>
      </div>
      <div>
        <Link
          to="/event/new"
          className="inline-flex gap-x-1 items-center px-2 py-1 bg-primary rounded text-white"
        >
          <span>+ New Event</span>
        </Link>
      </div>
      <div className="flex justify-end items-baseline mb-1">
        <div className="text-xs mr-2">
          Total: {events?.length || "0"}
          <span className="ml-1 text-gray-700">events</span>
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
          ) : events?.length ? (
            events?.map((event: EventSchema) => (
              <tr key={event.pk}>
                <td>{formatDate(event.date, "DD MMM YYYY")}</td>
                <td>{getKeyData(event.pk, 1)}</td>
                <td>{event.attendeeCount}</td>
                <td>
                  <Link
                    to={`/event/${event.pk}`}
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

export default EventRoute;
