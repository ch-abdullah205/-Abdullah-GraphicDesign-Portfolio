import React, { useState } from 'react';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  StarOff,
  LogOut,
  Lock,
  Layers,
  Inbox,
  User,
  Settings,
  ShieldAlert,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { ClientInquiry, ProfileSettings, Project } from '../../types';
import { storageService } from '../../services/storage';
import { ProjectFormModal } from './ProjectFormModal';
import { InquiriesManager } from './InquiriesManager';
import { ProfileSettingsTab } from './ProfileSettingsTab';
import { BackendSetupTab } from './BackendSetupTab';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileSettings;
  onProfileUpdated: (updated: ProfileSettings) => void;
  onProjectsUpdated: () => void;
  initialTab?: 'projects' | 'inquiries' | 'profile' | 'backend';
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  profile,
  onProfileUpdated,
  onProjectsUpdated,
  initialTab = 'projects',
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(storageService.isAdminLoggedIn());
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'inquiries' | 'profile' | 'backend'>(initialTab);

  // Projects state
  const [allProjects, setAllProjects] = useState<Project[]>(() => storageService.getProjects(true));
  const [inquiries, setInquiries] = useState<ClientInquiry[]>(() => storageService.getInquiries());
  
  // Project editing modals
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  if (!isOpen) return null;

  const refreshLocalState = () => {
    setAllProjects(storageService.getProjects(true));
    setInquiries(storageService.getInquiries());
    onProjectsUpdated();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = storageService.loginAdmin(passwordInput);
    if (success) {
      setIsLoggedIn(true);
      setPasswordInput('');
      refreshLocalState();
    } else {
      setLoginError('Incorrect master passcode. Try "abdullah-design".');
    }
  };

  const handleLogout = () => {
    storageService.logoutAdmin();
    setIsLoggedIn(false);
  };

  // Toggle Project Published Status
  const handleTogglePublish = (id: string) => {
    storageService.togglePublish(id);
    refreshLocalState();
  };

  // Toggle Project Featured Status
  const handleToggleFeatured = (id: string) => {
    storageService.toggleFeatured(id);
    refreshLocalState();
  };

  // Delete Project with confirmation
  const handleDeleteProject = (id: string) => {
    storageService.deleteProject(id);
    setConfirmDeleteId(null);
    refreshLocalState();
  };

  // Save Project from Form
  const handleSaveProject = (project: Project) => {
    storageService.saveProject(project);
    setIsAddingProject(false);
    setEditingProject(null);
    refreshLocalState();
  };

  const newInquiriesCount = inquiries.filter((i) => i.status === 'New').length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-[#0e1017] border border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-4 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-600/30 border border-violet-500/40 text-violet-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-white flex items-center gap-2">
                <span>Abdullah Portfolio Management</span>
                {isLoggedIn && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                )}
              </h2>
              <p className="text-[11px] text-zinc-400">
                {isLoggedIn ? 'Authenticated Admin Session' : 'Protected Area · Login Required'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs transition-colors"
                title="Log out from Admin Dashboard"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {!isLoggedIn ? (
            /* Login Gate */
            <div className="max-w-md mx-auto py-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 text-violet-400 flex items-center justify-center mx-auto shadow-xl">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display text-xl font-bold text-white">
                  Enter Admin Passcode
                </h3>
                <p className="text-xs text-zinc-400">
                  Authenticate to edit projects, upload design files, and view client leads.
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  placeholder="Enter passcode (default: abdullah-design)"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 text-center"
                  autoFocus
                />

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 transition-all"
                >
                  Unlock Admin Dashboard
                </button>
              </form>

              <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-850 text-[11px] text-zinc-500 text-left space-y-1">
                <p className="font-semibold text-zinc-400">Default Credentials:</p>
                <p>Passcode: <code className="text-violet-300 font-mono">abdullah-design</code></p>
                <p>Public visitors cannot view unpublished draft works or client messages.</p>
              </div>
            </div>
          ) : (
            /* Logged-In Admin Hub */
            <div className="space-y-6">
              
              {/* Tab Navigation */}
              <div className="flex items-center gap-2 overflow-x-auto border-b border-zinc-800 pb-3">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                    activeTab === 'projects'
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Projects ({allProjects.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                    activeTab === 'inquiries'
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  <Inbox className="w-3.5 h-3.5" />
                  <span>Client Inquiries ({inquiries.length})</span>
                  {newInquiriesCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                    activeTab === 'profile'
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Profile & Contact</span>
                </button>

                <button
                  onClick={() => setActiveTab('backend')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                    activeTab === 'backend'
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Backend & Backup</span>
                </button>
              </div>

              {/* TAB 1: PROJECTS MANAGER */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display text-base font-bold text-white">
                        All Portfolio Projects
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Manage published items, draft case studies, and featured works.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingProject(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition-all self-start sm:self-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Project</span>
                    </button>
                  </div>

                  {/* Projects List / Table */}
                  <div className="space-y-3">
                    {allProjects.map((proj) => (
                      <div
                        key={proj.id}
                        className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-zinc-700 transition-colors"
                      >
                        {/* Left: Thumbnail & Info */}
                        <div className="flex items-center gap-4">
                          <img
                            src={proj.coverImage}
                            alt={proj.title}
                            className="w-16 h-14 rounded-xl object-cover bg-black flex-shrink-0 border border-zinc-800"
                          />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-display text-sm font-bold text-white">
                                {proj.title}
                              </h4>
                              {proj.featured && (
                                <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-950/70 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                                  Featured
                                </span>
                              )}
                              {!proj.published && (
                                <span className="text-[10px] font-semibold text-amber-400 bg-amber-950/70 border border-amber-500/30 px-1.5 py-0.5 rounded">
                                  Draft (Hidden)
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-zinc-400">
                              <span className="text-violet-400 font-medium">{proj.category}</span>
                              <span aria-hidden="true" className="text-zinc-600">·</span>
                              <span>{proj.softwareUsed.join(', ')}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Controls & Toggles */}
                        <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
                          
                          {/* Toggle Featured */}
                          <button
                            onClick={() => handleToggleFeatured(proj.id)}
                            className={`p-2 rounded-lg border transition-colors ${
                              proj.featured
                                ? 'bg-cyan-950/40 text-cyan-300 border-cyan-500/30'
                                : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'
                            }`}
                            title={proj.featured ? 'Remove from Featured' : 'Mark as Featured'}
                          >
                            {proj.featured ? <Star className="w-4 h-4 fill-cyan-400" /> : <StarOff className="w-4 h-4" />}
                          </button>

                          {/* Toggle Published */}
                          <button
                            onClick={() => handleTogglePublish(proj.id)}
                            className={`p-2 rounded-lg border transition-colors ${
                              proj.published
                                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                                : 'bg-amber-950/40 text-amber-300 border-amber-500/30'
                            }`}
                            title={proj.published ? 'Published (Click to hide/draft)' : 'Draft (Click to publish)'}
                          >
                            {proj.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>

                          {/* Edit Project */}
                          <button
                            onClick={() => setEditingProject(proj)}
                            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-750 text-zinc-300 hover:text-white border border-zinc-700 transition-colors"
                            title="Edit Project"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {/* Delete Project with confirmation */}
                          {confirmDeleteId === proj.id ? (
                            <div className="flex items-center gap-1.5 p-1 bg-red-950/80 border border-red-500/50 rounded-lg">
                              <button
                                onClick={() => handleDeleteProject(proj.id)}
                                className="px-2 py-1 rounded bg-red-600 text-white text-[11px] font-bold"
                              >
                                Confirm Delete
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 text-[11px]"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteId(proj.id)}
                              className="p-2 rounded-lg bg-zinc-800 hover:bg-red-950/40 text-zinc-400 hover:text-red-400 border border-zinc-700 transition-colors"
                              title="Delete Project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}

                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 2: INQUIRIES */}
              {activeTab === 'inquiries' && (
                <InquiriesManager
                  inquiries={inquiries}
                  profile={profile}
                  onRefresh={refreshLocalState}
                />
              )}

              {/* TAB 3: PROFILE & CONTACT SETTINGS */}
              {activeTab === 'profile' && (
                <ProfileSettingsTab
                  profile={profile}
                  onSave={(updated) => {
                    onProfileUpdated(updated);
                    refreshLocalState();
                  }}
                />
              )}

              {/* TAB 4: BACKEND & BACKUP */}
              {activeTab === 'backend' && (
                <BackendSetupTab onRefreshData={refreshLocalState} />
              )}

            </div>
          )}
        </div>

      </div>

      {/* Project Form Modal (Create / Edit) */}
      {(isAddingProject || editingProject) && (
        <ProjectFormModal
          project={editingProject}
          onSave={handleSaveProject}
          onClose={() => {
            setIsAddingProject(false);
            setEditingProject(null);
          }}
        />
      )}

    </div>
  );
};
