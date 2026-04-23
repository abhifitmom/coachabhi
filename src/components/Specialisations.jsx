import React, { useState } from 'react';
import { specialisations } from '../data/siteData';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/Specialisations.css';

const Specialisations = () => {
  const [showAll, setShowAll] = useState(false);
  const [headerRef, headerVisible] = useScrollAnimation();
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1 });

  // Mobile pe 4, desktop pe 8 default dikhao
  const getDefaultCount = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return 4;
    }
    return 8;
  };

  const visibleItems = showAll
    ? specialisations
    : specialisations.slice(0, getDefaultCount());

  return (
    <section className="specialisations-section" id="specialisations">
      <div className="container">
        <div ref={headerRef} className={`text-center section-header anim-fade-up ${headerVisible ? 'anim-visible' : ''}`}>
          <span className="section-eyebrow">Specialised Care</span>
          <h2 className="section-title">Specialised Coaching for 15+ Areas</h2>
          <p className="body-md" style={{ color: 'var(--color-ink-secondary)', marginTop: '1rem' }}>
            Every program is personalised to your body, your history, and your goals.
          </p>
        </div>

        <div ref={gridRef} className="specialisations-grid">
          {visibleItems.map((spec, i) => (
            <div key={i} className={`spec-card anim-fade-up anim-delay-${Math.min(i + 1, 6)} ${gridVisible ? 'anim-visible' : ''}`} style={{
              backgroundColor: 'white',
              borderRadius: 'var(--border-radius-xl)',
              border: '1px solid var(--color-border)',
              transition: 'var(--transition)'
            }}>
              <div style={{
                fontSize: '2rem',
                marginBottom: '1.5rem',
                backgroundColor: 'var(--color-surface-warm)',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '1rem'
              }}>
                {spec.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', lineHeight: '1.3' }}>{spec.title}</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-secondary)', lineHeight: '1.5' }}>{spec.desc}</p>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        <div className="spec-toggle">
          <button
            className="spec-toggle__btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll
              ? 'Show Less ↑'
              : `See All ${specialisations.length} Specialisations ↓`
            }
          </button>
        </div>
      </div>
    </section>
  );
};

export default Specialisations;
