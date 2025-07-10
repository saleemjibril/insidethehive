"use client"
import React, { useEffect, useRef, useState } from 'react';

const NewEpisodeBanner = ({ 
  text = "NEW EPISODES EVERY WEDNESDAY", 
  speed = 10,
  reverse = false 
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [repeatCount, setRepeatCount] = useState(3);

  useEffect(() => {
    const calculateRepeatCount = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = window.innerWidth;
        const textWidth = textRef.current.offsetWidth;
        const count = Math.ceil(containerWidth / textWidth) + 1;
        setRepeatCount(count);
      }
    };

    calculateRepeatCount();
    window.addEventListener('resize', calculateRepeatCount);
    
    return () => window.removeEventListener('resize', calculateRepeatCount);
  }, []);

  return (
    <div className="sliding-text" style={{ '--speed': `${speed}s` }}>
      {/* Top Wave */}
      <div className="sliding-text__wave sliding-text__wave--top">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path className="sliding-text__wave-fill" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
          c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
          c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"/>
        </svg>
      </div>

      {/* Sliding Text Container */}
      <div 
        ref={containerRef}
        className={`sliding-text__container ${reverse ? 'sliding-text__container--reverse' : ''}`}
      >
        <div className="sliding-text__text-wrapper">
          <div ref={textRef} className="sliding-text__hidden-text">
            <h2 className="sliding-text__text">{text}</h2>
          </div>
          <div className="sliding-text__animated-text">
            {Array.from({ length: repeatCount }, (_, index) => (
              <h2 key={index} className="sliding-text__text">{text}</h2>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="sliding-text__wave sliding-text__wave--bottom">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path className="sliding-text__wave-fill" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
          c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
          c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"/>
        </svg>
      </div>
    </div>
  );
};

export default NewEpisodeBanner;