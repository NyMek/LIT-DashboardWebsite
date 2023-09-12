import { useState, FormEvent } from 'react'
import { NavLink} from 'react-router-dom'
import { useForgot } from '../hooks/useForgot';

const ForgotForm = () => {

    const [email, setEmail] = useState('');
     const { forgot, error, isLoading } = useForgot()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

         await forgot(email)
    }
  return (
    <div className='flex justify-center sm:mt-[80px] lg:mt-[120px] h-full'>

        <div className='flex  flex-col w-[500px] p-[80px]'>
            <h2 className='text-white uppercase text-[24px] mb-[32px]'>Zresetuj <span className='text-dark_red '>Hasło</span></h2>
            <form action="" method="post" className='flex flex-col' onSubmit={handleSubmit}>

                    <label htmlFor="email" className='text-white'>E-mail</label>
                    <input 
                    type="email" 
                    name="email" 
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} 
                    className='mb-[24px] bg-transparent border border-white p-[16px] hover:border-dark_red text-white placeholder:text-dark_red' />

                

                    <button  disabled={isLoading}type="submit"className='border hover:border-dark_red px-[48px] py-4 reflect text-center text-white'>Zresetuj <span className='text-dark_red '>Hasło</span></button>

                    {error && <div>{error} </div>}

                    <NavLink to="/signup" className="text-white mt-[70px] hover:text-dark_red hover_animate ">Nie masz konta? <span className='text-dark_red'>Stwórz!</span></NavLink>
            </form>
        </div>
        
    </div>
  )
}

export default ForgotForm