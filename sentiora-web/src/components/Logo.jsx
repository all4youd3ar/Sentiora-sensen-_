import React from 'react';

const Logo = ({ size = 'large', color = '#FDFBF7' }) => {
    // Base dimensions for aspect ratio of the vector graphic
    const baseWidth = 400;
    const baseHeight = 120;

    // Determine container max-width based on prop
    const maxWidth = size === 'large' ? '450px' : size === 'medium' ? '300px' : '100px';

    return (
        <div className="logo-component" style={{
            width: '100%',
            maxWidth: maxWidth,
            margin: '0 auto',
            // Uses the aspect ratio of the SVG viewbox to maintain shape
            aspectRatio: `${baseWidth}/${baseHeight}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${baseWidth} ${baseHeight}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'visible' }}
            >
                {/* 
                    TEXT: "SENTIORA"
                    Placed first so the wave overlays it.
                    Centered at x=200, y=65 (approx middle).
                    Using Quicksand font to match app.
                */}
                <text
                    x="200"
                    y="75"
                    textAnchor="middle"
                    domingantBaseline="middle"
                    fontFamily="'Quicksand', sans-serif"
                    fontSize="60"
                    fontWeight="300"
                    letterSpacing="12"
                    fill="transparent"
                    stroke={color}
                    strokeWidth="1.5"
                >
                    SENTIORA
                </text>

                {/* 
                    WAVE:
                    Spans slightly wider to encompass the text.
                    Text is centered at 200. Text width approx 360-380.
                    Wave should flow from ~20 to ~380.
                */}
                <path
                    d="M 20 65 Q 110 -15 200 65 Q 290 145 380 65"
                    stroke={color}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' }}
                />
            </svg>
        </div>
    );
};

export default Logo;
