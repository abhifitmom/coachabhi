import React, { useState, Suspense, lazy } from 'react';

// Eagerly loaded components (above fold)
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import EnrolModal from '../components/EnrolModal';

// Lazy loaded components (below fold)
const MemberFaces      = lazy(() => import('../components/MemberFaces'));
const Programs         = lazy(() => import('../components/Programs'));
const Specialisations  = lazy(() => import('../components/Specialisations'));
const Testimonials     = lazy(() => import('../components/Testimonials'));
const HowItWorks       = lazy(() => import('../components/HowItWorks'));
const Founder          = lazy(() => import('../components/Founder'));
const Community        = lazy(() => import('../components/Community'));
const FinalCTA         = lazy(() => import('../components/FinalCTA'));
const Footer           = lazy(() => import('../components/Footer'));
const FloatingWhatsApp = lazy(() => import('../components/FloatingWhatsApp'));

const Home = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isEnrolOpen, setIsEnrolOpen] = useState(false);
  const [defaultProgram, setDefaultProgram] = useState(2);

  const announcementHeight = showAnnouncement ? 40 : 0;

  const openEnrol = (programId = 2) => {
    setDefaultProgram(programId);
    setIsEnrolOpen(true);
  };

  return (
    <div className="home-page">
      <AnnouncementBar 
        isVisible={showAnnouncement} 
        onDismiss={() => setShowAnnouncement(false)} 
        />
      <Navbar announcementHeight={announcementHeight} />
      
      <main style={{ marginTop: `${announcementHeight + 68}px` }}>
        <Hero onEnrol={() => openEnrol(2)} />
        
        <Suspense fallback={null}>
          <MemberFaces />
          <Programs onEnrol={openEnrol} />
          <Specialisations />
          <Testimonials />
          <HowItWorks />
          <Founder />
          <Community />
          <FinalCTA />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
        <FloatingWhatsApp />
      </Suspense>

      <EnrolModal
        isOpen={isEnrolOpen}
        onClose={() => setIsEnrolOpen(false)}
        defaultProgramId={defaultProgram}
      />
    </div>
  );
};

export default Home;
