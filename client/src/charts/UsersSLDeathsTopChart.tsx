import { useState } from 'react';

const UsersSLDeathsTopChart = ({ usersSlOverview, period }: any) => {
  const currentDate: number = new Date().getTime();
  const itemsPerPage = 20; 
  let i = 0;
  const usersSLOverviewArray = Array.from(usersSlOverview);
 
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const sumKillCount = (dailyStats: any[]) =>
    dailyStats.reduce((sum, daily) => sum + daily.deaths, 0);

  const parseDateStringToDate = (dateString: string): Date | null => {
    const parts = dateString.split('.');
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      return new Date(year, month - 1, day);
    } else {
      console.error('Nieprawidłowy format daty:', dateString);
      return null;
    }
  };
  const userKillsCount = usersSLOverviewArray.map((user: any) => {
    if(user.dntEnabled == true ) {
        return
    }else {
        const lastXDayStats = user.dailyStats.filter((stat: any) => {
            if(stat._id != null) {
                const statDate: Date | null = parseDateStringToDate(stat._id);
                if (statDate) {
                  const diffInDays: number = Math.floor((currentDate - statDate.getTime()) / (1000 * 60 * 60 * 24));
                  return diffInDays < period;
                } else {
                  return false;
                }
            } else {
                console.log('Data Null ')
            }
    
        });
        return {
            id: user._id,
            userName: user.nickname,
            killCount: sumKillCount(lastXDayStats),
            number: 0
          };
    }

  });



  const sortedUsers = userKillsCount.sort((a: any, b: any) => b.killCount - a.killCount);

  sortedUsers.forEach((el: any) => {
    if(el) {
        el.number = i++;
    }
    
  });

  const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

  return (
    <div className='flex flex-col gap-[16px] w-full'>
      {
        
        paginatedUsers.map((user: any, index:any) => {  
    
          return(
            (
              <div key={user.id} className='flex justify-between border-b-[1px] border-white_opacity pb-[16px] px-6'>
               <div className='text-[18px] font-roboto font-black'>{user.number + 1}.</div>
               <div className='text-[18px] font-roboto font-black '>{user.userName}</div>
               <div className='text-[18px] font-roboto font-black'>{user.killCount}</div>
              </div>
            )
          )
          
        })
      }

      <div className='flex justify-between text-[16px] ss:text-[20px]'>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='cursor-pointer hover__text__yellow'>
          Poprzednia Strona
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={endIndex >= userKillsCount.length} className='cursor-pointer hover__text__yellow'>
          Następna Strona
        </button>
      </div>
    </div>
  );
}

export default UsersSLDeathsTopChart;
