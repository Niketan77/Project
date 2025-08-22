import React from 'react';
import { Link } from 'react-router-dom';

function MetricCard({ title, value, icon: Icon, color, growth, link }) {
  const colorClasses = {
    purple: 'bg-purple-50 text-purple-600',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600'
  };

  const CardContent = () => (
    <div className="flex items-center">
      <div className="flex-1">
        <p className="text-xs sm:text-sm font-medium text-gray-600">{title}</p>
        <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {growth && (
          <p className="text-xs sm:text-sm text-green-600 mt-1">
            <span className="font-medium">{growth}</span> from last month
          </p>
        )}
      </div>
      <div className={`p-2 sm:p-3 rounded-lg ${colorClasses[color]}`}>
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
    </div>
  );

  if (link) {
    return (
      <Link to={link} className="block">
        <div className="card-base hover:shadow-lg transition-shadow cursor-pointer group">
          <CardContent />
        </div>
      </Link>
    );
  }

  return (
    <div className="card-base">
      <CardContent />
    </div>
  );
}

export default MetricCard;