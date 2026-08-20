import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
          Meet Your Friend
        </h1>
        <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          Someone is always here to listen.
          <Sparkles className="w-4 h-4 text-pink-500" />
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/photos')}
          className="glass-morphism p-8 rounded-3xl cursor-pointer group"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center group-hover:shadow-lg transition-all">
              <Camera className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">📸 Photos</h2>
            <p className="text-gray-500 text-center">Capture and share your memories</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/chat')}
          className="glass-morphism p-8 rounded-3xl cursor-pointer group"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center group-hover:shadow-lg transition-all">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">💬 Chat / Call</h2>
            <p className="text-gray-500 text-center">Connect with your friend</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
