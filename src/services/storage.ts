import { initialInquiries, initialProfile, initialProjects } from '../data/initialData';
import { ClientInquiry, ProfileSettings, Project } from '../types';

const STORAGE_KEYS = {
  PROJECTS: 'abdullah_portfolio_projects_v1',
  PROFILE: 'abdullah_portfolio_profile_v1',
  INQUIRIES: 'abdullah_portfolio_inquiries_v1',
  ADMIN_AUTH: 'abdullah_portfolio_admin_auth_v1',
  ADMIN_HASH: 'abdullah_portfolio_admin_hash_v1',
  SUPABASE_CONFIG: 'abdullah_portfolio_supabase_cfg_v1',
};

// Default admin PIN / password: 'abdullah-design' or 'designer2026'
const DEFAULT_ADMIN_PASSWORD = 'abdullah-design';

export const storageService = {
  // --- Projects ---
  getProjects(includeUnpublished = false): Project[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
        return includeUnpublished ? initialProjects : initialProjects.filter((p) => p.published);
      }
      const projects: Project[] = JSON.parse(stored);
      return includeUnpublished ? projects : projects.filter((p) => p.published);
    } catch {
      return includeUnpublished ? initialProjects : initialProjects.filter((p) => p.published);
    }
  },

  getProjectById(id: string): Project | undefined {
    const all = this.getProjects(true);
    return all.find((p) => p.id === id);
  },

  saveProject(project: Project): Project {
    const projects = this.getProjects(true);
    const index = projects.findIndex((p) => p.id === project.id);
    let updated: Project[];

    if (index >= 0) {
      updated = [...projects];
      updated[index] = { ...project };
    } else {
      updated = [project, ...projects];
    }

    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    return project;
  },

  deleteProject(id: string): boolean {
    const projects = this.getProjects(true);
    const updated = projects.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    return true;
  },

  togglePublish(id: string): boolean {
    const project = this.getProjectById(id);
    if (!project) return false;
    project.published = !project.published;
    this.saveProject(project);
    return project.published;
  },

  toggleFeatured(id: string): boolean {
    const project = this.getProjectById(id);
    if (!project) return false;
    project.featured = !project.featured;
    this.saveProject(project);
    return project.featured;
  },

  // --- Profile Settings ---
  getProfile(): ProfileSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(initialProfile));
        return initialProfile;
      }
      return JSON.parse(stored);
    } catch {
      return initialProfile;
    }
  },

  saveProfile(profile: ProfileSettings): ProfileSettings {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    return profile;
  },

  // --- Client Inquiries ---
  getInquiries(): ClientInquiry[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(initialInquiries));
        return initialInquiries as ClientInquiry[];
      }
      return JSON.parse(stored);
    } catch {
      return initialInquiries as ClientInquiry[];
    }
  },

  createInquiry(data: Omit<ClientInquiry, 'id' | 'createdAt' | 'status'>): ClientInquiry {
    const inquiries = this.getInquiries();
    const newInquiry: ClientInquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
    };
    const updated = [newInquiry, ...inquiries];
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    return newInquiry;
  },

  updateInquiryStatus(id: string, status: ClientInquiry['status'], notes?: string): boolean {
    const inquiries = this.getInquiries();
    const target = inquiries.find((i) => i.id === id);
    if (!target) return false;
    target.status = status;
    if (notes !== undefined) target.notes = notes;
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    return true;
  },

  deleteInquiry(id: string): boolean {
    const inquiries = this.getInquiries();
    const updated = inquiries.filter((i) => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    return true;
  },

  // --- Admin Authentication ---
  isAdminLoggedIn(): boolean {
    try {
      const auth = sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
      if (!auth) return false;
      const data = JSON.parse(auth);
      // Session expires after 8 hours
      if (Date.now() > data.expiresAt) {
        sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  },

  loginAdmin(password: string): boolean {
    const currentPass = localStorage.getItem(STORAGE_KEYS.ADMIN_HASH) || DEFAULT_ADMIN_PASSWORD;
    if (password.trim() === currentPass.trim()) {
      const authData = {
        authenticated: true,
        expiresAt: Date.now() + 8 * 60 * 60 * 1000,
        loginTime: new Date().toISOString(),
      };
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify(authData));
      return true;
    }
    return false;
  },

  logoutAdmin(): void {
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  },

  changeAdminPassword(newPassword: string): boolean {
    if (!newPassword || newPassword.trim().length < 4) return false;
    localStorage.setItem(STORAGE_KEYS.ADMIN_HASH, newPassword.trim());
    return true;
  },

  // --- Image Upload Processing ---
  async processImageFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Selected file must be an image'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // Optionally resize very large images via an HTML canvas to avoid LocalStorage quota limits
        const img = new Image();
        img.onload = () => {
          const maxWidth = 1600;
          const maxHeight = 1600;
          let { width, height } = img;

          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              resolve(canvas.toDataURL('image/jpeg', 0.85));
              return;
            }
          }
          resolve(result);
        };
        img.onerror = () => resolve(result);
        img.src = result;
      };
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });
  },

  // --- Export & Import Data ---
  exportBackup(): string {
    const data = {
      projects: this.getProjects(true),
      profile: this.getProfile(),
      inquiries: this.getInquiries(),
      exportedAt: new Date().toISOString(),
      version: '1.0',
    };
    return JSON.stringify(data, null, 2);
  },

  importBackup(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed.projects)) {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(parsed.projects));
      }
      if (parsed.profile) {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(parsed.profile));
      }
      if (Array.isArray(parsed.inquiries)) {
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(parsed.inquiries));
      }
      return true;
    } catch {
      return false;
    }
  },

  resetToDefaults(): void {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(initialProfile));
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(initialInquiries));
  },
};
