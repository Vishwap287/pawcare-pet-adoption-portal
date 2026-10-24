import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaSyringe, FaHeartbeat, FaChild, FaPaw, FaHeart, FaRegHeart } from 'react-icons/fa';
import petService from '../../services/petService';
import { useAuth } from '../../context/AuthContext';
import Loading from '../../components/Loading';
import { handleImageError } from '../../utils/imageFallback';

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    petService.getPetById(id).then(setPet).finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      petService
        .getFavorites()
        .then((favs) => setIsFavorite(Array.isArray(favs) && favs.some((f) => f._id === id)))
        .catch(() => setIsFavorite(false));
    } else {
      setIsFavorite(false);
    }
  }, [user, id]);

  const handleAdopt = () => {
    if (!user) {
      navigate('/login', { state: { from: `/pets/${id}` } });
      return;
    }
    navigate(`/user/adopt/${id}`);
  };

  const handleFavorite = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/pets/${id}` } });
      return;
    }
    if (isFavorite) {
      await petService.removeFavorite(id);
    } else {
      await petService.addFavorite(id);
    }
    setIsFavorite(!isFavorite);
  };

  if (loading) return <Loading text="Loading pet details..." />;
  if (!pet) return <div className="container py-5 text-center"><p>Pet not found.</p></div>;

  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-lg-6">
          <img
            src={pet.image}
            alt={pet.name}
            onError={(e) => handleImageError(e, pet.category)}
            className="img-fluid rounded-4 shadow-sm w-100"
            style={{ maxHeight: 480, objectFit: 'cover' }}
          />
        </div>
        <div className="col-lg-6">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
            <div>
              <h1 className="font-heading mb-1">{pet.name}</h1>
              <p className="text-muted fs-5 mb-0">{pet.breed} &middot; {pet.category}</p>
            </div>
            <div className="d-flex flex-column align-items-end gap-1">
              <span className={`badge badge-status-${pet.status} rounded-pill fs-6`}>{pet.status}</span>
            </div>
          </div>
          <p className="d-flex align-items-center gap-2 text-muted mt-2"><FaMapMarkerAlt /> {pet.location}</p>

          <div className="pc-card p-3 my-3 d-flex justify-content-between align-items-center" style={{ background: 'rgba(232, 96, 31, 0.06)', borderColor: 'rgba(232, 96, 31, 0.2)' }}>
            <div>
              <div className="text-muted small fw-semibold text-uppercase" style={{ letterSpacing: '0.04em' }}>Adoption Fee / Price</div>
              <div className="fs-3 fw-bold" style={{ color: 'var(--pc-orange)' }}>
                {pet.price && pet.price > 0 ? `₹${Number(pet.price).toLocaleString('en-IN')}` : 'Free Adoption'}
              </div>
            </div>
            <span className="badge bg-white text-secondary border px-3 py-2 rounded-pill shadow-xs">
              One-time Adoption Fee
            </span>
          </div>

          <div className="row g-3 my-3">
            {[
              ['Age', `${pet.age} year(s)`],
              ['Gender', pet.gender],
              ['Size', pet.size],
              ['Color', pet.color || '—'],
            ].map(([label, val]) => (
              <div className="col-6" key={label}>
                <div className="pc-card p-3">
                  <div className="text-muted" style={{ fontSize: '0.85rem' }}>{label}</div>
                  <div className="fw-bold">{val}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pc-card p-3 mb-3">
            <p className="mb-2 d-flex align-items-center gap-2"><FaHeartbeat color="var(--pc-green)" /> <strong>Health:</strong> {pet.healthStatus}</p>
            <p className="mb-2 d-flex align-items-center gap-2"><FaSyringe color="var(--pc-green)" /> <strong>Vaccination:</strong> {pet.vaccinationStatus}</p>
            <p className="mb-2 d-flex align-items-center gap-2"><FaPaw color="var(--pc-green)" /> <strong>Temperament:</strong> {pet.temperament}</p>
            <p className="mb-2 d-flex align-items-center gap-2"><FaChild color="var(--pc-green)" /> <strong>Good with Children:</strong> {pet.goodWithChildren ? 'Yes' : 'No'}</p>
            <p className="mb-0 d-flex align-items-center gap-2"><FaPaw color="var(--pc-green)" /> <strong>Good with Other Pets:</strong> {pet.goodWithPets ? 'Yes' : 'No'}</p>
          </div>

          <div className="pc-card p-3 mb-4">
            <h6 className="fw-bold">About {pet.name}</h6>
            <p className="mb-0 text-muted">{pet.description}</p>
          </div>

          <div className="d-flex flex-column flex-sm-row flex-wrap gap-2 gap-sm-3">
            <button className="btn-pc-primary btn btn-lg justify-content-center" onClick={handleAdopt} disabled={pet.status === 'Adopted'}>
              {pet.status === 'Adopted' ? 'Already Adopted' : 'Adopt Me'}
            </button>
            <button className="btn btn-outline-secondary btn-lg d-flex align-items-center justify-content-center gap-2" onClick={handleFavorite}>
              {isFavorite ? <FaHeart color="#e8601f" /> : <FaRegHeart />} {isFavorite ? 'Favorited' : 'Add to Favorites'}
            </button>
            <Link to="/contact" className="btn-pc-green btn btn-lg justify-content-center">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
