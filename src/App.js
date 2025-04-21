import Navbar from "./Components/Navigation"
import Home from "../src/Home";
import Testimonials from "./Components/testimonials";
import Faqquestion from "./Components/faqquestion";
import Footer from "./Components/footer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from "./Security/ProtectedRoute";
import { AuthProvider } from "./Security/AuthContext";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { ThemeProvider } from "./Components/ThemeContext";
import { useEffect } from "react";
import AddTask from "./Components/AddTask";

function App() {

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      console.log("Token exists:", token);
    } else {
      console.log("No token found in localStorage.");
    }
  }, [token]);

  return (
    <>
    <BrowserRouter>
    <ThemeProvider>
      
    <AuthProvider>
     {/* <Testimonials/>
     <Faqquestion/>
     <Footer/> */}
      <Navbar />
      <Routes>
          <Route path="/home" element={<ProtectedRoutes> <> <Home /> <Testimonials /> <Faqquestion /> <Footer /> </> </ProtectedRoutes>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/addtask" element={<AddTask/>}/>
      </Routes>
    </AuthProvider>
    </ThemeProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
