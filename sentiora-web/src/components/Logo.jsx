import React from 'react';

const Logo = ({ size = 'large', color = '#FDFBF7' }) => {
    // Scales for different uses
    const scale = size === 'large' ? 1.5 : size === 'medium' ? 1 : 0.7;
    const width = 300 * scale;
    const height = 100 * scale;
    const strokeWidth = 8; // Thickness of the wave

    return (
        <div className="logo-component" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: `${width}px`,
            // height: `${height}px`
        }}>
            {/* Wave SVG */}
            <svg
                width={width}
                height={height}
                viewBox="0 0 300 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1
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
                fontSize: `${3 * scale}rem`,
                fontWeight: '300', // Light/Regular for that outlined feel (simulated with standard font for now)
                letterSpacing: '0.2em',
                color: 'transparent', // Transparent fill
                WebkitTextStroke: `1px ${color}`, // Outline effect
                textTransform: 'uppercase',
                margin: 0,
                marginTop: `${20 * scale}px`, // Push text down below the wave
                zIndex: 2,
                position: 'relative'
            }}>
                Sentiora
            </h1>
        </div>
    );
};

export default Logo;
