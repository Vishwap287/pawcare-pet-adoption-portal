import { Link } from 'react-router-dom';
import { FaSearch, FaPaw, FaClipboardCheck, FaHandHoldingHeart, FaHome, FaTruck } from 'react-icons/fa';

const STEPS = [
  { icon: <FaSearch />, title: 'Browse Pets', text: 'Explore our full catalog of pets available for adoption, filter by category, breed, age and more.' },
  { icon: <FaPaw />, title: 'Choose Your Companion', text: 'Read detailed profiles including temperament, health status and care needs to find your best match.' },
  { icon: <FaClipboardCheck />, title: 'Submit Application', text: 'Fill out our detailed adoption application with your lifestyle and home information.' },
  { icon: <FaHandHoldingHeart />, title: 'Application Review', text: 'Our team reviews your application to ensure a safe, loving match for the pet.' },
  { icon: <FaHome />, title: 'Meet the Pet', text: 'Once approved, arrange a visit to meet your future companion in person.' },
  { icon: <FaTruck />, title: 'Bring Your Pet Home', text: 'Complete the paperwork and welcome your new family member home!' },
];

const HowAdoptionWorks = () => (
  <div className="container py-5">
    <h2 className="section-title text-center">How Adoption Works</h2>
    <p className="section-subtitle text-center">Our simple six-step process makes adopting a pet easy and transparent</p>

    <div className="row g-4">
      {STEPS.map((step, i) => (
        <div className="col-md-6 col-lg-4" key={step.title}>
          <div className="pc-card p-4 h-100 text-center">
            <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
              style={{ width: 64, height: 64, background: 'var(--pc-beige)', color: 'var(--pc-orange)', fontSize: '1.6rem' }}>
              {step.icon}
            </div>
            <h6 className="fw-bold">Step {i + 1}: {step.title}</h6>
            <p className="text-muted mb-0">{step.text}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center mt-5">
      <Link to="/pets" className="btn-pc-primary btn btn-lg">Start Browsing Pets</Link>
    </div>
  </div>
);

export default HowAdoptionWorks;
