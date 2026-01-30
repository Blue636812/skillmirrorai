import React, { useState } from 'react';
import { Page, User } from '../types';
import { 
  LayoutDashboard, 
  Mic, 
  Presentation, 
  PenTool, 
  MessageSquare, 
  LogOut, 
  Menu,
  X,
  User as UserIcon
} from 'lucide-react';
import AIOrb from './AIOrb';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: Page.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: Page.INTERVIEW_COACH, label: 'Interview Coach', icon: Mic },
    { id: Page.PRESENTATION_COACH, label: 'Presentation Coach', icon: Presentation },
    { id: Page.WRITING_ASSISTANT, label: 'Writing Assistant', icon: PenTool },
    { id: Page.VIRTUAL_ASSISTANT, label: 'Virtual Assistant', icon: MessageSquare },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 relative">
            <div className="absolute inset-0 bg-blue-500 blur-lg opacity-50 rounded-full"></div>
            <div className="relative z-10 scale-50 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
               <AIOrb state="idle" scale={0.2} />
            </div>
        </div>
        <span className="font-display font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
          SkillMirror AI
        </span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onNavigate(item.id);
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentPage === item.id 
                ? 'bg-blue-600/20 text-blue-100 shadow-[0_0_15px_rgba(37,99,235,0.2)] border border-blue-500/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={20} className={`${currentPage === item.id ? 'text-blue-400' : 'text-gray-500 group-hover:text-blue-400'} transition-colors`} />
            <span className="font-medium text-sm">{item.label}</span>
            {currentPage === item.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
                {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-gray-400 truncate">Pro Plan</p>
            </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background text-white overflow-hidden relative selection:bg-blue-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 h-full border-r border-white/5 bg-background/50 backdrop-blur-xl z-20 relative">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-lg border-b border-white/5 z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
             <div className="w-6 h-6 relative overflow-visible">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-25">
                     <AIOrb state="idle" scale={0.2} />
                 </div>
             </div>
            <span className="font-display font-bold text-lg">SkillMirror</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-300">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
           <div className="absolute top-16 left-0 bottom-0 w-64 bg-slate-900 border-r border-white/10" onClick={e => e.stopPropagation()}>
             <SidebarContent />
           </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto z-10 relative pt-16 md:pt-0 scroll-smooth">
        <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-full">
            {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;