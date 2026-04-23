import React from 'react';
import { Users, BookOpen, Calendar, Heart } from 'lucide-react';
import { communityData } from '../data/siteData';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/Community.css';

const icons = [
  <Calendar size={24} />,
  <BookOpen size={24} />,
  <Users size={24} />,
  <Heart size={24} />,
];

const Community = () => {
  const [headerRef, headerVisible] = useScrollAnimation();
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="comm-section" id="community">
      <div className="container">

        {/* Header */}
        <div ref={headerRef} className={`comm-header anim-fade-up ${headerVisible ? 'anim-visible' : ''}`}>
          <span className="section-eyebrow">{communityData.eyebrow}</span>
          <h2 className="section-title">{communityData.title}</h2>
          <p className="comm-desc">{communityData.desc}</p>
        </div>

        {/* Cards Grid */}
        <div ref={gridRef} className="comm-grid">
          {communityData.features.map((feature, i) => (
            <div key={i} className={`comm-card anim-scale anim-delay-${i + 1} ${gridVisible ? 'anim-visible' : ''}`}>
              {/* Icon */}
              <div className="comm-card__icon">
                {icons[i]}
              </div>
              {/* Title */}
              <h3 className="comm-card__title">{feature.title}</h3>
              {/* Desc */}
              <p className="comm-card__desc">{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Community;