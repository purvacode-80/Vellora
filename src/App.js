import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Testimonials from "./Components/testimonials";
import Faqquestion from "./Components/faqquestion";
import Footer from "./Components/footer";
import Home from "./Components/Home"

function App() {
  return (
    <>
     <Home/>
     <Testimonials/>
     <Faqquestion/>
     <Footer/>
    </>
  );
}

export default App;
