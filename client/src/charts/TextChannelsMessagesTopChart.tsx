import { useState } from 'react';

const TextChannelsMessagesTopChart = ({ textChannelsOverview, period }: any) => {
  const currentDate: number = new Date().getTime();
  const itemsPerPage = 20; 
  let i = 0;

  const [currentPage, setCurrentPage] = useState(1);

  const sumMessageCount = (dailyStats: any[]) =>
    dailyStats.reduce((sum, daily) => sum + daily.messageCount, 0);

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

  const channelsMessagesCount = textChannelsOverview.channels.map((channel: { dailyStats: any[]; channelId: any; channelName: any; }) => {
    const lastXDayStats = channel.dailyStats.filter(stat => {
      const statDate: Date | null = parseDateStringToDate(stat.date);
      if (statDate) {
        const diffInDays: number = Math.floor((currentDate - statDate.getTime()) / (1000 * 60 * 60 * 24));
        return diffInDays <= period;
      } else {
        return false;
      }
    });

    return {
      channelId: channel.channelId,
      channelName: channel.channelName,
      messageCount: sumMessageCount(lastXDayStats),
      number: 0
    };
  });

  const sortedChannels = channelsMessagesCount.sort((a: any, b: any) => b.messageCount - a.messageCount);

  sortedChannels.forEach((el: any) => {
    el.number = i++;
  });

  const paginatedChannels = sortedChannels.slice(startIndex, endIndex);

  return (
    <div className='flex flex-col gap-[16px] w-full'>
      {
        
        paginatedChannels.map((channel: any, index:any) => {  
    
          return(
            (
              <div key={index} className='flex justify-between border-b-[1px] border-white_opacity pb-[16px] px-6'>
               <div className='text-[18px] font-roboto font-black'>{channel.number + 1}.</div>
               <div className='text-[18px] font-roboto font-black '>{channel.channelName}</div>
               <div className='text-[18px] font-roboto font-black'>{channel.messageCount}</div>
              </div>
            )
          )
          
        })
      }

      <div className='flex justify-between text-[16px] ss:text-[20px]'>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='cursor-pointer hover__text__yellow'>
          Poprzednia Strona
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={endIndex >= channelsMessagesCount.length} className='cursor-pointer hover__text__yellow'>
          Następna Strona
        </button>
      </div>
    </div>
  );
}

export default TextChannelsMessagesTopChart;
