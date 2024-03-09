import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState  } from "react"
import useWindowDimensions from "../hooks/useWindowDimensions";
import { SLDashboardNavbar  } from "../components";


const DashboardServerSlOverview = () => {
    const {user} = useAuthContext()
    const { height, width } = useWindowDimensions();
    const [serverSlOverview, setServerSlOverview] = useState({
      _id: '',
      nickname: '',
      ignoreDNT: false,
      dntEnabled: false,
      dailyStats: [
        {
          lastJoin: '',
          timesJumped: 0,
          onlineTime: 0,
          deaths: 0,
          kills: 0,
          firedShots: 0,
          accurateShots: 0,
          headshots: 0,
          _id: '',
          kdRatio: 0,
          accuracy: '',
          headshotPercentage: '',
      }
      ],
      kills: 0,
      deaths: 0,
      firedShots: 0,
      accurateShots: 0,
      headshots: 0,
      enteredPocket: 0,
      escapedPocket: 0,
      timesJumped: 0,
      caughtInPocket: 0,
      onlineTime: 0,
      firstJoined: '',
      lastSeen: '',
      kdRatio: 0,
      accuracy: '',
      headshotPercentage: '',
      });




        
        useEffect(()=> {
            const fetchServerOverview = async () => {
        
              const response = await axios.get('http://localhost:5000/dashboard/sl/server', {
              withCredentials: true,
              headers: { 'Authorization': `Bearer ${user.token}` }
             })

              if (response.status === 200) {
                const jsonData = response.data[0]; // one servwr temp 
                setServerSlOverview(jsonData);
              }
            }
            if(user) {
              fetchServerOverview()
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
  asdsadasd

        {/* <div >
          <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] mb-[8px]">Podstawowe informacje</h2>
          <BasicServerInforChart serverOverview={serverOverview} chartHeight={width < 420 ? 300 : 400} chartWidth={width < 420 ? '250px' : width > 850 ?'780px': '400px'}/>
        </div>
       
        <div>
          <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] mb-[8px]">Ilość osób na serwerze, które dołączyły oraz wyszły</h2>
          <MembersChart serverOverview={serverOverview} chartHeight={chartHeight} chartWidth={'100%'}/>
        </div>
      

      <div>
        <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] mb-[8px]">Wiadomości na kanałach tekstowych dla serwera</h2>
        <MessagesChart serverOverview={serverOverview} chartHeight={chartHeight} chartWidth={'100%'}/>
      </div> */}

      

  </div>
  )
}

export default DashboardServerSlOverview
