import React, { useState } from 'react';
import { Mail, MessageSquare, Trash2, Clock, CheckCircle2, AlertCircle, ExternalLink, ArrowUpRight } from 'lucide-react';
import { ClientInquiry, ProfileSettings } from '../../types';
import { storageService } from '../../services/storage';

interface InquiriesManagerProps {
  inquiries: ClientInquiry[];
  profile: ProfileSettings;
  onRefresh: () => void;
}

export const InquiriesManager: React.FC<InquiriesManagerProps> = ({
  inquiries,
  profile,
  onRefresh,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filtered = inquiries.filter((inq) => {
    if (filterStatus === 'All') return true;
    return inq.status === filterStatus;
  });

  const handleStatusChange = (id: string, newStatus: ClientInquiry['status']) => {
    storageService.updateInquiryStatus(id, newStatus);
    onRefresh();
  };

  const handleDelete = (id: string) => {
    storageService.deleteInquiry(id);
    setConfirmDeleteId(null);
    onRefresh();
  };

  const statusColors: Record<ClientInquiry['status'], string> = {
    New: 'text-cyan-400 bg-cyan-950/50 border-cyan-500/30',
    'In Review': 'text-amber-400 bg-amber-950/50 border-amber-500/30',
    Replied: 'text-violet-400 bg-violet-950/50 border-violet-500/30',
    Closed: 'text-zinc-500 bg-zinc-900 border-zinc-800',
  };

  return (
    <div className="space-y-6">
      
      {/* Top Bar: Count & Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h3 className="font-display text-base font-bold text-white">
            Client Inquiries & Freelance Leads ({inquiries.length})
          </h3>
          <p className="text-xs text-zinc-400">
            Real leads submitted by clients through the Hire Me page.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-900 rounded-xl border border-zinc-800 text-xs">
          {['All', 'New', 'In Review', 'Replied', 'Closed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterStatus === st
                  ? 'bg-violet-600 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl bg-zinc-900/40 border border-dashed border-zinc-800">
          <p className="text-xs text-zinc-400">No inquiries found in this status view.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((inq) => {
            const formattedDate = new Date(inq.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            // Clean client WhatsApp link
            const clientPhoneClean = inq.whatsapp ? inq.whatsapp.replace(/[^0-9]/g, '') : '';
            const waReplyText = encodeURIComponent(
              `Hi ${inq.clientName}, this is Abdullah regarding your graphic design inquiry for "${inq.serviceType}". I would be happy to discuss your requirements!`
            );
            const waReplyUrl = clientPhoneClean
              ? `https://wa.me/${clientPhoneClean}?text=${waReplyText}`
              : null;

            const mailtoSubject = encodeURIComponent(`Regarding your design inquiry with Abdullah`);
            const mailtoBody = encodeURIComponent(
              `Hi ${inq.clientName},\n\nThank you for reaching out through my portfolio regarding your "${inq.serviceType}" project.\n\nI reviewed your brief: "${inq.description}"\n\nI would love to collaborate. When would be a good time to discuss the timeline and deliverables?\n\nBest regards,\nAbdullah\nGraphic Designer`
            );
            const mailtoUrl = `mailto:${inq.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

            return (
              <div
                key={inq.id}
                className="rounded-2xl bg-zinc-900/70 border border-zinc-800 p-5 space-y-4 hover:border-zinc-700 transition-colors"
              >
                {/* Header: Name, Service, Status, Date */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-display text-sm font-bold text-white">
                      {inq.clientName}
                    </h4>
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${statusColors[inq.status]}`}
                    >
                      {inq.status}
                    </span>
                    <span className="text-xs text-violet-400 font-medium">
                      {inq.serviceType}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formattedDate}</span>
                  </div>
                </div>

                {/* Description Body */}
                <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-850 text-xs text-zinc-300 leading-relaxed space-y-2">
                  <p className="font-semibold text-zinc-400 text-[11px]">Client Brief:</p>
                  <p>{inq.description}</p>
                  {inq.budget && (
                    <p className="text-[11px] text-emerald-400 pt-1 font-medium">
                      Budget indicated: {inq.budget}
                    </p>
                  )}
                </div>

                {/* Contact info & Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
                  
                  {/* Contact pills */}
                  <div className="flex flex-wrap items-center gap-3 text-zinc-400">
                    <span className="flex items-center gap-1.5 font-mono">
                      <Mail className="w-3.5 h-3.5 text-zinc-500" />
                      {inq.email}
                    </span>
                    {inq.whatsapp && (
                      <span className="flex items-center gap-1.5 font-mono text-zinc-400">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        {inq.whatsapp}
                      </span>
                    )}
                  </div>

                  {/* Reply and Manage controls */}
                  <div className="flex items-center gap-2 flex-wrap">
                    
                    {/* Status Changer */}
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                      className="px-2 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-200"
                    >
                      <option value="New">Mark New</option>
                      <option value="In Review">Mark In Review</option>
                      <option value="Replied">Mark Replied</option>
                      <option value="Closed">Mark Closed</option>
                    </select>

                    {/* WhatsApp Reply Button */}
                    {waReplyUrl && (
                      <a
                        href={waReplyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleStatusChange(inq.id, 'Replied')}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Reply WhatsApp</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}

                    {/* Email Reply Button */}
                    <a
                      href={mailtoUrl}
                      onClick={() => handleStatusChange(inq.id, 'Replied')}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/40 text-xs font-semibold transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Reply Email</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>

                    {/* Delete button with confirmation */}
                    {confirmDeleteId === inq.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(inq.id)}
                          className="px-2 py-1 rounded bg-red-600 text-white text-[11px] font-bold"
                        >
                          Confirm
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
                        onClick={() => setConfirmDeleteId(inq.id)}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
