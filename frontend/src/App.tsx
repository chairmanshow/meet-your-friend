import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import HomePage from './components/Home/HomePage';
import ChatInterface from './components/Chat/ChatInterface';
import PhotoGallery from './components/Photos/PhotoGallery';
import Navigation from './components/common/Navigation';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const [isCallActive, setIsCallActive] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pb-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/chat" 
              element={
                <ChatInterface 
                  isCallActive={isCallActive}
                  onCallToggle={() => setIsCallActive(!isCallActive)}
                />
              } 
            />
            <Route path="/photos" element={<PhotoGallery />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Navigation />
          <Toaster 
            position="top-center"
            toastOptions={{
              className: 'glass-morphism',
              duration: 3000,
              style: {
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
              },
            }}
          />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
