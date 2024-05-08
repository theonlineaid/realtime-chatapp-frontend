import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../contexts/AuthContext";
export default function NoMsgSelected() {
  const { authUser } = useAuthContext();
  console.log(authUser);

  return (
    <div
      className="flex items-center justify-center w-full h-full"
      style={{ height: "500px" }}
    >
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.userName?.toUpperCase()} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
}
