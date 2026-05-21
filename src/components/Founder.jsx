import React from 'react';
import { founderData } from '../data/siteData';
import useScrollAnimation from '../hooks/useScrollAnimation';
import StatNumber from './StatNumber';
import '../styles/Founder.css';

const Founder = () => {
  const [imageRef, imageVisible] = useScrollAnimation();
  const [contentRef, contentVisible] = useScrollAnimation();

  return (
    <section className="founder-section bg-dark" id="about">
      <div className="container">
        <div className="founder-grid" style={{ alignItems: 'center' }}>
          {/* Left Column (Image) */}
          <div ref={imageRef} className={`anim-fade-left ${imageVisible ? 'anim-visible' : ''}`} style={{ position: 'relative' }}>
            <div className="founder-image-wrapper" style={{
              overflow: 'hidden',
              backgroundColor: 'var(--color-surface-dark-raised)'
            }}>
              <img
                src="https://res.cloudinary.com/db9wu2abk/image/upload/q_auto/f_auto/v1779365887/1779363292343_ilso7t.png"
                alt="Abhi — Strength Coach for Women"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Right Column (Content) */}
          <div ref={contentRef} className={`founder-content anim-fade-right ${contentVisible ? 'anim-visible' : ''}`}>
            <span className="section-eyebrow" style={{ color: 'var(--color-brand)' }}>{founderData.eyebrow}</span>
            <h2 className="section-title" style={{ color: 'white', marginBottom: '2rem' }}>{founderData.headline}</h2>

            <p className="body-md" style={{ color: 'var(--color-on-dark-secondary)', marginBottom: '1.5rem' }}>
              {founderData.story1}
            </p>
            <p className="body-md" style={{ color: 'var(--color-on-dark-secondary)', marginBottom: '2.5rem' }}>
              {founderData.story2}
            </p>

            {/* Quote Block */}
            <div className="founder-quote" style={{
              backgroundColor: 'var(--color-surface-dark-raised)',
              borderLeft: '4px solid var(--color-brand)',
              marginBottom: '3rem'
            }}>
              <div style={{ fontSize: '1.125rem', fontStyle: 'italic', marginBottom: '1rem', lineHeight: '1.6' }}>
                {founderData.quote}
              </div>
              <div style={{ fontWeight: '700', color: 'var(--color-on-dark-secondary)' }}>— {founderData.quoteAuthor}</div>
            </div>

            {/* Stats */}
            <div className="founder-stats">
              {founderData.stats.map((stat, i) => (
                <div key={i} className="founder-stat">
                  <StatNumber
                    value={stat.value}
                    className="number-display founder-stat__value"
                    duration={2200}
                  />
                  {stat.label && (
                    <span className="founder-stat__label">{stat.label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
