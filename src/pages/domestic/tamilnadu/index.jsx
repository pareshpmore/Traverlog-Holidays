import React, { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Moon, Sparkles } from "lucide-react";
import { TOURS } from "./toursData";

/* ============================================================================
   TAMIL NADU TOURS
   ----------------------------------------------------------------------------
   This component only handles layout, cards, and the slider popup. All tour
   content (titles, images, itineraries) lives in ./toursData.js — edit that
   file to add, remove, or update tours. Nothing here needs to change.

   Highlight images: a highlight's `img` field can be a single url (shown
   centered, capped width) or an array of two urls (shown side-by-side in one
   row, each taking half the width, wrapping to stacked on narrow screens).
   ============================================================================ */

/* ---------- Small decorative gopuram-tier arch used on card tops ---------- */
function ArchAccent({ className = "" }) {
  return (
    <svg viewBox="0 0 200 40" className={className} preserveAspectRatio="none">
      <path
        d="M0 40 C 0 12, 30 0, 55 0 L 145 0 C 170 0, 200 12, 200 40 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* Renders a real photo when `src` is set, otherwise a placeholder gradient
   block with its label — used by both the card cover and slider. */
function TourImage({ image, className = "" }) {
  if (image.src) {
    return (
      <img
        src={image.src}
        alt={image.label}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  return <div className={`h-full w-full bg-gradient-to-br ${image.gradient} ${className}`} />;
}

function TourCard({ tour, onOpen }) {
  const cover = tour.images[0];
  return (
    <button
      onClick={() => onOpen(tour)}
      className="group relative text-left rounded-2xl overflow-hidden bg-[#FBF6EC] border border-[#3D1F0F]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A6402A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDE3CE]"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <TourImage image={cover} />
        <ArchAccent className="absolute -bottom-px left-0 w-full h-8 text-[#FBF6EC]" />
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/35 backdrop-blur px-3 py-1 text-[11px] tracking-wide uppercase text-[#F7EAD0]">
          <Moon size={12} strokeWidth={2} />
          {tour.duration}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1.5 text-[#A6402A] text-[11px] font-semibold tracking-[0.14em] uppercase mb-2">
          <MapPin size={13} strokeWidth={2.5} />
          {tour.region}
        </div>
        <h3
          className="text-[#3D1F0F] text-xl leading-snug mb-1.5"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {tour.title}
        </h3>
        <p className="text-[#0E5A6B]/80 text-sm leading-relaxed">{tour.tagline}</p>

        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0E5A6B] group-hover:gap-2 transition-all">
          View itinerary
          <ChevronRight size={16} strokeWidth={2.5} />
        </span>
      </div>
    </button>
  );
}

function Slider({ images }) {
  const [index, setIndex] = useState(0);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  const current = images[index];

  return (
    <div className="relative h-56 sm:h-72 w-full overflow-hidden rounded-t-2xl">
      <TourImage image={current} />

      {/* Caption bar — shown for real photos too, via a bottom gradient scrim */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
        <span
          className="block p-5 text-[#F7EAD0] text-lg sm:text-xl"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {current.label}
        </span>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full bg-black/35 text-white hover:bg-black/55 backdrop-blur transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full bg-black/35 text-white hover:bg-black/55 backdrop-blur transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-3 right-4 flex gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-[#C9A227]" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* Renders the photo(s) attached to a single highlight.
   - one url  -> centered, max-width block
   - two urls -> side-by-side row, each ~half width, adjusts on small screens */
function HighlightImages({ img }) {
  if (!img) return null;
  const urls = Array.isArray(img) ? img : [img];

  if (urls.length === 1) {
    return (
      <div className="mb-2 flex justify-center">
        <img
          src={urls[0]}
          alt=""
          className="w-full max-w-sm h-44 object-cover rounded-lg border border-[#3D1F0F]/10"
        />
      </div>
    );
  }

  return (
    <div className="mb-2 grid grid-cols-2 gap-2">
      {urls.map((u, i) => (
        <img
          key={i}
          src={u}
          alt=""
          className="w-full h-32 sm:h-36 object-cover rounded-lg border border-[#3D1F0F]/10"
        />
      ))}
    </div>
  );
}

function TourModal({ tour, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={tour.title}
    >
      <div
        className="absolute inset-0 bg-[#2A140A]/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl bg-[#FBF6EC] shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 grid place-items-center h-9 w-9 rounded-full bg-black/35 text-white hover:bg-black/55 backdrop-blur transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
        >
          <X size={18} />
        </button>

        <Slider images={tour.images} />

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-1.5 text-[#0E5A6B] text-[11px] font-semibold tracking-[0.14em] uppercase mb-2">
            <MapPin size={13} strokeWidth={2.5} />
            {tour.region} · {tour.duration}
          </div>
          <h2
            className="text-[#8A3018] text-2xl sm:text-3xl leading-tight mb-2"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {tour.title}
          </h2>
          <p className="text-[#3D1F0F]/70 text-sm sm:text-base mb-8">{tour.tagline}</p>

          {/* temple-trail itinerary timeline */}
          <div className="relative pl-9">
            <div className="absolute left-[13px] top-2 bottom-2 w-px bg-[repeating-linear-gradient(to_bottom,#C9A227_0,#C9A227_4px,transparent_4px,transparent_10px)]" />
            <div className="space-y-8">
              {tour.itinerary.map((d) => (
                <div key={d.day} className="relative">
                  <span className="absolute -left-9 top-0 grid place-items-center h-7 w-7 rounded-full bg-[#A6402A] text-[#F7EAD0] text-xs font-bold ring-4 ring-[#FBF6EC]">
                    {d.day}
                  </span>
                  <h3 className="text-[#0E5A6B] font-semibold text-base sm:text-lg mb-1">
                    Day {d.day}: {d.title}
                  </h3>
                  <p className="text-[#0E5A6B]/80 text-sm leading-relaxed mb-2">{d.body}</p>
                  {d.highlights.length > 0 && (
                    <ul className="space-y-4">
                      {d.highlights.map((h, i) => {
                        // A highlight can be a plain string (no photo) or
                        // { text, img } (with photo(s) shown above it).
                        const text = typeof h === "string" ? h : h.text;
                        const img = typeof h === "string" ? null : h.img;
                        return (
                          <li key={i}>
                            <HighlightImages img={img} />
                            <div className="flex gap-2">
                              {!img && (
                                <span className="shrink-0 mt-[3px]">
                                  <Sparkles size={14} className="text-[#C9A227]" />
                                </span>
                              )}
                              <span className="text-[#0E5A6B]/80 text-sm leading-relaxed">
                                {text}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-8 w-full sm:w-auto rounded-full bg-[#A6402A] hover:bg-[#8A3018] transition-colors text-[#F7EAD0] text-sm font-semibold px-6 py-3"
          >
            Enquire about this tour
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TamilNaduTours() {
  const [activeTour, setActiveTour] = useState(null);

  return (
    <div className="min-h-screen bg-[#EDE3CE] px-5 sm:px-10 py-14">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=Mukta:wght@400;500;600;700&display=swap');
        * { font-family: 'Mukta', sans-serif; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-[#A6402A] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            <Sparkles size={14} />
            Tamil Nadu Tours
          </div>
          <h1
            className="text-[#8A3018] text-4xl sm:text-5xl leading-tight"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Temples, shores and the road between them
          </h1>
          <p className="text-[#3D1F0F]/60 mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Tap any tour to see the full day-by-day itinerary and photos.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOURS.map((tour) => (
            <TourCard key={tour.id} tour={tour} onOpen={setActiveTour} />
          ))}
        </div>
      </div>

      {activeTour && <TourModal tour={activeTour} onClose={() => setActiveTour(null)} />}
    </div>
  );
}
