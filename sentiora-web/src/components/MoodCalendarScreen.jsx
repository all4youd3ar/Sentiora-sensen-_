import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOODS, MOOD_COLORS, MOOD_ICONS } from '../types/types';

export default function MoodCalendarScreen() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);

    // Mock data generation for the current month
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-indexed

    // Get days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)

    // Generate random mood history for demo
    const moodHistory = {};
    const moodsList = Object.values(MOODS);

    // Seed with consistent random data for previous days
    for (let day = 1; day < currentDate.getDate(); day++) {
        // Simple hash for consistency
        const index = (day * 7 + 13) % moodsList.length;
        moodHistory[day] = moodsList[index];
    }
    // Set today
    moodHistory[currentDate.getDate()] = MOODS.CALM; // Or fetch from real state

    const days = [];
    // Padding for empty start days
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push({ day: null });
    }
    // Actual days
    for (let i = 1; i <= daysInMonth; i++) {
        days.push({
            day: i,
            mood: moodHistory[i],
            isToday: i === currentDate.getDate()
        });
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className="gradient-bg" style={{ minHeight: '100vh', padding: 'var(--space-lg)' }}>
            <div style={{ marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center' }}>
                <button onClick={() => navigate(-1)} className="btn-ghost" style={{ marginRight: 'var(--space-md)' }}>←</button>
                <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Mood History</h1>
            </div>

            <div className="card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{monthNames[month]} {year}</h2>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                        <button className="btn-ghost" disabled>‹</button>
                        <button className="btn-ghost" disabled>›</button>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 'var(--space-sm)', textAlign: 'center', marginBottom: 'var(--space-sm)' }}>
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                        <div key={i} style={{ fontSize: '0.9rem', color: 'var(--color-text-tertiary)', fontWeight: 'bold' }}>{d}</div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 'var(--space-sm)' }}>
                    {days.map((d, i) => (
                        <div
                            key={i}
                            onClick={() => d.day && setSelectedDate(d)}
                            style={{
                                aspectRatio: '1/1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                background: d.mood ? MOOD_COLORS[d.mood] : (d.day ? 'var(--color-bg-tertiary)' : 'transparent'),
                                color: d.mood ? '#333' : 'var(--color-text-secondary)',
                                fontWeight: d.isToday ? 'bold' : 'normal',
                                border: d.isToday ? '2px solid var(--color-primary)' : 'none',
                                cursor: d.day ? 'pointer' : 'default',
                                opacity: d.day ? 1 : 0,
                                position: 'relative',
                                fontSize: '0.9rem'
                            }}
                        >
                            {d.day}
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedDate && selectedDate.mood && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="card"
                        style={{ padding: 'var(--space-lg)' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-sm)' }}>
                            <img
                                src={MOOD_ICONS[selectedDate.mood]}
                                alt={selectedDate.mood}
                                style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                            />
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{monthNames[month]} {selectedDate.day}</h3>
                                <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>You felt <strong>{selectedDate.mood}</strong></p>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                            {/* In a real app, fetch journal notes for this day */}
                            Recorded at 2:30 PM. "Feeling grounded after a long walk."
                        </p>
                        <button
                            className="btn-ghost"
                            onClick={() => setSelectedDate(null)}
                            style={{ marginTop: 'var(--space-md)', width: '100%' }}
                        >
                            Close
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Helper to make AnimatePresence work without importing framer-motion in the code snippet above if it wasn't there? 
// No I added imports. 
import { motion, AnimatePresence } from 'framer-motion';
