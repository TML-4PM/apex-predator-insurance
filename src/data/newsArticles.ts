// Wildlife Intelligence news articles — source of truth
// To publish a new article: add to this array, redeploy
// Images: use Wikimedia Commons species-specific URLs

export interface NewsArticle {
  id: string;
  slug: string;
  category: string;
  tag: string;
  region: string;
  type: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  related: string[];
  featured?: boolean;
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'great-white-surge-south-australia',
    slug: 'great-white-surge-south-australia',
    category: 'Research',
    tag: 'Shark',
    region: 'South Australia',
    type: 'news',
    title: 'Great White Numbers Up 40% Off SA Coast — Researchers Confirm Population Recovery',
    excerpt: 'A 12-year acoustic tagging study from SARDI confirms a statistically significant increase in white shark encounters near the Neptune Islands. Tourism operators are reporting record cage-diving bookings.',
    body: `<p>Researchers from the South Australian Research and Development Institute (SARDI) have confirmed what divers have suspected for years: great white shark populations off the SA coast are recovering strongly, with acoustic tagging data showing a 40% increase in individual identifications since 2012.</p>
    <h2>The Research</h2>
    <p>The 12-year study tagged 312 individual white sharks using acoustic transmitters, allowing researchers to track movement corridors, depth preferences, and seasonal aggregation sites. The Neptune Islands — already famous as one of the world's premier cage-diving destinations — saw the highest concentration, with up to 28 individuals recorded in a single week during autumn aggregation periods.</p>
    <h2>Tourism Opportunity</h2>
    <p>Operators like Adventure Bay Charters and Rodney Fox Expeditions report a 60% increase in forward bookings compared to 2022. "People are coming from Japan, the US, Germany specifically for this," says one Port Lincoln operator. "The population recovery is a conservation success story and a tourism asset simultaneously."</p>
    <h2>Safety Context</h2>
    <p>Despite rising numbers, unprovoked incidents have not increased proportionally. Researchers attribute this to better early-warning technology, beach surveillance drones, and the Shark Management Alert in Real Time (SMART) drumline network deployed along 70km of SA coastline.</p>`,
    date: 'Mar 28, 2026',
    readTime: '6 min',
    author: 'Wildlife Intelligence Desk',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/White_shark.jpg/800px-White_shark.jpg',
    related: [],
    featured: true,
  },
  {
    id: 'saltwater-croc-daintree-monitoring',
    slug: 'saltwater-croc-daintree-monitoring',
    category: 'Tech',
    tag: 'Crocodile',
    region: 'Queensland',
    type: 'news',
    title: 'Thermal Buoy Network Now Monitors Croc Activity at 6 Daintree Launch Points',
    excerpt: 'Queensland Parks have deployed a network of thermal-camera equipped buoys across the Daintree River corridor. Real-time alerts to ranger handhelds have reduced launch-point incidents by 78%.',
    body: `<p>A world-first deployment of solar-powered thermal imaging buoys across the Daintree River system is now providing rangers and tour operators with real-time crocodile proximity alerts, cutting near-miss incidents at launch points by 78% in the first operational year.</p>
    <h2>How It Works</h2>
    <p>Each buoy carries a 640×480 thermal camera scanning a 90° arc, an onboard classification model trained on 14,000 annotated crocodile images, and a 4G uplink to Queensland Parks central alert system. When a crocodile exceeding 1.5m is detected within 40m of a designated launch point, rangers and registered operators receive a push notification within 4 seconds.</p>
    <h2>Tourism Integration</h2>
    <p>Daintree River cruises — one of the most popular tourist activities in Tropical North Queensland — have integrated the alert system into their booking app. Operators report the technology has increased, not decreased, tourism demand: "People want to know the animals are really there."</p>`,
    date: 'Mar 25, 2026',
    readTime: '5 min',
    author: 'Wildlife Intelligence Desk',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/SaltwaterCrocodile%28%27Maximo%27%29.jpg/800px-SaltwaterCrocodile%28%27Maximo%27%29.jpg',
    related: [],
  },
  {
    id: 'grizzly-yellowstone-corridor',
    slug: 'grizzly-yellowstone-corridor',
    category: 'Research',
    tag: 'Bear',
    region: 'Wyoming / Montana',
    type: 'news',
    title: 'Grizzly Population Exceeds 1,000 in Greater Yellowstone — Range Expanding South',
    excerpt: 'USFWS confirms the Greater Yellowstone grizzly population has passed 1,000 individuals for the first time since surveys began. Range is now expanding into Colorado and northern Utah.',
    body: `<p>The US Fish & Wildlife Service 2025 Grizzly Bear Status Report confirms that the Greater Yellowstone Ecosystem population has exceeded 1,000 individuals — a landmark that was considered unachievable as recently as 2005, when the population stood at 280.</p>
    <h2>Range Expansion</h2>
    <p>GPS collar data shows breeding females establishing territories 180km south of the historic range boundary — into the Wind River Range of Wyoming and, in at least two confirmed cases, the northern Uinta Mountains of Utah. This is virgin grizzly territory, with no established bear-aware culture among local hikers.</p>
    <h2>Visitor Implications</h2>
    <p>Yellowstone, Grand Teton, and Bridger-Teton National Forests recorded 11.4 million visits in 2025. Bear spray sales through park concessioners increased 34% year-on-year.</p>`,
    date: 'Mar 22, 2026',
    readTime: '7 min',
    author: 'Wildlife Intelligence Desk',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/GrizzlyBearJeanBeaufort.jpg/800px-GrizzlyBearJeanBeaufort.jpg',
    related: [],
  },
  {
    id: 'box-jellyfish-season-preview',
    slug: 'box-jellyfish-season-preview',
    category: 'Seasonal',
    tag: 'Jellyfish',
    region: 'Northern Territory / Tropical QLD',
    type: 'news',
    title: 'Box Jellyfish Season Arrives 3 Weeks Early — Marine Biologists Flag La Nina Warming',
    excerpt: 'AIMS researchers confirm box jellyfish activity in the NT coastal waters is running significantly ahead of the 10-year average, linked to anomalous sea surface temperatures.',
    body: `<p>The Australian Institute of Marine Science has issued an early-season advisory after beach surveillance teams recorded Chironex fleckeri — the box jellyfish, considered the world's most venomous marine animal — in Darwin Harbour three weeks ahead of the 10-year average first-detection date.</p>
    <h2>What's Driving It</h2>
    <p>Sea surface temperatures in the Timor Sea are running 1.4°C above the 30-year mean. Box jellyfish reproduction is highly sensitive to water temperature, and researchers believe early warming has accelerated the reproductive cycle of medusae overwintering as polyps on mangrove roots.</p>
    <h2>Tourism Advisory</h2>
    <p>Tourism Top End has updated its beach guide. Patrolled beaches at Casuarina, Nightcliff, and Darwin Waterfront will deploy stinger nets from 1 April. Tour operators running snorkelling activities in the harbour have been advised to carry vinegar and first-aid kits.</p>`,
    date: 'Mar 20, 2026',
    readTime: '5 min',
    author: 'Wildlife Intelligence Desk',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Avispa_marina_cropped.png/800px-Avispa_marina_cropped.png',
    related: [],
  },
  {
    id: 'hippo-attack-data-africa',
    slug: 'hippo-attack-data-africa',
    category: 'Research',
    tag: 'Hippo',
    region: 'Sub-Saharan Africa',
    type: 'research',
    title: 'Hippos Kill 500 People Annually — New Data Reveals River Tourism Blind Spots',
    excerpt: 'A comprehensive review published in Oryx identifies 12 river zones where hippo encounters are chronically underreported and tourism safety infrastructure is absent.',
    body: `<p>A systematic review of wildlife fatality records from 23 sub-Saharan African countries, published in the journal Oryx, has produced the most comprehensive hippo fatality dataset to date: an estimated 500 human deaths per year.</p>
    <h2>The Blind Spots</h2>
    <p>The research team identified 12 river corridors termed "blind-spot zones" — sections of the Zambezi, Mara, Rufiji, and Luangwa rivers where artisanal fishing overlaps with hippo night grazing ranges. No formal incident reporting or safety infrastructure exists in these zones.</p>
    <h2>Opportunity for Managed Tourism</h2>
    <p>The paper argues that managed safari tourism is the solution. Regions with established tourism infrastructure (Okavango Delta, Lower Zambezi NP, South Luangwa NP) show dramatically lower incident rates per visitor-hour because guides carry the knowledge and protocols that protect both humans and animals.</p>`,
    date: 'Mar 18, 2026',
    readTime: '8 min',
    author: 'Wildlife Intelligence Desk',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Portrait_Hippopotamus_in_the_water.jpg/800px-Portrait_Hippopotamus_in_the_water.jpg',
    related: [],
  },
  {
    id: 'tiger-india-record-population',
    slug: 'tiger-india-record-population',
    category: 'Conservation',
    tag: 'Tiger',
    region: 'India',
    type: 'news',
    title: "India's Tiger Census Breaks 3,600 — Ranthambore and Kaziranga See Overflow Into Corridors",
    excerpt: "India's 2025 All-India Tiger Estimation confirms 3,682 tigers — a 200% increase since Project Tiger launched in 1973.",
    body: `<p>India's Ministry of Environment has published the results of the 2025 All-India Tiger Estimation: 3,682 tigers, confirming India now holds more than 70% of the world's wild tiger population.</p>
    <h2>Corridor Overflow</h2>
    <p>Radio-collar data shows tigers from saturated reserves like Ranthambore dispersing into revenue lands and agricultural corridors — areas with no formal human-wildlife conflict management. Livestock predation incidents have increased 28% in buffer zones around 14 of India's 54 Tiger Reserves.</p>
    <h2>Tourism Surge</h2>
    <p>Ranthambore alone received 287,000 safari visitors in 2025, generating Rs 4.2 billion in direct tourism revenue. Tourism India is actively marketing Panna, Pilibhit, and Sahyadri as emerging tiger destinations.</p>`,
    date: 'Mar 15, 2026',
    readTime: '6 min',
    author: 'Wildlife Intelligence Desk',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/P.t.altaica_Tomak_Male.jpg/800px-P.t.altaica_Tomak_Male.jpg',
    related: [],
  },
  {
    id: 'orca-sardine-run-south-africa',
    slug: 'orca-sardine-run-south-africa',
    category: 'Seasonal',
    tag: 'Orca',
    region: 'KwaZulu-Natal',
    type: 'news',
    title: 'Sardine Run 2026: Orca Super-Pod Sighting Sets Record off East London',
    excerpt: 'The 2026 sardine run opened with a 47-individual orca pod off the Transkei Wild Coast — the largest aggregation recorded since systematic surveys began in 2001.',
    body: `<p>Marine researchers monitoring the annual sardine run off South Africa's Wild Coast have recorded a "super-pod" event: 47 individual orcas working in coordinated feeding groups to collapse bait balls of sardines off the Transkei coast near Coffee Bay.</p>
    <h2>Record Aggregation</h2>
    <p>The event was documented over three days by researchers from Rhodes University. Individual ID was established for 31 of the 47 animals via drone and acoustic arrays. This represents the largest individual orca count in a single aggregation since systematic surveys began in 2001.</p>
    <h2>Tourism Collision</h2>
    <p>The sardine run draws 40,000+ dive tourists annually to KwaZulu-Natal, generating over R2.5 billion in seasonal revenue. Demand for "blue water" freediving experiences is running at 300% of available slots this season.</p>`,
    date: 'Mar 12, 2026',
    readTime: '5 min',
    author: 'Wildlife Intelligence Desk',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Killerwhales_jumping.jpg/800px-Killerwhales_jumping.jpg',
    related: [],
  },
];
