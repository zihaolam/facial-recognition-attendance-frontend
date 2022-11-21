import { FC, ReactNode, useRef, useId } from "react";

type UseModalReturnProps = [FC, FC, () => void, () => void];

const useModal = (body: ReactNode): UseModalReturnProps => {
  const modalOpenButtonRef = useRef<HTMLLabelElement>(null);
  const modalCloseButtonRef = useRef<HTMLLabelElement>(null);
  const modalId = useId();

  const open = () => modalOpenButtonRef.current?.click();
  const close = () => modalCloseButtonRef.current?.click();

  const ModalControls = () => (
    <>
      <label
        htmlFor={modalId}
        className="hidden"
        ref={modalOpenButtonRef}
      ></label>
      <input type="checkbox" id={modalId} className="modal-toggle" />
    </>
  );

  const Component = () => (
    <div className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">New Event Created</h3>
        <div className="py-4 flex flex-col gap-2">{body}</div>

        <div className="modal-action">
          <label htmlFor={modalId} ref={modalCloseButtonRef} className="btn">
            Close
          </label>
        </div>
      </div>
    </div>
  );

  return [Component, ModalControls, open, close];
};

export default useModal;
