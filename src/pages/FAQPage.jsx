import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { faqData } from '../data/siteData';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/FAQ.css';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.1 });
  const [listRef, listVisible] = useScrollAnimation({ threshold: 0.1 });

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const faqsList = Array.isArray(faqData) ? faqData : (faqData?.faqs || []);

  return (
    <div className="faq-page" style={{ padding: '2rem 1.25rem 4rem', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Back Link */}
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-ink-muted, #666)', fontSize: '0.9375rem', textDecoration: 'none' }}>
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div
          ref={headerRef}
          className={`faq-header anim-fade-up ${headerVisible ? 'anim-visible' : ''}`}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span className="section-eyebrow">Everything You Need To Know</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', marginTop: '0.5rem' }}>Frequently Asked Questions</h1>
        </div>

        {/* Accordion List */}
        <div
          ref={listRef}
          className={`faq-list anim-fade-up ${listVisible ? 'anim-visible' : ''}`}
        >
          {faqsList.map((faq, i) => (
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
    </div>
  );
};

export default FAQPage;
