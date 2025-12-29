'use client';

import { useState } from 'react';

export default function SafeImage({ src, alt, className, loading = 'lazy' }) {
  const [hidden, setHidden] = useState(false);

  if (!src || hidden) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setHidden(true)}
    />
  );
}


