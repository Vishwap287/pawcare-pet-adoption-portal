import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaHeart, FaRegHeart, FaMars, FaVenus, FaBirthdayCake, FaArrowRight } from 'react-icons/fa';
import { handleImageError } from '../utils/imageFallback';

const PetCard = ({ pet, isFavorite, onToggleFavorite }) => {
  return (
    <div className="pc-card h-100 position-relative d-flex flex-column">
      {onToggleFavorite && (
        <button
          className="pc-fav-btn"
          onClick={() => onToggleFavorite(pet._id)}
          aria-label="Toggle favorite"
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? <FaHeart color="#e8601f" size={17} /> : <FaRegHeart color="#e8601f" size={17} />}
        </button>
      )}

      <div className="pc-card-img-wrapper">
        <Link to={`/pets/${pet._id}`} className="d-block h-100">
          <img
            src={pet.image}
            alt={pet.name}
            onError={(e) => handleImageError(e, pet.category)}
            className="pc-card-img"
          />
        </Link>
        <span className={`pc-floating-status-pill badge-status-${pet.status}`}>
          <span className="pc-pulse-dot"></span>
          {pet.status}
        </span>
      </div>

      <div className="p-3 d-flex flex-column flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h5 className="mb-0 font-heading">{pet.name}</h5>
        </div>
        <p className="text-muted mb-2 small">{pet.breed}</p>

        <div className="d-flex flex-wrap gap-2 text-muted mb-3 mt-auto" style={{ fontSize: '0.82rem' }}>
          <span className="d-flex align-items-center gap-1 bg-light px-2 py-1 rounded-pill">
            <FaBirthdayCake className="text-warning" /> {pet.age} yr
          </span>
          <span className="d-flex align-items-center gap-1 bg-light px-2 py-1 rounded-pill">
            {pet.gender === 'Male' ? <FaMars className="text-primary" /> : <FaVenus className="text-danger" />} {pet.gender}
          </span>
          <span className="d-flex align-items-center gap-1 bg-light px-2 py-1 rounded-pill text-truncate" style={{ maxWidth: '130px' }}>
            <FaMapMarkerAlt className="text-success" /> {pet.location}
          </span>
        </div>

        <Link to={`/pets/${pet._id}`} className="btn-pc-primary btn w-100">
          <span>View Details</span>
          <FaArrowRight className="pc-btn-arrow" size={13} />
        </Link>
      </div>
    </div>
  );
};

export default PetCard;

