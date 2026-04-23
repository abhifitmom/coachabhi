import React, { useState } from 'react';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MemberFaces from '../components/MemberFaces';
import Programs from '../components/Programs';
import Specialisations from '../components/Specialisations';
import Testimonials from '../components/Testimonials';
import HowItWorks from '../components/HowItWorks';
import Founder from '../components/Founder';
import Community from '../components/Community';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import EnrolModal from '../components/EnrolModal';

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
        <MemberFaces />
        <Programs onEnrol={openEnrol} />
        <Specialisations />
        <Testimonials />
        <HowItWorks />
        <Founder />
        <Community />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />

      <EnrolModal
        isOpen={isEnrolOpen}
        onClose={() => setIsEnrolOpen(false)}
        defaultProgramId={defaultProgram}
      />
    </div>
  );
};

export default Home;
