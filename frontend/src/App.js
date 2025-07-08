import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Payments from './pages/Payments';
import Complaints from './pages/Complaints';
import EmergencyAlerts from './pages/EmergencyAlerts';
import VisitorTracking from './pages/VisitorTracking';
import Polling from './pages/Polling';
import Parking from './pages/Parking';
import CourierAlerts from './pages/CourierAlerts';
import LanguageSupport from './pages/LanguageSupport';

import { Navigate } from 'react-router-dom';
const token = localStorage.getItem('token');
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
<Route path="/payments" element={<Payments />} />
<Route path="/complaints" element={<Complaints />} />
<Route path="/emergency" element={<EmergencyAlerts />} />
<Route path="/visitors" element={<VisitorTracking />} />
<Route path="/polling" element={<Polling />} />
<Route path="/parking" element={<Parking />} />
<Route path="/couriers" element={<CourierAlerts />} />
<Route path="/languages" element={<LanguageSupport />} />
<Route path="/payments" element={<Payments />} />
<Route path="/dashboard" element={<Dashboard />} />



<Route
  path="/dashboard"
  element={
    token ? <Dashboard /> : <Navigate to="/login" />
  }
/>


      </Routes>
    </Router>
  );
}

export default App;
