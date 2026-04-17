/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  HandCoins, 
  Users, 
  ChevronRight, 
  ArrowRight,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  CreditCard,
  Briefcase,
  TrendingUp,
  Globe,
  Target,
  CheckCircle2
} from 'lucide-react';
import { 
  UserRole, 
  FUNDING_TYPES, 
  MOCK_FUNDING_OPS,
  MOCK_MSME_DEALS,
  calculateMatchScore,
  MSMEDeal,
  PROFILE_STEPS
} from './constants';

// Internal Components
const Header = ({ 
  role, 
  setRole, 
  view, 
  setView 
}: { 
  role: UserRole, 
  setRole: (r: UserRole) => void,
  view: string,
  setView: (v: string) => void
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bento-bg/80 backdrop-blur-md border-b border-bento-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer group" 
            onClick={() => setView('landing')}
          >
            <div className="bg-bento-primary p-1.5 rounded-lg group-hover:bg-bento-accent transition-colors">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-bento-primary tracking-tight">Udyam<span className="text-bento-accent">Setu</span></span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => setView('landing')} className={`text-sm font-semibold transition-colors ${view === 'landing' ? 'text-bento-accent' : 'text-bento-muted hover:text-bento-accent'}`}>Home</button>
            <button className="text-sm font-semibold text-bento-muted hover:text-bento-accent transition-colors">Solutions</button>
            
            {role ? (
              <div className="flex items-center space-x-4 pl-4 border-l border-bento-border">
                <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border border-bento-border shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center font-bold text-[10px] text-bento-primary tracking-tighter">AA</div>
                  <span className="text-xs font-bold text-bento-primary">Arjun A.</span>
                </div>
                <button 
                  onClick={() => { setRole(null); setView('landing'); }}
                  className="text-bento-muted hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setView('auth')}
                  className="text-sm font-semibold text-bento-muted hover:text-bento-accent transition-colors"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setView('auth')}
                  className="bg-bento-accent text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  Raise Capital
                </button>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <button onClick={() => { setView('landing'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900">Home</button>
              <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600">Solutions</button>
              {role ? (
                <>
                  <button onClick={() => { setView('dashboard'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-indigo-600">Dashboard</button>
                  <button onClick={() => { setRole(null); setView('landing'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-red-500">Sign Out</button>
                </>
              ) : (
                <button onClick={() => { setView('auth'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-indigo-600">Join Platform</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Landing = ({ onJoin }: { onJoin: () => void }) => {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-bento-accent-soft text-bento-accent mb-6">
              <Globe className="w-4 h-4 mr-2" />
              Bharat's MSME Funding Aggregator
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-bento-primary leading-tight mb-8 font-display tracking-tight">
              Connect. Fund.<br />Scale Fast.
            </h1>
            <p className="text-base text-bento-muted mb-10 max-w-xl leading-relaxed">
              Access 150+ institutional investors, VC firms, and discount billing partners tailored for Indian MSMEs looking to bridge the gap between ambition and capital.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={onJoin}
                className="bg-bento-accent text-white px-8 py-3.5 rounded-xl text-base font-bold hover:bg-blue-700 transition-all flex items-center justify-center group shadow-xl shadow-blue-100"
              >
                Raise Capital Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={onJoin}
                className="bg-white text-bento-primary border-1.5 border-bento-border px-8 py-3.5 rounded-xl text-base font-bold hover:bg-gray-50 transition-all flex items-center justify-center"
              >
                Investor Portal
              </button>
            </div>

            <div className="mt-12 flex items-center space-x-8 grayscale opacity-40 overflow-hidden whitespace-nowrap">
              <div className="flex items-center space-x-2 font-bold text-xs uppercase tracking-widest">SIDBI</div>
              <div className="flex items-center space-x-2 font-bold text-xs uppercase tracking-widest">Invest India</div>
              <div className="flex items-center space-x-2 font-bold text-xs uppercase tracking-widest">Startup India</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-indigo-600/10 to-emerald-600/10 rounded-3xl p-8 aspect-square relative overflow-hidden flex items-center justify-center">
              <div className="absolute top-10 right-10 bg-white p-6 rounded-2xl shadow-xl shadow-indigo-100 z-10 max-w-[200px]">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active Deal</span>
                </div>
                <div className="text-xl font-bold text-gray-900">₹12.5 Cr</div>
                <div className="text-xs text-gray-500">Seed round for Textile MSME</div>
              </div>
              
              <div className="absolute bottom-10 left-10 bg-white p-6 rounded-2xl shadow-xl shadow-emerald-100 z-10">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-gray-900">Daily Growth</span>
                </div>
                <div className="flex space-x-1 h-12 items-end">
                   {[4,7,5,8,6,9,11,8,10].map((h, i) => (
                     <div key={i} className="w-2 bg-indigo-600 rounded-t" style={{ height: `${h*4}px` }} />
                   ))}
                </div>
              </div>

              <div className="w-4/5 h-4/5 border-4 border-dashed border-gray-200 rounded-full animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-400">
                   <Users className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Funding Types */}
      <section className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Our Connection Channels</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We aggregate diverse funding sources tailored to your MSME's lifecycle stage and immediate capital needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FUNDING_TYPES.map((type, idx) => (
            <motion.div 
              key={type.id}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-3xl border ${type.color} flex flex-col transition-all cursor-default`}
            >
              <div className="mb-6">
                <type.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{type.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">{type.description}</p>
              <button className="text-indigo-600 text-sm font-bold flex items-center group">
                Learn more <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Auth = ({ onComplete }: { onComplete: (role: UserRole) => void }) => {
  const [step, setStep] = useState<'role' | 'form'>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  return (
    <div className="pt-32 pb-16 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-white p-8 sm:p-12 rounded-[2rem] shadow-2xl shadow-blue-50 border border-bento-border"
      >
        {step === 'role' ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-4 text-bento-primary font-display">Join the Ecosystem</h2>
            <p className="text-center text-bento-muted mb-10 text-sm">Select your account type to get started on UdyamSetu.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => { setSelectedRole('msme'); setStep('form'); }}
                className="group p-8 rounded-bento border-1.5 border-bento-border hover:border-bento-accent transition-all text-left bg-bento-bg hover:bg-white"
              >
                <div className="bg-bento-primary text-white p-3 rounded-xl w-fit mb-6 shadow-lg shadow-gray-200 transition-transform group-hover:scale-110">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-bento-primary mb-2">MSME Company</h3>
                <p className="text-bento-muted text-[11px] leading-relaxed">Looking for capital to scale your business operations.</p>
              </button>

              <button 
                onClick={() => { setSelectedRole('investor'); setStep('form'); }}
                className="group p-8 rounded-bento border-1.5 border-bento-border hover:border-emerald-600 transition-all text-left bg-bento-bg hover:bg-white"
              >
                <div className="bg-emerald-600 text-white p-3 rounded-xl w-fit mb-6 shadow-lg shadow-emerald-50 transition-transform group-hover:scale-110">
                  <HandCoins className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-bento-primary mb-2">Investor</h3>
                <p className="text-bento-muted text-[11px] leading-relaxed">Looking for high-potential Indian MSMEs to fund.</p>
              </button>
            </div>
            
            <p className="text-center mt-8 text-xs text-bento-muted">Already have an account? <span className="text-bento-accent font-bold cursor-pointer">Log in</span></p>
          </>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-4">
              <button onClick={() => setStep('role')} className="p-2 hover:bg-bento-bg rounded-full transition-colors text-bento-muted">
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <h2 className="text-xl font-bold text-bento-primary font-display">{selectedRole === 'msme' ? 'MSME Registration' : 'Investor Registration'}</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-black text-bento-muted mb-1.5 uppercase tracking-widest text-[10px]">Email Address</label>
                <input type="email" placeholder="name@company.in" className="w-full px-5 py-3 rounded-xl border border-bento-border focus:outline-none focus:ring-2 focus:ring-bento-accent/10 focus:border-bento-accent bg-bento-bg transition-all font-medium text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-black text-bento-muted mb-1.5 uppercase tracking-widest text-[10px]">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-5 py-3 rounded-xl border border-bento-border focus:outline-none focus:ring-2 focus:ring-bento-accent/10 focus:border-bento-accent bg-bento-bg transition-all font-medium text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-black text-bento-muted mb-1.5 uppercase tracking-widest text-[10px]">Phone Number</label>
                  <input type="tel" placeholder="+91 00000 00000" className="w-full px-5 py-3 rounded-xl border border-bento-border focus:outline-none focus:ring-2 focus:ring-bento-accent/10 focus:border-bento-accent bg-bento-bg transition-all font-medium text-sm" />
                </div>
              </div>
            </div>

            <button 
              onClick={() => onComplete(selectedRole)}
              className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg text-sm ${selectedRole === 'msme' ? 'bg-bento-accent hover:bg-blue-700 text-white shadow-blue-100' : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-50'}`}
            >
              Continue to Dashboard
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const MSMEDashboard = () => {
  const [completedSteps, setCompletedSteps] = useState<string[]>(['basic', 'team']);
  
  const totalWeight = PROFILE_STEPS.reduce((acc, step) => acc + step.weight, 0);
  const currentWeight = PROFILE_STEPS
    .filter(step => completedSteps.includes(step.id))
    .reduce((acc, step) => acc + step.weight, 0);
  const progressPercent = Math.round((currentWeight / totalWeight) * 100);

  const toggleStep = (id: string) => {
    setCompletedSteps(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-bento-primary">Dashboard Overview</h1>
          <p className="text-sm text-bento-muted font-medium">Shri Balaji Textiles • UDYAM-GJ-01-0023456</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-bento-border shadow-sm">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-bento-primary">AA</div>
            <span className="text-sm font-semibold">Arjun Agarwal</span>
          </div>
          <button className="bg-bento-accent text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            Raise Capital
          </button>
        </div>
      </div>

      <div className="bento-grid">
        {/* Main Hero Card - Spans 2x2 */}
        <div className="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-bento-primary to-slate-700 rounded-bento p-8 text-white relative overflow-hidden flex flex-col justify-between border-0 shadow-xl">
          <TrendingUp className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10" />
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-4 block italic">Platform Strategy</span>
            <h2 className="text-4xl font-bold mb-4 font-display leading-tight">Connect. Fund.<br />Scale Fast.</h2>
            <p className="text-white/80 text-sm max-w-md leading-relaxed mb-8">Access 150+ institutional investors, VC firms, and discount billing partners tailored for Indian MSMEs.</p>
            <button className="bg-bento-accent text-white px-6 py-3 rounded-xl font-bold text-sm w-fit shadow-lg shadow-blue-900/20">Raise Capital Now</button>
          </div>
          <p className="text-[10px] text-white/40 font-medium">Secured by SEBI & RBI Guidelines</p>
        </div>

        {/* Vital Stats */}
        <div className="bg-white border-1.5 border-bento-border rounded-bento p-6 flex flex-col justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-bento-muted mb-2 block">Active Requests</span>
          <div>
            <div className="text-3xl font-bold text-bento-primary">₹14.2 Cr</div>
            <div className="text-xs font-bold text-bento-success mt-1">+12% from last month</div>
          </div>
        </div>

        <div className="bg-white border-1.5 border-bento-border rounded-bento p-6 flex flex-col justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-bento-muted mb-2 block">Matches Found</span>
          <div>
            <div className="text-3xl font-bold text-bento-primary">24</div>
            <div className="text-xs font-bold text-bento-accent mt-1">8 High Priority</div>
          </div>
        </div>

        {/* Top Investors - Tall Card */}
        <div className="lg:row-span-2 bg-white border-1.5 border-bento-border rounded-bento p-6 flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-bento-muted mb-6 block">Top Matching Feed</span>
          <div className="space-y-4 flex-grow">
            {[
              { name: 'Peak XV Partners', type: 'Venture Capital', tag: 'Active' },
              { name: 'SIDBI Ventures', type: 'Institutional', tag: 'Govt' },
              { name: 'InCred Finance', type: 'NBFC / Debt', tag: 'Debt' },
              { name: 'Unicorn India', type: 'Early Stage', tag: 'VC' },
            ].map((investor, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-xl border border-bento-border bg-bento-bg/50">
                <div>
                  <h4 className="text-xs font-bold text-bento-primary">{investor.name}</h4>
                  <p className="text-[10px] text-bento-muted">{investor.type}</p>
                </div>
                <span className="text-[8px] font-black uppercase bg-bento-accent-soft text-bento-accent px-2 py-1 rounded-md">{investor.tag}</span>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-2.5 text-xs font-bold text-bento-accent border border-bento-accent/20 rounded-xl hover:bg-bento-accent-soft transition-colors">View All Investors</button>
        </div>

        {/* Billing Facility - Wide Card */}
        <div className="lg:col-span-2 bg-[#fdf4ff] border-1.5 border-[#f5d0fe] rounded-bento p-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#a21caf] mb-2 block">Discount Billing Facility</span>
            <div className="text-3xl font-bold text-[#86198f]">₹85,00,000</div>
            <p className="text-[10px] text-[#a21caf] mt-1 font-medium">Pre-approved credit line available for invoices</p>
          </div>
          <button className="bg-[#a21caf] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-fuchsia-100 italic">Upload Invoice</button>
        </div>

        {/* Progress Card */}
        <div className="bg-white border-1.5 border-bento-border rounded-bento p-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-bento-muted mb-4 block">Profile Completion</span>
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold text-bento-primary">Overall Progress</span>
              <span className="text-xs font-black text-bento-accent">{progressPercent}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-bento-accent rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="text-[10px] text-bento-muted leading-relaxed">Boost your matching score by completing critical documentation.</p>
          </div>
        </div>

        {/* Profile Checklist - New Card */}
        <div className="bg-white border-1.5 border-bento-border rounded-bento p-6 lg:row-start-3 lg:col-start-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-bento-muted mb-6 block">Profile Booster Checklist</span>
          <div className="space-y-4">
            {PROFILE_STEPS.map((step) => (
              <div 
                key={step.id} 
                className={`flex gap-3 p-3 rounded-xl border transition-all cursor-pointer ${completedSteps.includes(step.id) ? 'bg-emerald-50 border-emerald-100 opacity-60' : 'bg-white border-bento-border hover:border-bento-accent shadow-sm'}`}
                onClick={() => toggleStep(step.id)}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${completedSteps.includes(step.id) ? 'bg-emerald-500 border-emerald-500' : 'border-bento-border'}`}>
                  {completedSteps.includes(step.id) && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-bento-primary">{step.title}</h4>
                    {step.critical && <span className="text-[8px] font-black text-rose-500 uppercase">Score Booster</span>}
                  </div>
                  <p className="text-[10px] text-bento-muted mt-0.5 leading-tight">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Available Opportunities List - Preserved functionality from previous version but styled to match */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-bento-primary mb-6">Explore Funding Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_FUNDING_OPS.map((op) => (
            <div key={op.id} className="bg-white p-6 rounded-bento border-1.5 border-bento-border hover:border-bento-accent transition-all group cursor-pointer shadow-sm hover:shadow-md">
              <div className="flex justify-between items-start mb-4">
                <span className="inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-bento-accent-soft text-bento-accent">{op.type}</span>
                <span className="text-lg font-black text-bento-primary">{op.amount}</span>
              </div>
              <h3 className="text-base font-bold text-bento-primary mb-1 group-hover:text-bento-accent transition-colors">{op.title}</h3>
              <p className="text-xs text-bento-muted mb-4 line-clamp-2">{op.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-bento-border">
                <span className="text-[10px] font-bold text-bento-muted">{op.investorName}</span>
                <ChevronRight className="w-4 h-4 text-bento-accent group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MSMEDetailsModal = ({ msme, onClose }: { msme: MSMEDeal, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-bento-primary/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-bento-border"
      >
        <div className="p-8 border-b border-bento-border flex justify-between items-start bg-bento-bg/50">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-bento-accent text-white rounded-full text-[10px] font-black uppercase tracking-widest leading-none">
                {msme.stage}
              </span>
              <span className="text-bento-muted font-bold text-sm tracking-tight">• {msme.sector}</span>
            </div>
            <h2 className="text-3xl font-black text-bento-primary tracking-tighter">{msme.name}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-bento-border"
          >
            <X className="w-6 h-6 text-bento-muted" />
          </button>
        </div>

        <div className="overflow-y-auto p-8 space-y-10">
          <section>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-bento-muted mb-4 flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5" /> Company History
            </h3>
            <p className="text-bento-primary font-medium leading-relaxed">{msme.history}</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-bento-muted mb-4 flex items-center gap-2">
                <Users className="w-3.5 h-3.5" /> Leadership Team
              </h3>
              <div className="space-y-4">
                {msme.team.map((member, i) => (
                  <div key={i} className="bg-bento-bg/30 p-4 rounded-bento border border-bento-border/50">
                    <div className="font-black text-bento-primary text-sm">{member.name}</div>
                    <div className="text-[10px] font-bold text-bento-accent uppercase tracking-wider mb-1">{member.role}</div>
                    <p className="text-xs text-bento-muted font-medium">{member.bio}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-bento-muted mb-4 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5" /> Product Portfolio
              </h3>
              <div className="space-y-4">
                {msme.products.map((product, i) => (
                  <div key={i} className="bg-white p-4 rounded-bento border border-bento-border shadow-sm">
                    <div className="font-bold text-bento-primary text-sm mb-1">{product.name}</div>
                    <p className="text-xs text-bento-muted font-medium">{product.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-bento-muted mb-4 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5" /> Financial Snapshot
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {msme.financials.map((fin, i) => (
                <div key={i} className="bg-emerald-50 border border-emerald-100 p-5 rounded-bento flex justify-between items-center">
                  <div>
                    <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">FY {fin.year}</div>
                    <div className="text-xl font-black text-emerald-900">{fin.revenue}</div>
                    <div className="text-[9px] font-bold text-emerald-600/80 uppercase">Revenue</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-emerald-700">{fin.profit}</div>
                    <div className="text-[9px] font-bold text-emerald-600/80 uppercase">Profit</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="p-8 border-t border-bento-border bg-gray-50/50 flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-bold text-sm text-bento-muted hover:text-bento-primary transition-colors"
          >
            Close
          </button>
          <button className="bg-bento-accent text-white px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-bento-accent/10 hover:translate-y-[-2px] transition-all">
            Initiate Contact
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const InvestorDashboard = () => {
  const [selectedMsme, setSelectedMsme] = useState<MSMEDeal | null>(null);

  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto space-y-6">
      <AnimatePresence>
        {selectedMsme && (
          <MSMEDetailsModal 
            msme={selectedMsme} 
            onClose={() => setSelectedMsme(null)} 
          />
        )}
      </AnimatePresence>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-bento-primary">Investment Portfolio</h1>
          <p className="text-sm text-bento-muted font-medium">Bharat Capital Partners • Private Equity Fund</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white text-bento-primary border-1.5 border-bento-border px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all shadow-sm">
            Export Analytics
          </button>
          <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-50">
            Find New Deals
          </button>
        </div>
      </div>

      <div className="bento-grid">
        <div className="bg-emerald-50 border-1.5 border-emerald-100 rounded-bento p-6 flex flex-col justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2 block">Total Deployed Capital</span>
          <div className="text-3xl font-black text-emerald-900">₹45.6 Cr</div>
        </div>

        <div className="bg-white border-1.5 border-bento-border rounded-bento p-6 flex flex-col justify-between shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-widest text-bento-muted mb-2 block">MSMEs Funded</span>
          <div className="text-3xl font-black text-bento-primary">12</div>
        </div>

        <div className="bg-white border-1.5 border-bento-border rounded-bento p-6 flex flex-col justify-between shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-widest text-bento-muted mb-2 block">Average Equity Stake</span>
          <div className="text-3xl font-black text-bento-primary">12.5%</div>
        </div>

        <div className="bg-white border-1.5 border-bento-border rounded-bento p-6 flex flex-col justify-between shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-widest text-bento-muted mb-2 block">Total Deal Flow</span>
          <div className="text-3xl font-black text-bento-primary">28</div>
        </div>

        {/* Main Table Card - Wide */}
        <div className="lg:col-span-4 bg-white rounded-bento border-1.5 border-bento-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-bento-border flex justify-between items-center bg-gray-50/50">
            <div>
              <h2 className="text-lg font-bold text-bento-primary font-display tracking-tight uppercase text-[12px]">Top Matching Opportunities</h2>
              <p className="text-[10px] text-bento-muted font-medium mt-1">AI-calculated score based on your investment mandate</p>
            </div>
            <button className="text-bento-accent font-bold text-xs flex items-center hover:translate-x-1 transition-transform">
              Explore All <ChevronRight className="ml-1 w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-gray-50/20">
                  <th className="px-6 py-4 text-left text-[9px] font-black text-bento-muted uppercase tracking-widest">Company</th>
                  <th className="px-6 py-4 text-left text-[9px] font-black text-bento-muted uppercase tracking-widest">Sector</th>
                  <th className="px-6 py-4 text-left text-[9px] font-black text-bento-muted uppercase tracking-widest">Stage</th>
                  <th className="px-6 py-4 text-left text-[9px] font-black text-bento-muted uppercase tracking-widest">Ask Amount</th>
                  <th className="px-6 py-4 text-left text-[9px] font-black text-bento-muted uppercase tracking-widest">Matching Score</th>
                  <th className="px-6 py-4 text-right text-[9px] font-black text-bento-muted uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bento-border">
                {MOCK_MSME_DEALS.map((deal, i) => {
                  const score = calculateMatchScore(deal);
                  return (
                    <tr key={i} className="hover:bg-bento-bg transition-colors group">
                      <td className="px-6 py-5">
                        <div className="font-bold text-bento-primary text-sm">{deal.name}</div>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-bento-muted">
                        <span className="flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5 text-bento-accent/70" />
                          {deal.sector}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm">
                        <span className="px-2 py-0.5 bg-bento-bg text-bento-primary rounded text-[8px] font-black uppercase tracking-widest border border-bento-border">
                          {deal.stage}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-bold text-bento-primary text-sm">{deal.amount}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-16 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-1000 ${score > 850 ? 'bg-emerald-500' : score > 700 ? 'bg-amber-500' : 'bg-rose-500'}`}
                              style={{ width: `${(score / 1000) * 100}%` }}
                            />
                          </div>
                          <div className={`text-sm font-black ${score > 850 ? 'text-bento-success' : score > 700 ? 'text-bento-primary' : 'text-rose-600'}`}>
                            {score}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setSelectedMsme(deal)}
                          className="bg-bento-primary text-white border border-bento-primary px-4 py-2 rounded-xl text-xs font-bold hover:bg-white hover:text-bento-primary transition-all shadow-sm"
                        >
                          Analyze Match
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [role, setRole] = useState<UserRole>(null);
  const [view, setView] = useState<'landing' | 'auth' | 'dashboard'>('landing');

  // Handle successful registration
  const handleAuthComplete = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setView('dashboard');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Header role={role} setRole={setRole} view={view} setView={setView} />
      
      <main>
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <motion.div 
              key="landing"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
            >
              <Landing onJoin={() => setView('auth')} />
            </motion.div>
          )}

          {view === 'auth' && (
            <motion.div 
              key="auth"
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Auth onComplete={handleAuthComplete} />
            </motion.div>
          )}

          {view === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
            >
              {role === 'msme' ? <MSMEDashboard /> : <InvestorDashboard />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-bento-border py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6 group cursor-pointer" onClick={() => setView('landing')}>
              <div className="bg-bento-primary p-1.5 rounded-lg group-hover:bg-bento-accent transition-colors">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-bento-primary tracking-tight">Udyam<span className="text-bento-accent">Setu</span></span>
            </div>
            <p className="text-bento-muted max-w-sm mb-8 leading-relaxed text-sm">
              Empowering India's growth engine. UdyamSetu is a digital bridge connecting MSMEs with tailored capital solutions to drive national innovation.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-xl bg-bento-bg border border-bento-border flex items-center justify-center text-bento-muted hover:text-bento-accent transition-colors cursor-pointer shadow-sm">
                <Globe className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-black text-bento-primary mb-6 uppercase tracking-widest text-[9px]">Solutions</h4>
            <ul className="space-y-4 text-xs font-bold text-bento-muted">
              <li className="hover:text-bento-accent cursor-pointer transition-colors">Debt Financing</li>
              <li className="hover:text-bento-accent cursor-pointer transition-colors">Venture Capital</li>
              <li className="hover:text-bento-accent cursor-pointer transition-colors">Invoice Discounting</li>
              <li className="hover:text-bento-accent cursor-pointer transition-colors">Equity Crowdfunding</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-bento-primary mb-6 uppercase tracking-widest text-[9px]">Contact Us</h4>
            <ul className="space-y-4 text-xs font-bold text-bento-muted">
              <li className="hover:text-bento-accent cursor-pointer">Support@paisabull.com</li>
              <li className="hover:text-bento-accent cursor-pointer">+91 9687404555</li>
              <li className="hover:text-bento-accent cursor-pointer">Ahmedabad.</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-bento-border flex flex-col md:flex-row justify-between items-center text-[9px] font-black uppercase tracking-widest text-bento-muted">
          <p>© 2026 UdyamSetu Bharat. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <span className="hover:text-bento-accent cursor-pointer transition-colors">Privacy Policy</span>
             <span className="hover:text-bento-accent cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
