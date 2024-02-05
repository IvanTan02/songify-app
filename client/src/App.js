
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import './App.css';
import Login from './pages/Login';
import AuthCallback from "./hooks/AuthCallback";
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Statistics from "./pages/Statistics";

function App() {

  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    const expiresIn = localStorage.getItem('expiresIn');

    if (refreshToken && expiresIn) {
      const expirationTime = (expiresIn - 60) * 1000;
      setInterval(() => {
        refreshAccessToken(refreshToken);
      }, expirationTime);
    }
  }, []);

  const refreshAccessToken = (refreshToken) => {
    console.log('REFRESH ACCESS TOKEN:', refreshToken);
    axios.post('http://localhost:3001/refresh', { refreshToken })
      .then(response => {
        console.log(response.data);
        setAccessToken(response.data.accessToken);
        localStorage.setItem('accessToken', response.data.accessToken);
      })
      .catch(error => {
        console.error('Token Refresh Error:', error);
      });

  };

  return <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={accessToken ? (
          <div>
            <Dashboard />
          </div>
        ) : (
          <div>
            <Login />
          </div>
        )} />
        <Route path="/login" element={<AuthCallback />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Router>
  </>

}

export default App; 
