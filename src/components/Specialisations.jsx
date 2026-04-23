import React, { useState } from 'react';
import {
  Droplets, Heart, Dumbbell, Baby,
  Scale, Flower2, UtensilsCrossed, SmilePlus,
  Vegan, Bone, Flame, Activity,
  Zap, HeartHandshake, Brain
} from 'lucide-react';
import { specialisations } from '../data/siteData';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/Specialisations.css';

const specIcons = [
  <Droplets size={22} />,           // Diastasis Recti
  <Heart size={22} />,              // Mommy Pooch
  <Dumbbell size={22} />,           // Strength Training
  <Baby size={22} />,               // Post-Pregnancy
  <Scale size={22} />,              // Fat Loss
  <Flower2 size={22} />,            // Pre-Pregnancy
  <UtensilsCrossed size={22} />,    // Indian Nutrition
  <SmilePlus size={22} />,          // Confidence
  <Vegan size={22} />,              // Varicose Veins
  <Bone size={22} />,               // Musculoskeletal
  <Flame size={22} />,              // Gut Health
  <Activity size={22} />,           // Hormonal
  <Zap size={22} />,                // Autoimmune
  <HeartHandshake size={22} />,     // Geriatric
  <Brain size={22} />,              // Stress & Sleep
];

const Specialisations = () => {
  const [showAll, setShowAll] = useState(false);
  const [headerRef, headerVisible] = useScrollAnimation();
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1 });

  // Mobile pe 4, desktop pe 8 default dikhao
  const getDefaultCount = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return 4;
    }
    return 8;
  };

  const visibleItems = showAll
    ? specialisations
    : specialisations.slice(0, getDefaultCount());

  return (
    <section className="specialisations-section" id="specialisations">
      <div className="container">
        <div ref={headerRef} className={`text-center section-header anim-fade-up ${headerVisible ? 'anim-visible' : ''}`}>
          <span className="section-eyebrow">Specialised Care</span>
          <h2 className="section-title">Specialised Coaching for 15+ Areas</h2>
          <p className="body-md" style={{ color: 'var(--color-ink-secondary)', marginTop: '1rem' }}>
            Every program is personalised to your body, your history, and your goals.
          </p>
        </div>

        <div ref={gridRef} className="specialisations-grid">
          {visibleItems.map((spec, i) => (
            <div key={i} className={`spec-card anim-fade-up anim-delay-${Math.min(i + 1, 6)} ${gridVisible ? 'anim-visible' : ''}`}>
              <div className="spec-card__icon">
                {specIcons[i]}
              </div>
              <h3 className="spec-card__title">{spec.title}</h3>
              <p className="spec-card__desc">{spec.desc}</p>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        <div className="spec-toggle">
          <button
            className="spec-toggle__btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll
              ? 'Show Less ↑'
              : `See All ${specialisations.length} Specialisations ↓`
            }
          </button>
        </div>
      </div>
    </section>
  );
};

export default Specialisations;
