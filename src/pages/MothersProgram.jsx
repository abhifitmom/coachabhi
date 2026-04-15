import React, { useState } from 'react';
import {
  Check, MessageCircle, ChevronDown,
  Phone, ClipboardList, Target, CheckCircle2
} from 'lucide-react';
import { landingPageData, siteConfig } from '../data/siteData';
import { Link } from 'react-router-dom';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import AnnouncementBar from '../components/AnnouncementBar';

/* ── FAQ Item Component ── */
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="lp-faq-item">
      <button
        className="lp-faq-item__btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="lp-faq-item__question">{question}</span>
        <ChevronDown
          size={20}
          className={`lp-faq-item__icon ${isOpen ? 'lp-faq-item__icon--open' : ''}`}
        />
      </button>
      {isOpen && (
        <p className="lp-faq-item__answer">{answer}</p>
      )}
    </div>
  );
};

/* ── Main Page ── */
const MothersProgram = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const announcementHeight = showAnnouncement ? 40 : 0;
  const d = landingPageData;

  return (
    <div className="landing-page">

      {/* Announcement Bar */}
      <AnnouncementBar
        isVisible={showAnnouncement}
        onDismiss={() => setShowAnnouncement(false)}
      />

      {/* ── MINI NAVBAR ── */}
      <nav
        className="lp-navbar"
        style={{ top: `${announcementHeight}px` }}
      >
        <div className="lp-navbar__inner">
          <Link to="/" className="lp-navbar__logo">
            {siteConfig.brand}
          </Link>
          <a href={siteConfig.whatsapp} className="lp-navbar__cta">
            Book Free Call
          </a>
        </div>
      </nav>

      <main style={{ marginTop: `${announcementHeight + 1}px` }}>

        {/* ── SECTION 2 — HERO ── */}
        <section className="lp-hero">
          <h1 className="lp-hero__headline">{d.hero.headline}</h1>
          <p className="lp-hero__subheadline">{d.hero.subheadline}</p>

          {/* Video Placeholder */}
          <div className="lp-video-wrapper">
            <div className="lp-video-placeholder">
              <div className="lp-video-play-btn">▶</div>
              <p>Watch How The Program Works</p>
            </div>
          </div>

          {/* Problem Awareness */}
          <div className="lp-problem-block">
            <p>
              Most mothers think they need:<br />
              <span className="lp-problem-block__myths">
                strict diets, cutting carbs completely, or hours in the gym
              </span><br />
              to finally lose weight and keep it off.
            </p>
            <p>
              But here's what I've learned after helping 200+ mothers
              transform their bodies:
            </p>
            <div className="lp-problem-block__points">
              <div className="lp-problem-block__point">
                🔸 The problem isn't your willpower.
              </div>
              <div className="lp-problem-block__point">
                🔸 The problem isn't that you're lazy or inconsistent.
              </div>
              <div className="lp-problem-block__point">
                🔸 And it's definitely not that your body is 'slow.'
              </div>
            </div>
            <p>
              The <span className="lp-orange">real problem</span> is that
              you were never given a system built for a{' '}
              <span className="lp-orange">busy mother's lifestyle</span>{' '}
              — with a postpartum body.
            </p>
          </div>

          {/* CTA */}
          <div className="lp-hero__cta-wrap">
            <a href={siteConfig.whatsapp} className="lp-cta-btn">
              {d.hero.cta}
            </a>
            <p className="lp-cta-subtext">{d.hero.ctaSubtext}</p>
          </div>

          {/* Trust Badges */}
          <div className="lp-trust-badges">
            {d.hero.trustBadges.map((badge, i) => (
              <div key={i} className="lp-trust-badge">
                <Check size={13} color="var(--color-brand)" strokeWidth={3} />
                {badge}
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3 — HOOK ── */}
        <section className="lp-section lp-bg-white">
          <div className="lp-section__inner lp-text-center">
            <h2 className="lp-section-title" style={{ marginBottom: '1rem' }}>
              {d.hook.headline}
            </h2>
            <p className="lp-section-subtitle" style={{ marginBottom: '2rem' }}>
              {d.hook.subheadline}
            </p>
            <a href="#how" className="lp-cta-wide">
              {d.hook.cta} ↓
            </a>
          </div>
        </section>

        {/* ── SECTION 4 — THREE PILLARS ── */}
        <section className="lp-section lp-bg-warm" id="how">
          <div className="lp-section__inner">
            <div className="lp-pillars-grid">
              {d.pillars.map((pillar, i) => (
                <div key={i} className="lp-pillar-card">
                  <div className="lp-pillar-card__image">
                    {i === 0 ? '🧘‍♀️' : i === 1 ? '⚡' : '🤝'}
                  </div>
                  <div className="lp-pillar-card__body">
                    <h3 className="lp-pillar-card__title">{pillar.title}</h3>
                    <div className="lp-pillar-card__points">
                      {pillar.points.map((point, j) => (
                        <div key={j} className="lp-pillar-card__point">
                          <CheckCircle2
                            size={17}
                            color="var(--color-brand)"
                          />
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lp-cta-center">
              <a href={siteConfig.whatsapp} className="lp-cta-wide">
                START YOUR TRANSFORMATION
              </a>
            </div>
          </div>
        </section>

        {/* ── SECTION 5 — WHY THIS WORKS ── */}
        <section className="lp-section lp-bg-sunken">
          <div className="lp-section__inner">
            <div className="lp-section-header">
              <h2 className="lp-section-title">{d.whyChoose.headline}</h2>
              <p className="lp-section-subtitle">{d.whyChoose.subheadline}</p>
            </div>
            <div className="lp-features-grid">
              {d.whyChoose.features.map((feature, i) => (
                <div key={i} className="lp-feature-card">
                  <span className="lp-feature-card__icon">{feature.icon}</span>
                  <h3 className="lp-feature-card__title">{feature.title}</h3>
                  <p className="lp-feature-card__desc">{feature.desc}</p>
                </div>
              ))}
            </div>
            <div className="lp-cta-center">
              <a href={siteConfig.whatsapp} className="lp-cta-wide">
                BOOK CONSULTATION
              </a>
            </div>
          </div>
        </section>

        {/* ── SECTION 6 — HOW IT WORKS ── */}
        <section className="lp-section lp-bg-white">
          <div className="lp-section__inner">
            <div className="lp-section-header">
              <h2 className="lp-section-title">{d.howItWorks.headline}</h2>
              <p className="lp-section-subtitle">{d.howItWorks.subheadline}</p>
            </div>
            <div className="lp-steps-grid">
              {d.howItWorks.steps.map((step, i) => (
                <div key={i} className="lp-step">
                  <div className="lp-step__icon">
                    {i === 0
                      ? <Phone size={24} />
                      : i === 1
                      ? <ClipboardList size={24} />
                      : <Target size={24} />}
                  </div>
                  <div className="lp-step__label">{step.step}</div>
                  <h3 className="lp-step__title">{step.title}</h3>
                  <p className="lp-step__desc">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="lp-cta-center">
              <a href={siteConfig.whatsapp} className="lp-cta-wide">
                APPLY NOW
              </a>
            </div>
          </div>
        </section>

        {/* ── SECTION 7 — TRANSFORMATIONS ── */}
        <section className="lp-section lp-bg-warm">
          <div className="lp-section__inner">
            <div className="lp-section-header">
              <h2 className="lp-section-title">Client Transformations</h2>
            </div>
            <div className="lp-transformations-grid">
              {d.transformations.map((trans, i) => (
                <div key={i} className="lp-transformation-card">
                  <div className="lp-transformation-card__header">
                    <div className="lp-transformation-card__name">
                      {trans.name} | {trans.location}
                    </div>
                    <div className="lp-transformation-card__meta">
                      Age {trans.age} · {trans.profession}
                    </div>
                  </div>

                  <div className="lp-weight-badge">
                    <span className="lp-weight-badge__before">
                      Before: {trans.beforeKg} Kg
                    </span>
                    <div className="lp-weight-badge__divider" />
                    <span className="lp-weight-badge__after">
                      After: {trans.afterKg} Kg
                    </span>
                  </div>

                  <div className="lp-transformation-card__photo">
                    [ Before / After Photo ]
                  </div>

                  <div className="lp-transformation-card__details">
                    <div>
                      <div className="lp-transformation-card__label lp-transformation-card__label--dark">
                        Key Struggle:
                      </div>
                      <p className="lp-transformation-card__text">
                        {trans.struggle}
                      </p>
                    </div>
                    <div>
                      <div className="lp-transformation-card__label lp-transformation-card__label--orange">
                        Transformation:
                      </div>
                      <p className="lp-transformation-card__text">
                        {trans.result}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lp-cta-center">
              <a href={siteConfig.whatsapp} className="lp-cta-wide">
                APPLY FOR COACHING
              </a>
            </div>
          </div>
        </section>

        {/* ── SECTION 8 — MEET COACH ── */}
        <section className="lp-section lp-bg-white">
          <div className="lp-section__inner">
            <div className="lp-coach-grid">
              <div className="lp-coach-image">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop"
                  alt="Coach Abhi"
                />
              </div>
              <div>
                <h2 className="lp-coach-content__title">Meet Your Coach</h2>
                <p className="lp-coach-content__bio">{d.coach.bio1}</p>
                <p className="lp-coach-content__bio">{d.coach.bio2}</p>
                <p className="lp-coach-content__bio">{d.coach.bio3}</p>
                <div className="lp-coach-certs">
                  {d.coach.certifications.map((cert, i) => (
                    <div key={i} className="lp-coach-cert">
                      <CheckCircle2 size={17} color="var(--color-brand)" />
                      {cert}
                    </div>
                  ))}
                </div>
                <a href={siteConfig.whatsapp} className="lp-cta-btn"
                  style={{ maxWidth: '280px' }}>
                  BOOK CALL
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 9 — FAQ ── */}
        <section className="lp-section lp-bg-sunken">
          <div className="lp-section__inner--narrow">
            <div className="lp-section-header">
              <h2 className="lp-section-title">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="lp-faq-card">
              {d.faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 10 — FINAL CTA ── */}
        <section className="lp-final-cta">
          <div className="lp-final-cta__inner">
            <h2 className="lp-final-cta__title">{d.finalCta.headline}</h2>
            <p className="lp-final-cta__subtitle">{d.finalCta.subheadline}</p>
            <p className="lp-final-cta__price">{d.finalCta.price}</p>
            <div className="lp-final-cta__actions">
              <a href={siteConfig.whatsapp} className="lp-final-cta__btn">
                {d.finalCta.cta}
              </a>
              <p className="lp-final-cta__guarantee">
                {d.finalCta.guarantee}
              </p>
              <a
                href={siteConfig.whatsapp}
                className="lp-final-cta__whatsapp"
              >
                <MessageCircle size={22} />
                {d.finalCta.whatsappCta}
              </a>
              <p className="lp-final-cta__urgency">{d.finalCta.urgency}</p>
            </div>
          </div>
        </section>

        {/* ── MINI FOOTER ── */}
        <footer className="lp-footer">
          <p className="lp-footer__copy">{siteConfig.copyright}</p>
          <div className="lp-footer__links">
            <a href="#" className="lp-footer__link">Privacy Policy</a>
            <a href="#" className="lp-footer__link">Terms</a>
            <a href="#" className="lp-footer__link">Refund Policy</a>
          </div>
        </footer>

      </main>

      <FloatingWhatsApp />
    </div>
  );
};

export default MothersProgram;