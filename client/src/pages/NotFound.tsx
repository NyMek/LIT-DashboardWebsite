import { Navbar } from "../components"
import { NavLink } from "react-router-dom"

const NotFound = () => {
  return (
    
    <div className=" gradient__bg overflow-hidden min-h-[100vh] text-white flex flex-col w-full">
      <Navbar />
      <div className="p-6 sm:px-[40px] lg:px-[80px] gap-[33px] flex flex-col items-center text-center">
        <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-montserrat font-black text-center p-6">Wydaje nam się, że zapędziłeś się trochę za daleko...</h2>

        <NavLink to="/">
            <div className='diamond'>
                <span className="arrow"></span>
            </div>    
          </NavLink>
      </div>

    </div>
  )
}

export default NotFound
