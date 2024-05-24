import SearchInput from "./SearchInput";
import LogoutButton from "./LogoutButton";
import Conversations from "./Conversations";

export default function SidebarContainer() {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
}
