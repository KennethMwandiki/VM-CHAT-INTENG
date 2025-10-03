import React, { useState } from "react";
import startBroadcast from "./startBroadcast";
import PlatformSelectionUI, { ALL_PLATFORMS } from "./PlatformSelectionUI";

const StreamingComponent = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([...ALL_PLATFORMS]);

  return (
    <div>
      <PlatformSelectionUI
        selectedPlatforms={selectedPlatforms}
        setSelectedPlatforms={setSelectedPlatforms}
      />
      <button
        onClick={() => startBroadcast("GlobalEventChannel", "STREAM_TOKEN", selectedPlatforms)}
        style={{
          backgroundColor: "#FF7A00",
          padding: "10px 20px",
          color: "white",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
        disabled={selectedPlatforms.length === 0}
      >
        Start Multi-Platform Broadcast
      </button>
    </div>
  );
};

export default StreamingComponent;
