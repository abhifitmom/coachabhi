// ============================================================
// FORM SUBMIT HOOK — Sends data to Google Sheets
// URL loaded from environment variable
// ============================================================

import { useState } from 'react';

const SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

const useFormSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const submitForm = async (type, data) => {
    setIsSubmitting(true);
    setIsSuccess(false);
    setIsError(false);

    if (!SHEET_URL) {
      console.error('VITE_GOOGLE_SHEET_URL not set in .env');
      setIsError(true);
      setIsSubmitting(false);
      return false;
    }

    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',        // Google Apps Script requires no-cors
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({ type, ...data }),
      });

      // no-cors means we can't read response
      // but if no error thrown — assume success
      setIsSuccess(true);
      setIsSubmitting(false);
      return true;

    } catch (error) {
      console.error('Form submit error:', error);
      setIsError(true);
      setIsSubmitting(false);
      return false;
    }
  };

  const reset = () => {
    setIsSuccess(false);
    setIsError(false);
  };

  return {
    submitForm,
    isSubmitting,
    isSuccess,
    isError,
    reset
  };
};

export default useFormSubmit;
