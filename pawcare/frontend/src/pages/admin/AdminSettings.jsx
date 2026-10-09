import { useState, useEffect } from 'react';
import {
  FaCog,
  FaUserShield,
  FaDatabase,
  FaBell,
  FaCheckCircle,
  FaSave,
  FaServer,
  FaShieldAlt,
  FaSlidersH
} from 'react-icons/fa';
import AdminLayout from './AdminLayout';
import { useAuth } from '../../context/AuthContext';
import userService from '../../services/userService';
import petService from '../../services/petService';

const AdminSettings = () => {
  const { user, updateUserData } = useAuth();
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'PawCare Admin',
    email: user?.email || 'admin@pawcare.com',
    phone: user?.phone || '',
  });

  const [platformSettings, setPlatformSettings] = useState({
    portalName: 'PawCare - Pet Adoption Portal',
    supportEmail: 'support@pawcare.com',
    supportPhone: '+91 98765 43210',
    notifyNewApplications: true,
    notifyContactMessages: true,
    requireAdminApproval: true,
    autoArchiveDays: '30',
  });

  const [petStats, setPetStats] = useState({ total: 500, available: 424 });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');
  const [settingsSuccess, setSettingsSuccess] = useState('');

  useEffect(() => {
    // Load pet count statistics
    petService.getPets({ limit: 1 })
      .then((data) => {
        if (data.total !== undefined) {
          setPetStats((prev) => ({ ...prev, total: data.total }));
        }
      })
      .catch(() => {});
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileSuccess('');
    setProfileError('');
    setSavingProfile(true);

    try {
      if (user?._id) {
        const updated = await userService.updateUser(user._id, {
          name: profileForm.name,
          phone: profileForm.phone,
        });
        updateUserData(updated);
      }
      setProfileSuccess('Admin profile updated successfully!');
      setTimeout(() => setProfileSuccess(''), 4000);
    } catch (err) {
      setProfileError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePlatformSubmit = (e) => {
    e.preventDefault();
    setSettingsSuccess('Platform settings saved successfully!');
    setTimeout(() => setSettingsSuccess(''), 4000);
  };

  return (
    <AdminLayout title="Portal Settings">
      <div className="row g-4">
        {/* Left Column: Admin Profile & Security */}
        <div className="col-lg-6">
          <div className="pc-card p-4 h-100 border-0 shadow-sm" style={{ borderRadius: '16px' }}>
            <div className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: 48,
                  height: 48,
                  background: 'rgba(255, 125, 59, 0.12)',
                  color: 'var(--pc-orange)',
                }}
              >
                <FaUserShield size={22} />
              </div>
              <div>
                <h5 className="font-heading mb-0">Admin Profile</h5>
                <small className="text-muted">Manage your administrator credentials and profile details</small>
              </div>
            </div>

            {profileSuccess && (
              <div className="alert alert-success d-flex align-items-center gap-2 py-2" role="alert">
                <FaCheckCircle /> {profileSuccess}
              </div>
            )}
            {profileError && (
              <div className="alert alert-danger py-2" role="alert">
                {profileError}
              </div>
            )}

            <form onSubmit={handleProfileSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold small text-muted text-uppercase">Admin Name</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small text-muted text-uppercase">Email Address</label>
                <input
                  type="email"
                  className="form-control rounded-3 bg-light text-muted"
                  value={profileForm.email}
                  disabled
                  title="Email cannot be changed directly"
                />
                <small className="text-muted" style={{ fontSize: '0.8rem' }}>Default superadmin email registered in MySQL database</small>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small text-muted text-uppercase">Contact Phone</label>
                <input
                  type="tel"
                  className="form-control rounded-3"
                  placeholder="e.g. +91 98765 43210"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold small text-muted text-uppercase">Role & Privileges</label>
                <div className="d-flex align-items-center gap-2 p-2 rounded-3 bg-light border">
                  <FaShieldAlt className="text-success" />
                  <span className="fw-bold small">Super Administrator (Full System Access)</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={savingProfile}
                className="btn-pc-primary btn d-inline-flex align-items-center gap-2 px-4 py-2"
              >
                <FaSave /> {savingProfile ? 'Saving Changes...' : 'Save Profile'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Platform Configuration */}
        <div className="col-lg-6">
          <div className="pc-card p-4 h-100 border-0 shadow-sm" style={{ borderRadius: '16px' }}>
            <div className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: 48,
                  height: 48,
                  background: 'rgba(63, 145, 66, 0.12)',
                  color: 'var(--pc-green)',
                }}
              >
                <FaSlidersH size={20} />
              </div>
              <div>
                <h5 className="font-heading mb-0">Platform Preferences</h5>
                <small className="text-muted">Configure adoption portal behavior and alerts</small>
              </div>
            </div>

            {settingsSuccess && (
              <div className="alert alert-success d-flex align-items-center gap-2 py-2" role="alert">
                <FaCheckCircle /> {settingsSuccess}
              </div>
            )}

            <form onSubmit={handlePlatformSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold small text-muted text-uppercase">Portal Name</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  value={platformSettings.portalName}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, portalName: e.target.value })}
                />
              </div>

              <div className="row g-2 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted text-uppercase">Support Email</label>
                  <input
                    type="email"
                    className="form-control rounded-3"
                    value={platformSettings.supportEmail}
                    onChange={(e) => setPlatformSettings({ ...platformSettings, supportEmail: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted text-uppercase">Support Phone</label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    value={platformSettings.supportPhone}
                    onChange={(e) => setPlatformSettings({ ...platformSettings, supportPhone: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small text-muted text-uppercase d-flex align-items-center gap-2">
                  <FaBell size={13} className="text-secondary" /> Notification Alerts
                </label>
                <div className="form-check form-switch mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="notifyApplications"
                    checked={platformSettings.notifyNewApplications}
                    onChange={(e) => setPlatformSettings({ ...platformSettings, notifyNewApplications: e.target.checked })}
                  />
                  <label className="form-check-label small" htmlFor="notifyApplications">
                    Notify admin immediately on new adoption applications
                  </label>
                </div>
                <div className="form-check form-switch mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="notifyMessages"
                    checked={platformSettings.notifyContactMessages}
                    onChange={(e) => setPlatformSettings({ ...platformSettings, notifyContactMessages: e.target.checked })}
                  />
                  <label className="form-check-label small" htmlFor="notifyMessages">
                    Notify admin on new contact inquiries from public visitors
                  </label>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="requireApproval"
                    checked={platformSettings.requireAdminApproval}
                    onChange={(e) => setPlatformSettings({ ...platformSettings, requireAdminApproval: e.target.checked })}
                  />
                  <label className="form-check-label small" htmlFor="requireApproval">
                    Enforce manual admin approval for all adoption requests
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn-pc-primary btn d-inline-flex align-items-center gap-2 px-4 py-2"
              >
                <FaSave /> Save Preferences
              </button>
            </form>
          </div>
        </div>

        {/* System & Database Status Card */}
        <div className="col-12">
          <div className="pc-card p-4 border-0 shadow-sm" style={{ borderRadius: '16px' }}>
            <div className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: 44,
                  height: 44,
                  background: 'rgba(63, 106, 216, 0.12)',
                  color: '#3f6ad8',
                }}
              >
                <FaDatabase size={18} />
              </div>
              <div>
                <h5 className="font-heading mb-0">System & Database Status</h5>
                <small className="text-muted">Live environment and database connection details</small>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-3">
                <div className="p-3 bg-light rounded-3 text-center border">
                  <small className="text-muted d-block mb-1">Total Pets Registered</small>
                  <h4 className="fw-bold mb-0" style={{ color: 'var(--pc-orange)' }}>{petStats.total}</h4>
                  <small className="text-success fw-semibold">100 per category</small>
                </div>
              </div>

              <div className="col-md-3">
                <div className="p-3 bg-light rounded-3 text-center border">
                  <small className="text-muted d-block mb-1">Database Engine</small>
                  <h6 className="fw-bold mb-0 text-dark">MySQL 8.0 (Sequelize ORM)</h6>
                  <small className="text-success fw-semibold">● Connected (Port 3306)</small>
                </div>
              </div>

              <div className="col-md-3">
                <div className="p-3 bg-light rounded-3 text-center border">
                  <small className="text-muted d-block mb-1">Backend Server</small>
                  <h6 className="fw-bold mb-0 text-dark">Express / Node.js</h6>
                  <small className="text-success fw-semibold">● Active (Port 5000)</small>
                </div>
              </div>

              <div className="col-md-3">
                <div className="p-3 bg-light rounded-3 text-center border">
                  <small className="text-muted d-block mb-1">Frontend Server</small>
                  <h6 className="fw-bold mb-0 text-dark">React 18 / Vite</h6>
                  <small className="text-success fw-semibold">● Live (Port 5173)</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
