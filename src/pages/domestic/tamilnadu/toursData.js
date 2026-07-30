import {
  MEENAKSHI_TEMPLE,
  THIRUMALAI_PALACE,
  THIRUPPARAMKUNRAM_TEMPLE,
  ADIYOGI_STATUE,
  MARUDHAMALAI_TEMPLE_1,
  MARUDHAMALAI_TEMPLE_2,
  VALPARAI_1,
  VALPARAI_2,
  BETHESDA_PRAYER_CENTRE,
  ARJUNAS_PENANCE,
  KAMAKSHI_AMMAN_TEMPLE,
  SEASHELL_MUSEUM_1,
  SEASHELL_MUSEUM_2,
  VARADARAJA_TEMPLE_1,
  VARADARAJA_TEMPLE_2,
  KAILASANATHAR_TEMPLE,
  KANCHIPURAM_SILK_1,
  KANCHIPURAM_SILK_2,
  SHORE_TEMPLE,
  KRISHNAS_BUTTERBALL,
  VARAHA_CAVE_TEMPLE_KANCHI,
  VARAHA_CAVE_TEMPLE_2,
  MAHABALIPURAM_BEACH,
  AUROVILLE_MATRIMANDIR,
  VARAHA_CAVE_TEMPLE_PONDY,
} from "./tamilNaduImages";

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
    id: "coimbatore-madurai",
    title: "Coimbatore - Madurai Holiday Package",
    region: "Madurai \u2022 Coimbatore",
    duration: "4N / 5D",
    tagline: "Temple towers, palaces and misty tea-estate drives.",
    images: [
      shot(MEENAKSHI_TEMPLE, "Meenakshi Amman Temple, Madurai"),
      shot(ADIYOGI_STATUE, "Adiyogi Shiva Statue, Coimbatore"),
      shot(VALPARAI_1, "Valparai Hill Station"),
      shot(MARUDHAMALAI_TEMPLE_1, "Marudhamalai Temple"),
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival at Coimbatore \u2192 Madurai",
        body: "On arrival at Coimbatore Airport / Rail Station, transfer by road to Madurai (approx. 4 hours), enjoying a scenic drive through green countryside. Madurai, the cultural capital of Tamil Nadu, is globally famous for the colossal Meenakshi Amman Temple, ancient Dravidian architecture and the fragrant Madurai Malli (jasmine) \u2013 earning it the name \u201cAthens of the East.\u201d",
        highlights: [
          { text: "The Meenakshi Amman Temple: the absolute heartbeat of the city, dedicated to Goddess Meenakshi and Lord Shiva, famous for its 14 towering, colourfully sculpted gopurams (gateway towers).", img: MEENAKSHI_TEMPLE },
          { text: "Thirumalai Nayakkar Palace: built in 1636, celebrated for its massive pillars and a seamless blend of Dravidian and Islamic architecture. A nightly sound-and-light show retells the history of the Nayaka dynasty (English 6:45\u20137:35 PM, Tamil 8:00\u20138:50 PM).", img: THIRUMALAI_PALACE },
          "Overnight stay in Madurai.",
        ],
      },
      {
        day: 2,
        title: "Madurai \u2013 Temple Trail",
        body: "A day dedicated to Madurai's spiritual landmarks.",
        highlights: [
          { text: "Thirupparamkunram Murugan Temple: an ancient rock-cut cave temple about 8 km from the city, dedicated to Lord Murugan and one of his six abodes.", img: THIRUPPARAMKUNRAM_TEMPLE },
          "Azhagar Kovil: a fortress-like temple 21 km northeast of the city at the foothills of the Alagar Hills, dedicated to Lord Vishnu.",
          "Vandiyur Mariamman Teppakulam: a 16-acre temple tank, especially breathtaking during the Float Festival (usually January/February).",
          "Samanar Malai (Samanar Hills): rock-cut caves and stone beds once used by Jain monks, about 12 km from Madurai, with panoramic views.",
          "Overnight stay in Madurai.",
        ],
      },
      {
        day: 3,
        title: "Madurai \u2192 Coimbatore",
        body: "Drive back to Coimbatore in the morning \u2013 a major industrial city known as the \u201cManchester of South India\u201d and the \u201cPump City,\u201d sitting on the banks of the Noyyal River near the Western Ghats.",
        highlights: [
          { text: "Adiyogi Shiva Statue & Isha Yoga Center: a 112-foot statue about 30 km from the city, accompanied by the peaceful Dhyanalinga meditative space.", img: ADIYOGI_STATUE },
          { text: "Marudhamalai Temple: a 12th-century hill temple dedicated to Lord Murugan, roughly 15 km from the city, with panoramic views and a serene spiritual climb.", img: [MARUDHAMALAI_TEMPLE_1, MARUDHAMALAI_TEMPLE_2] },
          "Overnight stay in Coimbatore.",
        ],
      },
      {
        day: 4,
        title: "Coimbatore Sightseeing",
        body: "Explore more of Coimbatore's temples and its escape into the hills.",
        highlights: [
          "Eachanari Vinayagar Temple: on the NH towards Pollachi, famous for housing one of the largest Ganesha idols in the region.",
          { text: "Valparai: a breathtaking hill station about 64 km away, reached via 40 hairpin bends through dense tea estates and waterfalls, 3,500 feet above sea level and a peaceful alternative to Ooty.", img: [VALPARAI_1, VALPARAI_2] },
          "Overnight stay in Coimbatore.",
        ],
      },
      {
        day: 5,
        title: "Sightseeing & Departure",
        body: "Wrap up the trip with two very different Coimbatore landmarks before heading home.",
        highlights: [
          "The Gedee Car Museum: the only classic car museum of its kind in Coimbatore, with a collection of unique cars not seen elsewhere in India.",
          { text: "Bethesda International Prayer Centre: a peaceful Christian sanctuary spanning 10.5 acres near the Western Ghats, offering prayer, counseling and meditation daily.", img: BETHESDA_PRAYER_CENTRE },
          "Transfer to the airport / rail station for your homeward journey. Tour ends.",
        ],
      },
    ],
  },

  {
    id: "kanchipuram-mahabalipuram",
    title: "Kanchipuram - Mahabalipuram Holiday",
    region: "Kanchipuram \u2022 Mahabalipuram",
    duration: "4N / 5D",
    tagline: "The City of Thousand Temples meets the Shore Temple by the sea.",
    images: [
      shot(SHORE_TEMPLE, "Shore Temple, Mahabalipuram"),
      shot(KAMAKSHI_AMMAN_TEMPLE, "Sri Kamakshi Amman Temple, Kanchipuram"),
      shot(KRISHNAS_BUTTERBALL, "Krishna's Butter Ball"),
      shot(KANCHIPURAM_SILK_1, "Kanchipuram Silk Weaving"),
    ],
    itinerary: [
      {
        day: 1,
        title: "Chennai \u2192 Kanchipuram",
        body: "On arrival at Chennai Airport / Rail Station, transfer by road to Kanchipuram (about 75 km / 2 hours). Known as the \u201cCity of Thousand Temples\u201d and for its world-renowned handwoven silk saris, Kanchipuram is one of Hinduism's seven holiest cities, famous for its Dravidian architecture and traditional weaving.",
        highlights: [
          { text: "Sri Kamakshi Amman Temple: dedicated to the Goddess of Love and devotion, one of the most prominent Shakti Peethas, featuring a grand Gayatri Mandapam.", img: KAMAKSHI_AMMAN_TEMPLE },
          { text: "Varadaraja Perumal Temple: a 23-acre 108 Divya Desam dedicated to Lord Vishnu, with an iconic 100-pillared hall carved by the Vijayanagar kings.", img: [VARADARAJA_TEMPLE_1, VARADARAJA_TEMPLE_2] },
          "Ekambareswarar Temple: spread over 10 hectares, representing the Earth element, with a magnificent 59-metre Raja Gopuram.",
          { text: "Kailasanathar Temple: the oldest surviving sandstone structure in Kanchipuram, famed for Pallava-era architecture and a 10-foot Shiva Lingam.", img: KAILASANATHAR_TEMPLE },
          "Overnight stay in Kanchipuram.",
        ],
      },
      {
        day: 2,
        title: "Kanchipuram \u2013 Heritage & Silk",
        body: "Explore more of Kanchipuram's culture, history and famous weaving traditions.",
        highlights: [
          "Sakunthala Jaganathan Museum of Folk Art: a 400-year-old ancestral home turned museum, displaying antique dolls, palm leaves, musical instruments and traditional dress.",
          "Ulagalandha Perumal Temple: dedicated to Vamana Avataar, the fifth incarnation of Lord Vishnu, built by Jayam Konda Cholan.",
          { text: "Exquisite Kanchipuram Silk (Kanjeevaram): globally prized for pure mulberry silk and intricate gold-and-silver zari work \u2013 explore the bazaars of Gandhi Road and Nellukara Street for authentic textile shopping.", img: [KANCHIPURAM_SILK_1, KANCHIPURAM_SILK_2] },
          "Overnight stay in Kanchipuram.",
        ],
      },
      {
        day: 3,
        title: "Kanchipuram \u2192 Mahabalipuram",
        body: "Drive to Mahabalipuram (Mamallapuram), about 2 hours away \u2013 a UNESCO World Heritage Site famous for 7th- and 8th-century Pallava dynasty rock-cut temples.",
        highlights: [
          { text: "Shore Temple: a spectacular seafront complex of three granite shrines dedicated to both Shiva and Vishnu, overlooking the Bay of Bengal.", img: SHORE_TEMPLE },
          "Pancha Rathas: five monolithic rock temples shaped like chariots, named after the five Pandava brothers and their common wife.",
          { text: "Krishna's Butter Ball: a 250-ton, 20-foot granite boulder that precariously balances on a 45-degree slope near the Ganesha Ratha temple.", img: KRISHNAS_BUTTERBALL },
          { text: "Arjuna's Penance (Descent of the Ganges): a massive 7th-century open-air rock relief carved on two giant boulders, depicting Hindu mythological scenes.", img: ARJUNAS_PENANCE },
          "Overnight stay in Mahabalipuram.",
        ],
      },
      {
        day: 4,
        title: "Mahabalipuram Sightseeing",
        body: "Explore more of Mahabalipuram's temples, wildlife and coastline.",
        highlights: [
          { text: "Varaha Cave Temple: an architectural marvel within the UNESCO World Heritage Site of Mamallapuram.", img: [VARAHA_CAVE_TEMPLE_KANCHI, VARAHA_CAVE_TEMPLE_2] },
          "The Madras Crocodile Bank Trust and Centre for Herpetology: one of the largest reptile zoos in the world, spread over eight and a half acres.",
          { text: "India Seashell Museum: a fantastic collection of sea shells, minerals, dinosaur fossils, pearls and fish from around the world.", img: [SEASHELL_MUSEUM_1, SEASHELL_MUSEUM_2] },
          { text: "Mahabalipuram Beach: a scenic Bay of Bengal coastline, 58 km south of Chennai, with the UNESCO-listed Shore Temple sitting right on the sand. Relax and enjoy sunset.", img: MAHABALIPURAM_BEACH },
          "Overnight stay in Mahabalipuram.",
        ],
      },
      {
        day: 5,
        title: "Departure",
        body: "Drive back to Chennai (approx. 2 hours). En route, enjoy the beauty of Marina Beach, Elliot's Beach, Kapaleeshwarar Temple and the Government Museum Chennai before transfer to the airport / rail station. Tour ends.",
        highlights: [],
      },
    ],
  },

  {
    id: "pondicherry-mahabalipuram",
    title: "Pondicherry (Puducherry) - Mahabalipuram Holiday",
    region: "Pondicherry \u2022 Mahabalipuram",
    duration: "4N / 5D",
    tagline: "French colonial streets by the sea, then Pallava rock temples.",
    images: [
      shot(AUROVILLE_MATRIMANDIR, "Auroville Matrimandir"),
      shot(SHORE_TEMPLE, "Shore Temple, Mahabalipuram"),
      shot(KRISHNAS_BUTTERBALL, "Krishna's Butter Ball"),
      shot(MAHABALIPURAM_BEACH, "Mahabalipuram Beach"),
    ],
    itinerary: [
      {
        day: 1,
        title: "Chennai \u2192 Pondicherry",
        body: "On arrival at Chennai Airport / Railway Station, transfer to Pondicherry \u2013 a comfortable, scenic 3 to 4 hour drive. Pondicherry is famous for its distinct French colonial heritage, preserved in the colourful, bougainvillea-draped heritage buildings of White Town. On arrival, check into your hotel and enjoy the evening on the beaches.",
        highlights: ["Overnight stay in Pondicherry."],
      },
      {
        day: 2,
        title: "Pondicherry Sightseeing",
        body: "A full day exploring the French Quarter, Auroville and Pondicherry's spiritual and cultural landmarks.",
        highlights: [
          "The French Quarter (White Town): bright yellow and pastel colonial villas, cobbled streets and hanging flowers, with a cafe culture famous for French pastries, crepes and artisanal coffee.",
          { text: "Auroville and the Matrimandir: an experimental international township 10 km north of the city, centred on a massive golden geodesic dome used as a meditation space, surrounded by lush gardens.", img: AUROVILLE_MATRIMANDIR },
          "Sri Aurobindo Ashram: a major destination in the city for meditation and peaceful reflection.",
          "Basilica of the Sacred Heart of Jesus: a striking Gothic-style Catholic church built in 1908, famous for its stained-glass windows.",
          "Arulmigu Manakula Vinayagar Temple: a 17th-century Hindu temple dedicated to Lord Ganesha, known for its golden chariot and resident temple elephant.",
          "Puducherry Museum: noted for its collection of 81 Chola bronze sculptures, one of the largest such collections in the world.",
          "Evening spent on the beaches. Overnight stay in Pondicherry.",
        ],
      },
      {
        day: 3,
        title: "Pondicherry \u2192 Mahabalipuram",
        body: "Depart early for Mahabalipuram (Mamallapuram), about 2 hours away \u2013 a UNESCO World Heritage Site famous for 7th- and 8th-century Pallava dynasty rock-cut temples.",
        highlights: [
          { text: "Shore Temple: a spectacular seafront complex of three granite shrines dedicated to both Shiva and Vishnu, overlooking the Bay of Bengal.", img: SHORE_TEMPLE },
          "Pancha Rathas: five monolithic rock temples shaped like chariots, named after the five Pandava brothers and their common wife.",
          { text: "Krishna's Butter Ball: a 250-ton, 20-foot granite boulder that precariously balances on a 45-degree slope near the Ganesha Ratha temple.", img: KRISHNAS_BUTTERBALL },
          { text: "Arjuna's Penance (Descent of the Ganges): a massive 7th-century open-air rock relief carved on two giant boulders, depicting Hindu mythological scenes.", img: ARJUNAS_PENANCE },
          "Evening spent watching the sunset on the beach. Overnight stay in Mahabalipuram.",
        ],
      },
      {
        day: 4,
        title: "Mahabalipuram Sightseeing",
        body: "Explore more of Mahabalipuram's temples, wildlife and coastline.",
        highlights: [
          { text: "Varaha Cave Temple: an architectural marvel within the UNESCO World Heritage Site of Mamallapuram.", img: [VARAHA_CAVE_TEMPLE_PONDY, VARAHA_CAVE_TEMPLE_2] },
          "The Madras Crocodile Bank Trust and Centre for Herpetology: one of the largest reptile zoos in the world, spread over eight and a half acres.",
          { text: "India Seashell Museum: a fantastic collection of sea shells, minerals, dinosaur fossils, pearls and fish from around the world.", img: [SEASHELL_MUSEUM_1, SEASHELL_MUSEUM_2] },
          { text: "Mahabalipuram Beach: a scenic Bay of Bengal coastline, 58 km south of Chennai, with the UNESCO-listed Shore Temple sitting right on the sand. Relax and enjoy sunset.", img: MAHABALIPURAM_BEACH },
          "Overnight stay in Mahabalipuram.",
        ],
      },
      {
        day: 5,
        title: "Departure",
        body: "Drive back to Chennai (approx. 2 hours). En route, enjoy the beauty of Marina Beach, Elliot's Beach, Kapaleeshwarar Temple and the Government Museum Chennai before transfer to the airport / rail station. Tour ends.",
        highlights: [],
      },
    ],
  },
];
