import React from 'react';
import { MOODS, MOOD_COLORS, MOOD_ICONS } from '../types/types';

export default function WeeklyReportScreen() {
    // Mock data - In a real app, this would come from a backend analyzing the user's weekly entries
    const reflections = [
        { mood: MOODS.HAPPY, frequency: 'Often', insight: "You found moments of joy in the little things." },
        { mood: MOODS.CALM, frequency: 'Sometimes', insight: "You carved out space for peace." },
        { mood: MOODS.ANXIOUS, frequency: 'Rarely', insight: "You handled challenges with grace." }
    ];

    return (
        <div className="gradient-bg" style={{ minHeight: '100vh', padding: 'var(--space-xl)', paddingBottom: '100px' }}>
            <header style={{ marginBottom: 'var(--space-2xl)' }}>
                <h1 className="animate-fade-in" style={{ fontSize: '2rem', marginBottom: 'var(--space-sm)' }}>
                    Your Reflections
                </h1>
                <p className="animate-fade-in" style={{ color: 'var(--color-text-secondary)', animationDelay: '0.1s' }}>
                    Gentle insights from your week.
                </p>
            </header>

            <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
                {/* Main Insight Card */}
                <div className="card animate-scale-in" style={{
                    padding: 'var(--space-xl)',
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                    color: '#333',
                    animationDelay: '0.2s',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h3 style={{ fontSize: '1rem', opacity: 0.8, marginBottom: 'var(--space-sm)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Recurring Theme
                        </h3>
                        <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: 'var(--space-sm)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img
                                src={MOOD_ICONS[MOODS.HAPPY]}
                                alt="Radiant"
                                style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                            />
                            <span>Radiant</span>
                        </div>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.5, maxWidth: '90%' }}>
                            "This week, you radiated positivity. Remember this feeling."
                        </p>
                    </div>
                </div>

                {/* Emotional Patterns */}
                <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <h3 style={{ marginBottom: 'var(--space-md)', fontSize: '1.2rem' }}>Emotional Patterns</h3>
                    <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
                        {reflections.map((item, index) => (
                            <div key={item.mood} className="card" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-lg)',
                                padding: 'var(--space-lg)',
                                borderLeft: `4px solid ${MOOD_COLORS[item.mood]}`
                            }}>
                                <img
                                    src={MOOD_ICONS[item.mood]}
                                    alt={item.mood}
                                    style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                                />
                                <div>
                                    <h4 style={{ margin: 0, marginBottom: '4px', fontSize: '1rem' }}>{item.mood}</h4>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                        {item.insight}
                                    </p>
                                </div>
                                <div style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--color-text-tertiary)', fontWeight: '600' }}>
                                    {item.frequency}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gentle Nudges */}
                <div className="card animate-scale-in" style={{ padding: 'var(--space-xl)', animationDelay: '0.4s', background: 'var(--color-surface)' }}>
                    <h3 style={{ marginBottom: 'var(--space-lg)', fontSize: '1.2rem' }}>For Next Week</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.5rem' }}>🍃</span>
                            <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                                Try a 5-minute breathing exercise when you feel anxious.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.5rem' }}>💧</span>
                            <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                                Stay hydrated to keep your energy balanced.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
