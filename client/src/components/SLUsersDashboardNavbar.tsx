import { NavLink} from "react-router-dom"

const SLUsersDashboardNavbar = () => {

    return (
        <div className="text-white uppercase font-bold font-roboto text-center sm:text-left bg-dark_opacity  ">
            <div className="flex flex-col sm:flex-row">

              <NavLink to="/dashboard/users-sl-overview/time" className={({ isActive }) => (isActive ?
                'tracking-wide gold_bar px-6 py-3 gradient__gold hover__text__yellow ' :
                'tracking-wide gold_bar px-6 py-3 hover__text__yellow ')}>Czas Gry</NavLink>
              <NavLink to="/dashboard/users-sl-overview/kills" className={({ isActive }) => (isActive ?
                'tracking-wide gold_bar px-6 py-3 gradient__gold hover__text__yellow' :
                'tracking-wide gold_bar px-6 py-3 hover__text__yellow ')}>Zabójstwa/śmierci</NavLink>
              <NavLink to="/dashboard/users-sl-overview/shots" className={({ isActive }) => (isActive ?
                'tracking-wide gold_bar px-6 py-3 gradient__gold hover__text__yellow' :
                'tracking-wide gold_bar px-6 py-3 hover__text__yellow ')}>Strzały</NavLink>
              <NavLink to="/dashboard/users-sl-overview/class" className={({ isActive }) => (isActive ?
                'tracking-wide  gold_bar px-6 py-3 gradient__gold hover__text__yellow' :
                'tracking-wide gold_bar px-6 py-3 hover__text__yellow')}>Klasy</NavLink>
            </div>
        </div>
    )
}

export default SLUsersDashboardNavbar
