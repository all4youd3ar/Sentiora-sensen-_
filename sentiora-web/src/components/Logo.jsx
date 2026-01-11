import React from 'react';

const Logo = ({ size = 'large', color = '#FDFBF7' }) => {
    // Scales for different uses
    const scale = size === 'large' ? 1.5 : size === 'medium' ? 1 : 0.7;
    const baseWidth = 300;
    const baseHeight = 100;

    // Use scale to determine the maximum size, but allow it to be relative
    const maxWidth = `${baseWidth * scale}px`;
    const strokeWidth = 8; // Thickness of the wave

    return (
        <div className="logo-component" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: '100%',
            maxWidth: maxWidth,
            margin: '0 auto'
        }}>
            {/* Wave SVG */}
            <svg
                width="100%"
                viewBox={`0 0 ${baseWidth} ${baseHeight}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    display: 'block',
                    height: 'auto',
                    zIndex: 1,
                    marginBottom: `-${10 * scale}px` // Pull text closer
                }}
            >
                {/* Sine Wave Path: Up, Down, Up */}
                <path
                    d="M 40 50 Q 90 -10 150 50 Q 210 110 260 50"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            {/* Text */}
            <h1 style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: `clamp(0.5rem, ${3 * scale}rem, 10vw)`, // Use clamp for better control
                fontWeight: '300',
                letterSpacing: '0.2em',
                color: 'transparent',
                WebkitTextStroke: `1px ${color}`,
                textTransform: 'uppercase',
                margin: 0,
                zIndex: 2,
                position: 'relative',
                textAlign: 'center',
                width: '100%'
            }}>
                Sentiora
            </h1>
        </div>
    );
};

export default Logo;
