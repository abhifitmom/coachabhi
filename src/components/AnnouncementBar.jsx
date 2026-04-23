import React from 'react';
import { X } from 'lucide-react';
import { siteConfig } from '../data/siteData';
import '../styles/AnnouncementBar.css';

const AnnouncementBar = ({ isVisible, onDismiss }) => {
  if (!isVisible) return null;

  return (
    <div className="announcement-bar">
      <span className="announcement-bar__content">
        {siteConfig.announcementBar}{' '}
        <a href={siteConfig.enrollLink}>Book Now →</a>
      </span>

      <button
        onClick={onDismiss}
        className="announcement-bar__close"
        aria-label="Dismiss announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default AnnouncementBar;