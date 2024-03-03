import { NavLink} from "react-router-dom"

const SLUsersClassDashboardNavbar = () => {

    return (
        <div className="text-white uppercase font-bold font-roboto text-center sm:text-left bg-dark_opacity  ">
            <div className="flex flex-col sm:flex-row">

              <NavLink to="/dashboard/class-sl-overview/personnel" className={({ isActive }) => (isActive ?
                'tracking-wide gold_bar px-6 py-3 gradient__gold hover__text__yellow ' :
                'tracking-wide gold_bar px-6 py-3 hover__text__yellow ')}>Personel Placówki</NavLink>
              <NavLink to="/dashboard/class-sl-overview/chaos" className={({ isActive }) => (isActive ?
                'tracking-wide gold_bar px-6 py-3 gradient__gold hover__text__yellow' :
                'tracking-wide gold_bar px-6 py-3 hover__text__yellow ')}>MTF</NavLink>
              <NavLink to="/dashboard/class-sl-overview/mtf" className={({ isActive }) => (isActive ?
                'tracking-wide gold_bar px-6 py-3 gradient__gold hover__text__yellow' :
                'tracking-wide gold_bar px-6 py-3 hover__text__yellow ')}>Rebelia Chaosu</NavLink>
              <NavLink to="/dashboard/class-sl-overview/scp" className={({ isActive }) => (isActive ?
                'tracking-wide  gold_bar px-6 py-3 gradient__gold hover__text__yellow' :
                'tracking-wide gold_bar px-6 py-3 hover__text__yellow')}>SCP</NavLink>
              <NavLink to="/dashboard/class-sl-overview/special" className={({ isActive }) => (isActive ?
                'tracking-wide  gold_bar px-6 py-3 gradient__gold hover__text__yellow' :
                'tracking-wide gold_bar px-6 py-3 hover__text__yellow')}>Klasy Specjalne</NavLink>
            </div>
        </div>
    )
}

export default SLUsersClassDashboardNavbar
