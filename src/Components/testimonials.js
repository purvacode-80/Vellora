import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonials.css"


import testimonials1 from "../Assets/testimonials1.jpg";
import testimonials2 from "../Assets/testimonials2.jpg";
import testimonials3 from "../Assets/testimonials3.jpg";
import testimonials4 from "../Assets/testimonials4.png";
import testimonials5 from "../Assets/testimonials5.jpg";

const testimonials = [
    {
        id: 1,
        quote: "This CRM completely transformed the way we handle customer interactions. It's clean, fast, and easy to use!",
        imgSrc: testimonials1, // Replace with your image import like: import crmClient1 from "../Assets/client1.jpg";
        name: "Ava Thompson",
        title: "Marketing Head, NovaTech"
      },
      {
        id: 2,
        quote: "The real-time analytics and lead tracking features are a game changer. We've boosted our sales by 30%!",
        imgSrc: testimonials2,
        name: "Liam Patel",
        title: "Sales Manager, BrightEdge Solutions"
      },
      {
        id: 3,
        quote: "We switched from a legacy system, and this CRM has made our team much more efficient and organized.",
        imgSrc: testimonials3,
        name: "Sophia Martinez",
        title: "Operations Lead, HexaCore Ltd."
      },
      {
        id: 4,
        quote: "Amazing support and constant updates. It's exactly what a growing business needs to scale customer service.",
        imgSrc: testimonials4,
        name: "Noah Chen",
        title: "Founder, Elevate Agency"
      },
      {
        id: 5,
        quote: "User-friendly interface and powerful automation tools. We're saving hours every week with this CRM.",
        imgSrc: testimonials5,
        name: "Isabella Wright",
        title: "Project Manager, BlueOrbit Media"
      }
    ];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section id="testimonials" className="testimonials section light-background">
      <div className="container section-title">
        <h2>Businesses We're Proud to Serve</h2>
        <p>We’re proud to support a diverse range of businesses who trust our CRM to drive growth and streamline their operations. Here's a look at the companies currently powering up with us.

</p>
      </div>

      <div className="container">
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id}>
              <div className="testimonial-item">
                <p>
                  <i className="bi bi-quote quote-icon-left"></i>
                  <span>{testimonial.quote}</span>
                  <i className="bi bi-quote quote-icon-right"></i>
                </p>
                <img src={testimonial.imgSrc} className="testimonial-img" alt={testimonial.name} />
                <h3>{testimonial.name}</h3>
                <h4>{testimonial.title}</h4>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;