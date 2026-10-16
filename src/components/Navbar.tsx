import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowUpRight, Lock, MessageSquare } from 'lucide-react';
import { ProfileSettings } from '../types';

interface NavbarProps {
  profile: ProfileSettings;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeSection,
  onNavigate,
  onOpenAdmin,
  isAdminLoggedIn,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'work', label: 'Work' },
    { id: 'skills', label: 'Skills' },
    { id: 'about', label: 'About' },
    { id: 'hire', label: 'Hire Me' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0c0d12]/85 border-b border-zinc-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('hero')}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all duration-300">
            <div className="w-full h-full bg-[#0e1017] rounded-[11px] flex items-center justify-center">
              <span className="font-display font-black text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300">
                A
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-violet-300 transition-colors">
                {profile.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <p className="text-[11px] font-medium tracking-widest uppercase text-zinc-400">
              Graphic Designer
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium tracking-wide transition-all relative py-1 focus:outline-none ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Hire Me */}
        <div className="hidden md:flex items-center gap-4">
          {/* Admin Button */}
          <button
            onClick={onOpenAdmin}
            title={isAdminLoggedIn ? 'Admin Dashboard (Active)' : 'Admin Dashboard Login'}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-medium ${
              isAdminLoggedIn
                ? 'bg-violet-950/60 border-violet-500/50 text-violet-300 shadow-sm shadow-violet-500/30'
                : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          {/* Hire Me CTA Button */}
          <button
            onClick={() => handleNavClick('hire')}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-cyan-300 transition-transform group-hover:rotate-12" />
            <span>Hire Me</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenAdmin}
            aria-label="Admin Dashboard"
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
          >
            <Lock className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e1017] border-b border-zinc-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2 text-base font-medium transition-colors ${
                  activeSection === item.id ? 'text-violet-400 font-semibold' : 'text-zinc-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-800/80 flex flex-col gap-3">
            <button
              onClick={() => handleNavClick('hire')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium shadow-md shadow-violet-600/30"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Hire Me for Freelance</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm"
            >
              <Lock className="w-4 h-4 text-violet-400" />
              <span>{isAdminLoggedIn ? 'Open Admin Dashboard' : 'Admin Login'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
