import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, UserPlus, Link as LinkIcon } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Mentors', href: '/mentors', icon: Users },
  { name: 'Mentees', href: '/mentees', icon: UserPlus },
  { name: 'Matching', href: '/matching', icon: LinkIcon },
];

function Navigation() {
  const location = useLocation();

  return (
    <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:top-16 lg:bg-white lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:overflow-y-auto">
      <div className="flex-1 px-3 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-purple-100 text-purple-700 border-r-2 border-purple-600'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon
                className={`mr-3 h-5 w-5 ${
                  isActive ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-500'
                }`}
              />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default Navigation;