import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

const CATEGORIES = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];
const GENDERS = ['Male', 'Female'];
const SIZES = ['Small', 'Medium', 'Large'];
const STATUSES = ['Available', 'Pending', 'Adopted'];

const FilterSidebar = ({ filters, setFilters, onApply, onReset }) => {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const activeCount = Object.values(filters).filter((v) => Boolean(v)).length;

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="pc-card p-3">
      {/* Mobile Toggle Header */}
      <div
        className="d-flex d-lg-none align-items-center justify-content-between cursor-pointer"
        onClick={() => setMobileExpanded(!mobileExpanded)}
        style={{ cursor: 'pointer' }}
      >
        <div className="d-flex align-items-center gap-2">
          <Filter size={18} className="text-secondary" />
          <h5 className="font-heading mb-0 fs-6">Filter Pets</h5>
          {activeCount > 0 && (
            <span className="badge bg-warning text-dark rounded-pill px-2 py-0.5" style={{ fontSize: '0.75rem' }}>
              {activeCount} active
            </span>
          )}
        </div>
        <button className="btn btn-sm btn-light border p-1 rounded-circle" type="button">
          {mobileExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Desktop Title */}
      <div className="d-none d-lg-flex align-items-center justify-content-between mb-3">
        <h5 className="font-heading mb-0">Filters</h5>
        {activeCount > 0 && (
          <span className="badge bg-warning text-dark rounded-pill px-2.5 py-1" style={{ fontSize: '0.75rem' }}>
            {activeCount} active
          </span>
        )}
      </div>

      {/* Collapsible Form Body on Mobile, always visible on Desktop */}
      <div className={`${mobileExpanded ? 'd-block mt-3' : 'd-none'} d-lg-block`}>

      <div className="mb-3">
        <label className="form-label fw-semibold">Category</label>
        <select className="form-select" value={filters.category || ''} onChange={(e) => handleChange('category', e.target.value)}>
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Breed</label>
        <input type="text" className="form-control" placeholder="e.g. Labrador"
          value={filters.breed || ''} onChange={(e) => handleChange('breed', e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Gender</label>
        <select className="form-select" value={filters.gender || ''} onChange={(e) => handleChange('gender', e.target.value)}>
          <option value="">Any</option>
          {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Size</label>
        <select className="form-select" value={filters.size || ''} onChange={(e) => handleChange('size', e.target.value)}>
          <option value="">Any</option>
          {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Location</label>
        <input type="text" className="form-control" placeholder="City"
          value={filters.location || ''} onChange={(e) => handleChange('location', e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Adoption Status</label>
        <select className="form-select" value={filters.status || ''} onChange={(e) => handleChange('status', e.target.value)}>
          <option value="">Any</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Sort By</label>
        <select className="form-select" value={filters.sort || ''} onChange={(e) => handleChange('sort', e.target.value)}>
          <option value="">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="name_asc">Name A-Z</option>
          <option value="name_desc">Name Z-A</option>
        </select>
      </div>

      <div className="d-flex gap-2">
        <button className="btn-pc-primary btn w-100" onClick={onApply}>Apply</button>
        <button className="btn btn-outline-secondary w-100" onClick={onReset}>Reset</button>
      </div>
    </div>
  </div>
  );
};

export default FilterSidebar;
