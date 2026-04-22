import React from 'react';
import { founderData } from '../data/siteData';

const Founder = () => {
  return (
    <section className="founder-section bg-dark" id="about">
      <div className="container">
        <div className="founder-grid" style={{ alignItems: 'center' }}>
          {/* Left Column (Image) */}
          <div style={{ position: 'relative' }}>
            <div className="founder-image-wrapper" style={{
              overflow: 'hidden',
              backgroundColor: 'var(--color-surface-dark-raised)'
            }}>
              <img 
                src="https://res.cloudinary.com/db9wu2abk/image/upload/q_auto/f_auto/v1776880637/SaveClip.App_614869571_18547982899034362_984992251545371894_n_tumqbq.jpg" 
                alt="Abhi — Strength Coach for Women" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '1.5rem',
              right: '1.5rem',
              padding: '1.5rem',
              backgroundColor: 'rgba(26,26,26,0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem'
            }}>
              <div style={{ fontWeight: '700', fontSize: '1.5rem' }}>{founderData.name}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-on-dark-secondary)' }}>{founderData.title}</div>
            </div>
          </div>

          {/* Right Column (Content) */}
          <div className="founder-content">
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
                <div key={i}>
                  <div className="number-display" style={{ fontSize: '1.5rem', color: 'var(--color-brand)' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-on-dark-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
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
