import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AmbienceMixer() {
    const [isOpen, setIsOpen] = useState(false);

    // Sound configuration
    const [sounds, setSounds] = useState([
        { id: 'rain', name: 'Rain', icon: '🌧️', volume: 0, path: 'https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg' },
        { id: 'forest', name: 'Forest', icon: '🌲', volume: 0, path: 'https://actions.google.com/sounds/v1/ambiences/jungle_atmosphere_morning.ogg' },
        { id: 'fire', name: 'Fire', icon: '🔥', volume: 0, path: 'https://actions.google.com/sounds/v1/ambiences/fire.ogg' },
        { id: 'waves', name: 'Waves', icon: '🌊', volume: 0, path: 'https://orangefreesounds.com/wp-content/uploads/2016/02/Sea-waves-sound.mp3' }
    ]);

    // Refs for audio elements
    const audioRefs = useRef({});

    const updateVolume = (id, newVolume) => {
        setSounds(sounds.map(s => s.id === id ? { ...s, volume: newVolume } : s));
        if (audioRefs.current[id]) {
            audioRefs.current[id].volume = newVolume;
            if (newVolume > 0 && audioRefs.current[id].paused) {
                audioRefs.current[id].play().catch(e => console.log('Audio play failed:', e));
            } else if (newVolume === 0 && !audioRefs.current[id].paused) {
                audioRefs.current[id].pause();
            }
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setIsOpen(!isOpen)}
                title="Ambience Mixer"
                style={{
                    position: 'fixed',
                    bottom: '2rem', // Match MusicPlayer desktop position (but on right)
                    right: '2rem',
                    zIndex: 2000,
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: 'white',
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; }}
            >
                {isOpen ? '✕' : '🎧'}
            </motion.button>
            <style>{`
                @media (max-width: 768px) {
                    button[title="Ambience Mixer"] {
                        bottom: 6rem !important;
                    }
                }
            `}</style>

            {/* Mixer Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        style={{
                            position: 'fixed',
                            bottom: '90px',
                            right: '2rem',
                            width: '280px',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '20px',
                            padding: '20px',
                            zIndex: 1000,
                            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                            border: '1px solid rgba(255,255,255,0.5)'
                        }}
                    >
                        <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem' }}>Ambience Mixer</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {sounds.map(sound => (
                                <div key={sound.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '1.5rem', width: '30px' }}>{sound.icon}</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={sound.volume}
                                        onChange={(e) => updateVolume(sound.id, parseFloat(e.target.value))}
                                        style={{ flex: 1, accentColor: 'var(--color-primary)' }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Hidden Audio Elements */}
                        {sounds.map(sound => (
                            <audio
                                key={sound.id}
                                ref={el => audioRefs.current[sound.id] = el}
                                src={sound.path}
                                loop
                            />
                        ))}

                        <div style={{ marginTop: '15px', fontSize: '0.8rem', color: '#888', textAlign: 'center' }}>
                            Mix sounds to create your space.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
