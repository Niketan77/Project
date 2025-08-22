import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../Common/Badge';
import Button from '../Common/Button';
import { Target, Book, Clock, Search } from 'lucide-react';

function MenteeCard({ mentee }) {
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="card-base group hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {mentee.profileImage ? (
            <img
              src={mentee.profileImage}
              alt={mentee.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {getInitials(mentee.name)}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{mentee.name}</h3>
          <p className="text-sm text-gray-600 truncate">{mentee.currentRole}</p>
          <p className="text-sm text-gray-500">{mentee.experienceLevel}</p>
        </div>
        
        <div className="flex-shrink-0">
          <Badge variant={mentee.matchStatus === 'Matched' ? 'matched' : 'seeking'}>
            {mentee.matchStatus}
          </Badge>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {/* Career Goals */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Career Goals</p>
          <div className="flex flex-wrap gap-2">
            {mentee.careerGoals.slice(0, 2).map((goal, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
              >
                {goal}
              </span>
            ))}
            {mentee.careerGoals.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{mentee.careerGoals.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Skills Needed */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Skills Needed</p>
          <div className="flex flex-wrap gap-2">
            {mentee.skillsNeeded.slice(0, 2).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {mentee.skillsNeeded.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{mentee.skillsNeeded.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Match Status */}
        {mentee.matchedWith && (
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-sm text-purple-700">
              <span className="font-medium">Matched with:</span> {mentee.matchedWith}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Link to={`/mentees/${mentee.id}`}>
            <Button variant="outline" size="sm" className="flex-1">
              View Profile
            </Button>
          </Link>
          {mentee.matchStatus === 'Seeking Mentor' && (
            <Link to="/matching">
              <Button size="sm" className="flex items-center space-x-1">
                <Search className="h-3 w-3" />
                <span>Find Mentor</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenteeCard;