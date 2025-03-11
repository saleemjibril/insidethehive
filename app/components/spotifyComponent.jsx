export default function SpotifyComponent(params) {
    return (
        <div className="spotify-component">
<div className="spotify-component__title">
    Listen on <span>Spotify!</span>
</div>
        <iframe 
  style={{ borderRadius: "12px"}}
  src="https://open.spotify.com/embed/episode/2LED1ovU0J44roNtRft0xX?utm_source=generator&theme=0" 
  width="100%" 
  height="352" 
  frameBorder="0" 
  allowFullScreen="" 
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
  loading="lazy"
></iframe>
        </div>
    )
} 