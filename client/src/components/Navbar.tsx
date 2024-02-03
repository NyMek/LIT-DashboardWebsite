import { useState} from 'react'

import { NavLink } from 'react-router-dom'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {

  const { user } = useAuthContext()
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const { logout } = useLogout();

    const handleClick = () => {
        logout();
    }


  return (
    <div id="home" className='flex justify-between p-6 sm:p-[40px] lg:px-[80px] items-center navbar'>
        <div className='w-[66px] lg:w-[88px]'>
            <NavLink to="/"> 
              <img src="../../assets/logo//gl.png" alt="GoldLegends" className='GoldLegends'/>
            </NavLink>
        </div>
        <div className='text-white sm:flex w-[550px] items-center justify-between hidden '>
        <nav className='flex gap-[33px] sm:text-[16px]'>
            <ScrollLink to="news" smooth={true} duration={500} className="hover_animate tracking-wide cursor-pointer">Co nowego</ScrollLink>
            <ScrollLink to="about" smooth={true} duration={500} className="hover_animate tracking-wide cursor-pointer">O nas</ScrollLink>
            <ScrollLink to="history" smooth={true} duration={500} className="hover_animate tracking-wide cursor-pointer">Historia</ScrollLink>
        </nav>

            <div className='flex items-center text-[16px] gap-[33px]'>
            {
                        user ? (
                          <NavLink to="/dashboard/overview">

                              <div className=' '>
                              <span className='gradient__text text-[24px] font-black '>{user.username}</span>
                            </div>
                            </NavLink>
                        )  : (
                            <NavLink to="/login" className="hover_animate">
                                Zaloguj Się
                            </NavLink>
                        ) 
                     }
            </div>

        </div>
        <div className='flex flex-col justify-end items-end sm:hidden'>
        {toggleMenu
          ? <RiCloseLine color="#fff" size={30} onClick={()=> setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={30} onClick={()=> setToggleMenu(true)} />
        }
        {
            toggleMenu && 
            <nav className='text-white text-[16px] flex flex-col absolute bg-dark_opacity inset-0 top-[89px] backdrop-blur-[70px] left-1/3 gap-[33px] p-6 sm:hidden z-10'>
                <ScrollLink to="news" smooth={true} duration={500} className="hover_animate tracking-wide cursor-pointer">Co nowego</ScrollLink>
                <ScrollLink to="about" smooth={true} duration={500} className="hover_animate tracking-wide cursor-pointer">O nas</ScrollLink>
                <ScrollLink to="history" smooth={true} duration={500} className="hover_animate tracking-wide cursor-pointer">Historia</ScrollLink>
                {
                        user ? (
                          <NavLink to="/dashboard">
                            <div className=' diamond relative'>
                              <div className='back absolute top-3 right-2 translate-x-[17rem]'>
                              <span className='gradient__text text-[14px] font-black '>{user.username}</span>
                              </div>
                               
                            </div>
                            </NavLink>
                        )  : (
                            <NavLink to="/login" className="hover_animate ">
                                Zaloguj <span className='text-dark_red inline-block font-bold '>Się</span>
                            </NavLink>
                        ) 
                     }
            </nav>
        }
        </div>
    </div>
  )
}

export default Navbar
