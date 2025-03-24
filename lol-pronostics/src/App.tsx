import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './context/UserContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import CompetitionDetails from './pages/CompetitionDetails';
import Stats from './pages/Stats';
import UserPredictions from './pages/UserPredictions';
import './App.css';

function App() {
  const { username } = useUser();

  return (
    <Routes>
      <Route path="/login" element={!username ? <Login /> : <Navigate to="/" />} />
      <Route element={<Layout />}>
        <Route path="/" element={username ? <Home /> : <Navigate to="/login" />} />
        <Route path="/competition/:id" element={<CompetitionDetails />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/predictions/:username" element={<UserPredictions />} />
      </Route>
    </Routes>
  );
}

export default App;
