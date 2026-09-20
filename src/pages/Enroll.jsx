import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Shield, Sparkles, Clock, Calendar } from 'lucide-react';
import { programs, groupClassesData, siteConfig } from '../data/siteData';
import '../styles/Enroll.css';

const programOptions = [
  { id: '1-month', name: '1 Month Starter Coaching', price: '₹6,000', amount: 6000 },
  { id: '3-months', name: '3 Months Transformation (Most Popular)', price: '₹15,000', amount: 15000, popular: true },
  { id: '6-months', name: '6 Months Recomposition', price: '₹25,000', amount: 25000 },
  { id: '12-months', name: '12 Months Complete Transformation', price: '₹45,000', amount: 45000 },
  { id: 'group-classes', name: 'Online Group Classes (Monthly)', price: '₹5,000', amount: 5000 },
  { id: '1on1-training', name: 'Online 1-on-1 Live Training (12 Sessions)', price: '₹24,000', amount: 24000 },
];

const batchOptions = [
  'Morning (7:00 AM – 8:00 AM)',
  'Late Morning (8:30 AM – 9:30 AM)',
  'Evening (4:30 PM – 5:30 PM)',
  'Late Evening (6:00 PM – 7:00 PM)',
  'Flexible / 1-on-1 Personal Schedule',
];

const Enroll = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultProgId = searchParams.get('program') || '3-months';

  const [selectedProgram, setSelectedProgram] = useState(
    programOptions.find(p => p.id === defaultProgId) || programOptions[1]
  );

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    batch: batchOptions[0],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const prog = programOptions.find(p => p.id === searchParams.get('program'));
    if (prog) {
      setSelectedProgram(prog);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone Number is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) errs.phone = 'Enter a valid 10-digit mobile number';
    if (!form.email.trim()) errs.email = 'Email Address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Enter a valid email address';
    if (!form.city.trim()) errs.city = 'City is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      city: form.city.trim(),
      programName: selectedProgram.name,
      programId: selectedProgram.id,
      amount: selectedProgram.amount,
      price: selectedProgram.price,
      batch: form.batch,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('abhiEnrollData', JSON.stringify(payload));
    navigate('/payment');
  };

  return (
    <div className="enroll-page">
      <div className="enroll-container">
        
        {/* Top Back Link */}
        <div className="enroll-back">
          <Link to="/" className="enroll-back__link">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="enroll-header">
          <span className="section-eyebrow">STEP 1 OF 2</span>
          <h1 className="enroll-header__title">Student Registration</h1>
          <p className="enroll-header__sub">
            Fill in your details below to reserve your slot with Coach Abhi.
          </p>
        </div>

        {/* Form & Summary Layout */}
        <div className="enroll-grid">
          
          {/* Main Form */}
          <form className="enroll-card" onSubmit={handleSubmit} noValidate>
            <h2 className="enroll-card__title">Personal Details</h2>

            <div className="enroll-field">
              <label className="enroll-label">Full Name *</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Ananya Sharma"
                value={form.name}
                onChange={handleChange}
                className={`enroll-input ${errors.name ? 'enroll-input--error' : ''}`}
              />
              {errors.name && <span className="enroll-error">{errors.name}</span>}
            </div>

            <div className="enroll-grid-2">
              <div className="enroll-field">
                <label className="enroll-label">Phone Number (WhatsApp) *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={10}
                  className={`enroll-input ${errors.phone ? 'enroll-input--error' : ''}`}
                />
                {errors.phone && <span className="enroll-error">{errors.phone}</span>}
              </div>

              <div className="enroll-field">
                <label className="enroll-label">City *</label>
                <input
                  type="text"
                  name="city"
                  placeholder="e.g. Mumbai, Pune, Delhi"
                  value={form.city}
                  onChange={handleChange}
                  className={`enroll-input ${errors.city ? 'enroll-input--error' : ''}`}
                />
                {errors.city && <span className="enroll-error">{errors.city}</span>}
              </div>
            </div>

            <div className="enroll-field">
              <label className="enroll-label">Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="your.email@domain.com"
                value={form.email}
                onChange={handleChange}
                className={`enroll-input ${errors.email ? 'enroll-input--error' : ''}`}
              />
              {errors.email && <span className="enroll-error">{errors.email}</span>}
            </div>

            <hr className="enroll-divider" />

            <h2 className="enroll-card__title">Program & Batch Selection</h2>

            <div className="enroll-field">
              <label className="enroll-label">Select Program *</label>
              <div className="enroll-program-options">
                {programOptions.map(prog => (
                  <div
                    key={prog.id}
                    className={`enroll-program-card ${selectedProgram.id === prog.id ? 'enroll-program-card--selected' : ''}`}
                    onClick={() => setSelectedProgram(prog)}
                  >
                    {prog.popular && <span className="enroll-program-badge">Popular</span>}
                    <div className="enroll-program-card__info">
                      <span className="enroll-program-card__name">{prog.name}</span>
                      <span className="enroll-program-card__price">{prog.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="enroll-field">
              <label className="enroll-label">Preferred Batch / Time Slot *</label>
              <select
                name="batch"
                value={form.batch}
                onChange={handleChange}
                className="enroll-select"
              >
                {batchOptions.map((b, i) => (
                  <option key={i} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="enroll-submit-btn">
              Proceed to Payment <ArrowRight size={18} />
            </button>

            <p className="enroll-note">
              🔒 100% Secure registration. Next step: Payment details & UTR confirmation.
            </p>
          </form>

          {/* Right Summary Sidebar */}
          <div className="enroll-sidebar">
            <div className="enroll-summary-card">
              <h3 className="enroll-summary__title">Selected Order</h3>
              
              <div className="enroll-summary__row">
                <span>Program</span>
                <strong>{selectedProgram.name}</strong>
              </div>

              <div className="enroll-summary__row">
                <span>Total Amount</span>
                <strong className="enroll-summary__amount">{selectedProgram.price}</strong>
              </div>

              <ul className="enroll-summary__features">
                <li><CheckCircle2 size={15} color="#FF6835" /> Personal 1:1 guidance with Coach Abhi</li>
                <li><CheckCircle2 size={15} color="#FF6835" /> Custom Indian Diet & Home Workouts</li>
                <li><CheckCircle2 size={15} color="#FF6835" /> DR Healing & Core Restoration</li>
                <li><CheckCircle2 size={15} color="#FF6835" /> Daily WhatsApp Support</li>
              </ul>

              <div className="enroll-trust-badge">
                <Shield size={16} />
                <span>7-Day Money Back Guarantee</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Enroll;
