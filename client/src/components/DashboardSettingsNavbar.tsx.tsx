import { NavLink} from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext';


const DashboardSettingsNavbar = () => {
    const { user } = useAuthContext()

    return (
  
        <div className="text-white uppercase font-bold font-roboto text-center sm:text-left bg-dark_opacity  ">
            <div className="flex flex-col sm:flex-row">

              <NavLink to="/dashboard/profile/settings" className={({ isActive }) => (isActive ?
                'tracking-wide gold_bar px-6 py-3 gradient__gold hover__text__yellow ' :
                'tracking-wide gold_bar px-6 py-3 hover__text__yellow ')}>Zarządzaj Kontem</NavLink>
              <NavLink to="/dashboard/profile/connect" className={({ isActive }) => (isActive ?
                'tracking-wide gold_bar px-6 py-3 gradient__gold hover__text__yellow' :
                'tracking-wide gold_bar px-6 py-3 hover__text__yellow ')}>Połącz Konta</NavLink>
              <NavLink to="/dashboard/profile/ignorednt" className={({ isActive }) => (isActive ?
                'tracking-wide gold_bar px-6 py-3 gradient__gold hover__text__yellow' :
                'tracking-wide gold_bar px-6 py-3 hover__text__yellow ')}></NavLink>
              <NavLink to="/dashboard/discord/voice" className={({ isActive }) => (isActive ?
                'tracking-wide  gold_bar px-6 py-3 gradient__gold hover__text__yellow' :
                'tracking-wide gold_bar px-6 py-3 hover__text__yellow')}>Kanały głosowe</NavLink>
            </div>
        </div>
    )
}

export default DashboardSettingsNavbar