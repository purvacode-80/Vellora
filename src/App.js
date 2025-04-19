import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import Testimonials from "./Components/testimonials";
import Faqquestion from "./Components/faqquestion";
import Footer from "./Components/footer";

function App() {
  return (
    <>
     <Testimonials/>
     <Faqquestion/>
     <Footer/>
    </>
  );
}

export default App;
