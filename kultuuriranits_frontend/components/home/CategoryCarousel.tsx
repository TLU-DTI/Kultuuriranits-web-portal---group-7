'use client';

import { useRef } from 'react';
import { 
  Landmark, 
  Palette, 
  Theater, 
  Clapperboard, 
  Music, 
  Library, 
  History, 
  Atom, 
  Leaf, 
  Wrench,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

const categories = [
  { name: 'Muuseumid', icon: Landmark, color: 'bg-orange-100 text-orange-600', query: 'muuseumid' },
  { name: 'Galeriid', icon: Palette, color: 'bg-pink-100 text-pink-600', query: 'galeriid' },
  { name: 'Teatrid', icon: Theater, color: 'bg-purple-100 text-purple-600', query: 'teatrid' },
  { name: 'Kino', icon: Clapperboard, color: 'bg-blue-100 text-blue-600', query: 'kino' },
  { name: 'Kontserdid', icon: Music, color: 'bg-indigo-100 text-indigo-600', query: 'kontserdid' },
  { name: 'Raamatukogud', icon: Library, color: 'bg-green-100 text-green-600', query: 'raamatukogud' },
  { name: 'Ajalugu', icon: History, color: 'bg-amber-100 text-amber-600', query: 'ajalugu' },
  { name: 'Teaduskeskused', icon: Atom, color: 'bg-cyan-100 text-cyan-600', query: 'teaduskeskused' },
  { name: 'Loodus', icon: Leaf, color: 'bg-emerald-100 text-emerald-600', query: 'loodus' },
  { name: 'Töötoad', icon: Wrench, color: 'bg-slate-100 text-slate-600', query: 'tootoad' },
];

export function CategoryCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative mb-16 group/carousel">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Avasta kategooriaid</h2>
      </div>

      <div className="relative">
        {/* Navigation Buttons - Overlay */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-3 rounded-full bg-white shadow-xl border border-gray-100 text-gray-600 hover:text-blue-600 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-3 rounded-full bg-white shadow-xl border border-gray-100 text-gray-600 hover:text-blue-600 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-1 px-1 scroll-smooth"
        >
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/otsi?category=${category.query}`}
              className="flex-shrink-0 group"
            >
              <div className="flex flex-col items-center gap-3 w-32 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all transform hover:-translate-y-1">
                <div className={`p-4 rounded-xl ${category.color} group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-8 h-8" />
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}