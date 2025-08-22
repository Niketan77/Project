import React from 'react';
import { GraduationCap, Menu } from 'lucide-react';

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <button className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-600 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AspireCRM</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Empowering Women Through Smart Mentorship</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* <div className="hidden md:block text-sm text-gray-500">
              name
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;