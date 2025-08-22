import React from 'react';
import { useApp } from '../../context/AppContext';
import MetricCard from './MetricCard';
import QuickActions from './QuickActions';
import { Users, UserPlus, Link } from 'lucide-react';

function Dashboard() {
  const { totalMentors, totalMentees, activeMatches, matches, activities } = useApp();

  // Helper function to format time ago
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return activityTime.toLocaleDateString();
  };

  // Get activity color based on type
  const getActivityColor = (type) => {
    switch (type) {
      case 'mentor_added': return 'bg-purple-500';
      case 'mentee_added': return 'bg-blue-500';
      case 'match_created': return 'bg-green-500';
      case 'system': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const metrics = [
    {
      title: 'Total Mentors',
      value: totalMentors,
      icon: Users,
      color: 'purple',
      link: '/mentors'
    },
    {
      title: 'Total Mentees',
      value: totalMentees,
      icon: UserPlus,
      color: 'blue',
      link: '/mentees'
    },
    {
      title: 'Active Matches',
      value: activeMatches,
      icon: Link,
      color: 'green',
      link: '/matches'
    }
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-4 sm:p-6 lg:p-8 text-white">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Welcome to AspireCRM</h1>
        <p className="text-purple-100 text-sm sm:text-base lg:text-lg mb-4 lg:mb-6">
          Empowering women through smart mentorship management and meaningful connections.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3 sm:p-4 flex-1">
            <div className="text-xl sm:text-2xl font-bold">{totalMentors + totalMentees}</div>
            <div className="text-xs sm:text-sm text-purple-100">Total Community Members</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3 sm:p-4 flex-1">
            <div className="text-xl sm:text-2xl font-bold">{matches.length}</div>
            <div className="text-xs sm:text-sm text-purple-100">Relationships Formed</div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
        
        <div className="lg:col-span-2">
          <div className="card-base">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {activities.length > 0 ? (
                activities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 ${getActivityColor(activity.type)} rounded-full`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{getTimeAgo(activity.timestamp)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center py-8 text-gray-500">
                  <p className="text-sm">No recent activities. Start by adding mentors and mentees!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;