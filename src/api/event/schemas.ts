export interface EventSchema {
  pk: string
  name: string;
  location: string;
  description: string;
  date: string
}

export interface CreateAttendanceFormValues {
  name: string;
  location: string;
  description: string;
}

export const defaultCreateUserFormValues: CreateAttendanceFormValues = {
  name: "",
  location: "",
  description: ""
};