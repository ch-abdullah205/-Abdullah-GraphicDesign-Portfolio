import React, { useState } from 'react';
import { Save, CheckCircle, Upload, User, Sparkles, Mail, MessageSquare, AlertCircle } from 'lucide-react';
import { ProfileSettings } from '../../types';
import { storageService } from '../../services/storage';

interface ProfileSettingsTabProps {
  profile: ProfileSettings;
  onSave: (updated: ProfileSettings) => void;
}

export const ProfileSettingsTab: React.FC<ProfileSettingsTabProps> = ({
  profile,
  onSave,
}) => {
  const [formData, setFormData] = useState<ProfileSettings>({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (field: keyof ProfileSettings, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMsg('');
    try {
      const dataUrl = await storageService.processImageFile(file);
      handleChange('avatarUrl', dataUrl);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to process avatar image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = storageService.saveProfile(formData);
    onSave(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
      
      {/* Status banner */}
      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-2 text-emerald-300">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Profile & contact information updated successfully!</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/50 flex items-center gap-2 text-red-300">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Basic Identity & Hero Copy */}
      <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <h4 className="font-display text-sm font-bold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-violet-400" />
          <span>Designer Identity & Hero Copy</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-semibold text-zinc-300">Display Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-zinc-300">Professional Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="font-semibold text-zinc-300">Hero Main Heading</label>
          <input
            type="text"
            value={formData.heroHeading}
            onChange={(e) => handleChange('heroHeading', e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-violet-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-semibold text-zinc-300">Hero Subtitle</label>
          <textarea
            rows={2}
            value={formData.heroSubtitle}
            onChange={(e) => handleChange('heroSubtitle', e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-violet-500 resize-none"
          />
        </div>

        {/* Availability status */}
        <div className="space-y-1.5 pt-2">
          <label className="font-semibold text-zinc-300">Freelance Availability Status</label>
          <select
            value={formData.availabilityStatus}
            onChange={(e) => handleChange('availabilityStatus', e.target.value as any)}
            className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-violet-500"
          >
            <option value="Available for freelance">Available for freelance projects</option>
            <option value="Limited availability">Limited availability (Inquire for schedule)</option>
            <option value="Booked for this month">Fully booked for current month</option>
          </select>
        </div>
      </div>

      {/* Avatar Photo Management */}
      <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <h4 className="font-display text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Profile Photo & Avatar</span>
        </h4>

        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-violet-500/50 bg-black flex-shrink-0">
            <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 space-y-2 w-full">
            <input
              type="text"
              placeholder="Or paste direct image URL (https://...)"
              value={formData.avatarUrl}
              onChange={(e) => handleChange('avatarUrl', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-violet-500"
            />
            <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-semibold transition-colors">
              <Upload className="w-3.5 h-3.5 text-violet-400" />
              <span>{uploading ? 'Processing Image...' : 'Upload New Photo From Device'}</span>
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Biography & Numbers */}
      <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <h4 className="font-display text-sm font-bold text-white">About Me Narrative & Experience Metrics</h4>
        
        <div className="space-y-1.5">
          <label className="font-semibold text-zinc-300">About Me Biography</label>
          <textarea
            rows={4}
            value={formData.aboutBio}
            onChange={(e) => handleChange('aboutBio', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-violet-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <label className="font-semibold text-zinc-300">Years Exp.</label>
            <input
              type="number"
              min={1}
              value={formData.aboutExperienceYears}
              onChange={(e) => handleChange('aboutExperienceYears', parseInt(e.target.value) || 0)}
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-zinc-300">Projects Done</label>
            <input
              type="number"
              min={1}
              value={formData.aboutProjectsCompleted}
              onChange={(e) => handleChange('aboutProjectsCompleted', parseInt(e.target.value) || 0)}
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-zinc-300">Happy Clients</label>
            <input
              type="number"
              min={1}
              value={formData.aboutHappyClients}
              onChange={(e) => handleChange('aboutHappyClients', parseInt(e.target.value) || 0)}
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Editable Contact Channels */}
      <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <h4 className="font-display text-sm font-bold text-white flex items-center gap-2">
          <Mail className="w-4 h-4 text-emerald-400" />
          <span>Contact Placeholders & Social Channels</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-semibold text-zinc-300">Professional Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-zinc-300">WhatsApp Number</label>
            <input
              type="text"
              value={formData.whatsapp}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-zinc-300">Behance URL</label>
            <input
              type="url"
              value={formData.behance}
              onChange={(e) => handleChange('behance', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-zinc-300">LinkedIn URL</label>
            <input
              type="url"
              value={formData.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="font-semibold text-zinc-300">Instagram Profile URL</label>
            <input
              type="url"
              value={formData.instagram}
              onChange={(e) => handleChange('instagram', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile Changes</span>
        </button>
      </div>

    </form>
  );
};
