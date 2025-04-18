import { signIn } from "next-auth/react";
import { useEffect } from "react";

interface SigninModalProps {
    isOpen: boolean;
    onClose?: () => void;
}

const SigninModal = ({ isOpen, onClose }: SigninModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-100">
            <button onClick={() => signIn("google")}>Signin</button>
        </div>
    );
};

export default SigninModal;
