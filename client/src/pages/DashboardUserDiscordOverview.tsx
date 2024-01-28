import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState  } from "react"
import useWindowDimensions from "../hooks/useWindowDimensions";
import { UserMessagesChart, UserVoiceChart } from "../charts";
import { DiscordDashboardNavbar } from "../components";

interface UserData {
  userId: string;
  userName: string;
  dailyStats: [{
    date: string;
    messageCount: number;
    attachmentCount: number;
    stickerCount: number;
    linkCount: number;
    userMentionCount: number;
    roleMentionCount: number;
    voiceChannelMinutes: number;
    xpCount: number;
    levelCount: number;
    balance: number;
    warnCount: number;
  }];

}

const DashboardUserDiscordOverview = () => {
 const {user} = useAuthContext()
 const { height, width } = useWindowDimensions();
 const [userOverview, setUserOverview] = useState<UserData>({ 
  userId: '',
  userName: '',
  dailyStats: [
    {
      date: '',
      messageCount: 0,
      attachmentCount: 0,
      stickerCount: 0,
      linkCount: 0,
      userMentionCount: 0,
      roleMentionCount: 0,
      voiceChannelMinutes: 0,
      xpCount: 0,
      levelCount: 0,
      balance: 0,
      warnCount: 0,
    }
  ] });

 

 useEffect(()=> {
    const fetchUserOverview = async () => {

      const response = await axios.get('http://localhost:5000/dashboard/user-discord-overview', {
      withCredentials: true,
      headers: { 'Authorization': `Bearer ${user.token}` }

      })
      if (response.status === 200) {
        const jsonData = response.data;
        
        setUserOverview(jsonData);
      }
    }
    if(user) {
      
      fetchUserOverview()
    }
 }, [])
  

 let chartHeight = 400;
 if(height > chartHeight){
   if(width < 420) {
     chartHeight = 250
   } 
 } 


  return (
    <div className='text-white flex flex-col w-full px-6 sm:px-[40px] lg:px-[80px] gap-[33px] '>
      
    <DiscordDashboardNavbar/>


    <div className="p-6 bg-dark_opacity flex gap-[33px]">
      <div>
        <h3 className="font-barlow_condensed text-[24px] leading-[32px] lead">Podstawowe Informacje:</h3>

        <p>User ID: <span className="gradient__text__yellow">{userOverview.userId}</span></p>
        <p>User Name: <span className="gradient__text__yellow">{userOverview.userName}</span></p>
        <p>Warn Count: <span className="gradient__text__yellow">{userOverview.dailyStats[userOverview.dailyStats.length - 1].warnCount}</span></p>
      </div>
      
      <div>
        <h3 className="font-barlow_condensed text-[24px] leading-[32px] lead">Informacje o Levelu:</h3>
        <p>XP Count: <span className="gradient__text__yellow">{userOverview.dailyStats[userOverview.dailyStats.length - 1].xpCount}</span></p>
        <p>Level Count: <span className="gradient__text__yellow">{userOverview.dailyStats[userOverview.dailyStats.length - 1].levelCount}</span></p>
        <p>Balance: <span className=" gradient__text__yellow">{userOverview.dailyStats[userOverview.dailyStats.length - 1].balance}</span></p>
        
      </div>
    </div>

    <div className="bg-dark_opacity p-6">
        <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] mb-[8px]">Ilość wiadomości</h2>
        <UserMessagesChart userOverview={userOverview} chartHeight={width < 420 ? 350 : 400} chartWidth={'100%'}/>
    </div>

    <div className="bg-dark_opacity p-6">
        <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] mb-[8px]">Czas na kanałach głosowych</h2>
        <UserVoiceChart userOverview={userOverview} chartHeight={chartHeight} chartWidth={'100%'}/>
    </div>
    
  </div>
  )
}

export default DashboardUserDiscordOverview
