import {
  AMBER_FORT_1, AMBER_FORT_2,
  CHOKHI_DHANI_1, CHOKHI_DHANI_2,
  JAL_MAHAL_1, JAL_MAHAL_2,
  PATRIKA_GATE,
  MEHRANGARH_FORT_1, MEHRANGARH_FORT_2,
  JASWANT_THADA_1, JASWANT_THADA_2,
  UMAID_BHAWAN_PALACE,
  GADISAR_LAKE,
  JAISALMER_FORT,
  SALIM_SINGH_HAVELI_1, SALIM_SINGH_HAVELI_2,
  BADA_BAGH,
  BHANDASAR_TEMPLE_1, BHANDASAR_TEMPLE_2,
  KUMBHALGARH_FORT,
  FATEH_SAGAR_LAKE,
  CITY_PALACE_UDAIPUR_1, CITY_PALACE_UDAIPUR_2,
  LAKE_PICHOLA,
  MONSOON_PALACE,
  RANAKPUR_TEMPLE_1, RANAKPUR_TEMPLE_2,
  JAWAI_LEOPARD_1, JAWAI_LEOPARD_2,
  SUN_TEMPLE_RANAKPUR,
  CHITTORGARH_FORT,
  PADMINI_PALACE,
  PRATAP_MEMORIAL_1, PRATAP_MEMORIAL_2,
} from "./rajasthanImages";

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
    id: "rajasthan-glory",
    title: "Rajasthan Glory",
    region: "Jaipur \u2022 Jodhpur \u2022 Pali \u2022 Chittorgarh \u2022 Udaipur",
    duration: "7N / 8D",
    tagline: "Forts, havelis and lakes across the heart of Rajputana.",
    images: [
      shot(AMBER_FORT_1, "Amber Fort, Jaipur"),
      shot(MEHRANGARH_FORT_1, "Mehrangarh Fort, Jodhpur"),
      shot(CHITTORGARH_FORT, "Chittorgarh Fort"),
      shot(CITY_PALACE_UDAIPUR_1, "City Palace, Udaipur"),
    ],
    itinerary: [
      {
        day: 1,
        title: "Jaipur Airport / Station \u2013 Hotel",
        body: "Meet & greet on arrival at Jaipur Airport / Railway Station and transfer to your hotel. Later, start local sightseeing of Jaipur.",
        highlights: [
          { text: "Amber Fort (Amer Fort): a UNESCO World Heritage Site about 11 km from the city centre, known for its blend of Hindu and Mughal architecture, mirror-work halls and views over Maota Lake.", img: [AMBER_FORT_1, AMBER_FORT_2] },
          { text: "Evening visit to Laxminarayan Temple (Birla Mandir) and Chokhi Dhani \u2013 an ethnic village resort on Tonk Road with folk dances, puppet shows, camel rides and unlimited thalis.", img: [CHOKHI_DHANI_1, CHOKHI_DHANI_2] },
          "Overnight stay in Jaipur.",
        ],
      },
      {
        day: 2,
        title: "Jaipur Local Sightseeing",
        body: "A full day of Jaipur sightseeing covering Hawa Mahal, City Palace, Jantar Mantar, Jal Mahal, Nahargarh Fort and Jaigarh Fort.",
        highlights: [
          "Jantar Mantar: a UNESCO World Heritage Site near the City Palace \u2013 an 18th-century observatory with 19 geometric instruments for tracking celestial movements.",
          { text: "Jal Mahal: the \u201cWater Palace\u201d sitting at the centre of Man Sagar Lake. The interior is off-limits, but the lakeside evening walk is scenic.", img: [JAL_MAHAL_1, JAL_MAHAL_2] },
          "Nahargarh Fort & Jaigarh Fort: perched in the Aravalli Hills with sweeping city views \u2013 Nahargarh is especially loved for sunsets.",
          { text: "Patrika Gate: one of Jaipur\u2019s most photographed spots near Jawahar Circle, with hand-painted hallways celebrating Rajasthani culture. Free entry.", img: PATRIKA_GATE },
          "Hawa Mahal: built in 1799 by Maharaja Sawai Pratap Singh, designed by architect Lal Chand Ustad.",
          "Overnight stay in Jaipur.",
        ],
      },
      {
        day: 3,
        title: "Jaipur \u2192 Jodhpur",
        body: "Travel to Jodhpur \u2013 approximately 6 hours (335 km). Jodhpur is famed as the \u201cBlue City\u201d for its indigo-painted houses, and was once the kingdom of Marwar.",
        highlights: [
          { text: "Mehrangarh Fort: one of India\u2019s largest and best-preserved forts, rising 400 feet above the city. Founded in 1459 by Rao Jodha, the 1,200-acre complex has red sandstone palaces, a museum and a zip-lining course.", img: [MEHRANGARH_FORT_1, MEHRANGARH_FORT_2] },
          { text: "Jaswant Thada: a white-marble cenotaph known as the \u201cTaj Mahal of Marwar,\u201d built from translucent Makrana marble that glows gold in sunlight. Traditional cremation ground of the Marwar royal family.", img: [JASWANT_THADA_1, JASWANT_THADA_2] },
          { text: "Umaid Bhawan Palace: commissioned in 1929 by Maharaja Umaid Singh, one of the world\u2019s largest private residences, built in golden-yellow sandstone to provide famine relief employment.", img: UMAID_BHAWAN_PALACE },
          "Evening leisure walk at Clock Tower & Sardar Market.",
          "Overnight stay in Jodhpur.",
        ],
      },
      {
        day: 4,
        title: "Jodhpur \u2192 Pali",
        body: "A short one-hour drive to Pali \u2013 an industrial and textile hub, home to the Ranakpur Jain Temples and the unusual Om Banna \u201cBullet\u201d shrine.",
        highlights: [
          { text: "Ranakpur Jain Temples: a 15th-century marble complex in the Aravalli foothills, famous for 1,440 uniquely carved pillars.", img: [RANAKPUR_TEMPLE_1, RANAKPUR_TEMPLE_2] },
          { text: "Jawai Leopard Reserve: wildlife safaris around the Jawai Dam with free-roaming leopards, crocodiles and migratory birds.", img: [JAWAI_LEOPARD_1, JAWAI_LEOPARD_2] },
          "Sardar Samand Lake: a scenic birdwatching spot about 25 km from Pali.",
          { text: "Surya Narayan (Sun) Temple: a 15th-century limestone temple near Ranakpur with elaborate carvings of warriors and celestial bodies.", img: SUN_TEMPLE_RANAKPUR },
          "Om Banna (Bullet Baba) Temple: an unconventional shrine near Chotila village where devotees worship a royal Enfield motorcycle.",
          "Overnight stay in Pali.",
        ],
      },
      {
        day: 5,
        title: "Pali \u2192 Chittorgarh",
        body: "Drive to Chittorgarh (approx. 235 km / 5 hours), home to the colossal Chittorgarh Fort \u2013 India\u2019s largest fort complex and a UNESCO World Heritage Site spread over 700 acres.",
        highlights: [
          { text: "Chittorgarh Fort: 65 historic structures atop a 180-metre hill, an epic symbol of Rajput valour, sacrifice and honour \u2013 site of three legendary sieges.", img: CHITTORGARH_FORT },
          "Vijay Stambh (Tower of Victory): a 9-storey tower built by Maharana Kumbha in 1448 to mark his victory over Malwa and Gujarat.",
          { text: "Padmini Palace: a water palace linked to the legendary Queen Padmini, offering a glimpse of medieval royal life.", img: PADMINI_PALACE },
          "Meerabai Temple: dedicated to the 16th-century poet-saint Meerabai, devotee of Lord Krishna.",
          "Kirti Stambh (Tower of Fame): a 12th-century Jain monument dedicated to the first Tirthankara, Adinath.",
          "Overnight stay in Chittorgarh.",
        ],
      },
      {
        day: 6,
        title: "Chittorgarh \u2192 Udaipur",
        body: "A 2-hour drive to Udaipur, the \u201cCity of Lakes.\u201d Check into your hotel and begin exploring.",
        highlights: [
          { text: "City Palace & Museum: Rajasthan\u2019s largest palace, towering over Lake Pichola, with courtyards, hanging gardens and the Mor Chowk peacock mosaics.", img: [CITY_PALACE_UDAIPUR_1, CITY_PALACE_UDAIPUR_2] },
          { text: "Relax at Fateh Sagar Lake in the evening, with boating if you wish.", img: FATEH_SAGAR_LAKE },
          "Overnight stay in Udaipur.",
        ],
      },
      {
        day: 7,
        title: "Udaipur Local Sightseeing",
        body: "A full city tour: Fateh Sagar Lake, the Maharana Pratap Memorial, a photo stop at Nehru Garden, Saheliyon-ki-Bari, Sukhadia Circle (drive past) and the Bhartiya Lok Kala Museum of folk art.",
        highlights: [
          { text: "Maharana Pratap Memorial (Pratap Smarak): atop Moti Magri, overlooking Fateh Sagar Lake, with an 11-foot bronze statue of Maharana Pratap and his horse Chetak.", img: [PRATAP_MEMORIAL_1, PRATAP_MEMORIAL_2] },
          { text: "Lake Pichola & Jagmandir: a sunset boat ride past the iconic Taj Lake Palace, ending at the 17th-century island palace of Jagmandir.", img: LAKE_PICHOLA },
          "Bagore Ki Haveli: an 18th-century haveli at Gangaur Ghat, known for its Dharohar folk dance show and museum.",
          "Saheliyon Ki Bari: the \u201cGarden of the Maidens\u201d with marble pavilions, lotus pools and fountains.",
          "Shri Karni Mata Temple: reached by ropeway from Dudh Talai, with fine views of the city and lake, especially when lit at night.",
          "Overnight stay in Udaipur.",
        ],
      },
      {
        day: 8,
        title: "Udaipur Sightseeing \u2013 Departure",
        body: "Visit the Monsoon Palace before your onward journey.",
        highlights: [
          { text: "Monsoon Palace (Sajjangarh): a 19th-century hunting lodge on the Bansdara hills with the best panoramic views of Udaipur\u2019s lakes and skyline, especially at sunset.", img: MONSOON_PALACE },
          "Transfer to the airport / railway station for your homeward journey. Tour ends.",
        ],
      },
    ],
  },

  {
    id: "colors-of-rajasthan",
    title: "Colors of Rajasthan",
    region: "Jaipur \u2022 Bikaner \u2022 Jaisalmer \u2022 Jodhpur \u2022 Udaipur",
    duration: "8N / 9D",
    tagline: "The grand circuit \u2013 pink city to golden dunes to blue city to lakes.",
    images: [
      shot(AMBER_FORT_1, "Amber Fort, Jaipur"),
      shot(JAISALMER_FORT, "Jaisalmer Fort"),
      shot(MEHRANGARH_FORT_1, "Mehrangarh Fort, Jodhpur"),
      shot(LAKE_PICHOLA, "Lake Pichola, Udaipur"),
    ],
    itinerary: [
      {
        day: 1,
        title: "Jaipur Airport / Station \u2013 Hotel",
        body: "Meet & greet on arrival at Jaipur Airport / Railway Station and transfer to your hotel. Later, start local sightseeing of Jaipur.",
        highlights: [
          { text: "Amber Fort (Amer Fort): a UNESCO World Heritage Site about 11 km from the city centre, known for its blend of Hindu and Mughal architecture, mirror-work halls and views over Maota Lake.", img: [AMBER_FORT_1, AMBER_FORT_2] },
          { text: "Evening visit to Laxminarayan Temple (Birla Mandir) and Chokhi Dhani \u2013 an ethnic village resort on Tonk Road with folk dances, puppet shows, camel rides and unlimited thalis.", img: [CHOKHI_DHANI_1, CHOKHI_DHANI_2] },
          "Overnight stay in Jaipur.",
        ],
      },
      {
        day: 2,
        title: "Jaipur Local Sightseeing",
        body: "A full day of Jaipur sightseeing covering Hawa Mahal, City Palace, Jantar Mantar, Jal Mahal, Nahargarh Fort and Jaigarh Fort.",
        highlights: [
          "Jantar Mantar: a UNESCO World Heritage Site near the City Palace \u2013 an 18th-century observatory with 19 geometric instruments for tracking celestial movements.",
          { text: "Jal Mahal: the \u201cWater Palace\u201d sitting at the centre of Man Sagar Lake. The interior is off-limits, but the lakeside evening walk is scenic.", img: [JAL_MAHAL_1, JAL_MAHAL_2] },
          "Nahargarh Fort & Jaigarh Fort: perched in the Aravalli Hills with sweeping city views \u2013 Nahargarh is especially loved for sunsets.",
          { text: "Patrika Gate: one of Jaipur\u2019s most photographed spots near Jawahar Circle, with hand-painted hallways celebrating Rajasthani culture. Free entry.", img: PATRIKA_GATE },
          "Hawa Mahal: built in 1799 by Maharaja Sawai Pratap Singh, designed by architect Lal Chand Ustad.",
          "Overnight stay in Jaipur.",
        ],
      },
      {
        day: 3,
        title: "Jaipur \u2192 Bikaner",
        body: "Transfer to Bikaner \u2013 approximately 330 km / 5 to 6 hours by road, with a stop at Asia\u2019s biggest camel breeding farm en route. Bikaner, in the Thar Desert, is famed for its red sandstone architecture and status as the world\u2019s \u201cCamel Country,\u201d as well as its Bikaneri Bhujia.",
        highlights: [
          "Junagarh Fort: one of the few major Rajasthan forts built on flat plains rather than a hilltop, with richly decorated interiors.",
          { text: "Bhandasar Jain Temple: a Svetambara Jain temple famed for its wall paintings and artwork, protected by the Archaeological Survey of India.", img: [BHANDASAR_TEMPLE_1, BHANDASAR_TEMPLE_2] },
          "National Research Centre on Camel: the only facility of its kind in Asia, offering camel rides and camel-milk treats.",
          "Rampuria Havelis: 15th-century aristocratic homes in red Dulmera sandstone with fine wood carving and gold detailing.",
          "Evening visit to Karni Mata Temple (Deshnok) \u2013 the famous rat temple.",
          "Overnight stay in Bikaner.",
        ],
      },
      {
        day: 4,
        title: "Bikaner \u2192 Jaisalmer",
        body: "Drive to Jaisalmer, \u201cThe Golden City\u201d \u2013 about 4 to 5 hours. Optional stop at Osian for ancient temples and a desert village.",
        highlights: [
          { text: "Gadisar Lake: a 14th-century reservoir just south of the city walls, with picturesque ghats, carved temples and a yellow sandstone gateway.", img: GADISAR_LAKE },
          "Overnight stay in Jaisalmer.",
        ],
      },
      {
        day: 5,
        title: "Jaisalmer City Sightseeing",
        body: "Explore the living fort and havelis of Jaisalmer before an evening in the dunes.",
        highlights: [
          { text: "Jaisalmer Fort (Sonar Qila): a living fort with markets and temples still inhabited today.", img: JAISALMER_FORT },
          "Patwon Ki Haveli: commissioned in 1805 by merchant Guman Chand Patwa, renowned for trade in gold, silver and precious stones.",
          { text: "Salim Singh Ki Haveli: built in the 17th\u201318th century, a heritage site celebrated for its architecture \u2013 raised without water, cement or lubricant.", img: [SALIM_SINGH_HAVELI_1, SALIM_SINGH_HAVELI_2] },
          "Nathmal Ki Haveli: built in the 19th century by brothers Nathmal and Hathi Singh, in yellow sandstone with intricate carving.",
          { text: "Bada Bagh & Vyas Chhatri: hilltop complexes of royal cenotaphs in yellow sandstone, a favourite for photographers and sunset watchers.", img: BADA_BAGH },
          "Late afternoon drive to Sam Sand Dunes / Khuri Desert (50 km) for an optional camel ride or jeep safari at sunset.",
          "Overnight stay in Jaisalmer.",
        ],
      },
      {
        day: 6,
        title: "Jaisalmer \u2192 Jodhpur",
        body: "Travel to Jodhpur, the \u201cBlue City,\u201d once the kingdom of Marwar.",
        highlights: [
          { text: "Mehrangarh Fort: one of India\u2019s largest and best-preserved forts, rising 400 feet above the city. Founded in 1459 by Rao Jodha, with red sandstone palaces, a museum and a zip-lining course.", img: [MEHRANGARH_FORT_1, MEHRANGARH_FORT_2] },
          { text: "Jaswant Thada: a white-marble cenotaph known as the \u201cTaj Mahal of Marwar,\u201d glowing gold in sunlight \u2013 the traditional cremation ground of the Marwar royal family.", img: [JASWANT_THADA_1, JASWANT_THADA_2] },
          { text: "Umaid Bhawan Palace: one of the world\u2019s largest private residences, commissioned in 1929 in golden-yellow sandstone to provide famine relief employment.", img: UMAID_BHAWAN_PALACE },
          "Evening leisure walk at Clock Tower & Sardar Market.",
          "Overnight stay in Jodhpur.",
        ],
      },
      {
        day: 7,
        title: "Jodhpur \u2192 Udaipur (via Kumbhalgarh Fort)",
        body: "Journey to Udaipur, the \u201cCity of Lakes\u201d and \u201cVenice of the East\u201d \u2013 about 270 km / 6 hours, with a stop at Kumbhalgarh Fort en route.",
        highlights: [
          { text: "Kumbhalgarh Fort: famed for its 36-km defensive wall, the second-longest continuous wall in the world, often called the \u201cGreat Wall of India.\u201d A UNESCO World Heritage site and birthplace of Maharana Pratap.", img: KUMBHALGARH_FORT },
          { text: "Evening at Fateh Sagar Lake, with boating if you wish.", img: FATEH_SAGAR_LAKE },
          "Overnight stay in Udaipur.",
        ],
      },
      {
        day: 8,
        title: "Udaipur Local Sightseeing",
        body: "A full city tour: Fateh Sagar Lake, Maharana Pratap Memorial, a photo stop at Nehru Garden, Saheliyon-ki-Bari, Sukhadia Circle (drive past) and the Bhartiya Lok Kala Museum of folk art.",
        highlights: [
          { text: "City Palace & Museum: Rajasthan\u2019s largest palace, towering over Lake Pichola, with courtyards, hanging gardens and the Mor Chowk peacock mosaics.", img: [CITY_PALACE_UDAIPUR_1, CITY_PALACE_UDAIPUR_2] },
          { text: "Lake Pichola & Jagmandir: a sunset boat ride past the iconic Taj Lake Palace, ending at the 17th-century island palace of Jagmandir.", img: LAKE_PICHOLA },
          "Bagore Ki Haveli: an 18th-century haveli at Gangaur Ghat, known for its Dharohar folk dance show and museum.",
          "Saheliyon Ki Bari: the \u201cGarden of the Maidens\u201d with marble pavilions, lotus pools and fountains.",
          "Shri Karni Mata Temple: reached by ropeway from Dudh Talai, with fine views of the city and lake, especially when lit at night.",
          "Overnight stay in Udaipur.",
        ],
      },
      {
        day: 9,
        title: "Udaipur Sightseeing \u2013 Departure",
        body: "Visit the Monsoon Palace before your onward journey.",
        highlights: [
          { text: "Monsoon Palace (Sajjangarh): a 19th-century hunting lodge on the Bansdara hills with the best panoramic views of Udaipur\u2019s lakes and skyline, especially at sunset.", img: MONSOON_PALACE },
          "Transfer to the airport / railway station for your homeward journey. Tour ends.",
        ],
      },
    ],
  },

  {
    id: "rajasthan-highlights",
    title: "Rajasthan Highlights",
    region: "Ex. Jodhpur \u2022 Jaisalmer \u2022 Bikaner",
    duration: "5N / 6D",
    tagline: "The Blue City, the Golden City and the Camel Country.",
    images: [
      shot(MEHRANGARH_FORT_1, "Mehrangarh Fort, Jodhpur"),
      shot(JAISALMER_FORT, "Jaisalmer Fort"),
      shot(GADISAR_LAKE, "Gadisar Lake, Jaisalmer"),
      shot(BHANDASAR_TEMPLE_1, "Bhandasar Jain Temple, Bikaner"),
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Jodhpur & Sightseeing",
        body: "Arrive at Jodhpur Airport / Railway Station and transfer to your hotel. After freshening up, proceed for sightseeing.",
        highlights: [
          { text: "Mehrangarh Fort: one of India\u2019s largest and best-preserved forts, rising 400 feet above the Blue City. Founded in 1459 by Rao Jodha, with red sandstone palaces, a museum and a zip-lining course.", img: [MEHRANGARH_FORT_1, MEHRANGARH_FORT_2] },
          { text: "Jaswant Thada: a white-marble cenotaph known as the \u201cTaj Mahal of Marwar,\u201d glowing gold in sunlight \u2013 the traditional cremation ground of the Marwar royal family.", img: [JASWANT_THADA_1, JASWANT_THADA_2] },
          { text: "Umaid Bhawan Palace: one of the world\u2019s largest private residences, commissioned in 1929 in golden-yellow sandstone to provide famine relief employment.", img: UMAID_BHAWAN_PALACE },
          "Evening leisure walk at Clock Tower & Sardar Market.",
          "Overnight stay in Jodhpur.",
        ],
      },
      {
        day: 2,
        title: "Jodhpur \u2192 Jaisalmer",
        body: "Drive to Jaisalmer, \u201cThe Golden City\u201d \u2013 about 4 to 5 hours. Optional stop at Osian for ancient temples and a desert village.",
        highlights: [
          { text: "Gadisar Lake: a 14th-century reservoir just south of the city walls, with picturesque ghats, carved temples and a yellow sandstone gateway.", img: GADISAR_LAKE },
          "Overnight stay in Jaisalmer.",
        ],
      },
      {
        day: 3,
        title: "Jaisalmer City Sightseeing",
        body: "Explore the living fort and havelis of Jaisalmer before an evening in the dunes.",
        highlights: [
          { text: "Jaisalmer Fort (Sonar Qila): a living fort with markets and temples still inhabited today.", img: JAISALMER_FORT },
          "Patwon Ki Haveli: commissioned in 1805 by merchant Guman Chand Patwa, renowned for trade in gold, silver and precious stones.",
          { text: "Salim Singh Ki Haveli: built in the 17th\u201318th century, a heritage site celebrated for its architecture \u2013 raised without water, cement or lubricant.", img: [SALIM_SINGH_HAVELI_1, SALIM_SINGH_HAVELI_2] },
          "Nathmal Ki Haveli: built in the 19th century by brothers Nathmal and Hathi Singh, in yellow sandstone with intricate carving.",
          "Afternoon drive to Sam Sand Dunes / Khuri Desert (50 km) for an optional camel ride or jeep safari at sunset.",
          "Overnight stay in Jaisalmer.",
        ],
      },
      {
        day: 4,
        title: "Jaisalmer Desert \u2192 Tanot \u2192 Longewala \u2192 Jaisalmer",
        body: "Visit Tanot Mata Temple, then continue to Longewala \u2013 site of the famous 1971 Indo-Pak war.",
        highlights: [
          "Kuldhara Abandoned Village: a centuries-old \u201chaunted\u201d ghost town about 18 km from the city, left untouched by time.",
          "Tanot Mata Temple & Longewala War Memorial: near the Indo-Pak border, offering a mix of high patriotism and military history.",
          { text: "Bada Bagh & Vyas Chhatri: hilltop complexes of royal cenotaphs in yellow sandstone, a favourite for photographers and sunset watchers.", img: BADA_BAGH },
          "Overnight stay in Jaisalmer.",
        ],
      },
      {
        day: 5,
        title: "Jaisalmer \u2192 Bikaner",
        body: "Drive to Bikaner, in the Thar Desert, famed for its red sandstone architecture and status as the world\u2019s \u201cCamel Country,\u201d as well as its Bikaneri Bhujia.",
        highlights: [
          "Junagarh Fort: one of the few major Rajasthan forts built on flat plains rather than a hilltop, with richly decorated interiors.",
          { text: "Bhandasar Jain Temple: a Svetambara Jain temple famed for its wall paintings and artwork, protected by the Archaeological Survey of India.", img: [BHANDASAR_TEMPLE_1, BHANDASAR_TEMPLE_2] },
          "Evening visit to Karni Mata Temple (Deshnok) \u2013 the famous rat temple.",
          "Overnight stay in Bikaner.",
        ],
      },
      {
        day: 6,
        title: "Departure",
        body: "Travel back to Jodhpur \u2013 approximately 4 to 5 hours. Drop at Jodhpur Airport / Railway Station for your onward journey. Tour ends.",
        highlights: [],
      },
    ],
  },

  {
    id: "jaipur-break",
    title: "Jaipur Break",
    region: "Jaipur",
    duration: "2N / 3D",
    tagline: "A quick escape into the Pink City.",
    images: [
      shot(AMBER_FORT_1, "Amber Fort, Jaipur"),
      shot(PATRIKA_GATE, "Patrika Gate, Jaipur"),
      shot(JAL_MAHAL_1, "Jal Mahal, Jaipur"),
      shot(CHOKHI_DHANI_1, "Chokhi Dhani, Jaipur"),
    ],
    itinerary: [
      {
        day: 1,
        title: "Jaipur Airport / Station \u2013 Hotel",
        body: "Meet & greet on arrival at Jaipur Airport / Railway Station and transfer to your hotel. Later, start local sightseeing of Jaipur.",
        highlights: [
          { text: "Amber Fort (Amer Fort): a UNESCO World Heritage Site about 11 km from the city centre, known for its blend of Hindu and Mughal architecture, mirror-work halls and views over Maota Lake.", img: [AMBER_FORT_1, AMBER_FORT_2] },
          { text: "Evening visit to Laxminarayan Temple (Birla Mandir) and Chokhi Dhani \u2013 an ethnic village resort on Tonk Road with folk dances, puppet shows, camel rides and unlimited thalis.", img: [CHOKHI_DHANI_1, CHOKHI_DHANI_2] },
          "Overnight stay in Jaipur.",
        ],
      },
      {
        day: 2,
        title: "Jaipur Local Sightseeing",
        body: "A full day of Jaipur sightseeing covering Hawa Mahal, City Palace, Jantar Mantar, Jal Mahal, Nahargarh Fort and Jaigarh Fort.",
        highlights: [
          "Jantar Mantar: a UNESCO World Heritage Site near the City Palace \u2013 an 18th-century observatory with 19 geometric instruments for tracking celestial movements.",
          { text: "Jal Mahal: the \u201cWater Palace\u201d sitting at the centre of Man Sagar Lake. The interior is off-limits, but the lakeside evening walk is scenic.", img: [JAL_MAHAL_1, JAL_MAHAL_2] },
          "Nahargarh Fort & Jaigarh Fort: perched in the Aravalli Hills with sweeping city views \u2013 Nahargarh is especially loved for sunsets.",
          { text: "Patrika Gate: one of Jaipur\u2019s most photographed spots near Jawahar Circle, with hand-painted hallways celebrating Rajasthani culture. Free entry.", img: PATRIKA_GATE },
          "Hawa Mahal: built in 1799 by Maharaja Sawai Pratap Singh, designed by architect Lal Chand Ustad.",
          "Overnight stay in Jaipur.",
        ],
      },
      {
        day: 3,
        title: "Jaipur Sightseeing & Departure",
        body: "Visit Albert Hall Museum \u2013 Rajasthan\u2019s oldest museum, with carpets, paintings and royal weaponry. Then shop at Johari Bazaar (gemstones and jewellery) and Bapu Bazaar (textiles, handicrafts and mojari footwear).",
        highlights: [
          "Transfer to the airport / railway station for your homeward journey. Tour ends.",
        ],
      },
    ],
  },
];
