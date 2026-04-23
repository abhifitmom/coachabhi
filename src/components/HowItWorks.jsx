import React from 'react';
import { PhoneCall, UserCheck, ClipboardList, Video } from 'lucide-react';
import { howItWorks } from '../data/siteData';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/HowItWorks.css';

const icons = [
  <PhoneCall size={28} />,
  <UserCheck size={28} />,
  <ClipboardList size={28} />,
  <Video size={28} />,
];

const HowItWorks = () => {
  const [headerRef, headerVisible] = useScrollAnimation();
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="hiw-section">
      <div className="container">

        {/* Header */}
        <div ref={headerRef} className={`hiw-header anim-fade-up ${headerVisible ? 'anim-visible' : ''}`}>
          <span className="section-eyebrow">How It Works</span>
          <h2 className="section-title">Your Transformation in 4 Steps</h2>
        </div>

        {/* Steps Grid */}
        <div ref={gridRef} className="hiw-grid">
          {howItWorks.map((step, i) => (
            <div key={i} className={`hiw-step anim-fade-up anim-delay-${i + 1} ${gridVisible ? 'anim-visible' : ''}`}>

              {/* Connector line — desktop only */}
              {i < howItWorks.length - 1 && (
                <div className="hiw-step__connector" />
              )}

              {/* Icon */}
              <div className="hiw-step__icon">
                {icons[i]}
              </div>

              {/* Step label */}
              <div className="hiw-step__label">
                STEP {step.step}
              </div>

              {/* Title */}
              <h3 className="hiw-step__title">{step.title}</h3>

              {/* Description */}
              <p className="hiw-step__desc">{step.desc}</p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;