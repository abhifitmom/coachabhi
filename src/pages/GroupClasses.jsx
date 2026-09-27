import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Users, Clock, IndianRupee } from 'lucide-react';
import { groupClassesData, siteConfig } from '../data/siteData';
import '../styles/GroupClasses.css';

const GroupClasses = () => {
  const navigate = useNavigate();
  const d = groupClassesData;
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', slot: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone)) errs.phone = 'Enter valid 10-digit number';
    if (!form.email.trim()) errs.email = 'Email is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      city: form.city.trim() || 'N/A',
      programName: 'Online Group Classes (Monthly)',
      programId: 'group-classes',
      amount: 4999,
      price: '₹4,999',
      batch: form.slot || 'Group Class Batch',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('abhiEnrollData', JSON.stringify(payload));
    navigate('/payment');
  };

  return (
    <div className="gc-page">

      {/* Back */}
      <div className="gc-back">
        <Link to="/" className="gc-back__link">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>

      {/* Hero */}
      <div className="gc-hero">
        <span className="section-eyebrow">{d.hero.eyebrow}</span>
        <h1 className="gc-hero__title">
          {d.hero.headline.split('\n').map((line, i) => (
            <span key={i}>
              {i === 0 ? line : <span className="gc-hero__title--orange">{line}</span>}
              <br />
            </span>
          ))}
        </h1>
        <p className="gc-hero__sub">{d.hero.subheadline}</p>
        <div className="gc-hero__price">
          <div className="pricing-card__price-wrap" style={{ alignItems: 'center' }}>
            {d.hero.originalPrice && (
              <span className="pricing-card__original" style={{ fontSize: '1.1rem' }}>{d.hero.originalPrice}</span>
            )}
            <span className="gc-hero__amount">{d.hero.price}</span>
          </div>
          <span className="gc-hero__duration">{d.hero.duration}</span>
        </div>
        <div className="gc-hero__includes">
          <Check size={15} color="#FF6835" />
          {d.hero.includes}
        </div>
        <div className="gc-trainer">
          <div className="gc-trainer__img-wrap">
            <img
              src="https://res.cloudinary.com/db9wu2abk/image/upload/v1790528607/ChatGPT_Image_Sep_27_2026_10_33_12_PM_qqb7g2.png"
              alt="Sneha — Your Trainer"
              className="gc-trainer__img"
              loading="lazy"
            />
          </div>
          <div className="gc-trainer__info">
            <span className="gc-trainer__name">Sneha</span>
            <span className="gc-trainer__role">Your Trainer</span>
          </div>
        </div>
      </div>

      {/* Plans Section */}
      {d.plans && d.plans.length > 0 && (
        <div className="gc-section">
          <div className="gc-section__header">
            <span className="section-eyebrow">Pricing Plans</span>
            <h2 className="gc-section__title">Choose Your Batch Plan</h2>
          </div>
          <div className="gc-plans">
            {d.plans.map((plan) => (
              <div key={plan.id} className={`gc-plan-card ${plan.popular ? 'gc-plan-card--popular' : ''}`}>
                {plan.popular && <span className="gc-plan-card__badge">Most Popular</span>}
                <div className="gc-plan-card__duration">{plan.duration}</div>
                {plan.sessions && <div className="gc-plan-card__sessions">{plan.sessions}</div>}
                <div className="pricing-card__price-wrap">
                  {plan.originalPrice && <span className="pricing-card__original">{plan.originalPrice}</span>}
                  <div className="pricing-card__price">{plan.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Time Slots */}
      <div className="gc-section">
        <div className="gc-section__header">
          <span className="section-eyebrow">Batch Timings</span>
          <h2 className="gc-section__title">Available Time Slots</h2>
          <p className="gc-section__sub">All slots run Monday to Saturday. Sunday is rest day.</p>
        </div>
        <div className="gc-slots">
          {d.slots.map((slot) => (
            <div key={slot.id} className="gc-slot">
              {slot.tag && <span className="gc-slot__tag">{slot.tag}</span>}
              <div className="gc-slot__time">{slot.time}</div>
              <div className="gc-slot__label">{slot.label}</div>
              <p className="gc-slot__desc">{slot.desc}</p>
              <div className="gc-slot__days">
                <Clock size={13} />
                {slot.days}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What's Included */}
      <div className="gc-section gc-section--warm">
        <div className="gc-section__header">
          <span className="section-eyebrow">What You Get</span>
          <h2 className="gc-section__title">Everything Included</h2>
        </div>
        <div className="gc-includes">
          {d.includes.map((item, i) => (
            <div key={i} className="gc-include-card">
              <div className="gc-include-card__icon">
                <Check size={18} />
              </div>
              <div>
                <h3 className="gc-include-card__title">
                  {typeof item === 'string' ? item : item.title}
                </h3>
                {typeof item === 'object' && item.desc && (
                  <p className="gc-include-card__desc">{item.desc}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="gc-section">
        <div className="gc-section__header">
          <span className="section-eyebrow">How It Works</span>
          <h2 className="gc-section__title">4 Simple Steps</h2>
        </div>
        <div className="gc-steps">
          {d.howItWorks.map((step, i) => (
            <div key={i} className="gc-step">
              <div className="gc-step__number">{step.step}</div>
              <h3 className="gc-step__title">{step.title}</h3>
              <p className="gc-step__desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Enrol Form */}
      <div className="gc-section gc-section--dark" id="enrol">
        <div className="gc-form-wrap">
          <div className="gc-form-header">
            <h2 className="gc-form-header__title">Reserve Your Spot</h2>
            <p className="gc-form-header__sub">
              Fill in your details. You'll be redirected to WhatsApp to complete payment and get confirmed.
            </p>
            <div className="gc-form-price">
              <span className="pricing-card__original" style={{ fontSize: '1rem', marginRight: '0.5rem', color: 'rgba(255,255,255,0.5)' }}>₹6,999</span>
              ₹4,999 <span>/ month</span>
            </div>
          </div>

          <form className="gc-form" onSubmit={handleSubmit} noValidate>

            <div className="gc-form__field">
              <label className="gc-form__label">Full Name *</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className={`gc-form__input ${errors.name ? 'gc-form__input--error' : ''}`}
              />
              {errors.name && <span className="gc-error">{errors.name}</span>}
            </div>

            <div className="gc-form__field">
              <label className="gc-form__label">Phone Number *</label>
              <input
                name="phone"
                type="tel"
                placeholder="10-digit mobile number"
                value={form.phone}
                onChange={handleChange}
                maxLength={10}
                className={`gc-form__input ${errors.phone ? 'gc-form__input--error' : ''}`}
              />
              {errors.phone && <span className="gc-error">{errors.phone}</span>}
            </div>

            <div className="gc-form__field">
              <label className="gc-form__label">Email Address *</label>
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                className={`gc-form__input ${errors.email ? 'gc-form__input--error' : ''}`}
              />
              {errors.email && <span className="gc-error">{errors.email}</span>}
            </div>

            <div className="gc-form__field">
              <label className="gc-form__label">City</label>
              <input
                name="city"
                type="text"
                placeholder="Your city"
                value={form.city}
                onChange={handleChange}
                className="gc-form__input"
              />
            </div>

            <div className="gc-form__field">
              <label className="gc-form__label">Preferred Slot (Optional)</label>
              <div className="gc-form__slots">
                {d.slots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    className={`gc-form__slot-btn ${form.slot === slot.time ? 'gc-form__slot-btn--active' : ''}`}
                    onClick={() => setForm(prev => ({ ...prev, slot: slot.time }))}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="gc-form__submit">
              Proceed to Payment (₹4,999)
              <ArrowRight size={18} />
            </button>

            <p className="gc-form__note">
              🔒 100% Secure registration. Next step: UPI / Bank payment details & UTR confirmation.
            </p>

          </form>
        </div>
      </div>

    </div>
  );
};

export default GroupClasses;
