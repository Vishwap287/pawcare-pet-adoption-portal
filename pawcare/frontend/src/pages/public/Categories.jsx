import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaDog, FaCat, FaDove, FaCarrot, FaPaw } from 'react-icons/fa';
import petService from '../../services/petService';
import Loading from '../../components/Loading';
import { handleImageError } from '../../utils/imageFallback';

const CATEGORY_INFO = [
  { key: 'Dog', label: 'Dogs', icon: <FaDog />, desc: 'Loyal, playful and always ready for an adventure. Dogs make wonderful companions for active families.', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500' },
  { key: 'Cat', label: 'Cats', icon: <FaCat />, desc: 'Independent, affectionate and endlessly curious. Cats bring quiet companionship to any home.', image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=500' },
  { key: 'Bird', label: 'Birds', icon: <FaDove />, desc: 'Colorful, musical and full of personality. Birds are a joy for those who love lively companions.', image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500' },
  { key: 'Rabbit', label: 'Rabbits', icon: <FaCarrot />, desc: 'Gentle and quiet, rabbits are perfect for calm households looking for a soft-hearted companion.', image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500' },
  { key: 'Other', label: 'Other Animals', icon: <FaPaw />, desc: 'From guinea pigs to turtles, we also care for a variety of small animals looking for homes.', image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500' },
];

const Categories = () => {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(CATEGORY_INFO.map((c) => petService.getPetsByCategory(c.key)))
      .then((results) => {
        const map = {};
        CATEGORY_INFO.forEach((c, i) => { map[c.key] = results[i].length; });
        setCounts(map);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading text="Loading categories..." />;

  return (
    <div className="container py-5">
      <h2 className="section-title text-center">Pet Categories</h2>
      <p className="section-subtitle text-center">Browse pets by type to find exactly what you're looking for</p>

      <div className="row g-4">
        {CATEGORY_INFO.map((cat, idx) => (
          <div className={`col-md-6 col-lg-4 pc-stagger-${idx + 1}`} key={cat.key}>
            <div className="pc-card h-100 d-flex flex-column">
              <div className="pc-card-img-wrapper" style={{ height: 210 }}>
                <img
                  src={cat.image}
                  alt={cat.label}
                  onError={(e) => handleImageError(e, cat.key)}
                  className="pc-card-img"
                />
              </div>
              <div className="p-4 d-flex flex-column flex-grow-1">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="fs-3" style={{ color: 'var(--pc-orange)' }}>{cat.icon}</span>
                  <h4 className="font-heading mb-0">{cat.label}</h4>
                </div>
                <p className="text-muted small mb-3">{cat.desc}</p>
                <div className="mt-auto">
                  <p className="fw-semibold mb-3 text-secondary">
                    <span className="badge rounded-pill bg-light text-dark px-3 py-2 border">
                      {counts[cat.key] || 0} pets available
                    </span>
                  </p>
                  <Link to={`/pets?category=${cat.key}`} className="btn-pc-primary btn w-100">
                    <span>Browse {cat.label}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
