import React, { useState } from 'react';
import { Check, MessageCircle, ArrowRight } from 'lucide-react';
import { pricingData, groupClassesData, siteConfig } from '../data/siteData';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/Programs.css';

const ProgramCard = ({ plan, categoryTitle }) => (
  <div className={`program-duration-card ${plan.popular ? 'program-duration-card--popular' : ''}`}>
    {plan.popular && (
      <div className="program-duration-card__popular-badge">
        Most Popular
      </div>
    )}

    <div className="program-duration-card__duration">{plan.duration}</div>

    {plan.sessions && (
      <div className="program-duration-card__sessions">{plan.sessions}</div>
    )}

    <div className="program-duration-card__price-wrap" style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
      {plan.originalPrice && plan.originalPrice !== plan.price && (
        <span className="pricing-card__original" style={{ textDecoration: 'line-through', opacity: 0.6, fontSize: '0.9rem' }}>
          {plan.originalPrice}
        </span>
      )}
      <div className="program-duration-card__price" style={{ margin: 0 }}>{plan.price}</div>
    </div>

    {/* Features */}
    {plan.features && (
      <ul className="program-duration-card__features">
        {plan.features.map((feature, i) => (
          <li key={i} className="program-duration-card__feature">
            <Check size={13} className="program-duration-card__check" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    )}

    {/* CTA */}
    <a
      href={`${siteConfig.whatsapp}?text=Hi Abhi! I'm interested in the ${categoryTitle} - ${plan.duration} plan (${plan.price}). Can you share more details?`}
      target="_blank"
      rel="noopener noreferrer"
      className={`program-duration-card__cta ${plan.popular ? 'program-duration-card__cta--popular' : ''}`}
    >
      Enrol Now <ArrowRight size={15} />
    </a>
  </div>
);

const Programs = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [headerRef, headerVisible] = useScrollAnimation();
  const [contentRef, contentVisible] = useScrollAnimation({ threshold: 0.1 });

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
            Pick the duration that works for you — every plan includes personal coaching directly with Abhi.
          </p>

          {/* Category Filter Tabs */}
          <div className="programs-tabs">
            <button
              className={`programs-tab ${activeTab === 'all' ? 'programs-tab--active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Programs
            </button>
            <button
              className={`programs-tab ${activeTab === 'coaching' ? 'programs-tab--active' : ''}`}
              onClick={() => setActiveTab('coaching')}
            >
              {pricingData.onlineCoaching.title}
            </button>
            <button
              className={`programs-tab ${activeTab === 'training' ? 'programs-tab--active' : ''}`}
              onClick={() => setActiveTab('training')}
            >
              {pricingData.onlineTraining.title}
            </button>
            <button
              className={`programs-tab ${activeTab === 'group' ? 'programs-tab--active' : ''}`}
              onClick={() => setActiveTab('group')}
            >
              Group Classes
            </button>
          </div>
        </div>

        <div ref={contentRef} className={`anim-fade-up ${contentVisible ? 'anim-visible' : ''}`}>
          {/* ── ONLINE COACHING SECTION ── */}
          {(activeTab === 'all' || activeTab === 'coaching') && (
            <div className="programs-category">
              <div className="programs-category__header">
                <h3 className="programs-category__title">
                  {pricingData.onlineCoaching.title}
                </h3>
                <p className="programs-category__sub">
                  {pricingData.onlineCoaching.subtitle}
                </p>
              </div>

              <div className="programs-track-wrapper">
                <div className="programs-track">
                  {pricingData.onlineCoaching.plans.map((plan) => (
                    <ProgramCard
                      key={plan.id}
                      plan={plan}
                      categoryTitle={pricingData.onlineCoaching.title}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Divider if showing all */}
          {activeTab === 'all' && <div className="programs-divider" />}

          {/* ── ONLINE 1-ON-1 TRAINING SECTION ── */}
          {(activeTab === 'all' || activeTab === 'training') && (
            <div className="programs-category">
              <div className="programs-category__header">
                <h3 className="programs-category__title">
                  {pricingData.onlineTraining.title}
                </h3>
                <p className="programs-category__sub">
                  {pricingData.onlineTraining.subtitle}
                </p>
              </div>

              <div className="programs-track-wrapper">
                <div className="programs-track programs-track--3cols">
                  {pricingData.onlineTraining.plans.map((plan) => (
                    <ProgramCard
                      key={plan.id}
                      plan={plan}
                      categoryTitle={pricingData.onlineTraining.title}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Divider if showing all */}
          {activeTab === 'all' && <div className="programs-divider" />}

          {/* ── GROUP CLASSES SECTION ── */}
          {(activeTab === 'all' || activeTab === 'group') && (
            <div className="programs-category">
              <div className="programs-category__header">
                <h3 className="programs-category__title">
                  Online Group Classes
                </h3>
                <p className="programs-category__sub">
                  Live group sessions for postpartum women — small batch (max 10)
                </p>
              </div>

              <div className="programs-track-wrapper">
                <div className="programs-track programs-track--2cols">
                  {groupClassesData.plans.map((plan) => (
                    <ProgramCard
                      key={plan.id}
                      plan={{
                        ...plan,
                        features: plan.features || groupClassesData.includes
                      }}
                      categoryTitle="Group Classes"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
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