import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOODS, MOOD_ICONS, MOOD_COLORS } from '../types/types';

export default function MoodInputScreen() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selectedMood, setSelectedMood] = useState(null);
    const [journalEntry, setJournalEntry] = useState('');
    const [isRecording, setIsRecording] = useState(false);

    const handleMoodSelect = (mood) => {
        setSelectedMood(mood);
        setStep(2);
    };

    const handleVoiceRecord = () => {
        setIsRecording(!isRecording);
        // Mock recording logic
        if (!isRecording) {
            setTimeout(() => {
                setJournalEntry(prev => prev + " (Voice note transcribed...)");
                setIsRecording(false);
            }, 2000);
        }
    };

    const handleNext = () => {
        if (step === 2) {
            setStep(3);
        } else if (step === 3) {
            navigate('/actions', { state: { mood: selectedMood } });
        }
    };

    const getInsight = (mood) => {
        // Mock AI insights
        const insights = {
            [MOODS.HAPPY]: "It's great that you're feeling happy! Hold onto this feeling and share it with others.",
            [MOODS.SAD]: "It sounds like you're going through a tough time. Remember, it's okay not to be okay.",
            [MOODS.ANGRY]: "Anger is a valid emotion. Try to channel this energy into something constructive.",
            [MOODS.CALM]: "Enjoy this moment of peace. It's a great time to reflect or just be.",
            // ... add more as needed
        };
        return insights[mood] || "Thank you for sharing your feelings. Listening to yourself is the first step.";
    };

    return (
        <div className="gradient-bg" style={{ minHeight: '100vh', padding: 'var(--space-xl)', paddingBottom: '100px' }}>
            {/* Progress Bar */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-2xl)' }}>
                {[1, 2, 3].map(s => (
                    <div key={s} style={{
                        flex: 1,
                        height: '4px',
                        background: s <= step ? 'var(--color-primary)' : 'var(--color-border)',
                        borderRadius: '2px',
                        transition: 'background var(--transition-base)'
                    }} />
                ))}
            </div>

            {step === 1 && (
                <div className="animate-fade-in">
                    <h2 style={{ fontSize: '1.75rem', marginBottom: 'var(--space-xl)' }}>How are you feeling right now?</h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 'var(--space-md)'
                    }}>
                        {Object.values(MOODS).map((mood) => (
                            <button
                                key={mood}
                                onClick={() => handleMoodSelect(mood)}
                                className="mood-card"
                                style={{
                                    '--mood-color': MOOD_COLORS[mood],
                                    width: '100%',
                                    aspectRatio: '1',
                                    padding: 'var(--space-md)'
                                }}
                            >
                                <img
                                    src={MOOD_ICONS[mood]}
                                    alt={mood}
                                    style={{ width: '60px', height: '60px', objectFit: 'contain', marginBottom: 'var(--space-sm)' }}
                                />
                                <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>{mood}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="animate-fade-in">
                    <h2 style={{ fontSize: '1.75rem', marginBottom: 'var(--space-md)' }}>Want to talk about it?</h2>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)' }}>
                        Write it down or record a voice note.
                    </p>

                    <div style={{ position: 'relative', marginBottom: 'var(--space-xl)' }}>
                        <textarea
                            value={journalEntry}
                            onChange={(e) => setJournalEntry(e.target.value)}
                            placeholder="I'm feeling..."
                            style={{
                                width: '100%',
                                height: '200px',
                                padding: 'var(--space-lg)',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--color-border)',
                                background: 'var(--color-surface)',
                                fontSize: '1rem',
                                resize: 'none',
                                fontFamily: 'inherit'
                            }}
                        />
                        <button
                            onClick={handleVoiceRecord}
                            style={{
                                position: 'absolute',
                                bottom: 'var(--space-md)',
                                right: 'var(--space-md)',
                                background: isRecording ? 'var(--color-error)' : 'var(--color-primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '48px',
                                height: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.25rem',
                                cursor: 'pointer',
                                transition: 'all var(--transition-base)',
                                boxShadow: 'var(--shadow-md)'
                            }}
                        >
                            {isRecording ? '⏹️' : '🎤'}
                        </button>
                    </div>

                    <button
                        onClick={handleNext}
                        className="btn btn-primary"
                        style={{ width: '100%', padding: 'var(--space-md)' }}
                    >
                        Continue
                    </button>
                </div>
            )}

            {step === 3 && (
                <div className="animate-fade-in">
                    <h2 style={{ fontSize: '1.75rem', marginBottom: 'var(--space-xl)' }}>Here's a thought for you</h2>

                    <div className="card" style={{
                        padding: 'var(--space-xl)',
                        background: 'linear-gradient(135deg, var(--color-surface), var(--color-bg-secondary))',
                        marginBottom: 'var(--space-2xl)',
                        border: '1px solid var(--color-primary)'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: 'var(--space-md)' }}>🤖</div>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--color-text-primary)' }}>
                            {getInsight(selectedMood)}
                        </p>
                    </div>

                    <button
                        onClick={handleNext}
                        className="btn btn-primary"
                        style={{ width: '100%', padding: 'var(--space-md)' }}
                    >
                        See Recommended Actions
                    </button>
                </div>
            )}
        </div>
    );
}
