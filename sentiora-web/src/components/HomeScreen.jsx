import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOODS, MOOD_COLORS, MOOD_ICONS } from '../types/types';



const HomeScreen = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const userName = currentUser?.displayName || currentUser?.email || 'Friend';
    const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1).split(' ')[0]; // First name only, capitalized

    const handleMoodClick = (mood) => {
        // For now, keeping navigation. The dynamic personalization on Home Screen might require a flow change.
        navigate('/mood', { state: { mood } });
    };

    return (
        <div className="gradient-bg" style={{ minHeight: '100vh', padding: 'var(--space-xl)', paddingBottom: '100px', position: 'relative' }}>
            <header style={{ marginBottom: 'var(--space-2xl)' }}>
                <h1 className="animate-fade-in" style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--space-xs)'
                }}>
                    Hi {formattedName} 👋
                </h1>
                <h2 className="animate-fade-in" style={{
                    fontSize: 'var(--font-size-3xl)',
                    fontWeight: '800',
                    color: 'var(--color-text-primary)',
                    animationDelay: '0.1s',
                    marginBottom: 'var(--space-sm)'
                }}>
                    How are you feeling today?
                </h2>
                <p className="animate-fade-in" style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-tertiary)',
                    animationDelay: '0.15s',
                    marginBottom: 0
                }}>
                    Take a moment to check in with yourself.
                </p>
            </header>

            {/* Mood Wheel (Horizontal Scroll) */}
            <div className="animate-fade-in" style={{
                display: 'flex',
                gap: 'var(--space-md)',
                overflowX: 'auto',
                paddingBottom: 'var(--space-lg)',
                marginBottom: 'var(--space-md)',
                scrollSnapType: 'x mandatory',
                animationDelay: '0.2s',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>
                {
                    Object.values(MOODS).map((mood) => (
                        <div
                            key={mood}
                            onClick={() => handleMoodClick(mood)}
                            className="mood-card"
                            style={{
                                flex: '0 0 auto',
                                scrollSnapAlign: 'center',
                                '--mood-color': MOOD_COLORS[mood],
                                minWidth: '160px',
                                padding: 'var(--space-lg)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 'var(--space-sm)'
                            }}
                        >
                            <img
                                src={MOOD_ICONS[mood]}
                                alt={mood}
                                style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                            />
                            <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>{mood}</span>
                        </div>
                    ))
                }
            </div >
            <p className="text-center animate-fade-in" style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-tertiary)',
                marginBottom: 'var(--space-2xl)',
                marginTop: '0'
            }}>
                Your mood helps us tailor quotes & music for you.
            </p>

            {/* Quick Cards */}
            <div style={{ display: 'grid', gap: 'var(--space-lg)', marginBottom: '100px' }}>
                {/* Daily Quote */}
                <div className="card animate-scale-in" style={{
                    padding: 'var(--space-xl)',
                    background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)',
                    color: '#fff',
                    animationDelay: '0.3s',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
                        <h3 style={{ fontSize: 'var(--font-size-sm)', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                            Daily Quote
                        </h3>
                        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                            <button className="btn-ghost" style={{ color: 'white', padding: '4px' }}>❤️</button>
                            <button className="btn-ghost" style={{ color: 'white', padding: '4px' }}>📤</button>
                        </div>
                    </div>

                    <p style={{ fontSize: 'var(--font-size-xl)', fontWeight: '600', lineHeight: 1.4, marginBottom: 'var(--space-md)' }}>
                        "Happiness is not something ready made. It comes from your own actions."
                    </p>
                    <p style={{ fontSize: 'var(--font-size-sm)', opacity: 0.9, textAlign: 'right', fontStyle: 'italic' }}>
                        — Dalai Lama
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
                    {/* Mood Trend */}
                    <div className="card animate-scale-in" style={{
                        padding: 'var(--space-lg)',
                        animationDelay: '0.4s'
                    }}>
                        <h3 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                            Mood Trend
                        </h3>
                        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-md)' }}>
                            Last 7 Days
                        </p>
                        <div style={{
                            height: '80px',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                            gap: '4px',
                            marginBottom: 'var(--space-sm)'
                        }}>
                            {[40, 60, 30, 80, 50, 70, 60].map((h, i) => (
                                <div key={i} style={{
                                    width: '100%',
                                    height: `${h}%`,
                                    background: i > 3 ? 'var(--color-primary)' : 'var(--color-border)', // Highlight recent
                                    borderRadius: '4px',
                                    opacity: 0.7
                                }} />
                            ))}
                        </div>
                        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span>🌱</span> You’ve been feeling more balanced this week
                        </p>
                    </div>

                    {/* Daily Challenge */}
                    <div
                        onClick={() => navigate('/challenges')}
                        className="card animate-scale-in"
                        style={{
                            padding: 'var(--space-lg)',
                            background: 'var(--color-surface)',
                            border: '1px solid var(--color-primary)',
                            animationDelay: '0.5s',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
                                <h3 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-primary)', fontWeight: '700', margin: 0 }}>
                                    Daily Challenge
                                </h3>
                                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent)', fontWeight: '600' }}>🔥 3 Day Streak</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-sm)' }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-bg-secondary)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
                                }}>
                                    💧
                                </div>
                                <div>
                                    <p style={{ fontWeight: '600', margin: 0, fontSize: '0.95rem' }}>Drink Water</p>
                                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', margin: 0 }}>Target: 2L</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                            <div style={{ flex: 1, height: '6px', background: 'var(--color-bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ width: '60%', height: '100%', background: 'var(--color-primary)' }}></div>
                            </div>
                            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>60%</span>
                        </div>
                        <p style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)', marginTop: 'var(--space-xs)', margin: 0 }}>
                            Hydration helps improve focus.
                        </p>
                    </div>
                </div>
            </div>


        </div >
    );
};

export default HomeScreen;
