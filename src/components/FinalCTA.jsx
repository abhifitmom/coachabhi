import React from 'react';
import { Phone, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { ctaData, siteConfig } from '../data/siteData';

const FinalCTA = () => {
  return (
    <section className="final-cta-section" id="contact">
      <div className="container">
        <div className="final-cta-card bg-dark">
          <h2 className="section-title" style={{ color: 'white', marginBottom: '1.5rem' }}>{ctaData.headline}</h2>
          <p className="body-md" style={{ color: 'var(--color-on-dark-secondary)', marginBottom: '2.5rem', maxWidth: '600px', marginInline: 'auto' }}>
            {ctaData.desc}
          </p>

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
            <span className="price" style={{ fontWeight: '700', fontFamily: 'var(--font-mono)' }}>{ctaData.price}</span>
            <span style={{ fontSize: '1rem', color: 'var(--color-on-dark-secondary)' }}>{ctaData.duration}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <a href={siteConfig.enrollLink} className="btn btn-primary">
              {ctaData.ctaPrimary} <ArrowRight size={20} />
            </a>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              fontSize: '0.85rem', 
              color: 'var(--color-on-dark-muted)' 
            }}>
              <ShieldCheck size={16} color="var(--color-brand)" /> {ctaData.securityNote}
            </div>

            <div style={{
              width: '100%',
              maxWidth: '400px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              margin: '1.5rem 0'
            }}>
              <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-on-dark-muted)', textTransform: 'uppercase' }}>or get a free callback</div>
              <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
            </div>

            {/* Quick Callback Form */}
            <div className="final-cta-form" style={{ width: '100%', maxWidth: '600px' }}>
              <input type="text" placeholder="Your name" className="form-input" style={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }} />
              <input type="text" placeholder="Phone number" className="form-input" style={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }} />
              <button className="btn" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}>
                <Phone size={18} /> Callback
              </button>
            </div>

            <div style={{
              width: '100%',
              maxWidth: '400px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              margin: '1.5rem 0'
            }}>
              <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-on-dark-muted)', textTransform: 'uppercase' }}>or</div>
              <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
            </div>

            <a href={siteConfig.whatsapp} className="btn final-cta-whatsapp" style={{ 
              maxWidth: '400px', 
              backgroundColor: 'transparent', 
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white'
            }}>
              <MessageCircle size={18} /> {ctaData.whatsappCta}
            </a>

            <div style={{ 
              fontSize: '0.85rem', 
              color: 'var(--color-on-dark-secondary)',
              marginTop: '2rem'
            }}>
              {ctaData.batchNote}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
