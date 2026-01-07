import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MOODS, MOOD_COLORS, MOOD_ICONS } from '../types/types';
import { FOUNDER_EMAIL } from '../types/constants';

export default function ProfileScreen() {
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();
    const [lowStimulation, setLowStimulation] = useState(false);

    // Mock recent vibe
    const recentMoods = [MOODS.CALM, MOODS.HAPPY, MOODS.FOCUSED];

    return (
        <div className="gradient-bg" style={{
            minHeight: '100vh',
            padding: 'var(--space-xl)',
            paddingBottom: '100px',
            filter: lowStimulation ? 'grayscale(0.8) contrast(0.9) brightness(0.9)' : 'none',
            transition: 'filter 0.5s ease'
        }}>
            <header style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
                <div style={{
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                    borderRadius: '50%',
                    margin: '0 auto var(--space-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3.5rem',
                    color: 'white',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    {currentUser?.displayName?.charAt(0) || 'U'}
                </div>
                {currentUser?.email === FOUNDER_EMAIL && (
                    <div style={{
                        marginTop: '-25px',
                        marginBottom: 'var(--space-md)',
                        background: 'gold',
                        color: 'black',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        display: 'inline-block',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        👑 FOUNDER
                    </div>
                )}
                <h2 style={{ marginBottom: 'var(--space-xs)', fontSize: '2rem' }}>{currentUser?.displayName || 'Friend'}</h2>
                <p style={{ color: 'var(--color-text-secondary)' }}>Welcome to your emotional space.</p>
            </header>

            {/* My Vibe Section */}
            <div className="animate-fade-in" style={{ marginBottom: 'var(--space-xl)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-md)' }}>My Vibe (Last 3 Days)</h3>
                <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                    {recentMoods.map((mood, i) => (
                        <div key={i} className="card" style={{
                            padding: 'var(--space-md)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            flex: 1,
                            backgroundColor: MOOD_COLORS[mood],
                            color: '#333'
                        }}>
                            <img
                                src={MOOD_ICONS[mood]}
                                alt={mood}
                                style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                            />
                            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{mood}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Menu Links */}
            <div style={{ display: 'grid', gap: 'var(--space-md)', marginBottom: 'var(--space-2xl)' }}>
                <div onClick={() => navigate('/calendar')} className="card" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 'var(--space-lg)', padding: 'var(--space-lg)' }}>
                    <span style={{ fontSize: '1.8rem', background: 'var(--color-bg-tertiary)', padding: '10px', borderRadius: '50%' }}>📅</span>
                    <div>
                        <h4 style={{ margin: 0, fontSize: '1rem' }}>My Mood Calendar</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>View your monthly history</p>
                    </div>
                    <span style={{ marginLeft: 'auto', color: 'var(--color-text-tertiary)' }}>→</span>
                </div>
                <div onClick={() => navigate('/report')} className="card" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 'var(--space-lg)', padding: 'var(--space-lg)' }}>
                    <span style={{ fontSize: '1.8rem', background: 'var(--color-bg-tertiary)', padding: '10px', borderRadius: '50%' }}>📊</span>
                    <div>
                        <h4 style={{ margin: 0, fontSize: '1rem' }}>Emotional Reflections</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>See your weekly insights</p>
                    </div>
                    <span style={{ marginLeft: 'auto', color: 'var(--color-text-tertiary)' }}>→</span>
                </div>

                <div onClick={() => navigate('/wallpapers')} className="card" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 'var(--space-lg)', padding: 'var(--space-lg)' }}>
                    <span style={{ fontSize: '1.8rem', background: 'var(--color-bg-tertiary)', padding: '10px', borderRadius: '50%' }}>🖼️</span>
                    <div>
                        <h4 style={{ margin: 0, fontSize: '1rem' }}>My Wallpapers</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Saved visuals</p>
                    </div>
                    <span style={{ marginLeft: 'auto', color: 'var(--color-text-tertiary)' }}>→</span>
                </div>

                <div onClick={() => navigate('/compatibility')} className="card" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 'var(--space-lg)', padding: 'var(--space-lg)' }}>
                    <span style={{ fontSize: '1.8rem', background: 'var(--color-bg-tertiary)', padding: '10px', borderRadius: '50%' }}>🤝</span>
                    <div>
                        <h4 style={{ margin: 0, fontSize: '1rem' }}>Emotion Match</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Check gentle compatibility</p>
                    </div>
                    <span style={{ marginLeft: 'auto', color: 'var(--color-text-tertiary)' }}>→</span>
                </div>
            </div>

            {/* Preferences */}
            <div style={{ marginBottom: 'var(--space-2xl)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-md)' }}>Comfort Settings</h3>
                <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-lg)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                        <span>☁️</span>
                        <span>Low Stimulation Mode</span>
                    </div>
                    <div
                        onClick={() => setLowStimulation(!lowStimulation)}
                        style={{
                            width: '50px',
                            height: '30px',
                            background: lowStimulation ? 'var(--color-primary)' : 'var(--color-bg-tertiary)',
                            borderRadius: '15px',
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'background 0.3s ease'
                        }}
                    >
                        <div style={{
                            width: '26px',
                            height: '26px',
                            background: 'white',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '2px',
                            left: lowStimulation ? '22px' : '2px',
                            transition: 'left 0.3s ease',
                            boxShadow: 'var(--shadow-sm)'
                        }} />
                    </div>
                </div>
            </div>

            <button
                onClick={async () => { await logout(); navigate('/welcome'); }}
                className="btn btn-ghost"
                style={{ width: '100%', color: 'var(--color-error)', border: '1px solid var(--color-error)' }}
            >
                Sign Out
            </button>
        </div>
    );
}
