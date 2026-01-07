import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MOOD_COLORS } from '../types/types';

export default function GlobalVibeScreen() {
    const navigate = useNavigate();

    // Generate random vibes (mock data representing other users)
    const vibes = useMemo(() => {
        const items = [];
        const moodKeys = Object.keys(MOOD_COLORS);

        for (let i = 0; i < 50; i++) {
            const mood = moodKeys[Math.floor(Math.random() * moodKeys.length)];
            items.push({
                id: i,
                color: MOOD_COLORS[mood],
                x: Math.random() * 100, // percentage
                y: Math.random() * 100, // percentage
                size: 20 + Math.random() * 60, // px
                duration: 5 + Math.random() * 10,
                delay: Math.random() * 5
            });
        }
        return items;
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'radial-gradient(circle at center, #1a1a2e 0%, #0f0f1a 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Nav & Info */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: 'var(--space-lg)', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <button
                    onClick={() => navigate(-1)}
                    className="card-glass"
                    style={{
                        color: 'white',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'rgba(255,255,255,0.1)'
                    }}
                >
                    ← Back
                </button>

                <div className="card-glass" style={{ padding: 'var(--space-md)', color: 'white', maxWidth: '300px' }}>
                    <h2 style={{ fontSize: '1.2rem', margin: '0 0 var(--space-xs) 0' }}>Global Vibes</h2>
                    <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.8 }}>
                        Live visualization of how the Sentiora community is feeling right now.
                    </p>
                </div>
            </div>

            {/* Glowing Orbs */}
            {vibes.map(orb => (
                <motion.div
                    key={orb.id}
                    initial={{
                        left: `${orb.x}%`,
                        top: `${orb.y}%`,
                        scale: 0,
                        opacity: 0
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.4, 0.7, 0.4],
                        x: [0, Math.random() * 50 - 25, 0],
                        y: [0, Math.random() * 50 - 25, 0],
                    }}
                    transition={{
                        duration: orb.duration,
                        repeat: Infinity,
                        delay: orb.delay,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'absolute',
                        width: `${orb.size}px`,
                        height: `${orb.size}px`,
                        borderRadius: '50%',
                        background: orb.color,
                        filter: `blur(${orb.size / 2}px)`,
                        boxShadow: `0 0 ${orb.size}px ${orb.color}`
                    }}
                />
            ))}

            {/* Center "Pulse" Text */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: 'white',
                zIndex: 5,
                pointerEvents: 'none'
            }}>
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
                        Connected
                    </h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
                        {vibes.length.toLocaleString()} souls breathing with you
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
