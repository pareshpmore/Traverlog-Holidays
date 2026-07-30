import {
  HONNAVAR_BACKWATER_BOATING,
  GOKARNA_COASTLINE,
  YANA_CAVES,
  MIRJAN_FORT,
  OM_BEACH,
  HONNAVAR_ESTUARY,
  MANGROVE_BOARDWALK_1,
  MANGROVE_BOARDWALK_2,
  MURDESHWARA_SHIVA_STATUE,
  KARWAR_COASTLINE,
  STONE_CHARIOT,
  MATANGA_HILL_SUNRISE,
  VIRUPAKSHA_TEMPLE,
  HEMAKUTA_HILL_TEMPLES,
  LOTUS_MAHAL,
  HAZARA_RAMA_TEMPLE_1,
  HAZARA_RAMA_TEMPLE_2,
  ANJANADRI_HILL,
  SANAPUR_LAKE,
  MATANGA_HILL_SUNSET,
} from "./karnatakaImages";

/* Helper: wrap a plain photo path or label into the {src,label} shape the
   card cover / slider expect. Used for tour.images (the top slider). */
const shot = (src, label) => ({ src, label });

/* ============================================================================
   TOURS DATA
   ----------------------------------------------------------------------------
   Each highlight can be:
     - a plain string                -> bullet point, no photo
     - { text }                      -> bullet point, no photo
     - { text, img: "url" }          -> one full-width photo above the text
     - { text, img: ["url","url"] }  -> TWO photos side-by-side above the text
   ============================================================================ */

export const TOURS = [
  {
    id: "hampi-holidays",
    title: "Hampi Holidays",
    region: "Hampi",
    duration: "3N / 4D",
    tagline: "The world's largest open-air museum, carved in granite.",
    images: [
      shot(STONE_CHARIOT, "Stone Chariot, Vijaya Vittala Temple"),
      shot(VIRUPAKSHA_TEMPLE, "Virupaksha Temple, Hampi"),
      shot(LOTUS_MAHAL, "Lotus Mahal, Hampi"),
      shot(MATANGA_HILL_SUNSET, "Matanga Hill, Hampi"),
    ],
    itinerary: [
      {
        day: 1,
        title: "Bangalore \u2192 Hampi",
        body: "On arrival at Bangalore (Bengaluru) Airport / Rail Station, transfer by road to Hampi (approx. 343 km / 7 hours). Hampi is famous for being the \u201cworld's largest open-air museum\u201d \u2013 the UNESCO-listed former capital of the mighty Vijayanagara Empire, celebrated for its 14th-century Dravidian architecture, mythological significance and surreal landscape of giant granite boulders.",
        highlights: ["Check into your hotel on arrival. Overnight stay in Hampi."],
      },
      {
        day: 2,
        title: "Hampi \u2013 Temple Trail",
        body: "Explore Hampi's sacred centre and its most iconic monuments.",
        highlights: [
          { text: "The Stone Chariot: at the Vijaya Vittala Temple, this iconic shrine is shaped like a traditional temple chariot and famously features on the Indian \u20b950 note. The temple's \u201cmusical pillars\u201d resonate with different notes when tapped.", img: STONE_CHARIOT },
          { text: "Virupaksha Temple: still an active place of worship dedicated to Lord Shiva, standing as the crowning jewel of Hampi's sacred centre.", img: VIRUPAKSHA_TEMPLE },
          { text: "Hemakuta Hill Temples: a short walk from Virupaksha, a cluster of ancient pre-Vijayanagara temples with panoramic views \u2013 a prime spot for sunrise and sunset.", img: HEMAKUTA_HILL_TEMPLES },
          "Overnight stay in Hampi.",
        ],
      },
      {
        day: 3,
        title: "Hampi \u2013 Royal Centre & Hills",
        body: "Visit the royal enclosure, its temples, and Hampi's two great viewpoint hills.",
        highlights: [
          { text: "Lotus Mahal & Zenana Enclosure: a two-story palace in the Royal Centre with a distinctive lotus-like design blending Hindu and Islamic styles, near the domed Elephant Stables.", img: LOTUS_MAHAL },
          "Lakshmi Narasimha Temple: home to Hampi's largest monolithic sculpture \u2013 a fierce 6.7-metre statue of Lord Narasimha carved from a single boulder.",
          { text: "Hazara Rama Temple: in the centre of the royal enclosure, famous for heavily carved walls depicting the Ramayana in sequential detail.", img: [HAZARA_RAMA_TEMPLE_1, HAZARA_RAMA_TEMPLE_2] },
          { text: "Anjanadri Hill & Sanapur Lake: across the Tungabhadra River, 575 steps lead to the Anjaneya Temple, believed to be the birthplace of Lord Hanuman. Relax after at Sanapur Lake with a traditional coracle boat ride.", img: [ANJANADRI_HILL, SANAPUR_LAKE] },
          { text: "Matanga Hill: the highest point in Hampi, with unparalleled 360-degree views of the ruins, river and boulders \u2013 a popular, steep 30-minute hike for sunset.", img: MATANGA_HILL_SUNSET },
          "Overnight stay in Hampi.",
        ],
      },
      {
        day: 4,
        title: "Departure",
        body: "Check out from the hotel and begin the return journey to Bangalore \u2013 approximately 7 hours by road. Tour ends.",
        highlights: [],
      },
    ],
  },

  {
    id: "gokarna-honnavar-murdeshwar",
    title: "Gokarna - Honnavar - Murdeshwar Holiday",
    region: "Gokarna \u2022 Honnavar \u2022 Murdeshwar \u2022 Karwar",
    duration: "4N / 5D",
    tagline: "Cliff-backed beaches, mangrove backwaters and a coastal Shiva statue.",
    images: [
      shot(OM_BEACH, "Om Beach, Gokarna"),
      shot(MURDESHWARA_SHIVA_STATUE, "Murdeshwara Shiva Statue"),
      shot(HONNAVAR_ESTUARY, "Honnavar Estuary"),
      shot(YANA_CAVES, "Yana Caves"),
    ],
    itinerary: [
      {
        day: 1,
        title: "Goa \u2192 Gokarna (Karnataka)",
        body: "On arrival at Goa airport, drive to Gokarna \u2013 about 3 hours / 125 km. Gokarna is famous for its unique blend of ancient Hindu pilgrimage sites and unspoiled, cliff-backed beaches on the Konkan coast of Karnataka, offering a laid-back, scenic alternative to Goa.",
        highlights: [
          { text: "Mahabaleshwar Temple: the spiritual heart of the town, one of the seven Mukti Kshetras (places of salvation) in Karnataka, housing the revered Atmalinga of Lord Shiva.", img: GOKARNA_COASTLINE },
          "Maha Ganapati Temple: near the Mahabaleshwar Temple, traditionally the first stop for pilgrims before visiting the main Shiva shrine.",
          "Explore Kudle Beach, Half Moon Beach and Paradise Beach.",
          "Overnight stay in Gokarna.",
        ],
      },
      {
        day: 2,
        title: "Gokarna \u2013 Caves, Fort & Om Beach",
        body: "A day of caves, a historic fort and Gokarna's most iconic beach.",
        highlights: [
          { text: "Yana Caves: about 50 km away, famous for striking, massive black limestone rock formations deep in the lush Western Ghats.", img: YANA_CAVES },
          { text: "Mirjan Fort: a 17th-century fort known for its laterite stone architecture and panoramic views.", img: MIRJAN_FORT },
          { text: "Om Beach: Gokarna's most famous beach, naturally shaped like the sacred Hindu \u201cOm\u201d symbol \u2013 a hub for water sports and beach shacks, with panoramic Arabian Sea sunsets from the hilltops above.", img: OM_BEACH },
          "Overnight stay in Gokarna.",
        ],
      },
      {
        day: 3,
        title: "Gokarna \u2192 Honnavar",
        body: "Drive to Honnavar in the morning \u2013 a serene coastal port town famous for the breathtaking estuary where the Sharavathi River meets the Arabian Sea, known for its mangrove forests, backwater boat rides and the Blue Flag-certified Kasarkod Eco Beach.",
        highlights: [
          { text: "Backwater Boating: serene rides through palm-fringed estuaries and mangrove tunnels, past lotus-covered water and open skies \u2013 excellent for bird-watching and photography.", img: [HONNAVAR_ESTUARY, HONNAVAR_BACKWATER_BOATING] },
          "Overnight stay in Honnavar.",
        ],
      },
      {
        day: 4,
        title: "Honnavar \u2192 Murdeshwar \u2192 Honnavar",
        body: "A day exploring mangrove boardwalks and the coastal pilgrimage town of Murdeshwar.",
        highlights: [
          { text: "Sharavathi Kandla Mangrove Boardwalk: a wooden pathway winding through dense mangrove forest \u2013 a 1.5 km walk to a narrow wooden walkway built across an island-like stretch within the forest.", img: [MANGROVE_BOARDWALK_1, MANGROVE_BOARDWALK_2] },
          { text: "Murdeshwara: home to the world's second-tallest Lord Shiva statue (123 feet) beside the Arabian Sea, alongside the Murudeshwara Temple, the towering 20-story Raja Gopura, and nearby diving at Netrani Island.", img: MURDESHWARA_SHIVA_STATUE },
          "Overnight stay in Honnavar.",
        ],
      },
      {
        day: 5,
        title: "Honnavar \u2192 Karwar \u2192 Departure",
        body: "Drive towards Karwar on the way back to Goa \u2013 a picturesque coastal town famous for its pristine, crowd-free beaches where the Kali River meets the Arabian Sea.",
        highlights: [
          { text: "Devbagh Beach: a short boat ride away, an island-like beach known for water sports such as snorkeling, kayaking and banana boat rides.", img: KARWAR_COASTLINE },
          "The Kali Bridge: spanning the Kali River as it flows into the sea, with spectacular panoramic views of the Western Ghats and the estuary.",
          "Transfer to Goa airport / rail station for your homeward journey. Tour ends.",
        ],
      },
    ],
  },
];
