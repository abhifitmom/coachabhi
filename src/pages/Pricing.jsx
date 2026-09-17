import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, ArrowRight, MessageCircle } from 'lucide-react';
import { pricingData, siteConfig } from '../data/siteData';
import '../styles/Pricing.css';

const PricingCard = ({ plan, type }) => (
  <div className={`pricing-card ${plan.popular ? 'pricing-card--popular' : ''}`}>
    {plan.popular && (
      <div className="pricing-card__badge">Most Popular</div>
    )}

    <div className="pricing-card__duration">{plan.duration}</div>

    {plan.sessions && (
      <div className="pricing-card__sessions">{plan.sessions}</div>
    )}

    <div className="pricing-card__price">{plan.price}</div>

    {/* Features list */}
    <ul className="pricing-card__features">
      {plan.features.map((f, i) => (
        <li key={i} className="pricing-card__feature">
          <Check size={13} className="pricing-card__check" />
          <span>{f}</span>
        </li>
      ))}
    </ul>

    <a
      href={`${siteConfig.whatsapp}?text=Hi Abhi! I'm interested in the ${type} - ${plan.duration} plan (${plan.price}). Can you share more details?`}
      target="_blank"
      rel="noopener noreferrer"
      className={`pricing-card__btn ${plan.popular ? 'pricing-card__btn--popular' : ''}`}
    >
      Enrol Now
    </a>
  </div>
);

const Pricing = () => {
  return (
    <div className="pricing-page">

      {/* Back button */}
      <div className="pricing-back">
        <Link to="/" className="pricing-back__link">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="pricing-header">
        <span className="section-eyebrow">Transparent Pricing</span>
        <h1 className="pricing-header__title">Choose Your Plan</h1>
        <p className="pricing-header__sub">
          No hidden fees. No lock-ins. Just results.
        </p>
      </div>

      {/* ── ONLINE COACHING ── */}
      <div className="pricing-section">
        <div className="pricing-section__header">
          <h2 className="pricing-section__title">
            {pricingData.onlineCoaching.title}
          </h2>
          <p className="pricing-section__sub">
            {pricingData.onlineCoaching.subtitle}
          </p>
        </div>
        <div className="pricing-track-wrapper">
          <div className="pricing-track">
            {pricingData.onlineCoaching.plans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                type="Online Coaching"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="pricing-divider" />

      {/* ── ONLINE 1-1 TRAINING ── */}
      <div className="pricing-section">
        <div className="pricing-section__header">
          <h2 className="pricing-section__title">
            {pricingData.onlineTraining.title}
          </h2>
          <p className="pricing-section__sub">
            {pricingData.onlineTraining.subtitle}
          </p>
        </div>
        <div className="pricing-track-wrapper">
          <div className="pricing-track">
            {pricingData.onlineTraining.plans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                type="Online 1-on-1 Training"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="pricing-divider" />

      {/* ── TRIAL SESSION ── */}
      <div className="pricing-trial">
        <div className="pricing-trial__content">
          <h2 className="pricing-trial__title">
            {pricingData.trial.title}
          </h2>
          <p className="pricing-trial__sub">
            {pricingData.trial.subtitle}
          </p>
          <div className="pricing-trial__price">
            {pricingData.trial.price}
            <span>/ session</span>
          </div>
          <p className="pricing-trial__note">
            {pricingData.trial.note}
          </p>
          <div className="pricing-trial__btns">
            <a
              href={`${siteConfig.whatsapp}?text=Hi Abhi! I'd like to book a trial session for ₹750.`}
              target="_blank"
              rel="noopener noreferrer"
              className="pricing-trial__cta"
            >
              {pricingData.trial.cta} <ArrowRight size={18} />
            </a>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="pricing-trial__whatsapp"
            >
              <MessageCircle size={18} />
              Ask a Question
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Pricing;
