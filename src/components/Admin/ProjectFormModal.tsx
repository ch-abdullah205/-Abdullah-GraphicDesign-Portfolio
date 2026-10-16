import React, { useState } from 'react';
import { X, Upload, Plus, Trash2, Image as ImageIcon, Sparkles, AlertCircle } from 'lucide-react';
import { Project, ProjectCategory } from '../../types';
import { storageService } from '../../services/storage';

interface ProjectFormModalProps {
  project?: Project | null;
  onSave: (project: Project) => void;
  onClose: () => void;
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  project,
  onSave,
  onClose,
}) => {
  const isEditing = !!project;

  const [title, setTitle] = useState(project?.title || '');
  const [category, setCategory] = useState<Exclude<ProjectCategory, 'All Projects'>>(
    project?.category || 'Posters & Advertisements'
  );
  const [description, setDescription] = useState(project?.description || '');
  const [fullDescription, setFullDescription] = useState(project?.fullDescription || '');
  const [client, setClient] = useState(project?.client || '');
  const [year, setYear] = useState(project?.year || '2026');
  const [coverImage, setCoverImage] = useState(project?.coverImage || '');
  const [galleryImages, setGalleryImages] = useState<string[]>(project?.galleryImages || []);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  
  const [softwareUsed, setSoftwareUsed] = useState<string[]>(
    project?.softwareUsed || ['Adobe Photoshop', 'Adobe Illustrator']
  );
  
  const [deliverablesStr, setDeliverablesStr] = useState(
    project?.deliverables?.join(', ') || 'Print Poster, Digital Billboard, Social Media Asset'
  );
  const [challenge, setChallenge] = useState(project?.challenge || '');
  const [solution, setSolution] = useState(project?.solution || '');
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [published, setPublished] = useState(project?.published ?? true);

  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const categories: Exclude<ProjectCategory, 'All Projects'>[] = [
    'Posters & Advertisements',
    'Social Media Designs',
    'Logo Design',
    'Branding',
    'Product Designs',
    'Real Estate Designs',
  ];

  const availableSoftware = [
    'Adobe Photoshop',
    'Adobe Illustrator',
    'Canva',
    'Adobe InDesign',
    'Blender 3D',
  ];

  const toggleSoftware = (tool: string) => {
    if (softwareUsed.includes(tool)) {
      setSoftwareUsed(softwareUsed.filter((t) => t !== tool));
    } else {
      setSoftwareUsed([...softwareUsed, tool]);
    }
  };

  // Handle Cover Image file upload from device
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg('');
    try {
      const dataUrl = await storageService.processImageFile(file);
      setCoverImage(dataUrl);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error processing image file');
    } finally {
      setIsUploading(false);
    }
  };

  // Handle Gallery Image file upload from device
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg('');
    try {
      const dataUrl = await storageService.processImageFile(file);
      setGalleryImages([...galleryImages, dataUrl]);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error processing gallery image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddGalleryUrl = () => {
    if (newGalleryUrl.trim()) {
      setGalleryImages([...galleryImages, newGalleryUrl.trim()]);
      setNewGalleryUrl('');
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter a project title.');
      return;
    }
    if (!coverImage.trim()) {
      setErrorMsg('Please provide or upload a cover image.');
      return;
    }
    if (softwareUsed.length === 0) {
      setErrorMsg('Please select at least one software tool used.');
      return;
    }

    const deliverables = deliverablesStr
      .split(',')
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    const updatedProject: Project = {
      id: project?.id || `proj-${Date.now()}`,
      title: title.trim(),
      category,
      description: description.trim(),
      fullDescription: fullDescription.trim() || description.trim(),
      coverImage: coverImage.trim(),
      galleryImages: galleryImages.length > 0 ? galleryImages : [coverImage.trim()],
      softwareUsed,
      client: client.trim() || undefined,
      year: year.trim() || undefined,
      featured,
      published,
      deliverables,
      challenge: challenge.trim() || undefined,
      solution: solution.trim() || undefined,
      createdAt: project?.createdAt || new Date().toISOString().split('T')[0],
    };

    onSave(updatedProject);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#0e1017] border border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/60">
          <div>
            <h2 className="font-display text-lg font-bold text-white">
              {isEditing ? 'Edit Project' : 'Add New Portfolio Project'}
            </h2>
            <p className="text-xs text-zinc-400">
              Configure project visual assets, metadata, and visibility.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[82vh] overflow-y-auto text-xs sm:text-sm">
          
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/50 flex items-center gap-2 text-red-300">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Title and Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-zinc-300">
                Project Title <span className="text-violet-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Neon Horizon Festival Poster"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-zinc-300">
                Category <span className="text-violet-400">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-violet-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Client & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-zinc-300">Client / Brand</label>
              <input
                type="text"
                placeholder="e.g. SubSonic Events, Aura Co."
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-zinc-300">Year</label>
              <input
                type="text"
                placeholder="e.g. 2026"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <label className="font-semibold text-zinc-300">
              Short Description (Card Summary) <span className="text-violet-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="1-2 sentences summarizing the design style, colors, and purpose..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Full Case Study Narrative */}
          <div className="space-y-1.5">
            <label className="font-semibold text-zinc-300">
              Full Case Study Description
            </label>
            <textarea
              rows={3}
              placeholder="In-depth explanation of the project context, design strategy, typography, and execution..."
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-violet-500 resize-none"
            />
          </div>

          {/* Cover Image Upload & URL */}
          <div className="space-y-2 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-zinc-200 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-violet-400" />
                <span>Cover Image <span className="text-violet-400">*</span></span>
              </label>
              {isUploading && (
                <span className="text-xs text-cyan-400 animate-pulse">Uploading / Optimizing...</span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-8">
                <input
                  type="text"
                  placeholder="Paste image URL (https://...)"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-violet-500 text-xs"
                />
              </div>

              <div className="sm:col-span-4 flex items-center">
                <label className="w-full cursor-pointer flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-semibold transition-colors">
                  <Upload className="w-3.5 h-3.5 text-violet-400" />
                  <span>Upload From Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Cover Preview */}
            {coverImage && (
              <div className="mt-2 relative w-36 h-24 rounded-lg overflow-hidden border border-zinc-700 bg-black">
                <img src={coverImage} alt="Cover preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Gallery Images */}
          <div className="space-y-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-zinc-200">
                Additional Gallery Images (Case Study Slides)
              </label>
              <label className="cursor-pointer text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload From Device</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleGalleryUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Add by URL */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Or paste image URL and click Add"
                value={newGalleryUrl}
                onChange={(e) => setNewGalleryUrl(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs"
              />
              <button
                type="button"
                onClick={handleAddGalleryUrl}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 hover:text-white text-xs font-medium"
              >
                Add URL
              </button>
            </div>

            {/* Gallery Thumbnails List */}
            {galleryImages.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {galleryImages.map((img, i) => (
                  <div key={i} className="relative w-20 h-14 rounded-lg overflow-hidden border border-zinc-700 group">
                    <img src={img} alt="Gallery item" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(i)}
                      className="absolute inset-0 bg-red-600/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Software Used Chips */}
          <div className="space-y-2">
            <label className="font-semibold text-zinc-300">
              Software Used <span className="text-violet-400">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {availableSoftware.map((tool) => {
                const isSelected = softwareUsed.includes(tool);
                return (
                  <button
                    key={tool}
                    type="button"
                    onClick={() => toggleSoftware(tool)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-violet-600 text-white'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {tool}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deliverables */}
          <div className="space-y-1.5">
            <label className="font-semibold text-zinc-300">
              Deliverables (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Print-Ready Poster, Social Media Kit, Source Files"
              value={deliverablesStr}
              onChange={(e) => setDeliverablesStr(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-zinc-300">Design Challenge (optional)</label>
              <textarea
                rows={2}
                placeholder="What difficulty or obstacle did the client have?"
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-violet-500 resize-none text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-zinc-300">Visual Solution (optional)</label>
              <textarea
                rows={2}
                placeholder="How did your layout and typography solve it?"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-violet-500 resize-none text-xs"
              />
            </div>
          </div>

          {/* Featured & Published Toggles */}
          <div className="pt-2 flex flex-wrap gap-6 border-t border-zinc-800">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-violet-600 bg-zinc-900 border-zinc-700"
              />
              <span className="font-semibold text-zinc-300">Mark as Featured on Homepage</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 rounded text-violet-600 bg-zinc-900 border-zinc-700"
              />
              <span className="font-semibold text-zinc-300">
                Published <span className="text-zinc-500 text-[11px]">(Uncheck to save as draft)</span>
              </span>
            </label>
          </div>

          {/* Footer Save & Cancel */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition-colors"
            >
              {isEditing ? 'Save Changes' : 'Create Project'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
