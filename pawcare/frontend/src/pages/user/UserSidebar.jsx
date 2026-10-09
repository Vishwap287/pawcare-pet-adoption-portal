import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaPaw, FaHeart, FaClipboardList, FaHistory, FaUser, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    { to: '/user/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { to: '/pets', label: 'Browse Pets', icon: <FaPaw /> },
    { to: '/user/favorites', label: 'Favorites', icon: <FaHeart /> },
    { to: '/user/applications', label: 'My Applications', icon: <FaClipboardList /> },
    { to: '/user/history', label: 'Adoption History', icon: <FaHistory /> },
    { to: '/user/profile', label: 'Profile', icon: <FaUser /> },
    { to: '/contact', label: 'Contact', icon: <FaEnvelope /> },
  ];

  return (
    <div className="pc-sidebar py-3 py-lg-4">
      {links.map((l) => (
        <NavLink key={l.to} to={l.to} className="side-link">
          {l.icon} <span>{l.label}</span>
        </NavLink>
      ))}
      <button className="side-link pc-sidebar-logout border-0 bg-transparent text-start" onClick={() => { logout(); navigate('/'); }}>
        <FaSignOutAlt /> <span>Logout</span>
      </button>
    </div>
  );
};

export default UserSidebar;
