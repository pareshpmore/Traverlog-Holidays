
import panchwati from "./panchwati.png";
import trimbakeshwar from "./trimbakeshwar.png";
import muktidham from "./muktidham.png";
import pandavleni from "./pandavleni.png";
import saibabatemple from "./saibabatemple.jpg";
import ajanta from "./ajantacaves.jpg";
import ajanta2 from "./ajantacaves2.jpg";
import ellora from "./elloracaves.png";
import shreetemple from "./ghrishnwshwartemple.jpg";
import daulatabad from "./daulatabadfort.jpg";
import daulatabad2 from "./daulatabadfort2.jpg";
import morgaon from "./moregaonganapati.jpg";
import morgaon2 from "./moregaonganapati2.jpg";
import ranjangaon from "./ranjangaon'.jpg";
import ranjangaon2 from "./ranjangaon2.jpg";
import theur from "./theur.jpg";
import theur2 from "./theur2.png";
import siddhatek from "./siddhatek.jpg";
import siddhatek2 from "./siddhatek2.jpg";
import ozer from "./ozar.jpg";
import ozer2 from "./ozar2.jpg";
import mahad from "./mahad.jpg";
import mahad2 from "./mahad2.jpg";
import girjatmaj from "./girjatmaj.jpg";
import girjatmaj2 from "./girjatmaj2.jpg";
import pali from "./pali.jpg";
import pali2 from "./pali2.jpg";
import tuljapur from "./tuljapurtemple.jpg";
import tuljapur2 from "./tuljapurtemple2.jpg";
import mahalaxmitemple from "./Mahalaxmitemple.png";


export const TOURS = [
  {
    id: "nashik-pilgrimage",
    title: "Nashik Pilgrimage Visit Tour",
    duration: "02 Nights / 03 Days",
    region: "Nashik",
    tagline: "Panchavati, Trimbakeshwar Jyotirlinga & the ghats of the Godavari",
    images: [
      { label: "Panchavati Ghats", src: panchwati },
      { label: "Trimbakeshwar Temple", src: trimbakeshwar },
      { label: "Muktidham Marble Shrine", src: muktidham },
      { label: "Pandavleni Caves", src: pandavleni },
    ],
    itinerary: [
      {
        day: 1,
        title: "Panchavati and Central Nashik",
        body:
          "Your trip will start early from Pune, so you can explore the heart of Nashik by the afternoon. Once you arrive, you will visit the below places, before an overnight stay in Nashik.",
        highlights: [
          {
            text:
              "Panchavati Area — the epicenter of Nashik's spiritual life. A significant pilgrimage and historic neighborhood on the left bank of the Godavari River, highly revered as the site where Lord Rama, Sita, and Lakshmana lived during their exile. The area gets its name from five sacred banyan trees.",
            img: panchwati,
          },
          "Ramkund — the sacred bathing tank where Lord Rama is said to have bathed. According to Hindu mythology, Lord Ram and Sita used this tank for ablutions during their Vanavas (exile). It is also believed that Ram performed his father's funeral rites here, leading to its name Asthi Vilaya Tirtha.",
          "Kalaram Temple — a stunning black stone temple housing a magnificent idol of Lord Rama.",
          "Sita Gufa & Kapileshwar Temple — located a short walk from Ramkund. According to the Ramayana, Sita Gufa (Sita's Cave) is the sacred site where Goddess Sita was sheltered by Lakshmana during a demon attack, and from which she was ultimately abducted by the demon king Ravana. One of the holiest landmarks in Panchavati.",
          {
            text:
              "Muktidham Temple — located on the outskirts (Sinnar route), this striking temple is made entirely of white Makrana marble, featuring replicas of all 12 Jyotirlingas and walls intricately inscribed with the 18 chapters of the Bhagavad Gita.",
            img: muktidham,
          },
        ],
      },
      {
        day: 2,
        title: "Trimbakeshwar Jyotirlinga & Other Sightseeing",
        body:
          "Head to Trimbakeshwar early to beat the heavy crowds. Trimbakeshwar is famous as the only shrine in India where Lord Brahma, Lord Vishnu, and Lord Shiva are worshipped together within a single, three-faced Jyotirlinga. Overnight stay in Nashik.",
        highlights: [
          {
            text:
              "Trimbakeshwar Shiva Temple — located about 30 km (1 hour) from Nashik, this is one of the 12 revered Jyotirlingas in India, at the foothills of the Brahmagiri mountain, where the Godavari River originates.",
            img: trimbakeshwar,
          },
          "Kushavarta Kund — the holy sacred pond where pilgrims take a dip before entering the temple. A highly sacred, 21-foot-deep bathing tank, just 400 meters from the main Trimbakeshwar Jyotirlinga Temple, revered as the symbolic origin and reappearance point of the sacred Godavari River.",
          {
            text:
              "Pandavleni Caves — on the way back, stop at these ancient rock-cut Buddhist caves on the Trirashmi hills. A group of 24 caves carved between the 1st century BCE and 3rd century CE.",
            img: pandavleni,
          },
        ],
      },
      {
        day: 3,
        title: "Shree Kshetra Bhimashankar — Pune",
        body:
          "Bhimashankar is an ancient shrine situated in the Sahyadri hills of Maharashtra — one of the twelve Jyotirlingas found across India. It is located in the village of Bhorgiri, 50 km north-west of Khed near Pune, in the ghat region of the Sahyadri hills, about 125 km from Pune. We will then drop you back to Pune. Tour end.",
        highlights: [],
      },
    ],
  },

  {
    id: "shirdi-ajanta-ellora",
    title: "Shirdi - Ajanta - Ellora Trip",
    duration: "03 Nights / 04 Days",
    region: "Shirdi / Aurangabad",
    tagline: "Sai Baba Darshan, plus the UNESCO caves of Ajanta & Ellora with Daulatabad Fort",
    images: [
      { label: "Shri Sai Baba Temple, Shirdi", src: saibabatemple },
      { label: "Ajanta Caves", src: ajanta },
      { label: "Ajanta Caves — rock-cut staircases", src: ajanta2 },
      { label: "Ellora Caves", src: ellora },
      { label: "Daulatabad Fort", src: daulatabad },
      { label: "Daulatabad Fort — hilltop view", src: daulatabad2 },
    ],
    itinerary: [
      {
        day: 1,
        title: "Pune to Shirdi",
        body:
          "In the morning, we will start the journey from Pune to Shirdi — the former home of revered spiritual leader Sai Baba, and a major pilgrimage site in Maharashtra. Overnight stay in Shirdi.",
        highlights: [
          {
            text:
              "Shri Sai Baba Temple — once you arrive in Shirdi, you will go for Sai Baba Darshan (pray). Every day, thousands of people from all over the world come to this holy temple to receive blessings.",
            img: saibabatemple,
          },
          // No photo yet for Sai Heritage Village — add one the same way as
          // above: import it up top, then set `img: yourImportName` here.
          "Sai Heritage Village — a combination of pilgrimage and picnic together, a beautiful location with historical facets and nature's goodness.",
          "Sai Teerth, Devotional Theme Park — India's first devotional park, offering a divine and mesmerizing experience.",
        ],
      },
      {
        day: 2,
        title: "Shirdi to Ajanta Caves - Chatrapati Sambhaji Nagar",
        body:
          "Approximately 195 km / 4 to 5 hours' drive. We will take you to Chatrapati Sambhaji Nagar (formerly Aurangabad), famous for its rich history and UNESCO World Heritage Sites — the Ajanta and Ellora Caves. The city is also known as the 'City of Gates' for the 52 gates built around it, the local delicacy Naan Khaliya, and luxury Himroo fabric. Other notable sites include Bibi Ka Maqbara, the Valley of the Sufi Saints, and the Bhadra Maruti Temple. Overnight stay in hotel.",
        highlights: [
          {
            text:
              "Ajanta Caves — the first Buddhist cave monuments date from the 2nd and 1st centuries B.C., with more richly decorated caves added during the Gupta period (5th–6th centuries A.D.). Considered masterpieces of Buddhist religious art with considerable artistic influence.",
            img: ajanta,
          },
          {
            text:
              "The caves are excavated out of a vertical cliff above the left bank of the river Waghora — thirty in number including unfinished ones, of which five (caves 9, 10, 19, 26 and 29) are chaityagrihas (sanctuaries) and the rest are viharas (monasteries), connected to the river by rock-cut staircases.",
            img: ajanta2,
          },
        ],
      },
      {
        day: 3,
        title: "Ellora Caves & Shri Ghrishneshwar Jyotirlinga",
        body:
          "In the morning, after breakfast at the hotel, we visit Ellora Caves and Shri Ghrishneshwar Jyotirlinga. Later, back to the hotel for an overnight stay.",
        highlights: [
          {
            text:
              "Ellora Caves — an archaeological World Heritage Site built by the Rashtrakuta rulers, representing the epitome of Indian rock-cut architecture. 34 monasteries and temples extending over more than 2 km, dug side by side into a high basalt cliff.",
            img: ellora,
          },
          "Ellora's uninterrupted sequence of monuments dates from A.D. 600 to 1000, with sanctuaries devoted to Buddhism, Hinduism and Jainism, illustrating the spirit of tolerance characteristic of ancient India.",
          {
            text:
              "Shri Ghrishneshwar Jyotirlinga — one of the oldest temples in Sambhaji Nagar, dedicated to Lord Shiva and considered the last among the twelve Jyotirlingas. The only Jyotirlinga temple in India with carvings of Shiva, Parvati, Ganesha, and Kartikeya seated on Nandi with the Goddess Ganga on Shiva's forehead, visible from the south entry.",
            img: shreetemple,
          },
          "The temple also has a pillar carved with an elephant and Nandi, symbolizing the Hari-Har meeting of Vishnu and Shiva, plus 24 pillars adorned with sculptures of Yakshas said to carry the temple's weight.",
        ],
      },
      {
        day: 4,
        title: "Chatrapati Sambhaji Nagar Sightseeing & Drive Back to Pune",
        body:
          "After exploring Daulatabad Fort, we will drive to Pune for the homeward journey. Tour end.",
        highlights: [
          {
            text:
              "Daulatabad Fort — located just 15 km from Aurangabad, an architectural marvel with a steep, 750-step climb to the summit, renowned for its labyrinth-like defense traps and spectacular panoramic views.",
            img: daulatabad,
          },
          {
            text:
              "The fort sits atop a 200-meter-high conical hill with sheer, scarped rock faces, a deep moat once infested with crocodiles, and massive defensive walls divided into independent sections.",
            img: daulatabad2,
          },
          "The 'Black Hole' Labyrinth — the only pathway to the top, a steep, winding maze carved directly into the rock with dark tunnels, false doors, and dead-ends designed to disorient and wear down invading armies.",
        ],
      },
    ],
  },

  {
    id: "ashtavinayak-yatra",
    title: "Ashtavinayak Yatra Package",
    duration: "02 Nights / 03 Days",
    region: "Pune region",
    tagline: "A darshan tour of all eight sacred Ashtavinayak Ganapati shrines",
    images: [
      { label: "Morgaon Ganpati", src: morgaon2 },
      { label: "Shri Siddhivinayak, Siddhatek", src: siddhatek2 },
      { label: "Chintamani Ganpati, Theur", src: theur2 },
      { label: "Ranjangaon Mahaganapati", src: ranjangaon2 },
      { label: "Ozar Vigneshwara Ganapati", src: ozer2 },
      { label: "Lenyadri — Shri Girijatmaj", src: girjatmaj2 },
      { label: "Pali — Shree Ballaleshwar", src: pali2 },
      { label: "Mahad — Varadvinayak", src: mahad2 },
    ],
    itinerary: [
      {
        day: 1,
        title: "Pune → Morgaon → Siddhatek → Theur",
        body:
          "In the morning, we will start the journey for Ashtavinayak Darshan from Pune. After darshan at all three sites, overnight stay in the nearby area of Theur or a convenient place in Pune.",
        highlights: [
          {
            text:
              "Morgaon Ganpati (Mayureshwar Ganpati) — the story of Morgaon revolves around Lord Ganesha taking the form of Mayureshwar to defeat the demon Sindurasura. Located about 80 km from Pune, it is the first and most prominent temple of the Ashtavinayak pilgrimage.",
            img: morgaon,
          },
          {
            text:
              "Shri Siddhivinayak Temple, Siddhatek — located in Ahilyanagar district, about 60 km from Mayureshwar Temple. The story centers on Lord Vishnu, who attained ultimate success (Siddhi) here after a grueling penance to defeat the demons Madhu and Kaitabha.",
            img: siddhatek,
          },
          {
            text:
              "Theur — Chintamani Ganpati Temple, one of the revered Ashtavinayak shrines in Pune district, with a history shaped by ancient mythology, the 17th-century Bhakti movement, and deep patronage from the Maratha Empire.",
            img: theur,
          },
        ],
      },
      {
        day: 2,
        title: "Pune – Ranjangaon → Ozar → Lenyadri",
        body:
          "In the morning, after getting ready, we drive onward for darshan at all three sites. After darshan, rest and overnight stay in a nearby area of Pune district.",
        highlights: [
          {
            text:
              "Ranjangaon Ganpati Temple (Shri Mahaganapati) — situated in Ranjangaon village, Shirur taluka, Pune district. Built between the 9th and 10th centuries, it holds deep mythological significance as the site where Lord Shiva invoked Ganesha to defeat the demon Tripurasura.",
            img: ranjangaon,
          },
          {
            text:
              "Ozar — Shree Vigneshwara Ganapati, about 66 km from Ranjangaon, celebrated for its mythological ties to Ganesha defeating the demon of obstacles, its unique golden dome, and striking Peshwa-style architecture. Legend holds that Ganesha defeated the demon Vignasura here, who asked that his name forever be linked with Ganesha's.",
            img: ozer,
          },
          {
            text:
              "Lenyadri Ganpati Temple (Shri Girijatmaj) — an ancient rock-cut shrine in Cave 7 of the Lenyadri Buddhist caves near Junnar, originally carved by Buddhist monks between the 1st and 3rd centuries AD. The only Ashtavinayak temple where Ganesha is worshipped in his child form, and revered as his birthplace per the Ganesha Purana.",
            img: girjatmaj,
          },
        ],
      },
      {
        day: 3,
        title: "Pali → Mahad → Return Pune",
        body:
          "In the morning, after getting ready, we drive to Pali and then Mahad for the final two darshans, before driving back to Pune. Our Ashtavinayak Darshan comes to a close here.",
        highlights: [
          {
            text:
              "Pali — Shree Ballaleshwar Ganapati, around 179 km (about 4 hours) from Lenyadri. The legend celebrates the power of unwavering devotion: Ganesha is said to have manifested as a sage to save and bless a young devotee named Ballal, allowing his name to be permanently linked with the deity's.",
            img: pali,
          },
          {
            text:
              "Mahad — The Varadvinayak Ganpati Temple, constructed in 1725 AD by Peshwa general Subhedar Ramji Mahadev Biwalkar. The idol is Swayambhu (self-manifested), discovered in the adjacent lake by a devotee in 1690. Legend says the sage Grutsamad prayed here and Ganesha blessed the forest, making it a sacred space where devotees' prayers are answered.",
            img: mahad,
          },
        ],
      },
    ],
  },

  {
    id: "ajanta-ellora-caves",
    title: "Ajanta - Ellora Caves Trip",
    duration: "02 Nights / 03 Days",
    region: "Aurangabad",
    tagline: "UNESCO rock-cut caves of Ajanta & Ellora, with Daulatabad Fort",
    images: [
      { label: "Ajanta Caves", src: ajanta },
      { label: "Ajanta Caves — rock-cut staircases", src: ajanta2 },
      { label: "Ellora Caves", src: ellora },
      { label: "Daulatabad Fort", src: daulatabad },
      { label: "Daulatabad Fort — hilltop view", src: daulatabad2 },
    ],
    itinerary: [
      {
        day: 1,
        title: "Pune to Ajanta Caves - Chatrapati Sambhaji Nagar",
        body:
          "Approximately 350 km / 5 to 6 hours' drive. Arrival at Pune Airport, then on to Chatrapati Sambhaji Nagar (formerly Aurangabad), famous for its rich history and UNESCO World Heritage Sites — the Ajanta and Ellora Caves. Also known as the 'City of Gates' for its 52 gates, the local delicacy Naan Khaliya, and luxury Himroo fabric. Other notable sites include Bibi Ka Maqbara, the Valley of the Sufi Saints, and the Bhadra Maruti Temple. Overnight stay in hotel.",
        highlights: [
          {
            text:
              "Ajanta Caves — the first Buddhist cave monuments date from the 2nd and 1st centuries B.C., with more richly decorated caves added during the Gupta period (5th–6th centuries A.D.). Considered masterpieces of Buddhist religious art with considerable artistic influence.",
            img: ajanta,
          },
          {
            text:
              "The caves are excavated out of a vertical cliff above the left bank of the river Waghora — thirty in number including unfinished ones, of which five (caves 9, 10, 19, 26 and 29) are chaityagrihas (sanctuaries) and the rest are viharas (monasteries), connected to the river by rock-cut staircases.",
            img: ajanta2,
          },
        ],
      },
      {
        day: 2,
        title: "Ellora Caves & Shri Ghrishneshwar Jyotirlinga",
        body:
          "In the morning, after breakfast at the hotel, we visit Ellora Caves and Shri Ghrishneshwar Jyotirlinga. Later, back to the hotel for an overnight stay.",
        highlights: [
          {
            text:
              "Ellora Caves — an archaeological World Heritage Site built by the Rashtrakuta rulers, representing the epitome of Indian rock-cut architecture. 34 monasteries and temples extending over more than 2 km, dug side by side into a high basalt cliff.",
            img: ellora,
          },
          "Ellora's uninterrupted sequence of monuments dates from A.D. 600 to 1000, with sanctuaries devoted to Buddhism, Hinduism and Jainism, illustrating the spirit of tolerance characteristic of ancient India.",
          {
            text:
              "Shri Ghrishneshwar Jyotirlinga — one of the oldest temples in Sambhaji Nagar, dedicated to Lord Shiva and considered the last among the twelve Jyotirlingas. The only Jyotirlinga temple in India with carvings of Shiva, Parvati, Ganesha, and Kartikeya seated on Nandi with the Goddess Ganga on Shiva's forehead, visible from the south entry.",
            img: shreetemple,
          },
          "The temple also has a pillar carved with an elephant and Nandi, symbolizing the Hari-Har meeting of Vishnu and Shiva, plus 24 pillars adorned with sculptures of Yakshas said to carry the temple's weight.",
        ],
      },
      {
        day: 3,
        title: "Chatrapati Sambhaji Nagar Sightseeing & Drive Back to Pune",
        body:
          "After exploring Daulatabad Fort, we will drive to Pune for the homeward journey. Tour end.",
        highlights: [
          {
            text:
              "Daulatabad Fort — located just 15 km from Aurangabad, an architectural marvel with a steep, 750-step climb to the summit, renowned for its labyrinth-like defense traps and spectacular panoramic views.",
            img: daulatabad,
          },
          {
            text:
              "The fort sits atop a 200-meter-high conical hill with sheer, scarped rock faces, a deep moat once infested with crocodiles, and massive defensive walls divided into independent sections.",
            img: daulatabad2,
          },
          "The 'Black Hole' Labyrinth — the only pathway to the top, a steep, winding maze carved directly into the rock with dark tunnels, false doors, and dead-ends designed to disorient and wear down invading armies.",
        ],
      },
    ],
  },

  // -- No photos added yet for these two — same pattern as the others:
  // -- import the file at the top of this file, then swap `gradient` for
  // -- `src: yourImport` in `images`, or `{ text: "...", img: yourImport }`
  // -- for a specific highlight.
  {
    id: "tuljapur-pilgrimage",
    title: "Tuljapur Pilgrimage Visit",
    duration: "01 Night / 02 Days",
    region: "Tuljapur, Dharashiv",
    tagline: "Darshan of Shri Tuljabhavani, one of Maharashtra's three-and-a-half Shakti Peethas",
    images: [
      { label: "Shri Tuljabhavani Mandir", src: tuljapur },
      { label: "Tuljapur Temple View", src: tuljapur2 },
    ],
    itinerary: [
      {
        day: 1,
        title: "Pune to Tuljapur",
        body:
          "In the morning, we will start the journey to visit Tuljapur Temple, located in Dharashiv District — approximately 291 km from Pune, taking about 6 hours to reach. Overnight stay in Tuljapur.",
        highlights: [
          {
            text:
              "Tuljapur — a prominent pilgrimage town in the Dharashiv (formerly Osmanabad) district of Maharashtra, globally renowned for the Shri Tuljabhavani Mandir, one of the 'three-and-a-half Shakti Peethas' (abodes of cosmic power) dedicated to the Hindu Goddess Durga.",
            img: tuljapur,
          },
          {
            text:
              "Tuljapur Temple view — enjoy the sacred ambience and architectural details of the temple grounds as part of your first-day arrival.",
            img: tuljapur2,
          },
          "On arrival, take the Darshan (pray) of Shri Tuljabhavani Goddess in the temple.",
        ],
      },
      {
        day: 2,
        title: "Tuljapur to Pune",
        body:
          "In the early morning, we recommend attending Kakad Aarti at Tuljapur Mandir, which takes place between 4:00 a.m. and 5:00 a.m. every day. You may also attend Vastralankara Puja & Dhup Aarti (midday) at 11:00 a.m. Later, travel back to Pune.",
        highlights: [],
      },
    ],
  },
  {
    id: "kolhapur-ambabai-mahalakshmi",
    title: "Shree Ambabai Temple / Mahalakshmi - Kolhapur Trip",
    duration: "01 Night / 02 Days",
    region: "Kolhapur",
    tagline: "Mahalakshmi Temple darshan, royal palaces, Rankala Lake & Jotiba Hill",
    images: [
      { label: "Shri Ambabai / Mahalakshmi Temple", src: mahalaxmitemple },
      { label: "New Palace, Kolhapur", gradient: "from-[#2E3A59] via-[#3d4f78] to-[#241512]" },
      { label: "Panhala Fort", gradient: "from-[#9B2C2C] via-[#7a2321] to-[#241512]" },
    ],
    itinerary: [
      {
        day: 1,
        title: "Pune to Kolhapur",
        body:
          "In the morning, we will start the journey to Kolhapur — a city on the banks of the Panchaganga River, known for its temples, roughly a 4 to 5 hour drive from Pune. Overnight stay in Kolhapur.",
        highlights: [
          "Shri Ambabai Temple / Mahalakshmi Temple — one of India's most significant pilgrimage sites. Unique for its idol facing west rather than east, and considered a supreme Shakti Peetha where one can either obtain salvation or have their desires fulfilled.",
          "The Town Hall Museum — an architectural gem housed in a stunning Indo-Saracenic-style building, offering a glimpse into Kolhapur's history with exhibits from ancient artifacts to royal memorabilia, featuring ornate arches, domes, and intricate stone carvings.",
          "New Palace (Chhatrapati Shahu Museum) — a blend of Jain, Hindu, and European architectural styles built in the late 19th century. The ground floor houses royal artifacts, hunting trophies, weapons, and rare photographs of the Kolhapur royal family.",
          "Rankala Lake — a beautiful, naturally formed lake surrounded by gardens, visited in the evening — perfect for strolls and tasting street food.",
        ],
      },
      {
        day: 2,
        title: "Kolhapur Sightseeing — Back to Pune",
        body:
          "In the morning, we will go to Jotiba Temple, followed by Panhala Fort, before driving back to Pune. Tour end.",
        highlights: [
          "Jotiba Temple — located 14 km from Kolhapur on Jotiba Hill, home to the Shri Jotiba Temple where the deity is also known as Kedareshwar-Kedarlinga. Situated at around 1,000 feet, this conch-shaped hill (also called Wadi Ratnagiri) is part of the Sahyadri range, extending from Panhala Fort towards the Krishna River.",
          "Panhala Fort — a historical fortress perched atop a hill overlooking the countryside, which played a crucial role in the Maratha Empire's defense strategy. Its ramparts and bastions offer breathtaking views of the Sahyadri mountain range.",
        ],
      },
    ],
  },
];