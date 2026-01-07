import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const quotes = [
    "Welcome to Sentiora.",
    "Your emotional clarity starts here.",
    "We're grateful you're here.",
    "Find calm. Find yourself.",
    "A space built for your inner peace."
  ];

  const backgroundImages = [
    "url('https://images.unsplash.com/photo-1490750967868-58cb75063ed4?q=80&w=2574&auto=format&fit=crop')",
    "url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop')",
    "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2673&auto=format&fit=crop')",
    "url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop')"
  ];

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);

    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(imageInterval);
    };
  }, []);

  const handleEnter = () => {
    navigate('/login');
  };

  return (
    <div className="welcome-container">
      {/* Background Slideshow */}
      {backgroundImages.map((bg, index) => (
        <div
          key={index}
          className={`bg-slideshow ${index === currentImageIndex ? 'active' : ''}`}
          style={{ background: bg }}
        />
      ))}

      {/* Glassmorphism Overlay */}
      <div className="overlay-full">
        <div className="glass-panel" style={{ background: 'transparent', boxShadow: 'none', border: 'none', backdropFilter: 'none' }}>
          <div className="welcome-content" style={{ textAlign: 'center', color: '#FDFBF7', zIndex: 2 }}>

            {/* Logo */}
            <div className="logo-container animate-fade-in" style={{ position: 'relative', marginBottom: '3rem', display: 'flex', justifyContent: 'center' }}>
              <Logo size="large" />
            </div>

            {/* Rotating Quotes */}
            <div className="quote-container" style={{
              height: '80px',
              marginBottom: '4rem',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {quotes.map((quote, index) => (
                <p
                  key={index}
                  className={`quote-text ${index === currentQuoteIndex ? 'active' : ''}`}
                  style={{
                    position: 'absolute',
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    color: 'rgba(253, 251, 247, 0.9)',
                    opacity: index === currentQuoteIndex ? 1 : 0,
                    transform: index === currentQuoteIndex ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'all 1s ease',
                    width: '100%',
                    margin: 0
                  }}
                >
                  {quote}
                </p>
              ))}
            </div>

            {/* Enter Button */}
            <button className="welcome-btn animate-scale-in" onClick={handleEnter}>
              Enter Sanctuary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
