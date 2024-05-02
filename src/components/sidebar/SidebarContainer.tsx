import SearchInput from './SearchInput'
import LogoutButton from './LogoutButton'
import Convertations from './Convertations'

export default function SidebarContainer() {
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <SearchInput />
            <div className="divider px-3"></div>
            <Convertations />
            <LogoutButton />
        </div>
    )
}
