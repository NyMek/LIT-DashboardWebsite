import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState  } from "react"
import useWindowDimensions from "../hooks/useWindowDimensions";
import { SLDashboardNavbar  } from "../components";

const DashboardSlClassOverview = () => {

  const {user} = useAuthContext()
  const { height, width } = useWindowDimensions();
  const [userSlOverview, setUserSlOverview] = useState({
    _id: '',
    nickname: '',
    ignoreDNT: false,
    roleStats: [
      {
        _t: [],
        roleId: '',
        timesJumped: 0,
        kills: 0,
        deaths: 0,
        timePlayed: 0,
        lastPlayed: Date,
        kdRatio: 0,
        firedShots: 0,
        accurateShots: 0,
        headshots: 0,
        accuracy: '',
        headshotPercentage: '',
        timesEscaped: 0
    }
    ],
    });

  useEffect(()=> {
    const fetchUserSlOverview = async () => {

      const response = await axios.get('http://localhost:5000/dashboard/class-sl-overview', {
      withCredentials: true,
      headers: { 'Authorization': `Bearer ${user.token}` }
     })

      if (response.status === 200) {
        const jsonData = response.data[0]; // one servwr temp 
        setUserSlOverview(jsonData);
        console.log('jsonData: ' + jsonData)
      }
    }
    if(user) {
      fetchUserSlOverview()
    }
 }, [])

 let chartHeight = 400;
 if(height > chartHeight){
   if(width < 420) {
     chartHeight = 250
   } 
 }

  return (
    <div className='text-white flex flex-col w-full px-6 sm:px-[40px] lg:px-[80px] gap-[33px]'>
        <SLDashboardNavbar/>
      DashboardSlClassOverview
    </div>
  )
}

export default DashboardSlClassOverview
