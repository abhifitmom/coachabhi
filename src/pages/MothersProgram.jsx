import React, { useState, useEffect, useRef } from 'react';
import {
  Check,
  MessageCircle,
  ChevronDown,
  Phone,
  ClipboardList,
  Target,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Play,
  UserCheck,
  Zap,
  HeartHandshake,
  BarChart3,
  CheckCircle,
  Home as HomeIcon,
  UtensilsCrossed
} from 'lucide-react';
import { landingPageData, siteConfig } from '../data/siteData';
import { Link } from 'react-router-dom';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import useFormSubmit from '../hooks/useFormSubmit';
import '../styles/LandingPage.css';
import '../styles/BookingModal.css';

// ── Scroll Animation Hook (inline — no external file needed) ──
const useAnim = (options = {}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: options.threshold || 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
};

const whyIcons = [
  <UserCheck size={22} />,      // 1:1 Personal Coaching
  <Zap size={22} />,            // Live Video Training
  <UtensilsCrossed size={22} />, // Personalised Diet
  <HomeIcon size={22} />,       // Home Workout
  <CheckCircle size={22} />,    // Accountability
  <BarChart3 size={22} />,      // Progress Tracking
];

const pillarIcons = [
  <UserCheck size={32} />,    // Personal Coaching
  <Zap size={32} />,          // Busy Mom System
  <HeartHandshake size={32} />, // Full Accountability
];

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

const BookingModal = ({ isOpen, onClose, calendlyLink }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });
  const [errors, setErrors] = useState({});
  const { submitForm, isSubmitting } = useFormSubmit();

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\s/g, ''))) {
      newErrors.mobile = 'Enter a valid 10-digit Indian mobile number';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on type
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await submitForm('mothers', {
      name: formData.name,
      phone: formData.mobile,
      email: formData.email,
      source: 'Mothers Program Page - Booking Form'
    });

    // Redirect to Calendly
    window.open(calendlyLink, '_blank');
    onClose();
    setFormData({ name: '', email: '', mobile: '' });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="booking-modal__overlay"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="booking-modal" role="dialog" aria-modal="true">

        {/* Close Button */}
        <button
          className="booking-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <div className="booking-modal__header">
          <div className="booking-modal__icon">📞</div>
          <h2 className="booking-modal__title">
            Book Your Free Strategy Call
          </h2>
          <p className="booking-modal__subtitle">
            Fill in your details and we'll take you to schedule your call with Abhi
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="booking-modal__form" noValidate>

          {/* Name */}
          <div className="booking-modal__field">
            <label className="booking-modal__label" htmlFor="bm-name">
              Full Name *
            </label>
            <input
              id="bm-name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className={`booking-modal__input ${errors.name ? 'booking-modal__input--error' : ''}`}
              autoComplete="name"
            />
            {errors.name && (
              <span className="booking-modal__error">{errors.name}</span>
            )}
          </div>

          {/* Email */}
          <div className="booking-modal__field">
            <label className="booking-modal__label" htmlFor="bm-email">
              Email Address *
            </label>
            <input
              id="bm-email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`booking-modal__input ${errors.email ? 'booking-modal__input--error' : ''}`}
              autoComplete="email"
            />
            {errors.email && (
              <span className="booking-modal__error">{errors.email}</span>
            )}
          </div>

          {/* Mobile */}
          <div className="booking-modal__field">
            <label className="booking-modal__label" htmlFor="bm-mobile">
              Mobile Number *
            </label>
            <div className="booking-modal__phone-wrap">
              <span className="booking-modal__phone-prefix">🇮🇳 +91</span>
              <input
                id="bm-mobile"
                name="mobile"
                type="tel"
                placeholder="10-digit mobile number"
                value={formData.mobile}
                onChange={handleChange}
                className={`booking-modal__input booking-modal__input--phone ${errors.mobile ? 'booking-modal__input--error' : ''}`}
                maxLength={10}
                autoComplete="tel"
              />
            </div>
            {errors.mobile && (
              <span className="booking-modal__error">{errors.mobile}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="booking-modal__submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="booking-modal__spinner" />
                Saving...
              </>
            ) : (
              'Proceed to Book Call →'
            )}
          </button>

          <p className="booking-modal__note">
            🔒 Your information is safe. No spam, ever.
          </p>

        </form>
      </div>
    </>
  );
};

/* ── Main Page ── */
const MothersProgram = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [heroRef, heroVisible] = useAnim({ threshold: 0.1 });
  const [videoRef, videoVisible] = useAnim({ threshold: 0.1 });
  const [problemRef, problemVisible] = useAnim({ threshold: 0.1 });
  const [hookRef, hookVisible] = useAnim({ threshold: 0.15 });
  const [pillarsRef, pillarsVisible] = useAnim({ threshold: 0.1 });
  const [whyRef, whyVisible] = useAnim({ threshold: 0.1 });
  const [stepsRef, stepsVisible] = useAnim({ threshold: 0.1 });
  const [transRef, transVisible] = useAnim({ threshold: 0.1 });
  const [coachRef, coachVisible] = useAnim({ threshold: 0.1 });
  const [faqRef, faqVisible] = useAnim({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useAnim({ threshold: 0.15 });

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const d = landingPageData;

  return (
    <div className="landing-page">

      {/* ── MINI NAVBAR ── */}
      <nav
        className="lp-navbar"
        style={{ top: '0px' }}
      >
        <div className="lp-navbar__inner">
          <Link to="/" className="lp-navbar__logo">
            {siteConfig.brand}
          </Link>
          <a href="#" onClick={openModal} className="lp-navbar__cta lp-pulse-btn">
            Book Free Call
          </a>
        </div>
      </nav>

      <main style={{ marginTop: '0px' }}>

        {/* ── SECTION 2 — HERO ── */}
        <section className="lp-hero">
          <h1
            ref={heroRef}
            className={`lp-hero__headline lp-anim-fade-up ${heroVisible ? 'lp-anim-visible' : ''}`}
          >
            Lose <span className="lp-highlight">8–12 Kg</span> In{' '}
            <span className="lp-highlight">90 Days</span> And Become A{' '}
            <span className="lp-highlight-italic">Confident, Strong Mother</span>{' '}
            Using My 1:1 Coaching System
          </h1>
          <p className={`lp-hero__subheadline lp-anim-fade-up lp-anim-delay-2 ${heroVisible ? 'lp-anim-visible' : ''}`}>
            {d.hero.subheadline}
          </p>

          {/* Video Placeholder */}
          <div
            ref={videoRef}
            className={`lp-video-wrapper lp-anim-scale ${videoVisible ? 'lp-anim-visible' : ''}`}
          >
            <div className="lp-video-placeholder">
              <div className="lp-video-play-btn">▶</div>
              <p>Watch How The Program Works</p>
            </div>
          </div>

          {/* Problem Awareness */}
          <div
            ref={problemRef}
            className={`lp-problem-block lp-anim-fade-up ${problemVisible ? 'lp-anim-visible' : ''}`}
          >
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
          <div className={`lp-hero__cta-wrap lp-anim-fade-up lp-anim-delay-3 ${heroVisible ? 'lp-anim-visible' : ''}`}>
            <a href="#" onClick={openModal} className="lp-cta-btn lp-pulse-btn">
              {d.hero.cta}
            </a>
            <p className="lp-cta-subtext">{d.hero.ctaSubtext}</p>
          </div>

          {/* Trust Badges */}
          <div className="lp-trust-badges">
            {d.hero.trustBadges.map((badge, i) => (
              <div key={i} className="lp-trust-badge">
                <CheckCircle2 size={15} color="var(--color-brand)" />
                {badge}
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3 — HOOK ── */}
        <section
          ref={hookRef}
          className={`lp-section lp-bg-white lp-anim-fade-up ${hookVisible ? 'lp-anim-visible' : ''}`}
        >
          <div className="lp-section__inner lp-text-center">
            <h2 className="lp-section-title" style={{ marginBottom: '1rem' }}>
              {d.hook.headline}
            </h2>
            <p className="lp-section-subtitle" style={{ marginBottom: '2rem' }}>
              {d.hook.subheadline}
            </p>
            <a href="#how" className="lp-cta-wide lp-pulse-btn">
              {d.hook.cta} ↓
            </a>
          </div>
        </section>

        {/* ── SECTION 4 — THREE PILLARS ── */}
        <section className="lp-section lp-bg-warm" id="how">
          <div className="lp-section__inner">
            <div ref={pillarsRef} className="lp-pillars-grid">
              {d.pillars.map((pillar, i) => (
                <div
                  key={i}
                  className={`lp-pillar-card lp-anim-fade-up lp-anim-delay-${i + 1} ${pillarsVisible ? 'lp-anim-visible' : ''}`}
                >
                  <div className="lp-pillar-card__image">
                    <div style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      background: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-brand)',
                      boxShadow: '0 4px 16px rgba(255,104,53,0.2)'
                    }}>
                      {pillarIcons[i]}
                    </div>
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
              <a href="#" onClick={openModal} className="lp-cta-wide lp-pulse-btn">
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
            <div ref={whyRef} className="lp-features-grid">
              {d.whyChoose.features.map((feature, i) => (
                <div
                  key={i}
                  className={`lp-feature-card lp-anim-scale lp-anim-delay-${i + 1} ${whyVisible ? 'lp-anim-visible' : ''}`}
                >
                  <div className="lp-feature-card__icon-wrap">
                    {whyIcons[i]}
                  </div>
                  <h3 className="lp-feature-card__title">{feature.title}</h3>
                  <p className="lp-feature-card__desc">{feature.desc}</p>
                </div>
              ))}
            </div>
            <div className="lp-cta-center">
              <a href="#" onClick={openModal} className="lp-cta-wide lp-pulse-btn">
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
            <div ref={stepsRef} className="lp-steps-grid">
              {d.howItWorks.steps.map((step, i) => (
                <div
                  key={i}
                  className={`lp-step lp-anim-fade-up lp-anim-delay-${i + 1} ${stepsVisible ? 'lp-anim-visible' : ''}`}
                >
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
              <a href="#" onClick={openModal} className="lp-cta-wide lp-pulse-btn">
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
            <div ref={transRef} className="lp-transformations-grid">
              {d.transformations.map((trans, i) => (
                <div
                  key={i}
                  className={`lp-transformation-card lp-anim-fade-up lp-anim-delay-${i + 1} ${transVisible ? 'lp-anim-visible' : ''}`}
                >

                  {/* Header */}
                  <div className="lp-transformation-card__header">
                    <div className="lp-transformation-card__name">
                      {trans.name}
                    </div>
                    {trans.subtitle && (
                      <p className="lp-transformation-card__subtitle">
                        {trans.subtitle}
                      </p>
                    )}
                    {trans.age && (
                      <div className="lp-transformation-card__meta">
                        Age {trans.age} · {trans.profession}
                      </div>
                    )}
                  </div>

                  {/* Weight Badge */}
                  {trans.beforeKg && trans.afterKg ? (
                    <div className="lp-weight-badge">
                      <span className="lp-weight-badge__before">
                        Before: {trans.beforeKg} Kg
                      </span>
                      <div className="lp-weight-badge__divider" />
                      <span className="lp-weight-badge__after">
                        After: {trans.afterKg} Kg
                      </span>
                    </div>
                  ) : (
                    <div className="lp-weight-badge">
                      <span className="lp-weight-badge__after">
                        🔥 Lost 20 Kg in 8 months
                      </span>
                    </div>
                  )}

                  {/* ── PHOTO — REAL IMAGE ── */}
                  <div className="lp-transformation-card__photo">
                    <img
                      src={trans.image}
                      alt={`${trans.name} transformation`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="lp-transformation-card__photo-fallback">
                      Before / After Photo Coming Soon
                    </div>
                  </div>

                  {/* Details */}
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
              <a href="#" onClick={openModal} className="lp-cta-wide lp-pulse-btn">
                APPLY FOR COACHING
              </a>
            </div>
          </div>
        </section>

        {/* ── SECTION 8 — MEET COACH ── */}
        <section className="lp-section lp-bg-white">
          <div className="lp-section__inner">
            <div ref={coachRef} className="lp-coach-grid">
              <div className={`lp-coach-image lp-anim-fade-left ${coachVisible ? 'lp-anim-visible' : ''}`}>
                <img
                  src="https://res.cloudinary.com/db9wu2abk/image/upload/q_auto/f_auto/v1776880707/SaveClip.App_619330430_18549305215034362_425692742014550702_n_ecjhs5.jpg"
                  alt="Coach Abhi"
                />
              </div>
              <div className={`lp-anim-fade-right ${coachVisible ? 'lp-anim-visible' : ''}`}>
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
                <a href="#" onClick={openModal} className="lp-cta-btn lp-pulse-btn"
                  style={{ maxWidth: '280px' }}>
                  BOOK CALL
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 9 — FAQ ── */}
        <section
          ref={faqRef}
          className={`lp-section lp-bg-sunken lp-anim-fade-up ${faqVisible ? 'lp-anim-visible' : ''}`}
        >
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
        <section
          ref={ctaRef}
          className={`lp-final-cta lp-anim-scale ${ctaVisible ? 'lp-anim-visible' : ''}`}
        >
          <div className="lp-final-cta__inner">
            <h2 className="lp-final-cta__title">{d.finalCta.headline}</h2>
            <p className="lp-final-cta__subtitle">{d.finalCta.subheadline}</p>
            <p className="lp-final-cta__price">{d.finalCta.price}</p>
            <div className="lp-final-cta__actions">
              <a href="#" onClick={openModal} className="lp-final-cta__btn lp-pulse-btn">
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

      <BookingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        calendlyLink={import.meta.env.VITE_CALENDLY_URL}
      />

      <FloatingWhatsApp />
    </div>
  );
};

export default MothersProgram;