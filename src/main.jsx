import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Users from './Users';
import Result from './Result';
import Form from './Form';
import About from './About';
import Layout from './Layout';
import Login from './Login';
import './index.css';

const Root = () => {
  // Global user state
  const [user, setUser] = useState(null);
  const handleLogout = () => setUser(null);

  return (
    <BrowserRouter>
      <Layout user={user} onLogout={handleLogout} setUser={setUser}>
        <Routes>
          <Route path="/" element={<App user={user} setUser={setUser} />} />
          <Route path="/leaderboard" element={<Users user={user} setUser={setUser} />} />
          <Route path="/profile" element={<About user={user} setUser={setUser} />} />
          <Route path="/register" element={<Form user={user} setUser={setUser} />} />
          <Route path="/result/:profile" element={<Result user={user} setUser={setUser} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
