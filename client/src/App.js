
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

// PAGES
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Statistics from "./pages/Statistics";
import Profile from "./pages/Profile";

// COMPONENT
import Navbar from './components/Navbar';
import AuthCallback from "./hooks/AuthCallback";

function App() {

  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

  const isAccessTokenValid = () => {
    const expired = localStorage.getItem('expired');
    return expired && new Date().getTime() < expired;
  }

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    const expiresIn = localStorage.getItem('expiresIn');

    if (!isAccessTokenValid()) refreshAccessToken(refreshToken);

    // SET 1 HOUR TOKEN REFRESH CYCLE
    if (refreshToken && expiresIn) {
      localStorage.setItem('expired', (new Date().getTime() + expiresIn * 1000));
      console.log(new Date().getTime());
      console.log(localStorage.getItem('expired'));
      console.log(localStorage.getItem('expired') - new Date().getTime());
      const refreshTime = (expiresIn - 120) * 1000;
      console.log(refreshTime);
      setInterval(() => {
        refreshAccessToken(refreshToken);
      }, refreshTime);
    }
  }, []);

  // REFRESH ACCESS TOKEN
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
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  </>

}

export default App; 
