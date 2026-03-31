
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export type CertTier = 'individual' | 'top25' | 'ultimate';

type CertificateProps = {
  insuranceType?: string;
  name?: string;
  country?: string;
  date?: string;
  uniqueId?: string;
  multipleItems?: Array<{ id: string; name: string; icon: string }>;
  isPreview?: boolean;
  imageUrl?: string;
  tier?: CertTier;
};

const ANIMAL_IMAGES: Record<string, string> = {
  'great-white-shark':    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/White_shark.jpg/800px-White_shark.jpg',
  'tiger-shark':          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Tiger_shark.jpg/800px-Tiger_shark.jpg',
  'bull-shark':           'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Bullshark_Beqa_Fiji_2007.jpg/800px-Bullshark_Beqa_Fiji_2007.jpg',
  'hammerhead-shark':     'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Scalloped_Hammerhead_Shark_Sphyrna_Lewini_%28226845659%29.jpeg/800px-Scalloped_Hammerhead_Shark_Sphyrna_Lewini_%28226845659%29.jpeg',
  'blue-shark':           'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Tibur%C3%B3n_azul_%28Prionace_glauca%29%2C_canal_Fayal-Pico%2C_islas_Azores%2C_Portugal%2C_2020-07-27%2C_DD_31.jpg/800px-Tibur%C3%B3n_azul_%28Prionace_glauca%29%2C_canal_Fayal-Pico%2C_islas_Azores%2C_Portugal%2C_2020-07-27%2C_DD_31.jpg',
  'saltwater-crocodile':  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/SaltwaterCrocodile%28%27Maximo%27%29.jpg/800px-SaltwaterCrocodile%28%27Maximo%27%29.jpg',
  'nile-crocodile':       'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Nile_crocodile_head.jpg/800px-Nile_crocodile_head.jpg',
  'african-lion':         'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg/800px-020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg',
  'siberian-tiger':       'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/P.t.altaica_Tomak_Male.jpg/800px-P.t.altaica_Tomak_Male.jpg',
  'bengal-tiger':         'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Bengal_tiger_in_Sanjay_Dubri_Tiger_Reserve_December_2024_by_Tisha_Mukherjee_11.jpg/800px-Bengal_tiger_in_Sanjay_Dubri_Tiger_Reserve_December_2024_by_Tisha_Mukherjee_11.jpg',
  'grizzly-bear':         'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/GrizzlyBearJeanBeaufort.jpg/800px-GrizzlyBearJeanBeaufort.jpg',
  'polar-bear':           'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Polar_Bear_-_Alaska_%28cropped%29.jpg/800px-Polar_Bear_-_Alaska_%28cropped%29.jpg',
  'hippopotamus':         'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Portrait_Hippopotamus_in_the_water.jpg/800px-Portrait_Hippopotamus_in_the_water.jpg',
  'african-elephant':     'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/African_Elephant_%28Loxodonta_africana%29_male_%2817289351322%29.jpg/800px-African_Elephant_%28Loxodonta_africana%29_male_%2817289351322%29.jpg',
  'leopard':              'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/African_leopard_male_%28cropped%29.jpg/800px-African_leopard_male_%28cropped%29.jpg',
  'jaguar':               'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Standing_jaguar.jpg/800px-Standing_jaguar.jpg',
  'mountain-lion':        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Mountain_Lion_in_Glacier_National_Park.jpg/800px-Mountain_Lion_in_Glacier_National_Park.jpg',
  'cheetah':              'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Male_cheetah_facing_left_in_South_Africa.jpg/800px-Male_cheetah_facing_left_in_South_Africa.jpg',
  'box-jellyfish':        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Avispa_marina_cropped.png/800px-Avispa_marina_cropped.png',
  'portuguese-man-o-war': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Portuguese_Man-O-War_%28Physalia_physalis%29.jpg/800px-Portuguese_Man-O-War_%28Physalia_physalis%29.jpg',
  'blue-ringed-octopus':  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Hapalochlaena_lunulata2.JPG/800px-Hapalochlaena_lunulata2.JPG',
  'orca':                 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Killerwhales_jumping.jpg/800px-Killerwhales_jumping.jpg',
  'sperm-whale':          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Mother_and_baby_sperm_whale.jpg/800px-Mother_and_baby_sperm_whale.jpg',
  'stonefish':            'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Synanceia_verrucosa_Prague_2011_2.jpg/800px-Synanceia_verrucosa_Prague_2011_2.jpg',
  'stingray':             'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/SStringray.jpg/800px-SStringray.jpg',
  'moray-eel':            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Moray_eel.jpg/800px-Moray_eel.jpg',
  'cone-snail':           'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Textile_cone.JPG/800px-Textile_cone.JPG',
  'king-cobra':           'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Ophiophagus_hannah_2.jpg/800px-Ophiophagus_hannah_2.jpg',
  'black-mamba':          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Black_Mamba_2.jpg/800px-Black_Mamba_2.jpg',
  'cape-buffalo':         'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/African_buffalo_%28Syncerus_caffer_caffer%29_male_with_cattle_egret.jpg/800px-African_buffalo_%28Syncerus_caffer_caffer%29_male_with_cattle_egret.jpg',
  'snow-leopard':         'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Irbis4.JPG/800px-Irbis4.JPG',
};

const getAnimalImage = (type: string, urlOverride?: string): string => {
  if (urlOverride) return urlOverride;
  const norm = type.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  if (ANIMAL_IMAGES[norm]) return ANIMAL_IMAGES[norm];
  for (const [key, url] of Object.entries(ANIMAL_IMAGES)) {
    if (norm.includes(key) || key.split('-').some(kw => kw.length > 3 && norm.includes(kw))) return url;
  }
  return ANIMAL_IMAGES['great-white-shark'];
};

const TIER_STYLES = {
  individual: {
    frame: 'linear-gradient(135deg, #c9a84c 0%, #f5e095 40%, #c9a84c 60%, #8a6a1a 100%)',
    body: '#0d0d0d',
    badge: null as string | null,
    badgeBg: null as string | null,
  },
  top25: {
    frame: 'linear-gradient(135deg, #9e9e9e 0%, #e8e8e8 40%, #9e9e9e 60%, #5c5c5c 100%)',
    body: '#070d1a',
    badge: 'TOP 25 COLLECTION',
    badgeBg: '#1565c0',
  },
  ultimate: {
    frame: 'linear-gradient(135deg, #4a148c 0%, #9c27b0 25%, #1a237e 50%, #9c27b0 75%, #4a148c 100%)',
    body: '#04040c',
    badge: 'ULTIMATE — ALL 60 PREDATORS',
    badgeBg: '#4a148c',
  },
};

const getTheme = (type: string, tier: CertTier) => {
  const t = type.toLowerCase();
  const tierBase = TIER_STYLES[tier];

  // individual tier gets animal-matched colours; other tiers fixed
  let accent = '#b71c1c', gold = '#c9a84c';
  if (tier === 'top25')    { accent = '#1565c0'; gold = '#90caf9'; }
  if (tier === 'ultimate') { accent = '#7b1fa2'; gold = '#ce93d8'; }

  if (tier === 'individual') {
    if (t.includes('shark') || t.includes('orca') || t.includes('ray'))          { accent = '#1a6fb5'; gold = '#64b5f6'; }
    else if (t.includes('lion') || t.includes('cheetah') || t.includes('leopard')) { accent = '#c47c1a'; gold = '#ffd54f'; }
    else if (t.includes('tiger'))    { accent = '#c44a1a'; gold = '#ffab40'; }
    else if (t.includes('bear'))     { accent = '#6b4c2a'; gold = '#bcaaa4'; }
    else if (t.includes('croc'))     { accent = '#2a6b3a'; gold = '#81c784'; }
    else if (t.includes('spider') || t.includes('scorpion')) { accent = '#7b1fa2'; gold = '#ce93d8'; }
    else if (t.includes('jellyfish') || t.includes('octopus')) { accent = '#c2185b'; gold = '#f48fb1'; }
    else if (t.includes('hippo') || t.includes('elephant')) { accent = '#546e7a'; gold = '#b0bec5'; }
    else if (t.includes('cobra') || t.includes('mamba') || t.includes('snake')) { accent = '#2e7d32'; gold = '#a5d6a7'; }
  }

  return { ...tierBase, accent, gold };
};

const getAnimalFact = (type: string): string => {
  const t = type.toLowerCase();
  if (t.includes('great white')) return 'Can detect a drop of blood from 400m away and breach at 56 km/h.';
  if (t.includes('tiger shark')) return 'Serrated teeth and a garbage-can diet — licence plates, tyres, even drums.';
  if (t.includes('bull shark')) return 'The only shark that can survive indefinitely in fresh water — found in rivers 3,700 km inland.';
  if (t.includes('hammerhead')) return 'The hammer shape gives 360° vertical vision — it sees above and below simultaneously.';
  if (t.includes('blue shark')) return 'Migratory record: 9,200 km from New York to Brazil. Reaches speeds of 39 km/h.';
  if (t.includes('shark')) return 'Sharks have existed for 450M years — predating trees, dinosaurs, and the rings of Saturn.';
  if (t.includes('saltwater croc')) return 'Strongest bite force ever measured in any living animal: 16,460 N.';
  if (t.includes('croc')) return 'Crocodilians are the closest living relatives of birds — not lizards.';
  if (t.includes('lion')) return "A lion's roar reaches 114 decibels and can be heard 8 km away.";
  if (t.includes('tiger')) return 'Tigers actively love water and will pursue prey into rivers and lakes.';
  if (t.includes('grizzly') || t.includes('bear')) return 'Can sprint at 56 km/h — faster than Usain Bolt — for short distances.';
  if (t.includes('polar')) return 'Can smell a seal through 1m of ice and from 32 km away.';
  if (t.includes('hippo')) return 'Hippos kill more people in Africa than any other large land animal — and they run at 30 km/h.';
  if (t.includes('elephant')) return 'Elephants recognise themselves in mirrors — self-awareness shared with apes, dolphins, and magpies only.';
  if (t.includes('leopard')) return 'Can carry prey twice their body weight up 6m into trees to keep it from lions.';
  if (t.includes('jaguar')) return 'Kills with a skull bite — the only big cat that doesn\'t go for the throat.';
  if (t.includes('cheetah')) return 'Accelerates 0–96 km/h in 3 seconds — faster than most sports cars.';
  if (t.includes('box jellyfish')) return 'Carries enough venom to kill 60 adults. Has 24 eyes — yet no brain.';
  if (t.includes('blue-ringed') || t.includes('octopus')) return 'Venom enough to kill 26 adults. No antivenom exists.';
  if (t.includes('orca')) return 'Orcas have culture: each pod has a unique dialect passed down through generations.';
  if (t.includes('king cobra')) return 'The only snake that builds a nest and guards its eggs — and it can "stand" 1.8m tall.';
  if (t.includes('black mamba')) return 'Fastest land snake: 20 km/h. Venom kills untreated in 20 minutes.';
  if (t.includes('cape buffalo')) return 'Responsible for more hunter deaths in Africa than any other animal.';
  return 'This predator has been refined by millions of years of evolution.';
};

const Certificate: React.FC<CertificateProps> = ({
  insuranceType = 'Great White Shark',
  name = 'John Adventurer',
  country = 'Australia',
  uniqueId = Math.random().toString(36).substring(2, 10).toUpperCase(),
  multipleItems,
  isPreview = false,
  imageUrl,
  tier = 'individual',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animDone, setAnimDone] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    setAnimDone(false);
    const t = setTimeout(() => setIsVisible(true), 180);
    return () => clearTimeout(t);
  }, [insuranceType, tier]);

  useEffect(() => {
    if (isVisible && !animDone && !isPreview) {
      const t = setTimeout(() => {
        confetti({ particleCount: 100, spread: 75, origin: { y: 0.6 } });
        setAnimDone(true);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [isVisible, animDone, isPreview]);

  const theme = getTheme(insuranceType, tier);
  const photo = getAnimalImage(insuranceType, imageUrl);
  const fact = getAnimalFact(insuranceType);

  const expiry = new Date();
  expiry.setFullYear(expiry.getFullYear() + 1);
  const expiryStr = expiry.toLocaleDateString('en-AU', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const todayStr = new Date().toLocaleDateString('en-AU', { year: 'numeric', month: '2-digit', day: '2-digit' });

  const isMulti = multipleItems && multipleItems.length > 1;
  const displayName = isMulti
    ? `${multipleItems!.length} Predator Collection`
    : insuranceType.replace(' Certificate', '').replace(' Insurance', '');

  const coverageAmt = tier === 'ultimate' ? 'US$50,000 ×60' : tier === 'top25' ? 'US$50,000 ×25' : 'US$50,000';
  const authBadge = isPreview ? 'PREVIEW' : tier === 'ultimate' ? 'ELITE' : tier === 'top25' ? 'PLATINUM' : 'AUTHENTIC';

  return (
    <div className={`relative transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <motion.div
        key={insuranceType + tier}
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.01 }}
      >
        {/* Tier-coloured outer frame */}
        <div
          className="max-w-2xl mx-auto rounded-2xl overflow-hidden"
          style={{
            background: theme.frame,
            padding: '4px',
            boxShadow: `0 0 0 1px rgba(255,255,255,0.08), 0 24px 60px rgba(0,0,0,0.55), 0 0 50px ${theme.accent}44`,
          }}
        >
          <div className="rounded-xl overflow-hidden" style={{ background: theme.body }}>

            {/* Tier strip badge */}
            {theme.badge && (
              <div
                className="w-full py-1.5 text-center text-[10px] font-black tracking-[0.3em] uppercase text-white"
                style={{ background: theme.badgeBg! }}
              >
                {theme.badge}
              </div>
            )}

            {/* Animal photo hero */}
            <div className="relative h-60 sm:h-72 overflow-hidden">
              <img
                key={photo}
                src={photo}
                alt={displayName}
                className="w-full h-full object-cover object-center"
                style={{ filter: 'brightness(0.70) saturate(1.1)', transition: 'opacity 0.4s' }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/88" />

              {/* Top row */}
              <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-5 pt-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: theme.gold + 'bb' }}>Wildlife Shield</div>
                  <div className="text-white font-bold text-base">Certificate of Coverage</div>
                </div>
                <span className="text-[10px] font-black tracking-wider px-2.5 py-1 rounded-full text-white" style={{ background: theme.accent }}>
                  {authBadge}
                </span>
              </div>

              {/* Animal name */}
              <div className="absolute bottom-4 left-0 right-0 text-center px-5">
                <div className="text-2xl sm:text-3xl font-black" style={{ color: theme.gold, textShadow: '0 2px 14px rgba(0,0,0,0.95)' }}>
                  {displayName}
                </div>
                {isMulti && (
                  <div className="flex justify-center gap-1.5 mt-1 flex-wrap">
                    {multipleItems!.slice(0, 8).map((it, i) => <span key={i} className="text-base">{it.icon}</span>)}
                  </div>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="px-5 sm:px-7 pb-6 pt-4 relative">

              {/* Watermark */}
              {isPreview && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20" style={{ transform: 'rotate(-22deg)' }}>
                  <div className="font-black text-3xl sm:text-4xl tracking-widest text-center select-none whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.065)' }}>
                    APEXPREDATORINSURANCE.COM<br />APEXPREDATORINSURANCE.COM
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="h-px mb-4" style={{ background: `linear-gradient(to right, transparent, ${theme.gold}, transparent)` }} />

              {/* Certifies */}
              <div className="text-center mb-4">
                <div className="text-white/35 text-[10px] uppercase tracking-[0.22em] mb-1">This certifies that</div>
                <div className="text-xl sm:text-2xl font-bold text-white">{name}</div>
                <div className="text-white/50 text-sm mt-1">
                  {isMulti
                    ? `is covered for encounters with ${multipleItems!.length} apex predators`
                    : `is covered for ${displayName.toLowerCase()} encounters`}
                </div>
              </div>

              {/* Coverage */}
              <div className="rounded-xl p-4 mb-4 flex justify-between items-center" style={{ background: 'rgba(255,255,255,0.035)', border: `1px solid ${theme.gold}22` }}>
                <div>
                  <div className="text-white/30 text-[10px] uppercase tracking-wider">Coverage</div>
                  <div className="font-black text-xl mt-0.5" style={{ color: theme.gold }}>{coverageAmt}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/30 text-[10px] uppercase tracking-wider">Valid Until</div>
                  <div className="text-white font-bold text-sm mt-0.5">{expiryStr}</div>
                </div>
              </div>

              {/* Fact */}
              {!isMulti && (
                <div className="rounded-lg p-3 mb-4" style={{ background: 'rgba(255,255,255,0.025)', borderLeft: `3px solid ${theme.accent}` }}>
                  <p className="text-white/50 text-xs italic">
                    <span className="not-italic font-semibold" style={{ color: theme.gold }}>Fact: </span>{fact}
                  </p>
                </div>
              )}

              {/* Footer */}
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-white/22 text-[10px] uppercase tracking-wider">Certificate ID</div>
                  <div className="text-white/55 font-mono text-sm font-semibold mt-0.5">{uniqueId}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/22 text-[10px] uppercase tracking-wider">Issued</div>
                  <div className="text-white/50 text-sm mt-0.5">{todayStr}</div>
                </div>
              </div>

              <div className="mt-4 pt-3 text-center" style={{ borderTop: `1px solid ${theme.gold}15` }}>
                <div className="text-white/18 text-[10px] tracking-[0.12em] uppercase">ApexPredatorInsurance.com · Wildlife Shield Programme</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Certificate;
