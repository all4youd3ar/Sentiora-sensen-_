import React from 'react';

const Logo = ({ size = 'large', color = '#FDFBF7' }) => {
    // Base dimensions for aspect ratio
    const baseWidth = 300;
    const baseHeight = 100;
    const maxWidth = size === 'large' ? '450px' : size === 'medium' ? '300px' : '100%';

    // Scale for font size calculation
    const scale = size === 'large' ? 1.5 : size === 'medium' ? 1 : 0.7;
    const strokeWidth = 8;

    return (
        <div className="logo-component" style={{
            position: 'relative',
            width: '100%',
            maxWidth: maxWidth,
            aspectRatio: `${baseWidth}/${baseHeight}`,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Wave SVG - Absolutely positioned to fill container */}
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${baseWidth} ${baseHeight}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 2, // Wave on top
                    overflow: 'visible'
                }}
            >
                {/* Sine Wave Path */}
                <path
                    d="M 30 55 Q 90 5 150 55 Q 210 105 270 55"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' }}
                />
            </svg>

            {/* Text - Centered in container */}
            <h1 style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: `clamp(0.5rem, ${3.2 * scale}rem, 12vw)`,
                fontWeight: '300',
                letterSpacing: '0.25em',
                color: 'transparent',
                WebkitTextStroke: `1px ${color}`,
                textTransform: 'uppercase',
                margin: 0,
                zIndex: 1,
                position: 'relative',
                textAlign: 'center',
                lineHeight: 1
            }}>
                Sentiora
            </h1>
        </div>
    );
};

export default Logo;
