import React from 'react';
import { ArrowUp, Sparkles, Lock, ShieldCheck } from 'lucide-react';
import { ProfileSettings } from '../types';

interface FooterProps {
  profile: ProfileSettings;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenAdmin, isAdminLoggedIn }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-900 bg-[#08090d] text-zinc-400 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-zinc-850">
          
          {/* Brand info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold text-white">
                {profile.name}
              </span>
              <span className="text-zinc-600">·</span>
              <span className="text-xs text-zinc-400 font-medium">
                Graphic Designer & Visual Identity
              </span>
            </div>
            <p className="text-xs text-zinc-500 max-w-md">
              Specialized in high-conversion advertising posters, brand identity design, social media collateral, and luxury real estate graphics.
            </p>
          </div>

          {/* Quick links & Scroll to Top */}
          <div className="flex items-center gap-6 self-stretch md:self-auto justify-between md:justify-end">
            <div className="flex items-center gap-4 text-xs">
              <a
                href={profile.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Behance
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Credits & Admin trigger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Abdullah. All rights reserved. Crafted with custom raster and vector discipline.</p>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Client Confidentiality Guaranteed</span>
            </span>

            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-[11px] hover:text-violet-400 transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>{isAdminLoggedIn ? 'Admin Panel (Online)' : 'Admin Dashboard'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
