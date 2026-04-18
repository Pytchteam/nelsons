import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, where, getDocs } from 'firebase/firestore';
import { LayoutDashboard, Users, MessageSquare, ClipboardList, CheckCircle, Clock, Trash2, LogOut, ExternalLink, Search, Filter } from 'lucide-react';
import { cn } from '../lib/utils';
import { Lead, QuoteRequest, LeadStatus } from '../types';

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'leads' | 'quotes'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // Check if user is in admins collection or is the master email
        const q = query(collection(db, 'admins'), where('email', '==', u.email));
        const snap = await getDocs(q);
        if (!snap.empty || u.email === 'team@pytchmarketing.com') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    const qLeads = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsubLeads = onSnapshot(qLeads, (snap) => {
      setLeads(snap.docs.map(d => ({ id: d.id, ...d.data() } as Lead)));
    });

    const qQuotes = query(collection(db, 'quotes'), orderBy('createdAt', 'desc'));
    const unsubQuotes = onSnapshot(qQuotes, (snap) => {
      setQuotes(snap.docs.map(d => ({ id: d.id, ...d.data() } as QuoteRequest)));
    });

    return () => { unsubLeads(); unsubQuotes(); };
  }, [isAdmin]);

  const handleStatusChange = async (type: 'leads' | 'quotes', id: string, status: LeadStatus) => {
    try {
      const docRef = doc(db, type, id);
      await updateDoc(docRef, { status });
    } catch (err) {
      console.error("Status Update Error:", err);
    }
  };

  const handleLogin = () => signInWithPopup(auth, new GoogleAuthProvider());
  const handleLogout = () => signOut(auth);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono text-brand-neon uppercase tracking-widest">Initialising Admin System...</div>;

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-panel rounded-3xl p-12 text-center">
          <div className="w-20 h-20 bg-brand-neon rounded-full flex items-center justify-center mx-auto mb-8 font-display font-black text-brand-matte text-2xl">
            A
          </div>
          <h1 className="text-3xl font-display font-black uppercase mb-4">Command <span className="text-brand-neon">Centre</span></h1>
          <p className="text-white/50 mb-8 font-mono text-xs uppercase tracking-widest">Restricted access sales infrastructure. Authenticate to proceed.</p>
          {!user ? (
            <button 
                onClick={handleLogin}
                className="w-full bg-white text-brand-matte py-4 rounded-xl font-display font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:bg-brand-neon"
            >
                Login with Google
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-red-500 text-[10px] font-mono uppercase tracking-widest">Unauthorized: {user.email} is not listed as an administrator.</p>
              <button 
                  onClick={handleLogout}
                  className="w-full border border-white/20 text-white py-4 rounded-xl font-display font-black uppercase tracking-widest"
              >
                  Reset Session
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const filteredContent = activeTab === 'leads' 
    ? leads.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.businessName?.toLowerCase().includes(searchTerm.toLowerCase()))
    : quotes.filter(q => q.productType.toLowerCase().includes(searchTerm.toLowerCase()) || q.leadId?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
           <div>
             <span className="text-brand-neon font-mono text-[10px] uppercase tracking-widest mb-2 block font-black">Backend Visibility Platform</span>
             <h1 className="text-5xl font-display font-black uppercase tracking-tighter">Command <span className="text-brand-neon italic">Centre</span>.</h1>
           </div>
           
           <div className="flex items-center gap-4">
             <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
               <button 
                onClick={() => setActiveTab('leads')}
                className={cn("px-4 py-2 rounded-lg text-[10px] uppercase tracking-widest font-black transition-all", activeTab === 'leads' ? "bg-brand-neon text-brand-matte" : "text-white/50")}
               >
                 Leads
               </button>
               <button 
                onClick={() => setActiveTab('quotes')}
                className={cn("px-4 py-2 rounded-lg text-[10px] uppercase tracking-widest font-black transition-all", activeTab === 'quotes' ? "bg-brand-neon text-brand-matte" : "text-white/50")}
               >
                 Quotes
               </button>
             </div>
             <button onClick={handleLogout} className="p-2 border border-white/10 rounded-xl text-white/50 hover:text-brand-neon transition-colors">
               <LogOut size={18} />
             </button>
           </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
           {[
             { label: 'Total Leads', val: leads.length, icon: <Users size={16} /> },
             { label: 'Active Quotes', val: quotes.filter(q => q.status !== 'Completed').length, icon: <ClipboardList size={16} /> },
             { label: 'In Production', val: leads.filter(l => l.status === 'In Production').length + quotes.filter(q => q.status === 'In Production').length, icon: <Clock size={16} /> },
             { label: 'Win Rate', val: '82%', icon: <CheckCircle size={16} /> }
           ].map(stat => (
             <div key={stat.label} className="p-6 bg-brand-charcoal border border-white/5 rounded-2xl flex items-center justify-between">
               <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">{stat.label}</p>
                  <p className="text-2xl font-display font-black uppercase text-white">{stat.val}</p>
               </div>
               <div className="text-brand-neon/40">{stat.icon}</div>
             </div>
           ))}
        </div>

        {/* List Content */}
        <div className="glass-panel rounded-3xl overflow-hidden border border-white/10">
          <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
             <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input 
                  type="text" 
                  placeholder="Search infrastructure..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-xs outline-none focus:border-brand-neon transition-colors"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
             </div>
             <div className="flex gap-4">
               <button className="flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase tracking-widest hover:text-white transition-colors">
                 <Filter size={14} /> Filter
               </button>
             </div>
          </div>

          <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="bg-brand-matte border-b border-white/10">
                   <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-white/40">Timestamp</th>
                   <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-white/40">Entity Info</th>
                   <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-white/40">Request Details</th>
                   <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-white/40">Status Pipeline</th>
                   <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-white/40 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredContent.map((item: any) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-6 font-mono text-[9px] uppercase tracking-tighter text-white/40">
                         {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : 'Just now'}
                      </td>
                      <td className="px-6 py-6">
                        <p className="text-sm font-display font-bold uppercase tracking-tight">{item.name || 'Anonymous'}</p>
                        <p className="text-[10px] text-brand-neon font-mono uppercase tracking-widest">{item.businessName || item.email}</p>
                        {item.phone && <p className="text-[9px] text-white/30 font-mono">{item.phone}</p>}
                      </td>
                      <td className="px-6 py-6">
                         <div className="flex flex-col gap-1">
                           <span className="text-[10px] font-mono uppercase tracking-widest bg-white/5 px-2 py-1 rounded inline-block w-fit">
                             {item.productType || item.intent || 'General Query'}
                           </span>
                           {item.urgency && <span className="text-[9px] text-red-500 uppercase font-bold tracking-widest">{item.urgency}</span>}
                           {item.fileName && (
                             <a href={item.fileUrl} target="_blank" className="text-[10px] text-brand-neon underline flex items-center gap-1 mt-1">
                               <ExternalLink size={10} /> View Artwork
                             </a>
                           )}
                         </div>
                      </td>
                      <td className="px-6 py-6">
                         <select 
                           className={cn(
                             "bg-transparent border border-white/10 rounded px-2 py-1 text-[10px] font-mono uppercase tracking-widest outline-none transition-colors",
                             item.status === 'New' ? "text-brand-neon border-brand-neon" : "text-white/60"
                           )}
                           value={item.status}
                           onChange={(e) => handleStatusChange(activeTab, item.id, e.target.value as LeadStatus)}
                         >
                            {["New", "Contacted", "Quoting", "Approved", "In Production", "Completed", "Closed"].map(s => (
                              <option key={s} value={s} className="bg-brand-charcoal">{s}</option>
                            ))}
                         </select>
                      </td>
                      <td className="px-6 py-6 text-right">
                         <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 bg-white/5 rounded hover:text-blue-400 transition-colors">
                              <MessageSquare size={14} />
                            </button>
                            <button className="p-2 bg-white/5 rounded hover:text-red-500 transition-colors">
                              <Trash2 size={14} />
                            </button>
                         </div>
                      </td>
                    </tr>
                  ))}
               </tbody>
             </table>
             {filteredContent.length === 0 && (
               <div className="py-20 text-center text-white/20 font-mono text-[10px] uppercase tracking-widest">
                 No infrastructure found matching this query.
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
