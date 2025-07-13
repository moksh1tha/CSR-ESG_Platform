import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Users, 
  Target, 
  Search, 
  User, 
  MessageSquare, 
  TrendingUp, 
  BookOpen, 
  Settings,
  ChevronRight,
  Play,
  CheckCircle,
  Globe,
  Heart,
  Building,
  Award,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Upload,
  Eye,
  EyeOff,
  Star,
  Filter,
  Download,
  Share2,
  Bell,
  Menu,
  X,
  Zap,
  Shield,
  BarChart3,
  Users2,
  Handshake,
  Lightbulb,
  Rocket,
  CheckSquare,
  Clock,
  TrendingDown,
  Plus,
  Minus,
  ExternalLink,
  Camera,
  Edit,
  Save,
  RefreshCw,
  AlertCircle,
  Info,
  HelpCircle
} from 'lucide-react';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  type: 'csr' | 'ngo';
  organization: string;
  verified: boolean;
  profileComplete: number;
  sdgGoals: number[];
  region: string;
  budget?: string;
  sector?: string;
}

interface SDGGoal {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  category: 'social' | 'environment' | 'economic' | 'infrastructure';
}

interface Organization {
  id: string;
  name: string;
  type: 'csr' | 'ngo';
  logo: string;
  description: string;
  sdgGoals: number[];
  region: string;
  verified: boolean;
  rating: number;
  budget?: string;
  sector: string;
  impactMetrics: {
    projectsFunded?: number;
    beneficiaries?: number;
    fundsDeployed?: string;
    yearsActive?: number;
  };
}

interface Match {
  id: string;
  organization: Organization;
  matchPercentage: number;
  reasons: string[];
  status: 'new' | 'contacted' | 'in-discussion' | 'funded';
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  attachments?: string[];
}

interface Conversation {
  id: string;
  participants: string[];
  organizationName: string;
  lastMessage: string;
  timestamp: Date;
  status: 'pending' | 'in-discussion' | 'funded';
  unreadCount: number;
}

// Mock Data
const sdgGoals: SDGGoal[] = [
  { id: 1, title: "No Poverty", description: "End poverty in all its forms everywhere", icon: "🚫", color: "#E5243B", category: "social" },
  { id: 2, title: "Zero Hunger", description: "End hunger, achieve food security", icon: "🍽️", color: "#DDA63A", category: "social" },
  { id: 3, title: "Good Health", description: "Ensure healthy lives and well-being", icon: "❤️", color: "#4C9F38", category: "social" },
  { id: 4, title: "Quality Education", description: "Ensure inclusive and equitable education", icon: "📚", color: "#C5192D", category: "social" },
  { id: 5, title: "Gender Equality", description: "Achieve gender equality", icon: "⚖️", color: "#FF3A21", category: "social" },
  { id: 6, title: "Clean Water", description: "Ensure water and sanitation for all", icon: "💧", color: "#26BDE2", category: "environment" },
  { id: 7, title: "Affordable Energy", description: "Ensure access to affordable energy", icon: "⚡", color: "#FCC30B", category: "infrastructure" },
  { id: 8, title: "Decent Work", description: "Promote sustained economic growth", icon: "💼", color: "#A21942", category: "economic" },
  { id: 9, title: "Innovation", description: "Build resilient infrastructure", icon: "🏗️", color: "#FD6925", category: "infrastructure" },
  { id: 10, title: "Reduced Inequalities", description: "Reduce inequality within countries", icon: "⚖️", color: "#DD1367", category: "social" },
  { id: 11, title: "Sustainable Cities", description: "Make cities inclusive and sustainable", icon: "🏙️", color: "#FD9D24", category: "infrastructure" },
  { id: 12, title: "Responsible Consumption", description: "Ensure sustainable consumption", icon: "♻️", color: "#BF8B2E", category: "environment" },
  { id: 13, title: "Climate Action", description: "Take urgent action on climate change", icon: "🌍", color: "#3F7E44", category: "environment" },
  { id: 14, title: "Life Below Water", description: "Conserve oceans and marine resources", icon: "🌊", color: "#0A97D9", category: "environment" },
  { id: 15, title: "Life on Land", description: "Protect terrestrial ecosystems", icon: "🌳", color: "#56C02B", category: "environment" },
  { id: 16, title: "Peace & Justice", description: "Promote peaceful and inclusive societies", icon: "⚖️", color: "#00689D", category: "social" },
  { id: 17, title: "Partnerships", description: "Strengthen global partnerships", icon: "🤝", color: "#19486A", category: "economic" }
];

const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'TechCorp Foundation',
    type: 'csr',
    logo: '🏢',
    description: 'Leading technology company focused on education and digital literacy initiatives.',
    sdgGoals: [4, 8, 9],
    region: 'Global',
    verified: true,
    rating: 4.8,
    budget: '$1M - $5M',
    sector: 'Technology',
    impactMetrics: {
      projectsFunded: 45,
      beneficiaries: 125000,
      fundsDeployed: '$12.5M',
      yearsActive: 8
    }
  },
  {
    id: '2',
    name: 'Green Earth Initiative',
    type: 'ngo',
    logo: '🌱',
    description: 'Environmental NGO working on climate action and sustainable development.',
    sdgGoals: [13, 14, 15],
    region: 'Asia-Pacific',
    verified: true,
    rating: 4.6,
    sector: 'Environment',
    impactMetrics: {
      beneficiaries: 50000,
      yearsActive: 12
    }
  },
  {
    id: '3',
    name: 'Healthcare Plus',
    type: 'ngo',
    logo: '🏥',
    description: 'Healthcare NGO providing medical services to underserved communities.',
    sdgGoals: [3, 1, 10],
    region: 'Africa',
    verified: true,
    rating: 4.9,
    sector: 'Healthcare',
    impactMetrics: {
      beneficiaries: 75000,
      yearsActive: 15
    }
  }
];

const mockStats = {
  projectsFunded: 1247,
  sdgGoalsImpacted: 17,
  verifiedNGOs: 892,
  fundsDeployed: '$45.2M'
};

const successStories = [
  {
    id: '1',
    title: 'Digital Literacy for Rural Communities',
    funder: 'TechCorp Foundation',
    ngo: 'Rural Education Trust',
    impact: '25,000 students trained',
    sdg: [4, 8],
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    title: 'Clean Water Access Project',
    funder: 'Global Water Fund',
    ngo: 'Water for All',
    impact: '50 villages with clean water',
    sdg: [6, 3],
    image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    title: 'Renewable Energy Initiative',
    funder: 'Green Energy Corp',
    ngo: 'Solar Solutions',
    impact: '100 solar installations',
    sdg: [7, 13],
    image: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CSR Director, TechCorp',
    content: 'CSR Impact Hub transformed how we approach partnerships. The AI matching is incredibly accurate.',
    rating: 5
  },
  {
    id: '2',
    name: 'Dr. Rajesh Patel',
    role: 'Founder, Education First NGO',
    content: 'We found our perfect funding partner within weeks. The platform streamlined our entire process.',
    rating: 5
  }
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSDGs, setSelectedSDGs] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'all',
    sector: 'all',
    region: 'all',
    sdg: 'all'
  });

  // Navigation
  const navigate = (page: string) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  // Header Component
  const Header = () => (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('home')}>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Handshake className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">CSR Impact Hub</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => navigate('home')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                currentPage === 'home' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('sdg-goals')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                currentPage === 'sdg-goals' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              SDG Goals
            </button>
            <button
              onClick={() => navigate('explore')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                currentPage === 'explore' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => navigate('impact-stories')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                currentPage === 'impact-stories' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Impact Stories
            </button>
            <button
              onClick={() => navigate('resources')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                currentPage === 'resources' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Resources
            </button>
            {user && (
              <>
                <button
                  onClick={() => navigate('dashboard')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    currentPage === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('matches')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    currentPage === 'matches' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Matches
                </button>
                <button
                  onClick={() => navigate('messages')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    currentPage === 'messages' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Messages
                </button>
                <button
                  onClick={() => navigate('profile')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    currentPage === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Profile
                </button>
              </>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{user.name.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={() => setUser(null)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('login')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Login / Register
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => navigate('home')}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => navigate('sdg-goals')}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md w-full text-left"
            >
              SDG Goals
            </button>
            <button
              onClick={() => navigate('explore')}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md w-full text-left"
            >
              Explore
            </button>
            <button
              onClick={() => navigate('impact-stories')}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md w-full text-left"
            >
              Impact Stories
            </button>
            <button
              onClick={() => navigate('resources')}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md w-full text-left"
            >
              Resources
            </button>
            {user && (
              <>
                <button
                  onClick={() => navigate('dashboard')}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md w-full text-left"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('matches')}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md w-full text-left"
                >
                  Matches
                </button>
                <button
                  onClick={() => navigate('messages')}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md w-full text-left"
                >
                  Messages
                </button>
                <button
                  onClick={() => navigate('profile')}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md w-full text-left"
                >
                  Profile
                </button>
              </>
            )}
            {!user && (
              <button
                onClick={() => navigate('login')}
                className="block px-3 py-2 text-base font-medium bg-blue-600 text-white rounded-md w-full text-left"
              >
                Login / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Handshake className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">CSR Impact Hub</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Bridging the gap between purpose and impact. Connect with verified organizations 
              to create meaningful partnerships aligned with UN SDG goals.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span className="text-sm">contact@csrimpacthub.com</span>
              </div>
            </div>
            <div className="flex space-x-4 mt-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
            </div>
            <div className="flex space-x-4 mt-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('home')} className="text-gray-300 hover:text-white text-sm">Home</button></li>
              <li><button onClick={() => navigate('sdg-goals')} className="text-gray-300 hover:text-white text-sm">SDG Goals</button></li>
              <li><button onClick={() => navigate('explore')} className="text-gray-300 hover:text-white text-sm">Explore Organizations</button></li>
              <li><button onClick={() => navigate('impact-stories')} className="text-gray-300 hover:text-white text-sm">Impact Stories</button></li>
              <li><button onClick={() => navigate('resources')} className="text-gray-300 hover:text-white text-sm">Resources</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 CSR Impact Hub. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  // Home Page Component
  const HomePage = () => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [email, setEmail] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentStoryIndex((prev) => (prev + 1) % successStories.length);
      }, 5000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Bridge the Gap Between
                <span className="block text-blue-200">Purpose and Impact</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Connect CSR-funding organizations with mission-driven impact partners 
                through AI-powered matching aligned with UN SDG goals
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('register')}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Building className="w-5 h-5" />
                  <span>Join as CSR Organization</span>
                </button>
                <button
                  onClick={() => navigate('register')}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Heart className="w-5 h-5" />
                  <span>Join as Impact Organization</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Real-time Stats */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{mockStats.projectsFunded}</div>
                <div className="text-gray-600 font-medium">Projects Funded</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{mockStats.sdgGoalsImpacted}</div>
                <div className="text-gray-600 font-medium">SDG Goals Impacted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{mockStats.verifiedNGOs}</div>
                <div className="text-gray-600 font-medium">Verified NGOs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{mockStats.fundsDeployed}</div>
                <div className="text-gray-600 font-medium">Funds Deployed</div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our AI-powered platform streamlines the partnership process from discovery to impact tracking
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Register</h3>
                <p className="text-gray-600">Create your organization profile with verification documents and impact goals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Select SDG Goals</h3>
                <p className="text-gray-600">Choose from 17 UN SDG goals that align with your mission and impact areas</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Get Matched via AI</h3>
                <p className="text-gray-600">Our intelligent algorithm finds perfect partners based on goals, geography, and impact</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">4. Collaborate & Track</h3>
                <p className="text-gray-600">Work together seamlessly and track real-time impact metrics and outcomes</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto">
                <Play className="w-5 h-5" />
                <span>Watch Demo Video</span>
              </button>
            </div>
          </div>
        </section>

        {/* Why Use CSR Impact Hub */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Use CSR Impact Hub?</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* For Funders */}
              <div className="bg-blue-50 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Building className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900">For CSR Funders</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">Transparent impact tracking with real-time metrics</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">Goal-aligned partnerships based on UN SDG framework</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">SDG-centric giving with measurable outcomes</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">Verified NGO partners with proven track records</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">Streamlined compliance and reporting tools</span>
                  </li>
                </ul>
              </div>

              {/* For NGOs */}
              <div className="bg-green-50 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Heart className="w-8 h-8 text-green-600" />
                  <h3 className="text-2xl font-bold text-gray-900">For Impact Organizations</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-gray-700">Access to verified CSR funders actively seeking partners</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-gray-700">Built-in proposal builder with templates and guidance</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-gray-700">Automated reporting tools for impact measurement</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-gray-700">Direct communication channels with potential funders</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-gray-700">Capacity building resources and best practices</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Success Stories */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Success Stories</h2>
              <p className="text-xl text-gray-600">Real partnerships creating measurable impact</p>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentStoryIndex * 100}%)` }}
                >
                  {successStories.map((story, index) => (
                    <div key={story.id} className="w-full flex-shrink-0">
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-1/2">
                            <img 
                              src={story.image} 
                              alt={story.title}
                              className="w-full h-64 md:h-full object-cover"
                            />
                          </div>
                          <div className="md:w-1/2 p-8">
                            <div className="flex items-center space-x-2 mb-4">
                              {story.sdg.map(sdgId => (
                                <span 
                                  key={sdgId}
                                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                >
                                  SDG {sdgId}
                                </span>
                              ))}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{story.title}</h3>
                            <div className="space-y-2 mb-6">
                              <p className="text-gray-600">
                                <span className="font-medium">Funder:</span> {story.funder}
                              </p>
                              <p className="text-gray-600">
                                <span className="font-medium">Partner:</span> {story.ngo}
                              </p>
                              <p className="text-gray-600">
                                <span className="font-medium">Impact:</span> {story.impact}
                              </p>
                            </div>
                            <button className="text-blue-600 font-medium hover:text-blue-700 flex items-center space-x-1">
                              <span>Read Full Story</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="flex justify-center space-x-2 mt-6">
                {successStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStoryIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentStoryIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SDG Goal Carousel */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">UN Sustainable Development Goals</h2>
              <p className="text-xl text-gray-600">Align your impact with global sustainability targets</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {sdgGoals.slice(0, 12).map((goal) => (
                <div
                  key={goal.id}
                  className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                  style={{ borderColor: goal.color + '40' }}
                >
                  <div className="text-3xl mb-2">{goal.icon}</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">SDG {goal.id}</div>
                  <div className="text-xs text-gray-600">{goal.title}</div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => navigate('sdg-goals')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                View All SDG Goals
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Partners Say</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white bg-opacity-10 rounded-2xl p-8">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-lg mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-blue-200">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Get the latest insights on CSR trends, impact stories, and partnership opportunities
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                No spam, unsubscribe at any time
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  };

  // Login/Register Page Component
  const LoginPage = () => {
    const [activeTab, setActiveTab] = useState<'csr' | 'ngo'>('csr');
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
      orgName: '',
      website: '',
      industry: '',
      contactName: '',
      email: '',
      password: '',
      confirmPassword: '',
      mission: '',
      registrationNo: '',
      sector: '',
      budgetRange: '',
      regions: [] as string[],
      sdgGoals: [] as number[],
      fundingNeeds: '',
      timeline: '',
      agreeTerms: false
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (field: string, value: any) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSDGToggle = (sdgId: number) => {
      setFormData(prev => ({
        ...prev,
        sdgGoals: prev.sdgGoals.includes(sdgId)
          ? prev.sdgGoals.filter(id => id !== sdgId)
          : [...prev.sdgGoals, sdgId]
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Mock user creation
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.contactName,
        email: formData.email,
        type: activeTab,
        organization: formData.orgName,
        verified: false,
        profileComplete: 60,
        sdgGoals: formData.sdgGoals,
        region: formData.regions[0] || 'Global',
        budget: formData.budgetRange,
        sector: formData.sector || formData.industry
      };
      setUser(newUser);
      navigate('dashboard');
    };

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Join CSR Impact Hub'}
            </h1>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to your account' : 'Create your account to start making impact'}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('csr')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'csr'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Building className="w-5 h-5 mx-auto mb-1" />
                  CSR Organization
                </button>
                <button
                  onClick={() => setActiveTab('ngo')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'ngo'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Heart className="w-5 h-5 mx-auto mb-1" />
                  Impact Organization
                </button>
              </nav>
            </div>

            <div className="p-8">
              {/* Login/Register Toggle */}
              <div className="flex justify-center mb-8">
                <div className="bg-gray-100 rounded-lg p-1 flex">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`px-6 py-2 rounded-md font-medium transition-colors ${
                      isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`px-6 py-2 rounded-md font-medium transition-colors ${
                      !isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    Register
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <>
                    {/* Organization Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {activeTab === 'csr' ? 'Organization Name' : 'NGO Name'}
                        </label>
                        <input
                          type="text"
                          value={formData.orgName}
                          onChange={(e) => handleInputChange('orgName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={activeTab === 'csr' ? 'TechCorp Foundation' : 'Green Earth Initiative'}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Website
                        </label>
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>

                    {activeTab === 'csr' ? (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Industry Type
                        </label>
                        <select
                          value={formData.industry}
                          onChange={(e) => handleInputChange('industry', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select Industry</option>
                          <option value="technology">Technology</option>
                          <option value="finance">Finance</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="retail">Retail</option>
                          <option value="energy">Energy</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Registration Number
                            </label>
                            <input
                              type="text"
                              value={formData.registrationNo}
                              onChange={(e) => handleInputChange('registrationNo', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="NGO Registration Number"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Sector
                            </label>
                            <select
                              value={formData.sector}
                              onChange={(e) => handleInputChange('sector', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            >
                              <option value="">Select Sector</option>
                              <option value="education">Education</option>
                              <option value="healthcare">Healthcare</option>
                              <option value="environment">Environment</option>
                              <option value="poverty">Poverty Alleviation</option>
                              <option value="women-empowerment">Women Empowerment</option>
                              <option value="rural-development">Rural Development</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mission Statement
                          </label>
                          <textarea
                            value={formData.mission}
                            onChange={(e) => handleInputChange('mission', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Describe your organization's mission and impact goals"
                          />
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person Name
                    </label>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="••••••••"
                        required={!isLogin}
                      />
                    </div>
                  )}
                </div>

                {!isLogin && (
                  <>
                    {/* SDG Goals Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Select SDG Focus Areas (Multi-select)
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
                        {sdgGoals.map((goal) => (
                          <div
                            key={goal.id}
                            onClick={() => handleSDGToggle(goal.id)}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              formData.sdgGoals.includes(goal.id)
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-2xl mb-1">{goal.icon}</div>
                              <div className="text-xs font-medium text-gray-900">SDG {goal.id}</div>
                              <div className="text-xs text-gray-600">{goal.title}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {activeTab === 'csr' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Budget Range for Partnerships
                        </label>
                        <select
                          value={formData.budgetRange}
                          onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select Budget Range</option>
                          <option value="$10K - $50K">$10K - $50K</option>
                          <option value="$50K - $100K">$50K - $100K</option>
                          <option value="$100K - $500K">$100K - $500K</option>
                          <option value="$500K - $1M">$500K - $1M</option>
                          <option value="$1M+">$1M+</option>
                        </select>
                      </div>
                    )}

                    {activeTab === 'ngo' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Funding Needs
                          </label>
                          <input
                            type="text"
                            value={formData.fundingNeeds}
                            onChange={(e) => handleInputChange('fundingNeeds', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., $50,000 for education program"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Timeline
                          </label>
                          <select
                            value={formData.timeline}
                            onChange={(e) => handleInputChange('timeline', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Timeline</option>
                            <option value="immediate">Immediate (0-3 months)</option>
                            <option value="short-term">Short-term (3-6 months)</option>
                            <option value="medium-term">Medium-term (6-12 months)</option>
                            <option value="long-term">Long-term (1+ years)</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Document Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {activeTab === 'csr' 
                          ? 'Upload CSR License / Certificate of Incorporation' 
                          : 'Upload NGO Certification (80G, 12A, FCRA)'
                        }
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PDF, DOC, DOCX up to 10MB
                        </p>
                        <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        required
                      />
                      <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                        I agree to the{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700">Terms & Conditions</a>
                        {' '}and{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
                      </label>
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              {/* Additional Links */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {isLogin ? 'Register here' : 'Sign in here'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard Component
  const Dashboard = () => {
    if (!user) return null;

    const isFunder = user.type === 'csr';

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {user.name}
                </h1>
                <p className="text-gray-600 mt-1">
                  {isFunder ? 'Manage your CSR initiatives and partnerships' : 'Track your impact and funding opportunities'}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {!user.verified && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-yellow-800">Verification Pending</span>
                  </div>
                )}
                <div className="bg-white rounded-lg px-4 py-2 border">
                  <div className="text-sm text-gray-600">Profile Complete</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${user.profileComplete}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{user.profileComplete}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {isFunder ? '12' : '8'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {isFunder ? 'Active Projects' : 'Proposals Sent'}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {isFunder ? '45' : '23'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {isFunder ? 'Partner NGOs' : 'Potential Funders'}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {isFunder ? '$2.4M' : '$180K'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {isFunder ? 'Funds Deployed' : 'Funds Received'}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {user.sdgGoals.length}
                  </div>
                  <div className="text-sm text-gray-600">SDG Goals</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {isFunder 
                            ? 'New partnership proposal received from Green Earth Initiative'
                            : 'Proposal submitted to TechCorp Foundation'
                          }
                        </p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {isFunder
                            ? 'Message received from Healthcare Plus NGO'
                            : 'New message from Global Water Fund'
                          }
                        </p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          Profile verification completed
                        </p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDG Goals Progress */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Your SDG Focus Areas</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {user.sdgGoals.map(sdgId => {
                      const goal = sdgGoals.find(g => g.id === sdgId);
                      if (!goal) return null;
                      return (
                        <div
                          key={goal.id}
                          className="p-4 border-2 rounded-lg text-center"
                          style={{ borderColor: goal.color + '40' }}
                        >
                          <div className="text-2xl mb-2">{goal.icon}</div>
                          <div className="text-sm font-medium text-gray-900">SDG {goal.id}</div>
                          <div className="text-xs text-gray-600">{goal.title}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
                </div>
                <div className="p-6 space-y-3">
                  <button
                    onClick={() => navigate('matches')}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>Find {isFunder ? 'NGO Partners' : 'Funding Opportunities'}</span>
                  </button>
                  <button
                    onClick={() => navigate('profile')}
                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Update Profile</span>
                  </button>
                  <button
                    onClick={() => navigate('messages')}
                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>View Messages</span>
                  </button>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
                </div>
                <div className="p-6 space-y-4">
                  {mockOrganizations.slice(0, 2).map(org => (
                    <div key={org.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{org.logo}</div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{org.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{org.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">{org.rating}</span>
                            </div>
                            {org.verified && (
                              <div className="flex items-center space-x-1">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-xs text-green-600">Verified</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // SDG Goals Page Component
  const SDGGoalsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedGoal, setSelectedGoal] = useState<SDGGoal | null>(null);

    const categories = [
      { id: 'all', name: 'All Goals', icon: Globe },
      { id: 'social', name: 'Social', icon: Users },
      { id: 'environment', name: 'Environment', icon: Globe },
      { id: 'economic', name: 'Economic', icon: TrendingUp },
      { id: 'infrastructure', name: 'Infrastructure', icon: Building }
    ];

    const filteredGoals = selectedCategory === 'all' 
      ? sdgGoals 
      : sdgGoals.filter(goal => goal.category === selectedCategory);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              UN Sustainable Development Goals
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The 17 SDGs are an urgent call for action by all countries in a global partnership. 
              Find organizations aligned with each goal to create meaningful impact.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map(category => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* SDG Goals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGoals.map(goal => (
              <div
                key={goal.id}
                onClick={() => setSelectedGoal(goal)}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-blue-200"
              >
                <div 
                  className="h-4 rounded-t-xl"
                  style={{ backgroundColor: goal.color }}
                ></div>
                <div className="p-6">
                  <div className="text-center">
                    <div className="text-4xl mb-3">{goal.icon}</div>
                    <div className="text-lg font-bold text-gray-900 mb-2">
                      SDG {goal.id}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {goal.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {goal.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="capitalize">{goal.category}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Goal Detail Modal */}
          {selectedGoal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-5xl">{selectedGoal.icon}</div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                          SDG {selectedGoal.id}: {selectedGoal.title}
                        </h2>
                        <p className="text-gray-600 mt-2">{selectedGoal.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedGoal(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Organizations aligned with this goal */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Organizations Aligned with This Goal
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockOrganizations
                        .filter(org => org.sdgGoals.includes(selectedGoal.id))
                        .map(org => (
                          <div key={org.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                              <div className="text-2xl">{org.logo}</div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-medium text-gray-900">{org.name}</h4>
                                  {org.verified && (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{org.description}</p>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                  <span>{org.type === 'csr' ? 'Funder' : 'NGO'}</span>
                                  <span>•</span>
                                  <span>{org.region}</span>
                                  <span>•</span>
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                    <span>{org.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Featured Collaborations */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Featured Collaborations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {successStories
                        .filter(story => story.sdg.includes(selectedGoal.id))
                        .map(story => (
                          <div key={story.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <img 
                              src={story.image} 
                              alt={story.title}
                              className="w-full h-32 object-cover"
                            />
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">{story.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{story.impact}</p>
                              <div className="text-xs text-gray-500">
                                {story.funder} × {story.ngo}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Explore Page Component
  const ExplorePage = () => {
    const [activeTab, setActiveTab] = useState<'funders' | 'ngos'>('funders');
    const [filteredOrgs, setFilteredOrgs] = useState(mockOrganizations);

    const handleFilterChange = (filterType: string, value: string) => {
      setSelectedFilters(prev => ({ ...prev, [filterType]: value }));
    };

    useEffect(() => {
      let filtered = mockOrganizations.filter(org => {
        if (activeTab === 'funders' && org.type !== 'csr') return false;
        if (activeTab === 'ngos' && org.type !== 'ngo') return false;
        
        if (selectedFilters.sector !== 'all' && org.sector !== selectedFilters.sector) return false;
        if (selectedFilters.region !== 'all' && org.region !== selectedFilters.region) return false;
        if (selectedFilters.sdg !== 'all' && !org.sdgGoals.includes(parseInt(selectedFilters.sdg))) return false;
        
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          return org.name.toLowerCase().includes(searchLower) || 
                 org.description.toLowerCase().includes(searchLower);
        }
        
        return true;
      });
      
      setFilteredOrgs(filtered);
    }, [activeTab, selectedFilters, searchTerm]);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Organizations</h1>
            <p className="text-xl text-gray-600">
              Discover verified CSR funders and impact organizations ready to collaborate
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 flex border border-gray-200">
              <button
                onClick={() => setActiveTab('funders')}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  activeTab === 'funders' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Building className="w-4 h-4 inline mr-2" />
                Browse Funders
              </button>
              <button
                onClick={() => setActiveTab('ngos')}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  activeTab === 'ngos' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Heart className="w-4 h-4 inline mr-2" />
                Browse NGOs
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search organizations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filters */}
              <select
                value={selectedFilters.sector}
                onChange={(e) => handleFilterChange('sector', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Sectors</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="environment">Environment</option>
                <option value="finance">Finance</option>
              </select>

              <select
                value={selectedFilters.region}
                onChange={(e) => handleFilterChange('region', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Regions</option>
                <option value="Global">Global</option>
                <option value="Asia-Pacific">Asia-Pacific</option>
                <option value="Africa">Africa</option>
                <option value="Europe">Europe</option>
                <option value="Americas">Americas</option>
              </select>

              <select
                value={selectedFilters.sdg}
                onChange={(e) => handleFilterChange('sdg', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All SDGs</option>
                {sdgGoals.map(goal => (
                  <option key={goal.id} value={goal.id.toString()}>
                    SDG {goal.id}: {goal.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrgs.map(org => (
              <div key={org.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="text-3xl">{org.logo}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{org.name}</h3>
                        {org.verified && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                        <span className="capitalize">{org.type === 'csr' ? 'Funder' : 'NGO'}</span>
                        <span>•</span>
                        <span>{org.sector}</span>
                        <span>•</span>
                        <span>{org.region}</span>
                      </div>
                      <div className="flex items-center space-x-1 mb-3">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900">{org.rating}</span>
                        <span className="text-sm text-gray-500">(24 reviews)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{org.description}</p>

                  {/* SDG Goals */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">SDG Focus Areas:</div>
                    <div className="flex flex-wrap gap-1">
                      {org.sdgGoals.slice(0, 3).map(sdgId => {
                        const goal = sdgGoals.find(g => g.id === sdgId);
                        return goal ? (
                          <span
                            key={sdgId}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                          >
                            SDG {sdgId}
                          </span>
                        ) : null;
                      })}
                      {org.sdgGoals.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{org.sdgGoals.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Impact Metrics */}
                  {org.impactMetrics && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-700 mb-2">Impact Metrics:</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {org.impactMetrics.projectsFunded && (
                          <div>
                            <span className="font-medium text-blue-600">{org.impactMetrics.projectsFunded}</span>
                            <span className="text-gray-600 ml-1">Projects</span>
                          </div>
                        )}
                        {org.impactMetrics.beneficiaries && (
                          <div>
                            <span className="font-medium text-green-600">{org.impactMetrics.beneficiaries.toLocaleString()}</span>
                            <span className="text-gray-600 ml-1">Beneficiaries</span>
                          </div>
                        )}
                        {org.impactMetrics.fundsDeployed && (
                          <div>
                            <span className="font-medium text-purple-600">{org.impactMetrics.fundsDeployed}</span>
                            <span className="text-gray-600 ml-1">Deployed</span>
                          </div>
                        )}
                        {org.impactMetrics.yearsActive && (
                          <div>
                            <span className="font-medium text-orange-600">{org.impactMetrics.yearsActive}</span>
                            <span className="text-gray-600 ml-1">Years Active</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      View Profile
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredOrgs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No organizations found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Impact Stories Page Component
  const ImpactStoriesPage = () => {
    const [selectedStory, setSelectedStory] = useState<any>(null);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Impact Stories</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real partnerships creating measurable change. Discover how organizations are 
              collaborating to achieve UN SDG goals and create lasting impact.
            </p>
          </div>

          {/* Featured Story */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={successStories[0].image} 
                  alt={successStories[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Featured Story
                  </span>
                  {successStories[0].sdg.map(sdgId => (
                    <span 
                      key={sdgId}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                    >
                      SDG {sdgId}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{successStories[0].title}</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <Building className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">
                      <span className="font-medium">Funder:</span> {successStories[0].funder}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">
                      <span className="font-medium">Partner:</span> {successStories[0].ngo}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">
                      <span className="font-medium">Impact:</span> {successStories[0].impact}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  This groundbreaking partnership demonstrates how technology companies can leverage 
                  their expertise to address educational inequalities in rural communities, creating 
                  sustainable impact aligned with SDG 4 (Quality Education) and SDG 8 (Decent Work).
                </p>
                <button 
                  onClick={() => setSelectedStory(successStories[0])}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Global Impact Map */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Global Impact Map</h2>
            <div className="bg-blue-50 rounded-xl p-8 text-center">
              <Globe className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Impact Visualization</h3>
              <p className="text-gray-600 mb-6">
                Explore partnerships and their impact across different regions and SDG goals
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">45</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">1.2M</div>
                  <div className="text-sm text-gray-600">Beneficiaries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">$45M</div>
                  <div className="text-sm text-gray-600">Funds Deployed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">17</div>
                  <div className="text-sm text-gray-600">SDGs Addressed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Stories Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {successStories.map(story => (
                <div key={story.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      {story.sdg.map(sdgId => (
                        <span 
                          key={sdgId}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                        >
                          SDG {sdgId}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{story.title}</h3>
                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Funder:</span> {story.funder}
                      </div>
                      <div>
                        <span className="font-medium">Partner:</span> {story.ngo}
                      </div>
                      <div>
                        <span className="font-medium">Impact:</span> {story.impact}
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedStory(story)}
                      className="text-blue-600 font-medium hover:text-blue-700 flex items-center space-x-1"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Case Studies */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Detailed Case Studies</h2>
            <div className="space-y-8">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Technology for Education Initiative
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">25,000</div>
                    <div className="text-sm text-gray-600">Students Trained</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">150</div>
                    <div className="text-sm text-gray-600">Schools Equipped</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600">$2.5M</div>
                    <div className="text-sm text-gray-600">Investment</div>
                  </div>
                </div>
                <p className="text-gray-600">
                  A comprehensive digital literacy program that equipped rural schools with technology 
                  infrastructure and trained teachers to deliver quality education, directly contributing 
                  to SDG 4 (Quality Education) and creating pathways for decent work opportunities.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Clean Water Access Project
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">50</div>
                    <div className="text-sm text-gray-600">Villages Served</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">75,000</div>
                    <div className="text-sm text-gray-600">People Benefited</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600">$1.8M</div>
                    <div className="text-sm text-gray-600">Investment</div>
                  </div>
                </div>
                <p className="text-gray-600">
                  Installation of sustainable water systems in underserved communities, improving health 
                  outcomes and reducing time spent collecting water, particularly benefiting women and 
                  children in alignment with SDG 6 (Clean Water) and SDG 3 (Good Health).
                </p>
              </div>
            </div>
          </div>

          {/* Story Detail Modal */}
          {selectedStory && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        {selectedStory.sdg.map((sdgId: number) => (
                          <span 
                            key={sdgId}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            SDG {sdgId}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedStory.title}</h2>
                    </div>
                    <button
                      onClick={() => setSelectedStory(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <img 
                    src={selectedStory.image} 
                    alt={selectedStory.title}
                    className="w-full h-64 object-cover rounded-xl mb-6"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Partnership Details</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Building className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="font-medium text-gray-900">Funding Organization</div>
                            <div className="text-gray-600">{selectedStory.funder}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Heart className="w-5 h-5 text-green-600" />
                          <div>
                            <div className="font-medium text-gray-900">Implementation Partner</div>
                            <div className="text-gray-600">{selectedStory.ngo}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <TrendingUp className="w-5 h-5 text-purple-600" />
                          <div>
                            <div className="font-medium text-gray-900">Measured Impact</div>
                            <div className="text-gray-600">{selectedStory.impact}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Outcomes</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                          <span className="text-gray-600">Sustainable impact model established</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                          <span className="text-gray-600">Local capacity building achieved</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                          <span className="text-gray-600">Measurable SDG progress documented</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                          <span className="text-gray-600">Replicable framework developed</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Full Story</h3>
                    <p className="text-gray-700 leading-relaxed">
                      This partnership exemplifies how strategic collaboration between CSR funders and 
                      impact organizations can create lasting change. The initiative began with a shared 
                      vision to address educational inequalities in rural communities, leveraging technology 
                      as a catalyst for transformation.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      Through careful planning, community engagement, and continuous monitoring, the 
                      partnership achieved remarkable results that extend far beyond the initial investment. 
                      The success of this collaboration has inspired similar initiatives across the region, 
                      demonstrating the power of aligned purpose and strategic partnership.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Resources Page Component
  const ResourcesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const resourceCategories = [
      { id: 'all', name: 'All Resources', icon: BookOpen },
      { id: 'compliance', name: 'CSR Law & Compliance', icon: Shield },
      { id: 'sdg', name: 'SDG Best Practices', icon: Target },
      { id: 'fundraising', name: 'Fundraising Guides', icon: DollarSign },
      { id: 'templates', name: 'Templates', icon: FileText },
      { id: 'blog', name: 'Blog & Insights', icon: Edit }
    ];

    const resources = [
      {
        id: '1',
        title: 'CSR Compliance Guide 2024',
        description: 'Complete guide to CSR regulations and compliance requirements',
        category: 'compliance',
        type: 'PDF Guide',
        downloadUrl: '#',
        readTime: '15 min read'
      },
      {
        id: '2',
        title: 'SDG Implementation Framework',
        description: 'Step-by-step framework for implementing SDG-aligned initiatives',
        category: 'sdg',
        type: 'Framework',
        downloadUrl: '#',
        readTime: '20 min read'
      },
      {
        id: '3',
        title: 'Proposal Template for NGOs',
        description: 'Professional template for creating compelling funding proposals',
        category: 'templates',
        type: 'Template',
        downloadUrl: '#',
        readTime: '5 min setup'
      },
      {
        id: '4',
        title: 'Impact Measurement Best Practices',
        description: 'Learn how to measure and report on social impact effectively',
        category: 'sdg',
        type: 'Guide',
        downloadUrl: '#',
        readTime: '12 min read'
      },
      {
        id: '5',
        title: 'Fundraising Strategy Playbook',
        description: 'Comprehensive guide to developing successful fundraising strategies',
        category: 'fundraising',
        type: 'Playbook',
        downloadUrl: '#',
        readTime: '25 min read'
      },
      {
        id: '6',
        title: 'Partnership Agreement Template',
        description: 'Legal template for formalizing CSR partnerships',
        category: 'templates',
        type: 'Legal Template',
        downloadUrl: '#',
        readTime: '10 min setup'
      }
    ];

    const blogPosts = [
      {
        id: '1',
        title: 'The Future of CSR: Trends to Watch in 2024',
        excerpt: 'Explore emerging trends in corporate social responsibility and their impact on business strategy.',
        author: 'Sarah Johnson',
        date: '2024-01-15',
        readTime: '8 min read',
        category: 'blog'
      },
      {
        id: '2',
        title: 'Building Effective NGO-Corporate Partnerships',
        excerpt: 'Key strategies for creating successful long-term partnerships between NGOs and corporations.',
        author: 'Dr. Rajesh Patel',
        date: '2024-01-10',
        readTime: '6 min read',
        category: 'blog'
      },
      {
        id: '3',
        title: 'Measuring Impact: Beyond the Numbers',
        excerpt: 'How to capture the true impact of your social initiatives through qualitative and quantitative metrics.',
        author: 'Maria Rodriguez',
        date: '2024-01-05',
        readTime: '10 min read',
        category: 'blog'
      }
    ];

    const filteredResources = selectedCategory === 'all' 
      ? resources 
      : resources.filter(resource => resource.category === selectedCategory);

    const filteredBlogs = selectedCategory === 'all' || selectedCategory === 'blog' 
      ? blogPosts 
      : [];

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Resources</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access comprehensive guides, templates, and insights to enhance your CSR initiatives 
              and partnership strategies.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {resourceCategories.map(category => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Featured Resource */}
          {selectedCategory === 'all' && (
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white p-8 mb-12">
              <div className="max-w-3xl">
                <div className="flex items-center space-x-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-blue-100 font-medium">Featured Resource</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Complete CSR Partnership Toolkit</h2>
                <p className="text-blue-100 mb-6 text-lg">
                  Everything you need to build successful CSR partnerships - from initial planning 
                  to impact measurement. Includes templates, checklists, and best practices.
                </p>
                <div className="flex items-center space-x-4">
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download Toolkit</span>
                  </button>
                  <span className="text-blue-200">Free • 45 pages • PDF</span>
                </div>
              </div>
            </div>
          )}

          {/* Resources Grid */}
          {(selectedCategory !== 'blog' && filteredResources.length > 0) && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {selectedCategory === 'all' ? 'All Resources' : resourceCategories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map(resource => (
                  <div key={resource.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600">{resource.type}</span>
                      </div>
                      <span className="text-xs text-gray-500">{resource.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                    <div className="flex items-center space-x-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                      <button className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog Posts */}
          {(selectedCategory === 'all' || selectedCategory === 'blog') && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map(post => (
                  <div key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600"></div>
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-xs text-gray-500">{post.date}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">By {post.author}</span>
                        <button className="text-blue-600 font-medium hover:text-blue-700 flex items-center space-x-1">
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get the latest resources, insights, and best practices delivered to your inbox monthly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No spam, unsubscribe at any time
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Matches Page Component
  const MatchesPage = () => {
    if (!user) return null;

    const mockMatches: Match[] = [
      {
        id: '1',
        organization: mockOrganizations[1],
        matchPercentage: 94,
        reasons: ['SDG alignment: 3 common goals', 'Geographic focus: Asia-Pacific', 'Sector expertise match'],
        status: 'new'
      },
      {
        id: '2',
        organization: mockOrganizations[2],
        matchPercentage: 87,
        reasons: ['Strong impact metrics', 'Verified organization', 'Budget alignment'],
        status: 'contacted'
      }
    ];

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered Matches</h1>
            <p className="text-gray-600">
              Discover {user.type === 'csr' ? 'impact organizations' : 'funding opportunities'} perfectly aligned with your goals
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All SDGs</option>
                {sdgGoals.map(goal => (
                  <option key={goal.id} value={goal.id}>SDG {goal.id}: {goal.title}</option>
                ))}
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Regions</option>
                <option>Global</option>
                <option>Asia-Pacific</option>
                <option>Africa</option>
                <option>Europe</option>
                <option>Americas</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Budget Ranges</option>
                <option>$10K - $50K</option>
                <option>$50K - $100K</option>
                <option>$100K - $500K</option>
                <option>$500K+</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Match Score: High to Low</option>
                <option>Match Score: Low to High</option>
                <option>Recently Added</option>
                <option>Most Active</option>
              </select>
            </div>
          </div>

          {/* Matches List */}
          <div className="space-y-6">
            {mockMatches.map(match => (
              <div key={match.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{match.organization.logo}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-xl font-semibold text-gray-900">{match.organization.name}</h3>
                          {match.organization.verified && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            match.status === 'new' ? 'bg-blue-100 text-blue-800' :
                            match.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {match.status === 'new' ? 'New Match' :
                             match.status === 'contacted' ? 'Contacted' : 'In Discussion'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                          <span>{match.organization.type === 'csr' ? 'Funder' : 'NGO'}</span>
                          <span>•</span>
                          <span>{match.organization.sector}</span>
                          <span>•</span>
                          <span>{match.organization.region}</span>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span>{match.organization.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4">{match.organization.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600 mb-1">{match.matchPercentage}%</div>
                      <div className="text-sm text-gray-500">Match Score</div>
                    </div>
                  </div>

                  {/* Match Reasons */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Why this match:</h4>
                    <div className="flex flex-wrap gap-2">
                      {match.reasons.map((reason, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* SDG Alignment */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">SDG Alignment:</h4>
                    <div className="flex flex-wrap gap-2">
                      {match.organization.sdgGoals.map(sdgId => {
                        const goal = sdgGoals.find(g => g.id === sdgId);
                        const isCommon = user.sdgGoals.includes(sdgId);
                        return goal ? (
                          <span
                            key={sdgId}
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              isCommon 
                                ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            SDG {sdgId}: {goal.title}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      View Full Profile
                    </button>
                    <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                      Send Message
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              Load More Matches
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Messages Page Component
  const MessagesPage = () => {
    if (!user) return null;

    const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
    const [messageText, setMessageText] = useState('');

    const mockConversations: Conversation[] = [
      {
        id: '1',
        participants: [user.id, '2'],
        organizationName: 'Green Earth Initiative',
        lastMessage: 'Thank you for your interest in our climate action project...',
        timestamp: new Date('2024-01-15T10:30:00'),
        status: 'in-discussion',
        unreadCount: 2
      },
      {
        id: '2',
        participants: [user.id, '3'],
        organizationName: 'Healthcare Plus',
        lastMessage: 'We would love to discuss the healthcare initiative further...',
        timestamp: new Date('2024-01-14T15:45:00'),
        status: 'pending',
        unreadCount: 0
      }
    ];

    const mockMessages: Message[] = [
      {
        id: '1',
        senderId: '2',
        senderName: 'Dr. Sarah Green',
        content: 'Thank you for your interest in our climate action project. We believe there\'s great potential for collaboration.',
        timestamp: new Date('2024-01-15T10:30:00')
      },
      {
        id: '2',
        senderId: user.id,
        senderName: user.name,
        content: 'We\'re very excited about the possibility of partnering with Green Earth Initiative. Could you share more details about the project scope?',
        timestamp: new Date('2024-01-15T11:15:00')
      },
      {
        id: '3',
        senderId: '2',
        senderName: 'Dr. Sarah Green',
        content: 'Absolutely! Our project focuses on renewable energy access in rural communities. I\'ll send over our detailed proposal.',
        timestamp: new Date('2024-01-15T11:45:00'),
        attachments: ['Climate_Action_Proposal.pdf']
      }
    ];

    const handleSendMessage = () => {
      if (messageText.trim()) {
        // Add message logic here
        setMessageText('');
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
            <div className="flex h-full">
              {/* Conversations List */}
              <div className="w-1/3 border-r border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
                </div>
                <div className="overflow-y-auto h-full">
                  {mockConversations.map(conversation => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                        selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {conversation.organizationName.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {conversation.organizationName}
                            </h3>
                            {conversation.unreadCount > 0 && (
                              <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                                {conversation.unreadCount}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate mt-1">
                            {conversation.lastMessage}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              {conversation.timestamp.toLocaleDateString()}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              conversation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              conversation.status === 'in-discussion' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {conversation.status === 'pending' ? 'Pending' :
                               conversation.status === 'in-discussion' ? 'In Discussion' : 'Funded'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {selectedConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">G</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Green Earth Initiative</h3>
                            <p className="text-sm text-gray-600">Climate Action Project Discussion</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600">
                            <Phone className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600">
                            <Settings className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {mockMessages.map(message => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.senderId === user.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            {message.attachments && (
                              <div className="mt-2 pt-2 border-t border-blue-500">
                                {message.attachments.map((attachment, index) => (
                                  <div key={index} className="flex items-center space-x-2 text-xs">
                                    <FileText className="w-3 h-3" />
                                    <span>{attachment}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            <p className="text-xs mt-1 opacity-75">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="p-6 border-t border-gray-200">
                      <div className="flex items-center space-x-3">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Upload className="w-5 h-5" />
                        </button>
                        <input
                          type="text"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button
                          onClick={handleSendMessage}
                          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                      <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Profile Page Component
  const ProfilePage = () => {
    if (!user) return null;

    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
      name: user.name,
      email: user.email,
      organization: user.organization,
      website: '',
      phone: '',
      description: '',
      sdgGoals: user.sdgGoals,
      region: user.region,
      sector: user.sector || '',
      budget: user.budget || '',
      isPublic: true
    });

    const handleSave = () => {
      // Save profile logic here
      setIsEditing(false);
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{user.name.charAt(0)}</span>
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-2 hover:bg-gray-50">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-gray-600 mt-1">{user.organization}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      {user.verified ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-500" />
                      )}
                      <span className="text-sm text-gray-600">
                        {user.verified ? 'Verified' : 'Verification Pending'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-600">Profile {user.profileComplete}% complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            </div>

            {/* Profile Completion Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                <span className="text-sm text-gray-600">{user.profileComplete}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${user.profileComplete}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Information */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.organization}
                        onChange={(e) => setProfileData(prev => ({ ...prev, organization: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.organization}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={profileData.website}
                        onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.website || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={profileData.description}
                      onChange={(e) => setProfileData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about your organization and mission..."
                    />
                  </div>
                )}
              </div>

              {/* SDG Goals */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">SDG Focus Areas</h2>
                {isEditing ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {sdgGoals.map(goal => (
                      <div
                        key={goal.id}
                        onClick={() => {
                          const newSDGs = profileData.sdgGoals.includes(goal.id)
                            ? profileData.sdgGoals.filter(id => id !== goal.id)
                            : [...profileData.sdgGoals, goal.id];
                          setProfileData(prev => ({ ...prev, sdgGoals: newSDGs }));
                        }}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          profileData.sdgGoals.includes(goal.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">{goal.icon}</div>
                          <div className="text-xs font-medium text-gray-900">SDG {goal.id}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {profileData.sdgGoals.map(sdgId => {
                      const goal = sdgGoals.find(g => g.id === sdgId);
                      return goal ? (
                        <div
                          key={goal.id}
                          className="p-4 border-2 rounded-lg text-center"
                          style={{ borderColor: goal.color + '40' }}
                        >
                          <div className="text-2xl mb-2">{goal.icon}</div>
                          <div className="text-sm font-medium text-gray-900">SDG {goal.id}</div>
                          <div className="text-xs text-gray-600">{goal.title}</div>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Visibility Settings */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Visibility</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Public Profile</span>
                    <button
                      onClick={() => setProfileData(prev => ({ ...prev, isPublic: !prev.isPublic }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        profileData.isPublic ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          profileData.isPublic ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    {profileData.isPublic 
                      ? 'Your profile is visible to other organizations'
                      : 'Your profile is private and only visible to you'
                    }
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Profile Views</span>
                    <span className="text-sm font-medium text-gray-900">127</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Connections</span>
                    <span className="text-sm font-medium text-gray-900">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Messages</span>
                    <span className="text-sm font-medium text-gray-900">45</span>
                  </div>
                </div>
              </div>

              {/* Account Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
                <div className="space-y-3">
                  <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 transition-colors">
                    Download Profile Data
                  </button>
                  <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 transition-colors">
                    Privacy Settings
                  </button>
                  <button className="w-full text-left text-sm text-red-600 hover:text-red-700 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main App Render
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <LoginPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'sdg-goals':
        return <SDGGoalsPage />;
      case 'explore':
        return <ExplorePage />;
      case 'impact-stories':
        return <ImpactStoriesPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'matches':
        return <MatchesPage />;
      case 'messages':
        return <MessagesPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;