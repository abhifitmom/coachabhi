import React from 'react';
import { Instagram, Youtube, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { footerData } from '../data/siteData';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/Footer.css';

const Footer = () => {
  const [ref, visible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <footer
      ref={ref}
      className={`footer anim-fade-up ${visible ? 'anim-visible' : ''}`}
    >
      <div className="footer__container">

        {/* ── TOP GRID ── */}
        <div className="footer__grid">

          {/* Brand Column */}
          <div className="footer__brand-col">
            <div className="footer__logo">{footerData.brand}</div>
            <p className="footer__desc">{footerData.desc}</p>

            {/* Contact Info */}
            <div className="footer__contact">
              <a href={`tel:${footerData.contact.phone.replace(/\s/g, '')}`} className="footer__contact-item">
                <Phone size={16} />
                <span>{footerData.contact.phone}</span>
              </a>
              <a href={`mailto:${footerData.contact.email}`} className="footer__contact-item">
                <Mail size={16} />
                <span>{footerData.contact.email}</span>
              </a>
              <div className="footer__contact-item">
                <MapPin size={16} />
                <span>{footerData.contact.location}</span>
              </div>
            </div>
          </div>

          {/* Programs Column */}
          <div className="footer__column">
            <h4 className="footer__col-title">Programs</h4>
            <ul className="footer__links">
              {footerData.programs.map((link, i) => (
                <li key={i}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="footer__link">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="footer__link">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Navigate Column */}
          <div className="footer__column">
            <h4 className="footer__col-title">Navigate</h4>
            <ul className="footer__links">
              {footerData.navigate.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── DIVIDER ── */}
        <div className="footer__divider" />

        {/* ── BOTTOM ROW ── */}
        <div className="footer__bottom">

          {/* Copyright */}
          <p className="footer__copy">{footerData.copyright}</p>

          {/* Social Icons */}
          <div className="footer__social">
            <a
              href={footerData.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-btn"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href={footerData.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-btn"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
            <a
              href={footerData.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-btn footer__social-btn--whatsapp"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
            <a
              href={footerData.social.email}
              className="footer__social-btn"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
