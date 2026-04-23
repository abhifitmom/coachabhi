import React from 'react';
import { specialisations } from '../data/siteData';
import '../styles/Specialisations.css';

const Specialisations = () => {
  return (
    <section className="specialisations-section" id="specialisations">
      <div className="container">
        <div className="text-center section-header">
          <span className="section-eyebrow">Specialised Care</span>
          <h2 className="section-title">Specialised Coaching for 8+ Areas</h2>
          <p className="body-md" style={{ color: 'var(--color-ink-secondary)', marginTop: '1rem' }}>
            Every program is personalised to your body, your history, and your goals.
          </p>
        </div>

        <div className="specialisations-grid">
          {specialisations.map((spec, i) => (
            <div key={i} className="spec-card" style={{
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

        <div className="text-center" style={{ marginTop: '4rem' }}>
          <button className="btn btn-secondary">
            See all 15+ conditions <span style={{ marginLeft: '0.5rem' }}>↓</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Specialisations;
