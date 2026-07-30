"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  getEventMediaPoster,
  isEventMediaVideo,
} from "../../lib/eventsData";
import { getOptimizedVideoUrl } from "../utils/videoUtils";

export default function EventGalleryLightbox({ images }) {
  const [active, setActive] = useState(null);
  const videoRef = useRef(null);

  const close = useCallback(() => setActive(null), []);

  const goPrev = useCallback(() => {
    setActive((i) => {
      if (i === null) return null;
      return i === 0 ? images.length - 1 : i - 1;
    });
  }, [images.length]);

  const goNext = useCallback(() => {
    setActive((i) => {
      if (i === null) return null;
      return i === images.length - 1 ? 0 : i + 1;
    });
  }, [images.length]);

  useEffect(() => {
    if (active === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, goPrev, goNext]);

  // Start playback after the lightbox opens (user gesture already happened).
  useEffect(() => {
    if (active === null) return undefined;
    const el = videoRef.current;
    if (!el) return undefined;
    el.load();
    const playPromise = el.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        // Autoplay with sound can be blocked; controls remain available.
      });
    }
    return undefined;
  }, [active]);

  if (!images?.length) return null;

  const activeItem = active !== null ? images[active] : null;
  const activeIsVideo = activeItem ? isEventMediaVideo(activeItem) : false;

  return (
    <>
      <div className="events-detail__gallery">
        {images.map((img, i) => {
          const video = isEventMediaVideo(img);
          const thumbSrc = video ? getEventMediaPoster(img) || img.src : img.src;
          const label = video
            ? `Open video ${i + 1} of ${images.length} in gallery view`
            : `Open image ${i + 1} of ${images.length} in gallery view`;

          return (
            <button
              key={`${img.src}-${i}`}
              type="button"
              className={`events-detail__gallery-item events-detail__gallery-trigger${
                video ? " events-detail__gallery-trigger--video" : ""
              }`}
              onClick={() => setActive(i)}
              aria-label={label}
            >
              {video && !getEventMediaPoster(img) ? (
                <video
                  className="events-detail__gallery-img events-detail__gallery-video-thumb"
                  src={getOptimizedVideoUrl(img.src)}
                  muted
                  playsInline
                  preload="metadata"
                  aria-hidden
                />
              ) : (
                <Image
                  src={thumbSrc}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 565px) 100vw, (max-width: 1204px) 50vw, 33vw"
                  className="events-detail__gallery-img"
                />
              )}
              {video ? (
                <span className="events-detail__gallery-play" aria-hidden>
                  <span className="events-detail__gallery-play__icon" />
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {active !== null && activeItem ? (
        <div
          className="events-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeIsVideo ? "Video gallery" : "Image gallery"}
        >
          <button
            type="button"
            className="events-lightbox__backdrop"
            onClick={close}
            aria-label="Close gallery"
          />

          <button
            type="button"
            className="events-lightbox__close"
            onClick={close}
            aria-label="Close"
          >
            ×
          </button>

          {images.length > 1 ? (
            <button
              type="button"
              className="events-lightbox__nav events-lightbox__nav--prev"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label={activeIsVideo ? "Previous media" : "Previous image"}
            >
              ‹
            </button>
          ) : null}

          <div
            className={`events-lightbox__stage${
              activeIsVideo ? " events-lightbox__stage--video" : ""
            }`}
            role="presentation"
            onClick={(e) => e.stopPropagation()}
          >
            {activeIsVideo ? (
              <video
                key={activeItem.src}
                ref={videoRef}
                className="events-lightbox__video"
                src={getOptimizedVideoUrl(activeItem.src)}
                poster={getEventMediaPoster(activeItem)}
                controls
                playsInline
                preload="auto"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={activeItem.src}
                alt={activeItem.alt}
                fill
                className="events-lightbox__img"
                sizes="100vw"
                priority
              />
            )}
          </div>

          {images.length > 1 ? (
            <button
              type="button"
              className="events-lightbox__nav events-lightbox__nav--next"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label={activeIsVideo ? "Next media" : "Next image"}
            >
              ›
            </button>
          ) : null}

          {images.length > 1 ? (
            <div className="events-lightbox__counter" aria-live="polite">
              {active + 1} / {images.length}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
