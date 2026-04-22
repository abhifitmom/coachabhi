import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

/* ── Data — hardcoded here, not in siteData.js ── */
const testimonialImages = [
  { id: 1, url: "https://res.cloudinary.com/db9wu2abk/image/upload/q_auto/f_auto/v1776877649/4_uech5w.jpg", alt: "Client Result 1" },
  { id: 2, url: "https://res.cloudinary.com/db9wu2abk/image/upload/q_auto/f_auto/v1776877647/11_bhqnyi.jpg", alt: "Client Result 2" },
  { id: 3, url: "https://res.cloudinary.com/db9wu2abk/image/upload/q_auto/f_auto/v1776877647/7_v1aezv.jpg", alt: "Client Result 3" },
  { id: 4, url: "https://res.cloudinary.com/db9wu2abk/image/upload/q_auto/f_auto/v1776877647/10_usgejz.jpg", alt: "Client Result 4" },
  { id: 5, url: "https://res.cloudinary.com/db9wu2abk/image/upload/q_auto/f_auto/v1776877647/5_dzp6x1.jpg", alt: "Client Result 5" },
  { id: 6, url: "https://res.cloudinary.com/db9wu2abk/image/upload/q_auto/f_auto/v1776877646/8_g7mxrn.jpg", alt: "Client Result 6" },
  { id: 7, url: "https://res.cloudinary.com/db9wu2abk/image/upload/q_auto/f_auto/v1776877646/6_mtov14.jpg", alt: "Client Result 7" },
  { id: 8, url: "https://res.cloudinary.com/db9wu2abk/image/upload/q_auto/f_auto/v1776877645/3_biqudb.jpg", alt: "Client Result 8" },
  { id: 9, url: "https://res.cloudinary.com/db9wu2abk/image/upload/q_auto/f_auto/v1776877645/2_e2hdhv.jpg", alt: "Client Result 9" },
  { id: 10, url: "https://res.cloudinary.com/db9wu2abk/image/upload/q_auto/f_auto/v1776877645/1_ocxsak.jpg", alt: "Client Result 10" },
];

const testimonialVideos = [
  {
    id: 1,
    title: "Client Testimonial",
    videoUrl: "https://res.cloudinary.com/db9wu2abk/video/upload/q_auto/f_auto/v1776880235/SaveClip.App_AQPdoKsnFU9bQ21EEM9CjlmL3g-1NmoUDIOB1OcRyWhQjsDmZV4AnZhTur-qRCuDesdio5REERSKjUTp1WY7idW-_cyasgm.mp4"
  },
  {
    id: 2,
    title: "Client Testimonial",
    videoUrl: "https://res.cloudinary.com/db9wu2abk/video/upload/q_auto/f_auto/v1776880292/SaveClip.App_AQN_ghmhtUGRA8PRBbaQ8No0k7Xit-mJ6jpHxFE1qab_tC74Jb6PaQMh0XVwPcaBsdrfD_AWKtV8G_hSLdc7HKYE_h1gskz.mp4"
  },
  {
    id: 3,
    title: "Client Testimonial",
    videoUrl: "https://res.cloudinary.com/db9wu2abk/video/upload/q_auto/f_auto/v1776880252/SaveClip.App_AQNrNfdseFa2M_22ViOeyWZqkd0AO7eby6z6tBI0f2Deq0aewFuToFKwNroxYldIp6TU_QV1f0BbUq4WnbKR6HXnQxtWY7fcwXZG0gY_pe4nb4.mp4"
  },
  {
    id: 4,
    title: "Client Testimonial",
    videoUrl: "https://res.cloudinary.com/db9wu2abk/video/upload/q_auto/f_auto/v1776880253/SaveClip.App_AQPIvWV2JBoK1KtRG9z6z1-Mys_orkl8xCVwvOaYxoNKrayRZsHIH6oFX4x5JHbvElTMP7vE1QPTO0J84fmJYzyq_gyy1za.mp4"
  },
  {
    id: 5,
    title: "Client Testimonial",
    videoUrl: "https://res.cloudinary.com/db9wu2abk/video/upload/q_auto/f_auto/v1776880252/SaveClip.App_AQOySzByWsARja6PkmhAPolkzNtXCa4T_Eq0J97YufecnAeE_Zn24YJwWNXIlhB1moNU-1oiyaT62pGxuGN-bKG3_yxtut8.mp4"
  },
];

/* ── Main Component ── */
const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  /* ADD these for video carousel */
  const [videoIndex, setVideoIndex] = useState(0);
  const videoTrackRef = useRef(null);

  /* Scroll carousel by one card */
  const scrollTo = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstChild?.offsetWidth + 16 || 300;
    const next = dir === 'next'
      ? Math.min(activeIndex + 1, testimonialImages.length - 1)
      : Math.max(activeIndex - 1, 0);
    setActiveIndex(next);
    track.scrollTo({ left: next * cardWidth, behavior: 'smooth' });
  };

  /* Sync dot indicator on manual swipe */
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstChild?.offsetWidth + 16 || 300;
    const idx = Math.round(track.scrollLeft / cardWidth);
    setActiveIndex(idx);
  };

  /* ADD these for video carousel scroll */
  const scrollVideo = (dir) => {
    const track = videoTrackRef.current;
    if (!track) return;
    const cardWidth = track.firstChild?.offsetWidth + 16 || 300;
    const next = dir === 'next'
      ? Math.min(videoIndex + 1, testimonialVideos.length - 1)
      : Math.max(videoIndex - 1, 0);
    setVideoIndex(next);
    track.scrollTo({ left: next * cardWidth, behavior: 'smooth' });
  };

  const handleVideoScroll = () => {
    const track = videoTrackRef.current;
    if (!track) return;
    const cardWidth = track.firstChild?.offsetWidth + 16 || 300;
    const idx = Math.round(track.scrollLeft / cardWidth);
    setVideoIndex(idx);
  };

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < testimonialImages.length - 1;

  return (
    <section className="testi-section" id="results">
      <div className="container">

        {/* ── Header ── */}
        <div className="testi-header">
          <span className="section-eyebrow">Real Stories</span>
          <h2 className="section-title">Stories That Inspire</h2>
          <p className="testi-header__sub">
            Real results from real women — photos and videos straight from our clients.
          </p>
        </div>

        {/* ── Carousel Wrapper ── */}
        <div className="testi-carousel-wrap">

          {/* Left Arrow — desktop only */}
          <button
            className={`testi-arrow testi-arrow--left ${!canPrev ? 'testi-arrow--disabled' : ''}`}
            onClick={() => scrollTo('prev')}
            aria-label="Previous"
            disabled={!canPrev}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Track */}
          <div
            className="testi-track"
            ref={trackRef}
            onScroll={handleScroll}
          >
            {testimonialImages.map((img) => (
              <div key={img.id} className="testi-card testi-card--image">
                <img
                  src={img.url}
                  alt={img.alt}
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Right Arrow — desktop only */}
          <button
            className={`testi-arrow testi-arrow--right ${!canNext ? 'testi-arrow--disabled' : ''}`}
            onClick={() => scrollTo('next')}
            aria-label="Next"
            disabled={!canNext}
          >
            <ChevronRight size={22} />
          </button>

        </div>

        {/* ── Dot Indicators ── */}
        <div className="testi-dots">
          {testimonialImages.map((_, i) => (
            <button
              key={i}
              className={`testi-dot ${i === activeIndex ? 'testi-dot--active' : ''}`}
              onClick={() => {
                setActiveIndex(i);
                const track = trackRef.current;
                if (!track) return;
                const cardWidth = track.firstChild?.offsetWidth + 16 || 300;
                track.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <p className="testi-counter">
          {activeIndex + 1} / {testimonialImages.length}
        </p>

        {/* ── VIDEO TESTIMONIALS — Same as image carousel ── */}
        <div className="testi-videos-wrap">

          <div className="testi-header" style={{ marginTop: '4rem', marginBottom: '2rem' }}>
            <h3 className="testi-videos-heading">Video Testimonials</h3>
          </div>

          {/* Carousel Wrapper — same as image carousel */}
          <div className="testi-carousel-wrap">

            {/* Left Arrow */}
            <button
              className={`testi-arrow testi-arrow--left ${videoIndex === 0 ? 'testi-arrow--disabled' : ''}`}
              onClick={() => scrollVideo('prev')}
              aria-label="Previous"
              disabled={videoIndex === 0}
            >
              <ChevronLeft size={22} />
            </button>

            {/* Video Track */}
            <div
              className="testi-track"
              ref={videoTrackRef}
              onScroll={handleVideoScroll}
            >
              {testimonialVideos.map((vid) => (
                <div key={vid.id} className="testi-card testi-card--video-player">
                  <video
                    src={vid.videoUrl}
                    controls
                    preload="metadata"
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  >
                    Your browser does not support video.
                  </video>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              className={`testi-arrow testi-arrow--right ${videoIndex >= testimonialVideos.length - 1 ? 'testi-arrow--disabled' : ''}`}
              onClick={() => scrollVideo('next')}
              aria-label="Next"
              disabled={videoIndex >= testimonialVideos.length - 1}
            >
              <ChevronRight size={22} />
            </button>

          </div>

          {/* Video Dots */}
          <div className="testi-dots">
            {testimonialVideos.map((_, i) => (
              <button
                key={i}
                className={`testi-dot ${i === videoIndex ? 'testi-dot--active' : ''}`}
                onClick={() => {
                  setVideoIndex(i);
                  const track = videoTrackRef.current;
                  if (!track) return;
                  const cardWidth = track.firstChild?.offsetWidth + 16 || 300;
                  track.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
                }}
                aria-label={`Video ${i + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <p className="testi-counter">
            {videoIndex + 1} / {testimonialVideos.length}
          </p>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;