const Toggler = () => {
  return (
    <div>
      <div className="flex space-x-7 lg:space-x-10 font-medium text-[#0F1629] py-4 overflow-x-auto">
        <div className='flex justify-between sm:gap-4 sm:overflow-auto '>
          <a href='#performance' className=' text-[#0141CF] border-[#0052FE] border-b-4 pb-3 mr-4'>Overview</a>
          <a href='#fundamentals' className='pb-3 mr-4'>Fundamentals</a>
          <a href='#NewsInsights ' className='pb-3 mr-4'>News Insights</a>
          <a href='#Sentiments' className='pb-3 mr-4'>Sentiments</a>
          <a href='#Team' className=' pb-3 mr-4'>Team</a>
          <a href='#technical' className=' pb-3 mr-4'>Technicals</a>
          <a href='#Tokenomics' className=' pb-3 mr-4'>Tokenomics</a>
        </div>
      </div>
      <hr className="-mt-4" />
    </div>
  );
}

export default Toggler;