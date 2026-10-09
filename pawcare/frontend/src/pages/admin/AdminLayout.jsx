import { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  PawPrint,
  PlusCircle,
  Users,
  ClipboardList,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  Search,
  Bell,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children, title }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navSections = [
    {
      title: 'Main Menu',
      links: [
        { to: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={19} /> },
      ],
    },
    {
      title: 'Inventory & Pets',
      links: [
        { to: '/admin/pets', label: 'Manage Pets', icon: <PawPrint size={19} /> },
        { to: '/admin/pets/add', label: 'Add New Pet', icon: <PlusCircle size={19} /> },
      ],
    },
    {
      title: 'Adoptions & Users',
      links: [
        { to: '/admin/applications', label: 'Applications', icon: <ClipboardList size={19} /> },
        { to: '/admin/users', label: 'User Directory', icon: <Users size={19} /> },
      ],
    },
    {
      title: 'Support & Settings',
      links: [
        { to: '/admin/messages', label: 'Messages', icon: <Mail size={19} /> },
        { to: '/admin/settings', label: 'Settings', icon: <Settings size={19} /> },
      ],
    },
  ];

  return (
    <div className="dashspace-layout d-flex min-vh-100">
      {/* Sidebar */}
      <aside className="dashspace-sidebar d-none d-lg-flex">
        {/* Brand */}
        <div className="dashspace-sidebar-brand">
          <div className="dashspace-brand-icon">
            <PawPrint size={22} />
          </div>
          <div>
            <div className="fw-bold fs-6 text-dark" style={{ letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              PawCare
            </div>
            <div className="text-muted" style={{ fontSize: '0.72rem', fontWeight: 600 }}>
              TailGrids DashSpace
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="flex-grow-1 py-3 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
          {navSections.map((sec) => (
            <div key={sec.title} className="mb-2">
              <div className="dashspace-nav-section-title">{sec.title}</div>
              {sec.links.map((link) => (
                <NavLink key={link.to} to={link.to} end className="dashspace-nav-link">
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </div>

        {/* Admin User Footer Card */}
        <div className="p-3 border-top border-slate-100 bg-white">
          <div className="d-flex align-items-center justify-content-between p-2 rounded-3 bg-light">
            <div className="d-flex align-items-center gap-2 overflow-hidden">
              <div
                className="rounded-circle text-white fw-bold d-flex align-items-center justify-content-center flex-shrink-0"
                style={{
                  width: 38,
                  height: 38,
                  background: 'linear-gradient(135deg, var(--pc-orange), var(--pc-orange-dark))',
                  fontSize: '0.9rem',
                }}
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="text-truncate">
                <div className="fw-bold text-dark text-truncate" style={{ fontSize: '0.85rem' }}>
                  {user?.name || 'Administrator'}
                </div>
                <div className="text-muted text-truncate" style={{ fontSize: '0.72rem' }}>
                  Super Admin
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="btn btn-sm btn-light text-danger p-2 rounded-circle"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div
          className="position-fixed inset-0 d-lg-none"
          style={{ top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}
        >
          {/* Backdrop */}
          <div
            className="position-absolute w-100 h-100 bg-dark opacity-50"
            onClick={() => setMobileSidebarOpen(false)}
          ></div>

          {/* Drawer Sidebar */}
          <aside
            className="position-relative bg-white h-100 d-flex flex-column shadow-2xl"
            style={{ width: 280, maxWidth: '85vw', zIndex: 10000, animation: 'pcFadeInUp 0.25s ease-out' }}
          >
            <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
              <div className="d-flex align-items-center gap-2">
                <div className="dashspace-brand-icon" style={{ width: 34, height: 34 }}>
                  <PawPrint size={18} />
                </div>
                <div>
                  <div className="fw-bold text-dark" style={{ lineHeight: 1.2 }}>PawCare</div>
                  <div className="text-muted" style={{ fontSize: '0.7rem' }}>TailGrids DashSpace</div>
                </div>
              </div>
              <button
                className="btn btn-sm btn-light rounded-circle p-1.5"
                onClick={() => setMobileSidebarOpen(false)}
                aria-label="Close navigation"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-grow-1 py-3 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              {navSections.map((sec) => (
                <div key={sec.title} className="mb-2">
                  <div className="dashspace-nav-section-title">{sec.title}</div>
                  {sec.links.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end
                      className="dashspace-nav-link"
                      onClick={() => setMobileSidebarOpen(false)}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </NavLink>
                  ))}
                </div>
              ))}
            </div>

            {/* Admin User Footer Card */}
            <div className="p-3 border-top bg-light">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2 overflow-hidden">
                  <div
                    className="rounded-circle text-white fw-bold d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: 36,
                      height: 36,
                      background: 'linear-gradient(135deg, var(--pc-orange), var(--pc-orange-dark))',
                      fontSize: '0.85rem',
                    }}
                  >
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <div className="text-truncate">
                    <div className="fw-bold text-dark text-truncate" style={{ fontSize: '0.85rem' }}>
                      {user?.name || 'Administrator'}
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>Super Admin</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="btn btn-sm btn-light text-danger p-2 rounded-circle"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Column */}
      <div className="d-flex flex-column flex-grow-1 min-vw-0">
        {/* Top Navbar */}
        <header className="dashspace-topbar d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-light d-lg-none p-2 rounded-lg border text-dark"
              onClick={() => setMobileSidebarOpen(true)}
              title="Open menu"
              aria-label="Open menu"
            >
              <Menu size={19} />
            </button>
            <div className="d-flex d-lg-none align-items-center gap-2">
              <div className="dashspace-brand-icon" style={{ width: 32, height: 32 }}>
                <PawPrint size={16} />
              </div>
              <span className="fw-bold fs-6 text-dark">PawCare</span>
            </div>
            <div className="position-relative d-none d-md-block ms-md-2">
              <Search
                size={16}
                className="position-absolute text-muted"
                style={{ top: '50%', left: '12px', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Search pets, applications, users..."
                className="dashspace-search-box"
              />
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            {/* Live site link */}
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-light border d-none d-sm-inline-flex align-items-center gap-1.5 px-3 py-1.5 rounded-pill text-secondary fw-semibold"
              style={{ fontSize: '0.85rem' }}
            >
              <span>Public Portal</span>
              <ExternalLink size={13} />
            </Link>

            {/* Quick Add Pet Button */}
            <Link
              to="/admin/pets/add"
              className="btn-pc-primary btn btn-sm d-inline-flex align-items-center gap-1.5 px-2.5 px-sm-3 py-1.5"
              style={{ fontSize: '0.85rem' }}
              title="Add New Pet"
            >
              <PlusCircle size={14} />
              <span className="d-none d-sm-inline">Add Pet</span>
            </Link>

            {/* Notifications Bell */}
            <Link
              to="/admin/applications"
              className="btn btn-light rounded-circle position-relative p-2 text-secondary"
              title="Adoption Notifications"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span
                className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
                style={{ width: 9, height: 9 }}
              ></span>
            </Link>

            {/* Profile Avatar */}
            <div className="d-flex align-items-center gap-2 ps-2 border-start">
              <div
                className="rounded-circle text-white fw-bold d-flex align-items-center justify-content-center"
                style={{
                  width: 36,
                  height: 36,
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  fontSize: '0.85rem',
                }}
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="d-none d-md-block text-start leading-tight">
                <span className="fw-bold text-dark d-block" style={{ fontSize: '0.85rem' }}>
                  {user?.name}
                </span>
                <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill" style={{ fontSize: '0.65rem' }}>
                  Active
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow-1 p-4 p-md-5">
          {title && (
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
              <div>
                <h3 className="font-heading mb-1 text-dark fw-bold">{title}</h3>
                <p className="text-muted mb-0 small">
                  TailGrids DashSpace Overview &bull; Real-time PawCare Metrics
                </p>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="badge rounded-pill bg-white border px-3 py-2 text-secondary d-inline-flex align-items-center gap-1.5 shadow-sm">
                  <Sparkles size={14} color="var(--pc-orange)" />
                  <span>MySQL Database Online</span>
                </span>
              </div>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
