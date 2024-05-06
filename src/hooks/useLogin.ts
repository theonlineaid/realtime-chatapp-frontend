import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/AuthContext";

interface LoginResult {
  loading: boolean;
  login: (userName: string, password: string) => Promise<void>;
}

const useLogin = (): LoginResult => {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();

  const login = async (userName: string, password: string): Promise<void> => {
    const success = handleInputErrors(userName, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      console.log(data)

    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors(userName: string, password: string): boolean {
  if (!userName || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
