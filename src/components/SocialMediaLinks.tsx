
import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SocialMediaLinksProps {
  className?: string;
  iconSize?: number;
  color?: string;
  showText?: boolean;
}

const SocialMediaLinks = ({ 
  className = '', 
  iconSize = 20, 
  color = 'text-white', 
  showText = false 
}: SocialMediaLinksProps) => {
  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: <Facebook size={iconSize} />, 
      url: 'https://facebook.com',
      ariaLabel: 'Visit our Facebook page'
    },
    { 
      name: 'Instagram', 
      icon: <Instagram size={iconSize} />, 
      url: 'https://instagram.com',
      ariaLabel: 'Visit our Instagram page'
    },
    { 
      name: 'LinkedIn', 
      icon: <Linkedin size={iconSize} />, 
      url: 'https://linkedin.com',
      ariaLabel: 'Visit our LinkedIn page'
    },
    { 
      name: 'YouTube', 
      icon: <Youtube size={iconSize} />, 
      url: 'https://youtube.com',
      ariaLabel: 'Visit our YouTube channel'
    },
    { 
      name: 'Email', 
      icon: <Mail size={iconSize} />, 
      url: 'mailto:info@apexpredatorinsurance.com',
      ariaLabel: 'Email us'
    }
  ];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socialLinks.map((social) => (
        <a 
          key={social.name}
          href={social.url}
          target={social.name !== 'Email' ? '_blank' : undefined}
          rel="noopener noreferrer"
          aria-label={social.ariaLabel}
          className={`${color} hover:text-apex-red transition-colors duration-300 flex items-center gap-2`}
        >
          {social.icon}
          {showText && <span>{social.name}</span>}
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;
