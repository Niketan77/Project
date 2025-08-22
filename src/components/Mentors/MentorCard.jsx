import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../Common/Badge';
import Button from '../Common/Button';
import { MapPin, Clock, Users, Link as LinkIcon } from 'lucide-react';

function MentorCard({ mentor }) {
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-amber-600 bg-amber-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="card-base group hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {mentor.profileImage ? (
            <img
              src={mentor.profileImage}
              alt={mentor.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {getInitials(mentor.name)}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{mentor.name}</h3>
          <p className="text-sm text-gray-600 truncate">{mentor.jobTitle}</p>
          <p className="text-sm text-gray-500 truncate">{mentor.company}</p>
        </div>
        
        <div className="flex-shrink-0">
          <Badge variant={mentor.availability === 'High' ? 'active' : mentor.availability === 'Medium' ? 'seeking' : 'default'}>
            {mentor.availability} availability
          </Badge>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {/* Expertise Tags */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Expertise</p>
          <div className="flex flex-wrap gap-2">
            {mentor.expertise.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {mentor.expertise.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{mentor.expertise.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{mentor.yearsExperience} years exp</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{mentor.matchedMentees?.length || 0} mentees</span>
          </div>
        </div>

        {/* Bio */}
        {mentor.bio && (
          <p className="text-sm text-gray-600 line-clamp-2">{mentor.bio}</p>
        )}

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Link to={`/mentors/${mentor.id}`}>
            <Button variant="outline" size="sm" className="flex-1">
              View Profile
            </Button>
          </Link>
          <Link to="/matching">
            <Button size="sm" className="flex items-center space-x-1">
              <LinkIcon className="h-3 w-3" />
              <span>Match</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MentorCard;