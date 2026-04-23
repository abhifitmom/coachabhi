import useCountAnimation from './useCountAnimation';

// Parse stat value — extract number and suffix
export const parseStatValue = (value) => {
  if (!value) return { number: null, suffix: value, prefix: '' };

  // "1000+" → { number: 1000, suffix: '+', prefix: '' }
  // "4.9★" → { number: 4.9, suffix: '★', prefix: '' }
  // "Since 2016" → { number: 2016, suffix: '', prefix: 'Since ' }
  // "90 Days" → { number: 90, suffix: ' Days', prefix: '' }

  const sinceMatch = value.match(/^Since (\d+)$/);
  if (sinceMatch) {
    return { number: parseInt(sinceMatch[1]), suffix: '', prefix: 'Since ' };
  }

  const numberMatch = value.match(/^([\d.]+)(.*)$/);
  if (numberMatch) {
    return {
      number: parseFloat(numberMatch[1]),
      suffix: numberMatch[2] || '',
      prefix: ''
    };
  }

  return { number: null, suffix: value, prefix: '' };
};

export default useCountAnimation;
