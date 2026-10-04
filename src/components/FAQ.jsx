import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { faqData } from '../data/siteData';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.1 });
  const [listRef, listVisible] = useScrollAnimation({ threshold: 0.1 });

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const faqsList = Array.isArray(faqData) ? faqData : (faqData?.faqs || []);
  const visibleFaqs = faqsList.slice(0, 6);
  const eyebrowText = Array.isArray(faqData) ? 'Common Questions' : (faqData?.eyebrow || 'Common Questions');
  const titleText = Array.isArray(faqData) ? 'Frequently Asked Questions' : (faqData?.title || 'Frequently Asked Questions');

  return (
    <section className="faq-section" id="faq">
      <div className="container">

        <div
          ref={headerRef}
          className={`faq-header anim-fade-up ${headerVisible ? 'anim-visible' : ''}`}
        >
          <span className="section-eyebrow">{eyebrowText}</span>
          <h2 className="section-title">{titleText}</h2>
        </div>

        <div
          ref={listRef}
          className={`faq-list anim-fade-up ${listVisible ? 'anim-visible' : ''}`}
        >
          {visibleFaqs.map((faq, i) => (
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

        {faqsList.length > 6 && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link
              to="/faq"
              className="btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1px solid var(--color-border)',
                background: 'white',
                color: 'var(--color-ink)',
                textDecoration: 'none'
              }}
            >
              View All FAQs →
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};

export default FAQ;
