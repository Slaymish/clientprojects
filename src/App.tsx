import React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Projects from './components/Projects';
import Project from './components/Project';
import NewProject from './components/NewProject';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/projects" />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<Project />} />
        <Route path="/projects/new" element={<NewProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
