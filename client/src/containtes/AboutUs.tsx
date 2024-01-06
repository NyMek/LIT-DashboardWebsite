import React from 'react'
interface CardProps {
  img: string
  name: string
  text: string
}

const menagement = [
  {img: '../../assets/avatar/budlo.png', name: 'Budło', text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, blanditiis.'},
  {img: '../../assets/avatar/mute.jpg', name: 'Mute', text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, blanditiis.'},
  {img: '../../assets/avatar/NyMek.png', name: 'NyMek', text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, blanditiis.'}
]

const Card: React.FC<CardProps> = ({ img, name, text }) => {
  return (
    <div className='text-white pb-[33px] px-[24px] sm:px-[58px] lg:px-[86px] menagement_bar'>
      <div className='flex items-center gap-[16px] mb-[16px]'>
        <img src={img} alt={name} className='w-[50px] h-[50px] rounded-full ' />
        <h4 className='text-[#a30015]  font-roboto text-[24px] font-bold ' >{name}</h4>

      </div>

      <p className='font-roboto'>{text}</p>
    </div>
  )
}

const AboutUs = () => {
  return (
    <section id="about" className='gradient__bg px-6 sm:p-[40px] lg:p-[80px] lg:pl-[0] pt-[80px] lg:pt-0'>
      <div className='flex flex-col md:flex-row  md:relative'>

        <img src="../../assets/grafiki/igl.jpg" alt="" className=' object-cover md:w-[375px] md:h-[375px] lg:w-[500px] xl:w-[550px] xl:h-[550px] lg:h-[500px] md:absolute md:right-[50px] md:bottom-1/2 md:translate-y-[55%] '/>

        <div className='gradient__gold mt-[48px] p-6 sm:p-[58px] lg:p-[86px] text-black  md:w-4/5 md:h-[600px]'>
          <h2 className='font-barlow_condensed text-[40px] uppercase font-black leading-[40px] sm:text-[48px] sm:leading-[48px] lg:text-[72px] lg:leading-[72px] mb-[24px]  '>GoldLegends</h2>

          <p className='font-roboto text-[20px] leading-[26px] md:w-[500px] lg:w-[700px] xl:w-[1000px] pt-[24px] sp:mb-[40px] border-t-[1px]  border-opacity-25 border-black'>
          Jesteśmy jedną z najstarszych sieci serwerów w Polsce prowadzących swoje serwery w grze SCP: Secret Laboratory. Nasze serwery, były dostępne już od czerwca 2018r. do lutego 2022r. Pod koniec 2023r. postanowiliśmy wrócić i otworzyć swoje serwery ponownie. Nie skupiamy się wyłącznie na SCP: Secret Laboratory; od czasu do czasu otwieramy serwery w innych grach, takich jak Minecraft, Unturned czy G-mod. Ponadto, prowadzimy również serwer Discord, który jest centralnym punktem dla społeczności naszych graczy. Na tym serwerze organizujemy okazjonalne wydarzenia z różnymi nagrodami.</p>
        </div>
      </div>

      <h2 className='font-barlow_condensed text-white p-6 sm:px-[40px] lg:px-[80px] lg:mt-[80px] sm:my-[40px] font-black text-[28px] leading-[28px] sm:text-[32px] sm:leading-[48px] lg:text-[40px] lg:leading-[28px]'>Zarząd <span className="gradient__text">GoldLegends</span></h2>
      <div className='flex flex-col sm:flex-row lg:justify-center lg:mt-[2menagement_barpx] lg:mb-[80px] sm:mb-[40px]'>
        
        {
          menagement.map((e, index) => (
            <Card img={e.img} name={e.name} text={e.text} key={index}/>
          ))
        }
      </div>
    </section>
  )
}

export default AboutUs
