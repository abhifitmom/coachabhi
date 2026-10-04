import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { heroData, siteConfig } from '../data/siteData';
import StatNumber from './StatNumber';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/Hero.css';

const Hero = ({ onEnrol }) => {
  const [ref, visible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="hero-section" id="home">
      <div className="hero__container">
        {/* LEFT CONTENT */}
        <div
          ref={ref}
          className={`hero__content anim-fade-up ${visible ? 'anim-visible' : ''}`}
        >
          <p className="hero__eyebrow">{heroData.eyebrow}</p>
          <h1 className="hero__headline">
            Get Strong.<br />
            <span className="hero__headline--italic">Feel Like You Again.</span>
          </h1>

          <p className="hero__subheadline">{heroData.subheadline}</p>

          <div className="hero__badge">
            <span className="pulse-dot"></span>
            <span>{heroData.badge}</span>
          </div>

          <div className="hero__cta-group">
            <button onClick={onEnrol} className="btn btn-primary">
              {heroData.ctaPrimary} <ArrowRight size={18} />
            </button>
            <a
              href={siteConfig.whatsapp}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} /> {heroData.ctaSecondary}
            </a>
          </div>

          {/* Stats */}
          <div className="hero__stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem 1rem', width: '100%' }}>
            {heroData.stats.map((stat, i) => (
              <div key={i} className="hero__stat" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <StatNumber
                  value={stat.value}
                  className="number-display"
                  duration={2000}
                />
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — IMAGE desktop only */}
        <div className="hero__video-desktop" style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}>
          <img
            src="https://res.cloudinary.com/db9wu2abk/image/upload/v1791120324/WhatsApp_Image_2026-09-28_at_08.25.39_awi16b.jpg"
            alt="Abhi Strength Coach"
            style={{
              width: '100%',
              maxWidth: '480px',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '1rem',
              display: 'block'
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
