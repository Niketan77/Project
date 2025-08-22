import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';
import { sampleMentors, sampleMentees, sampleMatches } from '../utils/sampleData';

const AppContext = createContext();

const initialState = {
  mentors: [],
  mentees: [],
  matches: [],
  loading: false,
  error: null
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'LOAD_DATA':
      return {
        ...state,
        mentors: action.payload.mentors,
        mentees: action.payload.mentees,
        matches: action.payload.matches
      };
    case 'ADD_MENTOR':
      return {
        ...state,
        mentors: [...state.mentors, { ...action.payload, id: Date.now().toString() }]
      };
    case 'ADD_MENTEE':
      return {
        ...state,
        mentees: [...state.mentees, { ...action.payload, id: Date.now().toString() }]
      };
    case 'CREATE_MATCH':
      const newMatch = {
        id: Date.now().toString(),
        mentorId: action.payload.mentorId,
        menteeId: action.payload.menteeId,
        matchDate: new Date().toISOString(),
        status: 'active',
        matchScore: action.payload.score || 0
      };
      
      const updatedMentees = state.mentees.map(mentee =>
        mentee.id === action.payload.menteeId
          ? { 
              ...mentee, 
              matchStatus: 'Matched',
              matchedWith: state.mentors.find(m => m.id === action.payload.mentorId)?.name
            }
          : mentee
      );
      
      const updatedMentors = state.mentors.map(mentor =>
        mentor.id === action.payload.mentorId
          ? {
              ...mentor,
              matchedMentees: [...(mentor.matchedMentees || []), action.payload.menteeId]
            }
          : mentor
      );
      
      return {
        ...state,
        matches: [...state.matches, newMatch],
        mentees: updatedMentees,
        mentors: updatedMentors
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data on mount
  useEffect(() => {
    try {
      const mentors = storage.load(STORAGE_KEYS.MENTORS, sampleMentors);
      const mentees = storage.load(STORAGE_KEYS.MENTEES, sampleMentees);
      const matches = storage.load(STORAGE_KEYS.MATCHES, sampleMatches);
      
      dispatch({
        type: 'LOAD_DATA',
        payload: { mentors, mentees, matches }
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load data' });
    }
  }, []);

  // Save data whenever state changes
  useEffect(() => {
    if (state.mentors.length > 0) {
      storage.save(STORAGE_KEYS.MENTORS, state.mentors);
    }
    if (state.mentees.length > 0) {
      storage.save(STORAGE_KEYS.MENTEES, state.mentees);
    }
    if (state.matches.length > 0) {
      storage.save(STORAGE_KEYS.MATCHES, state.matches);
    }
  }, [state.mentors, state.mentees, state.matches]);

  const addMentor = (mentor) => {
    dispatch({ type: 'ADD_MENTOR', payload: mentor });
  };

  const addMentee = (mentee) => {
    dispatch({ type: 'ADD_MENTEE', payload: { ...mentee, matchStatus: 'Seeking Mentor', matchedWith: null } });
  };

  const createMatch = (mentorId, menteeId, score) => {
    dispatch({ type: 'CREATE_MATCH', payload: { mentorId, menteeId, score } });
  };

  const value = {
    ...state,
    addMentor,
    addMentee,
    createMatch,
    totalMentors: state.mentors.length,
    totalMentees: state.mentees.length,
    activeMatches: state.matches.filter(m => m.status === 'active').length,
    unMatchedMentees: state.mentees.filter(m => m.matchStatus === 'Seeking Mentor'),
    completionRate: state.matches.length > 0 
      ? ((state.matches.filter(m => m.status === 'completed').length / state.matches.length) * 100).toFixed(1)
      : '0.0'
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};