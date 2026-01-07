import React, { useState, useEffect } from 'react';
import { MOODS, MOOD_QUOTES, MOOD_COLORS, MOOD_ICONS, MOOD_PLAYLISTS } from '../types/types';
import spotifyService from '../services/spotifyService';

function MoodCard({ mood, isSelected, onClick }) {
    const color = MOOD_COLORS[mood];
    const icon = MOOD_ICONS[mood];

    return (
        <div
            onClick={onClick}
            className={`mood-card ${isSelected ? 'selected' : ''}`}
            style={{
                '--mood-color': color
            }}
        >
            <img
                src={icon}
                alt={mood}
                style={{ width: '60px', height: '60px', objectFit: 'contain', marginBottom: 'var(--space-sm)' }}
            />
            <h3 style={{
                margin: 0,
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-bold)',
                color: isSelected ? 'white' : 'var(--color-text-primary)',
                transition: 'color var(--transition-base)'
            }}>
                {mood}
            </h3>
        </div>
    );
}

function QuoteCard({ quote }) {
    return (
        <div className="card animate-fade-in" style={{
            padding: 'var(--space-2xl)',
            textAlign: 'center',
            marginBottom: 'var(--space-xl)'
        }}>
            <div style={{
                fontSize: '2.5rem',
                color: 'var(--color-text-tertiary)',
                marginBottom: 'var(--space-md)'
            }}>
                💭
            </div>
            <p style={{
                fontSize: 'var(--font-size-lg)',
                fontStyle: 'italic',
                lineHeight: 1.8,
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-md)'
            }}>
                "{quote}"
            </p>
            <p style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-tertiary)',
                margin: 0
            }}>
                — Sentiora Wisdom
            </p>
        </div>
    );
}

function PlaylistCard({ playlist }) {
    const imageUrl = playlist.images?.[0]?.url;
    const ownerName = playlist.owner?.display_name || 'Spotify';

    return (
        <div className="card animate-scale-in" style={{
            padding: 'var(--space-md)',
            display: 'flex',
            gap: 'var(--space-md)',
            alignItems: 'center',
            cursor: 'pointer',
            marginBottom: 'var(--space-md)'
        }}
            onClick={() => {
                if (playlist.external_urls?.spotify) {
                    window.open(playlist.external_urls.spotify, '_blank');
                }
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(8px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
            }}
        >
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={playlist.name}
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: 'var(--radius-md)',
                        objectFit: 'cover',
                        flexShrink: 0
                    }}
                />
            ) : (
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    flexShrink: 0
                }}>
                    🎵
                </div>
            )}

            <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{
                    margin: 0,
                    marginBottom: 'var(--space-xs)',
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    {playlist.name}
                </h4>
                <p style={{
                    margin: 0,
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)'
                }}>
                    By {ownerName}
                </p>
            </div>

            <div style={{
                fontSize: '2rem',
                color: 'var(--color-success)',
                flexShrink: 0
            }}>
                ▶️
            </div>
        </div>
    );
}

function MoodScreen() {
    const [selectedMoods, setSelectedMoods] = useState([]);
    const [intensity, setIntensity] = useState(50);
    const [quote, setQuote] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        setIsAuthenticated(spotifyService.isAuthenticated());
    }, []);

    const toggleMood = (mood) => {
        if (selectedMoods.includes(mood)) {
            setSelectedMoods(selectedMoods.filter(m => m !== mood));
        } else {
            if (selectedMoods.length < 3) { // Limit to 3 dominant emotions
                setSelectedMoods([...selectedMoods, mood]);
            }
        }
    };

    const handleCheckIn = async () => {
        if (selectedMoods.length === 0) return;

        setShowResults(true);

        // Use the first selected mood as the 'primary' one for quotes/music for now
        const primaryMood = selectedMoods[0];

        // Get random quote for this mood
        const quotes = MOOD_QUOTES[primaryMood];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);

        // Fetch playlists if authenticated
        if (spotifyService.isAuthenticated()) {
            await fetchPlaylists(primaryMood);
        }
    };

    const fetchPlaylists = async (mood) => {
        setLoading(true);
        try {
            // Check for hardcoded playlists first
            const hardcodedIds = MOOD_PLAYLISTS[mood] || [];

            if (hardcodedIds.length > 0) {
                // Fetch specific playlists
                const playlistPromises = hardcodedIds.map(id => spotifyService.getPlaylist(id));
                const results = await Promise.all(playlistPromises);
                setPlaylists(results);
            } else {
                // Fallback to search
                const results = await spotifyService.searchPlaylists(mood, 10);
                setPlaylists(results);
            }
        } catch (error) {
            console.error('Error fetching playlists:', error);
            if (error.message === 'Authentication expired' || error.message === 'Not authenticated') {
                setIsAuthenticated(false);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSpotifyLogin = () => {
        spotifyService.login();
    };

    return (
        <div className="gradient-bg" style={{ minHeight: 'calc(100vh - 80px)', paddingBottom: '120px' }}>
            <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
                {/* Header */}
                <div style={{ marginBottom: 'var(--space-2xl)', textAlign: 'center' }} className="animate-fade-in">
                    <h1 style={{
                        fontSize: 'var(--font-size-4xl)',
                        fontWeight: 'var(--font-weight-extrabold)',
                        marginBottom: 'var(--space-sm)',
                        color: 'var(--color-primary)'
                    }}>
                        How are you feeling?
                    </h1>
                    <p style={{
                        fontSize: 'var(--font-size-lg)',
                        color: 'var(--color-text-secondary)',
                        margin: 0
                    }}>
                        Select what resonates with you right now (up to 3).
                    </p>
                </div>

                {/* Mood Grid */}
                {!showResults && (
                    <div className="animate-fade-in">
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                            gap: 'var(--space-md)',
                            marginBottom: 'var(--space-2xl)'
                        }}>
                            {Object.values(MOODS).map((mood) => (
                                <MoodCard
                                    key={mood}
                                    mood={mood}
                                    isSelected={selectedMoods.includes(mood)}
                                    onClick={() => toggleMood(mood)}
                                />
                            ))}
                        </div>

                        {/* Intensity Slider (Only show if moods selected) */}
                        {selectedMoods.length > 0 && (
                            <div className="card animate-scale-in" style={{
                                marginBottom: 'var(--space-xl)',
                                padding: 'var(--space-xl)',
                                textAlign: 'center'
                            }}>
                                <label style={{ display: 'block', marginBottom: 'var(--space-md)', fontWeight: '600', color: 'var(--color-text-secondary)' }}>
                                    How intense is this feeling?
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={intensity}
                                    onChange={(e) => setIntensity(e.target.value)}
                                    style={{ width: '100%', maxWidth: '300px', accentColor: 'var(--color-primary)' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '300px', margin: '0 auto', fontSize: '0.8rem', color: 'var(--color-text-tertiary)', marginTop: 'var(--space-xs)' }}>
                                    <span>A little</span>
                                    <span>Very</span>
                                </div>
                            </div>
                        )}

                        {/* Continue Button */}
                        <div style={{ textAlign: 'center' }}>
                            <button
                                onClick={handleCheckIn}
                                disabled={selectedMoods.length === 0}
                                className="btn btn-primary"
                                style={{
                                    padding: 'var(--space-lg) var(--space-3xl)',
                                    fontSize: '1.2rem',
                                    borderRadius: 'var(--radius-full)',
                                    boxShadow: '0 10px 25px -5px rgba(var(--primary-hue), 0.4)'
                                }}
                            >
                                Check In & Reflect
                            </button>
                        </div>
                    </div>
                )}

                {/* Results Section */}
                {showResults && (
                    <div className="animate-slide-in">
                        <button
                            onClick={() => setShowResults(false)}
                            className="btn btn-ghost"
                            style={{ marginBottom: 'var(--space-lg)' }}
                        >
                            ← Change Mood
                        </button>

                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: 'var(--space-sm)' }}>
                                You are checking in as...
                            </h2>
                            <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                                {selectedMoods.map(mood => (
                                    <span key={mood} style={{
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        background: MOOD_COLORS[mood],
                                        color: '#333', // Assuming light backgrounds for pastel mood colors
                                        fontWeight: '600'
                                    }}>
                                        {mood}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Quote Section */}
                        {quote && <QuoteCard quote={quote} />}

                        {/* Spotify Authentication */}
                        {selectedMoods.length > 0 && !isAuthenticated && (
                            <div className="animate-fade-in" style={{
                                textAlign: 'center',
                                marginBottom: 'var(--space-2xl)'
                            }}>
                                <div className="card" style={{
                                    padding: 'var(--space-2xl)',
                                    maxWidth: '500px',
                                    margin: '0 auto'
                                }}>
                                    <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>🎵</div>
                                    <h3 style={{ marginBottom: 'var(--space-md)' }}>
                                        Connect to Spotify
                                    </h3>
                                    <p style={{
                                        color: 'var(--color-text-secondary)',
                                        marginBottom: 'var(--space-lg)'
                                    }}>
                                        Discover personalized playlists for your {selectedMoods[0].toLowerCase()} mood
                                    </p>
                                    <button
                                        onClick={handleSpotifyLogin}
                                        className="btn btn-primary"
                                        style={{
                                            padding: 'var(--space-md) var(--space-2xl)',
                                            fontSize: 'var(--font-size-lg)'
                                        }}
                                    >
                                        Connect with Spotify
                                    </button>
                                    <div style={{ marginTop: 'var(--space-md)' }}>
                                        <button
                                            onClick={() => {
                                                spotifyService.loginMock();
                                                setIsAuthenticated(true);
                                            }}
                                            className="btn-ghost"
                                            style={{ fontSize: '0.9rem', opacity: 0.8 }}
                                        >
                                            use guest mode
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Playlists Section */}
                        {selectedMoods.length > 0 && isAuthenticated && (
                            <div className="animate-fade-in">
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-sm)',
                                    marginBottom: 'var(--space-lg)'
                                }}>
                                    <span style={{ fontSize: '1.5rem' }}>🎧</span>
                                    <h2 style={{ margin: 0 }}>
                                        Playlists for {selectedMoods[0]}
                                    </h2>
                                </div>

                                {loading ? (
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        padding: 'var(--space-3xl)'
                                    }}>
                                        <div className="spinner"></div>
                                    </div>
                                ) : playlists.length > 0 ? (
                                    <div>
                                        {playlists.map((playlist) => (
                                            <PlaylistCard key={playlist.id} playlist={playlist} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="card" style={{
                                        padding: 'var(--space-2xl)',
                                        textAlign: 'center'
                                    }}>
                                        <p style={{ color: 'var(--color-text-secondary)' }}>
                                            No playlists found. Try selecting a different mood!
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MoodScreen;
