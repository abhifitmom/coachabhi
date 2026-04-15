import React from 'react';
import { Check, MessageCircle, ArrowRight } from 'lucide-react';
import { programs, siteConfig } from '../data/siteData';

const Programs = () => {
  const flagship = programs.find(p => p.id === 1);
  const secondary = programs.find(p => p.id === 2);

  return (
    <section className="programs-section bg-warm" id="programs">
      <div className="container">
        <div className="text-center section-header">
          <span className="section-eyebrow">Our Flagship Program</span>
          <h2 className="section-title">90-Day Mommy Transformation</h2>
        </div>

        {/* Flagship Program Card */}
        <div className="program-card" style={{
          backgroundColor: 'var(--color-surface-dark)',
          color: 'var(--color-on-dark)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
            <span style={{ backgroundColor: 'var(--color-brand)', padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase' }}>{flagship.tag}</span>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase' }}>{flagship.badge}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="program-card__price" style={{ fontWeight: '700', fontFamily: 'var(--font-mono)' }}>{flagship.price}</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--color-on-dark-secondary)' }}>for {flagship.duration} · {flagship.perDay} · {flagship.emi}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <div className="pulse-dot" style={{ backgroundColor: 'var(--color-brand)' }}></div>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-on-dark-secondary)' }}>New batch starting — limited spots</span>
          </div>

          <div className="program-card__features" style={{ marginBottom: '3rem' }}>
            {flagship.features.map((feature, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--color-brand)', flexShrink: 0, marginTop: '2px' }}>
                  <Check size={20} />
                </div>
                <div style={{ color: 'var(--color-on-dark-secondary)', fontSize: '1rem' }}>{feature}</div>
              </div>
            ))}
          </div>

          <div className="program-card__cta-group">
            <a href={siteConfig.enrollLink} className="btn btn-primary" style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
              Enrol Now <ArrowRight size={18} />
            </a>
            <a href={siteConfig.whatsapp} className="btn" style={{ 
              backgroundColor: 'transparent', 
              color: 'white', 
              border: '1px solid rgba(255,255,255,0.2)' 
            }}>
              <MessageCircle size={18} /> Have questions? Chat with Abhi
            </a>
          </div>
        </div>

        {/* Secondary Program Card */}
        <div className="program-secondary" style={{
          backgroundColor: 'white',
          borderRadius: 'var(--border-radius-xl)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          border: '1px solid var(--color-border)'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{secondary.name}</h3>
          <p style={{ maxWidth: '600px', color: 'var(--color-ink-secondary)', marginBottom: '1.5rem' }}>{secondary.description}</p>
          <a href={siteConfig.whatsapp} className="btn" style={{ backgroundColor: 'var(--color-surface-dark)', color: 'white' }}>
            <MessageCircle size={18} /> Chat With Abhi
          </a>
        </div>
      </div>
    </section>
  );
};

export default Programs;
