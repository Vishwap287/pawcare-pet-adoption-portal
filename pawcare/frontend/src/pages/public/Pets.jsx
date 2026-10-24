import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import petService from '../../services/petService';
import { useAuth } from '../../context/AuthContext';
import PetCard from '../../components/PetCard';
import FilterSidebar from '../../components/FilterSidebar';
import SearchBar from '../../components/SearchBar';
import Loading from '../../components/Loading';
import NoPetsFound from '../../components/NoPetsFound';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Pets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pets, setPets] = useState([]);
  const [totalPets, setTotalPets] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  const urlCategory = searchParams.get('category') || '';
  const urlSearch = searchParams.get('search') || '';

  const [filters, setFilters] = useState({
    category: urlCategory,
    breed: '',
    gender: '',
    size: '',
    location: '',
    status: '',
    maxPrice: '',
    sort: '',
  });
  const [search, setSearch] = useState(urlSearch);

  // Sync state if URL changes (e.g. clicking category link from navbar or home)
  useEffect(() => {
    const cat = searchParams.get('category') || '';
    const q = searchParams.get('search') || '';
    setFilters((prev) => ({ ...prev, category: cat }));
    setSearch(q);
    setPage(1);
  }, [searchParams]);

  const fetchPets = useCallback(() => {
    setLoading(true);
    const params = { ...filters, search, page, limit: 12 };
    Object.keys(params).forEach((k) => { if (!params[k]) delete params[k]; });
    petService.getPets(params)
      .then((data) => {
        setPets(data.pets || []);
        setPages(data.pages || 1);
        setTotalPets(data.total || 0);
      })
      .catch((err) => {
        console.error('Failed to load pets:', err);
        setPets([]);
        setPages(1);
        setTotalPets(0);
      })
      .finally(() => setLoading(false));
  }, [filters, search, page]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      petService
        .getFavorites()
        .then((favs) => setFavorites(Array.isArray(favs) ? favs.map((f) => f._id) : []))
        .catch(() => setFavorites([]));
    } else {
      setFavorites([]);
    }
  }, [user]);

  const handleToggleFavorite = async (petId) => {
    if (!user) return;
    if (favorites.includes(petId)) {
      await petService.removeFavorite(petId);
      setFavorites(favorites.filter((id) => id !== petId));
    } else {
      await petService.addFavorite(petId);
      setFavorites([...favorites, petId]);
    }
  };

  const handleResetFilters = () => {
    setFilters({ category: '', breed: '', gender: '', size: '', location: '', status: '', maxPrice: '', sort: '' });
    setSearch('');
    setSearchParams({});
    setPage(1);
  };

  const handleSelectCategory = (catKey) => {
    setFilters((prev) => ({ ...prev, category: catKey }));
    setSearchParams(catKey ? { category: catKey } : {});
    setPage(1);
  };

  const handleSearchSubmit = (term) => {
    setSearch(term);
    const newParams = {};
    if (filters.category) newParams.category = filters.category;
    if (term) newParams.search = term;
    setSearchParams(newParams);
    setPage(1);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2 className="section-title">Adopt a Pet</h2>
        <p className="section-subtitle mb-2">Browse our loving pets looking for their forever homes</p>
        {!loading && (
          <span className="badge rounded-pill bg-white text-dark shadow-sm px-3 py-2 border" style={{ fontSize: '0.9rem' }}>
            <strong style={{ color: 'var(--pc-orange)' }}>{totalPets}</strong> {totalPets === 1 ? 'pet' : 'pets'} available
            {filters.category ? ` in ${filters.category}` : ''}
          </span>
        )}
      </div>

      <div className="d-flex justify-content-center mb-4">
        <SearchBar onSearch={handleSearchSubmit} initialValue={search} />
      </div>

      <div className="row g-4">
        <div className="col-lg-3">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            onApply={() => { setPage(1); fetchPets(); }}
            onReset={handleResetFilters}
          />
        </div>
        <div className="col-lg-9">
          {loading ? (
            <Loading text="Finding loving pets for you..." />
          ) : pets.length === 0 ? (
            <NoPetsFound
              search={search}
              category={filters.category}
              filters={filters}
              onReset={handleResetFilters}
              onSelectCategory={handleSelectCategory}
            />
          ) : (
            <>
              <div className="row g-4">
                {pets.map((pet, idx) => (
                  <div className={`col-md-6 col-xl-4 pc-stagger-${(idx % 8) + 1}`} key={pet._id}>
                    <PetCard
                      pet={pet}
                      isFavorite={favorites.includes(pet._id)}
                      onToggleFavorite={user ? handleToggleFavorite : undefined}
                    />
                  </div>
                ))}
              </div>

              {pages > 1 && (
                <div className="d-flex justify-content-center align-items-center mt-5 mb-3">
                  <nav className="pc-pagination-bar" aria-label="Pets pagination">
                    <button
                      disabled={page <= 1}
                      onClick={() => {
                        setPage((p) => Math.max(1, p - 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="pc-flow-btn pc-flow-btn-prev"
                      aria-label="Previous Page"
                    >
                      <ArrowLeft className="pc-flow-arrow" size={17} />
                      <span>Previous</span>
                    </button>

                    <div className="pc-page-numbers-group">
                      {Array.from({ length: Math.min(pages, 7) }, (_, idx) => {
                        let pageNum;
                        if (pages <= 7) {
                          pageNum = idx + 1;
                        } else if (page <= 4) {
                          pageNum = idx + 1;
                        } else if (page >= pages - 3) {
                          pageNum = pages - 6 + idx;
                        } else {
                          pageNum = page - 3 + idx;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => {
                              setPage(pageNum);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`pc-page-num ${pageNum === page ? 'active' : ''}`}
                            aria-label={`Go to page ${pageNum}`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      disabled={page >= pages}
                      onClick={() => {
                        setPage((p) => Math.min(pages, p + 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="pc-flow-btn pc-flow-btn-next"
                      aria-label="Next Page"
                    >
                      <span>Next</span>
                      <ArrowRight className="pc-flow-arrow" size={17} />
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pets;
