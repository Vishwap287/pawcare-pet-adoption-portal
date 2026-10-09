import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaHourglassHalf, FaCheckCircle, FaHeart } from 'react-icons/fa';
import UserSidebar from './UserSidebar';
import adoptionService from '../../services/adoptionService';
import petService from '../../services/petService';
import { useAuth } from '../../context/AuthContext';
import Loading from '../../components/Loading';
import PetCard from '../../components/PetCard';

const StatCard = ({ icon, label, value, color }) => (
  <div className="stat-card" style={{ background: color }}>
    <div className="fs-3 mb-2">{icon}</div>
    <h3 className="font-heading mb-0">{value}</h3>
    <p className="mb-0">{label}</p>
  </div>
);

const UserDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adoptionService.getMyAdoptions(),
      petService.getFavorites(),
      petService.getPets({ limit: 4, status: 'Available' }),
    ])
      .then(([apps, favs, petsData]) => {
        setApplications(apps);
        setFavorites(favs);
        setRecommended(petsData.pets);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  const pending = applications.filter((a) => a.status === 'Pending').length;
  const approved = applications.filter((a) => a.status === 'Approved').length;

  return (
    <div className="row g-0">
      <div className="col-lg-2">
        <UserSidebar />
      </div>
      <div className="col-lg-10 p-4">
        <h3 className="font-heading">Welcome back, {user?.name}! 👋</h3>
        <p className="text-muted mb-4">Here's an overview of your adoption journey</p>

        <div className="row g-3 mb-5">
          <div className="col-6 col-md-3"><StatCard icon={<FaClipboardList />} label="Total Applications" value={applications.length} color="#ff7d3b" /></div>
          <div className="col-6 col-md-3"><StatCard icon={<FaHourglassHalf />} label="Pending" value={pending} color="#e0a721" /></div>
          <div className="col-6 col-md-3"><StatCard icon={<FaCheckCircle />} label="Approved" value={approved} color="#3f9142" /></div>
          <div className="col-6 col-md-3"><StatCard icon={<FaHeart />} label="Favorite Pets" value={favorites.length} color="#d9534f" /></div>
        </div>

        <h5 className="fw-bold mb-3">Recent Applications</h5>
        {applications.length === 0 ? (
          <div className="pc-card p-4 mb-5 text-muted">You haven't submitted any adoption applications yet.</div>
        ) : (
          <div className="table-responsive mb-5">
            <table className="table pc-card align-middle">
              <thead><tr><th>Pet</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {applications.slice(0, 5).map((a) => (
                  <tr key={a._id}>
                    <td>{a.pet?.name}</td>
                    <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                    <td><span className={`badge badge-app-${a.status} rounded-pill`}>{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <h5 className="fw-bold mb-3">Recommended Pets</h5>
        <div className="row g-4">
          {recommended.map((pet) => (
            <div className="col-md-6 col-lg-3" key={pet._id}>
              <PetCard pet={pet} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
