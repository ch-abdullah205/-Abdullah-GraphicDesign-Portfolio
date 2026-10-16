import React from 'react';
import { Eye, ArrowUpRight, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <article
      onClick={() => onSelect(project)}
      className="group relative cursor-pointer rounded-2xl overflow-hidden bg-zinc-900/90 border border-zinc-800/90 hover:border-violet-500/50 transition-all duration-400 hover:shadow-2xl hover:shadow-violet-600/15 flex flex-col justify-between"
    >
      {/* Image Thumbnail Container */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-zinc-950">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-violet-500/30 text-[11px] font-semibold text-violet-300">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Featured</span>
          </div>
        )}

        {/* Hover Quick View Trigger */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600/90 text-white font-semibold text-xs backdrop-blur-md shadow-lg shadow-violet-600/50 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            <span>View Case Study</span>
          </span>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Clean Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="text-violet-400 font-semibold">{project.category}</span>
            {project.year && (
              <>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span>{project.year}</span>
              </>
            )}
            {project.client && (
              <>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span className="truncate max-w-[120px]">{project.client}</span>
              </>
            )}
          </div>

          {/* Project Title */}
          <h3 className="font-display text-lg font-bold text-white group-hover:text-violet-300 transition-colors leading-snug">
            {project.title}
          </h3>

          {/* Project Short Description */}
          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Software Used Tags Footer */}
        <div className="pt-3 border-t border-zinc-800/70 flex items-center justify-between text-[11px]">
          <div className="flex flex-wrap items-center gap-1.5 text-zinc-400">
            {project.softwareUsed.map((software, idx) => (
              <span key={software} className="text-zinc-400">
                {software}
                {idx < project.softwareUsed.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>

          <span className="text-zinc-500 group-hover:text-violet-400 transition-colors flex items-center gap-0.5">
            Details
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </article>
  );
};
