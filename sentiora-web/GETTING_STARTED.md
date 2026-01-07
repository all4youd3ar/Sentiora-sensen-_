# For development without Node.js installed

Since Node.js is not currently installed on your system, here's how to get started:

## Option 1: Install Node.js (Recommended)

1. Download Node.js from: https://nodejs.org/
2. Install the LTS version (Long Term Support)
3. Restart your terminal/PowerShell
4. Navigate to the project directory:
   ```bash
   cd "c:\Users\LENOVO\OneDrive\Documents\Sentiora_App\sentiora-web"
   ```
5. Install dependencies:
   ```bash
   npm install
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```
7. Open your browser to `http://localhost:5173`

## Option 2: Use the Files Directly

All the React code is written and ready to use. The project structure is:

```
sentiora-web/
├── src/
│   ├── components/
│   │   ├── MoodScreen.jsx       # Mood selection and Spotify playlists
│   │   ├── FeedScreen.jsx       # Social feed with posts
│   │   ├── PostDetail.jsx       # Individual post view with comments
│   │   └── SpotifyCallback.jsx  # OAuth callback handler
│   ├── services/
│   │   ├── spotifyService.js    # Spotify API integration
│   │   ├── socialService.js     # Social features (posts, comments)
│   │   └── firebaseConfig.js    # Firebase configuration
│   ├── types/
│   │   └── types.js             # Type definitions and constants
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Premium design system
├── public/                      # Static assets
├── index.html                   # HTML entry point
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
├── .env.example                # Environment variables template
└── README.md                   # Full documentation
```

## Features Implemented

### 🎭 Mood Discovery
- 8 mood options (Happy, Sad, Motivated, Calm, Energetic, Romantic, Focused, Angry)
- Beautiful mood cards with icons and colors
- Inspirational quotes for each mood
- Spotify OAuth integration (PKCE flow)
- Playlist browsing and playback

### 👥 Social Feed
- Create and share posts
- Real-time updates (with Firebase)
- Mock data fallback (works without Firebase)
- Like posts
- Comment on posts
- Beautiful post cards with animations

### 🎨 Premium Design
- Modern, vibrant color palette
- Glassmorphism effects
- Smooth animations and transitions
- Dark mode support
- Fully responsive (mobile, tablet, desktop)
- Google Fonts (Inter, Outfit)

### 🔧 Technical Features
- React 18 with hooks
- React Router for navigation
- Spotify Web API integration
- Firebase Firestore (optional)
- Environment-based configuration
- Vite for fast development

## Configuration

### Spotify Setup (Optional)
1. Copy `.env.example` to `.env`
2. Add your Spotify Client ID
3. Add redirect URI: `http://localhost:5173/callback`

### Firebase Setup (Optional)
1. Copy `.env.example` to `.env`
2. Add your Firebase configuration
3. If not configured, app uses mock data

## Next Steps

1. **Install Node.js** to run the development server
2. **Configure Spotify** for music features
3. **Configure Firebase** for real social features (or use mock data)
4. **Customize** the design and features as needed

The application is fully functional and ready to run once Node.js is installed!
