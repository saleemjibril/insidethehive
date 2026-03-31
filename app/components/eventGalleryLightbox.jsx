"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function EventGalleryLightbox({ images }) {
  const [active, setActive] = useState(null);

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

  if (!images?.length) return null;

  return (
    <>
      <div className="events-detail__gallery">
        {images.map((img, i) => (
          <button
            key={`${img.src}-${i}`}
            type="button"
            className="events-detail__gallery-item events-detail__gallery-trigger"
            onClick={() => setActive(i)}
            aria-label={`Open image ${i + 1} of ${images.length} in gallery view`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 565px) 100vw, (max-width: 1204px) 50vw, 33vw"
              className="events-detail__gallery-img"
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="events-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
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
              aria-label="Previous image"
            >
              ‹
            </button>
          ) : null}

          <div
            className="events-lightbox__stage"
            role="presentation"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active].src}
              alt={images[active].alt}
              fill
              className="events-lightbox__img"
              sizes="100vw"
              priority
            />
          </div>

          {images.length > 1 ? (
            <button
              type="button"
              className="events-lightbox__nav events-lightbox__nav--next"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next image"
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
      )}
    </>
  );
}
