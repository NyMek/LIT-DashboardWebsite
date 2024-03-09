const ErrorInfo = ({ errorMessage }: { errorMessage: any }) => {
    return (
      <div className='font-roboto flex flex-col items-center p-6 gap-[33px]'>
        <h2 className='text-[28px] leading-[28px] font-black font-roboto sm:text-[32px] sm:leading-[48px] lg:text[40px]'>Wystąpił nieoczekiwany błąd:</h2>
        <p className="text-[16px] sm:text-[18px] leading-[25px] lg:text-[22px]lg:leading-[26px]">{errorMessage}</p>
      </div>
    );
  };

export default ErrorInfo
