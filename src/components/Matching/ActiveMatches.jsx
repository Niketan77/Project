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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Active Matches</h1>
          <p className="text-gray-600">Current mentor-mentee relationships in your program</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-base">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeMatches.length}</p>
              <p className="text-sm text-gray-600">Active Relationships</p>
            </div>
          </div>
        </div>
        
        <div className="card-base">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {activeMatches.length > 0 
                  ? Math.round(activeMatches.reduce((sum, match) => sum + match.matchScore, 0) / activeMatches.length)
                  : 0
                }%
              </p>
              <p className="text-sm text-gray-600">Avg Match Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Matches List */}
      {activeMatches.length === 0 ? (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No Active Matches</h3>
          <p className="mt-1 text-gray-500">
            There are currently no active mentor-mentee relationships in your program.
          </p>
          <div className="mt-6">
            <Link to="/matching">
              <Button>
                <Users className="h-4 w-4 mr-2" />
                Create New Matches
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">
              Current Relationships ({activeMatches.length})
            </h2>
            <Link to="/matching">
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Create More Matches
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {activeMatches.map((match) => (
              <div key={match.id} className="card-base">
                <div className="flex items-start space-x-6">
                  {/* Mentor Info */}
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {match.mentor.profileImage ? (
                          <img
                            src={match.mentor.profileImage}
                            alt={match.mentor.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {getInitials(match.mentor.name)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900">{match.mentor.name}</h3>
                          <Badge variant="active">Mentor</Badge>
                        </div>
                        <p className="text-gray-600">{match.mentor.jobTitle}</p>
                        <p className="text-sm text-gray-500">{match.mentor.company}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Link to={`/mentors/${match.mentor.id}`}>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View Profile
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Match Info */}
                  <div className="flex-shrink-0 text-center px-6">
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchScoreColor(match.matchScore)}`}>
                        {match.matchScore}% Match
                      </div>
                      <div className="text-xs text-gray-500">
                        Matched on {formatDate(match.matchDate)}
                      </div>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>

                  {/* Mentee Info */}
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <div className="flex-1 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Badge variant="seeking">Mentee</Badge>
                          <h3 className="text-lg font-semibold text-gray-900">{match.mentee.name}</h3>
                        </div>
                        <p className="text-gray-600">{match.mentee.currentRole}</p>
                        <p className="text-sm text-gray-500">{match.mentee.experienceLevel}</p>
                        <div className="flex items-center justify-end space-x-4 mt-2">
                          <Link to={`/mentees/${match.mentee.id}`}>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View Profile
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
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
                </div>

                {/* Match Details */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Shared Goals</p>
                      <div className="flex flex-wrap gap-1">
                        {match.mentee.careerGoals.slice(0, 2).map((goal, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                            {goal}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Expertise Match</p>
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
