
import React from 'react';
import { Card } from '@/components/ui/card';
import { Award, MessageCircle, Gift, Heart } from 'lucide-react';

const ProductFeatures = () => {
  const features = [
    {
      icon: <Award className="h-8 w-8 text-apex-red" />,
      title: "Celebrate your inner adventurer",
      description: "You're not just buying art—you're staking your claim as an apex explorer ready for any wild encounter."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
      title: "Ultimate conversation starter",
      description: "Hang it on your wall, pop it on your desk, or share a snap on socials—watch jaws drop and questions fly."
    },
    {
      icon: <Gift className="h-8 w-8 text-green-600" />,
      title: "Perfect gift for nature-lovers",
      description: "Birthdays, graduations, Father's Day, mates' get-togethers—you're giving something unique, not another gift card."
    },
    {
      icon: <Heart className="h-8 w-8 text-pink-600" />,
      title: "Supports wildlife awareness",
      description: "A portion of every sale funds a different predator-protection charity each quarter. Adventure with purpose."
    }
  ];

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-apex-black mb-8 text-center">
        Why It's Fun (and Surprisingly Meaningful)
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold text-apex-black mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProductFeatures;
