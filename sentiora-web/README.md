# Sentiora Web - React Application

A beautiful, modern web application for mood-based music discovery and social networking.

## Features

- 🎵 **Mood-Based Music Discovery**: Select your current mood and discover curated Spotify playlists
- 💬 **Social Feed**: Share your thoughts and connect with others
- 🎨 **Premium Design**: Modern UI with glassmorphism, gradients, and smooth animations
- 🌙 **Dark Mode**: Beautiful dark theme support
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed
- Spotify Developer Account (for API credentials)
- Firebase Project (for social features)

### Installation

1. Clone or download this project

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Spotify API credentials
   - Fill in your Firebase configuration

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Configuration

### Spotify API Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app or use existing one
3. Add `http://localhost:5173/callback` to Redirect URIs
4. Copy the Client ID to your `.env` file

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Firestore Database
4. Get your web app configuration
5. Copy the config values to your `.env` file

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Firebase** - Backend and database
- **Spotify Web API** - Music data
- **React Router** - Navigation
- **Vanilla CSS** - Styling with modern features

## Project Structure

```
sentiora-web/
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   ├── services/    # API services
│   ├── types/       # TypeScript/JS types
│   ├── App.jsx      # Main app component
│   ├── main.jsx     # Entry point
│   └── index.css    # Global styles
├── .env.example     # Environment variables template
├── index.html       # HTML entry point
├── package.json     # Dependencies
└── vite.config.js   # Vite configuration
```

## License

MIT
