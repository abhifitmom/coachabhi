import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqData } from '../data/siteData';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.1 });
  const [listRef, listVisible] = useScrollAnimation({ threshold: 0.1 });

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="faq-section" id="faq">
      <div className="container">

        <div
          ref={headerRef}
          className={`faq-header anim-fade-up ${headerVisible ? 'anim-visible' : ''}`}
        >
          <span className="section-eyebrow">{faqData.eyebrow}</span>
          <h2 className="section-title">{faqData.title}</h2>
        </div>

        <div
          ref={listRef}
          className={`faq-list anim-fade-up ${listVisible ? 'anim-visible' : ''}`}
        >
          {faqData.faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item ${openIndex === i ? 'faq-item--open' : ''}`}
            >
              <button
                className="faq-item__question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={20}
                  className="faq-item__icon"
                />
              </button>
              <div className="faq-item__answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
