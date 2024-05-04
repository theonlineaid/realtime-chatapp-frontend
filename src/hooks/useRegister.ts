import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/AuthContext";

interface SignupData {
    fullName: string;
    userName: string;
    password: string;
    confirmPassword: string;
    gender: string;
}

interface SignupResult {
    loading: boolean;
    register: (data: SignupData) => Promise<void>;
    userData: any;
}

const useRegister = (): SignupResult => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const { setAuthUser } = useAuthContext();

    const register = async ({ fullName, userName, password, confirmPassword, gender }: SignupData) => {
        const success = handleInputErrors({ fullName, userName, password, confirmPassword, gender });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/v1/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, userName, password, confirmPassword, gender }),
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            setUserData(data); 
            setAuthUser(data);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, register, userData};
};

function handleInputErrors({ fullName, userName, password, confirmPassword, gender }: SignupData): boolean {
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}

export default useRegister;
