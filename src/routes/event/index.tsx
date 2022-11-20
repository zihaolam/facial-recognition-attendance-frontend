import { FC } from "react";
import { useQuery } from "react-query";
import { api, queryKeys } from "api";
import { CgSpinnerAlt } from "react-icons/cg";
import { formatDate } from "utils/formatDate";
import { getKeyData } from "utils/stringTransform";
import { EventSchema } from "api/event/schemas";

const headers = ["Name", "Date", "Description"];

const EventRoute: FC = () => {
  const { data: events, isLoading } = useQuery([queryKeys.user], () =>
    api.event.getAll()
  );

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-end  ml-2 mt-5">
        <div className="font-bold text-2xl mb-5">Events</div>
        <div>
          Total: {events?.length || "0"}
          <span className="text-sm ml-1 text-gray-700">events</span>
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
                <td>
                  <img className="h-12 w-15 object-cover" src={event.name} />
                </td>
                <td>{formatDate(event.date)}</td>
                <td>{getKeyData(event.description)}</td>
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
