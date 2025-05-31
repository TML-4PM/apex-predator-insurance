
interface SocialPlatform {
  name: string;
  generateCaption: (content: any) => string;
  generateHashtags: (category: string) => string[];
  shareUrl: (content: any) => string;
}

export const generateSmartHashtags = (category: string): string[] => {
  const baseHashtags = ['#ApexPredatorInsurance', '#WildlifeShield', '#AdventureGoneWrong'];
  
  const categoryHashtags: Record<string, string[]> = {
    'ai_fail': ['#AIFail', '#TechOopsie', '#MachineLearningFail', '#AIGoneWrong'],
    'adventure_gone_wrong': ['#AdventureFail', '#OutdoorOopsie', '#WildernessGoneWrong'],
    'insurance_claim': ['#InsuranceFail', '#ClaimStory', '#RealClaims'],
    'wildlife_encounter': ['#WildlifeEncounter', '#AnimalEncounter', '#NatureOopsie'],
    'equipment_failure': ['#GearFail', '#EquipmentFail', '#OutdoorGearOopsie'],
    'other': ['#Oopsie', '#Fail', '#Mistake']
  };

  return [...baseHashtags, ...(categoryHashtags[category] || categoryHashtags.other)];
};

export const generatePlatformCaption = (
  platform: string, 
  title: string, 
  description: string, 
  category: string
): string => {
  const hashtags = generateSmartHashtags(category);
  
  switch (platform) {
    case 'instagram':
      return `${title}\n\n${description}\n\n${hashtags.join(' ')}\n\n#StoryTime #ViralContent`;
    
    case 'tiktok':
      return `${title} 😱\n\n${description}\n\n${hashtags.slice(0, 5).join(' ')} #FYP #Viral`;
    
    case 'twitter':
      const shortDescription = description.length > 100 ? 
        description.substring(0, 97) + '...' : description;
      return `${title}\n\n${shortDescription}\n\n${hashtags.slice(0, 3).join(' ')}`;
    
    case 'youtube':
      return `${title}\n\n${description}\n\nWatch more epic fails on our channel! Don't forget to subscribe for weekly content.\n\n${hashtags.join(' ')}`;
    
    case 'facebook':
      return `${title}\n\n${description}\n\nShare your own adventure stories in the comments!\n\n${hashtags.join(' ')}`;
    
    default:
      return `${title}\n\n${description}\n\n${hashtags.join(' ')}`;
  }
};

export const shareToYoutube = async (oopsieData: any) => {
  // This would integrate with YouTube API for direct uploads
  console.log('Sharing to YouTube:', oopsieData);
  return true;
};

export const useWebShareAPI = () => {
  const canShare = 'share' in navigator;
  
  const share = async (data: {
    title: string;
    text: string;
    url: string;
  }) => {
    if (canShare) {
      try {
        await navigator.share(data);
        return true;
      } catch (error) {
        console.error('Error sharing:', error);
        return false;
      }
    }
    return false;
  };

  return { canShare, share };
};
