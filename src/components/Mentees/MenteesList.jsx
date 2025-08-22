import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import MenteeCard from './MenteeCard';
import Button from '../Common/Button';
import { Plus, Search, UserPlus } from 'lucide-react';

function MenteesList() {
  const { mentees } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMentees = mentees.filter(mentee =>
    mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentee.currentRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentee.careerGoals.some(goal => goal.toLowerCase().includes(searchTerm.toLowerCase())) ||
    mentee.skillsNeeded.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mentees</h1>
          <p className="text-gray-600">Support women on their career journey through mentorship</p>
        </div>
        <Link to="/mentees/add">
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add New Mentee</span>
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by name, role, goals, or skills..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Mentees Grid */}
      {filteredMentees.length === 0 ? (
        <div className="text-center py-12">
          <UserPlus className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {searchTerm ? 'No mentees found' : 'No mentees yet'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm 
              ? 'Try adjusting your search terms.'
              : 'Get started by adding your first mentee to the program.'
            }
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <Link to="/mentees/add">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Mentee
                </Button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentees.map(mentee => (
            <MenteeCard key={mentee.id} mentee={mentee} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MenteesList;