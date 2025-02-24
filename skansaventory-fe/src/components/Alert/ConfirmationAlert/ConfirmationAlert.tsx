import { FC, memo } from "react";

interface ConfirmationAlertProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmationAlert: FC<ConfirmationAlertProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirmation",
    message = "Are you sure you want to proceed?",
    confirmText = "Yes, Proceed",
    cancelText = "Cancel"
}) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
                    <div className="modal-box relative bg-white rounded-lg shadow-lg w-96 p-6">
                        <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
                        <p className="py-4 text-slate-600">{message}</p>
                        <div className="modal-action flex justify-end space-x-2">
                            <button
                                className="btn rounded-full bg-slate-900 text-white"
                                onClick={onConfirm}
                            >
                                {confirmText}
                            </button>
                            <button
                                className="btn btn-outline rounded-full"
                                onClick={onClose}
                            >
                                {cancelText}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default memo(ConfirmationAlert);
