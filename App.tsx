import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import InterviewCoach from './pages/InterviewCoach';
import VirtualAssistant from './pages/VirtualAssistant';
import { Page, User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check local storage or session here in real app
  }, []);

  if (!mounted) return null;

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case Page.DASHBOARD:
        return <Dashboard />;
      case Page.INTERVIEW_COACH:
        return <InterviewCoach />;
      case Page.VIRTUAL_ASSISTANT:
        return <VirtualAssistant />;
      default:
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <h2 className="text-2xl font-display text-white mb-2">Coming Soon</h2>
                <p className="text-gray-400">This module is currently being upgraded with Gemini 3.0 Pro.</p>
            </div>
        );
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      onNavigate={setCurrentPage}
      user={user}
      onLogout={() => setUser(null)}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;