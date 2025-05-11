import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Preloader from './Components/Preloader';
import Home from './Components/Home';
import Main from './Components/Main';
import FAQS from './Components/faqquestion';
import Footer from './Components/footer';
import Login from './Components/Login';
import Register from './Components/Register';
import ProtectedRoute from './Security/ProtectedRoute'
import Dashboard from './Components/Dashboard';

function App() {

  //For preloader
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<> 
        {isLoading ? (
        <Preloader onDone={() => setIsLoading(false)} />
        ) : (
          <> <Main /> <Home /> <FAQS /> <Footer /> </>
        )}
      </>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard Route */}
      <Route path="/dashboard/*" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
    </Routes>
  );
}

export default App;