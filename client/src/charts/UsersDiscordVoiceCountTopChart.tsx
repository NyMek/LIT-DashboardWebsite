import { useState } from 'react';

const UsersDiscordVoiceCountTopChart = ({ usersOverview, period}: any) => {
  const currentDate: number = new Date().getTime();
  const itemsPerPage = 20;
  let i = 0;

  const [currentPage, setCurrentPage] = useState(1);


  const sumVoiceCount = (dailyStats: any[]) =>
    dailyStats.reduce((sum, daily) => sum + daily.voiceChannelMinutes, 0);

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const usersVoiceCount = usersOverview.users.map((user: { dailyStats: any[]; userId: any; userName: any; }) => {
    const lastXDayStats = user.dailyStats.filter(stat => {
      const statDate: Date | null = parseDateStringToDate(stat.date);
      if (statDate) {
        const diffInDays: number = Math.floor((currentDate - statDate.getTime()) / (1000 * 60 * 60 * 24));
        return diffInDays <= period;
      } else {
        return false;
      }
    });

    return {
      userId: user.userId,
      userName: user.userName,
      voiceChannelMinutes: sumVoiceCount(lastXDayStats),
      number: 0
    };
  });

  const sortedUsers = usersVoiceCount.sort((a: any, b: any) => b.voiceChannelMinutes - a.voiceChannelMinutes);

  sortedUsers.forEach((el: any) => {
    el.number = i++;
  });

  const paginatedUser = sortedUsers.slice(startIndex, endIndex);



  
  return (
    <div className='flex flex-col gap-[16px] w-full'>
    {
      
      paginatedUser.map((user: any) => {  
  
        return(
          (
            <div key={user.userId} className='flex justify-between border-b-[1px] border-white_opacity pb-[16px] px-6'>
             <div className='text-[18px] font-roboto font-black'>{user.number + 1}.</div>
             <div className='text-[18px] font-roboto font-black '>{user.userName}</div>
             <div className='text-[18px] font-roboto font-black'>{user.voiceChannelMinutes}</div>
            </div>
          )
        )
        
      })
    }

    <div className='flex justify-between text-[16px] ss:text-[20px]'>
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='cursor-pointer hover__text__yellow'>
        Poprzednia Strona
      </button>
      <button onClick={() => setCurrentPage(currentPage + 1)} disabled={endIndex >= usersVoiceCount.length} className='cursor-pointer hover__text__yellow'>
        Następna Strona
      </button>
    </div>

  </div>
  );
}

export default UsersDiscordVoiceCountTopChart;
