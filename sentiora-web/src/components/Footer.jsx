import React from 'react';

export default function Footer() {
    return (
        <footer style={{
            padding: 'var(--space-2xl) var(--space-md)',
            textAlign: 'center',
            color: 'var(--color-text-secondary)',
            fontSize: '0.75rem',
            marginTop: 'var(--space-2xl)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2))'
        }}>
            <div style={{ marginBottom: 'var(--space-md)' }}>
                <p style={{ margin: '0 0 var(--space-xs) 0', opacity: 0.8 }}>
                    All emojis designed by <a href="https://openmoji.org/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>OpenMoji</a>
                </p>
                <p style={{ margin: 0, opacity: 0.6, fontSize: '0.7rem' }}>
                    The open-source emoji and icon project. License: CC BY-SA 4.0
                </p>
            </div>

            <div style={{
                display: 'inline-block',
                padding: 'var(--space-xs) var(--space-md)',
                background: 'rgba(255,215,0,0.1)',
                border: '1px solid rgba(255,215,0,0.2)',
                borderRadius: '20px',
                marginTop: 'var(--space-md)'
            }}>
                <p style={{ margin: 0, color: '#ffd700', fontWeight: '600', letterSpacing: '0.5px' }}>
                    CEO & Founder: Mahlale Molefi
                </p>
            </div>

            <p style={{ marginTop: 'var(--space-lg)', opacity: 0.4, fontSize: '0.65rem' }}>
                © {new Date().getFullYear()} Sentiora. All rights reserved.
            </p>
        </footer>
    );
}
