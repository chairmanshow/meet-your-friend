import React from 'react';
import { getInitials } from '../../utils/helpers';

interface AvatarProps {
  name: string;
  size?: 'small' | 'medium' | 'large';
  imageUrl?: string;
}

const Avatar: React.FC<AvatarProps> = ({ name, size = 'medium', imageUrl }) => {
  const sizeClasses = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-12 h-12 text-sm',
    large: 'w-24 h-24 text-2xl',
  };

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`rounded-full object-cover ${sizeClasses[size]}`}
      />
    );
  }

  const colors = [
    'bg-gradient-to-br from-purple-400 to-pink-400',
    'bg-gradient-to-br from-blue-400 to-purple-400',
    'bg-gradient-to-br from-pink-400 to-red-400',
    'bg-gradient-to-br from-green-400 to-blue-400',
  ];

  const colorIndex = name.length % colors.length;

  return (
    <div
      className={`${sizeClasses[size]} ${colors[colorIndex]} rounded-full flex items-center justify-center text-white font-semibold`}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
