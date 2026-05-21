import React from 'react';
import { certificationsData } from '../data/siteData';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/Certifications.css';

const Certifications = () => {
  const [ref, visible] = useScrollAnimation({ threshold: 0.1 });

  // Duplicate for infinite scroll
  const items = [...certificationsData, ...certificationsData];

  return (
    <section className="cert-section">
      <div
        ref={ref}
        className={`cert-header anim-fade-up ${visible ? 'anim-visible' : ''}`}
      >
        <span className="section-eyebrow">Certified & Qualified</span>
        <h2 className="section-title">Certifications</h2>
      </div>

      {/* Infinite scroll track */}
      <div className="cert-track-wrapper">
        <div className="cert-track">
          {items.map((cert, i) => (
            <div key={i} className="cert-card">
              <img
                src={cert.image}
                alt={cert.alt}
                loading="lazy"
                className="cert-card__img"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
