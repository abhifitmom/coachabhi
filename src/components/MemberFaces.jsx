import React from 'react';
import { memberFaces } from '../data/siteData';
import '../styles/MemberFaces.css';

const MemberFaces = () => {
  return (
    <div className="member-faces-section">
      <div className="container section-header">
        <span className="section-eyebrow text-center" style={{ display: 'block' }}>Real Moms. Real Results.</span>
      </div>
      
      <div className="marquee-wrapper" style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
      }}>
        <div className="marquee-content" style={{
          display: 'flex',
          gap: '1.5rem',
          animation: 'marquee 40s linear infinite',
          padding: '1rem 0'
        }}>
          {/* Duplicate for infinite effect */}
          {[...memberFaces, ...memberFaces, ...memberFaces].map((face, index) => (
            <div key={index} className="marquee__pill" style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: '999px',
              border: '1px solid var(--color-border)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}>
              <div className="marquee__avatar" style={{
                borderRadius: '50%',
                backgroundColor: 'var(--color-brand-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: 'var(--color-brand)'
              }}>
                {face.name.charAt(0)}
              </div>
              <div>
                <div className="marquee__name" style={{ fontWeight: '600' }}>{face.name}</div>
                <div className="marquee__detail" style={{ color: 'var(--color-ink-muted)' }}>{face.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberFaces;
