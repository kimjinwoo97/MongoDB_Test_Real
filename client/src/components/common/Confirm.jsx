import React from "react";
import { useRecoilState } from "recoil";
import { confirmState } from "../../atoms/confirmAtom";
const Confirm = () => {
  const [{ isOpen, message, onConfirm, onCancel }, setConfirmState] =
    useRecoilState(confirmState);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm && onConfirm();
    setConfirmState({
      isOpen: false,
      message: "",
      onConfirm: null,
      onCancel: null,
    });
  };

  const handleCancel = () => {
    onCancel && onCancel();
    setConfirmState({
      isOpen: false,
      message: "",
      onConfirm: null,
      onCancel: null,
    });
  };

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <p className="confirm-modalmsg">{message}</p>

        <div className="confirm-modalbtn-container">
          <button
            onClick={handleCancel}
            className="confirm-modalbtn confirm-modalbtn--cancel btn"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="confirm-modalbtn confirm-modalbtn--confirm btn"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
