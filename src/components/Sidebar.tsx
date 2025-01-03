import React from 'react';
import { NavLink } from 'react-router-dom';
import batchFileImage from '../images/icon/batchfile.png';  // Adjust the path as necessary

import { 
  LayoutDashboard, 
  Phone, 
  ShoppingCart, 
  Users, 
  MessageSquare,
  Settings,
  Zap,
  Menu,
  FileText,       
  Calendar,       
  BarChart2,      
  HelpCircle,     
  Mic,            
  Key,            
  FilePlus,       
  Plug,           
  CreditCard,     
  Bell,           
  UserPlus,       
  FileMinus,      
  MessageCircle,  
  Activity,       
  DollarSign,     
  Package,        
  Clipboard,      
  Shield,         
} from 'lucide-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: ShoppingCart, label: 'Products', path: '/products' },
  {
    image: batchFileImage,  // Use imported image
    label: 'Batch File Upload',
    path: '/BatchUpload'
  },
  { icon: Phone, label: 'Calls', path: '/calls' },
  { icon: Zap, label: 'Automation', path: '/automation' },
  { icon: ShoppingCart, label: 'Orders', path: '/orders' },
  { icon: Users, label: 'Customers', path: '/customers' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: FileText, label: 'Documentation', path: '/documentation' },
  { icon: Calendar, label: 'Events', path: '/events' },
  { icon: BarChart2, label: 'Analytics', path: '/analytics' },
  { icon: HelpCircle, label: 'Support', path: '/support' },
  { icon: Mic, label: 'IVR', path: '/ivr' },  
  { icon: Key, label: 'DNI', path: '/dni' },  
  { icon: FilePlus, label: 'Reports', path: '/reports' },  
  { icon: Plug, label: 'Integrations', path: '/integrations' },  
  { icon: CreditCard, label: 'Billing', path: '/billing' },  
  { icon: Bell, label: 'Notifications', path: '/notifications' },  
  { icon: faSignInAlt, label: 'Logs', path: '/logs', isFontAwesome: true },
  { icon: UserPlus, label: 'Team Management', path: '/team' },  
  { icon: FileMinus, label: 'Invoices', path: '/invoices' },  
  { icon: MessageCircle, label: 'Feedback', path: '/feedback' },  
  { icon: Activity, label: 'User Activity', path: '/activity' },  
  { icon: DollarSign, label: 'Billing History', path: '/billing-history' },  
  { icon: Package, label: 'Product Management', path: '/product-management' },  
  { icon: MessageSquare, label: 'Live Chat', path: '/live-chat' },  
  { icon: Clipboard, label: 'Project Management', path: '/project-management' },  
  { icon: Shield, label: 'Security', path: '/security' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className={`bg-gray-900 text-white h-screen transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4 flex items-center justify-between">
        <h1 className={`font-bold text-xl ${collapsed ? 'hidden' : 'block'}`}>
          AI CRM
        </h1>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-gray-800 rounded-lg"
        >
          <Menu size={20} />
        </button>
      </div>
      
      <nav className="mt-0 overflow-y-auto" style={{ height: 'calc(100vh - 60px)' }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors
              ${isActive ? 'bg-gray-800 text-white' : ''}`}
          >
            {/* Conditional rendering for image or icon */}
            {item.image ? (
              <img
                src={item.image} // Path to the image
                alt={item.label}
                style={{ width: '24px', height: '24px' }} // Adjust the size to match icons
              />
            ) : item.isFontAwesome ? (
              <FontAwesomeIcon icon={item.icon} size="lg" />
            ) : (
              <item.icon size={20} />
            )}

            <span className={`ml-4 ${collapsed ? 'hidden' : 'block'}`}>
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
