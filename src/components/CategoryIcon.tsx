import React from 'react';
import {
  IdCard,
  ShieldAlert,
  Zap,
  Train,
  Landmark,
  Banknote,
  GraduationCap,
  HeartHandshake,
  Briefcase,
  HelpCircle,
  Building2,
  Scale,
  Car,
  Plane,
  Heart,
  Stethoscope,
  ShoppingBag,
  LucideProps,
} from 'lucide-react';

interface CategoryIconProps extends LucideProps {
  name?: string;
  slug?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, slug = '', ...props }) => {
  const s = (slug || name || '').toLowerCase();

  if (s.includes('identity') || s.includes('passport') || s.includes('citizen') || s.includes('voter')) {
    return <IdCard {...props} />;
  }
  if (s.includes('emergency') || s.includes('police') || s.includes('fire') || s.includes('safety') || s.includes('disaster')) {
    return <ShieldAlert {...props} />;
  }
  if (s.includes('utility') || s.includes('power') || s.includes('electric') || s.includes('gas') || s.includes('energy')) {
    return <Zap {...props} />;
  }
  if (s.includes('railway') || s.includes('train')) {
    return <Train {...props} />;
  }
  if (s.includes('transport') || s.includes('driving') || s.includes('vehicle') || s.includes('traffic')) {
    return <Car {...props} />;
  }
  if (s.includes('land') || s.includes('property') || s.includes('housing') || s.includes('ministry')) {
    return <Landmark {...props} />;
  }
  if (s.includes('tax') || s.includes('bank') || s.includes('pension') || s.includes('finance') || s.includes('revenue')) {
    return <Banknote {...props} />;
  }
  if (s.includes('education') || s.includes('university') || s.includes('school') || s.includes('college')) {
    return <GraduationCap {...props} />;
  }
  if (s.includes('health') || s.includes('medical') || s.includes('doctor') || s.includes('blood')) {
    return <Stethoscope {...props} />;
  }
  if (s.includes('law') || s.includes('court') || s.includes('justice') || s.includes('legal')) {
    return <Scale {...props} />;
  }
  if (s.includes('business') || s.includes('commerce') || s.includes('expatriate') || s.includes('labour')) {
    return <Briefcase {...props} />;
  }
  if (s.includes('community') || s.includes('ngo') || s.includes('volunteer')) {
    return <HeartHandshake {...props} />;
  }

  return <Building2 {...props} />;
};
