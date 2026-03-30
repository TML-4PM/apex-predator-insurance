
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

type CertificateProps = {
  insuranceType?: string;
  name?: string;
  country?: string;
  date?: string;
  uniqueId?: string;
  multipleItems?: Array<{ id: string; name: string; icon: string }>;
  isPreview?: boolean;
};

// ── Premium animal-only photography (no humans in frame) ──────────────────
const ANIMAL_IMAGES: Record<string, string> = {
  Shark:       'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/White_shark.jpg/800px-White_shark.jpg',
  'Great White': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/White_shark.jpg/800px-White_shark.jpg',
  'Hammerhead': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Scalloped_Hammerhead_Shark_Sphyrna_Lewini_%28226845659%29.jpeg/800px-Scalloped_Hammerhead_Shark_Sphyrna_Lewini_%28226845659%29.jpeg',
  'Bull Shark': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Bullshark_Beqa_Fiji_2007.jpg/800px-Bullshark_Beqa_Fiji_2007.jpg',
  'Tiger Shark': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Tiger_shark.jpg/800px-Tiger_shark.jpg',
  Crocodile:   'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/SaltwaterCrocodile%28%27Maximo%27%29.jpg/800px-SaltwaterCrocodile%28%27Maximo%27%29.jpg',
  Lion:        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg/800px-020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg',
  Tiger:       'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/P.t.altaica_Tomak_Male.jpg/800px-P.t.altaica_Tomak_Male.jpg',
  Bear:        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/GrizzlyBearJeanBeaufort.jpg/800px-GrizzlyBearJeanBeaufort.jpg',
  Grizzly:     'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/GrizzlyBearJeanBeaufort.jpg/800px-GrizzlyBearJeanBeaufort.jpg',
  Polar:       'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Polar_Bear_-_Alaska_%28cropped%29.jpg/800px-Polar_Bear_-_Alaska_%28cropped%29.jpg',
  Scorpion:    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Androctonus_australis.jpg/800px-Androctonus_australis.jpg',
  Spider:      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Black_widow_spider.jpg/800px-Black_widow_spider.jpg',
  Snake:       'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Ophiophagus_hannah_2.jpg/800px-Ophiophagus_hannah_2.jpg',
  Cobra:       'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Ophiophagus_hannah_2.jpg/800px-Ophiophagus_hannah_2.jpg',
  Elephant:    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/African_Elephant_%28Loxodonta_africana%29_male_%2817289351322%29.jpg/800px-African_Elephant_%28Loxodonta_africana%29_male_%2817289351322%29.jpg',
  Jellyfish:   'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Avispa_marina_cropped.png/800px-Avispa_marina_cropped.png',
  'Box Jellyfish': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Avispa_marina_cropped.png/800px-Avispa_marina_cropped.png',
  Octopus:     'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Hapalochlaena_lunulata2.JPG/800px-Hapalochlaena_lunulata2.JPG',
  Leopard:     'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/African_leopard_male_%28cropped%29.jpg/800px-African_leopard_male_%28cropped%29.jpg',
  Jaguar:      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Standing_jaguar.jpg/800px-Standing_jaguar.jpg',
  Hippo:       'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Portrait_Hippopotamus_in_the_water.jpg/800px-Portrait_Hippopotamus_in_the_water.jpg',
  Orca:        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Killerwhales_jumping.jpg/800px-Killerwhales_jumping.jpg',
  Stonefish:   'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Synanceia_verrucosa_Prague_2011_2.jpg/800px-Synanceia_verrucosa_Prague_2011_2.jpg',
  Stingray:    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/SStringray.jpg/800px-SStringray.jpg',
  default:     'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/White_shark.jpg/800px-White_shark.jpg',
};

const getAnimalImage = (type: string): string => {
  for (const [key, url] of Object.entries(ANIMAL_IMAGES)) {
    if (type.toLowerCase().includes(key.toLowerCase())) return url;
  }
  return ANIMAL_IMAGES.default;
};

// ── Theme colours per animal class ───────────────────────────────────────
const getTheme = (type: string) => {
  const t = type.toLowerCase();
  if (t.includes('shark') || t.includes('orca') || t.includes('stingray'))
    return { accent: '#1a6fb5', gold: '#c9a84c', ring: 'rgba(26,111,181,0.4)' };
  if (t.includes('lion') || t.includes('cheetah') || t.includes('leopard') || t.includes('jaguar'))
    return { accent: '#c47c1a', gold: '#e2c06a', ring: 'rgba(196,124,26,0.4)' };
  if (t.includes('tiger'))
    return { accent: '#c44a1a', gold: '#e2a06a', ring: 'rgba(196,74,26,0.4)' };
  if (t.includes('bear') || t.includes('grizzly') || t.includes('polar'))
    return { accent: '#6b4c2a', gold: '#c9a070', ring: 'rgba(107,76,42,0.4)' };
  if (t.includes('croc') || t.includes('snake') || t.includes('cobra'))
    return { accent: '#2a6b3a', gold: '#7ec47a', ring: 'rgba(42,107,58,0.4)' };
  if (t.includes('spider') || t.includes('scorpion'))
    return { accent: '#7b1fa2', gold: '#ce93d8', ring: 'rgba(123,31,162,0.4)' };
  if (t.includes('jellyfish') || t.includes('octopus'))
    return { accent: '#c2185b', gold: '#f48fb1', ring: 'rgba(194,24,91,0.4)' };
  return { accent: '#b71c1c', gold: '#c9a84c', ring: 'rgba(183,28,28,0.4)' };
};

const getInsuranceInfo = (type: string) => {
  const infoMap: Record<string, { icon: string; text: string; funFact: string }> = {
    Shark:       { icon: '🦈', text: 'in open ocean waters', funFact: 'Great whites can detect a single drop of blood from 400m away.' },
    Crocodile:   { icon: '🐊', text: 'in tropical waterways', funFact: 'Saltwater crocodiles have the strongest bite force ever measured in an animal.' },
    Lion:        { icon: '🦁', text: 'across African savannas', funFact: "A lion's roar can be heard from 8km away." },
    Tiger:       { icon: '🐅', text: 'in Asian wilderness', funFact: 'Tigers are the only big cats that actively enjoy water.' },
    Bear:        { icon: '🐻', text: 'in national parks & wilderness', funFact: 'Grizzlies can run at 56 km/h — faster than Usain Bolt.' },
    Scorpion:    { icon: '🦂', text: 'in desert & arid regions', funFact: 'Scorpions glow blue-green under UV light.' },
    Spider:      { icon: '🕷️', text: 'in tropical & temperate zones', funFact: 'Some spiders can hold their breath underwater for 24 hours.' },
    Snake:       { icon: '🐍', text: 'in wilderness & grasslands', funFact: 'King cobras are the only snakes that build nests for their eggs.' },
    Elephant:    { icon: '🐘', text: 'in wildlife reserves', funFact: 'Elephants recognise themselves in mirrors — one of only four animals able to do so.' },
    Jellyfish:   { icon: '🪼', text: 'in coastal ocean waters', funFact: 'Jellyfish have survived for 650 million years — longer than trees.' },
    Octopus:     { icon: '🐙', text: 'in tidal and deep waters', funFact: 'The blue-ringed octopus carries enough venom to kill 26 adults.' },
    Leopard:     { icon: '🐆', text: 'in forest & savanna zones', funFact: 'Leopards can carry prey twice their body weight up into trees.' },
    Hippo:       { icon: '🦛', text: 'along African rivers', funFact: 'Hippos kill more people in Africa than any other large animal.' },
    Orca:        { icon: '🐋', text: 'in polar and temperate seas', funFact: 'Orcas have culture — each pod has its own dialect.' },
    default:     { icon: '🦁', text: 'anywhere danger lurks', funFact: 'Nature has perfected its predators over millions of years of evolution.' },
  };
  const key = Object.keys(infoMap).find(k => type.toLowerCase().includes(k.toLowerCase()));
  return infoMap[key ?? 'default'];
};

const Certificate: React.FC<CertificateProps> = ({
  insuranceType = 'Shark Certificate',
  name = 'John Adventurer',
  country = 'Australia',
  date = new Date().toISOString().split('T')[0],
  uniqueId = Math.random().toString(36).substring(2, 10).toUpperCase(),
  multipleItems,
  isPreview = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isVisible && !animationComplete && !isPreview) {
      const t = setTimeout(() => {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        setAnimationComplete(true);
      }, 800);
      return () => clearTimeout(t);
    }
  }, [isVisible, animationComplete, isPreview]);

  const info = getInsuranceInfo(insuranceType);
  const theme = getTheme(insuranceType);
  const animalImage = multipleItems && multipleItems.length > 1
    ? ANIMAL_IMAGES.default
    : getAnimalImage(insuranceType);

  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  const expiryFormatted = expiryDate.toLocaleDateString('en-AU', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const todayFormatted = new Date().toLocaleDateString('en-AU', { year: 'numeric', month: '2-digit', day: '2-digit' });

  return (
    <div className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      <motion.div
        initial={{ rotateY: 0 }}
        whileHover={{ rotateY: 3, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Outer gold frame */}
        <div
          className="max-w-2xl mx-auto rounded-2xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, #c9a84c 0%, #f5e095 40%, #c9a84c 60%, #8a6a1a 100%)`,
            padding: '4px',
            boxShadow: `0 0 0 1px rgba(201,168,76,0.3), 0 20px 60px rgba(0,0,0,0.4), 0 0 80px ${theme.ring}`,
          }}
        >
          {/* Inner cert body */}
          <div
            className="relative rounded-xl overflow-hidden"
            style={{
              background: '#0d0d0d',
              minHeight: 520,
            }}
          >
            {/* Hero animal image — fills top 55% */}
            <div className="relative h-72 overflow-hidden">
              <img
                src={animalImage}
                alt={insuranceType}
                className="w-full h-full object-cover object-center"
                style={{ filter: 'brightness(0.75) saturate(1.15)' }}
              />
              {/* Gradient fade to dark body */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />

              {/* Top bar */}
              <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 pt-5">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/60 font-medium">Wildlife Shield</div>
                  <div className="text-white font-bold text-lg tracking-wide">Certificate of Coverage</div>
                </div>
                <div
                  className="text-xs font-bold tracking-wider px-3 py-1 rounded-full"
                  style={{ background: theme.accent, color: '#fff' }}
                >
                  {isPreview ? 'PREVIEW' : 'AUTHENTIC'}
                </div>
              </div>

              {/* Animal name centred over image */}
              <div className="absolute bottom-4 left-0 right-0 text-center px-6">
                <div
                  className="text-3xl font-black tracking-tight"
                  style={{ color: theme.gold, textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
                >
                  {multipleItems && multipleItems.length > 1
                    ? `${multipleItems.length} Predator Collection`
                    : insuranceType.replace(' Certificate', '').replace(' Insurance', '')}
                </div>
                {!multipleItems && (
                  <div className="text-white/60 text-xs mt-0.5 tracking-widest uppercase">
                    {info.text}
                  </div>
                )}
              </div>
            </div>

            {/* Body content */}
            <div className="px-8 pb-8 pt-5 relative">

              {/* Diagonal watermark — only shown in preview */}
              {isPreview && (
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                  style={{ transform: 'rotate(-25deg)' }}
                >
                  <div
                    className="text-white/12 font-black text-4xl tracking-widest text-center select-none"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    APEXPREDATORINSURANCE.COM
                    <br />
                    APEXPREDATORINSURANCE.COM
                  </div>
                </div>
              )}

              {/* Icons for multi-predator */}
              {multipleItems && multipleItems.length > 1 && (
                <div className="flex justify-center gap-2 mb-4 flex-wrap">
                  {multipleItems.slice(0, 8).map((item, i) => (
                    <span key={i} className="text-2xl">{item.icon}</span>
                  ))}
                </div>
              )}

              {/* Gold divider */}
              <div className="h-px mb-5" style={{ background: `linear-gradient(to right, transparent, ${theme.gold}, transparent)` }} />

              {/* Certifies that */}
              <div className="text-center mb-5">
                <div className="text-white/50 text-xs uppercase tracking-[0.2em] mb-1">This certifies that</div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: '#fff', textShadow: `0 0 20px ${theme.ring}` }}
                >
                  {name}
                </div>
                <div className="text-white/60 text-sm mt-1">
                  {multipleItems && multipleItems.length > 1
                    ? `is covered for encounters with ${multipleItems.length} apex predators across multiple environments`
                    : `is covered for ${insuranceType.replace(' Certificate', '').replace(' Insurance', '').toLowerCase()} encounters ${info.text}`}
                </div>
              </div>

              {/* Coverage + validity row */}
              <div
                className="rounded-xl p-4 mb-5 flex justify-between items-center"
                style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${theme.gold}30` }}
              >
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-wider">Coverage</div>
                  <div className="font-black text-2xl mt-0.5" style={{ color: theme.gold }}>US$50,000</div>
                </div>
                <div className="text-right">
                  <div className="text-white/40 text-xs uppercase tracking-wider">Valid Until</div>
                  <div className="text-white font-bold text-lg mt-0.5">{expiryFormatted}</div>
                </div>
              </div>

              {/* Fun fact */}
              {info.funFact && !multipleItems && (
                <div
                  className="rounded-lg p-3 mb-5 text-center"
                  style={{ background: 'rgba(255,255,255,0.04)', borderLeft: `3px solid ${theme.accent}` }}
                >
                  <p className="text-white/60 text-xs italic">
                    <span className="not-italic font-semibold" style={{ color: theme.gold }}>Fact: </span>
                    {info.funFact}
                  </p>
                </div>
              )}

              {/* Footer meta */}
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-white/30 text-xs uppercase tracking-wider">Certificate ID</div>
                  <div className="text-white/70 font-mono text-sm font-semibold mt-0.5">{uniqueId}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/30 text-xs uppercase tracking-wider">Issued</div>
                  <div className="text-white/70 text-sm mt-0.5">{todayFormatted}</div>
                </div>
              </div>

              {/* Branding footer */}
              <div
                className="mt-5 pt-4 text-center"
                style={{ borderTop: `1px solid ${theme.gold}25` }}
              >
                <div className="text-white/25 text-xs tracking-[0.15em] uppercase">
                  ApexPredatorInsurance.com · Wildlife Shield Programme
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Certificate;
