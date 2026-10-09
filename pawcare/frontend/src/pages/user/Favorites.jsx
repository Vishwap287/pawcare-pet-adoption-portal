import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaPaw } from 'react-icons/fa';
import UserSidebar from './UserSidebar';
import petService from '../../services/petService';
import PetCard from '../../components/PetCard';
import Loading from '../../components/Loading';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => petService.getFavorites().then(setFavorites).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const handleRemove = async (petId) => {
    await petService.removeFavorite(petId);
    setFavorites(favorites.filter((p) => p._id !== petId));
  };

  return (
    <div className="row g-0">
      <div className="col-lg-2"><UserSidebar /></div>
      <div className="col-lg-10 p-4">
        <h3 className="font-heading mb-4">My Favorites</h3>
        {loading ? <Loading text="Loading favorites..." /> : favorites.length === 0 ? (
          <div className="pc-card p-5 text-center my-3 border-0 shadow-sm" style={{ borderRadius: '24px' }}>
            <div
              className="d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(255, 125, 59, 0.1)',
                color: 'var(--pc-orange)'
              }}
            >
              <FaHeart size={36} />
            </div>
            <h4 className="font-heading mb-2">No Favorite Pets Saved Yet</h4>
            <p className="text-muted mx-auto mb-4" style={{ maxWidth: '420px' }}>
              Whenever you find a pet you love, tap the heart icon on their card to save them here for quick access!
            </p>
            <Link to="/pets" className="btn-pc-primary btn d-inline-flex align-items-center gap-2 px-4 py-2">
              <FaPaw /> Browse Pets to Adopt
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {favorites.map((pet) => (
              <div className="col-md-6 col-lg-4" key={pet._id}>
                <PetCard pet={pet} isFavorite onToggleFavorite={handleRemove} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
