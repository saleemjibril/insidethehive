import React from 'react';

export default function NewEpisodeMarquee() {
    // Generate repeated text items
    const generateItems = (count = 20) => {
        return Array.from({ length: count }, (_, i) => (
            <div key={i} className="marquee-item">
                New Episode every Friday 🐝
            </div>
        ));
    };

    return (
        <div className="new-episode-marquee">
            <div className="new-episode-marquee__slide1">
                <div className="marquee-track">
                    {generateItems()}
                </div>
                <div className="marquee-track">
                    {generateItems()}
                </div>
            </div>
            <div className="new-episode-marquee__slide2">
                <div className="marquee-track">
                    {generateItems()}
                </div>
                <div className="marquee-track">
                    {generateItems()}
                </div>
            </div>
            
           
        </div>
    );
}