import React from 'react';
import { PhoneCall, UserCheck, ClipboardList, Video } from 'lucide-react';
import { howItWorks } from '../data/siteData';

const HowItWorks = () => {
  const icons = [<PhoneCall size={32} />, <UserCheck size={32} />, <ClipboardList size={32} />, <Video size={32} />];

  return (
    <section className="how-it-works-section" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <div className="text-center section-header">
          <span className="section-eyebrow">How It Works</span>
          <h2 className="section-title">Your Transformation in 4 Steps</h2>
        </div>

        <div className="how-it-works-grid">
          {howItWorks.map((step, i) => (
            <div key={i} className="step-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="step-card__icon" style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-surface-sunken)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-ink-secondary)',
                position: 'relative'
              }}>
                {icons[i]}
              </div>
              <div className="section-eyebrow" style={{ color: 'var(--color-brand)', marginBottom: '0.5rem' }}>STEP {step.step}</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{step.title}</h3>
              <p style={{ color: 'var(--color-ink-secondary)', lineHeight: '1.6' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
