import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState  } from "react"
import { SLDashboardNavbar, Loader  } from "../components";
import { UserSLSummaryChart} from "../charts";


const DashboardSlPersonnelClassOverview = () => {

  const basicClass = {
    _t: [],
    roleId: '',
    timesJumped: 0,
    kills: 0,
    deaths: 0,
    timePlayed: 0,
    lastPlayed: '',
    kdRatio: 0,
}
const humanClass = {
  basicClass,
  firedShots: 0,
  accurateShots: 0,
  headshots: 0,
  accuracy: '',
  headshotPercentage: '',
}
const escapistClass = {
  humanClass,
  timesEscaped: 0
}

const scp173Class = {
  basicClass,
  placedTantrums: 0,
}

const scp106Class = {
  basicClass,
  caughtInPocket: 0,
}

const scp096Class = {
  basicClass,
  timesRaged: 0,
}

const scp049Class = {
  basicClass,
  timesRecalled: 0,
}

const scp0492Class = {
  basicClass,
  consummedCorpses: 0,
}

const scp3114Class = {
  basicClass,
  timesDisguised: 0,
}

const scp079Class = {
  basicClass,
  totalGainedExperience: 0,
  teslaInteractions: 0,
  roomBlackouts: 0,
}

const scp939Class = {
  basicClass,
  totalGainedExperience: 0,
  teslaInteractions: 0,
  savedVoices: 0,
}
    const {user} = useAuthContext()
    const [userSlPersonnelClassOverview, setUserSlPersonnelClassOverview] = useState({
      _id: '',
      nickname: '',
      ignoreDNT: false,
      roleStats: [escapistClass, escapistClass, humanClass, humanClass, humanClass, humanClass, humanClass, humanClass, humanClass, humanClass, escapistClass, humanClass, basicClass, basicClass, scp173Class, scp106Class, scp096Class, scp049Class, scp0492Class, scp3114Class, scp079Class, scp939Class],
      });

const [loading, setLoading] = useState(true)
 
        useEffect(()=> {
            const fetchUserSlOverview = async () => {
              setLoading(true);
        
              const response = await axios.get('http://localhost:5000/dashboard/class-sl-overview/personnel', {
              withCredentials: true,
              headers: { 'Authorization': `Bearer ${user.token}` }
             })

              if (response.status === 200) {
                const jsonData = response.data[0]; // one servwr temp 
                setUserSlPersonnelClassOverview(jsonData);
              }
              setLoading(false);
            }
            if(user) {
              fetchUserSlOverview()
            }
         }, [])

         console.log(userSlPersonnelClassOverview)


  return (
    <div className='text-white flex flex-col w-full px-6 sm:px-[40px] lg:px-[80px] gap-[33px]'>
      <SLDashboardNavbar/>

      {
        loading ? (
          <Loader />
        ) : (
          <div>
            {/* <UserSLSummaryChart userSlOverview={userSlPersonnelClassOverview}/> */}

          </div>
        )
      }

  </div>
  )
}

export default DashboardSlPersonnelClassOverview
