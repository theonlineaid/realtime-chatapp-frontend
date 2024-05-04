import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/AuthContext";

interface LoginResult {
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  userData: any;
}

const useLogin = (): LoginResult => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const { setAuthUser } = useAuthContext();

  const login = async (username: string, password: string): Promise<void> => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      setUserData(data); 

    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login, userData };
};

export default useLogin;

function handleInputErrors(username: string, password: string): boolean {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
