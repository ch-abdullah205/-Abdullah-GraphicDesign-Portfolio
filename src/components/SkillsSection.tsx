import React from 'react';
import { Layers, Palette, Sparkles, Monitor, Layout, Target, Compass, Award, PenTool, CheckCircle } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const softwareTools = [
    {
      name: 'Adobe Photoshop',
      level: 'Master / 5+ Yrs',
      icon: 'Ps',
      tagline: 'Raster Magic & Photo Manipulation',
      color: 'from-blue-600 to-sky-400',
      borderHover: 'hover:border-sky-500/50',
      description:
        'Complex composite imagery, commercial advertising posters, high-fidelity mockups, digital retouching, luminosity masks, and print prepress color correction.',
      highlights: ['Photo Compositing & Retouching', 'Advertising Poster Layouts', 'Lighting & Chromatic FX', 'CMYK / RGB Prepress'],
    },
    {
      name: 'Adobe Illustrator',
      level: 'Master / 5+ Yrs',
      icon: 'Ai',
      tagline: 'Infinite Vector Precision',
      color: 'from-amber-600 to-orange-400',
      borderHover: 'hover:border-orange-500/50',
      description:
        'Vector logo systems, mathematical geometric marks, packaging die-lines, iconography suites, typography treatments, and scalable brand identity assets.',
      highlights: ['Geometric Logo Design', 'Vector Illustration & Icons', 'Packaging & Die-Cuts', 'Brand Guidelines Creation'],
    },
    {
      name: 'Canva Pro',
      level: 'Expert / 4+ Yrs',
      icon: 'Cv',
      tagline: 'High-Velocity Social Collateral',
      color: 'from-cyan-500 to-blue-500',
      borderHover: 'hover:border-cyan-500/50',
      description:
        'Rapid turn-around social media packs, pitch decks, editable brand templates for non-designer clients, Instagram carousel systems, and digital promotional assets.',
      highlights: ['Client-Editable Templates', 'Multi-Slide Carousels', 'Pitch Deck Decks', 'High-Speed Campaign Packs'],
    },
  ];

  const designDisciplines = [
    {
      title: 'Advertising Poster Design',
      desc: 'High-impact promotional and event posters with magnetic headline hierarchy, cinematic lighting, and arresting focal points.',
      icon: Layers,
    },
    {
      title: 'Social Media Post Design',
      desc: 'Thumb-stopping Instagram carousels, feed graphics, and story banners engineered to maximize engagement and CTR.',
      icon: Layout,
    },
    {
      title: 'Logo Design & Monograms',
      desc: 'Memorable, enduring vector logos designed on balanced geometric grids with timeless simplicity and scalable clarity.',
      icon: PenTool,
    },
    {
      title: 'Branding & Marketing Graphics',
      desc: 'Holistic brand identities including color psychology systems, typography hierarchies, stationery, and comprehensive brand books.',
      icon: Palette,
    },
    {
      title: 'Real Estate Advertisements',
      desc: 'Luxury architectural brochures, development hoarding banners, floor plan sales sheets, and high-end digital real estate ads.',
      icon: Target,
    },
    {
      title: 'Product & Packaging Designs',
      desc: 'Retail-ready product labels, cosmetic dropper bottle graphics, box packaging die-lines, and photorealistic 3D product renders.',
      icon: Award,
    },
  ];

  const workflowSteps = [
    { step: '01', title: 'Creative Brief & Discovery', desc: 'Analyzing brand goals, target demographics, and aesthetic benchmarks.' },
    { step: '02', title: 'Concept Sketching & Moodboards', desc: 'Exploring divergent visual directions, typography pairings, and layouts.' },
    { step: '03', title: 'Vector & Raster Execution', desc: 'Crafting pixel-perfect assets in Illustrator and Photoshop with meticulous precision.' },
    { step: '04', title: 'Production-Ready Delivery', desc: 'Supplying organized source files, vector assets, and optimized web/print formats.' },
  ];

  return (
    <section id="skills" className="py-20 md:py-28 bg-[#0a0b0e] relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400">
            <Compass className="w-4 h-4" />
            <span>Design Arsenal & Capabilities</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Tools & Specialized Disciplines
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Every project leverages deep technical mastery of industry-standard Adobe software paired with proven graphic design fundamentals.
          </p>
        </div>

        {/* 3 Core Software Tool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {softwareTools.map((tool) => (
            <div
              key={tool.name}
              className={`rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 sm:p-7 flex flex-col justify-between space-y-6 transition-all duration-300 ${tool.borderHover} hover:shadow-xl`}
            >
              <div className="space-y-4">
                {/* Header Icon + Level */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center font-display font-extrabold text-lg text-white shadow-lg`}
                  >
                    {tool.icon}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                    {tool.level}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {tool.name}
                  </h3>
                  <p className="text-xs font-medium text-violet-400 mt-0.5">
                    {tool.tagline}
                  </p>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Highlights List */}
              <div className="pt-4 border-t border-zinc-800/80 space-y-2">
                {tool.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 6 Specialized Disciplines Grid */}
        <div className="space-y-6 mb-16">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-bold text-white">
              Core Design Offerings
            </h3>
            <span className="text-xs text-zinc-500">Tailored for Modern Brands</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {designDisciplines.map((d) => {
              const IconComp = d.icon;
              return (
                <div
                  key={d.title}
                  className="group rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-violet-500/40 p-5 space-y-2.5 transition-all duration-300 hover:bg-zinc-900"
                >
                  <div className="w-9 h-9 rounded-lg bg-violet-950/60 border border-violet-500/20 text-violet-400 flex items-center justify-center group-hover:text-cyan-300 transition-colors">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                    {d.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Abdullah's Creative Workflow Steps */}
        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 sm:p-8">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-400">
              Creative Process
            </p>
            <h3 className="font-display text-xl font-bold text-white mt-1">
              How We Turn Ideas Into Powerful Visuals
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step) => (
              <div key={step.step} className="space-y-2 relative">
                <span className="font-display text-3xl font-black text-zinc-800 select-none">
                  {step.step}
                </span>
                <h4 className="text-sm font-bold text-white">
                  {step.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
