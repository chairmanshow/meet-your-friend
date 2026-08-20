import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '../common/Avatar';
import toast from 'react-hot-toast';

interface CallScreenProps {
  onEndCall: () => void;
}

const CallScreen: React.FC<CallScreenProps> = ({ onEndCall }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [isRinging, setIsRinging] = useState(true);

  useEffect(() => {
    // Simulate call connecting
    const ringTimer = setTimeout(() => {
      setIsRinging(false);
      toast.success('🎵 Call connected!', {
        icon: '🎵',
        duration: 2000,
      });
    }, 2000);

    return () => clearTimeout(ringTimer);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isRinging) {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRinging]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    toast('Call ended', {
      icon: '📞',
      duration: 2000,
    });
    onEndCall();
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center p-6 max-w-md w-full"
      >
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mx-auto">
            <Avatar name="Sapna" size="large" />
          </div>
          {isRinging ? (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 px-4 py-1 rounded-full text-sm text-white animate-pulse">
              Ringing...
            </div>
          ) : (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-green-500 px-4 py-1 rounded-full text-sm text-white">
              <div className="w-2 h-2 bg-white rounded-full animate-ping" />
              Active
            </div>
          )}
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">Sapna</h2>
        <p className="text-gray-300 mb-6">
          {isRinging ? 'Calling...' : formatDuration(callDuration)}
        </p>

        {!isRinging && (
          <div className="flex justify-center gap-8 mb-8">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors touch-manipulation"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={() => setIsSpeakerOn(!isSpeakerOn)}
              className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors touch-manipulation"
              aria-label={isSpeakerOn ? 'Speaker on' : 'Speaker off'}
            >
              {isSpeakerOn ? (
                <Volume2 className="w-6 h-6 text-white" />
              ) : (
                <VolumeX className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        )}

        {!isRinging && (
          <div className="mb-8">
            <div className="flex items-center justify-center gap-1 h-8">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key
