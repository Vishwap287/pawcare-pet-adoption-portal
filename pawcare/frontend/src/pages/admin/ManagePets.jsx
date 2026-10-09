import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaRedo,
  FaChevronLeft,
  FaChevronRight,
  FaPlus
} from 'react-icons/fa';
import AdminLayout from './AdminLayout';
import petService from '../../services/petService';
import Loading from '../../components/Loading';
import { handleImageError } from '../../utils/imageFallback';

const ManagePets = () => {
  const [pets, setPets] = useState([]);
  const [totalPets, setTotalPets] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const limit = 10;

  const load = () => {
    setLoading(true);
    const params = { search, category, page, limit };
    Object.keys(params).forEach((k) => { if (!params[k]) delete params[k]; });
    petService.getPets(params)
      .then((data) => {
        setPets(data.pets || []);
        setPages(data.pages || 1);
        setTotalPets(data.total || 0);
      })
      .catch((err) => {
        console.error(err);
        setPets([]);
        setPages(1);
        setTotalPets(0);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    load();
  };

  const handleReset = () => {
    setSearch('');
    setCategory('');
    setPage(1);
    setTimeout(() => {
      petService.getPets({ page: 1, limit }).then((data) => {
        setPets(data.pets || []);
        setPages(data.pages || 1);
        setTotalPets(data.total || 0);
      });
    }, 0);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return;
    await petService.deletePet(id);
    load();
  };

  // Helper for neat windowed pagination numbers
  const getPaginationItems = () => {
    if (pages <= 7) {
      return Array.from({ length: pages }, (_, i) => i + 1);
    }

    const items = [];
    const delta = 1;
    const left = page - delta;
    const right = page + delta + 1;
    const range = [];

    for (let i = 1; i <= pages; i++) {
      if (i === 1 || i === pages || (i >= left && i < right)) {
        range.push(i);
      }
    }

    let prev = null;
    for (let current of range) {
      if (prev) {
        if (current - prev === 2) {
          items.push(prev + 1);
        } else if (current - prev !== 1) {
          items.push('...');
        }
      }
      items.push(current);
      prev = current;
    }

    return items;
  };

  return (
    <AdminLayout title="Manage Pets">
      {/* Header controls */}
      <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-md-center mb-3">
        <form onSubmit={handleSearchSubmit} className="d-flex flex-wrap gap-2 align-items-center">
          <div className="position-relative flex-grow-1 flex-sm-grow-0">
            <input
              className="form-control rounded-pill ps-3"
              placeholder="Search pet name or breed..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ minWidth: 170, maxWidth: '100%' }}
            />
          </div>
          <select
            className="form-select rounded-pill flex-grow-1 flex-sm-grow-0"
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            style={{ minWidth: 140 }}
          >
            <option value="">All Categories</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Other">Other</option>
          </select>
          <button type="submit" className="btn-pc-primary btn d-flex align-items-center gap-2 py-1 px-3">
            <FaSearch size={13} /> Search
          </button>
          {(search || category) && (
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill py-1 px-3 d-flex align-items-center gap-1"
              onClick={handleReset}
            >
              <FaRedo size={12} /> Reset
            </button>
          )}
        </form>

        <div className="d-flex align-items-center justify-content-between justify-content-md-end gap-2 gap-sm-3">
          <span className="badge bg-light text-dark border rounded-pill px-3 py-2 fw-semibold">
            Total: <strong style={{ color: 'var(--pc-orange)' }}>{totalPets}</strong> Pets
          </span>
          <Link to="/admin/pets/add" className="btn-pc-green btn d-flex align-items-center gap-2 py-1 px-3">
            <FaPlus size={13} /> Add Pet
          </Link>
        </div>
      </div>

      {loading ? (
        <Loading text="Loading pets list..." />
      ) : (
        <div className="pc-card p-0 shadow-sm border-0" style={{ borderRadius: '16px', overflow: 'hidden' }}>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light border-bottom">
                <tr style={{ fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ width: '70px', paddingLeft: '1.25rem' }}>Pet</th>
                  <th>Name & Breed</th>
                  <th>Category</th>
                  <th>Age & Gender</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th className="text-end" style={{ paddingRight: '1.25rem', minWidth: '170px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pets.map((pet) => (
                  <tr key={pet._id}>
                    <td style={{ paddingLeft: '1.25rem' }}>
                      <img
                        src={pet.image}
                        alt={pet.name}
                        onError={(e) => handleImageError(e, pet.category)}
                        style={{
                          width: 48,
                          height: 48,
                          objectFit: 'cover',
                          borderRadius: 12,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                        }}
                      />
                    </td>
                    <td>
                      <div className="fw-bold text-dark fs-6">{pet.name}</div>
                      <small className="text-muted">{pet.breed}</small>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border rounded-pill px-2 py-1 fw-semibold">
                        {pet.category}
                      </span>
                    </td>
                    <td>
                      <div className="fw-semibold">{pet.age} {pet.age === 1 ? 'yr' : 'yrs'}</div>
                      <small className="text-muted">{pet.gender} • {pet.size}</small>
                    </td>
                    <td>
                      <span className="text-secondary small fw-semibold">{pet.location}</span>
                    </td>
                    <td>
                      <span className={`badge badge-status-${pet.status} rounded-pill px-3 py-1 fw-semibold`}>
                        {pet.status}
                      </span>
                    </td>
                    <td className="text-end" style={{ paddingRight: '1.25rem' }}>
                      <div className="d-inline-flex align-items-center gap-2">
                        {/* Prominent Edit Button */}
                        <Link
                          to={`/admin/pets/edit/${pet._id}`}
                          className="btn btn-sm btn-primary rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1 fw-semibold shadow-sm"
                          style={{ fontSize: '0.85rem' }}
                          title={`Edit ${pet.name}`}
                        >
                          <FaEdit size={13} /> Edit
                        </Link>
                        {/* View in portal */}
                        <Link
                          to={`/pets/${pet._id}`}
                          target="_blank"
                          className="btn btn-sm btn-outline-secondary rounded-circle"
                          style={{ width: 32, height: 32, padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                          title={`View ${pet.name} details`}
                        >
                          <FaEye size={13} />
                        </Link>
                        {/* Delete button */}
                        <button
                          className="btn btn-sm btn-outline-danger rounded-circle"
                          style={{ width: 32, height: 32, padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                          onClick={() => handleDelete(pet._id, pet.name)}
                          title={`Delete ${pet.name}`}
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {pets.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-5">
                      <div className="py-3">
                        <h5>No pets found</h5>
                        <p className="text-muted small mb-0">Try changing your search keywords or filter category.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Neat, Modern Pagination Footer */}
          {pages > 1 && (
            <div className="d-flex flex-wrap align-items-center justify-content-between p-3 border-top bg-light">
              <div className="text-muted small fw-semibold mb-2 mb-md-0">
                Showing {((page - 1) * limit) + 1}–{Math.min(page * limit, totalPets)} of {totalPets} pets (Page {page} of {pages})
              </div>

              <div className="d-flex align-items-center gap-1">
                {/* Previous Button */}
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1 d-flex align-items-center gap-1 fw-semibold me-1"
                >
                  <FaChevronLeft size={10} /> Prev
                </button>

                {/* Numbered Page Buttons with Ellipsis */}
                {getPaginationItems().map((item, idx) => {
                  if (item === '...') {
                    return (
                      <span key={`dots-${idx}`} className="px-2 text-muted fw-bold">
                        ...
                      </span>
                    );
                  }

                  const isCurrent = item === page;
                  return (
                    <button
                      key={item}
                      onClick={() => setPage(item)}
                      className={`btn btn-sm rounded-circle fw-bold ${
                        isCurrent ? 'btn-pc-primary text-white shadow-sm' : 'btn-outline-secondary'
                      }`}
                      style={{
                        width: 34,
                        height: 34,
                        padding: 0,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.85rem'
                      }}
                    >
                      {item}
                    </button>
                  );
                })}

                {/* Next Button - Prominent, clean */}
                <button
                  disabled={page >= pages}
                  onClick={() => setPage((p) => Math.min(pages, p + 1))}
                  className="btn btn-sm btn-pc-primary rounded-pill px-3 py-1 d-flex align-items-center gap-1 fw-bold ms-1"
                >
                  Next <FaChevronRight size={10} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
};

export default ManagePets;
