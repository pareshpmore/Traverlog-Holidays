// ============================================================
// src/services/iwayApi.js
// ============================================================

const BASE_URL = "https://iwayproxy-fhq2rwxr2a-uc.a.run.app";
let accessToken = null;
let refreshToken = null;

// ─────────────────────────────────────────────
// 1. AUTH — Login
// ─────────────────────────────────────────────
export const login = async () => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      login: "iwaydemo",
      password: "2307Stormborn",
    }),
  });
  const data = await res.json();
  console.log("iway login response:", data);
  accessToken = data.result.token;
  refreshToken = data.result.refresh_token;
  return data;
};

// ─────────────────────────────────────────────
// 2. AUTH — Refresh token
// ─────────────────────────────────────────────
export const refreshAuth = async () => {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  const data = await res.json();
  accessToken = data.result?.token || data.access_token;
  return data;
};

// Helper — attach Bearer token
const authHeaders = () => ({
  "Content-Type": "application/json",
  ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
});

// ─────────────────────────────────────────────
// 3. TRANSPORT NODES
// ─────────────────────────────────────────────
export const getTransportNodes = async () => {
  const res = await fetch(`${BASE_URL}/transport-nodes`, { headers: authHeaders() });
  return res.json();
};

// ─────────────────────────────────────────────
// 4. PLACES — Search autocomplete
// ─────────────────────────────────────────────
export const findPlaces = async (query) => {
  const params = new URLSearchParams({
    term: query,
    language: "en",
    platform: 1,
  });
  const res = await fetch(`${BASE_URL}/places/find?${params}`, { headers: authHeaders() });
  const data = await res.json();
  console.log("findPlaces response:", JSON.stringify(data));
  return data;
};

// ─────────────────────────────────────────────
// 5. PLACES — Get place details (lat/lng)
// ─────────────────────────────────────────────
export const getPlaceDetails = async (placeId) => {
  const res = await fetch(`${BASE_URL}/places/${placeId}`, { headers: authHeaders() });
  const data = await res.json();
  console.log("getPlaceDetails response:", JSON.stringify(data));
  return data;
};

// ─────────────────────────────────────────────
// 6. PRICES — Get transfer offers
// ─────────────────────────────────────────────
export const getPrices = async ({ fromPlaceId, toPlaceId, datetime, passengers }) => {
  // First fetch coordinates for both places
  const [fromDetails, toDetails] = await Promise.all([
    getPlaceDetails(fromPlaceId),
    getPlaceDetails(toPlaceId),
  ]);

  const fromLat = fromDetails.result?.geometry?.location?.lat;
  const fromLng = fromDetails.result?.geometry?.location?.lng;
  const toLat   = toDetails.result?.geometry?.location?.lat;
  const toLng   = toDetails.result?.geometry?.location?.lng;

  console.log("from coords:", fromLat, fromLng);
  console.log("to coords:", toLat, toLng);

  if (!fromLat || !fromLng || !toLat || !toLng) {
    throw new Error("Could not get coordinates for selected locations.");
  }

  const params = new URLSearchParams({
    from:                fromPlaceId,
    to:                  toPlaceId,
    start_place_point:   `${fromLat},${fromLng}`,
    finish_place_point:  `${toLat},${toLng}`,
    departure_time:      datetime,
    passengers_count:    passengers,
    platform:            1,
  });

  const res = await fetch(`${BASE_URL}/prices?${params}`, { headers: authHeaders() });
  const data = await res.json();
  console.log("getPrices response:", JSON.stringify(data));
  return data;
};

// ─────────────────────────────────────────────
// 7. PRICES — Chauffeur/rent offers
// ─────────────────────────────────────────────
export const getRentPrices = async ({ placeId, hours, datetime }) => {
  const params = new URLSearchParams({ place: placeId, hours, datetime, platform: "web" });
  const res = await fetch(`${BASE_URL}/prices/rent?${params}`, { headers: authHeaders() });
  return res.json();
};

// ─────────────────────────────────────────────
// 8. ORDERS — Recommended dispatch time
// ─────────────────────────────────────────────
export const getRecommendedTime = async ({ from, to, datetime }) => {
  const params = new URLSearchParams({ from, to, datetime });
  const res = await fetch(`${BASE_URL}/orders/recommended-time?${params}`, { headers: authHeaders() });
  return res.json();
};

// ─────────────────────────────────────────────
// 9. ORDERS — Check trip availability
// ─────────────────────────────────────────────
export const checkTripTime = async ({ from, to, datetime, vehicleClass }) => {
  const res = await fetch(`${BASE_URL}/orders/check-time`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ from, to, datetime, vehicle_class: vehicleClass }),
  });
  return res.json();
};

// ─────────────────────────────────────────────
// 10. ORDERS — Create booking
// ─────────────────────────────────────────────
export const createOrder = async (orderData) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(orderData),
  });
  const data = await res.json();
  console.log("createOrder response:", JSON.stringify(data));
  return data;
};

// ─────────────────────────────────────────────
// 11. ORDERS — Approve/confirm payment
// ─────────────────────────────────────────────
export const approveOrder = async (transaction) => {
  const res = await fetch(`${BASE_URL}/orders/approve/${transaction}`, {
    method: "POST",
    headers: authHeaders(),
  });
  return res.json();
};

// ─────────────────────────────────────────────
// 12. ORDERS — Get payment link
// ─────────────────────────────────────────────
export const getPaymentUrl = async (orderId) => {
  const params = new URLSearchParams({ order_id: orderId });
  const res = await fetch(`${BASE_URL}/orders/pay-url?${params}`, { headers: authHeaders() });
  const data = await res.json();
  console.log("getPaymentUrl response:", JSON.stringify(data));
  return data;
};

// ─────────────────────────────────────────────
// 13. ORDERS — Get trips by filter
// ─────────────────────────────────────────────
export const getTrips = async ({ status, dateFrom, dateTo } = {}) => {
  const params = new URLSearchParams();
  if (status)   params.append("status", status);
  if (dateFrom) params.append("date_from", dateFrom);
  if (dateTo)   params.append("date_to", dateTo);
  const res = await fetch(`${BASE_URL}/orders/trips?${params}`, { headers: authHeaders() });
  return res.json();
};

// ─────────────────────────────────────────────
// 14. ORDERS — Check if order editable
// ─────────────────────────────────────────────
export const checkOrderUpdate = async (orderId) => {
  const res = await fetch(`${BASE_URL}/orders/${orderId}/check-update`, { headers: authHeaders() });
  return res.json();
};

// ─────────────────────────────────────────────
// 15. ORDERS — Edit order
// ─────────────────────────────────────────────
export const updateOrder = async (orderData) => {
  const res = await fetch(`${BASE_URL}/orders/trips`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(orderData),
  });
  return res.json();
};

// ─────────────────────────────────────────────
// 16. ORDERS — Check if cancellable
// ─────────────────────────────────────────────
export const checkCancelTrip = async (orderId) => {
  const res = await fetch(`${BASE_URL}/orders/${orderId}/check-cancel`, { headers: authHeaders() });
  return res.json();
};

// ─────────────────────────────────────────────
// 17. ORDERS — Cancel trip
// ─────────────────────────────────────────────
export const cancelTrip = async ({ tripId, reason }) => {
  const res = await fetch(`${BASE_URL}/orders/trips/cancel`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ trip_id: tripId, reason }),
  });
  return res.json();
};

// ─────────────────────────────────────────────
// 18. DOCUMENTS — Send voucher email
// ─────────────────────────────────────────────
export const sendVoucher = async (transaction) => {
  const res = await fetch(`${BASE_URL}/documents/send/${transaction}`, {
    method: "POST",
    headers: authHeaders(),
  });
  return res.json();
};

// ─────────────────────────────────────────────
// 19. DOCUMENTS — Get order documents
// ─────────────────────────────────────────────
export const getOrderDocuments = async (transaction) => {
  const res = await fetch(`${BASE_URL}/documents/${transaction}`, { headers: authHeaders() });
  return res.json();
};

// ─────────────────────────────────────────────
// 20. PARTNER — Get partner settings
// ─────────────────────────────────────────────
export const getPartnerSettings = async (userId) => {
  const res = await fetch(`${BASE_URL}/partners/frame-user-settings/${userId}`, { headers: authHeaders() });
  return res.json();
};