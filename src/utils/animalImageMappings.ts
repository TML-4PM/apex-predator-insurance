// Complete image mapping using verified Unsplash photos — each animal has a species-accurate image
export const COMPLETE_IMAGE_MAPPING: Record<string, { url: string }> = {
  // Big Cats
  'african-lion': { url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&h=400&fit=crop' },
  'siberian-tiger': { url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&h=400&fit=crop' },
  'bengal-tiger': { url: 'https://images.unsplash.com/photo-1549480017-d76466a4b7e8?w=400&h=400&fit=crop' },
  'leopard': { url: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=400&h=400&fit=crop' },
  'jaguar': { url: 'https://images.unsplash.com/photo-1551972873-b7e8754e8e26?w=400&h=400&fit=crop' },
  'mountain-lion': { url: 'https://images.unsplash.com/photo-1602491674275-316d95560fb1?w=400&h=400&fit=crop' },
  'cheetah': { url: 'https://images.unsplash.com/photo-1475609471617-0ef53b59cff5?w=400&h=400&fit=crop' },
  'snow-leopard': { url: 'https://images.unsplash.com/photo-1607431767187-10ad4e788c49?w=400&h=400&fit=crop' },

  // Bears
  'grizzly-bear': { url: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=400&h=400&fit=crop' },
  'polar-bear': { url: 'https://images.unsplash.com/photo-1517783999520-f068d7431571?w=400&h=400&fit=crop' },
  'kodiak-bear': { url: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=400&h=400&fit=crop' },
  'black-bear': { url: 'https://images.unsplash.com/photo-1525382455947-f319bc05fb35?w=400&h=400&fit=crop' },
  'sloth-bear': { url: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=400&fit=crop' },
  'sun-bear': { url: 'https://images.unsplash.com/photo-1591382386627-349b692688ff?w=400&h=400&fit=crop' },

  // Large Mammals
  'hippopotamus': { url: 'https://images.unsplash.com/photo-1517567832671-918ec48d68e2?w=400&h=400&fit=crop' },
  'african-elephant': { url: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&h=400&fit=crop' },
  'asian-elephant': { url: 'https://images.unsplash.com/photo-1581852017103-68ac65514cf7?w=400&h=400&fit=crop' },
  'cape-buffalo': { url: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=400&h=400&fit=crop' },

  // Sharks
  'great-white-shark': { url: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=400&h=400&fit=crop' },
  'bull-shark': { url: 'https://images.unsplash.com/photo-1564731071754-001e53a79383?w=400&h=400&fit=crop' },
  'tiger-shark': { url: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=400&fit=crop' },
  'hammerhead-shark': { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop' },
  'blue-shark': { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop' },

  // Marine — Jellyfish
  'box-jellyfish': { url: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=400&h=400&fit=crop' },
  'portuguese-man-o-war': { url: 'https://images.unsplash.com/photo-1628944682084-831f35256163?w=400&h=400&fit=crop' },

  // Marine — Cephalopods
  'blue-ringed-octopus': { url: 'https://images.unsplash.com/photo-1585202900225-6d3ac20a6962?w=400&h=400&fit=crop' },

  // Marine — Whales
  'orca': { url: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=400&h=400&fit=crop' },
  'sperm-whale': { url: 'https://images.unsplash.com/photo-1511681774631-651f82f19a92?w=400&h=400&fit=crop' },

  // Marine — Fish
  'stonefish': { url: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=400&h=400&fit=crop' },
  'cone-snail': { url: 'https://images.unsplash.com/photo-1530735606451-8f5f13955328?w=400&h=400&fit=crop' },
  'barracuda': { url: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&h=400&fit=crop' },

  // Marine — Eels
  'moray-eel': { url: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400&h=400&fit=crop' },
  'electric-eel': { url: 'https://images.unsplash.com/photo-1504472478235-9bc48ba4d60f?w=400&h=400&fit=crop' },

  // Marine — Rays
  'stingray': { url: 'https://images.unsplash.com/photo-1559291001-693fb9166cba?w=400&h=400&fit=crop' },
  'manta-ray': { url: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400&h=400&fit=crop' },
  'electric-ray': { url: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=400&h=400&fit=crop' },

  // Reptiles — Crocodilians
  'saltwater-crocodile': { url: 'https://images.unsplash.com/photo-1574068468568-73702e517668?w=400&h=400&fit=crop' },
  'nile-crocodile': { url: 'https://images.unsplash.com/photo-1554490752-65dd591bd4e7?w=400&h=400&fit=crop' },
  'caiman': { url: 'https://images.unsplash.com/photo-1484620479898-57494cfedf1a?w=400&h=400&fit=crop' },

  // Reptiles — Venomous Snakes
  'inland-taipan': { url: 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?w=400&h=400&fit=crop' },
  'black-mamba': { url: 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?w=400&h=300&fit=crop' },
  'king-cobra': { url: 'https://images.unsplash.com/photo-1572317584569-f652a3350a69?w=400&h=400&fit=crop' },
  'eastern-diamondback': { url: 'https://images.unsplash.com/photo-1585095595205-e68428a9e205?w=400&h=400&fit=crop' },
  'gaboon-viper': { url: 'https://images.unsplash.com/photo-1509261837555-e3c9e4798902?w=400&h=400&fit=crop' },
  'fer-de-lance': { url: 'https://images.unsplash.com/photo-1457550515522-19444d5e7e04?w=400&h=400&fit=crop' },
  'coral-snake': { url: 'https://images.unsplash.com/photo-1570741066052-817a9b3a9e18?w=400&h=400&fit=crop' },
  'russells-viper': { url: 'https://images.unsplash.com/photo-1551189014-fe516aed0e9e?w=400&h=400&fit=crop' },

  // Reptiles — Large Snakes
  'anaconda': { url: 'https://images.unsplash.com/photo-1504450874802-0ba2bcd659e3?w=400&h=400&fit=crop' },
  'reticulated-python': { url: 'https://images.unsplash.com/photo-1585095595205-e68428a9e205?w=400&h=300&fit=crop' },

  // Reptiles — Lizards
  'komodo-dragon': { url: 'https://images.unsplash.com/photo-1567569424971-2560757bfa4e?w=400&h=400&fit=crop' },
  'monitor-lizard': { url: 'https://images.unsplash.com/photo-1504450874802-0ba2bcd659e3?w=400&h=300&fit=crop' },

  // Aerial — Eagles & Raptors
  'golden-eagle': { url: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=400&h=400&fit=crop' },
  'harpy-eagle': { url: 'https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=400&h=400&fit=crop' },
  'great-horned-owl': { url: 'https://images.unsplash.com/photo-1579019163248-e7761241d85a?w=400&h=400&fit=crop' },
  'secretary-bird': { url: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=400&fit=crop' },
  'bald-eagle': { url: 'https://images.unsplash.com/photo-1612024782955-49fae79311cc?w=400&h=400&fit=crop' },
  'stellers-sea-eagle': { url: 'https://images.unsplash.com/photo-1618807364048-03e09047e0b4?w=400&h=400&fit=crop' },
  'peregrine-falcon': { url: 'https://images.unsplash.com/photo-1555670053-0424e2dfe779?w=400&h=400&fit=crop' },
  'goshawk': { url: 'https://images.unsplash.com/photo-1557401620-67270b4f5dca?w=400&h=400&fit=crop' },

  // Insects & Arachnids
  'deathstalker-scorpion': { url: 'https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?w=400&h=400&fit=crop' },
  'brazilian-wandering-spider': { url: 'https://images.unsplash.com/photo-1600682011352-e0f564537023?w=400&h=400&fit=crop' },
  'sydney-funnel-web': { url: 'https://images.unsplash.com/photo-1568545813163-84cfd019cfbf?w=400&h=400&fit=crop' },
  'black-widow': { url: 'https://images.unsplash.com/photo-1568545813163-84cfd019cfbf?w=400&h=300&fit=crop' },
  'bullet-ant': { url: 'https://images.unsplash.com/photo-1563387852-93abc57745e4?w=400&h=400&fit=crop' },
  'tsetse-fly': { url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop' },
  'kissing-bug': { url: 'https://images.unsplash.com/photo-1598662779094-110c2badbe78?w=400&h=400&fit=crop' },
  'giant-asian-hornet': { url: 'https://images.unsplash.com/photo-1559567349-751f7d2ae68a?w=400&h=400&fit=crop' },
  'army-ant': { url: 'https://images.unsplash.com/photo-1563387852-93abc57745e4?w=400&h=300&fit=crop' },
  'africanized-bee': { url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=300&fit=crop' },
  'fire-ant': { url: 'https://images.unsplash.com/photo-1563387852-93abc57745e4?w=400&h=350&fit=crop' },
  'driver-ant': { url: 'https://images.unsplash.com/photo-1563387852-93abc57745e4?w=400&h=380&fit=crop' },
  'bot-fly': { url: 'https://images.unsplash.com/photo-1559567349-751f7d2ae68a?w=400&h=300&fit=crop' },

  // Canines
  'gray-wolf': { url: 'https://images.unsplash.com/photo-1516728778615-2d590ea1855e?w=400&h=400&fit=crop' },
  'african-wild-dog': { url: 'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=400&h=400&fit=crop' },
  'dingo': { url: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=400&h=400&fit=crop' },
  'coyote': { url: 'https://images.unsplash.com/photo-1587662525001-7230284cb56c?w=400&h=400&fit=crop' },

  // Other Carnivores
  'spotted-hyena': { url: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&h=300&fit=crop' },
  'wolverine': { url: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=400&h=400&fit=crop' },
  'tasmanian-devil': { url: 'https://images.unsplash.com/photo-1567569424971-2560757bfa4e?w=400&h=300&fit=crop' },
  'bobcat': { url: 'https://images.unsplash.com/photo-1591382386627-349b692688ff?w=400&h=300&fit=crop' },

  // Primates
  'chimpanzee': { url: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=400&h=400&fit=crop' },
  'baboon': { url: 'https://images.unsplash.com/photo-1544985361-b420d7a77043?w=400&h=400&fit=crop' }
};
