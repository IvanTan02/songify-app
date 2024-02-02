
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return <>
    <Navbar />
    {code ? (
      <div>
        <Dashboard code={code} />
      </div>
    ) : (
      <div>
        <Login />
      </div>
    )}
  </>

}

export default App; 
