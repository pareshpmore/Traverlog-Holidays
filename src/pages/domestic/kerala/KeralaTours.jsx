// import React, { useState, useEffect, useCallback } from "react";
// import { X, ChevronLeft, ChevronRight, MapPin, Moon, Sparkles } from "lucide-react";
// import { TOURS } from "./toursData";

// /* ============================================================================
//    KERALA TOURS
//    ----------------------------------------------------------------------------
//    This component only handles layout, cards, and the slider popup. All tour
//    content (titles, images, itineraries) lives in ./toursData.js — edit that
//    file to add, remove, or update tours. Nothing here needs to change.

//    Highlight images: a highlight's `img` field can be a single url (shown
//    centered, capped width) or an array of two urls (shown side-by-side in one
//    row, each taking half the width, wrapping to stacked on narrow screens).
//    ============================================================================ */

// /* ---------- Small decorative palm-leaf arch used on card tops ------------- */
// function ArchAccent({ className = "" }) {
//   return (
//     <svg viewBox="0 0 200 40" className={className} preserveAspectRatio="none">
//       <path
//         d="M0 40 C 0 12, 30 0, 55 0 L 145 0 C 170 0, 200 12, 200 40 Z"
//         fill="currentColor"
//       />
//     </svg>
//   );
// }

// /* Renders a real photo when `src` is set, otherwise a placeholder gradient
//    block with its label — used by both the card cover and slider. */
// function TourImage({ image, className = "" }) {
//   if (image.src) {
//     return (
//       <img
//         src={image.src}
//         alt={image.label}
//         className={`h-full w-full object-cover ${className}`}
//       />
//     );
//   }
//   return <div className={`h-full w-full bg-gradient-to-br ${image.gradient} ${className}`} />;
// }

// function TourCard({ tour, onOpen }) {
//   const cover = tour.images[0];
//   return (
//     <button
//       onClick={() => onOpen(tour)}
//       className="group relative text-left rounded-2xl overflow-hidden bg-[#FBFAF1] border border-[#0B3D2E]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F7A55] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E9F0DE]"
//     >
//       <div className="relative h-44 w-full overflow-hidden">
//         <TourImage image={cover} />
//         <ArchAccent className="absolute -bottom-px left-0 w-full h-8 text-[#FBFAF1]" />
//         <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/35 backdrop-blur px-3 py-1 text-[11px] tracking-wide uppercase text-[#F3EFD9]">
//           <Moon size={12} strokeWidth={2} />
//           {tour.duration}
//         </span>
//       </div>

//       <div className="p-5">
//         <div className="flex items-center gap-1.5 text-[#0F7A55] text-[11px] font-semibold tracking-[0.14em] uppercase mb-2">
//           <MapPin size={13} strokeWidth={2.5} />
//           {tour.region}
//         </div>
//         <h3
//           className="text-[#0B3D2E] text-xl leading-snug mb-1.5"
//           style={{ fontFamily: "'Yeseva One', serif" }}
//         >
//           {tour.title}
//         </h3>
//         <p className="text-[#045C67]/80 text-sm leading-relaxed">{tour.tagline}</p>

//         <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#045C67] group-hover:gap-2 transition-all">
//           View itinerary
//           <ChevronRight size={16} strokeWidth={2.5} />
//         </span>
//       </div>
//     </button>
//   );
// }

// function Slider({ images }) {
//   const [index, setIndex] = useState(0);

//   const prev = useCallback(
//     () => setIndex((i) => (i - 1 + images.length) % images.length),
//     [images.length]
//   );
//   const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

//   const current = images[index];

//   return (
//     <div className="relative h-56 sm:h-72 w-full overflow-hidden rounded-t-2xl">
//       <TourImage image={current} />

//       {/* Caption bar — shown for real photos too, via a bottom gradient scrim */}
//       <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
//         <span
//           className="block p-5 text-[#F3EFD9] text-lg sm:text-xl"
//           style={{ fontFamily: "'Yeseva One', serif" }}
//         >
//           {current.label}
//         </span>
//       </div>

//       {images.length > 1 && (
//         <>
//           <button
//             onClick={prev}
//             aria-label="Previous photo"
//             className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full bg-black/35 text-white hover:bg-black/55 backdrop-blur transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
//           >
//             <ChevronLeft size={18} />
//           </button>
//           <button
//             onClick={next}
//             aria-label="Next photo"
//             className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full bg-black/35 text-white hover:bg-black/55 backdrop-blur transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
//           >
//             <ChevronRight size={18} />
//           </button>

//           <div className="absolute bottom-3 right-4 flex gap-1.5">
//             {images.map((_, i) => (
//               <span
//                 key={i}
//                 className={`h-1.5 rounded-full transition-all ${
//                   i === index ? "w-5 bg-[#C9A227]" : "w-1.5 bg-white/50"
//                 }`}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// /* Renders the photo(s) attached to a single highlight.
//    - one url  -> centered, max-width block
//    - two urls -> side-by-side row, each ~half width, adjusts on small screens */
// function HighlightImages({ img }) {
//   if (!img) return null;
//   const urls = Array.isArray(img) ? img : [img];

//   if (urls.length === 1) {
//     return (
//       <div className="mb-2 flex justify-center">
//         <img
//           src={urls[0]}
//           alt=""
//           className="w-full max-w-sm h-44 object-cover rounded-lg border border-[#0B3D2E]/10"
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="mb-2 grid grid-cols-2 gap-2">
//       {urls.map((u, i) => (
//         <img
//           key={i}
//           src={u}
//           alt=""
//           className="w-full h-32 sm:h-36 object-cover rounded-lg border border-[#0B3D2E]/10"
//         />
//       ))}
//     </div>
//   );
// }

// function TourModal({ tour, onClose }) {
//   useEffect(() => {
//     const onKey = (e) => e.key === "Escape" && onClose();
//     document.addEventListener("keydown", onKey);
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.removeEventListener("keydown", onKey);
//       document.body.style.overflow = "";
//     };
//   }, [onClose]);

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
//       role="dialog"
//       aria-modal="true"
//       aria-label={tour.title}
//     >
//       <div
//         className="absolute inset-0 bg-[#0B2A20]/70 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       <div className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl bg-[#FBFAF1] shadow-2xl">
//         <button
//           onClick={onClose}
//           aria-label="Close"
//           className="absolute top-3 right-3 z-10 grid place-items-center h-9 w-9 rounded-full bg-black/35 text-white hover:bg-black/55 backdrop-blur transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
//         >
//           <X size={18} />
//         </button>

//         <Slider images={tour.images} />

//         <div className="p-6 sm:p-8">
//           <div className="flex items-center gap-1.5 text-[#045C67] text-[11px] font-semibold tracking-[0.14em] uppercase mb-2">
//             <MapPin size={13} strokeWidth={2.5} />
//             {tour.region} · {tour.duration}
//           </div>
//           <h2
//             className="text-[#0F7A55] text-2xl sm:text-3xl leading-tight mb-2"
//             style={{ fontFamily: "'Yeseva One', serif" }}
//           >
//             {tour.title}
//           </h2>
//           <p className="text-[#0B3D2E]/70 text-sm sm:text-base mb-8">{tour.tagline}</p>

//           {/* backwater-trail itinerary timeline */}
//           <div className="relative pl-9">
//             <div className="absolute left-[13px] top-2 bottom-2 w-px bg-[repeating-linear-gradient(to_bottom,#C9A227_0,#C9A227_4px,transparent_4px,transparent_10px)]" />
//             <div className="space-y-8">
//               {tour.itinerary.map((d) => (
//                 <div key={d.day} className="relative">
//                   <span className="absolute -left-9 top-0 grid place-items-center h-7 w-7 rounded-full bg-[#0F7A55] text-[#F3EFD9] text-xs font-bold ring-4 ring-[#FBFAF1]">
//                     {d.day}
//                   </span>
//                   <h3 className="text-[#045C67] font-semibold text-base sm:text-lg mb-1">
//                     Day {d.day}: {d.title}
//                   </h3>
//                   <p className="text-[#045C67]/80 text-sm leading-relaxed mb-2">{d.body}</p>
//                   {d.highlights.length > 0 && (
//                     <ul className="space-y-4">
//                       {d.highlights.map((h, i) => {
//                         // A highlight can be a plain string (no photo) or
//                         // { text, img } (with photo(s) shown above it).
//                         const text = typeof h === "string" ? h : h.text;
//                         const img = typeof h === "string" ? null : h.img;
//                         return (
//                           <li key={i}>
//                             <HighlightImages img={img} />
//                             <div className="flex gap-2">
//                               {!img && (
//                                 <span className="shrink-0 mt-[3px]">
//                                   <Sparkles size={14} className="text-[#C9A227]" />
//                                 </span>
//                               )}
//                               <span className="text-[#045C67]/80 text-sm leading-relaxed">
//                                 {text}
//                               </span>
//                             </div>
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={onClose}
//             className="mt-8 w-full sm:w-auto rounded-full bg-[#0F7A55] hover:bg-[#0B5D3F] transition-colors text-[#F3EFD9] text-sm font-semibold px-6 py-3"
//           >
//             Enquire about this tour
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function KeralaTours() {
//   const [activeTour, setActiveTour] = useState(null);

//   return (
//     <div className="min-h-screen bg-[#E9F0DE] px-5 sm:px-10 py-14">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Yeseva+One&family=Mukta:wght@400;500;600;700&display=swap');
//         * { font-family: 'Mukta', sans-serif; }
//       `}</style>

//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-1.5 text-[#0F7A55] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
//             <Sparkles size={14} />
//             Kerala Tours
//           </div>
//           <h1
//             className="text-[#0B3D2E] text-4xl sm:text-5xl leading-tight"
//             style={{ fontFamily: "'Yeseva One', serif" }}
//           >
//             God's Own Country, at your pace
//           </h1>
//           <p className="text-[#0B3D2E]/60 mt-3 max-w-xl mx-auto text-sm sm:text-base">
//             Tap any tour to see the full day-by-day itinerary and photos.
//           </p>
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {TOURS.map((tour) => (
//             <TourCard key={tour.id} tour={tour} onOpen={setActiveTour} />
//           ))}
//         </div>
//       </div>

//       {activeTour && <TourModal tour={activeTour} onClose={() => setActiveTour(null)} />}
//     </div>
//   );
// }


import React, { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Moon, Sparkles, Check } from "lucide-react";
import { TOURS } from "./toursData";

/* ============================================================================
   KERALA TOURS
   ----------------------------------------------------------------------------
   This component only handles layout, cards, and the slider popup. All tour
   content (titles, images, itineraries) lives in ./toursData.js — edit that
   file to add, remove, or update tours. Nothing here needs to change.

   Highlight images: a highlight's `img` field can be a single url (shown
   centered, capped width) or an array of two urls (shown side-by-side in one
   row, each taking half the width, wrapping to stacked on narrow screens).

   Optional per-tour fields used by the details panel below the itinerary
   (all are optional — sensible defaults are used if a tour doesn't set them):
     tour.description  -> longer text shown when "Read more" is expanded
     tour.inclusions   -> string[] shown under "Inclusions"
     tour.exclusions   -> string[] shown under "Exclusions"
     tour.cost         -> e.g. "₹22,000 / person"
     tour.costNote     -> small note next to the cost, e.g. "twin sharing"
   ============================================================================ */

const DEFAULT_INCLUSIONS = [
  "Accommodation as per itinerary",
  "Daily breakfast",
  "Private air-conditioned transport",
  "Houseboat / sightseeing entry fees",
  "Dedicated tour coordinator",
];

const DEFAULT_EXCLUSIONS = [
  "Airfare / train fare to base city",
  "Lunch & dinner (unless noted)",
  "Personal expenses & tips",
  "Travel insurance",
  "Anything not mentioned under inclusions",
];

/* ---------- Small decorative palm-leaf arch used on card tops ------------- */
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
      className="group relative text-left rounded-2xl overflow-hidden bg-[#FBFAF1] border border-[#0B3D2E]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F7A55] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E9F0DE]"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <TourImage image={cover} />
        <ArchAccent className="absolute -bottom-px left-0 w-full h-8 text-[#FBFAF1]" />
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/35 backdrop-blur px-3 py-1 text-[11px] tracking-wide uppercase text-[#F3EFD9]">
          <Moon size={12} strokeWidth={2} />
          {tour.duration}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1.5 text-[#0F7A55] text-[11px] font-semibold tracking-[0.14em] uppercase mb-2">
          <MapPin size={13} strokeWidth={2.5} />
          {tour.region}
        </div>
        <h3
          className="text-[#0B3D2E] text-xl leading-snug mb-1.5"
          style={{ fontFamily: "'Yeseva One', serif" }}
        >
          {tour.title}
        </h3>
        <p className="text-[#045C67]/80 text-sm leading-relaxed">{tour.tagline}</p>

        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#045C67] group-hover:gap-2 transition-all">
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
          className="block p-5 text-[#F3EFD9] text-lg sm:text-xl"
          style={{ fontFamily: "'Yeseva One', serif" }}
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
          className="w-full max-w-sm h-44 object-cover rounded-lg border border-[#0B3D2E]/10"
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
          className="w-full h-32 sm:h-36 object-cover rounded-lg border border-[#0B3D2E]/10"
        />
      ))}
    </div>
  );
}

function TourModal({ tour, onClose }) {
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const hasLongDescription = tour.description && tour.description !== tour.tagline;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={tour.title}
    >
      <div
        className="absolute inset-0 bg-[#0B2A20]/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl bg-[#FBFAF1] shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 grid place-items-center h-9 w-9 rounded-full bg-black/35 text-white hover:bg-black/55 backdrop-blur transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
        >
          <X size={18} />
        </button>

        <Slider images={tour.images} />

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-1.5 text-[#045C67] text-[11px] font-semibold tracking-[0.14em] uppercase mb-2">
            <MapPin size={13} strokeWidth={2.5} />
            {tour.region} · {tour.duration}
          </div>
          <h2
            className="text-[#0F7A55] text-2xl sm:text-3xl leading-tight mb-2"
            style={{ fontFamily: "'Yeseva One', serif" }}
          >
            {tour.title}
          </h2>
          <p className="text-[#0B3D2E]/70 text-sm sm:text-base mb-8">{tour.tagline}</p>

          {/* backwater-trail itinerary timeline */}
          <div className="relative pl-9">
            <div className="absolute left-[13px] top-2 bottom-2 w-px bg-[repeating-linear-gradient(to_bottom,#C9A227_0,#C9A227_4px,transparent_4px,transparent_10px)]" />
            <div className="space-y-8">
              {tour.itinerary.map((d) => (
                <div key={d.day} className="relative">
                  <span className="absolute -left-9 top-0 grid place-items-center h-7 w-7 rounded-full bg-[#0F7A55] text-[#F3EFD9] text-xs font-bold ring-4 ring-[#FBFAF1]">
                    {d.day}
                  </span>
                  <h3 className="text-[#045C67] font-semibold text-base sm:text-lg mb-1">
                    Day {d.day}: {d.title}
                  </h3>
                  <p className="text-[#045C67]/80 text-sm leading-relaxed mb-2">{d.body}</p>
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
                              <span className="text-[#045C67]/80 text-sm leading-relaxed">
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

          {/* ---------------------------------------------------------------
              Details & Inquiry — shown after all itinerary days.
              Left: tagline / read-more, inclusions, exclusions, cost.
              Right: inquiry panel with its own call-to-action.
              --------------------------------------------------------------- */}
          <div className="mt-10 pt-8 border-t border-[#0B3D2E]/10 grid sm:grid-cols-2 gap-5">
            {/* Left column */}
            <div className="rounded-xl bg-[#0B3D2E]/[0.03] border border-[#0B3D2E]/10 p-5 sm:p-6">
              <p className="text-[#045C67]/80 text-sm leading-relaxed">
                {showFull ? tour.description || tour.tagline : tour.tagline}
              </p>
              {hasLongDescription && (
                <button
                  onClick={() => setShowFull((s) => !s)}
                  className="mt-1.5 text-xs font-semibold text-[#0F7A55] hover:underline focus:outline-none"
                >
                  {showFull ? "Show less" : "Read more"}
                </button>
              )}

              <div className="grid grid-cols-2 gap-4 mt-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0F7A55] mb-2">
                    Inclusions
                  </p>
                  <ul className="space-y-1.5">
                    {(tour.inclusions || DEFAULT_INCLUSIONS).map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-1.5 text-xs text-[#0B3D2E]/75 leading-snug"
                      >
                        <Check size={12} strokeWidth={3} className="mt-[2px] text-green-700 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0F7A55] mb-2">
                    Exclusions
                  </p>
                  <ul className="space-y-1.5">
                    {(tour.exclusions || DEFAULT_EXCLUSIONS).map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-1.5 text-xs text-[#0B3D2E]/75 leading-snug"
                      >
                        <X size={12} strokeWidth={3} className="mt-[2px] text-red-600/80 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mt-5 pt-4 border-t border-[#0B3D2E]/10">
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0F7A55]">
                  Cost
                </span>
                <span className="text-lg font-bold text-[#0B3D2E]">
                  {tour.cost || "On request"}
                </span>
                {tour.costNote && (
                  <span className="text-xs text-[#0B3D2E]/50">{tour.costNote}</span>
                )}
              </div>
            </div>

            {/* Right column */}
            <div className="rounded-xl bg-gradient-to-br from-[#0F7A55] to-[#0B3D2E] p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F3EFD9]/70 mb-2">
                  Inquiry
                </p>
                <h4
                  className="text-[#F3EFD9] text-lg leading-snug mb-2"
                  style={{ fontFamily: "'Yeseva One', serif" }}
                >
                  Inquiry about {tour.title}
                </h4>
                <p className="text-[#F3EFD9]/75 text-sm leading-relaxed">
                  Share your travel dates and group size — we'll send a tailored quote and answer any questions.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-6 w-full rounded-full bg-[#F3EFD9] hover:bg-white transition-colors text-[#0B3D2E] text-sm font-semibold px-6 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F3EFD9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B3D2E]"
              >
                Send Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KeralaTours() {
  const [activeTour, setActiveTour] = useState(null);

  return (
    <div className="min-h-screen bg-[#E9F0DE] px-5 sm:px-10 py-14">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yeseva+One&family=Mukta:wght@400;500;600;700&display=swap');
        * { font-family: 'Mukta', sans-serif; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-[#0F7A55] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            <Sparkles size={14} />
            Kerala Tours
          </div>
          <h1
            className="text-[#0B3D2E] text-4xl sm:text-5xl leading-tight"
            style={{ fontFamily: "'Yeseva One', serif" }}
          >
            God's Own Country, at your pace
          </h1>
          <p className="text-[#0B3D2E]/60 mt-3 max-w-xl mx-auto text-sm sm:text-base">
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