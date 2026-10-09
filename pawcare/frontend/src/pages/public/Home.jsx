import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPaw, FaHeart, FaSearch, FaHandHoldingHeart, FaHome, FaClipboardCheck, FaDog, FaCat, FaDove, FaCarrot } from 'react-icons/fa';
import petService from '../../services/petService';
import PetCard from '../../components/PetCard';
import SearchBar from '../../components/SearchBar';
import Loading from '../../components/Loading';

const STATS = [
  { label: 'Pets Adopted', value: '500+' },
  { label: 'Loving Families', value: '300+' },
  { label: 'Pets Waiting', value: '100+' },
  { label: 'Volunteers', value: '50+' },
];

const CATEGORY_ICONS = { Dog: <FaDog />, Cat: <FaCat />, Bird: <FaDove />, Rabbit: <FaCarrot />, Other: <FaPaw /> };

const TESTIMONIALS = [
  { name: 'Ananya R.', text: 'Adopting Max through PawCare was seamless. The application process was clear and the team was so supportive.' },
  { name: 'Rohit K.', text: 'We found our cat Luna here. The detailed pet profiles made it easy to know exactly what to expect.' },
  { name: 'Priya S.', text: 'The adoption guidelines and status tracking gave us total peace of mind throughout the process.' },
];

const Home = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    petService.getPets({ limit: 8, status: 'Available' })
      .then((data) => setPets(data.pets))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (term) => {
    navigate(`/pets?search=${encodeURIComponent(term)}`);
  };

  return (
    <div>
      <section className="pc-hero text-center position-relative">
        <FaPaw className="pc-hero-floating-icon pc-hero-floating-icon-1" />
        <FaHeart className="pc-hero-floating-icon pc-hero-floating-icon-2" />
        <FaPaw className="pc-hero-floating-icon pc-hero-floating-icon-3" />
        <FaHeart className="pc-hero-floating-icon pc-hero-floating-icon-4" />

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="pc-hero-badge">
            <FaPaw style={{ color: 'var(--pc-orange)' }} />
            <span>Verified Pet Adoption Portal &bull; 500+ Happy Tails</span>
          </div>

          <h1 className="display-4 font-heading mb-3 pc-animate-fadein fw-bold" style={{ letterSpacing: '-0.02em', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
            Find Your Perfect Companion
          </h1>
          <p className="fs-5 mb-4 mx-auto pc-animate-fadein" style={{ maxWidth: '620px', textShadow: '0 1px 6px rgba(0,0,0,0.35)', color: 'rgba(255,255,255,0.92)' }}>
            Give a loving pet a forever home. Every adoption changes two lives — yours and theirs.
          </p>

          <div className="d-flex flex-wrap gap-3 justify-content-center mb-4 pc-animate-fadein">
            <Link to="/pets" className="btn-pc-primary btn btn-lg px-4 py-3">
              <FaPaw /> Adopt a Pet
            </Link>
            <Link to="/pets" className="btn-pc-outline btn btn-lg px-4 py-3">
              Explore All Pets
            </Link>
          </div>

          <div className="d-flex justify-content-center pc-animate-fadein">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Modern Stats Section */}
      <section className="py-5" style={{ background: '#fdf9f4' }}>
        <div className="container">
          <div className="row text-center g-4">
            {STATS.map((s, idx) => (
              <div className="col-6 col-md-3" key={s.label}>
                <div className={`pc-stat-box pc-stagger-${idx + 1}`}>
                  <h2 className="font-heading display-6 fw-bold mb-1" style={{ color: 'var(--pc-orange)' }}>
                    {s.value}
                  </h2>
                  <p className="text-muted mb-0 fw-semibold">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge rounded-pill px-3 py-2 text-uppercase mb-2" style={{ background: 'rgba(255, 125, 59, 0.12)', color: 'var(--pc-orange)', fontWeight: 700, letterSpacing: '0.05em' }}>
              🐾 Loved Companions
            </span>
            <h2 className="section-title">Featured Pets</h2>
            <p className="section-subtitle">Meet some of our lovable pets currently looking for a caring home</p>
          </div>

          {loading ? (
            <Loading text="Loading adorable pets..." />
          ) : (
            <div className="row g-4">
              {pets.map((pet, i) => (
                <div className={`col-md-6 col-lg-3 pc-stagger-${(i % 8) + 1}`} key={pet._id}>
                  <PetCard pet={pet} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-5">
            <Link to="/pets" className="btn-pc-primary btn btn-lg px-4 py-2">
              <span>See All 500+ Pets</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Pet Categories Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Pet Categories</h2>
            <p className="section-subtitle">Browse pets by their unique personality and kind</p>
          </div>

          <div className="row g-4 text-center">
            {Object.keys(CATEGORY_ICONS).map((cat, idx) => (
              <div className="col-6 col-md-2-4 col-lg" key={cat}>
                <Link to={`/pets?category=${cat}`} className={`pc-cat-card pc-stagger-${idx + 1}`}>
                  <div className="pc-cat-icon mb-2">{CATEGORY_ICONS[cat]}</div>
                  <div className="fw-bold fs-6" style={{ color: 'var(--pc-charcoal)' }}>
                    {cat}s
                  </div>
                  <small className="text-muted d-block mt-1">Explore &rarr;</small>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Adoption Works Section */}
      <section className="py-5" style={{ background: '#fdf9f4' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge rounded-pill px-3 py-2 text-uppercase mb-2" style={{ background: 'rgba(63, 145, 66, 0.12)', color: 'var(--pc-green)', fontWeight: 700, letterSpacing: '0.05em' }}>
              Simple 6 Steps
            </span>
            <h2 className="section-title">How Adoption Works</h2>
            <p className="section-subtitle">A simple, transparent process from your first click to coming home</p>
          </div>

          <div className="row g-4 text-center">
            {[
              { icon: <FaSearch />, title: 'Browse Pets', text: 'Explore our available pets and filter by category, age, size and city.' },
              { icon: <FaPaw />, title: 'Choose Your Match', text: 'Find the companion that matches your lifestyle, family and home.' },
              { icon: <FaClipboardCheck />, title: 'Submit Application', text: 'Fill out our fast online adoption form in just a couple minutes.' },
              { icon: <FaHandHoldingHeart />, title: 'Application Review', text: 'Our dedicated shelter team reviews your details with care.' },
              { icon: <FaHome />, title: 'Meet Your Pet', text: 'Schedule a visit to get to know your future companion in person.' },
              { icon: <FaPaw />, title: 'Bring Them Home', text: 'Finalize the paperwork and celebrate welcoming a new family member.' },
            ].map((step, i) => (
              <div className="col-md-4" key={step.title}>
                <div className={`pc-step-card pc-stagger-${(i % 3) + 1}`}>
                  <div className="pc-step-num">{i + 1}</div>
                  <div className="fs-2 mb-3" style={{ color: 'var(--pc-green)' }}>{step.icon}</div>
                  <h6 className="fw-bold mb-2">{step.title}</h6>
                  <p className="text-muted mb-0 small">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Adopt Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Why Adopt From PawCare</h2>
            <p className="section-subtitle">We make pet adoption safe, transparent, and lifelong-rewarding</p>
          </div>

          <div className="row g-4">
            {[
              'Every pet is thoroughly health-checked and vaccinated before listing',
              'Transparent adoption process with live real-time status updates',
              'Dedicated volunteer and support team ready to assist at every step',
              'Comprehensive post-adoption guidance to help your pet settle in safely',
            ].map((point, idx) => (
              <div className="col-md-6" key={point}>
                <div className={`d-flex align-items-center gap-3 pc-card p-4 h-100 pc-stagger-${idx + 1}`} style={{ borderRadius: '18px' }}>
                  <div className="pc-brand-icon-wrapper flex-shrink-0" style={{ width: 48, height: 48, fontSize: '1.2rem' }}>
                    <FaPaw color="var(--pc-orange)" />
                  </div>
                  <p className="mb-0 fw-semibold text-secondary">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Happy Tails Testimonials */}
      <section className="py-5" style={{ background: '#fdf9f4' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Happy Tails</h2>
            <p className="section-subtitle">Real stories from our joyful adopting families</p>
          </div>

          <div className="row g-4">
            {TESTIMONIALS.map((t, i) => (
              <div className="col-md-4" key={t.name}>
                <div className={`pc-card p-4 h-100 pc-stagger-${i + 1} position-relative`} style={{ borderRadius: '20px' }}>
                  <div className="fs-1 text-warning opacity-50 mb-2 font-heading" style={{ lineHeight: 0.5 }}>“</div>
                  <p className="fst-italic text-secondary mb-3">{t.text}</p>
                  <p className="fw-bold mb-0" style={{ color: 'var(--pc-orange)' }}>— {t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="pc-cta-banner text-center text-white">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <h2 className="font-heading display-5 fw-bold mb-3">Ready to change a life?</h2>
          <p className="fs-5 mb-4 opacity-90 mx-auto" style={{ maxWidth: '580px' }}>
            Start your adoption journey today and give a wonderful pet the loving home they deserve.
          </p>
          <Link to="/pets" className="btn btn-light rounded-pill px-5 py-3 fw-bold fs-6 text-success shadow-lg">
            🐾 Browse Pets Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
