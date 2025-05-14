import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "../css/Faq.css"; // Import external CSS

const faqs = [
  {
    question: "What is Vellora CRM?",
    answer:
      "Vellora CRM is a customer relationship management platform designed to help you manage leads, track interactions, and grow your business efficiently.",
  },
  {
    question: "Is my data secure with Vellora?",
    answer:
      "Absolutely. We use advanced encryption and follow best practices to ensure your data is secure and private.",
  },
  {
    question: "Can I integrate Vellora with other tools?",
    answer:
      "Yes, Vellora supports integration with popular tools like email platforms, messaging apps, and third-party APIs for a seamless experience.",
  },
  {
    question: "Do you offer support?",
    answer:
      "Yes, we provide 24/7 support via chat, email, and phone to help you make the most of Vellora CRM.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.question}</span>
              {activeIndex === index ? <ChevronUp /> : <ChevronDown />}
            </button>
            {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
