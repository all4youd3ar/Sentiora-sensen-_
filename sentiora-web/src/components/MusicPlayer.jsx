import React, { useState } from 'react';

const MusicPlayer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);

    const tracks = [
        {
            title: "Agape",
            artist: "Nicholas Britell",
            id: "2nfnX3XjhF8TkBftWyJCf2"
        },
        {
            title: "Experience",
            artist: "Ludovico Einaudi",
            id: "5tFYuaTxlVt9PvJQVttwQ3"
        }
    ];

    const togglePlayer = () => setIsOpen(!isOpen);

    return (
        <div className="music-player-container">
            {/* Floating Button */}
            <button
                className={`music-fab ${isOpen ? 'active' : ''}`}
                onClick={togglePlayer}
                title="Music Player"
            >
                <span style={{ fontSize: '1.5rem' }}>🎵</span>
            </button>

            {/* Player Popup */}
            <div className={`music-popup ${isOpen ? 'open' : ''}`}>
                <div className="music-header">
                    <h3>Sanctuary Sounds</h3>
                    <button className="close-btn" onClick={togglePlayer}>×</button>
                </div>

                <div className="current-player">
                    <iframe
                        style={{ borderRadius: '12px' }}
                        src={`https://open.spotify.com/embed/track/${tracks[currentTrack].id}?utm_source=generator&theme=0`}
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title="Sentiora Music"
                    ></iframe>
                </div>

                <div className="playlist">
                    {tracks.map((track, index) => (
                        <div
                            key={track.id}
                            className={`track-item ${currentTrack === index ? 'playing' : ''}`}
                            onClick={() => setCurrentTrack(index)}
                        >
                            <div className="track-info">
                                <span className="track-title">{track.title}</span>
                                <span className="track-artist">{track.artist}</span>
                            </div>
                            {currentTrack === index && <span className="playing-indicator">Eq</span>}
                        </div>
                    ))}
                </div>

                <p className="volume-note">Note: Please adjust volume via Spotify or your device.</p>
            </div>

            <style>{`
        .music-player-container {
          position: fixed;
          bottom: 2rem;
          left: 2rem; /* Left side to not conflict with other FABs */
          z-index: 2000;
          font-family: 'Quicksand', sans-serif;
        }

        .music-fab {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .music-fab:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.2);
        }

        .music-fab.active {
          background: var(--color-primary);
          box-shadow: 0 0 20px rgba(179, 157, 219, 0.4);
        }

        .music-popup {
          position: absolute;
          bottom: 70px;
          left: 0;
          width: 300px;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1rem;
          opacity: 0;
          transform: translateY(20px) scale(0.95);
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .music-popup.open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: all;
        }

        .music-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          color: #FDFBF7;
        }

        .music-header h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }

        .close-btn {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }

        .close-btn:hover {
          color: white;
        }

        .playlist {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .track-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s ease;
          color: rgba(255, 255, 255, 0.7);
        }

        .track-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .track-item.playing {
          background: rgba(179, 157, 219, 0.1);
          color: var(--color-primary-light);
        }

        .track-info {
          display: flex;
          flex-direction: column;
        }

        .track-title {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .track-artist {
          font-size: 0.75rem;
          opacity: 0.7;
        }

        .playing-indicator {
          font-size: 0.75rem;
          font-weight: bold;
        }
        
        .volume-note {
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.4);
            text-align: center;
            margin-top: 0.5rem;
            margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .music-player-container {
            bottom: 5rem; /* Above bottom nav */
            left: 1rem;
          }
        }
      `}</style>
        </div>
    );
};

export default MusicPlayer;
