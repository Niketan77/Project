import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';
import { sampleMentors, sampleMentees, sampleMatches } from '../utils/sampleData';

const AppContext = createContext();

const initialState = {
  mentors: [],
  mentees: [],
  matches: [],
  activities: [],
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
        matches: action.payload.matches,
        activities: action.payload.activities || []
      };
    case 'ADD_ACTIVITY':
      const newActivity = {
        id: Date.now().toString(),
        type: action.payload.type,
        message: action.payload.message,
        timestamp: new Date().toISOString(),
        data: action.payload.data || {}
      };
      return {
        ...state,
        activities: [newActivity, ...state.activities.slice(0, 9)] // Keep only 10 recent activities
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
      const activities = storage.load(STORAGE_KEYS.ACTIVITIES, []);
      
      dispatch({
        type: 'LOAD_DATA',
        payload: { mentors, mentees, matches, activities }
      });

      // Add initial activity if no activities exist
      if (activities.length === 0) {
        dispatch({
          type: 'ADD_ACTIVITY',
          payload: {
            type: 'system',
            message: `System initialized with ${mentors.length + mentees.length} community members`,
            data: { mentors: mentors.length, mentees: mentees.length }
          }
        });
      }
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
    if (state.activities.length > 0) {
      storage.save(STORAGE_KEYS.ACTIVITIES, state.activities);
    }
  }, [state.mentors, state.mentees, state.matches, state.activities]);

  const addMentor = (mentor) => {
    dispatch({ type: 'ADD_MENTOR', payload: mentor });
    dispatch({
      type: 'ADD_ACTIVITY',
      payload: {
        type: 'mentor_added',
        message: `New mentor added: ${mentor.name}`,
        data: { mentorId: Date.now().toString(), name: mentor.name }
      }
    });
  };

  const addMentee = (mentee) => {
    dispatch({ type: 'ADD_MENTEE', payload: { ...mentee, matchStatus: 'Seeking Mentor', matchedWith: null } });
    dispatch({
      type: 'ADD_ACTIVITY',
      payload: {
        type: 'mentee_added',
        message: `New mentee registered: ${mentee.name}`,
        data: { menteeId: Date.now().toString(), name: mentee.name }
      }
    });
  };

  const createMatch = (mentorId, menteeId, score) => {
    const mentor = state.mentors.find(m => m.id === mentorId);
    const mentee = state.mentees.find(m => m.id === menteeId);
    
    dispatch({ type: 'CREATE_MATCH', payload: { mentorId, menteeId, score } });
    
    if (mentor && mentee) {
      dispatch({
        type: 'ADD_ACTIVITY',
        payload: {
          type: 'match_created',
          message: `Match created: ${mentee.name} & ${mentor.name}`,
          data: { mentorId, menteeId, mentorName: mentor.name, menteeName: mentee.name, score }
        }
      });
    }
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