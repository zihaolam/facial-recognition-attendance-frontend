import { api } from 'api';
import { CreateEventFormValues } from 'api/event/schemas';
import { useForm } from "react-hook-form";
import { useMutation } from 'react-query';
import { getKeyData } from 'utils/stringTransform';

export const useNewEventForm = () => useForm<CreateEventFormValues>({
    defaultValues: {
      name: "",
      description: "",
      location: "",
      attendeeIds: [],
      date: "",
      startTime: "",
      endTime: "",
      recurrUntil: "",
    },
  });

export const useSubmitNewEvent = () => useMutation((data: CreateEventFormValues) => api.event.create(data))


export const loadUserOptions = () =>
    api.user
      .getAll()
      .then((users) =>
        users?.map((user) => ({ value: user.pk, label: getKeyData(user.pk, 1) }))
      );