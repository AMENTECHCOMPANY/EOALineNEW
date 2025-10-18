import React, { useState } from 'react';
import { Bell, ArrowRight } from 'lucide-react';
import NotifyModal from './NotifyModal';

const LaunchHero: React.FC = () => {
  const [showNotifyModal, setShowNotifyModal] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/TM%20Edited%20BG/DSC06355-Photoroom.png"
            alt="TUMI Complete Set"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-8">
            <img
              src="https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/e.o.a-logo/E.O.A%20Logo.jpg"
              alt="E.O.A Logo"
              className="w-6 h-6 rounded-full"
            />
            <span className="text-white font-medium text-sm tracking-wide">E.O.A LINE</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white mb-6 leading-tight">
            COMING SOON
          </h1>
          
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6"></div>
          
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-medium text-white mb-8 leading-tight">
            TUMI COMPLETE SET
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 mb-4 max-w-2xl mx-auto leading-relaxed">
            The Ultimate Three-Piece Collection
          </p>
          <p className="text-base md:text-lg text-white/80 mb-12 max-w-xl mx-auto">
            Luxury comfort meets faith-inspired design in our most anticipated release
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setShowNotifyModal(true)}
              className="group bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center gap-3 min-w-[200px] justify-center cursor-pointer"
            >
              <Bell className="w-5 h-5 group-hover:animate-pulse" />
              NOTIFY ME
            </button>
            
            <button
              onClick={() => window.location.href = '/learn-more'}
              className="group border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-3 min-w-[200px] justify-center cursor-pointer"
            >
              LEARN MORE
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Coming Soon Badge */}
          <div className="mt-16">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-6 py-3">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="text-amber-400 font-medium text-sm tracking-wide">
                BE THE FIRST TO EXPERIENCE LUXURY
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Notify Modal */}
      <NotifyModal 
        isOpen={showNotifyModal} 
        onClose={() => setShowNotifyModal(false)} 
      />
    </>
  );
};

export default LaunchHero;