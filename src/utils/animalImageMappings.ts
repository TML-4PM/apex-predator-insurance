// Complete image mapping using Wikipedia/Wikimedia Commons — every image is species-verified
export const COMPLETE_IMAGE_MAPPING: Record<string, { url: string }> = {
  // Big Cats
  'african-lion': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg/400px-020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg' },
  'siberian-tiger': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/P.t.altaica_Tomak_Male.jpg/400px-P.t.altaica_Tomak_Male.jpg' },
  'bengal-tiger': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Bengal_tiger_in_Sanjay_Dubri_Tiger_Reserve_December_2024_by_Tisha_Mukherjee_11.jpg/400px-Bengal_tiger_in_Sanjay_Dubri_Tiger_Reserve_December_2024_by_Tisha_Mukherjee_11.jpg' },
  'leopard': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/African_leopard_male_%28cropped%29.jpg/400px-African_leopard_male_%28cropped%29.jpg' },
  'jaguar': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Standing_jaguar.jpg/400px-Standing_jaguar.jpg' },
  'mountain-lion': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Mountain_Lion_in_Glacier_National_Park.jpg/400px-Mountain_Lion_in_Glacier_National_Park.jpg' },
  'cheetah': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Male_cheetah_facing_left_in_South_Africa.jpg/400px-Male_cheetah_facing_left_in_South_Africa.jpg' },
  'snow-leopard': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Irbis4.JPG/400px-Irbis4.JPG' },

  // Bears
  'grizzly-bear': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/GrizzlyBearJeanBeaufort.jpg/400px-GrizzlyBearJeanBeaufort.jpg' },
  'polar-bear': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Polar_Bear_-_Alaska_%28cropped%29.jpg/400px-Polar_Bear_-_Alaska_%28cropped%29.jpg' },
  'kodiak-bear': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2010-kodiak-bear-1.jpg/400px-2010-kodiak-bear-1.jpg' },
  'black-bear': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/01_Schwarzb%C3%A4r.jpg/400px-01_Schwarzb%C3%A4r.jpg' },
  'sloth-bear': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Sloth_bear_stand.jpg/400px-Sloth_bear_stand.jpg' },
  'sun-bear': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Sun-bear.jpg/400px-Sun-bear.jpg' },

  // Large Mammals
  'hippopotamus': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Portrait_Hippopotamus_in_the_water.jpg/400px-Portrait_Hippopotamus_in_the_water.jpg' },
  'african-elephant': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/African_Elephant_%28Loxodonta_africana%29_male_%2817289351322%29.jpg/400px-African_Elephant_%28Loxodonta_africana%29_male_%2817289351322%29.jpg' },
  'asian-elephant': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Elephas_maximus_%28Bandipur%29.jpg/400px-Elephas_maximus_%28Bandipur%29.jpg' },
  'cape-buffalo': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/African_buffalo_%28Syncerus_caffer_caffer%29_male_with_cattle_egret.jpg/400px-African_buffalo_%28Syncerus_caffer_caffer%29_male_with_cattle_egret.jpg' },

  // Sharks
  'great-white-shark': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/White_shark.jpg/400px-White_shark.jpg' },
  'bull-shark': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Bullshark_Beqa_Fiji_2007.jpg/400px-Bullshark_Beqa_Fiji_2007.jpg' },
  'tiger-shark': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Tiger_shark.jpg/400px-Tiger_shark.jpg' },
  'hammerhead-shark': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Scalloped_Hammerhead_Shark_Sphyrna_Lewini_%28226845659%29.jpeg/400px-Scalloped_Hammerhead_Shark_Sphyrna_Lewini_%28226845659%29.jpeg' },
  'blue-shark': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Tibur%C3%B3n_azul_%28Prionace_glauca%29%2C_canal_Fayal-Pico%2C_islas_Azores%2C_Portugal%2C_2020-07-27%2C_DD_31.jpg/400px-Tibur%C3%B3n_azul_%28Prionace_glauca%29%2C_canal_Fayal-Pico%2C_islas_Azores%2C_Portugal%2C_2020-07-27%2C_DD_31.jpg' },

  // Marine — Jellyfish
  'box-jellyfish': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Avispa_marina_cropped.png/400px-Avispa_marina_cropped.png' },
  'portuguese-man-o-war': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Portuguese_Man-O-War_%28Physalia_physalis%29.jpg/400px-Portuguese_Man-O-War_%28Physalia_physalis%29.jpg' },

  // Marine — Cephalopods
  'blue-ringed-octopus': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Hapalochlaena_lunulata2.JPG/400px-Hapalochlaena_lunulata2.JPG' },

  // Marine — Whales
  'orca': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Killerwhales_jumping.jpg/400px-Killerwhales_jumping.jpg' },
  'sperm-whale': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Mother_and_baby_sperm_whale.jpg/400px-Mother_and_baby_sperm_whale.jpg' },

  // Marine — Fish
  'stonefish': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Synanceia_verrucosa_Prague_2011_2.jpg/400px-Synanceia_verrucosa_Prague_2011_2.jpg' },
  'cone-snail': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Textile_cone.JPG/400px-Textile_cone.JPG' },
  'barracuda': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Barracuda_laban.jpg/400px-Barracuda_laban.jpg' },

  // Marine — Eels
  'moray-eel': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Moray_eel.jpg/400px-Moray_eel.jpg' },
  'electric-eel': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Electric-eel.jpg/400px-Electric-eel.jpg' },

  // Marine — Rays
  'stingray': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/SStringray.jpg/400px-SStringray.jpg' },
  'manta-ray': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Dharavandhoo_Thila_-_Manata_Black_Pearl.JPG/400px-Dharavandhoo_Thila_-_Manata_Black_Pearl.JPG' },
  'electric-ray': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Torpedo_marmorata2.jpg/400px-Torpedo_marmorata2.jpg' },

  // Reptiles — Crocodilians
  'saltwater-crocodile': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/SaltwaterCrocodile%28%27Maximo%27%29.jpg/400px-SaltwaterCrocodile%28%27Maximo%27%29.jpg' },
  'nile-crocodile': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/NileCrocodile.jpg/400px-NileCrocodile.jpg' },
  'caiman': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Caiman_yacare.jpg/400px-Caiman_yacare.jpg' },

  // Reptiles — Venomous Snakes
  'inland-taipan': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Fierce_Snake-Oxyuranus_microlepidotus.jpg/400px-Fierce_Snake-Oxyuranus_microlepidotus.jpg' },
  'black-mamba': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Dendroaspis_polylepis_%2814%29.jpg/400px-Dendroaspis_polylepis_%2814%29.jpg' },
  'king-cobra': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/12_-_The_Mystical_King_Cobra_and_Coffee_Forests.jpg/400px-12_-_The_Mystical_King_Cobra_and_Coffee_Forests.jpg' },
  'eastern-diamondback': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Adult_Crotalus_adamanteus.jpg/400px-Adult_Crotalus_adamanteus.jpg' },
  'gaboon-viper': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Bitis_gabonica.jpg/400px-Bitis_gabonica.jpg' },
  'fer-de-lance': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Bothrops_asper_170971120.jpg/400px-Bothrops_asper_170971120.jpg' },
  'coral-snake': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Micrurus_fulvius%2C_Polk_County%2C_FL%2C_USA_imported_from_iNaturalist_photo_286627672.jpg/400px-Micrurus_fulvius%2C_Polk_County%2C_FL%2C_USA_imported_from_iNaturalist_photo_286627672.jpg' },
  'russells-viper': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Daboia_russelii_A_Chawla01.jpg/400px-Daboia_russelii_A_Chawla01.jpg' },

  // Reptiles — Large Snakes
  'anaconda': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Sucuri_verde.jpg/400px-Sucuri_verde.jpg' },
  'reticulated-python': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Python_reticulatus_%D1%81%D0%B5%D1%82%D1%87%D0%B0%D1%82%D1%8B%D0%B9_%D0%BF%D0%B8%D1%82%D0%BE%D0%BD-2.jpg/400px-Python_reticulatus_%D1%81%D0%B5%D1%82%D1%87%D0%B0%D1%82%D1%8B%D0%B9_%D0%BF%D0%B8%D1%82%D0%BE%D0%BD-2.jpg' },

  // Reptiles — Lizards
  'komodo-dragon': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/202306_Varanus_komodoensis.jpg/400px-202306_Varanus_komodoensis.jpg' },
  'monitor-lizard': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Varanus_salvator_-_01.jpg/400px-Varanus_salvator_-_01.jpg' },

  // Aerial — Eagles & Raptors
  'golden-eagle': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/015_Wild_Golden_Eagle_in_flight_at_Pfyn-Finges_%28Switzerland%29_Photo_by_Giles_Laurent.jpg/400px-015_Wild_Golden_Eagle_in_flight_at_Pfyn-Finges_%28Switzerland%29_Photo_by_Giles_Laurent.jpg' },
  'harpy-eagle': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Harpia_harpyja_001_800.jpg/400px-Harpia_harpyja_001_800.jpg' },
  'great-horned-owl': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Bubo_virginianus_06.jpg/400px-Bubo_virginianus_06.jpg' },
  'secretary-bird': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Secretary_bird_Mara_for_WC.jpg/400px-Secretary_bird_Mara_for_WC.jpg' },
  'bald-eagle': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Bald_eagle_about_to_fly_in_Alaska_%282016%29.jpg/400px-Bald_eagle_about_to_fly_in_Alaska_%282016%29.jpg' },
  'stellers-sea-eagle': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Haliaeetus_pelagicus_%28Rausu%2C_Japan%29.jpg/400px-Haliaeetus_pelagicus_%28Rausu%2C_Japan%29.jpg' },
  'peregrine-falcon': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Falco_peregrinus_m_Humber_Bay_Park_Toronto.jpg/400px-Falco_peregrinus_m_Humber_Bay_Park_Toronto.jpg' },
  'goshawk': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Northern_Goshawk_ad_M2.jpg/400px-Northern_Goshawk_ad_M2.jpg' },

  // Insects & Arachnids
  'deathstalker-scorpion': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Deathstalker_ST_07.JPG/400px-Deathstalker_ST_07.JPG' },
  'brazilian-wandering-spider': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Esta%C3%A7%C3%A3o_Ecol%C3%B3gica_de_Santa_B%C3%A1rbara_Giordano_Rossi_%2812%29.jpg/400px-Esta%C3%A7%C3%A3o_Ecol%C3%B3gica_de_Santa_B%C3%A1rbara_Giordano_Rossi_%2812%29.jpg' },
  'sydney-funnel-web': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Atrax_Robustus.jpg/400px-Atrax_Robustus.jpg' },
  'black-widow': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Latrodectus_hesperus_Berkeley%2C_California.jpg/400px-Latrodectus_hesperus_Berkeley%2C_California.jpg' },
  'bullet-ant': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Paraponera_clavata.jpg/400px-Paraponera_clavata.jpg' },
  'tsetse-fly': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Glossina-morsitans.jpg/400px-Glossina-morsitans.jpg' },
  'kissing-bug': { url: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Pgeniculatus2.jpg' },
  'giant-asian-hornet': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/20200512-P1100071_Vespa_mandarinia_japonica.jpg/400px-20200512-P1100071_Vespa_mandarinia_japonica.jpg' },
  'army-ant': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Safari_ants_tunnel.jpg/400px-Safari_ants_tunnel.jpg' },
  'africanized-bee': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Apis_mellifera_scutellata.jpg/400px-Apis_mellifera_scutellata.jpg' },
  'fire-ant': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Fire_ants_01.jpg/400px-Fire_ants_01.jpg' },
  'driver-ant': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Dorylus_gribodoi_casent0172627_dorsal_1.jpg/400px-Dorylus_gribodoi_casent0172627_dorsal_1.jpg' },
  'bot-fly': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Cephenemya_stimulator.jpg/400px-Cephenemya_stimulator.jpg' },

  // Canines
  'gray-wolf': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Eurasian_wolf_2.jpg/400px-Eurasian_wolf_2.jpg' },
  'african-wild-dog': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/African_Wild_Dog_at_Working_with_Wildlife.jpg/400px-African_Wild_Dog_at_Working_with_Wildlife.jpg' },
  'dingo': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Dingo_%28Canis_lupus_dingo%29_Kakadu_2.jpg/400px-Dingo_%28Canis_lupus_dingo%29_Kakadu_2.jpg' },
  'coyote': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/2009-Coyote-Yosemite.jpg/400px-2009-Coyote-Yosemite.jpg' },

  // Other Carnivores
  'spotted-hyena': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Spotted_hyena_%28Crocuta_crocuta%29.jpg/400px-Spotted_hyena_%28Crocuta_crocuta%29.jpg' },
  'wolverine': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gulo_gulo_2.jpg/400px-Gulo_gulo_2.jpg' },
  'tasmanian-devil': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Sarcophilus_harrisii_taranna.jpg/400px-Sarcophilus_harrisii_taranna.jpg' },
  'bobcat': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Bobcat_at_Columbus_Zoo_Boo.jpg/400px-Bobcat_at_Columbus_Zoo_Boo.jpg' },

  // Primates
  'chimpanzee': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/015_Chimpanzee_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg/400px-015_Chimpanzee_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg' },
  'baboon': { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Olive_baboon_Ngorongoro.jpg/400px-Olive_baboon_Ngorongoro.jpg' }
};
