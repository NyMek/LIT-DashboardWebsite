import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const OldProjects = () => {

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1060 },
      items: 3,
      slidesToSlide: 3 
    },
    tablet: {
      breakpoint: { max: 1060, min: 768 },
      items: 2,
      slidesToSlide: 2 
    },
    mobile: {
      breakpoint: { max: 580, min: 0 },
      items: 1,
      slidesToSlide: 1 
    }
  };
  return (
    <section id="history" className='gradient__bg'>


    <div className='p-6  lg:p-[80px] sm:p-[40px]'>
    <h2 className='font-barlow_condensed text-white font-black text-[28px] leading-[28px] sm:text-[32px] sm:leading-[48px] lg:text-[40px] lg:leading-[28px] pb-6 sm:pb-[40px] lg:pb-[80px]'>Historia serwera <span className="gradient__text font-bold">GoldLegends</span></h2>
    <Carousel
        swipeable={false}
        draggable={true}
        responsive={responsive}
        ssr={false} 
        keyBoardControl={true}
        customTransition="all 1s"
        transitionDuration={500}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black sm:text-[32px]'>22.06.2018</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Założenie Serwera</h3>
            <p>W tym dniu zaczęła się pewna legenda...</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black sm:text-[32px]'>24.08.2018</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>I Ty możesz zostać moderatorem GoldLegends!</h3>
            <p>Pierwsza rekrutacja na stanowiska Moderatorów, wyłonione wtedy osoby na zawsze zmieniły bieg historii serwera</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>07.10.2018</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Ogłoszenie Konstytucji GoldLegends</h3>
            <p>Każdy dostał swoje prawa, jak i obowiązki.</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>30.10.2018</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Sojusz z Somsiadownią</h3>
            <p>Nadszedł czas miecza i topora, w tym momęcie wojna była już kwestią godzin.</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>30.10.2018</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Bunt i odejście Administracji</h3>
            <p>Nastąpiła wojna domowa w administracji po zawarciu Sojuszu z somiadownią</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>07.11.2018</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Święta wojna z Somsiadownią</h3>
            <p>Niezadowolona społeczność GL wszczyna wojnę przeciwko Somsiadowni, trwa ofensywa na #gadu-gadu</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>12.11.2018</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Nowy start serwera, banicja osób z Somsiadowni</h3>
            <p>Zarząd powrócił na serwer, a w celu uspokojenia społeczności została przeprowadzona czystka.</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>1.12.2018</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Pierwsza edycja Jakiej To Melodii</h3>
            <p>Sapper przeprowadził jeden z najwiekszych eventów na Discordzie GL</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>26.01.2019</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Powstanie Serwera w Unturned</h3>
            <p>GoldLegends poszerza swoje działania o serwer w Unturned</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>09.03.2019</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Pierwsza edycja serwera w Minecraft</h3>
            <p>Jak to czasem bywa, każdy chciał pograć w minecrafta i w tym pomogliśmy</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>21.01.2020</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Event Memiarz</h3>
            <p>Każdy mógł się wykasać swoimi memiarskimi zdolnościami</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>24.04.2020</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Nieoficjalny serwer Minecraft</h3>
            <p>Jedna z lepszych edycji serwerów Minecraft, stworzona przez honkadaloonga aka Janek</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>22.08.2020</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Zwiastun kanału Youtube</h3>
            <p>Pierwszy filmik na kanale GoldLegends opisujący historię serwera</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>17.02.2021</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Druga Edycja servera w Unturned</h3>
            <p>Server w Unturned został ponownie otwarty na pewien okres czasu</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>26.02.2021</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Kolejna Edycja servera w Minecraft</h3>
            <p>Kolejna bardzo udana edycja serwera Minecraft, wyróżniała się dużą ilością graczy, rozbudowanym spawnem oraz klubem nocnym</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>01.05.2021</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Widmo kolejnej wojny załagodzone</h3>
            <p>Napięcia na linii GoldLegends - Utopia, zostały załagodzone, zawarty został układ o przyjacielskich stosunkach</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>01.05.2021</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Widmo kolejnej wojny załagodzone</h3>
            <p>Napięcia na linii GoldLegends - Utopia, zostały załagodzone, zawarty został układ o przyjacielskich stosunkach</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>26.06.2021</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Otworzenie servera RolePlay w SCP: Secret Laboratory</h3>
            <p>Napięcia na linii GoldLegends - Utopia, zostały załagodzone, zawarty został układ o przyjacielskich stosunkach</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>08.08.2021</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Kim jesteśmy? Dokąd zmierzamy?</h3>
            <p>Zebranie społeczności w celu przedyskutowania dalszego działania serwera</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>22.08.2021</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Jeszcze jedna edycja serwera w Minecraft</h3>
            <p>Całkiem udana edycja, z przepięknym spawnem w średniowiecznym stylu</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>04.02.2022</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Informacja o Zamknięciu Serwerów</h3>
            <p>Nic nie może trwać wiecznie... 07.02.2022 serwery GoldLegends w SCP: Secret Laboratory po praktycznie 4 latach zostały zamknięte... jak się wtedy wydawało na zawsze, a serwer discordowy przeszedł w stan stagnacji</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>22.06.2022</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Coś się kończy coś się zaczyna</h3>
            <p>Dokładnie po 4 latach działalności, serwer GoldLegends został oficjalnie zamknięty</p>
        </div>
        <div className='cursor-pointer text-white'>
            <h3 className='font-barlow_condensed text-[24px] leading-[32px] font-black '>03.11.2023</h3>
            <div className='w-full border_gold my-6'></div>
            <h3 className='text-[24px] font-roboto leading-[32px] font-black pb-[8px]'>Powrót na SL'a</h3>
            <p>Po prawie dwu letniej przerwie GoldLegends powrócił, a czy czeka go świetlana przyszłość, tego przekonamy się wkrótce</p>
        </div>
          
      </Carousel>
    </div>
      

      <Carousel
        swipeable={false}
        draggable={true}
        responsive={responsive}
        ssr={false} 
        infinite={true}
        keyBoardControl={true}
        customTransition="all 1s"
        transitionDuration={500}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        <div className='cursor-pointer  '>
          <img src="../../assets/grafiki/173.png" alt="" className='cursor-pointer  pointer-events-none'/>
        </div>
        <div className='cursor-pointer  '>
          <img src="../../assets/grafiki/2.png" alt="" className='cursor-pointer  pointer-events-none'/>
        </div>
        <div className='cursor-pointer '>
          <img src="../../assets/grafiki/3.png" alt="" className='cursor-pointer  pointer-events-none'/>
        </div>
        <div className='cursor-pointer  '>
          <img src="../../assets/grafiki/4.png" alt="" className='cursor-pointer  pointer-events-none'/>
        </div>
      </Carousel>
    </section>
  )
}

export default OldProjects
