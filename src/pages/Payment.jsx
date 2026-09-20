import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check, QrCode, Building, Smartphone, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { paymentConfig } from '../data/siteData';
import '../styles/Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const [enrollData, setEnrollData] = useState(null);
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  useEffect(() => {
    const rawData = localStorage.getItem('abhiEnrollData');
    if (rawData) {
      try {
        setEnrollData(JSON.parse(rawData));
      } catch (e) {
        console.error('Failed to parse enroll data', e);
      }
    }
  }, []);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(paymentConfig.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyBank = () => {
    const text = `Account Name: ${paymentConfig.bankDetails.accountName}\nAccount Number: ${paymentConfig.bankDetails.accountNumber}\nIFSC Code: ${paymentConfig.bankDetails.ifsc}\nBank: ${paymentConfig.bankDetails.bankName}\nBranch: ${paymentConfig.bankDetails.address}`;
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    const cleanedUtr = transactionId.trim();

    if (!cleanedUtr) {
      setError('Please enter your 12-16 digit Transaction ID (UTR)');
      return;
    }

    if (!/^[A-Za-z0-9]{12,22}$/.test(cleanedUtr)) {
      setError('Please enter a valid 12-16 digit Transaction ID (UTR)');
      return;
    }

    setError('');

    const now = new Date();
    const dateString = now.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', year: 'numeric' });
    const timeString = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true });

    const message = `*New Enrollment - Payment Confirmation*

*Student Details:*
Name: ${enrollData?.name || '—'}
Phone: ${enrollData?.phone || '—'}
Email: ${enrollData?.email || '—'}
City: ${enrollData?.city || '—'}

*Program Details:*
Program: ${enrollData?.programName || '—'}
Batch/Time: ${enrollData?.batch || '—'}
Amount Paid: INR ${enrollData?.amount || '—'}

*Payment Information:*
Transaction ID: ${cleanedUtr}
Date & Time: ${dateString} at ${timeString}

*Please attach your payment screenshot below*`;

    const whatsappUrl = `https://wa.me/${paymentConfig.phone}?text=${encodeURIComponent(message)}`;

    // Store success payload
    const successPayload = {
      ...enrollData,
      transactionId: cleanedUtr,
      dateString,
      timeString,
      whatsappUrl,
    };

    localStorage.setItem('abhiSuccessData', JSON.stringify(successPayload));

    // Open WhatsApp deep link in new window
    window.open(whatsappUrl, '_blank');

    // Redirect to success page
    navigate('/success');
  };

  if (!enrollData) {
    return (
      <div className="payment-page">
        <div className="payment-container payment-empty">
          <h2>No Enrollment Details Found</h2>
          <p>Please complete step 1 registration first before making payment.</p>
          <Link to="/enroll" className="payment-btn-primary">
            Go to Registration
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-container">

        {/* Back Link */}
        <div className="payment-back">
          <Link to="/enroll" className="payment-back__link">
            <ArrowLeft size={16} /> Back to Registration
          </Link>
        </div>

        {/* Header */}
        <div className="payment-header">
          <span className="section-eyebrow">STEP 2 OF 2</span>
          <h1 className="payment-header__title">Complete Payment</h1>
          <p className="payment-header__sub">
            Pay ₹{enrollData.amount.toLocaleString('en-IN')} via UPI, QR Code or Bank Transfer & submit UTR.
          </p>
        </div>

        {/* Summary Banner */}
        <div className="payment-summary-banner">
          <div className="payment-summary-col">
            <span className="payment-summary-label">Student Name</span>
            <strong className="payment-summary-val">{enrollData.name} ({enrollData.city})</strong>
          </div>
          <div className="payment-summary-col">
            <span className="payment-summary-label">Selected Program</span>
            <strong className="payment-summary-val">{enrollData.programName}</strong>
          </div>
          <div className="payment-summary-col">
            <span className="payment-summary-label">Batch Time</span>
            <strong className="payment-summary-val">{enrollData.batch}</strong>
          </div>
          <div className="payment-summary-col payment-summary-col--price">
            <span className="payment-summary-label">Amount Payable</span>
            <strong className="payment-summary-price">₹{enrollData.amount.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        {/* Main Grid */}
        <div className="payment-grid">

          {/* Left: Payment Options */}
          <div className="payment-options">

            {/* Option 1: Direct UPI / Copy UPI ID */}
            <div className="payment-card">
              <div className="payment-card__header">
                <Smartphone size={20} className="payment-card__icon" />
                <h3 className="payment-card__title">Option 1: UPI Transfer</h3>
              </div>
              <p className="payment-card__desc">
                Copy our UPI ID to transfer using Google Pay, PhonePe, Paytm, or BHIM.
              </p>

              <div className="payment-copy-box">
                <span className="payment-copy-box__text">{paymentConfig.upiId}</span>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className={`payment-copy-btn ${copiedUpi ? 'payment-copy-btn--copied' : ''}`}
                >
                  {copiedUpi ? <Check size={14} /> : <Copy size={14} />}
                  {copiedUpi ? 'Copied!' : 'Copy UPI ID'}
                </button>
              </div>
            </div>

            {/* Option 2: Scan QR Code */}
            <div className="payment-card">
              <div className="payment-card__header">
                <QrCode size={20} className="payment-card__icon" />
                <h3 className="payment-card__title">Option 2: Scan QR Code</h3>
              </div>
              <p className="payment-card__desc">
                Scan this QR code using any UPI app (GPay, PhonePe, Paytm, CRED).
              </p>

              <div className="payment-qr-wrap">
                <img
                  src={paymentConfig.qrCodeUrl}
                  alt="UPI Payment QR Code"
                  className="payment-qr-img"
                />
                <span className="payment-qr-tag">Scan with any UPI App</span>
              </div>
            </div>

            {/* Option 3: Bank Transfer */}
            <div className="payment-card">
              <div className="payment-card__header">
                <Building size={20} className="payment-card__icon" />
                <h3 className="payment-card__title">Option 3: Bank Transfer (IMPS / NEFT)</h3>
              </div>

              <div className="payment-bank-details">
                <div className="payment-bank-row">
                  <span>Account Name:</span>
                  <strong>{paymentConfig.bankDetails.accountName}</strong>
                </div>
                <div className="payment-bank-row">
                  <span>Account Number:</span>
                  <strong>{paymentConfig.bankDetails.accountNumber}</strong>
                </div>
                <div className="payment-bank-row">
                  <span>IFSC Code:</span>
                  <strong>{paymentConfig.bankDetails.ifsc}</strong>
                </div>
                <div className="payment-bank-row">
                  <span>Bank & Branch:</span>
                  <strong>{paymentConfig.bankDetails.bankName}, {paymentConfig.bankDetails.branch}</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyBank}
                className={`payment-copy-btn payment-copy-btn--full ${copiedBank ? 'payment-copy-btn--copied' : ''}`}
              >
                {copiedBank ? <Check size={14} /> : <Copy size={14} />}
                {copiedBank ? 'Bank Details Copied!' : 'Copy Bank Details'}
              </button>
            </div>

          </div>

          {/* Right: Submit UTR */}
          <div className="payment-sidebar">
            <form className="payment-utr-card" onSubmit={handleSubmitPayment} noValidate>
              <h3 className="payment-utr__title">Verify Payment</h3>
              <p className="payment-utr__sub">
                After paying ₹{enrollData.amount.toLocaleString('en-IN')}, enter your 12-16 digit Transaction Ref / UTR number below to confirm your enrollment.
              </p>

              <div className="payment-utr-field">
                <label className="payment-utr-label">Transaction ID / UTR Number *</label>
                <input
                  type="text"
                  placeholder="e.g. 426189012345"
                  value={transactionId}
                  onChange={(e) => {
                    setTransactionId(e.target.value);
                    if (error) setError('');
                  }}
                  className={`payment-utr-input ${error ? 'payment-utr-input--error' : ''}`}
                />
                {error && <span className="payment-utr-error">{error}</span>}
              </div>

              <button type="submit" className="payment-submit-btn">
                Confirm & Open WhatsApp <ArrowRight size={18} />
              </button>

              <div className="payment-utr-instructions">
                <ShieldCheck size={16} color="#FF6835" />
                <span>
                  Clicking confirm will automatically format your receipt and launch WhatsApp to send screenshot directly to Coach Abhi.
                </span>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Payment;
