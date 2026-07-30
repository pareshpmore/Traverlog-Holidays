// // src/pages/CabBooking.jsx
// import React, { useState } from 'react';
// import { formatPrice } from '../utils/formatters';

// const CabBooking = () => {
//   const [tripType, setTripType] = useState('one-way');

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Cab Booking</h1>
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <div className="flex space-x-4 mb-6">
//           <button
//             onClick={() => setTripType('one-way')}
//             className={`px-4 py-2 rounded-md ${
//               tripType === 'one-way' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
//             }`}
//           >
//             One Way
//           </button>
//           <button
//             onClick={() => setTripType('round-trip')}
//             className={`px-4 py-2 rounded-md ${
//               tripType === 'round-trip' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
//             }`}
//           >
//             Round Trip
//           </button>
//           <button
//             onClick={() => setTripType('local')}
//             className={`px-4 py-2 rounded-md ${
//               tripType === 'local' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
//             }`}
//           >
//             Local
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
//             <input
//               type="text"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter pickup location"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Drop Location</label>
//             <input
//               type="text"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter drop location"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date & Time</label>
//             <div className="flex">
//               <input
//                 type="date"
//                 className="w-1/2 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <input
//                 type="time"
//                 className="w-1/2 px-3 py-2 border-t border-b border-r border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//           <div className="flex items-end">
//             <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
//               Search Cabs
//             </button>
//           </div>
//         </div>

//         {tripType === 'round-trip' && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Return Date & Time</label>
//               <div className="flex">
//                 <input
//                   type="date"
//                   className="w-1/2 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <input
//                   type="time"
//                   className="w-1/2 px-3 py-2 border-t border-b border-r border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-xl font-semibold mb-6">Available Cabs</h2>
//         <div className="space-y-6">
//           {[
//             {
//               name: 'Hatchback',
//               image: '/images/cabs/hatchback.jpg',
//               price: '12',
//               features: ['Upto 3 people', '2 Bags', 'AC', 'Free Cancellation'],
//             },
//             {
//               name: 'Sedan',
//               image: '/images/cabs/sedan.jpg',
//               price: '15',
//               features: ['Upto 4 people', '2 Bags', 'AC', 'Free Cancellation'],
//             },
//             {
//               name: 'SUV',
//               image: '/images/cabs/suv.jpg',
//               price: '20',
//               features: ['Upto 6 people', '4 Bags', 'AC', 'Free Cancellation'],
//             },
//           ].map((cab, index) => (
//             <div
//               key={index}
//               className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
//             >
//               <div className="md:flex">
//                 <div className="md:flex-shrink-0 md:w-48 h-48">
//                   <img
//                     className="h-full w-full object-cover"
//                     src={cab.image}
//                     alt={cab.name}
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = '/images/placeholder-cab.jpg';
//                     }}
//                   />
//                 </div>
//                 <div className="p-6 flex-1">
//                   <div className="flex flex-col md:flex-row md:justify-between">
//                     <div>
//                       <h3 className="text-xl font-semibold mb-2">{cab.name}</h3>
//                       <div className="flex flex-wrap gap-2 mb-4">
//                         {cab.features.map((feature, i) => (
//                           <span
//                             key={i}
//                             className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
//                           >
//                             {feature}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-2xl font-bold mb-1">{formatPrice(cab.price)}/km</div>
//                       <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
//                         Book Now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CabBooking;

import { useState, useEffect } from "react";
import {
  login, findPlaces, getPrices, createOrder, getPaymentUrl,
} from "../services/iwayApi";

// ─────────────────────────────────────────────────────────────
// i'way vehicle class definitions
// ─────────────────────────────────────────────────────────────
const VEHICLE_MAP = {
  standard: {
    name: "Standard",
    example: "Toyota Prius or similar",
    passengers: 3,
    luggage: 3,
    image: "https://iway.io/images/cars/nsqp0wtfqz.png",
    fallbackEmoji: "🚗",
    features: ["Professional driver", "Meet & Greet", "Flight tracking"],
    rating: "4.5 and above",
  },
  business: {
    name: "Business",
    example: "Mercedes E-Class or similar",
    passengers: 3,
    luggage: 3,
    image: "https://iway.io/images/cars/amd0cs80bm.png",
    fallbackEmoji: "🚙",
    features: ["Professional driver", "Meet & Greet", "Flight tracking", "Premium vehicle"],
    rating: "4.7 and above",
  },
  business_suv: {
    name: "Business SUV",
    example: "Mercedes GLE or similar",
    passengers: 5,
    luggage: 5,
    image: "https://iway.io/images/cars/b2df3e59n8.png",
    fallbackEmoji: "🚙",
    features: ["Professional driver", "Meet & Greet", "Flight tracking", "SUV"],
    rating: "4.7 and above",
  },
  minivan: {
    name: "Minivan",
    example: "Mercedes Vito or similar",
    passengers: 7,
    luggage: 7,
    image: "https://iway.io/images/cars/a9lheg0hi9.png",
    fallbackEmoji: "🚐",
    features: ["Professional driver", "Meet & Greet", "Flight tracking", "Extra space"],
    rating: "4.5 and above",
  },
  minibus: {
    name: "Minibus",
    example: "Mercedes Sprinter or similar",
    passengers: 12,
    luggage: 12,
    image: "https://iway.io/images/cars/81lcyvyrys.png",
    fallbackEmoji: "🚌",
    features: ["Professional driver", "Meet & Greet", "Flight tracking", "Group travel"],
    rating: "4.5 and above",
  },
  vip: {
    name: "VIP",
    example: "Mercedes S-Class or similar",
    passengers: 3,
    luggage: 2,
    image: "https://iway.io/images/cars/gzgx1eeop8.png",
    fallbackEmoji: "🏎️",
    features: ["VIP driver", "Meet & Greet", "Flight tracking", "Luxury vehicle", "Complimentary water"],
    rating: "4.9 and above",
  },
  econom: {
    name: "Economy",
    example: "Toyota Yaris or similar",
    passengers: 3,
    luggage: 2,
    image: "https://iway.io/images/cars/nsqp0wtfqz.png",
    fallbackEmoji: "🚗",
    features: ["Professional driver", "Meet & Greet"],
    rating: "4.3 and above",
  },
  first: {
    name: "First",
    example: "Mercedes S-Class or similar",
    passengers: 3,
    luggage: 3,
    image: "https://iway.io/images/cars/gzgx1eeop8.png",
    fallbackEmoji: "🏎️",
    features: ["Professional driver", "Meet & Greet", "Flight tracking", "Luxury vehicle"],
    rating: "4.5 and above",
  },
  _default: {
    name: "Vehicle",
    example: "",
    passengers: 3,
    luggage: 3,
    image: "https://iway.io/images/cars/nsqp0wtfqz.png",
    fallbackEmoji: "🚗",
    features: ["Professional driver", "Fixed price"],
    rating: "4.5 and above",
  },
};

// Resolve a car object from the API into display-ready data
function resolveVehicle(car) {
  const cc = car.car_class || {};

  const titleRaw = cc.title || "";
  const classKey = titleRaw.toLowerCase().replace(/\s+/g, "_").trim();
  const meta = VEHICLE_MAP[classKey] || VEHICLE_MAP._default;

  const name = titleRaw || meta.name;

  const example = Array.isArray(cc.models) && cc.models.length > 0
    ? cc.models[0] + " or similar"
    : meta.example;

  // Always use VEHICLE_MAP static image — sandbox API photo filenames don't match production CDN
  const image = meta.image;

  const passengers = cc.capacity || meta.passengers;
  const luggage = cc.luggage_capacity || meta.luggage;

  const apiFeatures = Array.isArray(car.class_services)
    ? car.class_services.filter(f => f.value !== null && f.value !== false).map(f => f.title)
    : [];
  const features = apiFeatures.length > 0 ? apiFeatures : meta.features;

  return {
    ...meta,
    name,
    example,
    image,
    passengers,
    luggage,
    features,
    price: car.price || car.amount || car.total,
    currency: car.currency || "USD",
    _raw: car,
  };
}

function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// Car image with fallback to emoji
function CarImage({ src, emoji, alt }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return <div style={{ fontSize: 56, lineHeight: 1 }}>{emoji}</div>;
  }
  return (
    <img
      src={src}
      alt={alt}
      style={s.carImg}
      onError={() => setFailed(true)}
    />
  );
}

export default function InternationalCarBooking() {
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState("");
  const [step, setStep] = useState(1);
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [fromPlace, setFromPlace] = useState(null);
  const [toPlace, setToPlace] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [searching, setSearching] = useState(false);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [passenger, setPassenger] = useState({ first_name: "", last_name: "", phone: "", email: "" });
  const [order, setOrder] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");

  const dFromQuery = useDebounce(fromQuery);
  const dToQuery = useDebounce(toQuery);

  useEffect(() => {
    login().then(() => setAuthReady(true)).catch(() => setAuthError("Authentication failed."));
  }, []);

  useEffect(() => {
    if (dFromQuery.length > 2)
      findPlaces(dFromQuery).then((d) => setFromSuggestions(d.result || [])).catch(() => setFromSuggestions([]));
    else setFromSuggestions([]);
  }, [dFromQuery]);

  useEffect(() => {
    if (dToQuery.length > 2)
      findPlaces(dToQuery).then((d) => setToSuggestions(d.result || [])).catch(() => setToSuggestions([]));
    else setToSuggestions([]);
  }, [dToQuery]);

  const datetime = date && time ? `${date}T${time}` : "";

  const handleSearch = async () => {
    if (!fromPlace || !toPlace || !date || !time) {
      setError("Please fill in all fields and select locations from the dropdown."); return;
    }
    setError(""); setSearching(true);
    try {
      const results = await getPrices({ fromPlaceId: fromPlace.place_id, toPlaceId: toPlace.place_id, datetime, passengers });
      const offers = results.result || results.offers || results || [];
      setCars(Array.isArray(offers) ? offers : []);
      setStep(2);
    } catch (e) { setError("Failed to fetch car offers. Please try again."); }
    finally { setSearching(false); }
  };

  const handleBooking = async () => {
    if (!passenger.first_name || !passenger.last_name || !passenger.phone || !passenger.email) {
      setError("Please fill in all passenger details."); return;
    }
    setError(""); setBooking(true);
    try {
      const raw = selectedCar._raw;
      const result = await createOrder({
        trips: [{ from: fromPlace.place_id, to: toPlace.place_id, datetime, vehicle_class: raw.vehicle_class || raw.class, passengers }],
        passenger, payment_method: "credit_card",
      });
      setOrder(result.result || result);
      const orderId = result.result?.order_id || result.result?.id || result.order_id || result.id;
      if (orderId) {
        const pay = await getPaymentUrl(orderId);
        setPaymentUrl(pay.result?.url || pay.result?.payment_url || pay.url || "");
      }
      setStep(4);
    } catch (e) { setError("Booking failed. Please try again."); }
    finally { setBooking(false); }
  };

  if (authError) return <div style={s.errBanner}>⚠️ {authError}</div>;
  if (!authReady) return (
    <div style={s.loadWrap}>
      <div style={s.spin} />
      <p style={{ color: "#c47f25", marginTop: 16, fontFamily: "sans-serif" }}>Connecting to i'way...</p>
    </div>
  );

  return (
    <div style={s.page}>

      {/* ══ HERO ══ */}
      <div style={s.hero}>
        <div style={s.heroBadge}>✈ PREMIUM TRAVEL SERVICES</div>
        <h1 style={s.heroTitle}>International Car Transfers</h1>
        <p style={s.heroSub}>Premium transfers in 120+ countries · 670 airports worldwide</p>
      </div>

      {/* ══ TRUST BAR ══ */}
      <div style={s.trustBar}>
        {["✅ Fixed Price", "🌍 120+ Countries", "✈ 670 Airports", "⭐ 4.9/5 Rating", "🕐 24/7 Support"].map(t => (
          <span key={t} style={s.trustItem}>{t}</span>
        ))}
      </div>

      {/* ══ STEPS ══ */}
      <div style={s.stepsWrap}>
        {["Search", "Select Car", "Your Details", "Confirmation"].map((label, i) => {
          const n = i + 1;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ ...s.stepCircle, background: step >= n ? "#c47f25" : "#e8e0d5", color: step >= n ? "#fff" : "#bbb", boxShadow: step === n ? "0 0 0 5px rgba(196,127,37,0.15)" : "none" }}>
                  {step > n ? "✓" : n}
                </div>
                <span style={{ fontSize: 14, fontFamily: "sans-serif", color: step >= n ? "#3d1f0a" : "#bbb", fontWeight: step === n ? 700 : 400 }}>{label}</span>
              </div>
              {n < 4 && <div style={s.stepDash} />}
            </div>
          );
        })}
      </div>

      {error && <div style={s.errBanner}>⚠️ {error}</div>}

      {/* ══════════════════════════════════════
          STEP 1 — SEARCH
      ══════════════════════════════════════ */}
      {step === 1 && (
        <div style={s.section}>
          <div style={s.searchCard}>
            <div style={s.searchCardTitle}>
              <span style={s.searchCardIcon}>🌍</span>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#3d1f0a" }}>Where are you going?</div>
                <div style={{ fontSize: 13, color: "#aaa", fontFamily: "sans-serif", marginTop: 3 }}>Search transfers across 120+ countries</div>
              </div>
            </div>

            {/* Row 1: From & To */}
            <div style={s.inputRow}>
              <div style={s.inputBlock}>
                <label style={s.lbl}>📍 Pickup Location</label>
                <div style={{ position: "relative" }}>
                  <input style={s.inp} placeholder="Airport, hotel, city..."
                    value={fromQuery}
                    onChange={(e) => { setFromQuery(e.target.value); setFromPlace(null); }} />
                  {fromPlace && <span style={s.checkMark}>✓</span>}
                  {fromSuggestions.length > 0 && (
                    <div style={s.drop}>
                      {fromSuggestions.map((p, i) => (
                        <div key={i} style={s.dropRow}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => { setFromPlace(p); setFromQuery(p.description); setFromSuggestions([]); }}>
                          <span style={{ fontSize: 16 }}>📌</span>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 13, color: "#3d1f0a" }}>{p.structured_formatting?.main_text || p.description}</div>
                            <div style={{ fontSize: 11, color: "#aaa", marginTop: 1 }}>{p.structured_formatting?.secondary_text || ""}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div style={s.swapIcon}>⇄</div>

              <div style={s.inputBlock}>
                <label style={s.lbl}>🏁 Drop-off Location</label>
                <div style={{ position: "relative" }}>
                  <input style={s.inp} placeholder="Hotel, city, landmark..."
                    value={toQuery}
                    onChange={(e) => { setToQuery(e.target.value); setToPlace(null); }} />
                  {toPlace && <span style={s.checkMark}>✓</span>}
                  {toSuggestions.length > 0 && (
                    <div style={s.drop}>
                      {toSuggestions.map((p, i) => (
                        <div key={i} style={s.dropRow}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => { setToPlace(p); setToQuery(p.description); setToSuggestions([]); }}>
                          <span style={{ fontSize: 16 }}>📌</span>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 13, color: "#3d1f0a" }}>{p.structured_formatting?.main_text || p.description}</div>
                            <div style={{ fontSize: 11, color: "#aaa", marginTop: 1 }}>{p.structured_formatting?.secondary_text || ""}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Row 2: Date, Time, Passengers */}
            <div style={s.inputRow}>
              <div style={s.inputBlock}>
                <label style={s.lbl}>📅 Date of Travel</label>
                <input type="date" style={s.inp} value={date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)} />
              </div>

              <div style={s.inputBlock}>
                <label style={s.lbl}>🕐 Time of Pickup</label>
                <div style={s.timeGrid}>
                  {["06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"].map(t => (
                    <button key={t}
                      style={{ ...s.timeChip, background: time === t ? "#c47f25" : "#f5f0e8", color: time === t ? "#fff" : "#3d1f0a", border: time === t ? "none" : "1px solid #e8d5b0" }}
                      onClick={() => setTime(t)}>
                      {t}
                    </button>
                  ))}
                </div>
                <input type="time" style={{ ...s.inp, marginTop: 8 }} value={time}
                  onChange={(e) => setTime(e.target.value)} />
              </div>

              <div style={{ ...s.inputBlock, maxWidth: 180 }}>
                <label style={s.lbl}>👥 Passengers</label>
                <div style={s.passengerRow}>
                  <button style={s.pasBtn} onClick={() => setPassengers(Math.max(1, passengers - 1))}>−</button>
                  <span style={s.pasNum}>{passengers}</span>
                  <button style={s.pasBtn} onClick={() => setPassengers(Math.min(20, passengers + 1))}>+</button>
                </div>
                <div style={{ fontSize: 11, color: "#aaa", fontFamily: "sans-serif", marginTop: 6, textAlign: "center" }}>Max 20 passengers</div>
              </div>
            </div>

            <button style={s.searchBtn} onClick={handleSearch} disabled={searching}>
              {searching
                ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}><span style={s.btnSpin} /> Searching for available cars...</span>
                : "🔍 Search Available Cars"}
            </button>

            <div style={s.trustRow}>
              {["✅ Fixed Price — No Surprises", "💳 Pay Online Securely", "❌ Free Cancellation Available", "📱 Instant Booking Confirmation"].map(t => (
                <span key={t} style={s.trustChip}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          STEP 2 — SELECT CAR
      ══════════════════════════════════════ */}
      {step === 2 && (
        <div style={s.section}>
          <div style={s.pageHead}>
            <button style={s.backBtn} onClick={() => setStep(1)}>← Back</button>
            <div>
              <h2 style={s.pageTitle}>Available Vehicles</h2>
              <p style={s.pageSub}>{fromPlace?.description} → {toPlace?.description} · {date} at {time}</p>
            </div>
          </div>

          {cars.length === 0 ? (
            <div style={s.empty}>
              <div style={{ fontSize: 64 }}>🚗</div>
              <p style={{ fontSize: 18, fontWeight: 600, color: "#3d1f0a", marginTop: 16 }}>No cars found for this route</p>
              <p style={{ color: "#aaa" }}>Try different dates or locations.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {cars.map((rawCar, i) => {
                const car = resolveVehicle(rawCar);
                const isSelected = selectedCar?._raw === rawCar;
                return (
                  <div key={i}
                    style={{ ...s.carCard, border: isSelected ? "2px solid #c47f25" : "1.5px solid #eee", background: isSelected ? "#fffaf3" : "#fff" }}
                    onClick={() => setSelectedCar(car)}>

                    <div style={s.carImgBox}>
                      <CarImage src={car.image} emoji={car.fallbackEmoji} alt={car.name} />
                    </div>

                    <div style={s.carInfo}>
                      <div style={s.carName}>{car.name}</div>
                      {car.example ? <div style={s.carExample}>{car.example}</div> : null}
                      <div style={s.carTags}>
                        <span style={s.tag}>👥 {car.passengers} passengers</span>
                        <span style={s.tag}>🧳 {car.luggage} bags</span>
                        <span style={s.tag}>✅ Fixed price</span>
                      </div>
                      {car.rating && (
                        <div style={s.ratingRow}>
                          <span style={s.starIcon}>⭐</span>
                          <span style={s.ratingText}>{car.rating}</span>
                        </div>
                      )}
                      {car.features?.length > 0 && (
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                          {car.features.map((f, fi) => (
                            <span key={fi} style={s.featPill}>✓ {f}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div style={s.carPriceBox}>
                      <div style={s.priceLabel}>from</div>
                      <div style={s.price}>{car.currency}{Number(car.price).toFixed(2)}</div>
                      <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>per transfer</div>
                      <div style={{ ...s.selBtn, ...(isSelected ? s.selBtnActive : {}) }}>
                        {isSelected ? "✓ Selected" : "Select"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {selectedCar && (
            <div style={s.stickyFooter}>
              <div style={{ fontFamily: "sans-serif" }}>
                <div style={{ color: "#aaa", fontSize: 12 }}>Selected Vehicle</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#3d1f0a" }}>{selectedCar.name}</div>
                {selectedCar.example ? <div style={{ fontSize: 12, color: "#aaa" }}>{selectedCar.example}</div> : null}
              </div>
              <div style={{ fontFamily: "sans-serif", textAlign: "center" }}>
                <div style={{ color: "#aaa", fontSize: 12 }}>Total Price</div>
                <div style={{ fontWeight: 800, fontSize: 26, color: "#c47f25" }}>{selectedCar.currency}{Number(selectedCar.price).toFixed(2)}</div>
              </div>
              <button style={s.contBtn} onClick={() => setStep(3)}>Continue → Enter Details</button>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════
          STEP 3 — PASSENGER DETAILS
      ══════════════════════════════════════ */}
      {step === 3 && (
        <div style={s.section}>
          <div style={s.pageHead}>
            <button style={s.backBtn} onClick={() => setStep(2)}>← Back</button>
            <div>
              <h2 style={s.pageTitle}>Passenger Details</h2>
              <p style={s.pageSub}>Fill in the traveller information to complete your booking</p>
            </div>
          </div>

          <div style={s.detailLayout}>
            <div style={s.formBox}>
              <div style={s.formTitle}>👤 Traveller Information</div>
              <div style={s.twoCol}>
                <div>
                  <label style={s.lbl}>First Name *</label>
                  <input style={s.inp} placeholder="John" value={passenger.first_name}
                    onChange={(e) => setPassenger({ ...passenger, first_name: e.target.value })} />
                </div>
                <div>
                  <label style={s.lbl}>Last Name *</label>
                  <input style={s.inp} placeholder="Doe" value={passenger.last_name}
                    onChange={(e) => setPassenger({ ...passenger, last_name: e.target.value })} />
                </div>
              </div>
              <div style={s.twoCol}>
                <div>
                  <label style={s.lbl}>📞 Phone Number *</label>
                  <input style={s.inp} placeholder="+91 98765 43210" value={passenger.phone}
                    onChange={(e) => setPassenger({ ...passenger, phone: e.target.value })} />
                </div>
                <div>
                  <label style={s.lbl}>✉️ Email Address *</label>
                  <input style={s.inp} placeholder="john@example.com" type="email" value={passenger.email}
                    onChange={(e) => setPassenger({ ...passenger, email: e.target.value })} />
                </div>
              </div>
              <button style={s.confirmBtn} onClick={handleBooking} disabled={booking}>
                {booking
                  ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}><span style={s.btnSpin} /> Processing your booking...</span>
                  : "✅ Confirm Booking"}
              </button>
            </div>

            <div style={s.summBox}>
              <div style={s.summTitle}>📋 Booking Summary</div>
              {selectedCar && (
                <div style={s.summCarPreview}>
                  <CarImage src={selectedCar.image} emoji={selectedCar.fallbackEmoji} alt={selectedCar.name} />
                  <div>
                    <div style={{ fontWeight: 700, color: "#3d1f0a", fontSize: 15 }}>{selectedCar.name}</div>
                    {selectedCar.example ? <div style={{ fontSize: 12, color: "#aaa" }}>{selectedCar.example}</div> : null}
                  </div>
                </div>
              )}
              {[
                ["From", fromQuery],
                ["To", toQuery],
                ["Date", date],
                ["Time", time],
                ["Passengers", passengers],
              ].map(([k, v]) => (
                <div key={k} style={s.summRow}>
                  <span style={s.summKey}>{k}</span>
                  <span style={s.summVal}>{v}</span>
                </div>
              ))}
              <div style={s.summTotal}>
                <span style={{ fontWeight: 700 }}>Total Amount</span>
                <span style={{ fontSize: 26, fontWeight: 800, color: "#c47f25" }}>
                  {selectedCar?.currency}{Number(selectedCar?.price).toFixed(2)}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "#2d8a4e", marginTop: 10, fontFamily: "sans-serif", textAlign: "center" }}>✅ Fixed price · No hidden charges</div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          STEP 4 — CONFIRMATION
      ══════════════════════════════════════ */}
      {step === 4 && (
        <div style={s.section}>
          <div style={s.successTop}>
            <div style={s.successCircle}>✓</div>
            <h2 style={s.pageTitle}>Booking Confirmed!</h2>
            <p style={{ color: "#888", fontFamily: "sans-serif" }}>Your international car transfer has been booked successfully.</p>
          </div>

          {order && (
            <div style={s.confirmGrid}>
              {[
                ["Order ID", order.order_id || order.id, "#c47f25"],
                ["Status", order.status || "Confirmed", "#2d8a4e"],
                ["From", fromQuery, "#3d1f0a"],
                ["To", toQuery, "#3d1f0a"],
                ["Date", date, "#3d1f0a"],
                ["Time", time, "#3d1f0a"],
                ["Vehicle", selectedCar?.name, "#3d1f0a"],
                ["Passenger", `${passenger.first_name} ${passenger.last_name}`, "#3d1f0a"],
                ["Phone", passenger.phone, "#3d1f0a"],
                ["Email", passenger.email, "#3d1f0a"],
              ].map(([k, v, c]) => (
                <div key={k} style={s.confirmCard}>
                  <div style={s.confirmKey}>{k}</div>
                  <div style={{ ...s.confirmVal, color: c }}>{v}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
            {paymentUrl && (
              <a href={paymentUrl} target="_blank" rel="noopener noreferrer" style={s.payBtn}>
                💳 Complete Payment
              </a>
            )}
            <button style={s.newBtn} onClick={() => {
              setStep(1); setFromQuery(""); setToQuery(""); setFromPlace(null); setToPlace(null);
              setDate(""); setTime(""); setCars([]); setSelectedCar(null);
              setPassenger({ first_name: "", last_name: "", phone: "", email: "" });
              setOrder(null); setPaymentUrl("");
            }}>
              + Book Another Transfer
            </button>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", color: "#bbb", fontSize: 12, padding: "20px", fontFamily: "sans-serif" }}>
        Powered by i'way · Premium transfers in 120+ countries
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.6; }
      `}</style>
    </div>
  );
}

const s = {
  page: { background: "#f5f0e8", minHeight: "100vh", fontFamily: "'Georgia', serif" },

  hero: { background: "linear-gradient(135deg, #2a1206 0%, #5a2d0c 50%, #3d1f0a 100%)", padding: "56px 40px 52px", textAlign: "center" },
  heroBadge: { display: "inline-block", background: "rgba(196,127,37,0.2)", border: "1px solid rgba(196,127,37,0.5)", color: "#f0c06a", borderRadius: 20, padding: "5px 18px", fontSize: 11, letterSpacing: 2, marginBottom: 16 },
  heroTitle: { margin: 0, fontSize: 44, fontWeight: 700, color: "#fff", letterSpacing: "-1px" },
  heroSub: { margin: "10px 0 0", color: "rgba(255,255,255,0.6)", fontSize: 16, fontFamily: "sans-serif" },

  trustBar: { background: "#3d1f0a", display: "flex", justifyContent: "center", gap: 40, padding: "14px 20px", flexWrap: "wrap" },
  trustItem: { color: "rgba(255,255,255,0.7)", fontSize: 13, fontFamily: "sans-serif" },

  stepsWrap: { background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "20px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", flexWrap: "wrap" },
  stepCircle: { width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, transition: "all 0.3s", fontFamily: "sans-serif" },
  stepDash: { width: 48, height: 2, background: "#e8e0d5", margin: "0 10px" },

  errBanner: { background: "#fff3cd", borderTop: "3px solid #ffc107", padding: "14px 40px", color: "#856404", fontFamily: "sans-serif", fontSize: 14 },
  loadWrap: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh" },
  spin: { width: 40, height: 40, border: "3px solid #e8d5b0", borderTopColor: "#c47f25", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  btnSpin: { width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" },

  section: { maxWidth: 1100, margin: "0 auto", padding: "40px 32px", animation: "fadeUp 0.4s ease" },

  searchCard: { background: "#fff", borderRadius: 20, padding: "40px 40px 32px", boxShadow: "0 4px 32px rgba(61,31,10,0.1)" },
  searchCardTitle: { display: "flex", alignItems: "center", gap: 16, marginBottom: 32 },
  searchCardIcon: { fontSize: 42 },
  inputRow: { display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, alignItems: "start", marginBottom: 24 },
  inputBlock: { display: "flex", flexDirection: "column" },
  swapIcon: { fontSize: 22, color: "#c47f25", alignSelf: "flex-end", marginBottom: 14, padding: "0 4px" },
  lbl: { fontSize: 13, fontWeight: 600, color: "#3d1f0a", marginBottom: 8, fontFamily: "sans-serif" },
  inp: { width: "100%", padding: "14px 16px", border: "1.5px solid #e8e0d5", borderRadius: 12, fontSize: 15, boxSizing: "border-box", outline: "none", fontFamily: "sans-serif", color: "#3d1f0a", background: "#fdfaf6" },
  checkMark: { position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#2d8a4e", fontWeight: 700, fontSize: 16 },
  drop: { position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "#fff", border: "1.5px solid #e8d5b0", borderRadius: 14, zIndex: 1000, boxShadow: "0 12px 40px rgba(61,31,10,0.14)", maxHeight: 260, overflowY: "auto" },
  dropRow: { display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 16px", cursor: "pointer", borderBottom: "1px solid #f5f0e8", fontFamily: "sans-serif", transition: "background 0.15s" },

  timeGrid: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 0 },
  timeChip: { padding: "5px 10px", borderRadius: 8, fontSize: 12, fontFamily: "sans-serif", cursor: "pointer", fontWeight: 600, transition: "all 0.15s" },

  passengerRow: { display: "flex", alignItems: "center", gap: 0, background: "#fdfaf6", border: "1.5px solid #e8e0d5", borderRadius: 12, overflow: "hidden" },
  pasBtn: { width: 44, height: 48, background: "none", border: "none", fontSize: 20, color: "#c47f25", cursor: "pointer", fontWeight: 700 },
  pasNum: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: 700, color: "#3d1f0a", fontFamily: "sans-serif" },

  searchBtn: { width: "100%", padding: "18px", background: "linear-gradient(135deg, #c47f25, #a86820)", color: "#fff", border: "none", borderRadius: 14, fontSize: 17, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif", letterSpacing: 0.3, boxShadow: "0 6px 20px rgba(196,127,37,0.35)", marginBottom: 24 },
  trustRow: { display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" },
  trustChip: { background: "#fdf6ec", border: "1px solid #e8d5b0", color: "#7a4f1a", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontFamily: "sans-serif" },

  pageHead: { display: "flex", alignItems: "center", gap: 20, marginBottom: 28 },
  pageTitle: { margin: 0, fontSize: 26, color: "#3d1f0a", fontWeight: 700 },
  pageSub: { margin: "4px 0 0", color: "#aaa", fontSize: 13, fontFamily: "sans-serif" },
  backBtn: { background: "#fff", border: "1.5px solid #e8e0d5", borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontSize: 14, color: "#3d1f0a", fontFamily: "sans-serif", fontWeight: 600, whiteSpace: "nowrap" },
  empty: { textAlign: "center", padding: "80px 20px", color: "#aaa", fontFamily: "sans-serif" },

  carCard: { display: "flex", alignItems: "center", gap: 24, padding: "24px 28px", borderRadius: 16, cursor: "pointer", transition: "all 0.2s", fontFamily: "sans-serif" },
  carImgBox: { width: 130, flexShrink: 0, textAlign: "center" },
  carImg: { width: 130, height: 80, objectFit: "contain", borderRadius: 8 },
  carInfo: { flex: 1 },
  carName: { fontWeight: 700, fontSize: 20, color: "#3d1f0a", fontFamily: "Georgia, serif" },
  carExample: { fontSize: 13, color: "#999", fontFamily: "sans-serif", marginTop: 2, marginBottom: 4 },
  carTags: { display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" },
  tag: { background: "#f5f0e8", color: "#7a4f1a", borderRadius: 20, padding: "4px 14px", fontSize: 12 },
  ratingRow: { display: "flex", alignItems: "center", gap: 4, marginTop: 8 },
  starIcon: { fontSize: 13 },
  ratingText: { fontSize: 12, color: "#c47f25", fontWeight: 600, fontFamily: "sans-serif" },
  featPill: { background: "#f0f9f4", color: "#2d8a4e", border: "1px solid #c3e6cb", borderRadius: 20, padding: "3px 12px", fontSize: 11 },
  carPriceBox: { textAlign: "right", minWidth: 150 },
  priceLabel: { fontSize: 12, color: "#aaa", fontFamily: "sans-serif" },
  price: { fontSize: 32, fontWeight: 800, color: "#c47f25" },
  selBtn: { display: "inline-block", marginTop: 12, padding: "8px 24px", borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: "pointer", border: "1.5px solid #c47f25", color: "#c47f25", background: "transparent", transition: "all 0.2s" },
  selBtnActive: { background: "#c47f25", color: "#fff", border: "none" },

  stickyFooter: { position: "sticky", bottom: 20, background: "#fff", borderRadius: 16, padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 8px 32px rgba(61,31,10,0.15)", marginTop: 24, border: "1.5px solid #e8d5b0" },
  contBtn: { background: "linear-gradient(135deg, #c47f25, #a86820)", color: "#fff", border: "none", borderRadius: 12, padding: "14px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif" },

  detailLayout: { display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" },
  formBox: { flex: 2, minWidth: 300, background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 4px 20px rgba(61,31,10,0.08)" },
  formTitle: { fontSize: 17, fontWeight: 700, color: "#3d1f0a", marginBottom: 20, fontFamily: "Georgia, serif" },
  twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 },
  confirmBtn: { width: "100%", padding: "16px", background: "linear-gradient(135deg, #c47f25, #a86820)", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif", boxShadow: "0 4px 16px rgba(196,127,37,0.35)", marginTop: 8 },
  summBox: { flex: 1, minWidth: 260, background: "#fff", border: "1.5px solid #e8d5b0", borderRadius: 16, padding: 28, position: "sticky", top: 100 },
  summTitle: { fontSize: 16, fontWeight: 700, color: "#3d1f0a", marginBottom: 16, fontFamily: "Georgia, serif" },
  summCarPreview: { display: "flex", alignItems: "center", gap: 12, padding: "12px 0 16px", borderBottom: "1px solid #f5f0e8", marginBottom: 8 },
  summRow: { display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f5f0e8", fontFamily: "sans-serif" },
  summKey: { fontSize: 12, color: "#aaa", textTransform: "uppercase", letterSpacing: 0.5 },
  summVal: { fontSize: 13, color: "#3d1f0a", fontWeight: 600, textAlign: "right", maxWidth: "55%" },
  summTotal: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, paddingTop: 16, borderTop: "2px solid #e8d5b0", fontFamily: "sans-serif" },

  successTop: { textAlign: "center", marginBottom: 36 },
  successCircle: { width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #c47f25, #a86820)", color: "#fff", fontSize: 36, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 8px 24px rgba(196,127,37,0.35)" },
  confirmGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 },
  confirmCard: { background: "#fff", borderRadius: 14, padding: "18px 22px", border: "1.5px solid #e8d5b0" },
  confirmKey: { fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, fontFamily: "sans-serif" },
  confirmVal: { fontSize: 15, fontWeight: 600, fontFamily: "sans-serif" },
  payBtn: { flex: 1, display: "block", textAlign: "center", background: "linear-gradient(135deg, #2d8a4e, #1f6b3a)", color: "#fff", borderRadius: 12, padding: "16px 32px", fontWeight: 700, fontSize: 15, textDecoration: "none", fontFamily: "sans-serif" },
  newBtn: { flex: 1, background: "#fff", border: "1.5px solid #c47f25", color: "#c47f25", borderRadius: 12, padding: "16px 32px", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "sans-serif" },
};