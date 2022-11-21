import { UserSchema } from 'api/user/schemas';

export interface AttendeeSchema extends UserSchema {
  arrivalTime: string;
  sk: string
}


export interface EventSchema {
  pk: string
  name: string;
  location: string;
  description: string;
  date: string
  startTime: string;
  endTime: string;
  attendees: AttendeeSchema[]
  attendeeCount: number
}

export interface CreateEventFormValues {
  date: string;
  startTime: string;
  endTime: string;
  name: string;
  location: string;
  description: string;
  attendeeIds: string[];
  recurrUntil: string;
}

export const defaultCreateEventFormValues: CreateEventFormValues = {
  name: "",
  location: "",
  date: "",
  endTime: "",
  startTime: "",
  attendeeIds: [],
  description: "",
  recurrUntil: "",
};