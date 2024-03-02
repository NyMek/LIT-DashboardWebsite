import { Outlet } from 'react-router-dom'

const DashboardSLClassLayout = () => {
  console.log('DashboardLayout')
  return (
    
  
      
      <main className='w-full'>
          <Outlet/>
      </main>

  )
}

export default DashboardSLClassLayout
