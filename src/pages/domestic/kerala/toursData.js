import {
  MUNNAR_HILLS,
  ECHO_POINT,
  ERAVIKULAM_PARK_1, ERAVIKULAM_PARK_2,
  ALLEPPEY_BACKWATERS_1, ALLEPPEY_BACKWATERS_2,
  AMBALAPPUZHA_TEMPLE,
  SANTA_CRUZ_BASILICA,
  POOVAR_ISLAND,
  CHERAI_BEACH,
  CHINESE_FISHING_NETS,
  FORT_KOCHI,
  VELLAYANI_LAKE,
  PADMANABHASWAMY_TEMPLE_1, PADMANABHASWAMY_TEMPLE_2,
  KANYAKUMARI,
} from "./keralaImages";

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
    id: "wonderful-kerala-kanyakumari",
    title: "Wonderful Kerala Holiday With Kanyakumari",
    region: "Kochi \u2022 Munnar \u2022 Alleppey \u2022 Kovalam \u2022 Kanyakumari",
    duration: "7N / 8D",
    tagline: "Backwaters, tea hills and the southern tip of India, all in one trip.",
    images: [
      shot(ALLEPPEY_BACKWATERS_1, "Alleppey Backwaters"),
      shot(MUNNAR_HILLS, "Munnar Tea Hills"),
      shot(KANYAKUMARI, "Kanyakumari"),
      shot(CHINESE_FISHING_NETS, "Chinese Fishing Nets, Kochi"),
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival at Kochi",
        body: "On arrival at Kochi airport, transfer to hotel. Later, start local sightseeing.",
        highlights: [
          "St. Francis Church: built in 1503, one of the oldest European churches in India and the original burial site of Vasco da Gama.",
          { text: "Santa Cruz Cathedral Basilica: a heritage church with pastel interiors and historic paintings.", img: SANTA_CRUZ_BASILICA },
          "Princess Street: a pedestrian-friendly street lined with colonial-era bungalows, art galleries and cafes like Kashi Art Cafe.",
          "Mattancherry Palace (Dutch Palace): famous for murals depicting scenes from Hindu epics and Kerala's royal history.",
          "Paradesi Synagogue: one of the oldest active synagogues in the Commonwealth, with hand-painted floor tiles and Belgian chandeliers.",
          "Jew Town: a bustling street between the palace and synagogue, known for antique stores, spice markets and curio shops.",
          { text: "Cherai Beach: on Vypin Island, known for shallow waters and occasional dolphin sightings.", img: CHERAI_BEACH },
          "Kumbalangi Village: a model tourism village on the backwaters offering canoe rides, crab farming and local Kerala cuisine.",
          { text: "Chinese Fishing Nets: iconic cantilevered nets along Vasco da Gama Square, best viewed at sunset.", img: CHINESE_FISHING_NETS },
          "Marine Drive: a 3 km walkway facing the backwaters and Kochi Harbour, perfect for evening strolls and sunset ferry rides.",
          "Overnight stay in Kochi.",
        ],
      },
      {
        day: 2,
        title: "Kochi \u2192 Munnar",
        body: "Check out and go for sightseeing of Fort Kochi before the transfer to Munnar (approx. 4 hours).",
        highlights: [
          { text: "Fort Kochi: a historic seaside neighbourhood known for colonial architecture, the iconic Chinese Fishing Nets and diverse cultural heritage.", img: FORT_KOCHI },
          { text: "Munnar: a hill station in the Western Ghats, former resort for the British Raj elite, surrounded by rolling hills and tea plantations from the late 19th century. Enjoy the evening views around your hotel.", img: MUNNAR_HILLS },
          "Overnight stay in Munnar.",
        ],
      },
      {
        day: 3,
        title: "Munnar",
        body: "Local sightseeing including Echo Point, Mattupetty Dam, Blossom Garden, Tata Tea Plantation and Kundala Lake. Rest of the day at leisure.",
        highlights: [
          { text: "Echo Point: 15 km from Munnar in Idukki district, named for its natural echo phenomenon.", img: ECHO_POINT },
          "Mattupetty Dam: a picturesque reservoir near Munnar surrounded by rolling tea plantations, with adventure activities.",
          "Blossom Hydel Park: about 3 km from Munnar Town.",
          "Tea Museum (KDHP): an in-depth look into the history, cultivation and processing of tea in Kerala.",
          "Kundala Lake: pedal boats and rowboats to explore the lake and views.",
          "Overnight stay in Munnar.",
        ],
      },
      {
        day: 4,
        title: "Munnar",
        body: "Visit Rajamalai and Eravikulam Wildlife Sanctuary, tea gardens, Devikulam and Attukal Dreamland Spice Park waterfalls.",
        highlights: [
          "Rajamala: 15 km from Munnar, celebrated for its resident Nilgiri Tahr and captivating natural beauty.",
          { text: "Eravikulam National Park: the primary habitat of the endangered Nilgiri Tahr, home to Anamudi (South India's highest peak) and the rare Neelakurinji flower that blooms every 12 years.", img: [ERAVIKULAM_PARK_1, ERAVIKULAM_PARK_2] },
          "Overnight stay in Munnar.",
        ],
      },
      {
        day: 5,
        title: "Munnar \u2192 Alleppey",
        body: "Check out and drive to Alleppey (approx. 4 to 5 hours), globally known as the \u201cVenice of the East\u201d for its backwaters, houseboat cruises and the Nehru Trophy Boat Race.",
        highlights: [
          { text: "Check into your hotel / houseboat. Take a houseboat ride through the backwaters to explore birds and Kerala wildlife, with a chance to fish on the river.", img: [ALLEPPEY_BACKWATERS_1, ALLEPPEY_BACKWATERS_2] },
          "Alappuzha Beach: a 137-year-old pier extending into the Arabian Sea, a great spot for sunset, connecting to Vijaya Beach Park.",
          "Marari Beach: 18 km north of town, a pristine beach often ranked among the world's best hammock beaches.",
          { text: "Ambalappuzha Sree Krishna Temple: a historic Hindu temple in traditional Kerala architecture, famous for its Palpayasam sweet milk pudding prasadam.", img: AMBALAPPUZHA_TEMPLE },
          "Krishnapuram Palace: an 18th-century Travancore-era palace near Kayamkulam with an archaeological museum and the largest single-piece mural in Kerala.",
          "Alappuzha Lighthouse: panoramic sea and city views from the top.",
          "Pathiramanal Island: a secluded birdwatching island on Vembanad Lake, reachable by a short boat ride.",
        ],
      },
      {
        day: 6,
        title: "Munnar \u2192 Kovalam (Trivandrum)",
        body: "Check out and drive to Kovalam \u2013 around 5 to 6 hours. Kovalam is a coastal town 13 km south of Thiruvananthapuram, famous for three crescent-shaped beaches and Ayurvedic wellness retreats. En route:",
        highlights: [
          "Vizhinjam Rock Cut Cave Temple: an 8th-century rock-cut temple with unfinished sculptures of Lord Shiva and Parvathi.",
          { text: "Vellayani Lake: 7 km from Kovalam, a peaceful freshwater lake for boating, bird watching and sunset views.", img: VELLAYANI_LAKE },
          "Karamana River: a scenic river through lush greenery, offering boating, fishing and nature walks.",
          { text: "Poovar Island: about 16 km away, where the river, sea and backwaters meet \u2013 mangrove forest boat tours available.", img: POOVAR_ISLAND },
        ],
      },
      {
        day: 7,
        title: "Kovalam \u2013 Trivandrum \u2013 Kanyakumari \u2013 Kovalam",
        body: "An early start for temple and museum visits before continuing to Kanyakumari.",
        highlights: [
          { text: "Padmanabhaswamy Temple: a historically significant temple 12 km away, known for intricate Dravidian architecture and rich vaults.", img: [PADMANABHASWAMY_TEMPLE_1, PADMANABHASWAMY_TEMPLE_2] },
          "Napier Museum & Zoo: 150-year-old architectural marvels in Trivandrum with natural history exhibits and Kerala's finest bronze sculptures.",
          { text: "Kanyakumari: the southernmost tip of mainland India, where the Arabian Sea, Bay of Bengal and Indian Ocean meet. Around 2 hours' drive from Trivandrum.", img: KANYAKUMARI },
          "Triveni Sangam: the sacred meeting point of the three oceans, where many pilgrims bathe.",
          "Vivekananda Rock Memorial & Thiruvalluvar Statue: reached by a short ferry ride, where Swami Vivekananda is said to have meditated.",
          "Devi Kanya Kumari Temple: a 3,000-year-old temple dedicated to the virgin goddess, known for her diamond nose-ring said to be visible from the sea.",
          "Simultaneous Sunrise & Sunset: one of the few places in the world where you can watch the sun rise and set from the same beach.",
          "Drive back to Kovalam for overnight stay.",
        ],
      },
      {
        day: 8,
        title: "Departure",
        body: "After breakfast, check out and drive back to Kochi Airport / Ernakulam Rail Station (approx. 5 to 6 hours), or transfer to the closer Trivandrum Airport / rail station (approx. 30 to 40 minutes from Kovalam). Tour ends.",
        highlights: [],
      },
    ],
  },

  {
    id: "munnar-with-alleppey",
    title: "Munnar With Alleppey Holiday",
    region: "Kochi \u2022 Munnar \u2022 Alleppey",
    duration: "4N / 5D",
    tagline: "Tea-hill mornings and backwater evenings.",
    images: [
      shot(MUNNAR_HILLS, "Munnar Tea Hills"),
      shot(ALLEPPEY_BACKWATERS_1, "Alleppey Backwaters"),
      shot(ERAVIKULAM_PARK_1, "Eravikulam National Park"),
      shot(AMBALAPPUZHA_TEMPLE, "Ambalappuzha Sree Krishna Temple"),
    ],
    itinerary: [
      {
        day: 1,
        title: "Kochi \u2192 Munnar",
        body: "On arrival at Kochi Airport / Ernakulam Rail Station, transfer to Munnar (approx. 4 hours). Check into your hotel; rest of the day at leisure.",
        highlights: [
          { text: "Munnar: a hill station in the Western Ghats, former resort for the British Raj elite, surrounded by rolling hills and tea plantations from the late 19th century. Enjoy the evening views around your hotel.", img: MUNNAR_HILLS },
          "Overnight stay in Munnar.",
        ],
      },
      {
        day: 2,
        title: "Munnar",
        body: "Local sightseeing including Echo Point, Mattupetty Dam, Blossom Garden, Tata Tea Plantation and Kundala Lake. Rest of the day at leisure.",
        highlights: [
          { text: "Echo Point: 15 km from Munnar in Idukki district, named for its natural echo phenomenon.", img: ECHO_POINT },
          "Mattupetty Dam: a picturesque reservoir near Munnar surrounded by rolling tea plantations, with adventure activities.",
          "Blossom Hydel Park: about 3 km from Munnar Town.",
          "Tea Museum (KDHP): an in-depth look into the history, cultivation and processing of tea in Kerala.",
          "Kundala Lake: pedal boats and rowboats to explore the lake and views.",
          "Overnight stay in Munnar.",
        ],
      },
      {
        day: 3,
        title: "Munnar",
        body: "Visit Rajamalai and Eravikulam Wildlife Sanctuary, tea gardens, Devikulam and Attukal Dreamland Spice Park waterfalls.",
        highlights: [
          "Rajamala: 15 km from Munnar, celebrated for its resident Nilgiri Tahr and captivating natural beauty.",
          { text: "Eravikulam National Park: the primary habitat of the endangered Nilgiri Tahr, home to Anamudi (South India's highest peak) and the rare Neelakurinji flower that blooms every 12 years.", img: [ERAVIKULAM_PARK_1, ERAVIKULAM_PARK_2] },
          "Overnight stay in Munnar.",
        ],
      },
      {
        day: 4,
        title: "Munnar \u2192 Alleppey",
        body: "Check out and drive to Alleppey (approx. 4 to 5 hours), globally known as the \u201cVenice of the East\u201d for its backwaters, houseboat cruises and the Nehru Trophy Boat Race.",
        highlights: [
          { text: "Check into your hotel / houseboat. Take a houseboat ride through the backwaters to explore birds and Kerala wildlife, with a chance to fish on the river.", img: [ALLEPPEY_BACKWATERS_1, ALLEPPEY_BACKWATERS_2] },
          "Alappuzha Beach: a 137-year-old pier extending into the Arabian Sea, a great spot for sunset, connecting to Vijaya Beach Park.",
          "Marari Beach: 18 km north of town, a pristine beach often ranked among the world's best hammock beaches.",
          { text: "Ambalappuzha Sree Krishna Temple: a historic Hindu temple in traditional Kerala architecture, famous for its Palpayasam sweet milk pudding prasadam.", img: AMBALAPPUZHA_TEMPLE },
          "Krishnapuram Palace: an 18th-century Travancore-era palace near Kayamkulam with an archaeological museum and the largest single-piece mural in Kerala.",
          "Alappuzha Lighthouse: panoramic sea and city views from the top.",
          "Pathiramanal Island: a secluded birdwatching island on Vembanad Lake, reachable by a short boat ride.",
        ],
      },
      {
        day: 5,
        title: "Departure",
        body: "After breakfast, check out and drive back to Kochi Airport / Ernakulam Rail Station \u2013 approximately 2 hours. Tour ends.",
        highlights: [],
      },
    ],
  },

  {
    id: "munnar-highlights",
    title: "Munnar Highlights",
    region: "Ex. Kochi \u2022 Munnar",
    duration: "3N / 4D",
    tagline: "A quick escape into Kerala's tea-scented hills.",
    images: [
      shot(MUNNAR_HILLS, "Munnar Tea Hills"),
      shot(ECHO_POINT, "Echo Point, Munnar"),
      shot(ERAVIKULAM_PARK_1, "Eravikulam National Park"),
      shot(ERAVIKULAM_PARK_2, "Nilgiri Tahr, Eravikulam"),
    ],
    itinerary: [
      {
        day: 1,
        title: "Kochi \u2192 Munnar",
        body: "On arrival at Kochi Airport / Ernakulam Rail Station, transfer to Munnar (approx. 4 hours). Check into your hotel; rest of the day at leisure.",
        highlights: [
          { text: "Munnar: a hill station in the Western Ghats, former resort for the British Raj elite, surrounded by rolling hills and tea plantations from the late 19th century. Enjoy the evening views around your hotel.", img: MUNNAR_HILLS },
          "Overnight stay in Munnar.",
        ],
      },
      {
        day: 2,
        title: "Munnar",
        body: "Local sightseeing including Echo Point, Mattupetty Dam, Blossom Garden, Tata Tea Plantation and Kundala Lake. Rest of the day at leisure.",
        highlights: [
          { text: "Echo Point: 15 km from Munnar in Idukki district, named for its natural echo phenomenon.", img: ECHO_POINT },
          "Mattupetty Dam: a picturesque reservoir near Munnar surrounded by rolling tea plantations, with adventure activities.",
          "Blossom Hydel Park: about 3 km from Munnar Town.",
          "Tea Museum (KDHP): an in-depth look into the history, cultivation and processing of tea in Kerala.",
          "Kundala Lake: pedal boats and rowboats to explore the lake and views.",
          "Overnight stay in Munnar.",
        ],
      },
      {
        day: 3,
        title: "Munnar",
        body: "Visit Rajamalai and Eravikulam Wildlife Sanctuary, tea gardens, Devikulam and Attukal Dreamland Spice Park waterfalls.",
        highlights: [
          "Rajamala: 15 km from Munnar, celebrated for its resident Nilgiri Tahr and captivating natural beauty.",
          { text: "Eravikulam National Park: the primary habitat of the endangered Nilgiri Tahr, home to Anamudi (South India's highest peak) and the rare Neelakurinji flower that blooms every 12 years.", img: [ERAVIKULAM_PARK_1, ERAVIKULAM_PARK_2] },
          "Overnight stay in Munnar.",
        ],
      },
      {
        day: 4,
        title: "Departure",
        body: "After breakfast, check out and drive back to Kochi Airport / Ernakulam Rail Station \u2013 approximately 4 hours. Tour ends.",
        highlights: [],
      },
    ],
  },
];
