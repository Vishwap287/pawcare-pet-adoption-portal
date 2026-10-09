import { useEffect, useState } from 'react';
import UserSidebar from './UserSidebar';
import userService from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import Loading from '../../components/Loading';

const Profile = () => {
  const { user, updateUserData } = useAuth();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    userService.getUserById(user._id).then((data) => setForm(data)).finally(() => setLoading(false));
  }, [user._id]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const updated = await userService.updateUser(user._id, {
        name: form.name, phone: form.phone, address: form.address,
        city: form.city, state: form.state, pincode: form.pincode, profileImage: form.profileImage,
      });
      updateUserData({ name: updated.name, profileImage: updated.profileImage });
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) return <Loading />;

  return (
    <div className="row g-0">
      <div className="col-lg-2"><UserSidebar /></div>
      <div className="col-lg-10 p-4">
        <h3 className="font-heading mb-4">My Profile</h3>
        <div className="pc-card p-4" style={{ maxWidth: 640 }}>
          {message && <div className="alert alert-info">{message}</div>}
          <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3 mb-4">
            <div className="rounded-circle overflow-hidden flex-shrink-0" style={{ width: 80, height: 80, background: 'var(--pc-beige)' }}>
              {form.profileImage && <img src={form.profileImage} alt="profile" className="w-100 h-100" style={{ objectFit: 'cover' }} />}
            </div>
            <div className="flex-grow-1 w-100">
              <label className="form-label fw-semibold mb-1">Profile Image URL</label>
              <input className="form-control" value={form.profileImage || ''} onChange={(e) => setForm({ ...form, profileImage: e.target.value })} placeholder="https://..." />
            </div>
          </div>
          <form onSubmit={handleSave}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Full Name</label>
                <input className="form-control" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Email</label>
                <input className="form-control" value={form.email || ''} disabled />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Phone</label>
                <input className="form-control" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Address</label>
                <input className="form-control" value={form.address || ''} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">City</label>
                <input className="form-control" value={form.city || ''} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">State</label>
                <input className="form-control" value={form.state || ''} onChange={(e) => setForm({ ...form, state: e.target.value })} />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">Pincode</label>
                <input className="form-control" value={form.pincode || ''} onChange={(e) => setForm({ ...form, pincode: e.target.value })} />
              </div>
            </div>
            <button type="submit" className="btn-pc-primary btn mt-4" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
