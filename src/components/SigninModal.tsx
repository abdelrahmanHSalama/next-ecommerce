import { signIn } from "next-auth/react";
import { useEffect } from "react";

interface SigninModalProps {
    isOpen: boolean;
    onClose?: () => void;
}

const SigninModal = ({ isOpen, onClose }: SigninModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed flex justify-center items-center z-100">
            <button onClick={() => signIn("google")}>Signin</button>
        </div>
    );
};

export default SigninModal;
