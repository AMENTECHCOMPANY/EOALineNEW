import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Star, Heart, Shield, Truck } from 'lucide-react';
import LaunchNavbar from './LaunchNavbar';
import LaunchFooter from './LaunchFooter';

const LearnMorePage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown timer - set launch date to 30 days from now
  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30); // 30 days from now

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "Premium Materials",
      description: "Crafted from the finest fabrics with attention to every detail"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Faith-Inspired Design",
      description: "Each piece carries spiritual meaning and biblical inspiration"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Quality Guarantee",
      description: "Lifetime warranty on craftsmanship and materials"
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Worldwide Shipping",
      description: "Complimentary express delivery to your doorstep"
    }
  ];

  const teaserImages = [
    {
      src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/TM%20Edited%20BG/TM-Hoodie-male-black4-Photoroom.png",
      title: "TUMI Hoodie",
      description: "Premium comfort meets spiritual elegance"
    },
    {
      src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/TM%20Edited%20BG/DSC06108-Photoroom.png",
      title: "Complete Set",
      description: "The ultimate three-piece collection"
    },
    {
      src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/TM%20Edited%20BG/DSC06064-Photoroom.png",
      title: "TUMI Sweat Pants",
      description: "Luxury comfort for everyday wear"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <LaunchNavbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Launch Page
          </button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                <span className="text-amber-400 font-medium text-sm">COMING SOON</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-serif font-light mb-6 leading-tight">
                TUMI Complete Set
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Experience the pinnacle of luxury Christian fashion with our most anticipated collection. 
                Three carefully crafted pieces that embody faith, comfort, and uncompromising style.
              </p>
              
              <div className="flex items-center gap-6 text-white/70">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-current" />
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-400 fill-current" />
                  <span>Faith-Inspired</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/TM%20Edited%20BG/DSC06355-Photoroom.png"
                alt="TUMI Complete Set"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 mb-4">
            Launch Countdown
          </h2>
          <p className="text-gray-600 mb-12">
            The wait is almost over. Mark your calendar for the most anticipated fashion launch of the year.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-amber-200">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Teaser Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 mb-4">
              Exclusive Preview
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get a glimpse of what's coming. Each piece in the TUMI Complete Set has been meticulously 
              designed to represent the perfect fusion of luxury and faith.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teaserImages.map((image, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square mb-4">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>
                <h3 className="text-xl font-serif font-medium text-gray-900 mb-2">
                  {image.title}
                </h3>
                <p className="text-gray-600">
                  {image.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 mb-4">
              Why TUMI Complete Set?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              More than just clothing, it's a statement of faith, quality, and timeless style.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
            Don't Miss the Launch
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Join thousands of others who are waiting for this exclusive release. 
            Be among the first to experience luxury Christian fashion redefined.
          </p>
          
          <button
            onClick={() => window.history.back()}
            className="bg-amber-400 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-500 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            Get Notified When Available
          </button>
        </div>
      </section>

      <LaunchFooter />
    </div>
  );
};

export default LearnMorePage;