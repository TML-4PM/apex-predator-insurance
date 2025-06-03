
import { getSupabaseImageUrl } from '@/utils/completeImageMapping';

export interface BucketVerificationResult {
  url: string;
  filename: string;
  exists: boolean;
  loadTime: number;
  error?: string;
}

export const verifyImageExists = async (filename: string, bucket: string = 'deadly60'): Promise<BucketVerificationResult> => {
  const url = getSupabaseImageUrl(bucket, filename);
  const startTime = performance.now();
  
  return new Promise((resolve) => {
    const img = new Image();
    const timeout = setTimeout(() => {
      const endTime = performance.now();
      resolve({
        url,
        filename,
        exists: false,
        loadTime: Math.round(endTime - startTime),
        error: 'Timeout (3s)'
      });
    }, 3000);
    
    img.onload = () => {
      clearTimeout(timeout);
      const endTime = performance.now();
      resolve({
        url,
        filename,
        exists: true,
        loadTime: Math.round(endTime - startTime)
      });
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      const endTime = performance.now();
      resolve({
        url,
        filename,
        exists: false,
        loadTime: Math.round(endTime - startTime),
        error: 'Failed to load'
      });
    };
    
    img.src = url;
  });
};

export const verifyAllMappings = async (): Promise<BucketVerificationResult[]> => {
  // Updated with complete, correct filenames from deadly60 bucket
  const verifiedFilenames = [
    '250px-African_Lion_Panthera_leo_Male_Kruger_2019.jpg',
    '330px-Walking_tiger_female.jpg',
    '250px-Adult_male_Royal_Bengal_tiger_at_Ranthambhore_Tiger_Reserve.jpg',
    '250px-Indian_leopard_face.jpg',
    '330px-Standing_jaguar.jpg',
    '250px-Mountain_Lion_in_Glacier_National_Park.jpg',
    '250px-Male_cheetah_face_left_in_South_Africa.jpg',
    '250px-Snow_leopard_portrait-2010.jpg',
    '250px-Grizzly_Bear_Yellowstone_2.jpg',
    '250px-Polar_Bear_-_Alaska_%28cropped%29.jpg',
    '250px-Kodiak_Brown_Bear.jpg',
    '250px-Ursus_americanus_PO_02.jpg',
    '250px-Sloth_bear_with_young.jpg',
    '250px-Sitting_sun_bear.jpg',
    '250px-Portrait_Hippopotamus_in_the_water.jpg',
    '250px-An_elephant_in_Kruger_National_Park.jpg',
    '250px-African_buffalo_male_with_cattle_egret.jpg',
    '250px-Elephas_maximus_%28Bandipur%29.jpg',
    '330px-White_shark.jpg',
    '250px-Tiger_shark.jpg',
    '250px-Carcharhinus_leucas_TPWD.jpg',
    '250px-Avispa_marina_cropped.jpg',
    '250px-Hapalochlaena_maculosa_side.jpg',
    '250px-Stonefish_at_AQWA_SMC2006.jpg',
    '250px-Conus_textile_2.jpg',
    '250px-Killerwhales_jumping.jpg',
    '250px-SaltwaterCrocodile_%27Maximo%27_at_Australia_Zoo.jpg',
    '250px-Inland_Taipan.jpg',
    '250px-Dendroaspis_polylepis_by_Bill_Love_Bluechameleon_Ventures.jpg',
    '250px-Indian_Cobra%2C_crop.jpg',
    '250px-Golden_Eagle_in_flight_-_5.jpg',
    '250px-Centruroides_sculpturatus_191624836.jpg'
  ];

  const results: BucketVerificationResult[] = [];
  
  for (const filename of verifiedFilenames) {
    const result = await verifyImageExists(filename);
    results.push(result);
  }
  
  return results;
};
