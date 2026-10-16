import React, { useState } from 'react';
import { Database, Download, Upload, Shield, Key, Copy, Check, Terminal, ExternalLink, RefreshCw } from 'lucide-react';
import { storageService } from '../../services/storage';

interface BackendSetupTabProps {
  onRefreshData: () => void;
}

export const BackendSetupTab: React.FC<BackendSetupTabProps> = ({ onRefreshData }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleExport = () => {
    const json = storageService.exportBackup();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `abdullah-portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const ok = storageService.importBackup(content);
      if (ok) {
        setImportStatus('Backup restored successfully!');
        onRefreshData();
      } else {
        setImportStatus('Invalid JSON backup file format.');
      }
      setTimeout(() => setImportStatus(null), 4000);
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to restore the initial showcase sample projects? Any unsaved custom edits will be reset.')) {
      storageService.resetToDefaults();
      onRefreshData();
      alert('Portfolio restored to initial high-quality showcase state.');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim().length < 4) {
      setPasswordStatus('Password must be at least 4 characters long.');
      return;
    }
    storageService.changeAdminPassword(newPassword.trim());
    setPasswordStatus('Admin password successfully updated!');
    setNewPassword('');
    setTimeout(() => setPasswordStatus(null), 3500);
  };

  const supabaseSchemaSql = `-- Supabase PostgreSQL Schema & Security Rules for Abdullah Portfolio

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  cover_image TEXT NOT NULL,
  gallery_images TEXT[] DEFAULT '{}',
  software_used TEXT[] NOT NULL DEFAULT '{}',
  client TEXT,
  year TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  deliverables TEXT[] DEFAULT '{}',
  challenge TEXT,
  solution TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Client Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  service_type TEXT NOT NULL,
  description TEXT NOT NULL,
  budget TEXT,
  status TEXT DEFAULT 'New',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Row Level Security (RLS) Policies
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Public can ONLY read published projects:
CREATE POLICY "Public can view published projects"
  ON public.projects FOR SELECT
  USING (published = true);

-- Authenticated Admin can perform all operations on projects:
CREATE POLICY "Admin has full access to projects"
  ON public.projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Public can submit new inquiries:
CREATE POLICY "Public can submit inquiries"
  ON public.inquiries FOR INSERT
  WITH CHECK (true);

-- Only Authenticated Admin can view and update inquiries:
CREATE POLICY "Admin can view and manage inquiries"
  ON public.inquiries FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 4. Storage Bucket Configuration
-- Create a public bucket 'portfolio-assets' in Supabase Storage.
-- Public read access for images; write restricted to authenticated admin.
`;

  return (
    <div className="space-y-8 text-xs sm:text-sm">
      
      {/* Current Operational Status */}
      <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h4 className="font-display text-sm font-bold text-white">
              Current Architecture: Browser Persistent LocalDB & Device File Engine
            </h4>
          </div>
          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
            Active & Functional
          </span>
        </div>
        <p className="text-zinc-300 leading-relaxed">
          Your portfolio currently operates with an instant, persistent local data layer. All changes to projects, cover images uploaded from your phone/desktop, profile settings, and client inquiries are saved securely on your device with complete zero-delay editing and JSON backup export/import.
        </p>
      </div>

      {/* Admin Password Configuration */}
      <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <h4 className="font-display text-sm font-bold text-white flex items-center gap-2">
          <Key className="w-4 h-4 text-violet-400" />
          <span>Admin Security & Master Passcode</span>
        </h4>
        <p className="text-zinc-400 text-xs">
          Default master passcode is <code className="text-violet-300 bg-zinc-800 px-1.5 py-0.5 rounded font-mono">abdullah-design</code>. You can update it anytime below.
        </p>

        {passwordStatus && (
          <p className="text-xs text-emerald-400 font-medium">{passwordStatus}</p>
        )}

        <form onSubmit={handleChangePassword} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="password"
            placeholder="Enter new master passcode..."
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="flex-1 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-violet-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors"
          >
            Update Passcode
          </button>
        </form>
      </div>

      {/* Portfolio Backup & Export / Import */}
      <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <h4 className="font-display text-sm font-bold text-white flex items-center gap-2">
          <Download className="w-4 h-4 text-cyan-400" />
          <span>Data Backup, Export & Restore</span>
        </h4>
        <p className="text-zinc-400 text-xs">
          Export your entire portfolio state (all projects, uploaded device images, custom profile settings, and inquiries) into a portable JSON file.
        </p>

        {importStatus && (
          <p className="text-xs text-cyan-300 font-medium">{importStatus}</p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-semibold text-xs transition-colors"
          >
            <Download className="w-4 h-4 text-cyan-300" />
            <span>Download JSON Backup</span>
          </button>

          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-semibold text-xs transition-colors">
            <Upload className="w-4 h-4 text-violet-400" />
            <span>Restore From Backup</span>
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/40 text-red-300 border border-red-500/30 text-xs font-semibold transition-colors ml-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Initial Template</span>
          </button>
        </div>
      </div>

      {/* Step-by-Step Supabase Remote Backend Guide */}
      <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-display text-sm font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Step-by-Step Supabase Production Integration Guide</span>
          </h4>
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1"
          >
            <span>Supabase Docs</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <p className="text-zinc-300 text-xs leading-relaxed">
          To transition this portfolio to a remote Supabase cloud backend with PostgreSQL, remote Auth, and S3-compatible cloud image buckets, follow these 4 straightforward steps:
        </p>

        {/* Steps List */}
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-850 space-y-1">
            <p className="font-bold text-white text-xs">Step 1: Create a Supabase Project</p>
            <p className="text-zinc-400 text-xs">
              Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-violet-400 underline">supabase.com</a>, create a free organization and a new project named <code className="text-zinc-300 font-mono">abdullah-portfolio</code>.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-850 space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-bold text-white text-xs">Step 2: Run SQL Schema in SQL Editor</p>
              <button
                onClick={() => copyToClipboard(supabaseSchemaSql, 'sql')}
                className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300"
              >
                {copiedSection === 'sql' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSection === 'sql' ? 'Copied' : 'Copy SQL'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-black text-[11px] font-mono text-zinc-300 overflow-x-auto max-h-48 border border-zinc-800">
              {supabaseSchemaSql}
            </pre>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-850 space-y-1">
            <p className="font-bold text-white text-xs">Step 3: Create Storage Bucket</p>
            <p className="text-zinc-400 text-xs">
              Under Storage, create a bucket named <code className="text-zinc-300 font-mono">portfolio-assets</code>. Toggle "Public bucket" to ON so project images render for visitors without signed token expiration.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-850 space-y-1">
            <p className="font-bold text-white text-xs">Step 4: Add Environment Variables in .env</p>
            <p className="text-zinc-400 text-xs">
              Copy your Project URL and Anon Key into <code className="text-zinc-300 font-mono">.env</code>:
            </p>
            <pre className="p-2.5 rounded-lg bg-black text-[11px] font-mono text-zinc-300 border border-zinc-800">
              VITE_SUPABASE_URL="https://your-project-id.supabase.co"{'\n'}
              VITE_SUPABASE_ANON_KEY="your-anon-public-key"
            </pre>
          </div>
        </div>

      </div>

    </div>
  );
};
