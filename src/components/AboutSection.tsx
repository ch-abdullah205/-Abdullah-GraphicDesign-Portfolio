import React from 'react';
import { User, Sparkles, CheckCircle2, Award, HeartHandshake, Zap, ArrowUpRight } from 'lucide-react';
import { ProfileSettings } from '../types';

interface AboutSectionProps {
  profile: ProfileSettings;
  onHireClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile, onHireClick }) => {
  const highlights = [
    '5+ Years crafting commercial vector & raster assets',
    'Specialist in high-converting advertising posters & social media decks',
    'Extensive background in real estate marketing brochures & signage',
    'Pixel-perfect print preparation (CMYK, bleed, die-cuts) & web-ready assets',
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Stylized Portrait / Photo Placeholder */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Outer decorative gradient border */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-br from-violet-600 via-indigo-500 to-cyan-400 shadow-2xl shadow-violet-600/20">
                <div className="relative rounded-[22px] overflow-hidden bg-zinc-950 aspect-[4/5]">
                  <img
                    src={profile.avatarUrl}
                    alt={`${profile.name} - Graphic Designer`}
                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Overlay Info Card */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-zinc-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-display text-base font-bold text-white">
                          {profile.name}
                        </h4>
                        <p className="text-xs text-violet-400 font-medium">
                          {profile.title}
                        </p>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-zinc-900 border border-violet-500/40 rounded-2xl p-4 shadow-xl backdrop-blur-md hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-black text-white">
                      {profile.aboutExperienceYears}+ Years
                    </p>
                    <p className="text-[11px] text-zinc-400">Graphic Craft</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Bio Narrative, Pillars, & Stats */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400">
                <User className="w-4 h-4" />
                <span>About the Designer</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Transforming Abstract Ideas Into High-Impact Visuals
              </h2>
            </div>

            {/* Narrative text from profile */}
            <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
              <p>{profile.aboutBio}</p>
              <p className="text-zinc-400 text-xs sm:text-sm">
                I believe that compelling graphic design is far more than aesthetic decoration—it is visual persuasion, brand positioning, and the quickest path to customer trust. Whether designing a viral social carousel in Canva, a vectorized corporate trademark in Illustrator, or a complex composited poster in Photoshop, I aim for immediate emotional connection and lasting brand value.
              </p>
            </div>

            {/* Checklist Highlights */}
            <div className="space-y-3 pt-2">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-zinc-300 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Stat Counters */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="font-display text-2xl font-extrabold text-white">
                  {profile.aboutProjectsCompleted}+
                </span>
                <p className="text-xs text-zinc-400 mt-1">Projects Delivered</p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="font-display text-2xl font-extrabold text-cyan-300">
                  {profile.aboutHappyClients}+
                </span>
                <p className="text-xs text-zinc-400 mt-1">Satisfied Clients</p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="font-display text-2xl font-extrabold text-violet-400">
                  100%
                </span>
                <p className="text-xs text-zinc-400 mt-1">Custom Craft</p>
              </div>
            </div>

            {/* CTA row */}
            <div className="pt-2">
              <button
                onClick={onHireClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-violet-600/30 transition-all"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Work With Abdullah</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
