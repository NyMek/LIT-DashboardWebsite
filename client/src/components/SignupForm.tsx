import { useState, FormEvent } from 'react'
import { useSignup } from '../hooks/useSignup'

const SignupForm = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      await signup(username, email, password)
  }

  return (
    <div className='flex justify-center sm:mt-[80px] lg:mt-[120px] h-full'>

        <div className='flex flex-col w-[500px] p-[80px]'>
            <h2 className='gradient__text font-montserrat uppercase text-[24px] mb-[32px]'>Stwórz Konto</h2>

            <form 
            action="" 
            method="post" 
            className='flex flex-col' 
            onSubmit={handleSubmit}>
                    <label htmlFor='username' className='text-white '>Username</label>
                    <input 
                    type="text" 
                    name="username" 
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder='Username' 
                    className='mb-[24px] bg-transparent border border-white p-[16px] hover_gold text-white placeholder:text-white'/>

                    <label htmlFor="email" className='text-white'>E-mail</label>
                    <input 
                    type="email" 
                    name="email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder='gold@legends.gl' 
                    className='mb-[24px] bg-transparent border border-white p-[16px] hover_gold placeholder:text-white' />

                    <label htmlFor="password" className='text-white'>Hasło</label>
                    <input 
                    type="password" 
                    name="password" 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Wybierz silne hasło' 
                    className='mb-[24px] bg-transparent border border-white p-[16px] hover_gold placeholder:text-white'/>

                    <button disabled={isLoading}  type="submit"className='border_gold px-[48px] py-4 text-center text-white hover_gradient__text'>Stwórz Konto</button> 
                    {error && <div className='text-dark_red'>{error}</div>}
            </form>
        </div>
        
    </div>
  )
}

export default SignupForm
