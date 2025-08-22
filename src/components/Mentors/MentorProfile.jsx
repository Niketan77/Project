import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Button from '../Common/Button';
import Badge from '../Common/Badge';
import { ArrowLeft, Mail, Phone, MapPin, Clock, Users, Star, Link as LinkIcon } from 'lucide-react';

function MentorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mentors } = useApp();
  
  const mentor = mentors.find(m => m.id === id);

  if (!mentor) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Mentor not found</h3>
        <p className="text-gray-500 mt-1">The mentor you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/mentors')} className="mt-4">
          Back to Mentors
        </Button>
      </div>
    );
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'High': return 'active';
      case 'Medium': return 'seeking';
      case 'Low': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => navigate('/mentors')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Mentors
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Mentor Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <div className="card-base">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                {mentor.profileImage ? (
                  <img
                    src={mentor.profileImage}
                    alt={mentor.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {getInitials(mentor.name)}
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{mentor.name}</h2>
                    <p className="text-lg text-gray-600">{mentor.jobTitle}</p>
                    <p className="text-md text-gray-500">{mentor.company}</p>
                  </div>
                  <Badge variant={getAvailabilityColor(mentor.availability)}>
                    {mentor.availability} availability
                  </Badge>
                </div>
                
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{mentor.yearsExperience} years experience</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{mentor.matchedMentees?.length || 0} current mentees</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{mentor.industry}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {mentor.bio && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-2">About</h3>
                <p className="text-gray-600">{mentor.bio}</p>
              </div>
            )}
          </div>

          {/* Expertise & Preferences */}
          <div className="card-base">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Expertise & Mentorship Details</h3>
            
            <div className="space-y-6">
              {/* Areas of Expertise */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Preferred Mentee Levels */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Preferred Mentee Levels</h4>
                <div className="flex flex-wrap gap-2">
                  {mentor.preferredMenteeLevel.map((level, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                    >
                      {level}
                    </span>
                  ))}
                </div>
              </div>

              {/* Communication Style */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Communication Style</h4>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">
                  {mentor.communicationStyle}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact & Actions */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="card-base">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <a href={`mailto:${mentor.email}`} className="text-purple-600 hover:text-purple-700">
                  {mentor.email}
                </a>
              </div>
              {mentor.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <a href={`tel:${mentor.phone}`} className="text-purple-600 hover:text-purple-700">
                    {mentor.phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card-base">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <Link to="/matching" className="block">
                <Button className="w-full flex items-center justify-center space-x-2">
                  <LinkIcon className="h-4 w-4" />
                  <span>Find Matches</span>
                </Button>
              </Link>
              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="card-base">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Mentorship Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Current Mentees</span>
                <span className="font-medium">{mentor.matchedMentees?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Years Experience</span>
                <span className="font-medium">{mentor.yearsExperience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Availability</span>
                <Badge variant={getAvailabilityColor(mentor.availability)} className="text-xs">
                  {mentor.availability}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorProfile;
