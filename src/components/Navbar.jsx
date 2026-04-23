import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig, navLinks } from '../data/siteData';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ announcementHeight = 40 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        style={{ top: `${announcementHeight}px` }}
      >
        <div className="navbar__inner">

          {/* Logo */}
          <Link to="/" className="navbar__logo">
            {siteConfig.brand}
          </Link>

          {/* Desktop Nav Links */}
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="navbar__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Right Actions */}
          <div className="navbar__actions">
            <Link to="/mothers-program" className="navbar__pill-btn">
              Women's Program <ArrowUpRight size={14} />
            </Link>
            <a href={siteConfig.enrollLink} className="navbar__enrol-btn">
              Enrol Now
            </a>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="navbar__hamburger"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu__overlay" onClick={() => setIsMenuOpen(false)} />
      )}

      <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu--open' : ''}`}>
        {/* Close Button */}
        <div className="mobile-menu__header">
          <Link to="/" className="navbar__logo" onClick={() => setIsMenuOpen(false)}>
            {siteConfig.brand}
          </Link>
          <button
            className="mobile-menu__close"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav Links */}
        <ul className="mobile-menu__links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="mobile-menu__link"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile CTAs */}
        <div className="mobile-menu__ctas">
          <Link
            to="/mothers-program"
            className="mobile-menu__pill-btn"
            onClick={() => setIsMenuOpen(false)}
          >
            Women's Program <ArrowUpRight size={14} />
          </Link>
          <a
            href={siteConfig.enrollLink}
            className="mobile-menu__enrol-btn"
            onClick={() => setIsMenuOpen(false)}
          >
            Enrol Now
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;