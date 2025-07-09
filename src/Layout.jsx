import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const Layout = ({ user, onLogout, setUser, children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col dark:bg-gray-800">
        <div className="h-16 flex items-center justify-center text-2xl font-bold border-b border-gray-800">
          Coders Profile Hub
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/" className="block py-2 px-4 rounded hover:bg-gray-800 dark:hover:bg-gray-700">Dashboard</Link>
          <Link to="/leaderboard" className="block py-2 px-4 rounded hover:bg-gray-800 dark:hover:bg-gray-700">Leaderboard</Link>
          <Link to="/profile" className="block py-2 px-4 rounded hover:bg-gray-800 dark:hover:bg-gray-700">Profile</Link>
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header user={user} onLogout={onLogout} setUser={setUser} />
        {/* Main Area */}
        <main className="flex-1 p-6 dark:bg-gray-900 dark:text-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 