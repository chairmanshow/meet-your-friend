import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Camera, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/photos', icon: Camera, label: 'Photos' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200/50 px-6 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-0.5 relative py-1 px-4 touch-manipulation"
            >
              <Icon
                className={`w-6 h-6 transition-colors ${
                  isActive ? 'text-purple-600' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-xs transition-colors ${
                  isActive ? 'text-purple-600' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-0.5 w-8 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
