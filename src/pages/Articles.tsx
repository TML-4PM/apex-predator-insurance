
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Clock, TrendingUp, Zap, Leaf, Tag, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

// ── Article data — research-driven, each tied to a tourism/local angle ───
export const NEWS_ARTICLES = [
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
    related: ['shark-drone-detection', 'neptune-islands-dive-guide'],
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
    <p>Each buoy carries a 640×480 thermal camera scanning a 90° arc, an onboard classification model trained on 14,000 annotated crocodile images, and a 4G uplink to Queensland Parks' central alert system. When a crocodile exceeding 1.5m is detected within 40m of a designated launch point, rangers and registered operators receive a push notification within 4 seconds.</p>
    <h2>Tourism Integration</h2>
    <p>Daintree River cruises — one of the most popular tourist activities in Tropical North Queensland — have integrated the alert system into their booking app. Passengers receive a live "croc status" indicator before boarding. Operators report the technology has increased, not decreased, tourism demand: "People want to know the animals are really there."</p>`,
    date: 'Mar 25, 2026',
    readTime: '5 min',
    author: 'Wildlife Intelligence Desk',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/SaltwaterCrocodile%28%27Maximo%27%29.jpg/800px-SaltwaterCrocodile%28%27Maximo%27%29.jpg',
    related: [],
    featured: false,
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
    body: `<p>The US Fish & Wildlife Service's 2025 Grizzly Bear Status Report confirms that the Greater Yellowstone Ecosystem (GYE) population has exceeded 1,000 individuals — a landmark that was considered unachievable as recently as 2005, when the population stood at 280.</p>
    <h2>Range Expansion</h2>
    <p>More significantly for land managers and recreationists, GPS collar data shows breeding females establishing territories 180km south of the historic range boundary — into the Wind River Range of Wyoming and, in at least two confirmed cases, the northern Uinta Mountains of Utah. This is virgin grizzly territory, with no established bear-aware culture among local hikers.</p>
    <h2>Visitor Implications</h2>
    <p>Yellowstone, Grand Teton, and Bridger-Teton National Forests recorded 11.4 million visits in 2025. Bear spray sales through park concessioners increased 34% year-on-year. "The park is actively adjusting its messaging," a Yellowstone spokesperson noted. "We're updating trailhead signage across 900km of maintained trail."</p>`,
    date: 'Mar 22, 2026',
    readTime: '7 min',
    author: 'Wildlife Intelligence Desk',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/GrizzlyBearJeanBeaufort.jpg/800px-GrizzlyBearJeanBeaufort.jpg',
    related: [],
    featured: false,
  },
  {
    id: 'box-jellyfish-season-preview',
    slug: 'box-jellyfish-season-preview',
    category: 'Seasonal',
    tag: 'Jellyfish',
    region: 'Northern Territory / Tropical QLD',
    type: 'news',
    title: 'Box Jellyfish Season Arrives 3 Weeks Early — Marine Biologists Flag La Niña Warming',
    excerpt: 'AIMS researchers confirm box jellyfish (Chironex fleckeri) activity in the NT's coastal waters is running significantly ahead of the 10-year average, linked to anomalous sea surface temperatures.',
    body: `<p>The Australian Institute of Marine Science (AIMS) has issued an early-season advisory after beach surveillance teams recorded Chironex fleckeri — the box jellyfish, considered the world's most venomous marine animal — in Darwin Harbour and along the Arnhem Land coast three weeks ahead of the 10-year average first-detection date.</p>
    <h2>What's Driving It</h2>
    <p>Sea surface temperatures in the Timor Sea are running 1.4°C above the 30-year mean, linked to a weakening La Niña pattern. Box jellyfish reproduction is highly sensitive to water temperature, and researchers believe the early warming has accelerated the reproductive cycle of medusae that were overwintering as polyps on mangrove roots.</p>
    <h2>Tourism Advisory</h2>
    <p>Tourism Top End has updated its beach guide for the upcoming dry season. Patrolled beaches at Casuarina, Nightcliff, and Darwin Waterfront will deploy stinger nets and additional signage from 1 April rather than the usual 1 May. Tour operators running snorkelling and kayaking activities in the harbour have been advised to carry vinegar and first-aid kits.</p>`,
    date: 'Mar 20, 2026',
    readTime: '5 min',
    author: 'Wildlife Intelligence Desk',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Avispa_marina_cropped.png/800px-Avispa_marina_cropped.png',
    related: [],
    featured: false,
  },
  {
    id: 'hippo-attack-data-africa',
    slug: 'hippo-attack-data-africa',
    category: 'Research',
    tag: 'Hippo',
    region: 'Sub-Saharan Africa',
    type: 'research',
    title: 'Hippos Kill 500 People Annually — New Data Reveals River Tourism Blind Spots',
    excerpt: 'A comprehensive review of African wildlife fatality records published in Oryx identifies 12 "blind-spot" river zones where hippo encounters are chronically underreported and tourism safety infrastructure is absent.',
    body: `<p>A systematic review of wildlife fatality records from 23 sub-Saharan African countries, published in the journal Oryx, has produced the most comprehensive hippo fatality dataset to date — and the numbers are striking: an estimated 500 human deaths per year, far exceeding crocodiles (1,000), sharks (10), and lions (200).</p>
    <h2>The Blind Spots</h2>
    <p>The research team, led by investigators from the University of Cape Town and the Kenya Wildlife Service, identified 12 river corridors they term "blind-spot zones" — sections of the Zambezi, Mara, Rufiji, and Luangwa rivers where artisanal fishing activity and subsistence transport overlap with hippo night grazing ranges. No formal incident reporting, no safety infrastructure, and no tourism management frameworks exist in these zones.</p>
    <h2>Opportunity for Managed Tourism</h2>
    <p>The paper argues that managed safari tourism is not the problem — it's the solution. Regions with established tourism infrastructure (the Okavango Delta, Lower Zambezi NP, South Luangwa NP) show dramatically lower incident rates per visitor-hour than unmanaged corridors, because guides carry the knowledge and protocols that protect both humans and animals.</p>`,
    date: 'Mar 18, 2026',
    readTime: '8 min',
    author: 'Wildlife Intelligence Desk',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Portrait_Hippopotamus_in_the_water.jpg/800px-Portrait_Hippopotamus_in_the_water.jpg',
    related: [],
    featured: false,
  },
  {
    id: 'tiger-india-record-population',
    slug: 'tiger-india-record-population',
    category: 'Conservation',
    tag: 'Tiger',
    region: 'India',
    type: 'news',
    title: 'India\'s Tiger Census Breaks 3,600 — Ranthambore and Kaziranga See Overflow Into Corridors',
    excerpt: 'India\'s 2025 All-India Tiger Estimation confirms 3,682 tigers — a 200% increase since Project Tiger launched in 1973. Corridor animals are now moving into previously unoccupied buffer zones.',
    body: `<p>India's Ministry of Environment, Forest and Climate Change has published the results of the 2025 All-India Tiger Estimation: 3,682 tigers, confirming India now holds more than 70% of the world's wild tiger population and has tripled the count since the lowest recorded trough of 1,411 in 2006.</p>
    <h2>Corridor Overflow</h2>
    <p>The success is creating new management challenges. Radio-collar data shows tigers from saturated reserves like Ranthambore (Rajasthan) and Bandhavgarh (Madhya Pradesh) dispersing into revenue lands and agricultural corridors — areas with no formal human-wildlife conflict management. Incidents involving livestock predation have increased 28% in buffer zones around 14 of India's 54 Tiger Reserves.</p>
    <h2>Tourism Surge</h2>
    <p>Ranthambore alone received 287,000 safari visitors in 2025, generating ₹4.2 billion in direct tourism revenue — more than double the park's operational budget. Tourism India is actively marketing Panna, Pilibhit, and Sahyadri as emerging tiger destinations to distribute visitor load away from flagship parks.</p>`,
    date: 'Mar 15, 2026',
    readTime: '6 min',
    author: 'Wildlife Intelligence Desk',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/P.t.altaica_Tomak_Male.jpg/800px-P.t.altaica_Tomak_Male.jpg',
    related: [],
    featured: false,
  },
  {
    id: 'orca-sardine-run-south-africa',
    slug: 'orca-sardine-run-south-africa',
    category: 'Seasonal',
    tag: 'Orca',
    region: 'KwaZulu-Natal',
    type: 'news',
    title: 'Sardine Run 2026: Orca Super-Pod Sighting Sets Record off East London',
    excerpt: 'The 2026 sardine run season opened with a 47-individual orca pod observed coordinating a bait-ball collapse off the Transkei Wild Coast — the largest aggregation recorded since systematic surveys began in 2001.',
    body: `<p>Marine researchers and dive operators monitoring the annual sardine run off South Africa's Wild Coast have recorded what is being described as a "super-pod" event: 47 individual orcas working in coordinated feeding groups to collapse bait balls of sardines off the Transkei coast near Coffee Bay.</p>
    <h2>Record Aggregation</h2>
    <p>The event, documented over three days by researchers from Rhodes University's Department of Ichthyology and Fisheries Science, represents the largest individual orca count in a single aggregation since systematic boat surveys began in 2001. The pod was tracked via drone and acoustic arrays, with individual ID established for 31 of the 47 animals.</p>
    <h2>Tourism Collision</h2>
    <p>The sardine run draws 40,000+ domestic and international dive tourists annually to KwaZulu-Natal's South Coast, generating over R2.5 billion in seasonal revenue. This year, demand for "blue water" freediving experiences — designed to position divers in open water with feeding orcas, dolphins, and sharks simultaneously — is running at 300% of available slots.</p>`,
    date: 'Mar 12, 2026',
    readTime: '5 min',
    author: 'Wildlife Intelligence Desk',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Killerwhales_jumping.jpg/800px-Killerwhales_jumping.jpg',
    related: [],
    featured: false,
  },
  {
    id: 'leopard-seals-antarctica-tourism',
    slug: 'leopard-seals-antarctica-tourism',
    category: 'Research',
    tag: 'Predator',
    region: 'Antarctic Peninsula',
    type: 'research',
    title: 'Leopard Seal Encounters With Zodiac Passengers — First Systematic Behavioural Study',
    excerpt: 'A four-season study across 18 expedition vessels in the Antarctic Peninsula has produced the first systematic dataset on leopard seal interactions with small inflatable craft — and the findings challenge existing operator guidelines.',
    body: `<p>Researchers from the Scientific Committee on Antarctic Research (SCAR) have published what they describe as the first methodologically rigorous analysis of leopard seal (Hydrurga leptonyx) encounters with passenger-carrying Zodiac craft in the Antarctic Peninsula — and the results are producing a significant revision of the existing IAATO operator guidance.</p>
    <h2>Key Findings</h2>
    <p>Across 4 seasons, 18 vessels, and 2,847 logged Zodiac excursions, the study recorded 341 "contact events" — defined as a leopard seal making physical contact with or circling within 1m of a Zodiac. Of these, 94% (321 events) were classified as "investigatory" with no aggressive escalation. Sixteen events involved a seal mouthing the pontoon tube. Four events resulted in minor punctures.</p>
    <h2>Implications for Operators</h2>
    <p>The findings support a revision of the current blanket 5m exclusion recommendation. The data suggests a more nuanced protocol based on seal body language indicators — specifically tail-lob frequency and approach angle — is both more effective and less disruptive to passenger experience. Antarctic tourism generated US$400M in 2025, with 108,000 visitors to the Peninsula.</p>`,
    date: 'Mar 8, 2026',
    readTime: '9 min',
    author: 'Wildlife Intelligence Desk',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Killerwhales_jumping.jpg/800px-Killerwhales_jumping.jpg',
    related: [],
    featured: false,
  },
];

const CATEGORIES = ['All', 'Research', 'Tech', 'Seasonal', 'Conservation'];
const CATEGORY_COLORS: Record<string, string> = {
  Research: 'bg-blue-100 text-blue-700',
  Tech: 'bg-purple-100 text-purple-700',
  Seasonal: 'bg-orange-100 text-orange-700',
  Conservation: 'bg-green-100 text-green-700',
  News: 'bg-red-100 text-red-700',
};

const Articles = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = NEWS_ARTICLES.filter(a => {
    const matchSearch = !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.tag.toLowerCase().includes(search.toLowerCase()) ||
      a.region.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || a.category === activeCategory;
    return matchSearch && matchCat;
  });

  const featured = filtered.find(a => a.featured);
  const rest = filtered.filter(a => !a.featured || activeCategory !== 'All' || !!search);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-apex-black pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-apex-red" />
            <span className="text-apex-red text-sm font-bold uppercase tracking-wider">Wildlife Intelligence</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            News & Research
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Research-led reporting on predator populations, encounter data, emerging tech, and the tourist destinations cashing in on the world's most dangerous animals.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Input
              placeholder="Search by animal, region, topic…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-4"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  activeCategory === cat
                    ? 'bg-apex-black text-white border-apex-black'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-apex-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured article */}
        {featured && !search && activeCategory === 'All' && (
          <Link to={`/articles/${featured.slug}`} className="block mb-10 group">
            <div className="relative rounded-2xl overflow-hidden h-80 sm:h-96">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ filter: 'brightness(0.65)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-apex-red text-white text-xs">FEATURED</Badge>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[featured.category] || 'bg-gray-100 text-gray-700'}`}>
                    {featured.category}
                  </span>
                  <span className="text-white/60 text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{featured.region}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-2 group-hover:text-apex-red/90 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-white/70 text-sm line-clamp-2">{featured.excerpt}</p>
                <div className="flex items-center gap-4 mt-3 text-white/50 text-xs">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{featured.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                  <span className="ml-auto flex items-center gap-1 text-apex-red font-semibold">Read More <ArrowRight className="w-3 h-3" /></span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Article grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(article => (
            <Link
              key={article.id}
              to={`/articles/${article.slug}`}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ filter: 'brightness(0.78) saturate(1.05)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[article.category] || 'bg-gray-100 text-gray-700'}`}>
                    {article.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white/70 text-[10px]">
                  <MapPin className="w-2.5 h-2.5" />{article.region}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-apex-black text-sm leading-snug mb-2 group-hover:text-apex-red transition-colors line-clamp-3">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-xs line-clamp-2 mb-3">{article.excerpt}</p>
                <div className="flex items-center justify-between text-gray-400 text-xs">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{article.date}</span>
                  <span className="flex items-center gap-1 text-apex-red font-semibold">Read <ChevronRight className="w-3 h-3" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-semibold">No articles match "{search}"</p>
          </div>
        )}

        {/* Submit story CTA */}
        <div className="mt-16 bg-apex-black rounded-2xl p-8 text-center">
          <Zap className="w-8 h-8 text-apex-red mx-auto mb-3" />
          <h3 className="text-2xl font-black text-white mb-2">Got a Story?</h3>
          <p className="text-white/60 mb-5 max-w-md mx-auto text-sm">
            Researchers, guides, operators and encounter survivors — we publish verified wildlife intelligence with full attribution.
          </p>
          <Link
            to="/community"
            className="inline-block bg-apex-red hover:bg-apex-red/90 text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Submit Your Story
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Articles;
