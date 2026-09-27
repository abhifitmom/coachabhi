import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Instagram, User } from 'lucide-react';
import { teamData } from '../data/siteData';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/Team.css';

const Team = () => {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.1 });
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div className="team-page">

      <div className="team-back">
        <Link to="/" className="team-back__link">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>

      <div
        ref={headerRef}
        className={`team-header anim-fade-up ${headerVisible ? 'anim-visible' : ''}`}
      >
        <span className="section-eyebrow">{teamData.eyebrow}</span>
        <h1 className="team-header__title">{teamData.title}</h1>
        <p className="team-header__sub">{teamData.subtitle}</p>
      </div>

      <div
        ref={gridRef}
        className="team-grid"
      >
        {teamData.members.map((member, i) => (
          <div
            key={member.id}
            className={`team-card anim-fade-up anim-delay-${i + 1} ${gridVisible ? 'anim-visible' : ''}`}
          >
            <div className="team-card__image-wrap">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-card__image"
                  loading="lazy"
                />
              ) : (
                <div className="team-card__image-placeholder">
                  <User size={48} color="var(--color-ink-muted)" />
                </div>
              )}
            </div>

            <div className="team-card__content">
              <div className="team-card__tag">{member.tag}</div>
              <h2 className="team-card__name">{member.name}</h2>
              <div className="team-card__role">{member.role}</div>
              <p className="team-card__bio">{member.bio}</p>

              {member.instagram && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-card__social"
                >
                  <Instagram size={16} />
                  Follow on Instagram
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Team;
