import React from 'react';
import { Users, BookOpen, Calendar, Heart } from 'lucide-react';
import { communityData } from '../data/siteData';

const Community = () => {
  const icons = [<Calendar size={24} />, <BookOpen size={24} />, <Users size={24} />, <Heart size={24} />];

  return (
    <section className="community-section bg-sunken" id="community">
      <div className="container">
        <div className="text-center section-header" style={{ maxWidth: '800px', marginInline: 'auto' }}>
          <span className="section-eyebrow">{communityData.eyebrow}</span>
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>{communityData.title}</h2>
          <p className="community-section .section-desc">{communityData.desc}</p>
        </div>

        <div className="community-grid">
          {communityData.features.map((feature, i) => (
            <div key={i} className="community-card" style={{
              backgroundColor: 'white',
              borderRadius: 'var(--border-radius-xl)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '1rem',
                backgroundColor: 'var(--color-surface-warm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-brand)',
                marginBottom: '1.5rem'
              }}>
                {icons[i]}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{feature.title}</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-secondary)', lineHeight: '1.6' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
