import moment from "moment";

export const formatDate = (timestamp: string) =>
  moment(Number(timestamp)).format("YYYY MMM DD, HH:MM A");
