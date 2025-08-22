import React from 'react';
import { useApp } from '../../context/AppContext';
import MetricCard from './MetricCard';
import QuickActions from './QuickActions';
import { Users, UserPlus, Link } from 'lucide-react';

function Dashboard() {
  const { totalMentors, totalMentees, activeMatches, matches } = useApp();

  const metrics = [
    {
      title: 'Total Mentors',
      value: totalMentors,
      icon: Users,
      color: 'purple',
      growth: '+12%',
      link: '/mentors'
    },
    {
      title: 'Total Mentees',
      value: totalMentees,
      icon: UserPlus,
      color: 'blue',
      growth: '+8%',
      link: '/mentees'
    },
    {
      title: 'Active Matches',
      value: activeMatches,
      icon: Link,
      color: 'green',
      growth: '+15%',
      link: '/matches'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to AspireCRM</h1>
        <p className="text-purple-100 text-lg mb-6">
          Empowering women through smart mentorship management and meaningful connections.
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-2xl font-bold">{totalMentors + totalMentees}</div>
            <div className="text-sm text-purple-100">Total Community Members</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-2xl font-bold">{matches.length}</div>
            <div className="text-sm text-purple-100">Relationships Formed</div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
        
        <div className="lg:col-span-2">
          <div className="card-base">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">New mentor added: Priya Sharma</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Match created: Aniya & Dr. Maria</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">New mentee registered: Jessica Williams</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;