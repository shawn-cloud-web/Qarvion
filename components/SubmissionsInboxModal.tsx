import React, { useState, useEffect } from 'react';
import { 
  ProjectBrief, 
  getStoredBriefs, 
  updateBriefStatus, 
  deleteBrief, 
  clearAllBriefs, 
  exportBriefsToCSV 
} from '../utils/inquiries';
import { 
  X, 
  Mail, 
  Building, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Download, 
  Trash2, 
  Copy, 
  Check, 
  Search, 
  Inbox, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Tag
} from 'lucide-react';

interface SubmissionsInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmissionsInboxModal: React.FC<SubmissionsInboxModalProps> = ({ isOpen, onClose }) => {
  const [briefs, setBriefs] = useState<ProjectBrief[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadBriefs = () => {
    setBriefs(getStoredBriefs());
  };

  useEffect(() => {
    if (isOpen) {
      loadBriefs();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleNewBrief = () => {
      loadBriefs();
    };

    window.addEventListener('qarvion_new_brief', handleNewBrief);
    window.addEventListener('storage', handleNewBrief);
    return () => {
      window.removeEventListener('qarvion_new_brief', handleNewBrief);
      window.removeEventListener('storage', handleNewBrief);
    };
  }, []);

  if (!isOpen) return null;

  const filteredBriefs = briefs.filter(b => {
    const matchesSearch = 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.company && b.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      b.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      b.details.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, newStatus: ProjectBrief['status']) => {
    updateBriefStatus(id, newStatus);
    loadBriefs();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this client brief?')) {
      deleteBrief(id);
      loadBriefs();
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Delete all logged client briefs? This cannot be undone.')) {
      clearAllBriefs();
      loadBriefs();
    }
  };

  const copyBriefToClipboard = (brief: ProjectBrief) => {
    const text = `--- QARVION PROJECT BRIEF ---
Client: ${brief.name}
Email: ${brief.email}
Company: ${brief.company || 'N/A'}
Date: ${new Date(brief.createdAt).toLocaleString()}
Package: ${brief.packageSelected || 'Custom Scope'}
Services: ${brief.services.join(', ')}
Budget: ${brief.budget}
Timeline: ${brief.timeline || 'Standard'}
Status: ${brief.status}

Details & Vision:
${brief.details}
----------------------------`;

    navigator.clipboard.writeText(text);
    setCopiedId(brief.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const countNew = briefs.filter(b => b.status === 'new').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-[#0B132B] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-white/10 bg-gradient-to-r from-[#101B3A] to-[#0B132B] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/30 flex items-center justify-center">
                <Inbox className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold font-['Montserrat'] text-white">
                Client Project Briefs Inbox
              </h2>
              {countNew > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#00D2FF] text-[#0B132B] animate-pulse">
                  {countNew} New
                </span>
              )}
            </div>
            <p className="text-xs md:text-sm text-white/60 font-['Inter']">
              All submitted client inquiries and project scopes are stored here and synced with the <span className="text-[#00D2FF] font-medium">Official Studio Inbox</span>.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-end md:self-auto">
            {briefs.length > 0 && (
              <button
                onClick={() => exportBriefsToCSV(briefs)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white flex items-center gap-1.5 transition-all hover:scale-105"
                title="Download CSV for Excel or Google Sheets"
              >
                <Download className="w-3.5 h-3.5 text-[#00D2FF]" />
                <span>Export CSV</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 md:px-8 border-b border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client, email, company, service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#00D2FF]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['all', 'new', 'in-review', 'contacted', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  filterStatus === status
                    ? 'bg-[#00D2FF] text-[#0B132B]'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {status.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* List of Briefs */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4">
          {filteredBriefs.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-white/5 text-white/30 flex items-center justify-center mx-auto">
                <Inbox className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-white font-['Montserrat']">No submissions match your query</h4>
              <p className="text-xs text-white/50 max-w-sm mx-auto">
                Try clearing your search or filter. Any new submission through the contact or home form will appear here instantly.
              </p>
            </div>
          ) : (
            filteredBriefs.map((brief) => {
              const statusColors: Record<string, string> = {
                'new': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
                'in-review': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
                'contacted': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
                'completed': 'bg-purple-500/10 text-purple-400 border-purple-500/30'
              };

              return (
                <div
                  key={brief.id}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00D2FF]/40 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-bold font-['Montserrat'] text-white">
                          {brief.name}
                        </h3>
                        {brief.company && (
                          <span className="inline-flex items-center gap-1 text-xs text-white/70 bg-white/5 px-2.5 py-0.5 rounded-md border border-white/10">
                            <Building className="w-3 h-3 text-[#00D2FF]" />
                            {brief.company}
                          </span>
                        )}
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColors[brief.status] || 'bg-white/5 text-white/60'}`}>
                          {brief.status.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-white/50 font-['Inter'] flex-wrap">
                        <a 
                          href={`mailto:${brief.email}?subject=Qarvion%20Project%20Brief%20Response%20for%20${encodeURIComponent(brief.name)}`}
                          className="text-[#00D2FF] hover:underline flex items-center gap-1 font-medium"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          {brief.email}
                        </a>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-white/40" />
                          {new Date(brief.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <select
                        value={brief.status}
                        onChange={(e) => handleStatusChange(brief.id, e.target.value as ProjectBrief['status'])}
                        className="bg-[#0A1121] border border-white/10 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#00D2FF] cursor-pointer"
                      >
                        <option value="new">Mark New</option>
                        <option value="in-review">Mark In Review</option>
                        <option value="contacted">Mark Contacted</option>
                        <option value="completed">Mark Completed</option>
                      </select>

                      <button
                        onClick={() => copyBriefToClipboard(brief)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
                        title="Copy Brief Summary"
                      >
                        {copiedId === brief.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => handleDelete(brief.id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                        title="Delete Brief"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Scope Badges */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {brief.packageSelected && (
                      <span className="px-3 py-1 rounded-md bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/30 font-bold flex items-center gap-1.5">
                        <Tag className="w-3 h-3" />
                        Selected Plan: {brief.packageSelected}
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-md bg-[#A3FF12]/10 text-[#A3FF12] border border-[#A3FF12]/30 font-semibold flex items-center gap-1.5">
                      <DollarSign className="w-3 h-3" />
                      Budget: {brief.budget}
                    </span>
                    {brief.services.map((srv) => (
                      <span key={srv} className="px-2.5 py-1 rounded-md bg-white/5 text-white/80 border border-white/10">
                        {srv}
                      </span>
                    ))}
                  </div>

                  {/* Details Body */}
                  <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white/40 block">
                      Client Project Vision & Notes:
                    </span>
                    <p className="text-sm text-white/80 font-['Inter'] whitespace-pre-wrap leading-relaxed">
                      {brief.details || 'No additional details provided.'}
                    </p>
                  </div>

                  {/* Quick Action Footer */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-white/40">
                      Submitted via {brief.source === 'home-page' ? 'Home Quick Contact' : 'Direct Project Brief'}
                    </span>
                    <a
                      href={`mailto:${brief.email}?subject=${encodeURIComponent(`Qarvion Proposal for ${brief.name} - ${brief.packageSelected || 'Brand Project'}`)}&body=${encodeURIComponent(`Hi ${brief.name},\n\nThank you for reaching out to Qarvion regarding your project brief. We have reviewed your requirements for ${brief.services.join(', ')}.\n\nLet's schedule a brief 15-minute consultation to walk through the deliverables, timeline, and exact scope.\n\nBest regards,\nMurshiduzzaman\nFounder & Brand Strategist, Qarvion\nqarviontech@gmail.com`)}`}
                      className="inline-flex items-center gap-1.5 text-[#00D2FF] font-bold hover:underline"
                    >
                      <span>Compose Reply Email</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 md:px-8 border-t border-white/10 bg-gradient-to-r from-[#0B132B] to-[#101B3A] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted local storage with mail backup to <strong className="text-white">Studio Inbox</strong></span>
          </div>

          <div className="flex items-center gap-3">
            {briefs.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-red-400/70 hover:text-red-400 underline transition-colors"
              >
                Clear all records
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-white text-[#0B132B] font-bold hover:bg-[#00D2FF] transition-all"
            >
              Close Inbox
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SubmissionsInboxModal;
