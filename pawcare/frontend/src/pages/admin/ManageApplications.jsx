import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import adoptionService from '../../services/adoptionService';
import Loading from '../../components/Loading';
import { handleImageError } from '../../utils/imageFallback';

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [remarksDraft, setRemarksDraft] = useState({});

  const load = () => {
    setLoading(true);
    const params = statusFilter ? { status: statusFilter } : {};
    adoptionService.getAdoptions(params).then(setApplications).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [statusFilter]);

  const handleUpdate = async (id, status) => {
    const adminRemarks = remarksDraft[id] ?? '';
    await adoptionService.updateStatus(id, { status, adminRemarks });
    load();
  };

  return (
    <AdminLayout title="Adoption Applications">
      <div className="d-flex gap-2 mb-3">
        <select className="form-select" style={{ width: 200 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option>Pending</option><option>Approved</option><option>Rejected</option><option>Completed</option>
        </select>
      </div>

      {loading ? <Loading /> : (
        <div className="row g-3">
          {applications.map((app) => (
            <div className="col-12" key={app._id}>
              <div className="pc-card p-3">
                <div className="row g-3 align-items-start">
                  <div className="col-md-2">
                    <img
                      src={app.pet?.image}
                      alt={app.pet?.name}
                      onError={(e) => handleImageError(e, app.pet?.category)}
                      style={{ width: '100%', height: 90, objectFit: 'cover', borderRadius: 10 }}
                    />
                  </div>
                  <div className="col-md-4">
                    <h6 className="fw-bold mb-1">{app.pet?.name} <span className={`badge badge-app-${app.status} rounded-pill ms-2`}>{app.status}</span></h6>
                    <p className="mb-1 text-muted" style={{ fontSize: '0.85rem' }}>Applicant: {app.user?.name} ({app.user?.email})</p>
                    <p className="mb-1 text-muted" style={{ fontSize: '0.85rem' }}>Applied: {new Date(app.createdAt).toLocaleDateString()}</p>
                    <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>App ID: {app._id.slice(-8)}</p>
                  </div>
                  <div className="col-md-3">
                    <p className="mb-1" style={{ fontSize: '0.85rem' }}><strong>Reason:</strong> {app.reasonForAdoption}</p>
                    <p className="mb-0" style={{ fontSize: '0.85rem' }}><strong>Home:</strong> {app.homeType} ({app.ownershipStatus})</p>
                  </div>
                  <div className="col-md-3">
                    <textarea className="form-control mb-2" rows="2" placeholder="Admin remarks..."
                      defaultValue={app.adminRemarks}
                      onChange={(e) => setRemarksDraft((d) => ({ ...d, [app._id]: e.target.value }))} />
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-approve rounded-pill px-3" onClick={() => handleUpdate(app._id, 'Approved')} disabled={app.status === 'Approved'}>Approve</button>
                      <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => handleUpdate(app._id, 'Rejected')} disabled={app.status === 'Rejected'}>Reject</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {applications.length === 0 && <div className="pc-card p-4 text-center text-muted">No applications found.</div>}
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageApplications;
