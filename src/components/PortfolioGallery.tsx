import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Plus, Sparkles, Filter } from 'lucide-react';
import { CategoryFilter, Project, ProjectCategory } from '../types';
import { ProjectCard } from './ProjectCard';

interface PortfolioGalleryProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  isAdminLoggedIn?: boolean;
  onAddNewProject?: () => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  projects,
  onSelectProject,
  isAdminLoggedIn = false,
  onAddNewProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All Projects');
  const [selectedSoftware, setSelectedSoftware] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: ProjectCategory[] = [
    'All Projects',
    'Posters & Advertisements',
    'Social Media Designs',
    'Logo Design',
    'Branding',
    'Product Designs',
    'Real Estate Designs',
  ];

  const softwareOptions = ['All', 'Adobe Photoshop', 'Adobe Illustrator', 'Canva'];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category filter
      if (selectedCategory !== 'All Projects' && project.category !== selectedCategory) {
        return false;
      }
      // Software filter
      if (selectedSoftware !== 'All' && !project.softwareUsed.includes(selectedSoftware)) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = project.title.toLowerCase().includes(query);
        const matchDesc = project.description.toLowerCase().includes(query);
        const matchCategory = project.category.toLowerCase().includes(query);
        const matchClient = project.client?.toLowerCase().includes(query) || false;
        const matchSoftware = project.softwareUsed.some((s) => s.toLowerCase().includes(query));
        return matchTitle || matchDesc || matchCategory || matchClient || matchSoftware;
      }
      return true;
    });
  }, [projects, selectedCategory, selectedSoftware, searchQuery]);

  return (
    <section id="work" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Curated Portfolio</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Selected Works & Case Studies
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Explore custom posters, brand systems, luxury real estate campaigns, and product packaging crafted with surgical attention to visual hierarchy.
            </p>
          </div>

          {isAdminLoggedIn && onAddNewProject && (
            <button
              onClick={onAddNewProject}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition-all self-start md:self-end"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-10">
          
          {/* Category Tabs (Segmented functional buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all focus:outline-none ${
                    isSelected
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/25 font-semibold'
                      : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Secondary Filter & Search Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects by title, client, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Software Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                <Filter className="w-3 h-3" /> Tool:
              </span>
              {softwareOptions.map((tool) => {
                const isActive = selectedSoftware === tool;
                return (
                  <button
                    key={tool}
                    onClick={() => setSelectedSoftware(tool)}
                    className={`px-2.5 py-1 rounded-lg text-xs transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-zinc-800 text-cyan-300 border border-cyan-500/40 font-medium'
                        : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80'
                    }`}
                  >
                    {tool === 'All' ? 'All Tools' : tool.replace('Adobe ', '')}
                  </button>
                );
              })}
            </div>

          </div>

        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-20 px-4 rounded-2xl bg-zinc-900/40 border border-dashed border-zinc-800">
            <p className="text-zinc-400 text-sm">No projects matched your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All Projects');
                setSelectedSoftware('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-violet-600/20 text-violet-300 hover:bg-violet-600/30 text-xs font-semibold transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
