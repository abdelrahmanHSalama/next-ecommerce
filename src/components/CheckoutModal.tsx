interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CheckoutModal = ({ isOpen, onClose }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50
"
        >
            <div className="bg-white rounded-md p-4 w-max shadow-md">
                <p className="mb-4 text-center">⚠️ Please Try Again Later!</p>
                <button
                    onClick={onClose}
                    className="block text-white bg-black border-2 border-black rounded-md px-4 py-2 cursor-pointer hover:text-black hover:bg-white active:text-black active:bg-white transition duration-250 mx-auto"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default CheckoutModal;
