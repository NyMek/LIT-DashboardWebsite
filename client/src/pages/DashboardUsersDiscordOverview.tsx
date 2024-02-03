import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState  } from "react"
import { OverviewDashboardNavbar } from "../components";
import { UsersDiscordMessageCountTopChart, UsersDiscordVoiceCountTopChart } from "../charts";

const DashboardUsersDiscordOverview = () => {
 const {user} = useAuthContext()
 const [usersOverview, setUsersOverview] = useState({
    _id: '',
    guildId: '',
    users: [
      {
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
        ]
      }

    ]
 });


 useEffect(()=> {
    const fetchUserOverview = async () => {

      const response = await axios.get('http://localhost:5000/dashboard/users-discord-overview', {
      withCredentials: true,
      headers: { 'Authorization': `Bearer ${user.token}` }

      })
      if (response.status === 200) {
        const jsonData = response.data[1];

        console.log('jsondata users: '+ jsonData.users[1].userId)
        
        setUsersOverview(jsonData);
      }
    }
    if(user) {
      
      fetchUserOverview()
    }
 }, [])
 
  return (
    <div className='text-white flex flex-col w-full px-6 sm:px-[40px] lg:px-[80px] gap-[33px] '>    
    <OverviewDashboardNavbar/>

    <div className="flex flex-col sm:flex-row gap-[33px] justify-between w-full">
      <div className="p-6 bg-dark_opacity w-full">
       <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] pb-6 sm:pb-[40px]">Ilość wiadomości</h2>
       <div className="flex justify-between">
        <h3 className="text-[24px] leading-[32px] font-roboto font-black uppercase pb-6">Pozycja</h3>
        <h3 className="text-[24px] leading-[32px] font-roboto font-black uppercase pb-6">Username</h3>
        <h3 className="text-[24px] leading-[32px] font-roboto font-black uppercase pb-6">Wiadomości</h3>
       </div>
          <UsersDiscordMessageCountTopChart usersOverview={usersOverview}/>
      </div>

      <div className="p-6 bg-dark_opacity w-full">
        <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] pb-6 sm:pb-[40px]">Czas na kanałach</h2>
        <div className="flex justify-between">
        <h3 className="text-[24px] leading-[32px] font-roboto font-black uppercase pb-6">Pozycja</h3>
        <h3 className="text-[24px] leading-[32px] font-roboto font-black uppercase pb-6">Username</h3>
        <h3 className="text-[24px] leading-[32px] font-roboto font-black uppercase pb-6">Minuty</h3>
       </div>
        <UsersDiscordVoiceCountTopChart usersOverview={usersOverview}/>
      </div>
    </div>

  
  </div>
  )
}

export default DashboardUsersDiscordOverview
