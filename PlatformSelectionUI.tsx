import React from "react";
import './Branding CSS Styling.css';

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
    <div className="platform-selection">
      <h3>Select Platforms:</h3>
      <div className="platform-grid">
        {ALL_PLATFORMS.map(platform => (
          <label key={platform} className="platform-item">
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

