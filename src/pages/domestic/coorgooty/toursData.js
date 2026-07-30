import {
  COORG_MADIKERI,
  DUBARE_ELEPHANT_CAMP,
  RAJAS_SEAT,
  BRAHMAGIRI_HILLS,
  MYSORE_PALACE,
  BRINDAVAN_GARDEN,
  OOTY_VIEW_1,
  OOTY_VIEW_2,
  BANASURA_SAGAR_DAM,
  CHEMBRA_PEAK_1,
  CHEMBRA_PEAK_2,
  KURUVA_ISLAND_1,
  KURUVA_ISLAND_2,
  MUTHANGA_WILDLIFE,
  KALHATTY_WATERFALLS,
  OOTY_CATHERINE_FALLS,
} from "./coorgOotyImages";

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
    id: "coorg-small-break",
    title: "Coorg Small Break Holiday",
    region: "Coorg",
    duration: "3N / 4D",
    tagline: "A quick escape into the Scotland of India.",
    images: [
      shot(COORG_MADIKERI, "Madikeri, Coorg"),
      shot(RAJAS_SEAT, "Raja's Seat, Coorg"),
      shot(DUBARE_ELEPHANT_CAMP, "Dubare Elephant Camp"),
      shot(BRAHMAGIRI_HILLS, "Brahmagiri Hills"),
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive at Bangalore Airport \u2192 Coorg",
        body: "On arrival at Bangalore airport, meet and greet with our representative and transfer by road to Coorg (approximately 5 hours' drive). On arrival, check in at the hotel. Day at leisure \u2013 enjoy the natural beauty of the Bangalore \u2013 Mysore \u2013 Coorg road en route.",
        highlights: ["Overnight stay in Coorg."],
      },
      {
        day: 2,
        title: "Coorg Sightseeing",
        body: "A full-day excursion to Madikeri, famously known as the 'Scotland of India.' The tour includes visits to the Dubare Elephant Camp and the Tibetan Monastery, along with an exploration of the scenic Abbey Falls.",
        highlights: [
          { text: "Madikeri and the Dubare Elephant Camp, where trained elephants can be seen up close by the Cauvery River.", img: [COORG_MADIKERI, DUBARE_ELEPHANT_CAMP] },
          "Evening at leisure, followed by an overnight stay at the hotel.",
        ],
      },
      {
        day: 3,
        title: "Coorg Sightseeing",
        body: "A local sightseeing tour covering key attractions such as Sri Bhagandeshwara Temple, Raja's Seat, the sacred Cauvery River, Raja's Tomb, and the scenic Brahmagiri Hills, among others.",
        highlights: [
          { text: "Raja's Seat: a landscaped garden viewpoint once used by Coorg's royal family to watch the sunset over the Western Ghats, paired with the rolling Brahmagiri Hills nearby.", img: [RAJAS_SEAT, BRAHMAGIRI_HILLS] },
          "Back to hotel for overnight stay.",
        ],
      },
      {
        day: 4,
        title: "Departure",
        body: "In the morning, check out from the hotel and drive to Bangalore airport / rail station, which will take approximately 5 to 6 hours, for your homeward journey. Tour ends.",
        highlights: [],
      },
    ],
  },

  {
    id: "coorg-with-mysore",
    title: "Coorg With Mysore Holiday",
    region: "Coorg \u2022 Mysore",
    duration: "4N / 5D",
    tagline: "Misty coffee hills followed by the City of Palaces.",
    images: [
      shot(MYSORE_PALACE, "Mysore Palace"),
      shot(COORG_MADIKERI, "Madikeri, Coorg"),
      shot(BRINDAVAN_GARDEN, "Brindavan Garden"),
      shot(RAJAS_SEAT, "Raja's Seat, Coorg"),
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive at Bangalore Airport \u2192 Coorg",
        body: "On arrival at Bangalore airport, meet and greet with our representative and transfer by road to Coorg (approximately 5 hours' drive). On arrival, check in at the hotel. Day at leisure \u2013 enjoy the natural beauty of the Bangalore \u2013 Mysore \u2013 Coorg road en route.",
        highlights: ["Overnight stay in Coorg."],
      },
      {
        day: 2,
        title: "Coorg Sightseeing",
        body: "A full-day excursion to Madikeri, famously known as the 'Scotland of India.' The tour includes visits to the Dubare Elephant Camp and the Tibetan Monastery, along with an exploration of the scenic Abbey Falls.",
        highlights: [
          { text: "Madikeri and the Dubare Elephant Camp, where trained elephants can be seen up close by the Cauvery River.", img: [COORG_MADIKERI, DUBARE_ELEPHANT_CAMP] },
          "Evening at leisure, followed by an overnight stay at the hotel.",
        ],
      },
      {
        day: 3,
        title: "Coorg Sightseeing",
        body: "A local sightseeing tour covering key attractions such as Sri Bhagandeshwara Temple, Raja's Seat, the sacred Cauvery River, Raja's Tomb, and the scenic Brahmagiri Hills, among others.",
        highlights: [
          { text: "Raja's Seat: a landscaped garden viewpoint once used by Coorg's royal family to watch the sunset over the Western Ghats, paired with the rolling Brahmagiri Hills nearby.", img: [RAJAS_SEAT, BRAHMAGIRI_HILLS] },
          "Back to hotel for overnight stay.",
        ],
      },
      {
        day: 4,
        title: "Coorg \u2192 Mysore",
        body: "In the morning, check out from the hotel and proceed to Mysore, famously known as the 'City of Palaces.' On arrival, check in to the hotel and freshen up.",
        highlights: [
          { text: "Mysore Palace, Zoo & Chamundi Hill: the seat of the Wadiyar dynasty, an Indo-Saracenic landmark famed for its illumination on weekends.", img: MYSORE_PALACE },
          { text: "Enjoy the sound and light show at Brindavan Garden, and also visit Krishnarajasagar Dam and Karanji Lake.", img: BRINDAVAN_GARDEN },
          "Overnight stay in Mysore.",
        ],
      },
      {
        day: 5,
        title: "Departure",
        body: "In the morning, check out from the hotel and drive to Bangalore airport / rail station for your homeward journey. Tour ends.",
        highlights: [],
      },
    ],
  },

  {
    id: "coorg-with-wayanad",
    title: "Coorg With Wayanad Holiday",
    region: "Coorg \u2022 Wayanad",
    duration: "6N / 7D",
    tagline: "Coffee estates and misty hills into Kerala's wildlife country.",
    images: [
      shot(COORG_MADIKERI, "Madikeri, Coorg"),
      shot(BANASURA_SAGAR_DAM, "Banasura Sagar Dam"),
      shot(CHEMBRA_PEAK_1, "Chembra Peak, Wayanad"),
      shot(KURUVA_ISLAND_1, "Kuruva Island, Wayanad"),
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive at Bangalore Airport \u2192 Coorg",
        body: "On arrival at Bangalore airport, meet and greet with our representative and transfer by road to Coorg (approximately 5 hours' drive). On arrival, check in at the hotel. Day at leisure \u2013 enjoy the natural beauty of the Bangalore \u2013 Mysore \u2013 Coorg road en route.",
        highlights: ["Overnight stay in Coorg."],
      },
      {
        day: 2,
        title: "Coorg Sightseeing",
        body: "A full-day excursion to Madikeri, famously known as the 'Scotland of India.' The tour includes visits to the Dubare Elephant Camp and the Tibetan Monastery, along with an exploration of the scenic Abbey Falls.",
        highlights: [
          { text: "Madikeri and the Dubare Elephant Camp, where trained elephants can be seen up close by the Cauvery River.", img: [COORG_MADIKERI, DUBARE_ELEPHANT_CAMP] },
          "Evening at leisure, followed by an overnight stay at the hotel.",
        ],
      },
      {
        day: 3,
        title: "Coorg Sightseeing",
        body: "A local sightseeing tour covering key attractions such as Sri Bhagandeshwara Temple, Raja's Seat, the sacred Cauvery River, Raja's Tomb, and the scenic Brahmagiri Hills, among others.",
        highlights: [
          { text: "Raja's Seat: a landscaped garden viewpoint once used by Coorg's royal family to watch the sunset over the Western Ghats, paired with the rolling Brahmagiri Hills nearby.", img: [RAJAS_SEAT, BRAHMAGIRI_HILLS] },
          "Back to hotel for overnight stay.",
        ],
      },
      {
        day: 4,
        title: "Coorg \u2192 Wayanad",
        body: "In the morning, check out from the hotel and drive to Wayanad (approximately 3 hours' drive). On arrival, proceed for local sightseeing.",
        highlights: [
          { text: "Banasura Sagar Dam: built across the Karamanathodu River, a tributary of the Kabini, this is considered the largest earth dam in India and the second largest in Asia, set in the foothills of the Banasura hills.", img: BANASURA_SAGAR_DAM },
          { text: "Chembra Peak: the highest peak in Wayanad at 2,100 m, adjoining the Nilgiri hills and known for its heart-shaped lake \u2013 a favourite for trekkers.", img: [CHEMBRA_PEAK_1, CHEMBRA_PEAK_2] },
          "Overnight stay in Wayanad.",
        ],
      },
      {
        day: 5,
        title: "Wayanad Full-Day Sightseeing",
        body: "A full day exploring Wayanad's islands, lakes and forests.",
        highlights: [
          { text: "Kuruva Dweep Island: a protected river delta spread over 950 acres in the middle of the Kabini River, densely populated with rich flora and fauna.", img: [KURUVA_ISLAND_1, KURUVA_ISLAND_2] },
          "Pookode Lake: a freshwater lake 15 km from Kalpetta, nestled between evergreen forest and the Western Ghats, spread over 13 acres.",
          { text: "Wayanad Wildlife Sanctuary (Muthanga): part of the Nilgiri Biosphere Reserve, around 16 km from Sulthan Bathery, known for elephants, tigers and rich birdlife.", img: MUTHANGA_WILDLIFE },
          "Soochipara Falls: a stunning 3-tiered waterfall (also known as Sentinel Rock) falling from a height of 650 feet, near Meppadi.",
          "Meenmutty Waterfalls: a more secluded 3-tiered cascade that requires a 1 to 2 km jungle trek to reach.",
          "Overnight stay in Wayanad.",
        ],
      },
      {
        day: 6,
        title: "Departure",
        body: "In the morning, check out from the hotel and drive to Kozhikode airport / rail station (approximately 90 minutes) for your homeward journey. Tour ends.",
        highlights: [],
      },
    ],
  },

  {
    id: "ooty-coonoor-wayanad",
    title: "Ooty - Coonoor - Wayanad Delights",
    region: "Ooty \u2022 Coonoor \u2022 Wayanad",
    duration: "5N / 6D",
    tagline: "Tea estates, toy trains and Kerala's wild forests.",
    images: [
      shot(OOTY_VIEW_1, "Ooty"),
      shot(KALHATTY_WATERFALLS, "Kalhatty Waterfalls"),
      shot(BANASURA_SAGAR_DAM, "Banasura Sagar Dam"),
      shot(CHEMBRA_PEAK_1, "Chembra Peak, Wayanad"),
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive at Bangalore Airport \u2192 Ooty",
        body: "On arrival at the airport, transfer by road to Ooty, approximately 270 km / 5 to 6 hours' drive. Relax at your hotel in Ooty.",
        highlights: ["Overnight stay in Ooty."],
      },
      {
        day: 2,
        title: "Ooty",
        body: "In the morning, after breakfast, visit the Botanical Garden where you can observe a variety of shrubs and trees. Visit serene places like Lotus Pond, Doddabetta and Kondanadus View Point, and enjoy the day at leisure with some shopping.",
        highlights: [
          { text: "Ooty's rolling tea-estate views, the Botanical Garden and Doddabetta \u2013 the highest peak in the Nilgiris.", img: [OOTY_VIEW_1, OOTY_VIEW_2] },
          "Overnight stay in Ooty.",
        ],
      },
      {
        day: 3,
        title: "Ooty \u2192 Coonoor \u2192 Ooty",
        body: "After breakfast, visit cascading waterfalls such as Kalhatty Waterfalls and Catherine Falls. Sightseeing also includes Sim's Park, Law's Waterfalls, Dolphin's Nose, Highfield Tea Factory and Lamb's Rock, plus a Toy Train ride from Coonoor to Ooty.",
        highlights: [
          { text: "Kalhatty and Catherine Falls, two of the most scenic cascades on the Ooty-Coonoor stretch.", img: KALHATTY_WATERFALLS },
          "In the evening, visit the Government Museum and Lalith Kala Academy. Back to hotel for overnight stay in Ooty.",
        ],
      },
      {
        day: 4,
        title: "Ooty \u2192 Wayanad",
        body: "In the morning, check out from the hotel and drive to Wayanad (approximately 3 hours' drive). On arrival, proceed for local sightseeing.",
        highlights: [
          { text: "Banasura Sagar Dam: built across the Karamanathodu River, a tributary of the Kabini, this is considered the largest earth dam in India and the second largest in Asia, set in the foothills of the Banasura hills.", img: BANASURA_SAGAR_DAM },
          { text: "Chembra Peak: the highest peak in Wayanad at 2,100 m, adjoining the Nilgiri hills and known for its heart-shaped lake \u2013 a favourite for trekkers.", img: [CHEMBRA_PEAK_1, CHEMBRA_PEAK_2] },
          "Overnight stay in Wayanad.",
        ],
      },
      {
        day: 5,
        title: "Wayanad Full-Day Sightseeing",
        body: "A full day exploring Wayanad's islands, lakes and forests.",
        highlights: [
          { text: "Kuruva Dweep Island: a protected river delta spread over 950 acres in the middle of the Kabini River, densely populated with rich flora and fauna.", img: [KURUVA_ISLAND_1, KURUVA_ISLAND_2] },
          "Pookode Lake: a freshwater lake 15 km from Kalpetta, nestled between evergreen forest and the Western Ghats, spread over 13 acres.",
          { text: "Wayanad Wildlife Sanctuary (Muthanga): part of the Nilgiri Biosphere Reserve, around 16 km from Sulthan Bathery, known for elephants, tigers and rich birdlife.", img: MUTHANGA_WILDLIFE },
          "Soochipara Falls: a stunning 3-tiered waterfall (also known as Sentinel Rock) falling from a height of 650 feet, near Meppadi.",
          "Meenmutty Waterfalls: a more secluded 3-tiered cascade that requires a 1 to 2 km jungle trek to reach.",
          "Overnight stay in Wayanad.",
        ],
      },
      {
        day: 6,
        title: "Departure",
        body: "In the morning, check out from the hotel and drive to Kozhikode airport / rail station (approximately 90 minutes) for your homeward journey. Tour ends.",
        highlights: [],
      },
    ],
  },

  {
    id: "coorg-ooty-mysore",
    title: "Coorg - Ooty With Mysore Holiday",
    region: "Coorg \u2022 Mysore \u2022 Ooty",
    duration: "7N / 8D",
    tagline: "The complete Western Ghats circuit \u2013 coffee, palaces and tea gardens.",
    images: [
      shot(MYSORE_PALACE, "Mysore Palace"),
      shot(COORG_MADIKERI, "Madikeri, Coorg"),
      shot(OOTY_VIEW_1, "Ooty"),
      shot(BRINDAVAN_GARDEN, "Brindavan Garden"),
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive at Bangalore Airport \u2192 Coorg",
        body: "On arrival at Bangalore airport, meet and greet with our representative and transfer by road to Coorg (5 hours approximately). On arrival, check in at the hotel. Day at leisure \u2013 enjoy the natural beauty of the Bangalore \u2013 Mysore \u2013 Coorg road en route.",
        highlights: [],
      },
      {
        day: 2,
        title: "Coorg Sightseeing",
        body: "After breakfast, proceed for a full-day excursion to Madikeri, known as the Scotland of India. Visit Dubare Elephant Camp and the Tibetan Monastery.",
        highlights: [
          { text: "Madikeri and the Dubare Elephant Camp, where trained elephants can be seen up close by the Cauvery River.", img: [COORG_MADIKERI, DUBARE_ELEPHANT_CAMP] },
          "Return to Coorg, en route visiting Abbey Falls (8 km). Spend the evening at leisure and stay overnight at the hotel.",
        ],
      },
      {
        day: 3,
        title: "Coorg Sightseeing",
        body: "After breakfast, proceed for local sightseeing which includes Sri Bhagandeshwara Temple, Raja's Seat, the Cauvery River, Raja's Tomb and Brahmagiri Hills, among others.",
        highlights: [
          { text: "Raja's Seat: a landscaped garden viewpoint once used by Coorg's royal family to watch the sunset over the Western Ghats, paired with the rolling Brahmagiri Hills nearby.", img: [RAJAS_SEAT, BRAHMAGIRI_HILLS] },
          "Overnight stay in Coorg.",
        ],
      },
      {
        day: 4,
        title: "Coorg \u2192 Mysore",
        body: "In the morning, check out from the hotel and drive to Mysore (approximately 3 hours), also known as the City of Palaces. On arrival, check in and freshen up.",
        highlights: [
          { text: "Mysore Palace, Zoo & Chamundi Hill: the seat of the Wadiyar dynasty, an Indo-Saracenic landmark famed for its illumination on weekends.", img: MYSORE_PALACE },
          { text: "Enjoy the sound and light show at Brindavan Garden, and also visit Krishnarajasagar Dam.", img: BRINDAVAN_GARDEN },
          "Overnight stay in Mysore.",
        ],
      },
      {
        day: 5,
        title: "Mysore \u2192 Ooty",
        body: "In the morning, check out from the hotel and travel to Ooty \u2013 famous for its beautiful scenery, sprawling tea estates, verdant hills, serene lakes and waterfalls. It is popular for the Nilgiri Mountain Railway and botanical gardens, and was a historic summer resort for the British, earning it the nickname 'Switzerland of India' or 'Queen of Hill Stations.'",
        highlights: [
          "On arrival, check into your hotel. Relax or take a walk by the beautiful Ooty Lake.",
          "Overnight stay in Ooty.",
        ],
      },
      {
        day: 6,
        title: "Ooty",
        body: "In the morning, after breakfast, visit the Botanical Garden where you can observe a variety of shrubs and trees. Visit serene places like Lotus Pond, Doddabetta and Kondanadus View Point, and enjoy the day at leisure with some shopping.",
        highlights: [
          { text: "Ooty's rolling tea-estate views, the Botanical Garden and Doddabetta \u2013 the highest peak in the Nilgiris.", img: [OOTY_VIEW_1, OOTY_VIEW_2] },
          "Overnight stay in Ooty.",
        ],
      },
      {
        day: 7,
        title: "Ooty",
        body: "After breakfast, visit cascading waterfalls such as Kalhatty Waterfalls and Catherine Falls. In the evening, visit the Government Museum and Lalith Kala Academy.",
        highlights: [
          { text: "Kalhatty and Catherine Falls, two of the most scenic cascades on the Ooty-Coonoor stretch.", img: KALHATTY_WATERFALLS },
          "Overnight stay in Ooty.",
        ],
      },
      {
        day: 8,
        title: "Departure",
        body: "In the morning, check out from the hotel and drive to Bangalore airport / rail station (approximately 5 to 6 hours' drive) for your homeward journey. Tour ends.",
        highlights: [],
      },
    ],
  },
];
