import React from 'react';
import { FileText } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import '../styles/FitmomProgram.css';

const driveFileId = '1RRB0r2pvmijVa4Mve_IQ9lO-xPYagC36';
const previewUrl = `https://drive.google.com/file/d/${driveFileId}/preview`;
const downloadUrl = `https://drive.google.com/uc?export=download&id=${driveFileId}`;

const FitmomProgram = () => (
  <div className="fitmom-page">
    <Navbar announcementHeight={0} />

    <main className="fitmom-page__main">
      <section className="fitmom-page__intro">
        <div className="container">
          <span className="fitmom-page__eyebrow"><FileText size={15} /> Program guide</span>
          <h1>FITMOM Program</h1>
          <p>Explore the complete program guide below.</p>
        </div>
      </section>

      <section className="fitmom-page__viewer-section" aria-label="FITMOM Program guide">
        <div className="fitmom-page__viewer-wrap">
          <iframe
            className="fitmom-page__viewer"
            src={previewUrl}
            title="FITMOM Program PDF"
            allow="autoplay"
          >
            <p>
              Your browser cannot display the program guide.{' '}
              <a href={downloadUrl}>Download the FITMOM Program PDF</a>.
            </p>
          </iframe>
        </div>
      </section>
    </main>

    <Footer />
    <FloatingWhatsApp />
  </div>
);

export default FitmomProgram;
