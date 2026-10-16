import React, { useState } from 'react';
import { Mail, MessageSquare, Linkedin, Instagram, Globe, Check, Copy, ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';
import { ProfileSettings } from '../types';

interface ContactSectionProps {
  profile: ProfileSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const cleanPhone = profile.whatsapp.replace(/[^0-9]/g, '');

  const socialLinks = [
    {
      name: 'Behance Portfolio',
      url: profile.behance,
      username: 'abdullah-visuals',
      icon: Globe,
      color: 'hover:text-blue-400',
    },
    {
      name: 'LinkedIn Profile',
      url: profile.linkedin,
      username: 'in/abdullah-designer',
      icon: Linkedin,
      color: 'hover:text-sky-400',
    },
    {
      name: 'Instagram Profile',
      url: profile.instagram,
      username: '@abdullah.designs',
      icon: Instagram,
      color: 'hover:text-pink-400',
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Direct Channels</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Connect & Collaborate
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Reach out through your preferred communication platform. All links and contact details can be configured via the admin dashboard.
          </p>
        </div>

        {/* Primary Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          
          {/* WhatsApp Card */}
          <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-emerald-500/40 transition-colors">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Instant Chat & Fast Quoting
              </p>
              <h3 className="font-display text-xl font-bold text-white">
                WhatsApp Direct
              </h3>
              <p className="text-xs text-zinc-400">
                Chat directly with Abdullah on WhatsApp for quick inquiries, portfolio discussions, and file exchanges.
              </p>
              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-zinc-300 flex items-center justify-between">
                <span>{profile.whatsapp}</span>
                <button
                  onClick={() => handleCopy(profile.whatsapp, 'wa')}
                  className="p-1 rounded text-zinc-500 hover:text-zinc-200"
                  title="Copy WhatsApp Number"
                >
                  {copiedField === 'wa' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-emerald-600/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Open WhatsApp Conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Email Card */}
          <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-violet-500/40 transition-colors">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-violet-950/60 border border-violet-500/30 text-violet-400 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-violet-400">
                Official Business Inquiries
              </p>
              <h3 className="font-display text-xl font-bold text-white">
                Professional Email
              </h3>
              <p className="text-xs text-zinc-400">
                Send formal project briefs, contracts, NDAs, or requests for proposal directly to Abdullah's email.
              </p>
              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-zinc-300 flex items-center justify-between">
                <span className="truncate mr-2">{profile.email}</span>
                <button
                  onClick={() => handleCopy(profile.email, 'email')}
                  className="p-1 rounded text-zinc-500 hover:text-zinc-200"
                  title="Copy Email Address"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-violet-600/20"
            >
              <Mail className="w-4 h-4" />
              <span>Send An Email</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Social Media Profiles Strip */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 text-center mb-5">
            Verified Design Profiles & Socials
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                    <div>
                      <p className="text-xs font-semibold text-white group-hover:text-violet-300 transition-colors">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-zinc-500 truncate max-w-[130px]">
                        {item.username}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
