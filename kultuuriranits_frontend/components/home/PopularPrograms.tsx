'use client';

import { useState, useEffect, useRef } from 'react';
// import { programs as staticPrograms } from '@/lib/mockData';
import { Users, GraduationCap, Banknote, MapPin, ChevronLeft, ChevronRight, Star } from 'lucide-react';
// import { Program } from '@/lib/types';
import Link from 'next/link';

export function PopularPrograms() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [popularPrograms, setPopularPrograms] = useState<Program[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = () => {
      const role = localStorage.getItem('userRole');
      setUserRole(role);
    };

    checkAuth();
    window.addEventListener('kr-auth-change', checkAuth);

    // Load from localStorage for live dynamic synchronization
    const savedProgs = localStorage.getItem('kr_programs');
    let loaded: Program[] = [];
    if (savedProgs) {
      try {
        loaded = JSON.parse(savedProgs);
        let updated = false;
        loaded = loaded.map((p: Program) => {
          if (p.id === 'erm-esemet' && p.image !== 'https://www.erm.ee/wp-content/uploads/2016/04/kohtumised1-1280x400.jpg') {
            updated = true;
            return { ...p, image: 'https://www.erm.ee/wp-content/uploads/2016/04/kohtumised1-1280x400.jpg' };
          }
          return p;
        });
        if (updated) {
          localStorage.setItem('kr_programs', JSON.stringify(loaded));
        }
      } catch (e) {
        console.error('Failed to parse kr_programs from localStorage', e);
      }
    }

    // Merge static mock programs to ensure there's always a full list
    if (loaded.length === 0) {
      loaded = staticPrograms;
    } else {
      staticPrograms.forEach(sp => {
        if (!loaded.some(p => p.id === sp.id)) {
          loaded.push(sp);
        }
      });
    }

    setPopularPrograms(loaded);

    return () => window.removeEventListener('kr-auth-change', checkAuth);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 1.5 : scrollLeft + clientWidth / 1.5;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8 mb-16 relative">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Populaarsed programmid</h2>
          <p className="text-gray-500 font-medium">Enim broneeritud ja kõrgelt hinnatud kultuuriprogrammid õpilastele</p>
        </div>
        <Link href="/otsi" className="text-blue-600 font-extrabold hover:text-blue-800 transition-colors flex items-center gap-1">
          Vaata kõiki <span className="text-lg leading-none">&rarr;</span>
        </Link>
      </div>

      <div className="relative group/carousel">
        {/* Navigation Buttons - Overlay */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-20 p-3.5 rounded-full bg-white shadow-lg border border-gray-100 text-gray-600 hover:text-blue-600 hover:border-blue-100 hover:shadow-xl transition-all transform active:scale-90 cursor-pointer"
        >
          <ChevronLeft className="w-5.5 h-5.5" />
        </button>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-20 p-3.5 rounded-full bg-white shadow-lg border border-gray-100 text-gray-600 hover:text-blue-600 hover:border-blue-100 hover:shadow-xl transition-all transform active:scale-90 cursor-pointer"
        >
          <ChevronRight className="w-5.5 h-5.5" />
        </button>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-6 -mx-2 px-2 scroll-smooth"
        >
          {popularPrograms.map((program) => (
            <div key={program.id} className="flex-shrink-0 w-[340px] group/card bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex flex-col h-full">
              <div className="relative h-48 overflow-hidden shrink-0">
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full h-full object-cover group-hover/card:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 flex gap-1.5">
                  <span className="bg-blue-600/90 backdrop-blur-md text-[9px] font-bold text-white uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm border border-blue-500/20 flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-white text-white" />
                    Populaarne
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center text-xs font-bold text-gray-400 gap-1.5 uppercase tracking-wider mb-2.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span className="truncate">{program.organizer}</span>
                  </div>
                  <h3 className="text-lg font-black text-gray-900 group-hover/card:text-blue-600 transition-colors leading-snug mb-4 line-clamp-2">
                    {program.title}
                  </h3>
                </div>

                <div className="mt-auto">
                  <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 border-t border-gray-50 pt-4">
                    <div className="flex items-center gap-2.5 text-xs font-bold text-gray-600">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-blue-600 shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <span className="truncate">{Array.isArray(program.targetGroups) ? program.targetGroups[0] : program.targetGroups}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-bold text-gray-600">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-blue-600 shrink-0">
                        <Users className="w-4 h-4" />
                      </div>
                      <span className="truncate">{program.participantCount}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Hind alates</span>
                      <span className="text-base font-extrabold text-blue-700">{program.price} <span className="text-[10px] text-blue-500 font-semibold">/ õpilane</span></span>
                    </div>

                    <Link 
                      href={`/programm/${program.id}`}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-blue-600 text-white font-extrabold text-xs hover:bg-blue-700 active:scale-95 transition-all shadow-sm cursor-pointer"
                    >
                      {userRole === 'teacher' ? 'Broneeri' : 'Vaata'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}