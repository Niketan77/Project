import React from 'react';
import Header from './Header';
import Navigation from './Navigation';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex pt-16">
        <Navigation />
        <main className="flex-1 lg:ml-64">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;