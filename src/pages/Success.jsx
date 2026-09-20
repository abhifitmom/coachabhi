import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, Home, Calendar, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import '../styles/Success.css';

const Success = () => {
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    const rawData = localStorage.getItem('abhiSuccessData');
    if (rawData) {
      try {
        setSuccessData(JSON.parse(rawData));
      } catch (e) {
        console.error('Failed to parse success data', e);
      }
    }
  }, []);

  const handleReopenWhatsapp = () => {
    if (successData?.whatsappUrl) {
      window.open(successData.whatsappUrl, '_blank');
    }
  };

  return (
    <div className="success-page">
      <div className="success-container">

        {/* Checkmark Header */}
        <div className="success-icon-wrap">
          <CheckCircle2 size={64} className="success-icon" />
        </div>

        <h1 className="success-title">Enrollment Submitted!</h1>
        <p className="success-sub">
          Thank you for registering with Coach Abhi. Your payment reference has been recorded.
        </p>

        {successData && (
          <div className="success-card">
            <h2 className="success-card__title">Enrollment Receipt Summary</h2>

            <div className="success-grid">

              <div className="success-col">
                <span className="success-label">Student Name</span>
                <strong className="success-val">{successData.name}</strong>
              </div>

              <div className="success-col">
                <span className="success-label">Phone Number</span>
                <strong className="success-val">{successData.phone}</strong>
              </div>

              <div className="success-col">
                <span className="success-label">Program Enrolled</span>
                <strong className="success-val">{successData.programName}</strong>
              </div>

              <div className="success-col">
                <span className="success-label">Batch Slot</span>
                <strong className="success-val">{successData.batch}</strong>
              </div>

              <div className="success-col">
                <span className="success-label">Amount Paid</span>
                <strong className="success-val success-val--price">₹{successData.amount?.toLocaleString('en-IN')}</strong>
              </div>

              <div className="success-col">
                <span className="success-label">Transaction ID (UTR)</span>
                <strong className="success-val success-val--utr">{successData.transactionId}</strong>
              </div>

              <div className="success-col">
                <span className="success-label">Date & Time</span>
                <strong className="success-val">{successData.dateString} at {successData.timeString}</strong>
              </div>

            </div>

            <div className="success-instruction">
              <ShieldCheck size={18} color="#FF6835" />
              <span>
                Please send your payment screenshot on WhatsApp so Coach Abhi can confirm your batch slot & share your custom diet plan.
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="success-actions">
          {successData?.whatsappUrl && (
            <button
              onClick={handleReopenWhatsapp}
              className="success-btn-whatsapp"
            >
              <MessageCircle size={18} /> Open WhatsApp Chat Again
            </button>
          )}

          <Link to="/" className="success-btn-home">
            <Home size={18} /> Return to Homepage
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Success;
