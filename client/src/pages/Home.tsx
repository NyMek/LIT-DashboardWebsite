import { Navbar } from '../components'
import { Header, News, AboutUs, OldProjects, Footer } from '../containtes'
import { Link as ScrollLink } from 'react-scroll';

const Home = () => {
  console.log('Home ')
  return (
    <div className='relative'>
      <ScrollLink to="home" smooth={true} duration={500} className="cursor-pointer fixed hidden lg:block z-100 lg:bottom-[40px] lg:right-[68px] translate-x-[50%] ">
                <div className='mt-[48px] sm:mt-[96px]lg:mt-[192px] diamond'>
                   <span className="arrow_up"></span>
                </div>
              </ScrollLink>
      <div className='bg-almost_black'>
        <Navbar />
        <Header />
      </div>
      
      <News/>
      <AboutUs/>
      <OldProjects />
      <Footer />

    </div>
  )
}

export default Home
