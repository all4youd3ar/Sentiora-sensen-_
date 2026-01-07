import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

export default function VentScreen() {
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [isReleasing, setIsReleasing] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showPostRelease, setShowPostRelease] = useState(false);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    const prompts = [
        "What’s been weighing on you lately?",
        "What happened today that you can’t stop thinking about?",
        "Say the things you can’t say out loud.",
        "Let it out..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            if (!text) {
                setPlaceholderIndex((prev) => (prev + 1) % prompts.length);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [text]);

    const handleReleaseClick = () => {
        if (!text) return;
        setShowConfirmation(true);
    };

    const confirmRelease = () => {
        setShowConfirmation(false);
        setIsReleasing(true);

        // Visual effects
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ffffff', '#b8b8b8', '#e0e0e0'], // Soft/void colors
            disableForReducedMotion: true
        });

        setTimeout(() => {
            setText('');
            setIsReleasing(false);
            setShowPostRelease(true);
        }, 2000);
    };

    const handlePostReleaseAction = (action) => {
        if (action === 'home') navigate('/');
        if (action === 'new') {
            setShowPostRelease(false);
        }
    };

    if (showPostRelease) {
        return (
            <div className="gradient-bg" style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: 'var(--space-xl)',
                textAlign: 'center'
            }}>
                <div className="animate-scale-in" style={{ maxWidth: '600px' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: 'var(--space-md)' }}>You’re not alone.</h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: 'var(--space-2xl)', color: 'var(--color-text-secondary)' }}>
                        You did something brave by letting this out.
                    </p>

                    <div style={{ display: 'grid', gap: 'var(--space-md)', justifyContent: 'center' }}>
                        <button
                            onClick={() => navigate('/breathe')}
                            className="btn btn-secondary"
                            style={{ padding: 'var(--space-lg) var(--space-2xl)' }}
                        >
                            <span className="animate-pulse" style={{ marginRight: '8px' }}>🫶</span> Take a deep breath
                        </button>
                        <button
                            onClick={() => handlePostReleaseAction('new')}
                            className="btn btn-ghost"
                        >
                            Write another note
                        </button>
                        <button
                            onClick={() => handlePostReleaseAction('home')}
                            className="btn btn-ghost"
                        >
                            Return Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="gradient-bg" style={{
            minHeight: '100vh',
            padding: 'var(--space-xl)',
            paddingBottom: '100px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
        }}>
            <header style={{ marginBottom: 'var(--space-xl)' }}>
                <h1 className="animate-fade-in" style={{ fontSize: '2rem', marginBottom: 'var(--space-sm)' }}>
                    Vent Room 🌫️
                </h1>
                <p className="animate-fade-in" style={{ color: 'var(--color-text-secondary)', animationDelay: '0.1s' }}>
                    This is a safe space. Everything you write here is private, judgment-free, and will disappear into the void.
                </p>
            </header>

            <div className="animate-scale-in" style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-lg)',
                animationDelay: '0.2s'
            }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={prompts[placeholderIndex]}
                        style={{
                            width: '100%',
                            height: '100%',
                            minHeight: '300px',
                            padding: 'var(--space-lg)',
                            borderRadius: 'var(--radius-xl)',
                            border: 'none',
                            background: 'linear-gradient(to bottom right, rgba(255,255,255,0.6), rgba(255,255,255,0.4))',
                            fontSize: '1.1rem',
                            resize: 'none',
                            fontFamily: 'inherit',
                            transition: 'all 1s ease',
                            opacity: isReleasing ? 0 : 1,
                            transform: isReleasing ? 'translateY(-100px) scale(0.9)' : 'none',
                            filter: isReleasing ? 'blur(20px)' : 'none',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                        }}
                    />
                    <div style={{ position: 'absolute', bottom: 'var(--space-md)', right: 'var(--space-md)', display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>
                            {text.length} / ∞
                        </span>
                    </div>
                    <button
                        style={{
                            position: 'absolute',
                            bottom: 'var(--space-md)',
                            right: 'var(--space-md)',
                            background: 'var(--color-surface)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.25rem',
                            cursor: 'pointer',
                            boxShadow: 'var(--shadow-sm)'
                        }}
                        title="Voice Vent"
                    >
                        🎤
                    </button>
                </div>

            </div>

            <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    🔒 This note will auto-delete in 24 hours
                </p>
                <button
                    onClick={handleReleaseClick}
                    disabled={!text || isReleasing}
                    className="btn btn-primary"
                    style={{
                        width: '100%',
                        padding: 'var(--space-lg)',
                        fontSize: '1.1rem',
                        opacity: (!text || isReleasing) ? 0.5 : 1,
                        transition: 'all 0.3s ease'
                    }}
                >
                    {isReleasing ? 'Releasing...' : 'Release to the Void ✨'}
                </button>
            </div>


            {/* Confirmation Modal */}
            {
                showConfirmation && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        backdropFilter: 'blur(4px)'
                    }}>
                        <div className="card animate-scale-in" style={{ width: '90%', maxWidth: '400px', textAlign: 'center', padding: 'var(--space-xl)' }}>
                            <h3 style={{ marginBottom: 'var(--space-lg)' }}>Are you ready to let this go?</h3>
                            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
                                <button
                                    onClick={() => setShowConfirmation(false)}
                                    className="btn btn-ghost"
                                >
                                    Keep writing
                                </button>
                                <button
                                    onClick={confirmRelease}
                                    className="btn btn-primary"
                                >
                                    Release ✨
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
