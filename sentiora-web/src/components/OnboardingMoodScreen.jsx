import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOODS, MOOD_ICONS } from '../types/types';

export default function OnboardingMoodScreen() {
    const navigate = useNavigate();

    const moods = [
        { mood: MOODS.HAPPY, label: 'Happy' },
        { mood: MOODS.SAD, label: 'Sad' },
        { mood: MOODS.ANGRY, label: 'Angry' },
        { mood: MOODS.NEUTRAL, label: 'Neutral' },
        { mood: MOODS.ANXIOUS, label: 'Overwhelmed' },
        { mood: MOODS.ENERGETIC, label: 'Excited' }
    ];

    const handleMoodSelect = (mood) => {
        // Save initial mood if needed
        localStorage.setItem('initial_mood', mood.label);
        navigate('/');
    };

    return (
        <div className="gradient-bg" style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-xl)',
            textAlign: 'center'
        }}>
            <h2 className="animate-fade-in" style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: 'var(--space-3xl)',
                color: 'var(--color-text-primary)'
            }}>
                How are you coming into the app?
            </h2>

            <div className="animate-scale-in" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--space-xl)',
                marginBottom: 'var(--space-3xl)'
            }}>
                {moods.map((moodItem, index) => (
                    <button
                        key={moodItem.label}
                        onClick={() => handleMoodSelect(moodItem)}
                        style={{
                            background: 'var(--color-surface)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '80px',
                            height: '80px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: 'var(--shadow-md)',
                            transition: 'transform var(--transition-spring)',
                            animationDelay: `${index * 0.1}s`
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <img
                            src={MOOD_ICONS[moodItem.mood]}
                            alt={moodItem.label}
                            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                        />
                    </button>
                ))}
            </div>

            <p className="animate-fade-in" style={{
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--font-size-sm)',
                animationDelay: '0.5s'
            }}>
                This helps us personalize your experience.
            </p>
        </div>
    );
}
