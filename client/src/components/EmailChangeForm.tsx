import { useState, FormEvent } from "react"
import { useUpdateEmail } from "../hooks/useUpdateEmail"

const EmailChangeForm = ({toggleMenu, animate}: {toggleMenu: any, animate:any}) => {
    const [newEmail, setNewEmail] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const { updateEmail, error, isLoading } = useUpdateEmail()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    
        await updateEmail(newEmail, currentPassword) 
      }

  return (
    <div className={` ${toggleMenu ? ' flex' : ' hidden'} flex-col sm:px-[40px]  lg:px-[80px] ${animate}`}>
        <form 
        action="" 
        method="post" 
        className={`flex flex-col ${animate}`} 
        onSubmit={handleSubmit}>
            <input 
                type="email" 
                name="email" 
                id="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)} 
                placeholder='newgold@legends.gl'  
                className={`mb-[23px] bg-transparent border border-white p-[16px] hover_gold text-white placeholder:text-white ${animate}` }/>
            <input 
                type="password" 
                name="password" 
                id="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder='Wpisz swoje hasło' 
                className={`mb-[33px] bg-transparent border border-white p-[16px] hover_gold text-white placeholder:text-white ${animate}`}/>

            <button disabled={isLoading}  type="submit"className={`border_gold font-roboto px-[48px] py-4 text-center text-white hover__text__yellow ${animate}`}>Zaktualizuj Email</button> 
            {error && <div className='text-dark_red'>{error}</div>}
        </form>
   </div>
  )
}

export default EmailChangeForm
