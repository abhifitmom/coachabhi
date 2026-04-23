import React, { useState } from 'react';
import { Phone, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { ctaData, siteConfig } from '../data/siteData';
import useScrollAnimation from '../hooks/useScrollAnimation';
import useFormSubmit from '../hooks/useFormSubmit';
import '../styles/FinalCTA.css';

const FinalCTA = () => {
  const [ref, visible] = useScrollAnimation({ threshold: 0.2 });
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { submitForm, isSubmitting, isSuccess } = useFormSubmit();

  const handleCallback = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    await submitForm('callback', {
      name: name.trim(),
      phone: phone.trim(),
      source: 'Main Website - Callback Form'
    });

    setName('');
    setPhone('');
  };

  return (
    <section className="fcta-section" id="contact">
      <div className="container">
        <div ref={ref} className={`fcta-card anim-scale ${visible ? 'anim-visible' : ''}`}>

          {/* Headline */}
          <h2 className="fcta-title">{ctaData.headline}</h2>
          <p className="fcta-desc">{ctaData.desc}</p>

          {/* Price */}
          <div className="fcta-price-row">
            <span className="fcta-price">{ctaData.price}</span>
            <span className="fcta-duration">{ctaData.duration}</span>
          </div>

          {/* Primary CTA */}
          <a href={siteConfig.enrollLink} className="fcta-enrol-btn">
            {ctaData.ctaPrimary}
            <ArrowRight size={18} />
          </a>

          {/* Security Note */}
          <div className="fcta-security">
            <ShieldCheck size={15} color="var(--color-brand)" />
            <span>{ctaData.securityNote}</span>
          </div>

          {/* Divider */}
          <div className="fcta-divider">
            <div className="fcta-divider__line" />
            <span className="fcta-divider__text">or get a free callback</span>
            <div className="fcta-divider__line" />
          </div>

          {/* Callback Form */}
          <form className="fcta-form" onSubmit={handleCallback}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="fcta-input"
              required
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="fcta-input"
              maxLength={10}
              required
            />
            <button
              type="submit"
              className="fcta-callback-btn"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Sending...'
                : <><Phone size={16} /> Callback</>
              }
            </button>
          </form>

          {isSuccess && (
            <p style={{
              color: '#22C55E',
              fontSize: '0.85rem',
              textAlign: 'center',
              marginTop: '0.5rem',
              fontWeight: '600'
            }}>
              ✅ Request received! Abhi will call you shortly.
            </p>
          )}

          {/* OR Divider */}
          <div className="fcta-divider">
            <div className="fcta-divider__line" />
            <span className="fcta-divider__text">or</span>
            <div className="fcta-divider__line" />
          </div>

          {/* WhatsApp */}
          <a
            href={siteConfig.whatsapp}
            className="fcta-whatsapp-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} />
            {ctaData.whatsappCta}
          </a>

          {/* Batch Note */}
          <p className="fcta-batch-note">{ctaData.batchNote}</p>

        </div>
      </div>
    </section>
  );
};

export default FinalCTA;