import React from 'react';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { footerData } from '../data/siteData';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/Footer.css';

const Footer = () => {
  const [ref, visible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <footer ref={ref} className={`footer bg-dark anim-fade-up ${visible ? 'anim-visible' : ''}`}>
      <div className="container">
        <div className="footer__grid">
          {/* Brand Info */}
          <div className="footer__brand-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)' }}>{footerData.brand}</div>
            <p className="footer__brand-desc" style={{ color: 'var(--color-on-dark-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{footerData.desc}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--color-on-dark-muted)' }}>
                <Phone size={18} color="var(--color-brand)" /> {footerData.contact.phone}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--color-on-dark-muted)' }}>
                <Mail size={18} color="var(--color-brand)" /> {footerData.contact.email}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--color-on-dark-muted)' }}>
                <MapPin size={18} color="var(--color-brand)" /> {footerData.contact.location}
              </div>
            </div>
            <div className="footer__social" style={{ display: 'flex', gap: '1rem' }}>
              <a href={footerData.social.instagram} style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                transition: 'var(--transition)'
              }} className="social-link">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div className="footer__column">
            <h4 style={{ color: 'white', fontWeight: '600' }}>Programs</h4>
            <ul>
              {footerData.programs.map((link, i) => (
                <li key={i}><a href={link.href} style={{ color: 'var(--color-on-dark-secondary)', fontSize: '0.9rem' }}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Focus Areas */}
          {/* <div className="footer__column">
            <h4 style={{ color: 'white', fontWeight: '600' }}>Focus Areas</h4>
            <ul>
              {footerData.specialisations.map((link, i) => (
                <li key={i}><a href={link.href} style={{ color: 'var(--color-on-dark-secondary)', fontSize: '0.9rem' }}>{link.label}</a></li>
              ))}
            </ul>
          </div> */}

          {/* Company */}
          <div className="footer__column">
            <h4 style={{ color: 'white', fontWeight: '600' }}>Company</h4>
            <ul>
              {footerData.company.map((link, i) => (
                <li key={i}><a href={link.href} style={{ color: 'var(--color-on-dark-secondary)', fontSize: '0.9rem' }}>{link.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom" style={{
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ color: 'var(--color-on-dark-muted)', fontSize: '0.85rem' }}>{footerData.copyright}</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy', 'Terms', 'Refunds'].map((text, i) => (
              <a key={i} href="#" style={{ color: 'var(--color-on-dark-muted)', fontSize: '0.85rem' }}>{text}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
