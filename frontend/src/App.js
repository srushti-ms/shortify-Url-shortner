import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignupForm from './Components/signupform.js'
import LoginForm from './Components/loginForm.js';
import Dashboard from './Components/dashboard.js';
import LogoutButton from './Components/logout.js';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/dashboard" 
      element={
        <div>
          <LogoutButton/>
          <Dashboard/>
          </div>
        } />
    </Routes>
  );
}

export default App;
