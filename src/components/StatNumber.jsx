import React from 'react';
import useCountAnimation from '../hooks/useCountAnimation';
import { parseStatValue } from '../hooks/useStatAnimation';

const StatNumber = ({ value, className = '', duration = 2000 }) => {
  const { number, suffix, prefix } = parseStatValue(value);

  // If no number found — just show text as is
  if (number === null) {
    return <span className={className}>{value}</span>;
  }

  const isDecimal = !Number.isInteger(number);
  const [ref, count] = useCountAnimation(number, duration, 0);

  const displayCount = isDecimal
    ? count.toFixed(1)
    : count.toString();

  return (
    <span ref={ref} className={className}>
      {prefix}{displayCount}{suffix}
    </span>
  );
};

export default StatNumber;
