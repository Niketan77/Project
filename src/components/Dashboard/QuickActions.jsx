import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Common/Button';
import { UserPlus, Users, Link as LinkIcon } from 'lucide-react';

function QuickActions() {
  const actions = [
    {
      title: 'Add New Mentor',
      description: 'Register an experienced professional',
      href: '/mentors/add',
      icon: Users,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Add New Mentee',
      description: 'Welcome a new program participant',
      href: '/mentees/add',
      icon: UserPlus,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Create Matches',
      description: 'Connect mentors with mentees',
      href: '/matching',
      icon: LinkIcon,
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      </div>
      
      <div className="space-y-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <Link
              key={index}
              to={action.href}
              className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-md ${action.color} text-white group-hover:scale-110 transition-transform`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{action.title}</p>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;