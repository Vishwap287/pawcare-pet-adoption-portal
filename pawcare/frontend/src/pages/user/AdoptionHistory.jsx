import { useEffect, useState } from 'react';
import UserSidebar from './UserSidebar';
import adoptionService from '../../services/adoptionService';
import Loading from '../../components/Loading';

const AdoptionHistory = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adoptionService.getMyAdoptions()
      .then((apps) => setApplications(apps.filter((a) => ['Approved', 'Rejected', 'Completed'].includes(a.status))))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="row g-0">
      <div className="col-lg-2"><UserSidebar /></div>
      <div className="col-lg-10 p-4">
        <h3 className="font-heading mb-4">Adoption History</h3>
        {loading ? <Loading /> : applications.length === 0 ? (
          <div className="pc-card p-4 text-muted">No completed or reviewed applications yet.</div>
        ) : (
          <div className="table-responsive">
            <table className="table pc-card align-middle">
              <thead><tr><th>Pet</th><th>Applied On</th><th>Status</th><th>Remarks</th></tr></thead>
              <tbody>
                {applications.map((a) => (
                  <tr key={a._id}>
                    <td>{a.pet?.name}</td>
                    <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                    <td><span className={`badge badge-app-${a.status} rounded-pill`}>{a.status}</span></td>
                    <td>{a.adminRemarks || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptionHistory;
