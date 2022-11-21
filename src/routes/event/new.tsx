import { queryKeys } from "api";
import { CreateEventFormValues, EventSchema } from "api/event/schemas";
import { FormControlButtons, FormInput, FormSelect } from "components";
import { useModal } from "hooks";
import { FC, useState, useRef, useId } from "react";
import { Link } from "react-router-dom";
import { useNewEventForm, useSubmitNewEvent, loadUserOptions } from "./forms";

const NewEventRoute: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useNewEventForm();

  const modalOpenRef = useRef<HTMLLabelElement>(null);
  const modalId = useId();
  const { mutate, isLoading } = useSubmitNewEvent();

  const [createdEvent, setCreatedEvent] = useState<EventSchema>();

  const handleSubmitNewEvent = handleSubmit((data: CreateEventFormValues) =>
    mutate(data, {
      onSuccess: (event) => {
        setCreatedEvent(event);
        modalOpenRef.current?.click();
      },
    })
  );

  return (
    <main className="mt-3">
      <label htmlFor={modalId} className="hidden" ref={modalOpenRef}></label>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">New Event Created</h3>
          <div className="py-4 flex flex-col gap-2">
            <div>
              <div className="font-semibold text-lg">Name</div>
              <div>{createdEvent?.name}</div>
            </div>
            <div>
              <div className="font-semibold text-lg">Description</div>
              <div>{createdEvent?.description}</div>
            </div>
            <div>
              <div className="font-semibold text-lg">Location</div>
              <div>{createdEvent?.location}</div>
            </div>
            <div>
              <div className="font-semibold text-lg">Date</div>
              <div>{createdEvent?.date}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <div className="font-semibold text-lg">Start Time</div>
                <div>{createdEvent?.startTime}</div>
              </div>
              <div className="col-span-1">
                <div className="font-semibold text-lg">End Time</div>
                <div>{createdEvent?.endTime}</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-lg">Number of attendees</div>
              <div>{createdEvent?.attendeeCount}</div>
            </div>
          </div>
          <div className="modal-action">
            <Link
              to={`/event/${createdEvent?.pk}`}
              className="btn btn-info text-white"
            >
              View
            </Link>
            <label htmlFor={modalId} className="btn">
              Close
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <form onSubmit={handleSubmitNewEvent} className="w-3/4">
          <div className="font-bold text-2xl mb-5">New Event</div>
          <div className="flex flex-col items w-full space-y-3">
            <FormInput
              register={register}
              name="name"
              errors={errors}
              label="Title"
              placeholder="Event Title"
              required
            />
            <FormInput
              register={register}
              name="location"
              errors={errors}
              label="Venue"
              placeholder="Event Venue"
              required
            />
            <FormInput
              register={register}
              name="description"
              errors={errors}
              label="Description"
              placeholder="Additional Description"
              required
            />
            <FormInput
              type="date"
              register={register}
              name="date"
              errors={errors}
              label="Date"
              required
            />
            <FormInput
              type="time"
              register={register}
              name="startTime"
              errors={errors}
              label="Start Time"
              required
            />
            <FormInput
              type="time"
              register={register}
              name="endTime"
              errors={errors}
              label="End Time"
              required
            />
            <FormInput
              type="date"
              register={register}
              name="recurrUntil"
              errors={errors}
              label="Recurr Untill"
            />

            <FormSelect
              query={loadUserOptions}
              optionKey={queryKeys.user}
              control={control}
              label="Attendees"
              name="attendeeIds"
            />

            <div className="mt-5">
              <FormControlButtons reset={reset} isLoading={isLoading} />
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default NewEventRoute;
