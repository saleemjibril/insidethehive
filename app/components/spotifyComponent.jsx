export default function SpotifyComponent({title = true}) {
    return (
        <div className="spotify-component">
{title && <div className="spotify-component__title">
    Listen on <span>Spotify!</span>
</div>}
        <iframe 
  style={{ borderRadius: "12px"}}
  src="https://open.spotify.com/embed/episode/5WaEASEPn4hUtfL5amzSzG?utm_source=generator&theme=0" 
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