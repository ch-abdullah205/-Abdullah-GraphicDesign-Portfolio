/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioGallery } from './components/PortfolioGallery';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { SkillsSection } from './components/SkillsSection';
import { AboutSection } from './components/AboutSection';
import { HireMeSection } from './components/HireMeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminModal } from './components/Admin/AdminModal';
import { NotFoundPage } from './components/NotFoundPage';
import { storageService } from './services/storage';
import { ProfileSettings, Project } from './types';

export default function App() {
  const [profile, setProfile] = useState<ProfileSettings>(() => storageService.getProfile());
  const [projects, setProjects] = useState<Project[]>(() => storageService.getProjects(false));
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState('hero');
  const [is404View, setIs404View] = useState(false);

  const isAdminLoggedIn = storageService.isAdminLoggedIn();

  const reloadProjects = () => {
    setProjects(storageService.getProjects(false));
  };

  const handleProfileUpdated = (updated: ProfileSettings) => {
    setProfile(updated);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleHireForProject = (project: Project) => {
    setSelectedProject(null);
    setPreselectedService(project.category);
    const hireEl = document.getElementById('hire');
    if (hireEl) {
      hireEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (sectionId: string) => {
    if (is404View) {
      setIs404View(false);
    }

    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('hero');
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Scroll spy to update active section in navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['contact', 'hire', 'about', 'skills', 'work'];
      const scrollY = window.scrollY;

      if (scrollY < 300) {
        setActiveSection('hero');
        return;
      }

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 120;
          if (scrollY >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredProjects = projects.filter((p) => p.featured);
  // Fallback to first few if none explicitly starred
  const heroFeatured = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f3f4f6] selection:bg-violet-600 selection:text-white">
      
      {/* Primary Navigation */}
      <Navbar
        profile={profile}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setAdminModalOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      <main>
        {is404View ? (
          <NotFoundPage onGoHome={() => setIs404View(false)} />
        ) : (
          <>
            {/* Hero Section */}
            <div id="hero">
              <Hero
                profile={profile}
                featuredProjects={heroFeatured}
                onExploreWork={() => handleNavigate('work')}
                onHireMe={() => handleNavigate('hire')}
                onSelectProject={handleSelectProject}
              />
            </div>

            {/* Curated Portfolio Gallery */}
            <PortfolioGallery
              projects={projects}
              onSelectProject={handleSelectProject}
              isAdminLoggedIn={isAdminLoggedIn}
              onAddNewProject={() => setAdminModalOpen(true)}
            />

            {/* Design Skills & Software Mastery */}
            <SkillsSection />

            {/* About Abdullah & Visual Philosophy */}
            <AboutSection
              profile={profile}
              onHireClick={() => handleNavigate('hire')}
            />

            {/* Hire Me / Client Project Inquiry Form */}
            <HireMeSection
              profile={profile}
              preselectedService={preselectedService}
            />

            {/* Direct Contact Channels & Verified Profiles */}
            <ContactSection profile={profile} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        onOpenAdmin={() => setAdminModalOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Project Case Study Fullscreen Modal */}
      <ProjectDetailModal
        project={selectedProject}
        profile={profile}
        onClose={() => setSelectedProject(null)}
        onHireForProject={handleHireForProject}
      />

      {/* Admin Dashboard Modal */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        profile={profile}
        onProfileUpdated={handleProfileUpdated}
        onProjectsUpdated={reloadProjects}
      />

    </div>
  );
}
