import { useState, FormEvent, useEffect } from 'react'
import { useUpdateCredentials } from '../hooks/useUpdateCredentials'
import { useDiscordAuthContext } from '../hooks/useDiscordAuthContext'
import { useDiscordLogout } from '../hooks/useDiscordLogout'
import { useSteamAuthContext } from '../hooks/useSteamAuthContext'
import { useSteamLogout } from '../hooks/useSteamLogout'
import { DashboardSettingsNavbar } from '../components'
import { useAuthContext } from "../hooks/useAuthContext";
import { UsernameChangeForm, EmailChangeForm } from '../components';

const DashboarProfileSettings = () => {

  const {user} = useAuthContext()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { updateCredentials, error, isLoading } = useUpdateCredentials()
  const { discordUser } = useDiscordAuthContext()
  const { discordLogout } = useDiscordLogout();

  const { steamUser } = useSteamAuthContext()
  const { steamLogout } = useSteamLogout();

  const [ hiddenEmail, setHiddenEmail ] = useState('')
  const [ showEmail, setShowEmail ] = useState(false)
 
  const [ toggleUsernameChange, setToggleUsernameChange] = useState(false)
  const [ toggleEmailChange, setToggleEmailChange] = useState(false)
  const [animate, setAnimate] = useState('dropdown_form_open')

  const handleToggleCredentialsChange = async (ms:any, stateOne:any, stateTwo:any, statFuncOne:any, stateFuncTwo:any) => {
    
    if(stateOne) {
      setAnimate("dropdown_form_close")
      await new Promise(r => setTimeout(r, ms))
    } else if(!stateOne) {
      setAnimate("dropdown_form_open")
    }
    if(stateTwo) {
      stateFuncTwo((prev:any) => !prev)
    }
    statFuncOne((prev:any) => !prev)
    
  }
  

    useEffect(() => {
      const userEmail = user.email;
      const userEmailArray = userEmail.split('@');
      const num = userEmailArray[0].length;
      const newemail = '*'.repeat(num) + '@' + userEmailArray[1];
        
      setHiddenEmail(newemail)
    },[user.email])
  


    const handleDiscord = () => {
      discordLogout()
    }
    const handleSteam = () => {
      steamLogout()
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

    await updateCredentials(username, email, password)
    }

  return (
    
    
        <div className='text-white flex flex-col w-full px-6 sm:px-[40px] lg:px-[80px] gap-[33px] '>
          <DashboardSettingsNavbar />
          
            <div className='bg-dark_opacity p-6 sm:px-[40px] lg:px-[80px]  flex flex-col sm:flex-row gap-[33px]'>
              <div className=' sm:w-1/2 flex flex-col gap-[33px]'>
                <h2 className='text-[28px] leading-[28px] font-black font-roboto sm:text-[32px] sm:leading-[48px] lg:text-[40px]'>Podstawowe Dane</h2>
                <div className='flex flex-col gap-[33px]'>
                  <div className='flex flex-col xs:flex-row gap-[16px] xs:gap-0 justify-between '>
                    <div className=''>
                      <h3 className='font-roboto text-[24px] leading-[32px] font-black' >Username</h3>
                        <p className='font-roboto gradient__text__yellow leading-[25px] lg:leading-[26px]'>{user.username}</p>
                    </div>
                    <button className='font-roboto hover__text__yellow border_gold p-4' onClick={() => handleToggleCredentialsChange(900, toggleUsernameChange, toggleEmailChange, setToggleUsernameChange, setToggleEmailChange)}>Edytuj</button>
                  </div>
                  
            
                  <div className='flex flex-col xs:flex-row gap-[16px] xs:gap-0 justify-between'>
                    <div className=''>
                      <h3 className='font-roboto text-[24px] leading-[32px] font-black' >E-mail</h3>
                      <div className='flex gap-[16px]'>
                        <p className='font-roboto gradient__text__yellow leading-[25px] lg:leading-[26px]'>{showEmail ? user.email : hiddenEmail}</p>
                        <button className='font-roboto hover__text__yellow ' onClick={() => setShowEmail((prev) => !prev)}>{showEmail ? 'Ukryj': 'Pokaż'}</button>
                      </div>
                      
                    </div>
                    <button className='font-roboto hover__text__yellow border_gold p-4' onClick={() => handleToggleCredentialsChange(900, toggleEmailChange,toggleUsernameChange, setToggleEmailChange, setToggleUsernameChange)}>Edytuj</button>
                  </div>
                </div>
              </div>
              <div className='sm:w-1/2'>
                
                  <UsernameChangeForm toggleMenu={toggleUsernameChange} animate={animate} />
                  <EmailChangeForm toggleMenu={toggleEmailChange} animate={animate} />




              {/* <div className={` ${toggleMenu ? ' flex' : ' hidden'} flex-col       sm:px-[40px]  lg:px-[80px] ${animate}`}>
                <form 
                action="" 
                method="post" 
                className={`flex flex-col ${animate}`} 
                onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="username" 
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder='Nowy username' 
                        className={`mb-[23px] bg-transparent border border-white p-[16px] hover_gold text-white placeholder:text-white ${animate}` }/>
                    <input 
                        type="password" 
                        name="password" 
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Wpisz swoje hasło' 
                        className={`mb-[33px] bg-transparent border border-white p-[16px] hover_gold text-white placeholder:text-white ${animate}`}/>

                    <button disabled={isLoading}  type="submit"className={`border_gold font-roboto px-[48px] py-4 text-center text-white hover__text__yellow ${animate}`}>Zaktualizuj Username</button> 
                    {error && <div className='text-dark_red'>{error}</div>}
                </form>
               </div> */}
               
                  
            </div>
          </div>

            <div className='bg-dark_opacity p-6 sm:px-[40px] lg:px-[80px] flex flex-col sm:flex-row gap-[33px]'>
             <div className=' sm:w-1/2 flex flex-col gap-[33px]'>
              <h2 className='text-[28px] leading-[28px] font-black font-roboto sm:text-[32px] sm:leading-[48px] lg:text-[40px]'>Hasło i Autentyfikacja</h2>
              <div className='flex  gap-[33px] sm:w-1/2'>
                  <div className='flex justify-between'>
                    <button className='font-roboto hover__text__yellow border_gold px-4 py-2'>Edytuj Hasło</button>
                  </div>
              </div>
              
             </div>
             <div className='sm:w-1/2'>
                  asd
              </div>
              
              {/* <div className=' flex gap-[33px]  flex-col sm:flex-row  justify-between'>
                <div className='flex flex-col gap-[33px] sm:w-1/2'>
                  <div className='flex justify-between'>
                    <button className='font-roboto hover__text__yellow border_gold px-4 py-2'>Edytuj Hasło</button>
                  </div>
                </div>
                <div className='sm:w-1/2'>
                  asd
                </div>
            </div> */}
        </div>

            {/* <div className='flex flex-col sm:w-[360px] lg:w-[510px] m-6 sm:mx-[40px] sm:mr-0 lg:mx-[80px] lg:mr-0 p-6 pb-[80px] sm:px-[40px] sm:pb-[80px] lg:px-[80px]'>
             <h2 className='gradient__text__yellow font-montserrat uppercase text-[24px] mb-[32px]'>Ustawienia Profilu {user.email}</h2>

                <form 
                action="" 
                method="post" 
                className='flex flex-col' 
                onSubmit={handleSubmit}>
                    <label htmlFor='username' className='text-white '>Zmień Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder='Nowy username' 
                        className='mb-[24px] bg-transparent border border-white p-[16px] hover_gold text-white placeholder:text-white'/>

                    <label htmlFor="email" className='text-white'>Nowy e-mail</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder='newgold@legends.gl' 
                        className='mb-[24px] bg-transparent border border-white p-[16px] hover_gold text-white placeholder:text-white' />

                    <label htmlFor="password" className='text-white'>Nowe hasło</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Wybierz nowe silne hasło' 
                        className='mb-[24px] bg-transparent border border-white p-[16px] hover_gold text-white placeholder:text-white'/>

                    <button disabled={isLoading}  type="submit"className='border_gold px-[48px] py-4 text-center text-white hover__text__yellow'>Zaktualizuj Dane</button> 
                    {error && <div className='text-dark_red'>{error}</div>}
                </form>

            </div> */}






            {/* <div className='gradient__card rounded-3xl p-6 sm:px-[40px] lg:px-[80px] m-6  sm:mx-[40px] lg:mx-[80px] lg:ml-0 md:ml-0'>
                <h2 className='gradient__text font-montserrat uppercase text-[24px] mb-[32px]'>Połącz Konta</h2>
            {
              discordUser
              ? 
              <div className="flex items-center py-2 px-4 rounded-lg bg-[#5865F2] hover:bg-[#5865F2]/80 hover:text-white/80 transition-colors duration-300 mb-[24px] cursor-pointer" onClick={handleDiscord}>
                <img src="../../assets/discord-icon.svg" alt="" className="h-7 w-7 mr-4"/>
                <span className="text-sm">Rozłącz Discord</span>
             </div>
             :
             <a className="flex items-center py-2 px-4 rounded-lg bg-[#5865F2] hover:bg-[#5865F2]/80 hover:text-white/80 transition-colors duration-300 mb-[24px] cursor-pointer"
             href="https://discord.com/api/oauth2/authorize?client_id=1153269554210951208&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fdashboard%2Fauth%2Fdiscord%2Fcallback&response_type=code&scope=identify">
              <img src="../../assets/discord-icon.svg" alt="" className="h-7 w-7 mr-4"/>
              <span className="text-sm">Połącz Discord</span>
            </a>
            }

{
              steamUser
              ?  
              <div className="flex items-center py-2 px-4 rounded-lg bg-[#2a475e] hover:bg-[#1b2838]/80 hover:text-white/80 transition-colors duration-300 mb-[24px] cursor-pointer" onClick={handleSteam}>
                <img src="../../assets/steam-icon.svg" alt="" className="h-7 w-7 mr-4"/>
                <span className="text-sm cursor-pointer">Rozłącz Steam</span>
             </div>
             :
             <a className="flex items-center py-2 px-4 rounded-lg bg-[#2a475e] hover:bg-[#1b2838]/80 hover:text-white/80 transition-colors duration-300 mb-[24px] cursor-pointer"
               href='http://localhost:5000/dashboard/auth/steam'>

             
             <img src="../../assets/steam-icon.svg" alt="" className="h-7 w-7 mr-4"/>
             <span className="text-sm">Połącz Steam</span>
            </a>
            }
            
            </div> */}
            
        </div>  
  )
}

export default DashboarProfileSettings
