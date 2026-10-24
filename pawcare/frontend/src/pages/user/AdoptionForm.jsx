import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import petService from '../../services/petService';
import adoptionService from '../../services/adoptionService';
import { useAuth } from '../../context/AuthContext';
import Loading from '../../components/Loading';

const AdoptionForm = () => {
  const { petId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    homeType: 'Apartment',
    ownershipStatus: 'Own',
    familyMembers: 1,
    previousPetExperience: '',
    workingHours: '',
    petCarePlan: '',
    reasonForAdoption: '',
    financiallyPrepared: false,
    agreementAccepted: false,
  });

  useEffect(() => {
    petService.getPetById(petId).then(setPet).finally(() => setLoading(false));
  }, [petId]);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.agreementAccepted) {
      setError('You must agree to the care agreement to proceed.');
      return;
    }
    if (!form.petCarePlan || !form.reasonForAdoption) {
      setError('Please complete all required fields.');
      return;
    }
    setSubmitting(true);
    try {
      await adoptionService.createAdoption({ ...form, pet: petId });
      navigate('/user/applications');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;
  if (!pet) return <div className="p-5 text-center">Pet not found.</div>;

  return (
    <div className="row g-0">
      <div className="col-lg-2"><UserSidebar /></div>
      <div className="col-lg-10 p-4">
        <h3 className="font-heading mb-1">Adoption Application</h3>
        <p className="text-muted mb-4">
          You are applying to adopt <strong>{pet.name}</strong> ({pet.breed}) &bull; Adoption Fee: <strong style={{ color: 'var(--pc-orange)' }}>{pet.price && pet.price > 0 ? `₹${Number(pet.price).toLocaleString('en-IN')}` : 'Free Adoption'}</strong>
        </p>

        <div className="pc-card p-4" style={{ maxWidth: 760 }}>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <h6 className="fw-bold text-uppercase" style={{ color: 'var(--pc-orange)', fontSize: '0.85rem' }}>Personal Information</h6>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Full Name</label>
                <input className="form-control" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Email</label>
                <input type="email" className="form-control" value={form.email} onChange={(e) => update('email', e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Phone</label>
                <input className="form-control" value={form.phone} onChange={(e) => update('phone', e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Address</label>
                <input className="form-control" value={form.address} onChange={(e) => update('address', e.target.value)} required />
              </div>
            </div>

            <h6 className="fw-bold text-uppercase" style={{ color: 'var(--pc-orange)', fontSize: '0.85rem' }}>Lifestyle</h6>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Home Type</label>
                <select className="form-select" value={form.homeType} onChange={(e) => update('homeType', e.target.value)}>
                  <option>Apartment</option><option>Independent House</option><option>Farm House</option><option>Other</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Ownership Status</label>
                <select className="form-select" value={form.ownershipStatus} onChange={(e) => update('ownershipStatus', e.target.value)}>
                  <option>Own</option><option>Rent</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Family Members</label>
                <input type="number" min="1" className="form-control" value={form.familyMembers} onChange={(e) => update('familyMembers', Number(e.target.value))} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Working Hours</label>
                <input className="form-control" placeholder="e.g. 9 AM - 6 PM" value={form.workingHours} onChange={(e) => update('workingHours', e.target.value)} />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">Previous Pet Experience</label>
                <textarea className="form-control" rows="2" value={form.previousPetExperience} onChange={(e) => update('previousPetExperience', e.target.value)} />
              </div>
            </div>

            <h6 className="fw-bold text-uppercase" style={{ color: 'var(--pc-orange)', fontSize: '0.85rem' }}>Pet Care</h6>
            <div className="row g-3 mb-4">
              <div className="col-12">
                <label className="form-label fw-semibold">Where will the pet stay & who will care for it?</label>
                <textarea className="form-control" rows="2" value={form.petCarePlan} onChange={(e) => update('petCarePlan', e.target.value)} required />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">Why do you want to adopt {pet.name}?</label>
                <textarea className="form-control" rows="2" value={form.reasonForAdoption} onChange={(e) => update('reasonForAdoption', e.target.value)} required />
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="financial" checked={form.financiallyPrepared}
                    onChange={(e) => update('financiallyPrepared', e.target.checked)} />
                  <label className="form-check-label" htmlFor="financial">I am financially prepared for the costs of pet ownership</label>
                </div>
              </div>
            </div>

            <div className="form-check mb-4">
              <input type="checkbox" className="form-check-input" id="agreement" checked={form.agreementAccepted}
                onChange={(e) => update('agreementAccepted', e.target.checked)} required />
              <label className="form-check-label" htmlFor="agreement">
                I agree to provide proper care, food, medical attention and a safe environment.
              </label>
            </div>

            <button type="submit" className="btn-pc-primary btn btn-lg" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdoptionForm;
