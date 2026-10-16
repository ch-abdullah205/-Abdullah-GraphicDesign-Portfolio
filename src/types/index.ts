export type ProjectCategory =
  | 'All Projects'
  | 'Posters & Advertisements'
  | 'Social Media Designs'
  | 'Logo Design'
  | 'Branding'
  | 'Product Designs'
  | 'Real Estate Designs';

export type CategoryFilter = ProjectCategory;

export interface Project {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All Projects'>;
  description: string;
  fullDescription: string;
  coverImage: string;
  galleryImages: string[];
  softwareUsed: string[];
  client?: string;
  year?: string;
  featured: boolean;
  published: boolean;
  deliverables?: string[];
  challenge?: string;
  solution?: string;
  createdAt: string;
}

export interface ProfileSettings {
  name: string;
  title: string;
  heroHeading: string;
  heroSubtitle: string;
  aboutBio: string;
  aboutExperienceYears: number;
  aboutProjectsCompleted: number;
  aboutHappyClients: number;
  avatarUrl: string;
  email: string;
  whatsapp: string;
  linkedin: string;
  behance: string;
  instagram: string;
  location: string;
  availabilityStatus: 'Available for freelance' | 'Limited availability' | 'Booked for this month';
}

export interface ClientInquiry {
  id: string;
  clientName: string;
  email: string;
  whatsapp?: string;
  serviceType: string;
  description: string;
  budget?: string;
  status: 'New' | 'In Review' | 'Replied' | 'Closed';
  createdAt: string;
  notes?: string;
}

export type ActivePage = 'home' | 'portfolio' | 'about' | 'skills' | 'hire' | 'contact' | 'admin' | '404';
