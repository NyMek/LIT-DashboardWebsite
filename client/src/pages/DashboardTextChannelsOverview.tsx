import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState  } from "react"
import { OverviewDashboardNavbar, Loader } from "../components";
import { TextChannelsMessagesTopChart } from "../charts";

const DashboardTextChannelsOverview = () => {
 const {user} = useAuthContext()
 const [textChannelsOverview, setTextChannelsOverview] = useState({
    _id: '',
    guildId: '',
    channels: [
      {
        channelId: '',
        channelName: '',
        dailyStats: [
          {
            date: '',
            messageCount: 0,
            attachmentCount: 0,
            stickerCount: 0,
            linkCount: 0,
            userMentionCount: 0,
            roleMentionCount: 0,
          }
        ]
      }

    ]
 });
 const [period, setPeriod] = useState(30)
 const [loading, setLoading] = useState(true)


 useEffect(()=> {
    const fetchTextChannelsOverview = async () => {
      setLoading(true);

      const response = await axios.get('http://localhost:5000/dashboard/overview/text', {
      withCredentials: true,
      headers: { 'Authorization': `Bearer ${user.token}` }

      })
      if (response.status === 200) {
        const jsonData = response.data[0];
  
        setTextChannelsOverview(jsonData);
      }
      setLoading(false);
    }
    if(user) {
      
      fetchTextChannelsOverview()
    }
 }, [])
 
  return (
    <div className='text-white flex flex-col w-full px-6 sm:px-[40px] lg:px-[80px] gap-[33px] '>    
    <OverviewDashboardNavbar/>

    {
      loading ? (
        <Loader />
      ) : (
        <div>
          <select 
            className="bg-dark_opacity p-6 text-[16px] sm:text-[24px] uppercase font-black w-[300px] mb-[24px]"
            value={period}
            onChange={(e) => {
              const newPeriod = Number(e.target.value);
              setPeriod(newPeriod)
            }}
          >
            <option value="1000" className="bg-black">Od początku</option>
            <option value="365" className="bg-black">Ostatni rok</option>
            <option value="30" className="bg-black">Ostatni miesiąc</option>
            <option value="14" className="bg-black">Ostatnie dwa tygodnie</option>
            <option value="7" className="bg-black">Ostatni tydzień</option>
            <option value="1" className="bg-black">Ostatni dzień</option>
          </select>

          <div className="flex flex-col sm:flex-row gap-[33px] justify-between w-full">
           <div className="p-6 bg-dark_opacity w-full">
            <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] pb-6 sm:pb-[40px]">Ilość wiadomości</h2>
            <div className="flex justify-between">
              <h3 className="text-[24px] leading-[32px] font-roboto font-black uppercase pb-6">Pozycja</h3>
              <h3 className="text-[24px] leading-[32px] font-roboto font-black uppercase pb-6">Nazwa kanału</h3>
              <h3 className="text-[24px] leading-[32px] font-roboto font-black uppercase pb-6">Wartość</h3>
            </div>
            <TextChannelsMessagesTopChart textChannelsOverview={textChannelsOverview} period={period}/>
           </div>
          </div>
        </div>

        

      )
    }



  
  </div>
  )
}

export default DashboardTextChannelsOverview
