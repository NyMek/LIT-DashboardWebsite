import { useState, FormEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'

const LoginForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await login(email, password)
        
    }
  return (
    <div className='flex justify-center sm:mt-[80px] lg:mt-[120px] h-full'>

        <div className='flex  flex-col w-[500px] p-[80px]'>
            <h2 className='gradient__text font-montserrat uppercase text-[24px] mb-[32px]'>Witamy ponownie!</h2>
            <form action="" method="post" className='flex flex-col' onSubmit={handleSubmit}>

                    <label htmlFor="email" className='text-white'>E-mail</label>
                    <input 
                    type="email" 
                    name="email" 
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} 
                    className='mb-[24px] bg-transparent border border-white p-[16px] hover_gold text-white' />

                    <label htmlFor="password" className='text-white'>Hasło</label>
                    <input 
                    type="password" 
                    name="password" 
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className='bg-transparent border border-white p-[16px] hover_gold text-white'/>
                    <NavLink to="/forgot" className='text-white mb-[24px] mt-[5px] hover_animate'>Zapomniałeś Hasła?</NavLink>


                    <button disabled={isLoading}  type="submit"className='border_gold px-[48px] py-4 text-center  text-white hover_gradient__text'>Zaloguj Się</button>

                    {error && <div className='text-dark_red'>{error} </div>}

                    <NavLink to="/signup" className="text-white mt-[5px]  hover_animate ">Nie masz konta? Stwórz!</NavLink>
            </form>
        </div>
        
    </div>
  )
}

export default LoginForm
