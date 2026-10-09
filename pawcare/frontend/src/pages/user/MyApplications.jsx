import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import adoptionService from '../../services/adoptionService';
import Loading from '../../components/Loading';
import { handleImageError } from '../../utils/imageFallback';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adoptionService.getMyAdoptions().then(setApplications).finally(() => setLoading(false));
  }, []);

  return (
    <div className="row g-0">
      <div className="col-lg-2"><UserSidebar /></div>
      <div className="col-lg-10 p-4">
        <h3 className="font-heading mb-4">My Applications</h3>
        {loading ? <Loading /> : applications.length === 0 ? (
          <div className="pc-card p-4 text-muted">
            You haven't submitted any adoption applications yet. <Link to="/pets">Browse pets</Link> to get started.
          </div>
        ) : (
          <div className="row g-4">
            {applications.map((app) => (
              <div className="col-md-6" key={app._id}>
                <div className="pc-card p-3 d-flex gap-3">
                  <img
                    src={app.pet?.image}
                    alt={app.pet?.name}
                    onError={(e) => handleImageError(e, app.pet?.category)}
                    style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 12 }}
                  />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <h6 className="fw-bold mb-1">{app.pet?.name}</h6>
                      <span className={`badge badge-app-${app.status} rounded-pill`}>{app.status}</span>
                    </div>
                    <p className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>Application ID: {app._id.slice(-8)}</p>
                    <p className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>Applied on: {new Date(app.createdAt).toLocaleDateString()}</p>
                    {app.adminRemarks && <p className="mb-0" style={{ fontSize: '0.85rem' }}><strong>Remarks:</strong> {app.adminRemarks}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
