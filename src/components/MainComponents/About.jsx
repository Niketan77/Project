import React from "react";
import calpic from '../../assets/calpic.png'

const About = () => {
  return (
    <div className="bg-white h-max rounded-lg my-5 p-6" id="NewsInsights">
      <div>
        <div className="text-2xl font-semibold text-[#0F1629]">
          About Bitcoin
        </div>
        <div className="mt-6">
          <div className="text-lg font-semibold text-[#0B1426]">
            What is Bitcoin?
          </div>
          <div className="mt-2 pb-4 text-[#3E4249] border-b-2 border-[#C9CFDE]/40">
            Bitcoin’s price today is US$16,951.82, with a 24-hour trading volume
            of $19.14 B. BTC is +0.36% in the last 24 hours. It is currently
            -7.70% from its 7-day all-time high of $18,366.66, and 3.40% from
            its 7-day all-time low of $16,394.75. BTC has a circulating supply
            of 19.24 M BTC and a max supply of 21 M BTC.
          </div>
        </div>
        <div className="mt-2 border-b-2 border-[#C9CFDD]/40 pb-4">
          <div className="text-lg text-[#0B1426] font-semibold">
            Lorem ipsum dolor sit amet
          </div>
          <div className="text-[#0F1629] mt-2">
            Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit
            lobortis tristique pharetra. Diam id et lectus urna et tellus
            aliquam dictum at. Viverra diam suspendisse enim facilisi diam ut
            sed. Quam scelerisque fermentum sapien morbi sodales odio sed
            rhoncus. Ultricies urna volutpat pendisse enim facilisi diam ut sed.
            Quam scelerisque fermentum sapien morbi sodales odio sed rhoncus.
          </div>

          <div className="mt-6 text-[#0F1629]">
            Diam praesent massa dapibus magna aliquam a dictumst volutpat.
            Egestas vitae pellentesque auctor amet. Nunc sagittis libero
            adipiscing cursus felis pellentesque interdum. Odio cursus phasellus
            velit in senectus enim dui. Turpis tristique placerat interdum sed
            volutpat. Id imperdiet magna eget eros donec cursus nunc. Mauris
            faucibus diam mi nunc praesent massa turpis a. Integer dignissim
            augue viverra nulla et quis lobortis phasellus. Integer pellentesque
            enim convallis ultricies at.
          </div>
          <div className="mt-6 text-[#0F1629]">
            Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam
            massa vel convallis duis ac. Mi adipiscing semper scelerisque
            porttitor pulvinar nunc risus. Fermentum potenti iaculis lacinia
            congue ipsum fames amet dui. Purus ultrices tincidunt volutpat in
            eget. Ullamcorper dui
          </div>
        </div>

        <div className=" mt-2 py-2">
          <div className="text-[#0F1629] text-2xl font-semibold">
            Already Holding Bitcoin?
          </div>
          <div className="flex flex-col lg:flex-row border-b-2 border-[#C9CFDD]/40 pb-2">
            <div className="mt-4">
              <img src={calpic} alt='calpic' className='pb-2' />
            </div>
          </div>
        </div>
        <div className="my-2 text-[#0F1629]">
          Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam
          massa vel convallis duis ac. Mi adipiscing semper scelerisque
          porttitor pulvinar nunc risus. Fermentum potenti iaculis lacinia
          congue ipsum fames amet dui. Purus ultrices tincidunt volutpat in
          eget. Ullamcorper dui
        </div>
      </div>
    </div>
  );
}

export default About;
