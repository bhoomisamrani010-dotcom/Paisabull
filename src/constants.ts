/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Building2, 
  HandCoins, 
  TrendingUp, 
  Users, 
  ChevronRight, 
  ArrowRight, 
  FileText, 
  DollarSign, 
  ShieldCheck, 
  Globe,
  PlusCircle,
  Clock,
  CheckCircle2,
  PieChart,
  Target,
  Briefcase
} from 'lucide-react';

export type UserRole = 'msme' | 'investor' | null;

export interface FundingOpportunity {
  id: string;
  title: string;
  type: 'Debt' | 'Equity' | 'Billing Discount' | 'VC';
  amount: string;
  amountInCr: number;
  interest?: string;
  equity?: string;
  investorName: string;
  description: string;
  sector: string;
  stage: 'Micro' | 'Small' | 'Medium' | 'Seed' | 'Series A' | 'Series B' | 'Growth' | 'Early';
}

export interface InvestorPreferences {
  preferredSectors: string[];
  preferredStages: string[];
  minAmountCr: number;
  maxAmountCr: number;
}

export const DEFAULT_INVESTOR_PREFS: InvestorPreferences = {
  preferredSectors: ['Manufacturing', 'Automotive', 'Packaging', 'Agri-tech'],
  preferredStages: ['Series A', 'Growth', 'Series B'],
  minAmountCr: 0.5,
  maxAmountCr: 10
};

export const calculateMatchScore = (msme: any, prefs: InvestorPreferences = DEFAULT_INVESTOR_PREFS): number => {
  let score = 500; // Base score

  // Sector Match (Max +200)
  if (prefs.preferredSectors.includes(msme.sector)) {
    score += 200;
  } else {
    score += 50;
  }

  // Stage Match (Max +150)
  if (prefs.preferredStages.includes(msme.stage)) {
    score += 150;
  } else {
    score += 30;
  }

  // Amount Range Match (Max +150)
  if (msme.amountInCr >= prefs.minAmountCr && msme.amountInCr <= prefs.maxAmountCr) {
    score += 150;
  } else {
    const diff = Math.min(Math.abs(msme.amountInCr - prefs.minAmountCr), Math.abs(msme.amountInCr - prefs.maxAmountCr));
    score += Math.max(0, 100 - (diff * 10));
  }

  return Math.min(999, Math.round(score));
};

export const FUNDING_TYPES = [
  {
    id: 'vc',
    title: 'Venture Capital',
    description: 'High-growth potential equity funding for startups.',
    icon: TrendingUp,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100'
  },
  {
    id: 'billing',
    title: 'Discount Billing',
    description: 'Immediate liquidity by discounting pending invoices.',
    icon: FileText,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
  },
  {
    id: 'long-term',
    title: 'Long-term Investment',
    description: 'Stable capital for established MSMEs looking to scale.',
    icon: Building2,
    color: 'bg-amber-50 text-amber-600 border-amber-100'
  },
  {
    id: 'angel',
    title: 'Angel Investors',
    description: 'Early-stage support from high-net-worth individuals.',
    icon: HandCoins,
    color: 'bg-rose-50 text-rose-600 border-rose-100'
  }
];

export const MOCK_FUNDING_OPS: FundingOpportunity[] = [
  {
    id: '1',
    title: 'Series A Growth Fund',
    type: 'VC',
    amount: '₹5Cr - ₹20Cr',
    amountInCr: 10,
    equity: '10-15%',
    investorName: 'Bharat Ventures',
    description: 'Looking for tech-enabled MSMEs in manufacturing.',
    sector: 'Manufacturing',
    stage: 'Series A'
  },
  {
    id: '2',
    title: 'Invoice Discounting Facility',
    type: 'Billing Discount',
    amount: 'Up to ₹2Cr',
    amountInCr: 2,
    interest: '12% p.a.',
    investorName: 'Liquidity Flow',
    description: 'Fastest way to unlock cash from your enterprise receivables.',
    sector: 'Services',
    stage: 'Early'
  },
  {
    id: '3',
    title: 'Small Business Expansion Loan',
    type: 'Debt',
    amount: '₹50L - ₹5Cr',
    amountInCr: 1,
    interest: '9.5% p.a.',
    investorName: 'Growth Bank of India',
    description: 'Collateral-free loans for MSMEs registered under Udyam.',
    sector: 'Retail',
    stage: 'Small'
  }
];

export interface ProfileStep {
  id: string;
  title: string;
  description: string;
  weight: number;
  critical: boolean;
}

export interface MSMEDeal {
  id: string;
  name: string;
  sector: string;
  stage: string;
  amount: string;
  amountInCr: number;
  history: string;
  team: { name: string; role: string; bio: string }[];
  products: { name: string; description: string }[];
  financials: { year: string; revenue: string; profit: string }[];
}

export const PROFILE_STEPS: ProfileStep[] = [
  { 
    id: 'basic', 
    title: 'Basic Verification', 
    description: 'Udyam Registration & PAN linkage.', 
    weight: 20,
    critical: true 
  },
  { 
    id: 'financials', 
    title: 'Detailed Financials', 
    description: 'Upload GSTR & Audit reports (boosts score by 150 pts).', 
    weight: 30,
    critical: true 
  },
  { 
    id: 'team', 
    title: 'Team Bios', 
    description: 'Add depth to your executive profiles.', 
    weight: 15,
    critical: false 
  },
  { 
    id: 'deck', 
    title: 'Pitch Deck', 
    description: 'Upload latest deck for VCs to review.', 
    weight: 20,
    critical: true 
  },
  { 
    id: 'social', 
    title: 'Digital Presence', 
    description: 'Link website and LinkedIn profiles.', 
    weight: 15,
    critical: false 
  }
];

export const MOCK_MSME_DEALS: MSMEDeal[] = [
  { 
    id: 'msme-1',
    name: 'Aditya Textiles', 
    sector: 'Manufacturing', 
    stage: 'Series A', 
    amount: '₹5.5 Cr', 
    amountInCr: 5.5,
    history: 'Founded in 2012, Aditya Textiles has grown from a local weaving unit to a leading exporter of organic cotton fabrics. We have 3 manufacturing plants across Gujarat.',
    team: [
      { name: 'Aditya Sharma', role: 'CEO', bio: '20+ years in textile industry.' },
      { name: 'Priya Mehra', role: 'COO', bio: 'Expert in supply chain management.' }
    ],
    products: [
      { name: 'Organic Denim', description: 'Sustainable premium denim for global brands.' },
      { name: 'Recycled Polyester', description: 'Eco-friendly blends for sportswear.' }
    ],
    financials: [
      { year: '2025', revenue: '₹42 Cr', profit: '₹4.5 Cr' },
      { year: '2024', revenue: '₹35 Cr', profit: '₹3.2 Cr' }
    ]
  },
  { 
    id: 'msme-2',
    name: 'EcoPack India Ltd', 
    sector: 'Packaging', 
    stage: 'Growth', 
    amount: '₹1.2 Cr', 
    amountInCr: 1.2,
    history: 'EcoPack started in 2018 with a mission to eliminate single-use plastics in the food delivery industry.',
    team: [
      { name: 'Rohan Gupta', role: 'Founder', bio: 'IIT Delhi graduate, sustainability advocate.' }
    ],
    products: [
      { name: 'Cornstarch Containers', description: '100% compostable food containers.' }
    ],
    financials: [
      { year: '2025', revenue: '₹8 Cr', profit: '₹1.1 Cr' }
    ]
  },
  { 
    id: 'msme-3',
    name: 'Precision Auto Tech', 
    sector: 'Automotive', 
    stage: 'Series A', 
    amount: '₹2.5 Cr', 
    amountInCr: 2.5,
    history: 'Established in 2015, we specialize in high-precision machined components for EV manufacturers.',
    team: [
      { name: 'Vikram Singh', role: 'CTO', bio: 'Former engineer at TATA Motors.' }
    ],
    products: [
      { name: 'EV Gearboxes', description: 'Lightweight gearboxes for 2-wheeler EVs.' }
    ],
    financials: [
      { year: '2025', revenue: '₹15 Cr', profit: '₹2 Cr' }
    ]
  },
  { 
    id: 'msme-4',
    name: 'Green Agri Solutions', 
    sector: 'Agri-tech', 
    stage: 'Series B', 
    amount: '₹3.8 Cr', 
    amountInCr: 3.8,
    history: 'Bridging the gap between farmers and technology since 2019.',
    team: [
      { name: 'Dr. Anita Desai', role: 'Head of R&D', bio: 'PhD in Agricultural Sciences.' }
    ],
    products: [
      { name: 'Setu-Monitor', description: 'IoT sensor for soil health tracking.' }
    ],
    financials: [
      { year: '2025', revenue: '₹22 Cr', profit: '₹3.5 Cr' }
    ]
  },
  { 
    id: 'msme-5',
    name: 'Luxe Leather Co', 
    sector: 'Retail', 
    stage: 'Seed', 
    amount: '₹75 L', 
    amountInCr: 0.75,
    history: 'Crafting luxury leather goods for the global market since 2021.',
    team: [
      { name: 'Sana Khan', role: 'Lead Designer', bio: 'NIFT alumna.' }
    ],
    products: [
      { name: 'Premium Handbags', description: 'Hand-crafted Italian leather bags.' }
    ],
    financials: [
      { year: '2025', revenue: '₹3 Cr', profit: '₹40 L' }
    ]
  },
];
