
import React from 'react';
import Layout from '@/components/Layout';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarDays, Clock, User, Tag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Sample blog post data - this would typically come from a CMS or API
const blogPosts = [
  {
    id: 1,
    title: 'How to Survive a Shark Encounter (You Probably Won\'t)',
    excerpt: 'Our tongue-in-cheek guide to shark encounters. The only real advice: don\'t get in the water.',
    content: `
      <p>So you're planning on swimming in shark-infested waters? Well, first of all, don't. But if you absolutely must, here are some tips that probably won't help but might make you feel better before the inevitable happens.</p>
      
      <h2>Understanding Shark Behavior</h2>
      <p>Sharks are apex predators that have evolved over millions of years to be incredibly efficient hunters. They can smell a single drop of blood from up to three miles away and can sense the electrical impulses of your beating heart. Basically, they're designed to find you if they want to.</p>
      
      <p>Most shark species aren't actually interested in humans as prey. We're too bony and not fatty enough for their taste. The problem is, they don't have hands to check what you are, so they use their mouths instead. Unfortunately, their "taste test" can be deadly.</p>
      
      <h2>Tips for Reducing Risk (That Probably Won't Matter)</h2>
      <ul>
        <li>Avoid swimming at dawn, dusk, or night when sharks are most active</li>
        <li>Don't swim if you're bleeding</li>
        <li>Avoid areas where people are fishing</li>
        <li>Stay in groups - sharks are more likely to attack lone individuals</li>
        <li>Avoid wearing shiny jewelry or high-contrast clothing</li>
        <li>Don't splash excessively</li>
      </ul>
      
      <h2>If You Encounter a Shark</h2>
      <p>If you do see a shark while swimming, try to maintain eye contact. Many sharks prefer to ambush prey, so facing them directly may deter an attack. If the shark approaches, try to position yourself with your back against something solid like a reef or rock wall to limit the directions from which it can approach.</p>
      
      <p>If a shark does attack, the old advice was to "play dead." This is terrible advice. Instead, be as aggressive as possible. Punch the shark in the nose, gills, or eyes - these are sensitive areas. Use whatever you have available - your fist, a camera, a dive knife, etc.</p>
      
      <h2>The Best Shark Safety Advice</h2>
      <p>The only foolproof method to avoid a shark attack is to stay out of the ocean entirely. Our Shark Insurance certificate won't actually protect you from an attack, but it might give your loved ones a good laugh at your memorial service.</p>
      
      <p>Remember, you're entering their home, not the other way around. Respect these incredible creatures from a distance - preferably from behind the glass at an aquarium.</p>
    `,
    author: 'Mike Fisher',
    date: 'June 12, 2023',
    readTime: '5 min read',
    category: 'Shark Safety',
    image: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?q=80&w=1000',
    slug: 'how-to-survive-shark-encounter'
  },
  {
    id: 2,
    title: 'Hiking in Bear Country: The Ultimate Guide',
    excerpt: 'Essential strategies for hiking in areas populated by bears, and what to do if you encounter one.',
    content: `
      <p>Venturing into bear territory requires preparation, knowledge, and a healthy respect for these powerful animals. Whether you're hiking in North America's national parks or exploring remote wilderness, understanding how to coexist with bears can be a matter of life and death - though our Bear Insurance certificate won't actually help you survive an encounter.</p>
      
      <h2>Know Your Bears</h2>
      <p>North America is home to three bear species: black bears, brown/grizzly bears, and polar bears. Each has different behaviors and requires different response strategies if encountered.</p>
      
      <h3>Black Bears</h3>
      <p>Despite their name, black bears can be brown, cinnamon, or even white. They're generally smaller than grizzlies and have no shoulder hump. Black bears are less aggressive than grizzlies but can be dangerous if habituated to human food or protecting cubs.</p>
      
      <h3>Brown/Grizzly Bears</h3>
      <p>Identified by their distinctive shoulder hump, dish-shaped face, and long front claws. Grizzlies are more territorial and may be more aggressive in defending food sources or young.</p>
      
      <h2>Prevention Is Best</h2>
      <ul>
        <li>Make noise while hiking - talk, sing, or use bear bells</li>
        <li>Travel in groups of 3 or more</li>
        <li>Be especially alert near dense vegetation, berry patches, or near water</li>
        <li>Keep dogs leashed or leave them at home</li>
        <li>Carry bear spray and know how to use it</li>
        <li>Properly store food and scented items</li>
      </ul>
      
      <h2>If You Encounter a Bear</h2>
      <p>If you see a bear before it notices you, quietly back away. If the bear spots you, identify yourself as human by talking calmly. Avoid direct eye contact, which bears may perceive as a challenge.</p>
      
      <p>For black bears, standing your ground and making yourself look big is often effective. For grizzlies, playing dead by lying flat on your stomach with hands behind your neck and legs spread may be necessary if contact is imminent.</p>
      
      <p>Never run from a bear - they can outrun, outclimb, and outswim you. Running may trigger their predatory instinct to chase.</p>
      
      <h2>The Reality Check</h2>
      <p>While bear attacks are rare, they do happen. Our humorous Bear Insurance might make for a funny gift, but real preparation is what matters. Take a wilderness first aid course, carry appropriate safety equipment, and most importantly, educate yourself about proper behavior in bear country.</p>
      
      <p>Remember: a fed bear is a dead bear. Never leave food accessible to wildlife - you're not just risking your safety, but the bear's life as well.</p>
    `,
    author: 'Sarah Johnson',
    date: 'May 28, 2023',
    readTime: '7 min read',
    category: 'Bear Safety',
    image: 'https://images.unsplash.com/photo-1525869916826-972885c91c1e?q=80&w=1000',
    slug: 'hiking-bear-country-ultimate-guide'
  },
  {
    id: 3,
    title: 'So You Want to Pet a Lion? Here\'s Why You Shouldn\'t',
    excerpt: 'An exploration of why big cats don\'t want your cuddles, despite their fluffy appearance.',
    content: `
      <p>They look so majestic in documentaries. So cuddly in those viral videos. That mane is just begging to be stroked, right? Wrong. Lions are apex predators, not oversized house cats, and approaching one for a petting session is a one-way ticket to becoming lunch.</p>
      
      <h2>Lions Are Not Big Kittens</h2>
      <p>Despite superficial similarities to domestic cats, lions are wild animals with all their predatory instincts intact. An adult male lion can weigh up to 550 pounds and has been documented delivering a bite force of over 1,000 pounds per square inch. That's enough to crush your skull like a grape.</p>
      
      <p>Even lions raised in captivity retain their wild instincts. There are countless cases of "tame" lions suddenly attacking their handlers or owners, often with tragic results. Lions don't rationalize relationships the way humans do - they operate on instinct, and those instincts include hunting and killing.</p>
      
      <h2>Those Viral Videos Are Misleading</h2>
      <p>For every heartwarming video of a human cuddling a lion, there are dozens of unreported near-misses and actual attacks. The viral content you see often features highly trained professionals working with specific animals under controlled conditions - and even they get it wrong sometimes, with serious consequences.</p>
      
      <p>Many "sanctuary" facilities that allow direct contact with big cats are not actually accredited conservation organizations but tourist traps that prioritize profit over animal welfare and human safety.</p>
      
      <h2>Ethics Matter Too</h2>
      <p>Beyond the obvious danger to humans, petting attractions harm the lions themselves. Cubs used for petting attractions are often taken from their mothers prematurely, causing psychological distress. Once they grow too large for petting (around 12 weeks), many facilities have no long-term plan for their care.</p>
      
      <p>True conservation facilities prioritize natural behavior and minimize human contact. If you can pet a lion, it's not a legitimate conservation program.</p>
      
      <h2>Safe Alternatives</h2>
      <p>If you love lions, the best way to appreciate them is through:
      <ul>
        <li>Visiting accredited zoos that maintain high welfare standards</li>
        <li>Supporting legitimate conservation organizations</li>
        <li>Going on ethical safari experiences that observe lions in their natural habitat</li>
        <li>Volunteering with conservation programs that don't offer direct contact with animals</li>
      </ul>
      </p>
      
      <h2>Our Lion Insurance Won't Help You</h2>
      <p>Our humorous Lion Insurance certificate makes a great gag gift, but it definitely won't protect you from the consequences of trying to pet a 400-pound predator. The only real insurance against lion attacks is maintaining a respectful distance and admiring these magnificent creatures from afar.</p>
    `,
    author: 'David Rodriguez',
    date: 'April 15, 2023',
    readTime: '6 min read',
    category: 'Big Cat Facts',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=1000',
    slug: 'why-you-shouldnt-pet-lions'
  },
  {
    id: 4,
    title: 'Crocodile Encounters: Surviving the Ambush Predator',
    excerpt: 'Understanding crocodile behavior and the importance of respecting their territory.',
    content: `
      <p>Crocodiles have been around for over 200 million years, outliving the dinosaurs and perfecting their hunting techniques to become one of nature's most effective predators. Though our Crocodile Insurance certificate is just for laughs, the danger these reptiles pose is very real.</p>
      
      <h2>Masters of Ambush</h2>
      <p>Saltwater and Nile crocodiles are responsible for hundreds of human deaths annually. What makes them so dangerous is their hunting style - they can remain nearly invisible at the water's edge, with only their eyes and nostrils visible, before launching a lightning-fast attack.</p>
      
      <p>Crocodiles can swim at 20 mph, lunge half their body length out of water, and possess the strongest bite force of any animal on Earth - measuring up to 3,700 pounds per square inch. That's more than enough to sever limbs or drag even large prey underwater.</p>
      
      <h2>Crocodile Safety Essentials</h2>
      <ul>
        <li>Never swim in waters known to contain crocodiles</li>
        <li>Stay at least 15 feet from the water's edge in crocodile territory</li>
        <li>Avoid routines - crocs observe patterns and can learn when people regularly visit specific spots</li>
        <li>Camp at least 50 meters from the water's edge and away from animal trails</li>
        <li>Never clean fish or dispose of food waste near the water</li>
        <li>Be especially cautious during breeding season when aggression increases</li>
      </ul>
      
      <h2>If You Encounter a Crocodile</h2>
      <p>If you spot a crocodile on land, back away slowly. Never come between a crocodile and water - they can move surprisingly fast on land for short distances and will almost always head toward water when threatened.</p>
      
      <p>In the extremely rare event of a crocodile attack, fight back aggressively. Target the eyes and snout, which are sensitive areas. However, prevention is infinitely better than trying to fight off an attacking crocodile.</p>
      
      <h2>Where Are You Most at Risk?</h2>
      <p>Saltwater crocodiles inhabit coastal areas, rivers, and swamps throughout Southeast Asia, Northern Australia, and parts of the South Pacific. Nile crocodiles are found throughout sub-Saharan Africa. American crocodiles in the Florida Everglades tend to be more shy around humans, but caution is still warranted.</p>
      
      <p>Estuaries, mangrove swamps, and river mouths are particularly high-risk areas as they provide ideal crocodile habitat.</p>
      
      <h2>The Certificate Won't Save You</h2>
      <p>While our Crocodile Insurance certificate makes a hilarious souvenir or gift, the only real protection is knowledge and caution. These prehistoric predators have survived so long for a reason - they're incredibly effective hunters that deserve our respect and a very wide berth.</p>
    `,
    author: 'Emma Waters',
    date: 'March 3, 2023',
    readTime: '8 min read',
    category: 'Crocodile Safety',
    image: 'https://images.unsplash.com/photo-1610058908279-b8ef27153f5e?q=80&w=1000',
    slug: 'crocodile-encounters-surviving'
  }
];

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogPosts.find(post => post.slug === slug);
  
  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-6">Article Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the article you're looking for.</p>
          <Link to="/articles">
            <Button>Back to Articles</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <article className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link to="/articles">
              <Button variant="outline" className="mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
              </Button>
            </Link>
            
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-apex-darkgray/70 mb-8">
                <div className="flex items-center gap-1">
                  <CalendarDays size={16} />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={16} />
                  <span>By {article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag size={16} />
                  <span className="bg-apex-red/10 text-apex-red px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden mb-12">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
            
            <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: article.content }} />
            
            <Separator className="my-12" />
            
            <div className="rounded-lg bg-apex-lightgray/30 p-6">
              <h3 className="font-bold text-xl mb-4">Ready to survive your next adventure?</h3>
              <p className="mb-6">Get your hilarious predator "insurance" certificate today!</p>
              <Link to="/plans">
                <Button>
                  Browse Certificates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default ArticleDetail;
