import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState  } from "react"
import { SLDashboardNavbar, Loader, ErrorInfo, SLUsersClassDashboardNavbar  } from "../components";
import { UserSLNtfCaptainClassSummaryChart, UserSLNtfPrivateClassSummaryChart, UserSLNtfSergeantClassSummaryChart, UserSLNtfSpecialistClassSummaryChart } from "../charts";


const DashboardSlMtfClassOverview = () => {

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

const {user} = useAuthContext()
const [userSlMtfClassOverview, setUserSlMtfClassOverview] = useState({
    _id: '',
    nickname: '',
    ignoreDNT: false,
    roleStats: [humanClass, humanClass,  humanClass, humanClass],
});

const [loading, setLoading] = useState(true)
const [error, setError] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
 
        useEffect(()=> {
            const fetchUserSlOverview = async () => {
              setLoading(true);

              try {
                const response = await axios.get('http://localhost:5000/dashboard/sl/class/mtf', {
                  withCredentials: true,
                  headers: { 'Authorization': `Bearer ${user.token}` }
                 })
    
                if(response.status === 200) {
                  const jsonData = response.data; // one servwr temp 
                  setUserSlMtfClassOverview(jsonData);
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
              fetchUserSlOverview()
            }
         }, [])

  return (
    <div className='text-white flex flex-col w-full px-6 pb-6 sm:px-[40px] lg:px-[80px] gap-[33px]'>
      <SLDashboardNavbar/>
      <SLUsersClassDashboardNavbar />

      {
         error ?
         (
            <ErrorInfo errorMessage={errorMessage.toString()}/>
   
         ) : loading ?
         (
           <Loader />
         ) : (
          <div className="flex flex-col gap-[33px] ">
            <UserSLNtfCaptainClassSummaryChart userSlMtfClassOverview={userSlMtfClassOverview}/>
            <UserSLNtfSpecialistClassSummaryChart userSlMtfClassOverview={userSlMtfClassOverview}/>
            <UserSLNtfSergeantClassSummaryChart userSlMtfClassOverview={userSlMtfClassOverview}/>
            <UserSLNtfPrivateClassSummaryChart userSlMtfClassOverview={userSlMtfClassOverview}/>

          </div>
        )
      }

  </div>
  )
}

export default DashboardSlMtfClassOverview
