import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import IssuesPage from './pages/IssuesPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/repo/owner/:owner/:repoName" element={<IssuesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
