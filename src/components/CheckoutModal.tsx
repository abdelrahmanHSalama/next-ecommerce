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
            <div className="bg-white rounded-md p-8 w-max shadow-md flex flex-col">
                <p className="mb-4 text-center">
                    ⌚<br></br>Please Try Again Later!
                </p>
                <button
                    className="bg-white border-2 border-black rounded-md py-2 px-4 lg:hover:text-white lg:hover:bg-black transition duration-250 cursor-pointer"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default CheckoutModal;
