import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  FaPaw,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaHeart,
  FaSignOutAlt,
  FaShieldAlt,
  FaThLarge,
  FaHandsHelping,
  FaInfoCircle,
  FaEnvelope,
  FaHome
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  // Close mobile nav on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Close mobile nav on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open]);

  const navLinks = [
    { to: '/', label: 'Home', icon: <FaHome size={15} /> },
    { to: '/pets', label: 'Adopt', icon: <FaPaw size={15} /> },
    { to: '/categories', label: 'Categories', icon: <FaThLarge size={14} /> },
    { to: '/how-it-works', label: 'How It Works', icon: <FaHandsHelping size={15} /> },
    { to: '/about', label: 'About', icon: <FaInfoCircle size={15} /> },
    { to: '/contact', label: 'Contact', icon: <FaEnvelope size={14} /> },
  ];

  const firstName = user?.name ? user.name.trim().split(' ')[0] : 'User';

  return (
    <header className="pc-navbar sticky-top" ref={navRef}>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between py-2">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="d-flex align-items-center text-decoration-none pc-brand gap-2"
            onClick={() => setOpen(false)}
          >
            <div className="pc-brand-icon-wrapper">
              <FaPaw size={22} className="pc-brand-icon" />
            </div>
            <div className="d-flex flex-column">
              <span className="fs-4 font-heading fw-bold pc-brand-title">PawCare</span>
              <span className="pc-brand-subtitle">Pet Adoption Portal</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="d-none d-lg-flex align-items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `pc-nav-pill d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
                }
              >
                <span className="pc-nav-icon">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Desktop Auth / User Controls */}
          <div className="d-none d-lg-flex align-items-center gap-2">
            {!user ? (
              <>
                <Link to="/login" className="btn btn-outline-secondary rounded-pill px-3 py-1 fw-semibold">
                  Log In
                </Link>
                <Link to="/register" className="btn-pc-primary btn py-1 px-4">
                  Register
                </Link>
              </>
            ) : user.role === 'admin' ? (
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-dark text-warning rounded-pill px-3 py-2 d-flex align-items-center gap-1 border border-warning">
                  <FaShieldAlt size={12} /> Admin
                </span>
                <Link to="/admin/dashboard" className="btn btn-outline-dark rounded-pill px-3 py-1 fw-semibold">
                  Admin Panel
                </Link>
                <button
                  className="btn btn-light rounded-circle p-2 text-danger border"
                  onClick={handleLogout}
                  title="Logout"
                  aria-label="Logout"
                >
                  <FaSignOutAlt size={16} />
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link
                  to="/user/favorites"
                  className="btn btn-light rounded-circle p-2 border text-danger"
                  title="My Favorites"
                  aria-label="Favorites"
                >
                  <FaHeart size={16} />
                </Link>
                <Link
                  to="/user/dashboard"
                  className="btn btn-outline-secondary rounded-pill px-3 py-1 d-flex align-items-center gap-2 fw-semibold"
                >
                  <FaUserCircle size={18} className="text-secondary" />
                  <span>{firstName}</span>
                </Link>
                <button
                  className="btn btn-light rounded-circle p-2 text-danger border"
                  onClick={handleLogout}
                  title="Logout"
                  aria-label="Logout"
                >
                  <FaSignOutAlt size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="d-flex d-lg-none align-items-center gap-2">
            {user && user.role === 'user' && (
              <Link to="/user/favorites" className="btn btn-light rounded-circle p-2 border text-danger me-1">
                <FaHeart size={16} />
              </Link>
            )}
            <button
              className="pc-nav-toggle btn rounded-circle p-2"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={open}
            >
              {open ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Collapsible Menu */}
        {open && (
          <div className="pc-mobile-menu d-lg-none py-3 animate-fade-in border-top">
            <ul className="list-unstyled mb-3 d-flex flex-column gap-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `pc-mobile-nav-item d-flex align-items-center gap-3 px-3 py-2 rounded-3 ${
                        isActive ? 'active' : ''
                      }`
                    }
                    onClick={() => setOpen(false)}
                  >
                    <span className="pc-mobile-icon">{link.icon}</span>
                    <span className="fw-semibold">{link.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-top d-flex flex-column gap-2">
              {!user ? (
                <div className="d-flex gap-2">
                  <Link
                    to="/login"
                    className="btn btn-outline-secondary rounded-pill w-50 py-2 fw-semibold"
                    onClick={() => setOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="btn-pc-primary btn w-50 py-2"
                    onClick={() => setOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              ) : user.role === 'admin' ? (
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex align-items-center justify-content-between p-2 rounded-3 bg-light">
                    <span className="badge bg-dark text-warning rounded-pill px-3 py-2 d-flex align-items-center gap-1 border border-warning">
                      <FaShieldAlt size={12} /> Admin
                    </span>
                    <span className="fw-bold">{user.name}</span>
                  </div>
                  <Link
                    to="/admin/dashboard"
                    className="btn btn-dark rounded-pill py-2 fw-semibold"
                    onClick={() => setOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    className="btn btn-outline-danger rounded-pill py-2 d-flex align-items-center justify-content-center gap-2 fw-semibold"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt /> Log Out
                  </button>
                </div>
              ) : (
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex align-items-center gap-2 p-2 rounded-3 bg-light">
                    <FaUserCircle size={24} className="text-secondary" />
                    <div>
                      <div className="fw-bold" style={{ fontSize: '0.95rem' }}>{user.name}</div>
                      <div className="text-muted small">{user.email}</div>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <Link
                      to="/user/dashboard"
                      className="btn btn-outline-secondary rounded-pill flex-grow-1 py-2 fw-semibold"
                      onClick={() => setOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/user/favorites"
                      className="btn btn-outline-danger rounded-pill px-3 py-2 d-flex align-items-center justify-content-center gap-1"
                      onClick={() => setOpen(false)}
                    >
                      <FaHeart /> Favorites
                    </Link>
                  </div>
                  <button
                    className="btn btn-outline-danger rounded-pill py-2 d-flex align-items-center justify-content-center gap-2 fw-semibold"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
