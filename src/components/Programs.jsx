import React, { useState } from 'react';
import { Check, MessageCircle, ArrowRight } from 'lucide-react';
import { programs, siteConfig } from '../data/siteData';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/Programs.css';

const Programs = ({ onEnrol }) => {
  const [selected, setSelected] = useState(2); // default 3 months selected
  const [headerRef, headerVisible] = useScrollAnimation();
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="programs-section" id="programs">
      <div className="container">

        {/* Header */}
        <div 
          ref={headerRef} 
          className={`text-center section-header anim-fade-up ${headerVisible ? 'anim-visible' : ''}`}
        >
          <span className="section-eyebrow">Our Programs</span>
          <h2 className="section-title">Choose Your Transformation</h2>
          <p className="programs-subtitle">
            Pick the duration that works for you — every plan includes personal coaching with Abhi directly.
          </p>
        </div>

        {/* 4 Duration Cards */}
        <div ref={gridRef} className="programs-grid">
          {programs.map((program, i) => (
            <div
              key={program.id}
              className={`program-duration-card anim-fade-up anim-delay-${i + 1} ${gridVisible ? 'anim-visible' : ''} ${program.popular ? 'program-duration-card--popular' : ''} ${selected === program.id ? 'program-duration-card--selected' : ''}`}
              onClick={() => setSelected(program.id)}
            >
              {/* Popular Badge */}
              {program.popular && (
                <div className="program-duration-card__popular-badge">
                  Most Popular
                </div>
              )}

              {/* Tag */}
              <div className="program-duration-card__tag">
                {program.tag}
              </div>

              {/* Duration */}
              <div className="program-duration-card__duration">
                {program.duration}
              </div>

              {/* Price */}
              <div className="program-duration-card__price">
                {program.price}
              </div>
              <div className="program-duration-card__perday">
                {program.perDay}
                {program.emi && ' · EMI available'}
              </div>

              {/* Divider */}
              <div className="program-duration-card__divider" />

              {/* Features */}
              <ul className="program-duration-card__features">
                {program.features.map((feature, i) => (
                  <li key={i} className="program-duration-card__feature">
                    <Check
                      size={15}
                      className="program-duration-card__check"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => onEnrol(program.id)}
                className={`program-duration-card__cta ${program.popular ? 'program-duration-card__cta--popular' : ''}`}
              >
                Enrol Now <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Chat CTA */}
        <div className="programs-chat-cta">
          <p className="programs-chat-cta__text">
            Not sure which plan is right for you?
          </p>
          <a
            href={siteConfig.whatsapp}
            className="programs-chat-cta__btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} />
            Chat with Abhi — Get a Recommendation
          </a>
        </div>

      </div>
    </section>
  );
};

export default Programs;