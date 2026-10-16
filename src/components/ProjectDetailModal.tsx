import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle2, Sparkles, MessageCircle, ArrowUpRight, Calendar, User, Wrench } from 'lucide-react';
import { ProfileSettings, Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  profile: ProfileSettings;
  onClose: () => void;
  onHireForProject: (project: Project) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  profile,
  onClose,
  onHireForProject,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const images = project.galleryImages && project.galleryImages.length > 0
    ? project.galleryImages
    : [project.coverImage];

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Format WhatsApp message URL
  const cleanPhone = profile.whatsapp.replace(/[^0-9]/g, '');
  const waText = encodeURIComponent(
    `Hello Abdullah, I saw your "${project.title}" project on your portfolio and I would love to hire you for a similar graphic design project.`
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waText}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-[#0e1017] border border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-zinc-600" aria-hidden="true">·</span>
            <span className="text-xs text-zinc-400">Case Study Details</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          
          {/* Main Large Image & Gallery Slider */}
          <div className="space-y-4">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-xl">
              <img
                src={images[activeImageIndex]}
                alt={`${project.title} showcase visual ${activeImageIndex + 1}`}
                className="w-full h-full object-contain sm:object-cover transition-all duration-300"
              />

              {/* Slider Arrows if multiple images */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 transition-colors"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 transition-colors"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-medium text-white/90 border border-white/10">
                  {activeImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-violet-500 scale-105 shadow-md shadow-violet-500/30'
                        : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail preview" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Title & Metadata Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Cols: Full narrative */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {project.title}
                </h1>
                <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
                  {project.fullDescription || project.description}
                </p>
              </div>

              {/* Challenge & Solution Cards */}
              {(project.challenge || project.solution) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {project.challenge && (
                    <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1.5">
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        Design Challenge
                      </p>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>
                  )}

                  {project.solution && (
                    <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1.5">
                      <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                        Visual Solution
                      </p>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Deliverables List */}
              {project.deliverables && project.deliverables.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Project Deliverables
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right 4 Cols: Project Specs & Actions */}
            <div className="lg:col-span-4 space-y-6 bg-zinc-900/70 border border-zinc-800/90 rounded-2xl p-5">
              
              {/* Meta specifications */}
              <div className="space-y-4 text-xs">
                {project.client && (
                  <div className="flex items-start gap-2.5">
                    <User className="w-4 h-4 text-zinc-400 mt-0.5" />
                    <div>
                      <p className="text-zinc-500 font-medium">Client / Brand</p>
                      <p className="text-zinc-200 font-semibold">{project.client}</p>
                    </div>
                  </div>
                )}

                {project.year && (
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-zinc-400 mt-0.5" />
                    <div>
                      <p className="text-zinc-500 font-medium">Year Completed</p>
                      <p className="text-zinc-200 font-semibold">{project.year}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-2.5">
                  <Wrench className="w-4 h-4 text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-zinc-500 font-medium mb-1">Software Used</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.softwareUsed.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 rounded-md bg-zinc-800 text-[11px] font-medium text-cyan-300 border border-zinc-700"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-800/80 space-y-3">
                <button
                  onClick={() => onHireForProject(project)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Hire Me For Similar Project</span>
                </button>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-semibold text-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
