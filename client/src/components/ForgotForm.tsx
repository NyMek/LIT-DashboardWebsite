import { useState, FormEvent } from 'react'
import { NavLink } from 'react-router-dom';
import { useForgot } from '../hooks/useForgot';

const ForgotForm = () => {

    const [email, setEmail] = useState('');
    const [sendEmail, setSendEmail] = useState(false);
    const { forgot, error, isLoading } = useForgot()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
       
        // if(email && error === null) {

        //   setSendEmail(true)
        // }
        await forgot(email)
        
    }
  return (
    <div className='flex justify-center sm:mt-[80px] lg:mt-[120px] h-full'>

        <div className='flex flex-col w-[500px] p-[80px]'>
            <h2 className='gradient__text font-montserrat uppercase text-[24px] mb-[32px]'>Zresetuj <span className='text-dark_red '>Hasło</span></h2>
            <form action="" method="post" className='flex flex-col' onSubmit={handleSubmit}>

                    <label htmlFor="email" className='text-white'>E-mail</label>
                    <input 
                    type="email" 
                    name="email" 
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} 
                    className='mb-[24px] bg-transparent border border-white p-[16px] hover_gold text-white placeholder:text-white' />
                     <button  disabled={isLoading} type="submit"className='border border_gold px-[48px] py-4 text-center text-white hover_gradient__text'>Wyślij Email</button>
                    
                    {error && <div className='text-dark_red'>{error}</div>}

            </form>
        </div>
        
    </div>
  )
}

export default ForgotForm
