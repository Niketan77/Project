import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import MentorsList from './components/Mentors/MentorsList';
import AddMentorForm from './components/Mentors/AddMentorForm';
import MentorProfile from './components/Mentors/MentorProfile';
import MenteesList from './components/Mentees/MenteesList';
import AddMenteeForm from './components/Mentees/AddMenteeForm';
import MenteeProfile from './components/Mentees/MenteeProfile';
import MatchingHub from './components/Matching/MatchingHub';
import ActiveMatches from './components/Matching/ActiveMatches';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/mentors" element={<MentorsList />} />
            <Route path="/mentors/add" element={<AddMentorForm />} />
            <Route path="/mentors/:id" element={<MentorProfile />} />
            <Route path="/mentees" element={<MenteesList />} />
            <Route path="/mentees/add" element={<AddMenteeForm />} />
            <Route path="/mentees/:id" element={<MenteeProfile />} />
            <Route path="/matching" element={<MatchingHub />} />
            <Route path="/matches" element={<ActiveMatches />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;