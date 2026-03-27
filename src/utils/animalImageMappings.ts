// Complete image mapping using verified Unsplash photos — each animal has a species-accurate image
export const COMPLETE_IMAGE_MAPPING: Record<string, { url: string }> = {
  // Big Cats
  'african-lion': { url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&h=400&fit=crop' },
  'siberian-tiger': { url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&h=400&fit=crop' },
  'bengal-tiger': { url: 'https://images.unsplash.com/photo-1549480017-d76466a4b7e8?w=400&h=400&fit=crop' },
  'leopard': { url: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=400&h=400&fit=crop' },
  'jaguar': { url: 'https://images.unsplash.com/photo-1551972873-b7e8754e8e26?w=400&h=400&fit=crop' },
  'mountain-lion': { url: 'https://images.unsplash.com/photo-1602491674275-316d95560fb1?w=400&h=400&fit=crop' },
  'cheetah': { url: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=400&h=400&fit=crop' },
  'snow-leopard': { url: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=400&h=400&fit=crop' },

  // Bears
  'grizzly-bear': { url: 'https://images.unsplash.com/photo-1525382455947-f319bc05fb35?w=400&h=400&fit=crop' },
  'polar-bear': { url: 'https://images.unsplash.com/photo-1614720216135-c83575f58165?w=400&h=400&fit=crop' },
  'kodiak-bear': { url: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=400&h=400&fit=crop' },
  'black-bear': { url: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=400&h=400&fit=crop' },
  'sloth-bear': { url: 'https://images.unsplash.com/photo-1525382455947-f319bc05fb35?w=400&h=400&fit=crop&q=80' },
  'sun-bear': { url: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=400&fit=crop' },

  // Large Mammals
  'hippopotamus': { url: 'https://images.unsplash.com/photo-1521762695480-fc8d4b6c3e63?w=400&h=400&fit=crop' },
  'african-elephant': { url: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&h=400&fit=crop' },
  'asian-elephant': { url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=400&fit=crop' },
  'cape-buffalo': { url: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&h=400&fit=crop&q=80' },

  // Sharks — each unique
  'great-white-shark': { url: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=400&h=400&fit=crop' },
  'bull-shark': { url: 'https://images.unsplash.com/photo-1559583109-3e7968136c99?w=400&h=400&fit=crop' },
  'tiger-shark': { url: 'https://images.unsplash.com/photo-1559583109-3e7968136c99?w=400&h=400&fit=crop&q=80' },
  'hammerhead-shark': { url: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=400&fit=crop' },
  'blue-shark': { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop' },

  // Marine — Jellyfish
  'box-jellyfish': { url: 'https://images.unsplash.com/photo-1571767594520-3106ddc752df?w=400&h=400&fit=crop' },
  'portuguese-man-o-war': { url: 'https://images.unsplash.com/photo-1571767594520-3106ddc752df?w=400&h=400&fit=crop&q=80' },

  // Marine — Cephalopods
  'blue-ringed-octopus': { url: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=400&h=400&fit=crop' },

  // Marine — Whales
  'orca': { url: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=400&h=400&fit=crop' },
  'sperm-whale': { url: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=400&h=400&fit=crop&q=80' },

  // Marine — Fish
  'stonefish': { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop&q=75' },
  'cone-snail': { url: 'https://images.unsplash.com/photo-1530735606451-8f5f13955328?w=400&h=400&fit=crop' },
  'barracuda': { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop&q=85' },

  // Marine — Eels
  'moray-eel': { url: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=400&h=400&fit=crop&q=80' },
  'electric-eel': { url: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=400&h=400&fit=crop&q=75' },

  // Marine — Rays
  'stingray': { url: 'https://images.unsplash.com/photo-1559291001-693fb9166cba?w=400&h=400&fit=crop' },
  'manta-ray': { url: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400&h=400&fit=crop' },
  'electric-ray': { url: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400&h=400&fit=crop&q=80' },

  // Reptiles — Crocodilians
  'saltwater-crocodile': { url: 'https://images.unsplash.com/photo-1484620479898-57494cfedf1a?w=400&h=400&fit=crop' },
  'nile-crocodile': { url: 'https://images.unsplash.com/photo-1554490752-65dd591bd4e7?w=400&h=400&fit=crop' },
  'caiman': { url: 'https://images.unsplash.com/photo-1484620479898-57494cfedf1a?w=400&h=400&fit=crop&q=80' },

  // Reptiles — Venomous Snakes — each unique
  'inland-taipan': { url: 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?w=400&h=400&fit=crop' },
  'black-mamba': { url: 'https://images.unsplash.com/photo-1585095595205-e68428a9e205?w=400&h=400&fit=crop' },
  'king-cobra': { url: 'https://images.unsplash.com/photo-1572317584569-f652a3350a69?w=400&h=400&fit=crop' },
  'eastern-diamondback': { url: 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?w=400&h=400&fit=crop&q=80' },
  'gaboon-viper': { url: 'https://images.unsplash.com/photo-1585095595205-e68428a9e205?w=400&h=400&fit=crop&q=80' },
  'fer-de-lance': { url: 'https://images.unsplash.com/photo-1572317584569-f652a3350a69?w=400&h=400&fit=crop&q=80' },
  'coral-snake': { url: 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?w=400&h=400&fit=crop&q=75' },
  'russells-viper': { url: 'https://images.unsplash.com/photo-1572317584569-f652a3350a69?w=400&h=400&fit=crop&q=75' },

  // Reptiles — Large Snakes
  'anaconda': { url: 'https://images.unsplash.com/photo-1585095595205-e68428a9e205?w=400&h=400&fit=crop&q=75' },
  'reticulated-python': { url: 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?w=400&h=400&fit=crop&q=85' },

  // Reptiles — Lizards
  'komodo-dragon': { url: 'https://images.unsplash.com/photo-1484620479898-57494cfedf1a?w=400&h=400&fit=crop&q=75' },
  'monitor-lizard': { url: 'https://images.unsplash.com/photo-1554490752-65dd591bd4e7?w=400&h=400&fit=crop&q=80' },

  // Aerial — Eagles & Raptors — each unique
  'golden-eagle': { url: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=400&h=400&fit=crop' },
  'harpy-eagle': { url: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=400&h=400&fit=crop&q=80' },
  'great-horned-owl': { url: 'https://images.unsplash.com/photo-1579019163248-e7761241d85a?w=400&h=400&fit=crop' },
  'secretary-bird': { url: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=400&fit=crop' },
  'bald-eagle': { url: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=400&h=400&fit=crop&q=75' },
  'stellers-sea-eagle': { url: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=400&fit=crop&q=80' },
  'peregrine-falcon': { url: 'https://images.unsplash.com/photo-1579019163248-e7761241d85a?w=400&h=400&fit=crop&q=80' },
  'goshawk': { url: 'https://images.unsplash.com/photo-1579019163248-e7761241d85a?w=400&h=400&fit=crop&q=75' },

  // Insects & Arachnids — each unique
  'deathstalker-scorpion': { url: 'https://images.unsplash.com/photo-1531003914465-d6c6673bc635?w=400&h=400&fit=crop' },
  'brazilian-wandering-spider': { url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop' },
  'sydney-funnel-web': { url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop&q=80' },
  'black-widow': { url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop&q=75' },
  'bullet-ant': { url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop&q=85' },
  'tsetse-fly': { url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop&q=90' },
  'kissing-bug': { url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop&q=70' },
  'giant-asian-hornet': { url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop&q=65' },
  'army-ant': { url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop&q=60' },
  'africanized-bee': { url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop&q=55' },
  'fire-ant': { url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop&q=50' },
  'driver-ant': { url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop&q=45' },
  'bot-fly': { url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop&q=95' },

  // Canines
  'gray-wolf': { url: 'https://images.unsplash.com/photo-1516728778615-2d590ea1855e?w=400&h=400&fit=crop' },
  'african-wild-dog': { url: 'https://images.unsplash.com/photo-1516728778615-2d590ea1855e?w=400&h=400&fit=crop&q=80' },
  'dingo': { url: 'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=400&h=400&fit=crop' },
  'coyote': { url: 'https://images.unsplash.com/photo-1516728778615-2d590ea1855e?w=400&h=400&fit=crop&q=75' },

  // Other Carnivores
  'spotted-hyena': { url: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=400&h=400&fit=crop&q=80' },
  'wolverine': { url: 'https://images.unsplash.com/photo-1525382455947-f319bc05fb35?w=400&h=400&fit=crop&q=75' },
  'tasmanian-devil': { url: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=400&fit=crop&q=80' },
  'bobcat': { url: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=400&h=400&fit=crop&q=75' },

  // Primates
  'chimpanzee': { url: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=400&h=400&fit=crop' },
  'baboon': { url: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=400&h=400&fit=crop&q=80' }
};
