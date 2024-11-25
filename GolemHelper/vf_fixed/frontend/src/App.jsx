import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hero } from '@/components/landing/hero';
import PlayerProfile from '@/pages/PlayerProfile';
import Layout from '@/pages/layout';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/player/:playerName" element={<PlayerProfile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
