import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import PlatformSelectionUI from '../PlatformSelectionUI';

const App: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div>
      <PlatformSelectionUI selectedPlatforms={selected} setSelectedPlatforms={setSelected} />
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App />);
}

// Centralized service worker registration
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      console.log('Service worker registered from central entry:', reg.scope);
    }).catch((err) => {
      console.warn('Service worker registration failed:', err);
    });
  });
}
