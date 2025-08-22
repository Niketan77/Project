import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Button from '../Common/Button';
import Badge from '../Common/Badge';
import { ArrowLeft, Users, Calendar, Star, MessageCircle, ExternalLink } from 'lucide-react';

function ActiveMatches() {
  const { matches, mentors, mentees } = useApp();
  
  // Get active matches with full mentor and mentee details
  const activeMatches = matches
    .filter(match => match.status === 'active')
    .map(match => {
      const mentor = mentors.find(m => m.id === match.mentorId);
      const mentee = mentees.find(m => m.id === match.menteeId);
      return {
        ...match,
        mentor,
        mentee
      };
    })
    .filter(match => match.mentor && match.mentee); // Only include matches with valid mentor and mentee

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMatchScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <Link to="/">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Active Matches</h1>
          <p className="text-sm sm:text-base text-gray-600">Current mentor-mentee relationships in your program</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="card-base mobile-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{activeMatches.length}</p>
              <p className="text-xs sm:text-sm text-gray-600">Active Relationships</p>
            </div>
          </div>
        </div>
        
        <div className="card-base mobile-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
              <Star className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {activeMatches.length > 0 
                  ? Math.round(activeMatches.reduce((sum, match) => sum + match.matchScore, 0) / activeMatches.length)
                  : 0
                }%
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Avg Match Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Matches List */}
      {activeMatches.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <Users className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
          <h3 className="mt-2 text-base sm:text-lg font-medium text-gray-900">No Active Matches</h3>
          <p className="mt-1 text-sm sm:text-base text-gray-500">
            There are currently no active mentor-mentee relationships in your program.
          </p>
          <div className="mt-4 sm:mt-6">
            <Link to="/matching">
              <Button size="sm" className="w-full sm:w-auto">
                <Users className="h-4 w-4 mr-2" />
                Create New Matches
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <h2 className="text-base sm:text-lg font-medium text-gray-900">
              Current Relationships ({activeMatches.length})
            </h2>
            <Link to="/matching">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Users className="h-4 w-4 mr-2" />
                Create More Matches
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {activeMatches.map((match) => (
              <div key={match.id} className="card-base mobile-card">
                <div className="flex flex-col lg:flex-row items-start space-y-4 lg:space-y-0 lg:space-x-6">
                  {/* Mentor Info */}
                  <div className="flex-1 w-full">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="flex-shrink-0">
                        {match.mentor.profileImage ? (
                          <img
                            src={match.mentor.profileImage}
                            alt={match.mentor.name}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                            {getInitials(match.mentor.name)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">{match.mentor.name}</h3>
                          <Badge variant="active">Mentor</Badge>
                        </div>
                        <p className="text-xs sm:text-sm lg:text-base text-gray-600">{match.mentor.jobTitle}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{match.mentor.company}</p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
                          <Link to={`/mentors/${match.mentor.id}`}>
                            <Button variant="outline" size="sm" className="w-full sm:w-auto">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View Profile
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Match Info */}
                  <div className="flex-shrink-0 w-full lg:w-auto lg:text-center lg:px-6">
                    <div className="flex flex-row lg:flex-col items-center lg:items-center justify-between lg:justify-center space-x-4 lg:space-x-0 lg:space-y-2 bg-gray-50 lg:bg-transparent p-3 lg:p-0 rounded-lg lg:rounded-none">
                      <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getMatchScoreColor(match.matchScore)}`}>
                        {match.matchScore}% Match
                      </div>
                      <div className="text-xs text-gray-500 lg:text-center">
                        Matched on {formatDate(match.matchDate)}
                      </div>
                      <Button variant="outline" size="sm" className="hidden lg:block">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>

                  {/* Mentee Info */}
                  <div className="flex-1 w-full">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      {/* Mobile Layout: Image Left, Content Right */}
                      <div className="flex-shrink-0 lg:hidden">
                        {match.mentee.profileImage ? (
                          <img
                            src={match.mentee.profileImage}
                            alt={match.mentee.name}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                            {getInitials(match.mentee.name)}
                          </div>
                        )}
                      </div>
                      
                      {/* Content - Left aligned on mobile, Right aligned on desktop */}
                      <div className="flex-1 text-left lg:text-right">
                        <div className="flex items-center lg:justify-end space-x-2">
                          <span className="lg:hidden"><Badge variant="seeking">Mentee</Badge></span>
                          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">{match.mentee.name}</h3>
                          <span className="hidden lg:inline"><Badge variant="seeking">Mentee</Badge></span>
                        </div>
                        <p className="text-xs sm:text-sm lg:text-base text-gray-600">{match.mentee.currentRole}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{match.mentee.experienceLevel}</p>
                        <div className="flex items-center lg:justify-end space-x-2 lg:space-x-4 mt-2">
                          <Link to={`/mentees/${match.mentee.id}`}>
                            <Button variant="outline" size="sm" className="w-full sm:w-auto">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View Profile
                            </Button>
                          </Link>
                        </div>
                      </div>
                      
                      {/* Desktop Layout: Image Right */}
                      <div className="flex-shrink-0 hidden lg:block">
                        {match.mentee.profileImage ? (
                          <img
                            src={match.mentee.profileImage}
                            alt={match.mentee.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {getInitials(match.mentee.name)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Message Button */}
                  <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
                    <Button variant="outline" size="sm" className="w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </div>

                {/* Match Details */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Shared Goals</p>
                      <div className="flex flex-wrap gap-1">
                        {match.mentee.careerGoals.slice(0, 2).map((goal, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                            {goal}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Expertise Match</p>
                      <div className="flex flex-wrap gap-1">
                        {match.mentor.expertise
                          .filter(skill => match.mentee.skillsNeeded.includes(skill))
                          .slice(0, 2)
                          .map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                              {skill}
                            </span>
                          ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Communication</p>
                      <span className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded-full">
                        {match.mentee.communicationPreference}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ActiveMatches;
