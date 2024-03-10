import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState  } from "react"
import { OverviewDashboardNavbar, SLUsersDashboardNavbar, Loader, ErrorInfo } from "../components";
import { UsersSLPlayTimeTopChart } from "../charts";

const DashboardUsersSlTimeOverview = () => {
 const {user} = useAuthContext()
 const [usersSlOverview, setUsersSlOverview] = useState({
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
const [period, setPeriod] = useState(30)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(false);
const [errorMessage, setErrorMessage] = useState('');


 useEffect(()=> {
    const fetchUsersSlOverview = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/dashboard/overview/users-sl/time', {
          withCredentials: true,
          headers: { 'Authorization': `Bearer ${user.token}` }
    
          })
          if (response.status === 200) {
            const jsonData = response.data; // one servwr temp
            setUsersSlOverview(jsonData);
          }
          setLoading(false);
      } catch (error:any) {
        if (error.response && error.response.status === 404) {
          setErrorMessage(JSON.stringify(error.response.data.error))
          setError(true);
        } else if(error.response && error.response.status === 400){
          setErrorMessage(JSON.stringify(error.response.data.error))
          setError(true);
        } 
        setLoading(false);
      }
    }
    if(user) {
      
      fetchUsersSlOverview()
    }
 }, [])

  return (
    <div className='text-white flex flex-col w-full px-6 sm:px-[40px] lg:px-[80px] gap-[33px] '>    
    <OverviewDashboardNavbar/>
    <SLUsersDashboardNavbar />

    {
      error ?
      (
         <ErrorInfo errorMessage={errorMessage.toString()}/>

      ) : loading ?
      (
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
            <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] pb-6 sm:pb-[40px]">Najdłużej u nas grali:</h2>
            <div className="flex justify-between">
              <h3 className="text-[24px] leading-[32px] font-roboto font-black uppercase pb-6">Pozycja</h3>
              <h3 className="text-[24px] leading-[32px] font-roboto font-black uppercase pb-6">Nick</h3>
              <h3 className="text-[24px] leading-[32px] font-roboto font-black uppercase pb-6">Wartość</h3>
            </div>
                <UsersSLPlayTimeTopChart usersSlOverview={usersSlOverview} period={period}/>
            </div>

          </div>
        </div>
      )
    }
  </div>
  )
}

export default DashboardUsersSlTimeOverview
