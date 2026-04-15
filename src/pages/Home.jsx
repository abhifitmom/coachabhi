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

const Home = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const announcementHeight = showAnnouncement ? 40 : 0;

  return (
    <div className="home-page">
      <AnnouncementBar 
        isVisible={showAnnouncement} 
        onDismiss={() => setShowAnnouncement(false)} 
      />
      <Navbar announcementHeight={announcementHeight} />
      <main style={{ marginTop: `${announcementHeight + 68}px` }}>
        <Hero />
        <MemberFaces />
        <Programs />
        <Specialisations />
        <Testimonials />
        <HowItWorks />
        <Founder />
        <Community />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Home;
