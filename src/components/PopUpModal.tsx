import { ReactElement } from "react";
import { PopUpModalProps } from "../interfaces/global.interfaces";
import Button from "./Button";

function PopUpModal(props: Readonly<PopUpModalProps>): ReactElement {
  const { title, messageText, messageTheme, onConfirm, onClose } = props;

  const handleModalClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleModalAccept = () => {
    if (onConfirm) {
      onConfirm();
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="modal show fade d-block bg-dark bg-opacity-75" id="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header" id="modal-header">
            <h5 className="modal-title" id="modal-label">
              {title}
            </h5>
            <Button
              buttonType="outline"
              submitType="button"
              theme="primary"
              size="small"
              buttonId="modal-cross-btn"
              onClick={handleModalClose}
              extraClass="btn-close"
            />
          </div>
          <div className="modal-body" id="modal-body">
            <div className={messageTheme}>{messageText}</div>
          </div>
          <div className="modal-footer" id="modal-footer">
            <Button
              buttonType="solid"
              buttonId="modal-accept-btn"
              name="Yes"
              theme="primary"
              onClick={handleModalAccept}
              size="medium"
            />
            <Button
              buttonType="solid"
              buttonId="modal-close-btn"
              name="No"
              theme="primary"
              onClick={handleModalClose}
              size="medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopUpModal;
