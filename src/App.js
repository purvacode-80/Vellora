import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Preloader from './Components/Preloader';
import Home from './Components/Home';
import Main from './Components/Main';
import FAQS from './Components/faqquestion';
import Footer from './Components/footer';
import Login from './Components/Login';
import Register from './Components/Register';
import ProtectedRoute from './Security/ProtectedRoute';
import Dashboard from './Components/Dashboard';
import Testimonials from './Components/testimonials';
import MyNavbar from './Components/Navbar';
import Aboutus from './Components/Aboutus';
import MeetingRoom from './Components/MeetingRoom';
import Learnmore from './Components/LearnMore';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <>
            {isLoading ? (
              <Preloader onDone={() => setIsLoading(false)} />
            ) : (
              <>
                <MyNavbar />
                <Main />
                <Home />
                <Testimonials />
                <FAQS />
                <Footer />
              </>
            )}
          </>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<Aboutus />} />
      <Route path="/meeting/:room" element={<MeetingRoom />} />
      <Route path="/learnmore" element={<Learnmore />} />
>>>>>>>>> Temporary merge branch 2


      {/* Protected Routes */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
