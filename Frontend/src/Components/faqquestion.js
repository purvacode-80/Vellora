import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "../css/Faq.css"; // Import external CSS

const faqs = [
  {
    question: "What is Vellora CRM?",
    answer: "Vellora CRM is a customer relationship management platform designed to help you manage leads, track interactions, and grow your business efficiently.",
  },
  {
    question: "What makes this CRM different from others?",
    answer: "Our CRM goes beyond tracking leads — it integrates AI-driven insights, smart email generation, predictive analytics, and Google tools to simplify your entire sales and support process.",
  },
  {
    question: "Is my data secure in the CRM?",
    answer: "Absolutely. We use role-based access control, token-based authentication, and secure MongoDB storage with encrypted communication for maximum protection.",
  },
  {
    question: "Can I import existing contacts and leads into the CRM?",
    answer: "Yes! You can easily import leads and contacts via Excel (.xlsx) files, or connect your existing database for seamless onboarding.",
  },
  {
    question: "Can I schedule meetings directly within the CRM?",
    answer: "Yes, you can schedule meetings, set reminders, and even sync with your Google Calendar — all from the CRM dashboard.",
  },
  {
    question: "Is there a way to send emails to multiple contacts at once?",
    answer: "Yes! Our Bulk Email feature allows you to select multiple leads or contacts and send personalized emails in one go, including AI-generated content.",
  },
  {
    question: "Does the CRM support a mobile-friendly layout?",
    answer: "Definitely! Our CRM interface is fully responsive and works beautifully across desktops, tablets, and mobile devices.",
  }
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
