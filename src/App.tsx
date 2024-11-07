import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LiveScores } from './pages/LiveScores';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LiveScores />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;