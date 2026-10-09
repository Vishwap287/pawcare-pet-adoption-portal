import { FaSearch, FaRedo, FaPaw, FaDog, FaCat, FaDove, FaCarrot } from 'react-icons/fa';

const NoPetsFound = ({
  search = '',
  category = '',
  filters = {},
  onReset,
  onSelectCategory,
}) => {
  const hasActiveFilters = Boolean(
    search ||
    category ||
    filters.breed ||
    filters.gender ||
    filters.size ||
    filters.location ||
    filters.status
  );

  const categories = [
    { key: 'Dog', label: 'Dogs', icon: <FaDog /> },
    { key: 'Cat', label: 'Cats', icon: <FaCat /> },
    { key: 'Bird', label: 'Birds', icon: <FaDove /> },
    { key: 'Rabbit', label: 'Rabbits', icon: <FaCarrot /> },
    { key: 'Other', label: 'Other Pets', icon: <FaPaw /> },
  ];

  return (
    <div className="pc-card p-5 text-center my-3 border-0 shadow-sm" style={{ borderRadius: '24px', background: 'linear-gradient(180deg, #ffffff 0%, #fffcf8 100%)' }}>
      <div
        className="d-inline-flex align-items-center justify-content-center mb-4 position-relative"
        style={{
          width: '96px',
          height: '96px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255, 125, 59, 0.15) 0%, rgba(255, 125, 59, 0.05) 100%)',
          color: 'var(--pc-orange)',
        }}
      >
        <FaSearch size={38} />
        <span
          className="position-absolute"
          style={{
            bottom: '6px',
            right: '6px',
            background: 'var(--pc-orange)',
            color: '#fff',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(232, 96, 31, 0.3)',
          }}
        >
          <FaPaw size={16} />
        </span>
      </div>

      <h3 className="font-heading mb-2" style={{ color: 'var(--pc-charcoal)', fontWeight: 800 }}>
        No Pets Found
      </h3>

      <p className="text-muted mx-auto mb-4" style={{ maxWidth: '480px', fontSize: '1.05rem', lineHeight: '1.6' }}>
        {search ? (
          <>
            We couldn't find any furry friends matching "<strong>{search}</strong>"
            {category ? ` in the ${category} category.` : '.'}
          </>
        ) : category ? (
          <>No pets found matching the current filters in <strong>{category}s</strong>.</>
        ) : (
          <>We couldn't find any pets matching your selected filter criteria. Don't worry, there are hundreds of other lovable companions waiting for a home!</>
        )}
      </p>

      {/* Action buttons */}
      <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
        {hasActiveFilters && onReset && (
          <button
            onClick={onReset}
            className="btn-pc-primary btn d-inline-flex align-items-center gap-2 px-4 py-2"
          >
            <FaRedo size={14} /> Clear All Filters
          </button>
        )}
      </div>

      {/* Helpful suggestions */}
      <div className="pt-3 border-top" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
        <p className="small text-uppercase fw-bold text-muted mb-3" style={{ letterSpacing: '0.06em' }}>
          Explore Popular Categories (100 pets each)
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => onSelectCategory && onSelectCategory(cat.key)}
              className={`btn btn-sm rounded-pill d-inline-flex align-items-center gap-2 px-3 py-2 ${
                category === cat.key ? 'btn-pc-primary' : 'btn-outline-secondary'
              }`}
              style={{ transition: 'all 0.2s ease' }}
            >
              {cat.icon} <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoPetsFound;
