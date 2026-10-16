import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, Sparkles, MessageSquare, Phone, Mail, Clock, DollarSign, Layers } from 'lucide-react';
import { ProfileSettings, Project } from '../types';
import { storageService } from '../services/storage';

interface HireMeSectionProps {
  profile: ProfileSettings;
  preselectedService?: string;
  onSubmitted?: () => void;
}

export const HireMeSection: React.FC<HireMeSectionProps> = ({
  profile,
  preselectedService,
  onSubmitted,
}) => {
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [serviceType, setServiceType] = useState('Branding and Marketing Graphics');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('$500 - $1,000');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedInquiryId, setSubmittedInquiryId] = useState('');

  // If a preselected service is passed from a project case study
  useEffect(() => {
    if (preselectedService) {
      setServiceType(preselectedService);
      const el = document.getElementById('hire');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [preselectedService]);

  const serviceOptions = [
    'Advertising Poster Design',
    'Social Media Post Design',
    'Logo Design & Monogram',
    'Branding and Marketing Graphics',
    'Real Estate Advertisements',
    'Product and Packaging Designs',
    'Other Custom Graphic Design',
  ];

  const budgetOptions = [
    'Under $300 (Small Quick Asset)',
    '$300 - $500 (Standard Project)',
    '$500 - $1,000 (Complete Brand / Multi-Asset)',
    '$1,000 - $2,500+ (Full Suite / Campaign)',
    'Flexible / Let\'s Discuss',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setStatus('idle');

    // Validation
    if (!clientName.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your name.');
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address so Abdullah can respond.');
      return;
    }

    if (!description.trim() || description.trim().length < 15) {
      setStatus('error');
      setErrorMessage('Please describe your project in at least a couple sentences (min 15 characters).');
      return;
    }

    setIsSubmitting(true);

    try {
      // Real submission: save to persistent storage service so Abdullah sees it in Admin Inquiries Dashboard
      const newInquiry = storageService.createInquiry({
        clientName: clientName.trim(),
        email: email.trim(),
        whatsapp: whatsapp.trim() || undefined,
        serviceType,
        description: description.trim(),
        budget,
      });

      setSubmittedInquiryId(newInquiry.id);
      setStatus('success');
      setIsSubmitting(false);

      if (onSubmitted) {
        onSubmitted();
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setStatus('error');
      setErrorMessage(err?.message || 'Failed to submit inquiry. Please try again or chat via WhatsApp.');
    }
  };

  const handleReset = () => {
    setClientName('');
    setEmail('');
    setWhatsapp('');
    setDescription('');
    setStatus('idle');
  };

  // WhatsApp instant quick link with formatted message
  const cleanPhone = profile.whatsapp.replace(/[^0-9]/g, '');
  const waPreText = encodeURIComponent(
    `Hello Abdullah! My name is ${clientName || 'a potential client'}. I'm interested in your ${serviceType} service (Ref: ${submittedInquiryId || 'New Inquiry'}). Description: ${description ? description.slice(0, 100) + '...' : 'I would like to discuss a design project.'}`
  );
  const directWaUrl = `https://wa.me/${cleanPhone}?text=${waPreText}`;

  return (
    <section id="hire" className="py-20 md:py-28 relative bg-[#0a0b0e] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Hiring Value Proposition & Trust */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Client Partnership</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Let's Build Something Exceptional Together
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Have an upcoming campaign, brand relaunch, luxury real estate project, or need magnetic social media graphics? Share your vision and get a clear timeline and quote.
              </p>
            </div>

            {/* Quick Guarantees */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <Clock className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white">Rapid 24-Hour Response</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Abdullah reviews all client inquiries daily and responds with feasibility and pricing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <Layers className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white">100% Production-Ready Source Files</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Receive layered .PSD, vectorized .AI, high-res PNG/JPG, and print-ready PDF assets with commercial rights.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <DollarSign className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white">Transparent, Milestone-Based Pricing</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    No hidden fees or unexpected charges. Clear project scopes with iterative revisions.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Instant Contact Box */}
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <p className="text-xs font-semibold text-zinc-300">
                Prefer immediate messaging?
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Direct Email</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Verified Hiring Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0e1017] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
              
              {status === 'success' ? (
                <div className="py-8 text-center space-y-6 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold text-white">
                      Inquiry Received!
                    </h3>
                    <p className="text-zinc-300 text-sm max-w-md mx-auto">
                      Thank you, <strong className="text-white">{clientName}</strong>. Your inquiry for <strong className="text-violet-400">{serviceType}</strong> has been logged directly into Abdullah's design dashboard.
                    </p>
                    <p className="text-zinc-500 text-xs">
                      Reference ID: <code className="text-zinc-400 font-mono">{submittedInquiryId}</code>
                    </p>
                  </div>

                  {/* Immediate WhatsApp follow-up button */}
                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 max-w-md mx-auto text-left space-y-3">
                    <p className="text-xs text-zinc-300">
                      Want to expedite your quote? You can also message Abdullah directly on WhatsApp with your project summary:
                    </p>
                    <a
                      href={directWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/30 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Open Pre-filled WhatsApp Chat</span>
                    </a>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="border-b border-zinc-800/80 pb-4">
                    <h3 className="font-display text-xl font-bold text-white">
                      Project Inquiry Form
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Fill out the details below to initiate your design brief.
                    </p>
                  </div>

                  {/* Error Notification */}
                  {status === 'error' && (
                    <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/50 flex items-center gap-3 text-red-300 text-xs">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name and Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        Your Full Name <span className="text-violet-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Marcus Vance"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        Email Address <span className="text-violet-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. client@brand.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Number (Optional) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-zinc-300">
                        WhatsApp Number
                      </label>
                      <span className="text-[11px] text-zinc-500">Optional (for faster communication)</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="e.g. +1 (555) 000-1234"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>

                  {/* Design Service Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Type of Design Service <span className="text-violet-400">*</span>
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs sm:text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-zinc-900 text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Project Description */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Project Description & Requirements <span className="text-violet-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please tell Abdullah about your project, target audience, preferred style, deliverables, and any deadlines..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Budget Selector (Optional) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Estimated Budget Range
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs sm:text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                    >
                      {budgetOptions.map((b) => (
                        <option key={b} value={b} className="bg-zinc-900 text-white">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-violet-600/30 hover:shadow-violet-600/40 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Inquiry...</span>
                        </span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Design Inquiry</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-zinc-500 text-center mt-2.5">
                      Your inquiry is saved directly to Abdullah's admin inbox with guaranteed review within 24 hours.
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
