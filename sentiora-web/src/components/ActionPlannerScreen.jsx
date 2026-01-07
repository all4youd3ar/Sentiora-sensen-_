import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MOODS, MOOD_COLORS, MOOD_PLAYLISTS } from '../types/types';
import spotifyService from '../services/spotifyService';

export default function ActionPlannerScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const { mood } = location.state || { mood: MOODS.NEUTRAL || 'Neutral' };
    const [playlistId, setPlaylistId] = useState(null);

    useEffect(() => {
        // Get a playlist ID for this mood
        const playlists = MOOD_PLAYLISTS[mood] || [];
        if (playlists.length > 0) {
            setPlaylistId(playlists[0]);
        }
    }, [mood]);

    const handleSpotifyAction = async () => {
        if (playlistId) {
            // Open specific playlist
            window.open(`https://open.spotify.com/playlist/${playlistId}`, '_blank');
        } else {
            // Fallback to auth/search flow if no hardcoded playlist
            if (!spotifyService.isAuthenticated()) {
                spotifyService.login();
            } else {
                // Navigate to old mood screen which handles search
                navigate('/mood');
            }
        }
    };

    const actions = [
        {
            id: 'breathe',
            title: 'Breathe',
            icon: '🌬️',
            description: 'Take 3 deep breaths. Inhale for 4s, hold for 4s, exhale for 4s.',
            color: 'var(--color-primary)',
            onClick: () => navigate('/breathe')
        },
        {
            id: 'water',
            title: 'Hydrate',
            icon: '💧',
            description: 'Drink a glass of water. Dehydration can affect your mood.',
            color: '#4FC3F7'
        },
        {
            id: 'music',
            title: 'Listen to Music',
            icon: '🎧',
            description: `Listen to a curated ${mood.toLowerCase()} playlist on Spotify.`,
            color: '#1DB954',
            onClick: handleSpotifyAction
        },
        {
            id: 'walk',
            title: 'Take a Walk',
            icon: '🚶',
            description: 'Step outside for 5 minutes. Fresh air changes perspective.',
            color: '#AED581'
        },
        {
            id: 'gratitude',
            title: 'Practice Gratitude',
            icon: '✨',
            description: 'Write down something you are thankful for today.',
            color: '#FFD700',
            onClick: () => navigate('/gratitude')
        }
    ];

    return (
        <div className="gradient-bg" style={{ minHeight: '100vh', padding: 'var(--space-xl)', paddingBottom: '100px' }}>
            <header style={{ marginBottom: 'var(--space-2xl)' }}>
                <h1 className="animate-fade-in" style={{ fontSize: '2rem', marginBottom: 'var(--space-sm)' }}>
                    Let's take action
                </h1>
                <p className="animate-fade-in" style={{ color: 'var(--color-text-secondary)', animationDelay: '0.1s' }}>
                    Small steps to help you feel better.
                </p>
            </header>

            <div className="animate-scale-in" style={{ display: 'grid', gap: 'var(--space-lg)', animationDelay: '0.2s' }}>
                {actions.map((action, index) => (
                    <div
                        key={action.id}
                        onClick={action.onClick}
                        className="card"
                        style={{
                            padding: 'var(--space-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-lg)',
                            cursor: action.onClick ? 'pointer' : 'default',
                            transition: 'transform var(--transition-base)',
                            borderLeft: `4px solid ${action.color}`
                        }}
                        onMouseEnter={(e) => action.onClick && (e.currentTarget.style.transform = 'translateX(8px)')}
                        onMouseLeave={(e) => action.onClick && (e.currentTarget.style.transform = 'translateX(0)')}
                    >
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: `${action.color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            color: action.color
                        }}>
                            {action.icon}
                        </div>
                        <div>
                            <h3 style={{ margin: 0, marginBottom: 'var(--space-xs)', fontSize: '1.1rem' }}>
                                {action.title}
                            </h3>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                {action.description}
                            </p>
                        </div>
                        {action.onClick && (
                            <div style={{ marginLeft: 'auto', color: 'var(--color-text-tertiary)' }}>
                                ➔
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 'var(--space-3xl)', textAlign: 'center' }}>
                <button
                    onClick={() => navigate('/')}
                    className="btn-ghost"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}
