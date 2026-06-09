'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const slides = [
  {
    title: 'Kultuuriranits',
    description: 'Eesti suurim kultuurihariduse platvorm. Too kultuur oma õpilasteni mugavalt ja kiirelt.',
    buttonText: 'Vaata programme',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop',
    color: 'from-blue-600 to-blue-800'
  },
  {
    title: 'Broneeri lihtsalt',
    description: 'Kõik ühes kohas: vali programm, vali aeg ja kinnita. Arveldus toimub automaatselt.',
    buttonText: 'Vaata programme',
    image: 'https://www.kul.ee/sites/default/files/styles/hero_image/public/2022-01/pexels-anastasia-shuraeva-8467296.jpg?itok=lbK-of0u',
    color: 'from-green-600 to-green-800'
  },
  {
    title: 'Õpetajatele ja muuseumidele',
    description: 'Loodud koostöös haridus- ja kultuuriasutustega, et muuta õppekäigud kättesaadavamaks.',
    buttonText: 'Vaata programme',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop',
    color: 'from-purple-600 to-purple-800'
  }
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative h-[600px] w-full overflow-hidden group">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'
            }`}
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-70`}></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
                  {slide.description}
                </p>
                <div>
                  <Link
                    href="/otsi"
                    className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl transform hover:scale-105"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === current ? 'bg-white w-8' : 'bg-white/50'
              }`}
          />
        ))}
      </div>
    </div>
  );
}