import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { findBestMatches } from '../../utils/matching';
import Button from '../Common/Button';
import Badge from '../Common/Badge';
import { Target, Check, User, Star, Users, ArrowRight } from 'lucide-react';

function MatchingHub() {
  const { unMatchedMentees, mentors, createMatch } = useApp();
  const [selectedMentee, setSelectedMentee] = useState(null);
  const [suggestedMatches, setSuggestedMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSelectMentee = (mentee) => {
    setSelectedMentee(mentee);
    setLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const matches = findBestMatches(mentee, mentors);
      setSuggestedMatches(matches);
      setLoading(false);
    }, 1000);
  };

  const handleCreateMatch = (mentorId, score) => {
    createMatch(mentorId, selectedMentee.id, score);
    setSelectedMentee(null);
    setSuggestedMatches([]);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Smart Matching Hub</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Connect mentees with the perfect mentors using smart compatibility matching</p>
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 sm:p-6 text-white">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 sm:h-8 sm:w-8" />
            <div>
              <div className="text-xl sm:text-2xl font-bold">{unMatchedMentees.length}</div>
              <div className="text-xs sm:text-sm text-purple-100">Awaiting Matches</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 sm:p-6 text-white">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 sm:h-8 sm:w-8" />
            <div>
              <div className="text-xl sm:text-2xl font-bold">{mentors.filter(m => m.availability !== 'Low').length}</div>
              <div className="text-xs sm:text-sm text-green-100">Available Mentors</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 sm:p-6 text-white">
          <div className="flex items-center space-x-3">
            <Target className="h-6 w-6 sm:h-8 sm:w-8" />
            <div>
              <div className="text-lg sm:text-2xl font-bold">Smart Matching</div>
              <div className="text-xs sm:text-sm text-blue-100">Precision Pairing</div>
            </div>
          </div>
        </div>
      </div>

      {unMatchedMentees.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <Check className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-green-500" />
          <h3 className="mt-2 text-base sm:text-lg font-medium text-gray-900">All mentees are matched!</h3>
          <p className="mt-1 text-sm sm:text-base text-gray-500">Great work! Every mentee in your program has been connected with a mentor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Panel - Unmatched Mentees */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Mentees Seeking Mentors</h2>
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              {unMatchedMentees.map(mentee => (
                <div
                  key={mentee.id}
                  onClick={() => handleSelectMentee(mentee)}
                  className={`card-base mobile-card cursor-pointer transition-all ${
                    selectedMentee?.id === mentee.id 
                      ? 'ring-2 ring-purple-500 border-purple-300 bg-purple-50' 
                      : 'hover:shadow-md hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                        {getInitials(mentee.name)}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900">{mentee.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{mentee.currentRole}</p>
                      <p className="text-xs text-gray-500">{mentee.experienceLevel} • {mentee.industry}</p>
                      
                      <div className="mt-2 flex flex-wrap gap-1">
                        {mentee.skillsNeeded.slice(0, 2).map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                        {mentee.skillsNeeded.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{mentee.skillsNeeded.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {selectedMentee?.id === mentee.id && (
                      <div className="flex-shrink-0">
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Suggested Matches */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Suggested Matches</h2>
            </div>
            
            {!selectedMentee ? (
              <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <Target className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                <p className="mt-2 text-xs sm:text-sm text-gray-500">Select a mentee to see smart mentor recommendations</p>
              </div>
            ) : loading ? (
              <div className="text-center py-8 sm:py-12">
                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-2 text-xs sm:text-sm text-gray-500">Calculating optimal matches...</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                  <h3 className="text-sm sm:text-base font-medium text-blue-900">Matching for: {selectedMentee.name}</h3>
                  <p className="text-xs sm:text-sm text-blue-700">Looking for: {selectedMentee.skillsNeeded.join(', ')}</p>
                </div>
                
                {suggestedMatches.length === 0 ? (
                  <div className="text-center py-6 sm:py-8 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-xs sm:text-sm text-yellow-700">No suitable mentors found. Consider expanding the criteria or adding more mentors.</p>
                  </div>
                ) : (
                  suggestedMatches.map((match, index) => (
                    <div key={match.mentor.id} className="card-base mobile-card">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="flex-shrink-0 relative">
                            <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {getInitials(match.mentor.name)}
                            </div>
                            <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                              #{index + 1}
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{match.mentor.name}</h3>
                            <p className="text-sm text-gray-600">{match.mentor.jobTitle}</p>
                            <p className="text-xs text-gray-500">{match.mentor.company}</p>
                            
                            <div className="mt-2">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                                  {match.score}% Match
                                </div>
                                <Badge variant={match.mentor.availability === 'High' ? 'active' : 'seeking'}>
                                  {match.mentor.availability} availability
                                </Badge>
                              </div>
                              
                              <div className="text-xs text-gray-600 space-y-1">
                                {match.reasons.map((reason, idx) => (
                                  <div key={idx} className="flex items-start space-x-1">
                                    <Check className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>{reason}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0 ml-4">
                          <Button
                            size="sm"
                            onClick={() => handleCreateMatch(match.mentor.id, match.score)}
                            className="flex items-center space-x-1"
                          >
                            <span>Create Match</span>
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchingHub;