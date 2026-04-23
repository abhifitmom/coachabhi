import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { programs, siteConfig } from '../data/siteData';
import useFormSubmit from '../hooks/useFormSubmit';
import '../styles/EnrolModal.css';

const EnrolModal = ({ isOpen, onClose, defaultProgramId = 2 }) => {
  const [selectedProgram, setSelectedProgram] = useState(defaultProgramId);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
  });

  const { submitForm, isSubmitting, isSuccess } = useFormSubmit();

  // Update selected program when defaultProgramId changes
  useEffect(() => {
    setSelectedProgram(defaultProgramId);
  }, [defaultProgramId]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentProgram = programs.find(p => p.id === selectedProgram) || programs[1];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, '')))
      errs.phone = 'Enter valid 10-digit number';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = 'Enter valid email';
    if (!formData.city.trim()) errs.city = 'City is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    await submitForm('program', {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      program: currentProgram.duration,
      price: currentProgram.price,
      source: 'Main Website - Enrol Form'
    });

    // Reset form
    setFormData({ name: '', phone: '', email: '', city: '' });

    // Close modal after 2 seconds
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <>
      <div className="enrol-modal__overlay" onClick={onClose} />
      <div className="enrol-modal" role="dialog" aria-modal="true">
        <div className="enrol-modal__body">

          {/* ── LEFT SIDE ── */}
          <div className="enrol-modal__left">
            <div>
              <h2 className="enrol-modal__left-title">
                Start Your Transformation
              </h2>
              <p className="enrol-modal__left-subtitle">
                Choose your program and fill in your details. We'll get in touch to confirm your spot.
              </p>
            </div>

            {/* Program Selector */}
            <div className="enrol-modal__programs">
              {programs.map((program) => (
                <button
                  key={program.id}
                  className={`enrol-modal__program-tab ${selectedProgram === program.id ? 'enrol-modal__program-tab--active' : ''}`}
                  onClick={() => setSelectedProgram(program.id)}
                  type="button"
                >
                  <div className="enrol-modal__program-tab-left">
                    <span className="enrol-modal__program-name">
                      {program.duration}
                    </span>
                    <span className="enrol-modal__program-duration">
                      {program.tag}
                    </span>
                  </div>
                  <span className="enrol-modal__program-price">
                    {program.price}
                  </span>
                </button>
              ))}
            </div>

            {/* Features of selected program */}
            <div className="enrol-modal__features">
              {currentProgram.features?.slice(0, 4).map((f, i) => (
                <div key={i} className="enrol-modal__feature">
                  <Check size={14} className="enrol-modal__feature-check" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT SIDE ── */}
          <div className="enrol-modal__right">

            {/* Close button */}
            <button
              className="enrol-modal__close"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <h3 className="enrol-modal__form-title">Enrollment Form</h3>
            <p className="enrol-modal__form-subtitle">All fields are required</p>

            <form className="enrol-modal__form" onSubmit={handleSubmit} noValidate>

              {/* Full Name */}
              <div className="enrol-modal__field">
                <label className="enrol-modal__label">Full Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`enrol-modal__input ${errors.name ? 'enrol-modal__input--error' : ''}`}
                  autoComplete="name"
                />
                {errors.name && <span className="enrol-modal__error">{errors.name}</span>}
              </div>

              {/* Phone */}
              <div className="enrol-modal__field">
                <label className="enrol-modal__label">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  className={`enrol-modal__input ${errors.phone ? 'enrol-modal__input--error' : ''}`}
                  autoComplete="tel"
                />
                {errors.phone && <span className="enrol-modal__error">{errors.phone}</span>}
              </div>

              {/* Email */}
              <div className="enrol-modal__field">
                <label className="enrol-modal__label">Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`enrol-modal__input ${errors.email ? 'enrol-modal__input--error' : ''}`}
                  autoComplete="email"
                />
                {errors.email && <span className="enrol-modal__error">{errors.email}</span>}
              </div>

              {/* City */}
              <div className="enrol-modal__field">
                <label className="enrol-modal__label">City</label>
                <input
                  name="city"
                  type="text"
                  placeholder="Your city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`enrol-modal__input ${errors.city ? 'enrol-modal__input--error' : ''}`}
                />
                {errors.city && <span className="enrol-modal__error">{errors.city}</span>}
              </div>

              {/* Program Selected — read only, shows current */}
              <div className="enrol-modal__field">
                <label className="enrol-modal__label">Program Selected</label>
                <div className="enrol-modal__select-wrap">
                  <select
                    className="enrol-modal__select"
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(Number(e.target.value))}
                  >
                    {programs.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.duration} — {p.price}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="enrol-modal__submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="enrol-modal__spinner" />
                    Saving your details...
                  </>
                ) : isSuccess ? (
                  <>✅ Submitted! We'll contact you soon.</>
                ) : (
                  <>
                    Proceed to Enrol
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              {/* Security note */}
              <div className="enrol-modal__security">
                <ShieldCheck size={14} color="var(--color-brand)" />
                Secure · EMI available · 7-day refund guarantee
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnrolModal;
