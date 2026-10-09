'use client';

import { useNavigate } from 'react-router-dom';
import {
  Home,
  PawPrint,
  LayoutGrid,
  Heart,
  HelpCircle,
  Mail,
  User,
} from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { useAuth } from '@/context/AuthContext';

export function PawCareDock() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const dockItems = [
    {
      title: 'Home',
      icon: <Home className="h-full w-full text-amber-600 dark:text-amber-400" />,
      onClick: () => navigate('/'),
    },
    {
      title: 'Adopt Pets',
      icon: <PawPrint className="h-full w-full text-orange-600 dark:text-orange-400" />,
      onClick: () => navigate('/pets'),
    },
    {
      title: 'Categories',
      icon: <LayoutGrid className="h-full w-full text-emerald-600 dark:text-emerald-400" />,
      onClick: () => navigate('/categories'),
    },
    {
      title: 'How It Works',
      icon: <HelpCircle className="h-full w-full text-blue-600 dark:text-blue-400" />,
      onClick: () => navigate('/how-it-works'),
    },
    {
      title: 'Favorites',
      icon: <Heart className="h-full w-full text-rose-600 dark:text-rose-400" />,
      onClick: () => navigate(user ? '/user/favorites' : '/login'),
    },
    {
      title: 'Contact',
      icon: <Mail className="h-full w-full text-purple-600 dark:text-purple-400" />,
      onClick: () => navigate('/contact'),
    },
    {
      title: user ? (user.role === 'admin' ? 'Admin Panel' : 'My Account') : 'Sign In',
      icon: <User className="h-full w-full text-neutral-700 dark:text-neutral-200" />,
      onClick: () => {
        if (!user) navigate('/login');
        else if (user.role === 'admin') navigate('/admin/dashboard');
        else navigate('/user/dashboard');
      },
    },
  ];

  const mobileDockItems = [
    dockItems[0], // Home
    dockItems[1], // Adopt Pets
    dockItems[2], // Categories
    dockItems[4], // Favorites
    dockItems[6], // User / Sign in
  ];

  return (
    <>
      {/* Desktop macOS-style Dock */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] px-2 pointer-events-auto hidden md:block">
        <div className="shadow-2xl rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-700/60">
          <Dock className="items-end pb-2 pt-1 px-2" panelHeight={54} magnification={72} distance={130}>
            {dockItems.map((item, idx) => (
              <DockItem
                key={idx}
                onClick={item.onClick}
                className="aspect-square rounded-2xl bg-neutral-100 hover:bg-neutral-200/90 dark:bg-neutral-800 dark:hover:bg-neutral-700 shadow-sm p-2 cursor-pointer transition-colors"
              >
                <DockLabel>{item.title}</DockLabel>
                <DockIcon>{item.icon}</DockIcon>
              </DockItem>
            ))}
          </Dock>
        </div>
      </div>

      {/* Mobile Floating Bottom Bar */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-[94vw] pointer-events-auto md:hidden">
        <div className="d-flex align-items-center gap-1 px-2 py-1.5 rounded-pill shadow-lg bg-white/95 backdrop-blur-md border border-secondary border-opacity-25">
          {mobileDockItems.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={item.onClick}
              className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center border-0"
              style={{ width: 44, height: 44 }}
              title={item.title}
              aria-label={item.title}
            >
              <div style={{ width: 22, height: 22 }}>
                {item.icon}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default PawCareDock;
