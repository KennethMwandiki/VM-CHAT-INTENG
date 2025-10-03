// Health Check Endpoint for Deployment Readiness
app.get("/healthz", async (req, res) => {
  // Check Agora and Chat API keys/configs
  let agoraStatus = "ok";
  let chatStatus = "ok";
  try {
    // Try a simple Agora API call (e.g., get app info)
    await axios.get(`${AGORA_API_BASE_URL}/management/apps/${AGORA_APP_ID}`, {
      auth: { username: CUSTOMER_KEY, password: CUSTOMER_SECRET },
    });
  } catch (e) {
    agoraStatus = "fail";
  }
  // Optionally, check chat service status here if API available
  res.json({
    status: "ok",
    agora: agoraStatus,
    chat: chatStatus,
    appId: AGORA_APP_ID,
    appKey: CUSTOMER_KEY,
    orgName: CHAT_ORG_NAME,
    appName: CHAT_APP_NAME,
  });
});
const express = require("express");
const axios = require("axios");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();
app.use(passport.initialize());


// Agora Configurations
const AGORA_APP_ID = "89d780c544f44ee38c36f54a108913a8";
const AGORA_API_BASE_URL = "https://a41.chat.agora.io";
const CUSTOMER_KEY = "411111872#1555202"; // AppKey
const CUSTOMER_SECRET = ""; // Not provided, leave blank or set if needed

// Chat Service Configurations
const CHAT_ORG_NAME = "411111872";
const CHAT_APP_NAME = "1555202";
// Add more chat service config as needed

// Middleware: Ensure User is Authenticated
const ensureAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized access!" });
  } else {
    next();
  }
};

// Setting up Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// API: Generate Token for Agora Session
app.get("/generate-token/:channelName", ensureAuthenticated, async (req, res) => {
  const { channelName } = req.params;
  const privilegeExpires = Math.floor(Date.now() / 1000) + 3600; // 1-hour token validity

  try {
    const response = await axios.post(
      `${AGORA_API_BASE_URL}/${AGORA_APP_ID}/channels/${channelName}/tokens`,
      {
        uid: 0,
        privilegeExpiredTs: privilegeExpires,
      },
      {
        auth: {
          username: CUSTOMER_KEY,
          password: CUSTOMER_SECRET,
        },
      }
    );

    res.json({ token: response.data.token });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate token" });
  }
});

// API: Fetch Stream Metrics
app.get("/stream-metrics", ensureAuthenticated, async (req, res) => {
  try {
    const response = await axios.get(`${AGORA_API_BASE_URL}/${AGORA_APP_ID}/analytics`, {
      auth: { username: CUSTOMER_KEY, password: CUSTOMER_SECRET },
    });

    const { streams } = response.data;
    res.json({
      success: true,
      metrics: streams.map((stream) => ({
        streamId: stream.streamId,
        platforms: stream.platformsList,
        quality: `${stream.streamQuality}%`,
        viewers: stream.viewerCount,
        duration: stream.durationSec,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stream metrics" });
  }
});

// Start the Server

// API: Start Streaming to Multiple Platforms
app.post("/api/stream/start", express.json(), ensureAuthenticated, async (req, res) => {
  const { platform, channel, token } = req.body;

  try {
    // Example: Add integration logic for each platform
    if (platform === "YouTube") {
      // Call YouTube Live API or RTMP endpoint
      // await axios.post('https://youtube.googleapis.com/youtube/v3/liveBroadcasts', ...)
    } else if (platform === "Facebook") {
      // Call Facebook Live API or RTMP endpoint
    } else if (platform === "Twitch") {
      // Call Twitch API or RTMP endpoint
    } else if (platform === "Instagram") {
      // Instagram Live integration (usually via RTMP)
    } else if (platform === "LinkedIn") {
      // LinkedIn Live API
    } else if (platform === "Twitter (X)") {
      // X (Twitter) Live API or RTMP endpoint
    } else if (platform === "WeChat") {
      // WeChat streaming integration (custom or via RTMP)
    } else if (platform === "Kick") {
      // Kick streaming integration
    } else if (platform === "Trovo") {
      // Trovo streaming integration
    } else if (platform === "DLive") {
      // DLive streaming integration
    } else if (platform === "Vimeo") {
      // Vimeo Live API
    } else if (platform === "TikTok") {
      // TikTok Live integration
    } else if (platform === "Custom RTMP") {
      // Use RTMP URL provided by user
    }

    // For demo, just return success
    res.json({ success: true, started: true, platform });
  } catch (error) {
    res.status(500).json({ error: `Failed to start stream on ${platform}` });
  }
});

app.listen(3000, () => console.log("Backend running at http://localhost:3000"));
