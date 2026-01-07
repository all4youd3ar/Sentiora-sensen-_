import React, { useState, useMemo } from 'react';
import { MOODS, MOOD_COLORS, MOOD_ICONS, MOOD_QUOTES } from '../types/types';

export default function WallpapersScreen() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedWallpaper, setSelectedWallpaper] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);
    const [bgSet, setBgSet] = useState(false); // Mock state for "Set as Background"

    const categories = ['All', 'Calm', 'Happy', 'Focus', 'Healing', 'Night'];

    // Curated categorization mapping
    const categoryMap = {
        [MOODS.CALM]: ['Calm', 'Healing', 'Night'],
        [MOODS.GRATEFUL]: ['Calm', 'Happy'],
        [MOODS.HAPPY]: ['Happy'],
        [MOODS.ENERGETIC]: ['Happy', 'Focus'],
        [MOODS.ROMANTIC]: ['Happy', 'Calm'],
        [MOODS.HOPEFUL]: ['Happy', 'Healing'],
        [MOODS.FOCUSED]: ['Focus'],
        [MOODS.MOTIVATED]: ['Focus', 'Happy'],
        [MOODS.SAD]: ['Healing'],
        [MOODS.ANXIOUS]: ['Healing', 'Calm'],
        [MOODS.ANGRY]: ['Healing'],
        [MOODS.LONELY]: ['Healing', 'Night'],
        [MOODS.TIRED]: ['Night', 'Calm'],
        [MOODS.NOSTALGIC]: ['Night', 'Healing', 'Calm']
    };

    // Generate wallpaper data
    const wallpapers = useMemo(() => {
        return Object.values(MOODS).map((mood, index) => {
            const color = MOOD_COLORS[mood];
            // Generating varied soft gradients
            const gradients = [
                `linear-gradient(135deg, ${color} 0%, #ffffff 100%)`,
                `radial-gradient(circle at 50% 30%, ${color}20, ${color} 100%)`,
                `linear-gradient(to top, ${color} 0%, #f5f5f5 100%)`,
                `conic-gradient(from 180deg at 50% 50%, ${color}, #fff, ${color})`
            ];

            return {
                id: mood,
                mood: mood,
                icon: MOOD_ICONS[mood],
                affirmation: MOOD_QUOTES[mood]?.[0] || "Breathe.", // Pick first quote or default
                categories: categoryMap[mood] || ['All'],
                gradient: gradients[index % gradients.length],
                textColor: ['#333', '#000'].includes(color) ? '#fff' : 'var(--color-text-primary)'
            };
        });
    }, []);

    const filteredWallpapers = selectedCategory === 'All'
        ? wallpapers
        : wallpapers.filter(w => w.categories.includes(selectedCategory));

    const handleSetBackground = () => {
        setBgSet(true);
        setTimeout(() => setBgSet(false), 2000);
    };

    return (
        <div className="gradient-bg" style={{
            minHeight: '100vh',
            padding: 'var(--space-xl)',
            paddingBottom: '100px',
            '--noise-url': 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.1%22/%3E%3C/svg%3E")'
        }}>
            {/* Header */}
            <header style={{ marginBottom: 'var(--space-xl)', textAlign: 'left' }}>
                <h1 className="animate-fade-in" style={{ fontSize: '2rem', marginBottom: 'var(--space-xs)' }}>
                    Visuals designed to support how you feel.
                </h1>
                <p className="animate-fade-in" style={{
                    color: 'var(--color-text-secondary)',
                    animationDelay: '0.1s',
                    fontSize: '1rem'
                }}>
                    Tap a wallpaper to preview or set it as your space.
                </p>
            </header>

            {/* Smart Suggestions (Mock) */}
            <div className="animate-fade-in" style={{ marginBottom: 'var(--space-xl)', animationDelay: '0.15s' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-primary)', marginBottom: 'var(--space-sm)' }}>
                    RECOMMENDED FOR HOW YOU'VE BEEN FEELING LATELY
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-sm)', overflowX: 'auto', paddingBottom: '4px' }}>
                    {wallpapers.slice(0, 3).map(w => (
                        <div key={`rec-${w.id}`}
                            onClick={() => setSelectedWallpaper(w)}
                            style={{
                                width: '80px', height: '80px',
                                background: w.gradient,
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                flexShrink: 0
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Emotional Categorization */}
            <div className="animate-fade-in" style={{
                display: 'flex',
                gap: 'var(--space-sm)',
                marginBottom: 'var(--space-xl)',
                overflowX: 'auto',
                paddingBottom: 'var(--space-xs)',
                animationDelay: '0.2s'
            }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-ghost'}`}
                        style={{
                            padding: '6px 16px',
                            fontSize: '0.9rem',
                            borderRadius: '20px',
                            whiteSpace: 'nowrap',
                            background: selectedCategory === cat ? 'var(--color-primary)' : 'rgba(255,255,255,0.5)',
                            border: selectedCategory === cat ? 'none' : '1px solid rgba(0,0,0,0.05)'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Wallpaper Grid */}
            <div className="animate-scale-in" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: 'var(--space-lg)',
                animationDelay: '0.3s'
            }}>
                {filteredWallpapers.map((wp) => (
                    <div
                        key={wp.id}
                        onClick={() => setSelectedWallpaper(wp)}
                        onMouseEnter={() => setHoveredId(wp.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        style={{
                            aspectRatio: '9/16',
                            background: wp.gradient,
                            borderRadius: 'var(--radius-lg)',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: hoveredId === wp.id ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' : 'var(--shadow-md)',
                            transform: hoveredId === wp.id ? 'scale(1.02)' : 'scale(1)',
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            border: hoveredId === wp.id ? `2px solid ${MOOD_COLORS[wp.mood]}` : '2px solid transparent'
                        }}
                    >
                        {/* Noise Texture Overlay */}
                        <div style={{ position: 'absolute', inset: 0, opacity: 0.15, background: 'var(--noise-url)', pointerEvents: 'none' }}></div>

                        {/* Content Overlay */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: 'var(--space-md)',
                            background: 'linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <img
                                    src={wp.icon}
                                    alt={wp.mood}
                                    style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                                />
                                <span style={{ fontWeight: '600', fontSize: '0.9rem', color: '#333' }}>{wp.mood}</span>
                            </div>
                            <p style={{
                                fontSize: '0.75rem',
                                color: '#555',
                                margin: 0,
                                lineHeight: '1.2',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {wp.affirmation}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Full Screen Preview Modal */}
            {selectedWallpaper && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 2000, // Very high z-index
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(15px)',
                    background: 'rgba(255, 255, 255, 0.3)'
                }} onClick={() => setSelectedWallpaper(null)}>

                    {/* Background Layer for Full Immersion */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: selectedWallpaper.gradient,
                        zIndex: -1,
                        opacity: 0.8
                    }} />

                    <div
                        className="animate-scale-in"
                        style={{
                            width: '90%',
                            maxWidth: '400px',
                            height: '85vh',
                            background: selectedWallpaper.gradient,
                            borderRadius: 'var(--radius-2xl)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: 'var(--space-2xl)',
                            textAlign: 'center',
                            overflow: 'hidden'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Noise Texture */}
                        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, background: 'var(--noise-url)', pointerEvents: 'none' }}></div>

                        {/* Top Content */}
                        <div style={{ zIndex: 1, marginTop: 'var(--space-2xl)' }}>
                            <img
                                src={selectedWallpaper.icon}
                                alt={selectedWallpaper.mood}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'contain',
                                    margin: '0 auto var(--space-md)',
                                    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                                }}
                            />
                            <h2 style={{
                                fontSize: '2.5rem',
                                fontWeight: '300',
                                color: '#333',
                                letterSpacing: '-1px',
                                marginBottom: 'var(--space-md)'
                            }}>
                                {selectedWallpaper.mood}
                            </h2>
                            <p style={{
                                fontSize: '1.1rem',
                                color: '#555',
                                maxWidth: '80%',
                                margin: '0 auto',
                                fontStyle: 'italic',
                                lineHeight: 1.6
                            }}>
                                "{selectedWallpaper.affirmation}"
                            </p>
                        </div>

                        {/* Bottom Actions */}
                        <div style={{ zIndex: 1, display: 'grid', gap: 'var(--space-md)' }}>
                            <button
                                onClick={handleSetBackground}
                                className="btn"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    color: '#333',
                                    border: 'none',
                                    padding: 'var(--space-lg)',
                                    borderRadius: 'var(--radius-xl)',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                                    backdropFilter: 'blur(5px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}
                            >
                                {bgSet ? '✨ Space Updated' : '🧘 Set as Background'}
                            </button>
                            <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                                <button className="btn btn-ghost" style={{ flex: 1, background: 'rgba(255,255,255,0.5)' }}>
                                    ⭐ Save
                                </button>
                                <button
                                    className="btn btn-ghost"
                                    style={{ flex: 1, background: 'rgba(255,255,255,0.5)' }}
                                    onClick={() => setSelectedWallpaper(null)}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
