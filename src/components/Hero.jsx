import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, MessageCircle, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { heroData, siteConfig } from '../data/siteData';
import StatNumber from './StatNumber';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/Hero.css';

const Hero = ({ onEnrol }) => {
  const [ref, visible] = useScrollAnimation({ threshold: 0.1 });
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Autoplay on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => setIsPlaying(false));
  }, []);

  // Progress update
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const pct = (video.currentTime / video.duration) * 100;
    setProgress(isNaN(pct) ? 0 : pct);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    video.currentTime = pct * video.duration;
    setProgress(pct * 100);
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero__container">
        {/* LEFT CONTENT */}
        <div
          ref={ref}
          className={`hero__content anim-fade-up ${visible ? 'anim-visible' : ''}`}
        >
          <p className="hero__eyebrow">{heroData.eyebrow}</p>
          <h1 className="hero__headline">
            Get Strong.<br />
            <span className="hero__headline--italic">Feel Like You Again.</span>
          </h1>

          {/* VIDEO — mobile only — shows after headline */}
          <div className="hero__video-mobile">
            <div className="hero__video-wrapper">
              <video
                ref={videoRef}
                src={heroData.video}
                loop
                playsInline
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                onLoadedData={() => setIsLoaded(true)}
                className="hero__video"
              />
              {/* Controls */}
              <div className="hero__video-controls">
                <button className="hero__video-btn" onClick={togglePlay} aria-label="Play/Pause">
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                {/* Progress bar */}
                <div
                  className="hero__video-progress"
                  onClick={handleSeek}
                  role="slider"
                  aria-label="Video progress"
                >
                  <div
                    className="hero__video-progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <button className="hero__video-btn" onClick={toggleMute} aria-label="Mute/Unmute">
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>
            </div>
          </div>

          <p className="hero__subheadline">{heroData.subheadline}</p>

          <div className="hero__badge">
            <span className="pulse-dot"></span>
            <span>{heroData.badge}</span>
          </div>

          <div className="hero__cta-group">
            <button onClick={onEnrol} className="btn btn-primary">
              {heroData.ctaPrimary} <ArrowRight size={18} />
            </button>
            <a
              href={siteConfig.whatsapp}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} /> {heroData.ctaSecondary}
            </a>
          </div>

          {/* Stats */}
          <div className="hero__stats">
            {heroData.stats.map((stat, i) => (
              <div key={i} className="hero__stat">
                <StatNumber
                  value={stat.value}
                  className="number-display"
                  duration={2000}
                />
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — VIDEO desktop only */}
        <div className="hero__video-desktop">
          <div className="hero__video-wrapper">
            <video
              ref={videoRef}
              src={heroData.video}
              loop
              playsInline
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onLoadedData={() => setIsLoaded(true)}
              className="hero__video"
            />
            {/* Controls overlay */}
            <div className="hero__video-controls">
              <button className="hero__video-btn" onClick={togglePlay} aria-label="Play/Pause">
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <div
                className="hero__video-progress"
                onClick={handleSeek}
                role="slider"
                aria-label="Video progress"
              >
                <div
                  className="hero__video-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <button className="hero__video-btn" onClick={toggleMute} aria-label="Mute/Unmute">
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
