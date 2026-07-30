

// import React, { useEffect, useState, useRef } from 'react';
// import promo1 from '../assets/imgs/promo1.jpeg';
// import promo2 from '../assets/imgs/promo2.jpeg';
// import promo3 from '../assets/imgs/promo3.jpeg';
// import promo4 from '../assets/imgs/promo4.jpeg';
// import promo5 from '../assets/imgs/promo5.jpeg';
// import promo6 from '../assets/imgs/promo6.jpeg';
// import promo7 from '../assets/imgs/promo7.jpeg';
// import promo8 from '../assets/imgs/promo8.jpeg';
// import promo9 from '../assets/imgs/promo9.jpeg';
// import promo10 from '../assets/imgs/promo10.jpg';
// import promo11 from '../assets/imgs/promo11.jpg';
// import promo12 from '../assets/imgs/promo12.jpg';  
// import promo13 from '../assets/imgs/promo13.jpeg';
// import promo14 from '../assets/imgs/promo14.jpeg';
// import promo15 from '../assets/imgs/promo15.jpeg';
// import promo16 from '../assets/imgs/promo16.jpeg';
// import promo17 from '../assets/imgs/promo17.jpeg';
// import promo18 from '../assets/imgs/promo18.jpeg';
// import promo19 from '../assets/imgs/promo19.jpeg';


// const allImages = [promo1, promo2, promo3, promo4, promo5, promo6, promo7, promo8, promo9, promo10, promo11, promo12, promo13, promo14, promo15, promo16, promo17, promo18, promo19];

// const packageConfig = [
//   { id: 1,  startIndex: 0 },
//   { id: 2,  startIndex: 1 },
//   { id: 3,  startIndex: 2 },
//   { id: 4,  startIndex: 3 },
//   { id: 5,  startIndex: 4 },
//   { id: 6,  startIndex: 5 },
//   { id: 7,  startIndex: 6 },
//   { id: 8,  startIndex: 7 },
//   { id: 9,  startIndex: 8 },
//   { id: 10, startIndex: 9 },
//   { id: 11, startIndex: 10 },
//   { id: 12, startIndex: 11 },
//   { id: 13, startIndex: 12 },
//   { id: 14, startIndex: 13 },
//   { id: 15, startIndex: 14 },
//   { id: 16, startIndex: 15 },
//   { id: 17, startIndex: 16 },
//   { id: 18, startIndex: 17 },
//   { id: 19, startIndex: 18 },
// ];

// // How often one card in a row swaps its image (instant swap, not a slide).
// const STEP_INTERVAL = 4000;

// // Split the flat card list into rows of 4 (matching the 4-column grid).
// const ROWS = [];
// for (let i = 0; i < packageConfig.length; i += 4) {
//   ROWS.push(packageConfig.slice(i, i + 4));
// }

// // Ripple order within a row: first card, then last, then walk back down to
// // the second card — e.g. for a row of 4: [0, 3, 2, 1]. Repeats forever.
// const getStepOrder = (rowLength) => {
//   if (rowLength <= 1) return [0];
//   const order = [0];
//   for (let i = rowLength - 1; i >= 1; i--) order.push(i);
//   return order;
// };

// // Manages the current image index for every card in one row. Each tick,
// // only the single card whose turn it is (per the ripple order) swaps to
// // its next image — every other card in the row stays exactly as it was.
// // The next image is also never one already showing on another card in the
// // same row, so no two cards in a row are ever identical at the same time.
// const useRowImageIndices = (row) => {
//   const [indices, setIndices] = useState(() => row.map(card => card.startIndex));
//   const stepOrder = useRef(getStepOrder(row.length));
//   const step = useRef(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndices(prev => {
//         const next = [...prev];
//         const pos = stepOrder.current[step.current % stepOrder.current.length];
//         const others = new Set(next.filter((_, idx) => idx !== pos));

//         let candidate = (next[pos] + 1) % allImages.length;
//         let guard = 0;
//         while (others.has(candidate) && guard < allImages.length) {
//           candidate = (candidate + 1) % allImages.length;
//           guard += 1;
//         }

//         next[pos] = candidate;
//         return next;
//       });
//       step.current += 1;
//     }, STEP_INTERVAL);
//     return () => clearInterval(interval);
//   }, []);

//   return indices;
// };

// const inputStyle = {
//   border: '1.5px solid #fde68a',
//   borderRadius: '10px',
//   padding: '9px 13px',
//   fontSize: '0.9rem',
//   color: '#1e293b',
//   outline: 'none',
//   background: '#fffdf7',
//   fontFamily: 'sans-serif',
//   width: '100%',
//   boxSizing: 'border-box',
// };

// const labelStyle = {
//   fontSize: '0.75rem',
//   fontWeight: '700',
//   color: '#92400e',
//   textTransform: 'uppercase',
//   letterSpacing: '0.8px',
//   marginBottom: '5px',
//   display: 'block',
// };

// const Lightbox = ({ img, onClose }) => {
//   useEffect(() => {
//     const handleKey = e => { if (e.key === 'Escape') onClose(); };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   }, [onClose]);

//   return (
//     <div
//       onClick={onClose}
//       style={{
//         position: 'fixed',
//         inset: 0,
//         background: 'rgba(0,0,0,0.82)',
//         zIndex: 9999,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: '24px',
//         backdropFilter: 'blur(6px)',
//         animation: 'fadeIn 0.2s ease',
//       }}
//     >
//       <style>{`
//         @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
//         @keyframes popIn { from { transform:scale(0.88); opacity:0 } to { transform:scale(1); opacity:1 } }
//       `}</style>

//       <button
//         onClick={onClose}
//         style={{
//           position: 'fixed',
//           top: '20px',
//           right: '24px',
//           background: 'rgba(255,255,255,0.15)',
//           border: '1.5px solid rgba(255,255,255,0.3)',
//           borderRadius: '50%',
//           width: '44px',
//           height: '44px',
//           color: '#fff',
//           fontSize: '1.2rem',
//           cursor: 'pointer',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           zIndex: 10000,
//         }}
//       >✕</button>

//       <img
//         src={img}
//         alt="Zoomed"
//         onClick={e => e.stopPropagation()}
//         style={{
//           maxWidth: '90vw',
//           maxHeight: '88vh',
//           borderRadius: '16px',
//           objectFit: 'contain',
//           boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
//           animation: 'popIn 0.25s cubic-bezier(0.34,1.56,0.64,1)',
//         }}
//       />
//     </div>
//   );
// };

// const PackageCard = ({ imgIndex, onImageClick }) => {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         borderRadius: '20px',
//         overflow: 'hidden',
//         background: '#fffdf7',
//         border: `1.5px solid ${hovered ? '#f59e0b' : '#fde68a'}`,
//         boxShadow: hovered
//           ? '0 32px 64px rgba(251,146,60,0.22), 0 8px 24px rgba(0,0,0,0.08)'
//           : '0 4px 20px rgba(251,146,60,0.10), 0 1px 4px rgba(0,0,0,0.05)',
//         transform: hovered ? 'translateY(-16px) scale(1.03)' : 'translateY(0) scale(1)',
//         transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.3s ease',
//         position: 'relative',
//         zIndex: hovered ? 10 : 0,
//         cursor: 'pointer',
//       }}
//     >
//       <div
//         style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#fffdf7' }}
//         onClick={() => onImageClick(allImages[imgIndex])}
//       >
//         <img
//           src={allImages[imgIndex]}
//           alt="Package"
//           style={{
//             width: '100%',
//             height: 'auto',
//             objectFit: 'contain',
//             display: 'block',
//           }}
//         />

//         {hovered && (
//           <div style={{
//             position: 'absolute',
//             inset: 0,
//             background: 'rgba(0,0,0,0.18)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             zIndex: 2,
//           }}>
//             <div style={{
//               background: 'rgba(255,255,255,0.92)',
//               borderRadius: '50%',
//               width: '48px',
//               height: '48px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontSize: '1.3rem',
//               boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
//             }}>🔍</div>
//           </div>
//         )}
//       </div>

//       <div style={{
//         padding: '14px 16px',
//         background: 'linear-gradient(90deg, #fffbeb, #fff8f0)',
//         borderTop: '1px solid #fde68a88',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//       }}>
//         <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#92400e', letterSpacing: '0.3px' }}>
//           View Details
//         </span>
//         <span style={{
//           width: '28px', height: '28px',
//           background: 'linear-gradient(135deg, #f59e0b, #fb923c)',
//           borderRadius: '50%',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           color: '#fff', fontSize: '0.8rem', fontWeight: 'bold', flexShrink: 0,
//         }}>→</span>
//       </div>
//     </div>
//   );
// };

// // One row of up to 4 cards, sharing a single ripple rotation.
// const PackageRow = ({ row, onImageClick }) => {
//   const indices = useRowImageIndices(row);

//   return (
//     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px' }}>
//       {row.map((card, i) => (
//         <PackageCard
//           key={card.id}
//           imgIndex={indices[i]}
//           onImageClick={onImageClick}
//         />
//       ))}
//     </div>
//   );
// };

// const InquiryForm = () => {
//   const [form, setForm] = useState({
//     name: '', phone: '', email: '', package: '', date: '', message: '',
//   });
//   const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   const handleSubmit = () => alert('Inquiry sent! We will contact you soon.');

//   return (
//     <div style={{
//       marginTop: '60px',
//       background: '#fff',
//       border: '1.5px solid #fde68a',
//       borderRadius: '20px',
//       padding: '32px 28px',
//       maxWidth: '660px',
//       marginLeft: 'auto',
//       marginRight: 'auto',
//     }}>
//       <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#1e293b', margin: '0 0 4px' }}>
//         Quick Inquiry
//       </h2>
//       <p style={{ fontSize: '0.85rem', color: '#92400e', opacity: 0.75, margin: '0 0 18px' }}>
//         We'll get back to you within 24 hours
//       </p>

//       <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '22px' }}>
//         {[
//           { icon: '📞', text: '9922514719' },
//           { icon: '✉️', text: 'paresh@travelogholiday.com' },
//         ].map(({ icon, text }) => (
//           <div key={text} style={{
//             display: 'flex', alignItems: 'center', gap: '8px',
//             fontSize: '0.85rem', color: '#92400e', fontWeight: '600',
//           }}>
//             <div style={{
//               width: '30px', height: '30px', background: '#fef3c7',
//               borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
//             }}>{icon}</div>
//             {text}
//           </div>
//         ))}
//       </div>

//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
//         <div>
//           <label style={labelStyle}>Your Name</label>
//           <input style={inputStyle} name="name" placeholder="e.g. Rahul Sharma" value={form.name} onChange={handleChange} />
//         </div>
//         <div>
//           <label style={labelStyle}>Phone Number</label>
//           <input style={inputStyle} name="phone" type="tel" placeholder="Your mobile" value={form.phone} onChange={handleChange} />
//         </div>
//       </div>

//       <div style={{ marginBottom: '14px' }}>
//         <label style={labelStyle}>Email Address</label>
//         <input style={inputStyle} name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
//       </div>

//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
//         <div>
//           <label style={labelStyle}>Package Interested In</label>
//           <input style={inputStyle} name="package" placeholder="e.g. Meghalaya" value={form.package} onChange={handleChange} />
//         </div>
//         <div>
//           <label style={labelStyle}>Travel Date</label>
//           <input style={inputStyle} name="date" type="date" value={form.date} onChange={handleChange} />
//         </div>
//       </div>

//       <div style={{ marginBottom: '22px' }}>
//         <label style={labelStyle}>Message (optional)</label>
//         <textarea
//           style={{ ...inputStyle, resize: 'none' }}
//           name="message"
//           rows={3}
//           placeholder="Any specific requirements or questions..."
//           value={form.message}
//           onChange={handleChange}
//         />
//       </div>

//       <button onClick={handleSubmit} style={{
//         width: '100%',
//         padding: '12px',
//         background: 'linear-gradient(135deg, #f59e0b, #fb923c)',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '12px',
//         fontSize: '0.95rem',
//         fontWeight: '700',
//         cursor: 'pointer',
//         letterSpacing: '0.3px',
//       }}>
//         Send Inquiry →
//       </button>
//     </div>
//   );
// };

// const PromotionalPackages = () => {
//   const [lightboxImg, setLightboxImg] = useState(null);

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #fdf6ec 0%, #fef9f0 50%, #fff8f0 100%)',
//       padding: '60px 40px',
//       fontFamily: 'sans-serif',
//     }}>
//       {lightboxImg && <Lightbox img={lightboxImg} onClose={() => setLightboxImg(null)} />}

//       <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

//         <div style={{ textAlign: 'center', marginBottom: '52px' }}>
//           <span style={{
//             display: 'inline-block',
//             background: 'linear-gradient(90deg, #f59e0b22, #fb923c22)',
//             color: '#d97706', fontSize: '0.78rem', fontWeight: '700',
//             letterSpacing: '2px', textTransform: 'uppercase',
//             padding: '6px 18px', borderRadius: '20px',
//             border: '1px solid #fcd34d88', marginBottom: '14px',
//           }}>✦ Limited Time Offers</span>
//           <h1 style={{
//             fontSize: '2.4rem', fontWeight: '800', color: '#1e293b',
//             letterSpacing: '-0.5px', margin: '0 0 10px',
//           }}>
//             Promotional Packages
//           </h1>
//           <p style={{ color: '#92400e', fontSize: '0.97rem', opacity: 0.7, margin: 0 }}>
//             Exclusive deals handpicked just for you
//           </p>
//           <div style={{
//             width: '64px', height: '4px',
//             background: 'linear-gradient(90deg, #f59e0b, #fb923c)',
//             borderRadius: '4px', margin: '16px auto 0',
//           }} />
//         </div>

//         <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
//           {ROWS.map((row, i) => (
//             <PackageRow key={i} row={row} onImageClick={setLightboxImg} />
//           ))}
//         </div>

//         <InquiryForm />
//       </div>
//     </div>
//   );
// };

// export default PromotionalPackages;

import React, { useEffect, useState, useRef } from 'react';
import promo1 from '../assets/imgs/promo1.jpeg';
import promo2 from '../assets/imgs/promo2.jpeg';
import promo3 from '../assets/imgs/promo3.jpeg';
import promo4 from '../assets/imgs/promo4.jpeg';
import promo5 from '../assets/imgs/promo5.jpeg';
import promo6 from '../assets/imgs/promo6.jpeg';
import promo7 from '../assets/imgs/promo7.jpeg';
import promo8 from '../assets/imgs/promo8.jpeg';
import promo9 from '../assets/imgs/promo9.jpeg';
import promo10 from '../assets/imgs/promo10.jpg';
import promo11 from '../assets/imgs/promo11.jpg';
import promo12 from '../assets/imgs/promo12.jpg';
import promo13 from '../assets/imgs/promo13.jpeg';
import promo14 from '../assets/imgs/promo14.jpeg';
import promo15 from '../assets/imgs/promo15.jpeg';
import promo16 from '../assets/imgs/promo16.jpeg';
import promo17 from '../assets/imgs/promo17.jpeg';
import promo18 from '../assets/imgs/promo18.jpeg';
import promo19 from '../assets/imgs/promo19.jpeg';
// NEW: promo20 - promo25 (adjust the extension below if your actual files
// are .jpg instead of .jpeg, same as promo10-12 above)
import promo20 from '../assets/imgs/promo20.png';
import promo21 from '../assets/imgs/promo21.png';
import promo22 from '../assets/imgs/promo22.png';
import promo23 from '../assets/imgs/promo23.png';
import promo24 from '../assets/imgs/promo24.png';
import promo25 from '../assets/imgs/promo25.png';
import promo26 from '../assets/imgs/promo26.png';
import promo27 from '../assets/imgs/promo27.png';
import promo28 from '../assets/imgs/promo28.png';


const allImages = [
  promo1, promo2, promo3, promo4, promo5, promo6, promo7, promo8, promo9, promo10,
  promo11, promo12, promo13, promo14, promo15, promo16, promo17, promo18, promo19, promo20,
  promo21, promo22, promo23, promo24, promo25, promo26, promo27, promo28,
];

const packageConfig = [
  { id: 1,  startIndex: 0 },
  { id: 2,  startIndex: 1 },
  { id: 3,  startIndex: 2 },
  { id: 4,  startIndex: 3 },
  { id: 5,  startIndex: 4 },
  { id: 6,  startIndex: 5 },
  { id: 7,  startIndex: 6 },
  { id: 8,  startIndex: 7 },
  { id: 9,  startIndex: 8 },
  { id: 10, startIndex: 9 },
  { id: 11, startIndex: 10 },
  { id: 12, startIndex: 11 },
  { id: 13, startIndex: 12 },
  { id: 14, startIndex: 13 },
  { id: 15, startIndex: 14 },
  { id: 16, startIndex: 15 },
  { id: 17, startIndex: 16 },
  { id: 18, startIndex: 17 },
  { id: 19, startIndex: 18 },
  { id: 20, startIndex: 19 },
  { id: 21, startIndex: 20 },
  { id: 22, startIndex: 21 },
  { id: 23, startIndex: 22 },
  { id: 24, startIndex: 23 },
  { id: 25, startIndex: 24 },
  { id: 26, startIndex: 25 },
  { id: 27, startIndex: 26 },
  { id: 28, startIndex: 27 },
];

// How often one card in a row swaps its image (instant swap, not a slide).
const STEP_INTERVAL = 4000;

// How long the blink (fade-out/fade-in) transition takes when a card's
// image changes. Kept well under STEP_INTERVAL so it always finishes
// before the next swap.
const BLINK_DURATION = 260;

// Split the flat card list into rows of 4 (matching the 4-column grid).
const ROWS = [];
for (let i = 0; i < packageConfig.length; i += 4) {
  ROWS.push(packageConfig.slice(i, i + 4));
}

// Ripple order within a row: first card, then last, then walk back down to
// the second card — e.g. for a row of 4: [0, 3, 2, 1]. Repeats forever.
// UNCHANGED — position/rotation logic is exactly as before.
const getStepOrder = (rowLength) => {
  if (rowLength <= 1) return [0];
  const order = [0];
  for (let i = rowLength - 1; i >= 1; i--) order.push(i);
  return order;
};

// Manages the current image index for every card in one row. Each tick,
// only the single card whose turn it is (per the ripple order) swaps to
// its next image — every other card in the row stays exactly as it was.
// The next image is also never one already showing on another card in the
// same row, so no two cards in a row are ever identical at the same time.
// UNCHANGED — position/rotation logic is exactly as before.
const useRowImageIndices = (row) => {
  const [indices, setIndices] = useState(() => row.map(card => card.startIndex));
  const stepOrder = useRef(getStepOrder(row.length));
  const step = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndices(prev => {
        const next = [...prev];
        const pos = stepOrder.current[step.current % stepOrder.current.length];
        const others = new Set(next.filter((_, idx) => idx !== pos));

        let candidate = (next[pos] + 1) % allImages.length;
        let guard = 0;
        while (others.has(candidate) && guard < allImages.length) {
          candidate = (candidate + 1) % allImages.length;
          guard += 1;
        }

        next[pos] = candidate;
        return next;
      });
      step.current += 1;
    }, STEP_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return indices;
};

const inputStyle = {
  border: '1.5px solid #fde68a',
  borderRadius: '10px',
  padding: '9px 13px',
  fontSize: '0.9rem',
  color: '#1e293b',
  outline: 'none',
  background: '#fffdf7',
  fontFamily: 'sans-serif',
  width: '100%',
  boxSizing: 'border-box',
};

const labelStyle = {
  fontSize: '0.75rem',
  fontWeight: '700',
  color: '#92400e',
  textTransform: 'uppercase',
  letterSpacing: '0.8px',
  marginBottom: '5px',
  display: 'block',
};

const Lightbox = ({ img, onClose }) => {
  useEffect(() => {
    const handleKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.82)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes popIn { from { transform:scale(0.88); opacity:0 } to { transform:scale(1); opacity:1 } }
      `}</style>

      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '20px',
          right: '24px',
          background: 'rgba(255,255,255,0.15)',
          border: '1.5px solid rgba(255,255,255,0.3)',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          color: '#fff',
          fontSize: '1.2rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
        }}
      >✕</button>

      <img
        src={img}
        alt="Zoomed"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '88vh',
          borderRadius: '16px',
          objectFit: 'contain',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          animation: 'popIn 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      />
    </div>
  );
};

// Card now blinks (fades out then back in) whenever imgIndex changes,
// instead of swapping instantly. Position/row logic feeding imgIndex is
// completely untouched — only the visual transition on change is new.
const PackageCard = ({ imgIndex, onImageClick }) => {
  const [hovered, setHovered] = useState(false);
  const [displayedIndex, setDisplayedIndex] = useState(imgIndex);
  const [blinking, setBlinking] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (imgIndex === displayedIndex) return;

    // Start blink: fade out
    setBlinking(true);

    // Halfway through the blink, swap to the new image (while invisible),
    // then fade back in.
    const swapTimer = setTimeout(() => {
      setDisplayedIndex(imgIndex);
    }, BLINK_DURATION / 2);

    const endTimer = setTimeout(() => {
      setBlinking(false);
    }, BLINK_DURATION);

    return () => {
      clearTimeout(swapTimer);
      clearTimeout(endTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgIndex]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#fffdf7',
        border: `1.5px solid ${hovered ? '#f59e0b' : '#fde68a'}`,
        boxShadow: hovered
          ? '0 32px 64px rgba(251,146,60,0.22), 0 8px 24px rgba(0,0,0,0.08)'
          : '0 4px 20px rgba(251,146,60,0.10), 0 1px 4px rgba(0,0,0,0.05)',
        transform: hovered ? 'translateY(-16px) scale(1.03)' : 'translateY(0) scale(1)',
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.3s ease',
        position: 'relative',
        zIndex: hovered ? 10 : 0,
        cursor: 'pointer',
      }}
    >
      <div
        style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#fffdf7' }}
        onClick={() => onImageClick(allImages[displayedIndex])}
      >
        <img
          src={allImages[displayedIndex]}
          alt="Package"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
            opacity: blinking ? 0 : 1,
            transition: `opacity ${BLINK_DURATION / 2}ms ease`,
          }}
        />

        {hovered && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.92)',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            }}>🔍</div>
          </div>
        )}
      </div>

      <div style={{
        padding: '14px 16px',
        background: 'linear-gradient(90deg, #fffbeb, #fff8f0)',
        borderTop: '1px solid #fde68a88',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#92400e', letterSpacing: '0.3px' }}>
          View Details
        </span>
        <span style={{
          width: '28px', height: '28px',
          background: 'linear-gradient(135deg, #f59e0b, #fb923c)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: '0.8rem', fontWeight: 'bold', flexShrink: 0,
        }}>→</span>
      </div>
    </div>
  );
};

// One row of up to 4 cards, sharing a single ripple rotation.
// UNCHANGED — position/row logic is exactly as before.
const PackageRow = ({ row, onImageClick }) => {
  const indices = useRowImageIndices(row);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px' }}>
      {row.map((card, i) => (
        <PackageCard
          key={card.id}
          imgIndex={indices[i]}
          onImageClick={onImageClick}
        />
      ))}
    </div>
  );
};

const InquiryForm = () => {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', package: '', date: '', message: '',
  });
  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = () => alert('Inquiry sent! We will contact you soon.');

  return (
    <div style={{
      marginTop: '60px',
      background: '#fff',
      border: '1.5px solid #fde68a',
      borderRadius: '20px',
      padding: '32px 28px',
      maxWidth: '660px',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#1e293b', margin: '0 0 4px' }}>
        Quick Inquiry
      </h2>
      <p style={{ fontSize: '0.85rem', color: '#92400e', opacity: 0.75, margin: '0 0 18px' }}>
        We'll get back to you within 24 hours
      </p>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '22px' }}>
        {[
          { icon: '📞', text: '9922514719' },
          { icon: '✉️', text: 'paresh@travelogholiday.com' },
        ].map(({ icon, text }) => (
          <div key={text} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            fontSize: '0.85rem', color: '#92400e', fontWeight: '600',
          }}>
            <div style={{
              width: '30px', height: '30px', background: '#fef3c7',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{icon}</div>
            {text}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
        <div>
          <label style={labelStyle}>Your Name</label>
          <input style={inputStyle} name="name" placeholder="e.g. Rahul Sharma" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label style={labelStyle}>Phone Number</label>
          <input style={inputStyle} name="phone" type="tel" placeholder="Your mobile" value={form.phone} onChange={handleChange} />
        </div>
      </div>

      <div style={{ marginBottom: '14px' }}>
        <label style={labelStyle}>Email Address</label>
        <input style={inputStyle} name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
        <div>
          <label style={labelStyle}>Package Interested In</label>
          <input style={inputStyle} name="package" placeholder="e.g. Meghalaya" value={form.package} onChange={handleChange} />
        </div>
        <div>
          <label style={labelStyle}>Travel Date</label>
          <input style={inputStyle} name="date" type="date" value={form.date} onChange={handleChange} />
        </div>
      </div>

      <div style={{ marginBottom: '22px' }}>
        <label style={labelStyle}>Message (optional)</label>
        <textarea
          style={{ ...inputStyle, resize: 'none' }}
          name="message"
          rows={3}
          placeholder="Any specific requirements or questions..."
          value={form.message}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleSubmit} style={{
        width: '100%',
        padding: '12px',
        background: 'linear-gradient(135deg, #f59e0b, #fb923c)',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        fontSize: '0.95rem',
        fontWeight: '700',
        cursor: 'pointer',
        letterSpacing: '0.3px',
      }}>
        Send Inquiry →
      </button>
    </div>
  );
};

const PromotionalPackages = () => {
  const [lightboxImg, setLightboxImg] = useState(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fdf6ec 0%, #fef9f0 50%, #fff8f0 100%)',
      padding: '60px 40px',
      fontFamily: 'sans-serif',
    }}>
      {lightboxImg && <Lightbox img={lightboxImg} onClose={() => setLightboxImg(null)} />}

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <span style={{
            display: 'inline-block',
            background: 'linear-gradient(90deg, #f59e0b22, #fb923c22)',
            color: '#d97706', fontSize: '0.78rem', fontWeight: '700',
            letterSpacing: '2px', textTransform: 'uppercase',
            padding: '6px 18px', borderRadius: '20px',
            border: '1px solid #fcd34d88', marginBottom: '14px',
          }}>✦ Limited Time Offers</span>
          <h1 style={{
            fontSize: '2.4rem', fontWeight: '800', color: '#1e293b',
            letterSpacing: '-0.5px', margin: '0 0 10px',
          }}>
            Promotional Packages
          </h1>
          <p style={{ color: '#92400e', fontSize: '0.97rem', opacity: 0.7, margin: 0 }}>
            Exclusive deals handpicked just for you
          </p>
          <div style={{
            width: '64px', height: '4px',
            background: 'linear-gradient(90deg, #f59e0b, #fb923c)',
            borderRadius: '4px', margin: '16px auto 0',
          }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {ROWS.map((row, i) => (
            <PackageRow key={i} row={row} onImageClick={setLightboxImg} />
          ))}
        </div>

        <InquiryForm />
      </div>
    </div>
  );
};

export default PromotionalPackages;