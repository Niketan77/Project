import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Button from '../Common/Button';
import Badge from '../Common/Badge';
import { ArrowLeft, Mail, Phone, Target, Book, Clock, Search, User, Star } from 'lucide-react';

function MenteeProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mentees } = useApp();
  
  const mentee = mentees.find(m => m.id === id);

  if (!mentee) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Mentee not found</h3>
        <p className="text-gray-500 mt-1">The mentee you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/mentees')} className="mt-4">
          Back to Mentees
        </Button>
      </div>
    );
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => navigate('/mentees')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Mentees
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Mentee Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <div className="card-base">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                {mentee.profileImage ? (
                  <img
                    src={mentee.profileImage}
                    alt={mentee.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {getInitials(mentee.name)}
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{mentee.name}</h2>
                    <p className="text-lg text-gray-600">{mentee.currentRole}</p>
                    <p className="text-md text-gray-500">{mentee.experienceLevel} • {mentee.industry}</p>
                  </div>
                  <Badge variant={mentee.matchStatus === 'Matched' ? 'matched' : 'seeking'}>
                    {mentee.matchStatus}
                  </Badge>
                </div>
                
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{mentee.timeCommitment}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{mentee.communicationPreference}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Matched Mentor Info */}
            {mentee.matchedWith && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-purple-900 mb-1">Currently Matched With</h3>
                  <p className="text-lg font-semibold text-purple-700">{mentee.matchedWith}</p>
                  <p className="text-sm text-purple-600">Active mentorship relationship</p>
                </div>
              </div>
            )}
          </div>

          {/* Career Goals & Skills */}
          <div className="card-base">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Career Development</h3>
            
            <div className="space-y-6">
              {/* Career Goals */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  Career Goals
                </h4>
                <div className="flex flex-wrap gap-2">
                  {mentee.careerGoals.map((goal, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium"
                    >
                      {goal}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills Needed */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Book className="h-4 w-4 mr-2" />
                  Skills to Develop
                </h4>
                <div className="flex flex-wrap gap-2">
                  {mentee.skillsNeeded.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Challenges */}
              {mentee.challenges && mentee.challenges.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Current Challenges</h4>
                  <div className="flex flex-wrap gap-2">
                    {mentee.challenges.map((challenge, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-amber-50 text-amber-700 text-sm rounded-full"
                      >
                        {challenge}
                      </span>
                    ))}
                  </div>
                </div>
              )}
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
                <a href={`mailto:${mentee.email}`} className="text-blue-600 hover:text-blue-700">
                  {mentee.email}
                </a>
              </div>
              {mentee.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <a href={`tel:${mentee.phone}`} className="text-blue-600 hover:text-blue-700">
                    {mentee.phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card-base">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              {mentee.matchStatus === 'Seeking Mentor' ? (
                <Link to="/matching" className="block">
                  <Button className="w-full flex items-center justify-center space-x-2">
                    <Search className="h-4 w-4" />
                    <span>Find Mentor</span>
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" className="w-full" disabled>
                  <Star className="h-4 w-4 mr-2" />
                  Already Matched
                </Button>
              )}
              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>

          {/* Preferences */}
          <div className="card-base">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Mentorship Preferences</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Time Commitment</span>
                <span className="font-medium text-sm">{mentee.timeCommitment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Communication</span>
                <span className="font-medium text-sm">{mentee.communicationPreference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Experience Level</span>
                <span className="font-medium text-sm">{mentee.experienceLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Industry</span>
                <span className="font-medium text-sm">{mentee.industry}</span>
              </div>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="card-base">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Development Journey</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge variant={mentee.matchStatus === 'Matched' ? 'matched' : 'seeking'} className="text-xs">
                  {mentee.matchStatus}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Goals Set</span>
                <span className="font-medium">{mentee.careerGoals.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Skills Targeting</span>
                <span className="font-medium">{mentee.skillsNeeded.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenteeProfile;
