import React, { useState } from 'react';

export default function CompatibilityScreen() {
    const [friendName, setFriendName] = useState('');
    const [result, setResult] = useState(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const calculateCompatibility = () => {
        if (!friendName) return;
        setIsCalculating(true);

        // Mock calculation
        setTimeout(() => {
            const score = Math.floor(Math.random() * (100 - 60 + 1)) + 60; // Random score between 60 and 100
            setResult({
                score,
                message: score > 80 ? "Soulmates! 🌟" : "Great Vibes! ✨"
            });
            setIsCalculating(false);
        }, 2000);
    };

    return (
        <div className="gradient-bg" style={{ minHeight: '100vh', padding: 'var(--space-xl)', paddingBottom: '100px' }}>
            <header style={{ marginBottom: 'var(--space-2xl)' }}>
                <h1 className="animate-fade-in" style={{ fontSize: '2rem', marginBottom: 'var(--space-sm)' }}>
                    Emotion Match
                </h1>
                <p className="animate-fade-in" style={{ color: 'var(--color-text-secondary)', animationDelay: '0.1s' }}>
                    See how your vibes align with friends.
                </p>
            </header>

            <div className="card animate-scale-in" style={{
                padding: 'var(--space-xl)',
                textAlign: 'center',
                animationDelay: '0.2s',
                maxWidth: '500px',
                margin: '0 auto'
            }}>
                {!result ? (
                    <>
                        <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)' }}>🤝</div>
                        <input
                            type="text"
                            value={friendName}
                            onChange={(e) => setFriendName(e.target.value)}
                            placeholder="Enter friend's name"
                            className="input"
                            style={{ marginBottom: 'var(--space-lg)', textAlign: 'center', fontSize: '1.2rem' }}
                        />
                        <button
                            onClick={calculateCompatibility}
                            disabled={!friendName || isCalculating}
                            className="btn btn-primary"
                            style={{ width: '100%', fontSize: '1.1rem', padding: 'var(--space-md)' }}
                        >
                            {isCalculating ? 'Analyzing Vibes...' : 'Check Compatibility'}
                        </button>
                    </>
                ) : (
                    <div className="animate-scale-in">
                        <div style={{
                            position: 'relative',
                            height: '200px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 'var(--space-lg)'
                        }}>
                            {/* Venn Diagram Mock */}
                            <div style={{
                                width: '150px',
                                height: '150px',
                                borderRadius: '50%',
                                background: 'var(--color-primary)',
                                opacity: 0.6,
                                position: 'absolute',
                                left: '50px'
                            }} />
                            <div style={{
                                width: '150px',
                                height: '150px',
                                borderRadius: '50%',
                                background: 'var(--color-accent)',
                                opacity: 0.6,
                                position: 'absolute',
                                right: '50px'
                            }} />
                            <div style={{
                                zIndex: 1,
                                fontSize: '2.5rem',
                                fontWeight: '800',
                                color: 'white',
                                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}>
                                {result.score}%
                            </div>
                        </div>

                        <h2 style={{ marginBottom: 'var(--space-md)' }}>{result.message}</h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)' }}>
                            You and {friendName} are emotionally aligned today.
                        </p>

                        <button
                            onClick={() => { setResult(null); setFriendName(''); }}
                            className="btn-ghost"
                        >
                            Check Another Friend
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
