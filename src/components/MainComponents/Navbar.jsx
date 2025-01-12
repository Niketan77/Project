import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import Hamburger from "hamburger-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lg:h-20 h-16 flex items-center justify-between shadow-[#1026490F]/10 shadow-md bg-[#FFFFFF] w-full">
      <div>
        <img src={logo} alt="Logo" className="w-24 h-6 lg:ml-14 ml-4"></img>
      </div>
      <div className="hidden lg:flex items-center">
        <div className="text-lg font-semibold text-[#0F1629] mr-6 hover:text-[#2870EA] transition duration-300">
          <button> Crypto Taxes</button>
        </div>
        <div className="text-lg font-semibold text-[#0F1629] mr-6 hover:text-[#2870EA] transition duration-300">
          <button>Free Tools </button>
        </div>
        <div className="text-lg font-semibold text-[#0F1629] mr-2 hover:text-[#2870EA] transition duration-300">
          <button> Resource Center </button>
        </div>
        <div>
          <button className="bg-gradient-to-r from-[#2870EA] to-[#1B4AEF] hover:from-[#1B4AEF] hover:to-[#2870EA] px-8 py-2 text-white rounded-lg mx-14 transition-all duration-300">
            <button> Get Started</button>
          </button>
        </div>
      </div>
      <div className="lg:hidden mr-4">
        <Hamburger toggled={isOpen} toggle={toggleMenu} />
      </div>
      {isOpen && (
        <div className="lg:hidden absolute w-full top-[4em] border-zinc-100 z-10  right-0  h-full  bg-white rounded-md shadow-md py-5">
          <div className="text-lg text-center  font-semibold text-[#0F1629] px-4 py-2">
            <div className="cursor-pointer mb-5 hover:text-[#2870EA] transition duration-300">
              Crypto Taxes
            </div>
            <div className="cursor-pointer mb-5 hover:text-[#2870EA] transition duration-300">
              Free Tools
            </div>
            <div className="cursor-pointer mb-2 hover:text-[#2870EA] transition duration-300">
              Resource Center
            </div>
            <div>
              <button className="bg-gradient-to-r from-[#2870EA] to-[#1B4AEF] px-8 py-2 text-white rounded-lg mx-14 mt-4">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
