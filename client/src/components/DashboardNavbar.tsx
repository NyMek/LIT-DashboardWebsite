import { useState} from 'react'
import { NavLink } from "react-router-dom"
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

const DashboardNavbar = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

const MobileSidebar = () => {
  console.log('DashboardNavbar')
  return (
    <div className='flex flex-col justify-center items-end sm:hidden'>
    {toggleMenu
      ? <RiCloseLine color="#fff" size={30} onClick={()=> setToggleMenu(false)} />
      : <RiMenu3Line color="#fff" size={30} onClick={()=> setToggleMenu(true)} />
    }
    {
        toggleMenu && 
        <div className='text-white text-[16px] flex flex-col absolute bg-dark_opacity top-[89px] left-0 backdrop-blur-[70px] right-1/3 gap-[33px] p-6 sm:hidden z-40'>
            <NavLink to="/dashboard/server-sl-overview" className={({ isActive }) => (isActive ? 'gradient__text hover_animate tracking-wide' : 'hover_animate tracking-wide')}>Serwer SCP: SL</NavLink>
            <NavLink to="/dashboard/user-discord-overview" className={({ isActive }) => (isActive ? 'gradient__text hover_animate tracking-wide' : 'hover_animate tracking-wide')}>Użytkownik Discord</NavLink>
            <NavLink to="/dashboard/server-discord-overview" className={({ isActive }) => (isActive ? 'gradient__text hover_animate tracking-wide' : 'hover_animate tracking-wide')}>Serwer DC</NavLink>
            <NavLink to="/dashboard/text-channel-overview" className={({ isActive }) => (isActive ? 'gradient__text hover_animate tracking-wide' : 'hover_animate tracking-wide')}>Tekstowe</NavLink>
            <NavLink to="/dashboard/voice-channel-overview" className={({ isActive }) => (isActive ? 'gradient__text hover_animate tracking-wide' : 'hover_animate tracking-wide')}>Głosowe</NavLink>
        </div>
    }
    </div>
  )
}
  return (
    <div className='flex fixed justify-between items-center p-6 sm:p-[40px] lg:px-[80px] bg-almost_black w-full  z-20'>
      <MobileSidebar  />
      <div className='w-[66px] lg:w-[88px]'>
        <NavLink to="/">
            <img src="../../assets/logo/gl.png" alt="GoldLegends" />
        </NavLink>
        </div>

        <div className='flex items-center sm:text-[16px] '>

          <NavLink to="/dashboard/profile" className="flex items-center gap-[8px]">
            <img src="../../assets/user.png" alt="avatar" className='w-[50px] h-[50px]'/>
          </NavLink>
        </div>
    </div>
  )
}

export default DashboardNavbar
