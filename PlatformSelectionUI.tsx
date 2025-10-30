import React from "react";

// List of all major social/live platforms
const ALL_PLATFORMS = [
  "YouTube",
  "Facebook",
  "Twitch",
  "Instagram",
  "LinkedIn",
  "Twitter (X)",
  "WeChat",
  "Kick",
  "Trovo",
  "DLive",
  "Vimeo",
  "TikTok",
  "Custom RTMP"
];

interface PlatformSelectionUIProps {
  selectedPlatforms: string[];
  setSelectedPlatforms: (platforms: string[]) => void;
}

const PlatformSelectionUI: React.FC<PlatformSelectionUIProps> = ({ selectedPlatforms, setSelectedPlatforms }) => {
  const handleChange = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <h3>Select Platforms:</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {ALL_PLATFORMS.map(platform => (
          <label key={platform} style={{ minWidth: 120 }}>
            <input
              type="checkbox"
              checked={selectedPlatforms.includes(platform)}
              onChange={() => handleChange(platform)}
            />
            {platform}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PlatformSelectionUI;
export { ALL_PLATFORMS };

// Register service worker when this module loads in the browser.
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      console.log('Service worker registered from PlatformSelectionUI:', reg.scope);
    }).catch((err) => {
      console.warn('Service worker registration failed:', err);
    });
  });
}
