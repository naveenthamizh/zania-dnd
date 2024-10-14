import ReactDOM from "react-dom";
import { MdClose } from "react-icons/md";

import { TModalProps } from "./types";

import { useCallback, useEffect } from "react";
import styles from "./modal.module.css";

export const Modal = (props: TModalProps): JSX.Element => {
  const { onClose, open, children } = props;

  const rootElement = document.getElementById("root");

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
  return open && rootElement ? (
    ReactDOM.createPortal(
      <div className={styles.modalContainer}>
        <div className={styles.scrim} onClick={onClose} />

        <div className={styles.childrenContainer}>
          {onClose && (
            <div className={styles.iconClose}>
              <MdClose onClick={onClose} />
            </div>
          )}
          {children}
        </div>
      </div>,
      rootElement
    )
  ) : (
    <></>
  );
};
