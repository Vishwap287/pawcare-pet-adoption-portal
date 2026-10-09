import { useEffect, useState } from 'react';
import { FaTrash, FaLock, FaLockOpen } from 'react-icons/fa';
import AdminLayout from './AdminLayout';
import userService from '../../services/userService';
import Loading from '../../components/Loading';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => userService.getUsers().then(setUsers).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleToggleBlock = async (u) => {
    await userService.updateUser(u._id, { isBlocked: !u.isBlocked });
    load();
  };

  const handleDelete = async (u) => {
    if (!window.confirm(`Delete user ${u.name}? This cannot be undone.`)) return;
    await userService.deleteUser(u._id);
    load();
  };

  return (
    <AdminLayout title="Manage Users">
      {loading ? <Loading /> : (
        <div className="pc-card p-3">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Registered</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td className="fw-semibold">{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone || '—'}</td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td><span className="badge bg-secondary">{u.role}</span></td>
                    <td>{u.isBlocked ? <span className="badge bg-danger">Blocked</span> : <span className="badge bg-success">Active</span>}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-warning" onClick={() => handleToggleBlock(u)}>
                          {u.isBlocked ? <FaLockOpen /> : <FaLock />}
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(u)}><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && <tr><td colSpan="7" className="text-center text-muted py-4">No users found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageUsers;
