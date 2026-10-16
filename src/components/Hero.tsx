import React from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, CheckCircle2, Layers, Palette, Eye } from 'lucide-react';
import { ProfileSettings, Project } from '../types';

interface HeroProps {
  profile: ProfileSettings;
  featuredProjects: Project[];
  onExploreWork: () => void;
  onHireMe: () => void;
  onSelectProject: (project: Project) => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  featuredProjects,
  onExploreWork,
  onHireMe,
  onSelectProject,
}) => {
  const heroShowcaseProject = featuredProjects[0] || null;
  const secondaryShowcase = featuredProjects.slice(1, 3);

  const softwareHighlights = [
    { name: 'Adobe Photoshop', icon: 'Ps', color: 'from-blue-600 to-sky-400', role: 'Compositing & Retouching' },
    { name: 'Adobe Illustrator', icon: 'Ai', color: 'from-amber-600 to-orange-400', role: 'Vector & Brand Marks' },
    { name: 'Canva', icon: 'Cv', color: 'from-cyan-500 to-blue-500', role: 'Rapid Social Collateral' },
  ];

  const primaryDisciplines = [
    'Social Media Post Design',
    'Advertising Poster Design',
    'Logo Design',
    'Branding & Marketing Graphics',
    'Real Estate & Product Advertisements',
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
      {/* Subtle Ambient Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-violet-600/15 via-indigo-600/10 to-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 -left-20 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle, Actions, Software badges */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Status kicker - Clean unboxed text with dot */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-violet-950/40 border border-violet-500/30 text-xs font-medium text-violet-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{profile.availabilityStatus}</span>
              <span className="text-zinc-600" aria-hidden="true">·</span>
              <span className="text-zinc-400">Q2 2026 Bookings</span>
            </div>

            {/* Main Heading & Subtitle */}
            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                Creative Designs.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400">
                  Powerful Visuals.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-300 font-normal leading-relaxed max-w-2xl">
                {profile.heroSubtitle}
              </p>
            </div>

            {/* Key Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreWork}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-base shadow-xl shadow-violet-600/30 hover:shadow-violet-600/45 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 text-cyan-300 group-hover:translate-y-1 transition-transform" />
              </button>

              <button
                onClick={onHireMe}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-violet-500/50 text-zinc-200 hover:text-white font-semibold text-base transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Hire Me</span>
                <ArrowUpRight className="w-4 h-4 text-violet-400" />
              </button>
            </div>

            {/* Micro Stats Row - Unboxed typography */}
            <div className="pt-4 grid grid-cols-3 gap-6 border-t border-zinc-800/80 max-w-lg">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  {profile.aboutExperienceYears}+
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">Years Experience</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  {profile.aboutProjectsCompleted}+
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">Design Projects</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  {profile.aboutHappyClients}+
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">Happy Clients</p>
              </div>
            </div>

            {/* Core Software Tools - Clean Badges with Icons */}
            <div className="pt-2 space-y-3">
              <p className="text-xs font-semibold tracking-wider uppercase text-zinc-400">
                Core Design Software
              </p>
              <div className="flex flex-wrap gap-3">
                {softwareHighlights.map((software) => (
                  <div
                    key={software.name}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition-colors"
                  >
                    <div
                      className={`w-7 h-7 rounded-lg bg-gradient-to-br ${software.color} flex items-center justify-center text-[11px] font-bold text-white shadow-sm`}
                    >
                      {software.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-200">{software.name}</p>
                      <p className="text-[10px] text-zinc-500">{software.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Visual Preview of Best Design Projects */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Featured Showcase Card */}
              {heroShowcaseProject && (
                <div
                  onClick={() => onSelectProject(heroShowcaseProject)}
                  className="group relative cursor-pointer rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/90 hover:border-violet-500/60 shadow-2xl shadow-black/80 hover:shadow-violet-600/20 transition-all duration-500"
                >
                  {/* Image container with aspect ratio */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={heroShowcaseProject.coverImage}
                      alt={heroShowcaseProject.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-zinc-950/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
                    
                    {/* Floating pill-less kicker */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-medium text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Featured Work</span>
                    </div>

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg bg-violet-600 text-white">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span className="text-violet-400 font-semibold">{heroShowcaseProject.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{heroShowcaseProject.year || '2026'}</span>
                      <span aria-hidden="true">·</span>
                      <span>{heroShowcaseProject.softwareUsed.join(', ')}</span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-white group-hover:text-violet-300 transition-colors leading-snug">
                      {heroShowcaseProject.title}
                    </h3>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {heroShowcaseProject.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Secondary Overlapping Cards */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                {secondaryShowcase.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectProject(item)}
                    className="group cursor-pointer rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/80 hover:border-violet-500/50 p-3 flex items-center gap-3 transition-all duration-300 hover:bg-zinc-850"
                  >
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-semibold text-violet-400 truncate">
                        {item.category}
                      </p>
                      <h4 className="text-xs font-bold text-white truncate group-hover:text-violet-300">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Click to view details</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* Specialized Disciplines Banner */}
        <div className="mt-20 pt-8 border-t border-zinc-800/80">
          <p className="text-xs font-semibold tracking-wider uppercase text-zinc-400 mb-4">
            Specialized Graphic Design Disciplines
          </p>
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {primaryDisciplines.map((discipline) => (
              <div
                key={discipline}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>{discipline}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
