import React from 'react';
import { MessageCircle, ArrowRight, Phone } from 'lucide-react';
import { heroData, siteConfig } from '../data/siteData';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__grid">
          {/* Left Column */}
          <div className="hero-content">
            <span className="section-eyebrow" style={{ marginBottom: '1rem', display: 'block' }}>
              {heroData.eyebrow}
            </span>
            
            <h1 className="hero__headline">
              {heroData.headline} <br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-brand)', fontWeight: '400' }}>{heroData.headlineItalic}</em>
            </h1>

            <p className="hero__subheadline" style={{ maxWidth: '540px' }}>
              {heroData.subheadline}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
               <div className="pulse-dot"></div>
               <span style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--color-ink-secondary)' }}>
                 {heroData.badge}
               </span>
            </div>

            <div className="hero__cta-group">
              <a href={siteConfig.enrollLink} className="btn btn-primary">
                {heroData.ctaPrimary} <ArrowRight size={18} />
              </a>
              <a href={siteConfig.whatsapp} className="btn btn-secondary">
                <MessageCircle size={18} /> {heroData.ctaSecondary}
              </a>
            </div>

            <a href="#" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '1.5rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: 'var(--color-brand)',
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--color-brand-muted)',
              borderRadius: '999px'
            }}>
              {heroData.announcement}
            </a>

            {/* Callback Form */}
            <div className="hero__callback-form" style={{ marginTop: '2.5rem' }}>
              <input type="text" placeholder="Your name" className="form-input" />
              <input type="text" placeholder="Phone number" className="form-input" />
              <button className="btn" style={{ 
                backgroundColor: 'var(--color-surface-sunken)', 
                color: 'var(--color-ink)',
                fontWeight: '600'
              }}>
                <Phone size={18} /> Get a Callback
              </button>
            </div>

            {/* Stats Row */}
            <div className="hero__stats">
              {heroData.stats.map((stat, i) => (
                <div key={i}>
                  <div className="number-display" style={{ fontSize: '1.5rem', color: 'var(--color-ink)' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Image Placeholder) */}
          <div className="hero__image">
             <div style={{
               position: 'relative',
               aspectRatio: '4/5',
               backgroundColor: 'var(--color-brand-muted)',
               borderRadius: 'var(--border-radius-2xl)',
               overflow: 'hidden',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center'
             }}>
               <img
                 src="https://res.cloudinary.com/db9wu2abk/image/upload/q_auto/f_auto/v1776880637/SaveClip.App_614869571_18547982899034362_984992251545371894_n_tumqbq.jpg"
                 alt="Abhi — Strength Coach for Women"
                 style={{
                   width: '100%',
                   height: '100%',
                   objectFit: 'cover',
                   objectPosition: 'top center',
                   display: 'block',
                   borderRadius: '1.5rem',
                 }}
               />
               <div style={{
                 position: 'absolute',
                 bottom: '2rem',
                 left: '2rem',
                 right: '2rem',
                 padding: '1.5rem',
                 backgroundColor: 'rgba(255,255,255,0.9)',
                 backdropFilter: 'blur(8px)',
                 borderRadius: '1.5rem',
                 textAlign: 'center'
               }}>
                  <div className="display-font" style={{ fontSize: '1.25rem' }}>Result Driven Coaching</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-ink-secondary)' }}>Transform in 90 Days</div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
