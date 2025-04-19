import Home from "../src/Home";
import Testimonials from "./Components/testimonials";
import Faqquestion from "./Components/faqquestion";
import Footer from "./Components/footer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from "./Security/ProtectedRoute";
import { AuthProvider } from "./Security/AuthContext";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
  return (
    <>
    <BrowserRouter>
    <AuthProvider>
     {/* <Testimonials/>
     <Faqquestion/>
     <Footer/> */}
      <Routes>
          <Route path="/home" element={<ProtectedRoutes> <Home /> <Testimonials /> <Faqquestion /> <Footer /> </ProtectedRoutes>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
