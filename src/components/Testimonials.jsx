import React from 'react';
import { testimonials } from '../data/siteData';

const Testimonials = () => {
  return (
    <section className="testimonials-section bg-warm" id="results">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Real Stories</span>
          <h2 className="section-title">Stories That Inspire</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((test, i) => (
            <div key={i} className="testimonial-card" style={{
              backgroundColor: 'white',
              borderRadius: 'var(--border-radius-xl)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-brand-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  color: 'var(--color-brand)'
                }}>
                  {test.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{test.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>{test.age} · {test.city}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {test.tags.map((tag, j) => (
                  <span key={j} style={{
                    fontSize: '0.65rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    backgroundColor: 'var(--color-surface-sunken)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    color: 'var(--color-ink-muted)'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <blockquote style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: 'var(--color-ink-secondary)',
                fontStyle: 'italic'
              }}>
                "{test.quote}"
              </blockquote>

              <div style={{
                marginTop: 'auto',
                paddingTop: '1rem',
                borderTop: '1px solid var(--color-border)',
                fontWeight: '700',
                fontSize: '0.9rem',
                color: 'var(--color-success)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-success)', borderRadius: '50%' }}></div>
                {test.result}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: '4rem' }}>
          <button className="btn btn-secondary">
            See more stories <span style={{ marginLeft: '0.5rem' }}>↓</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
