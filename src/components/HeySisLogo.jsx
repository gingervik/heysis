import React from 'react';

export const HeySisLogo = ({ className = 'w-9 h-9', rounded = 'rounded-2xl' }) => (
  <img
    src="./icons/heysis-logo.svg"
    alt="HeySis"
    className={`${className} ${rounded} object-cover shadow-xs shrink-0 select-none`}
    draggable="false"
  />
);
