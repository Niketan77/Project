export const storage = {
  save: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },
  
  load: (key, defaultValue = []) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return defaultValue;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
};

export const STORAGE_KEYS = {
  MENTORS: 'aspire_mentors',
  MENTEES: 'aspire_mentees',
  MATCHES: 'aspire_matches'
};