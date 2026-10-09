const PetForm = ({ form, setForm, onSubmit, submitting, error, submitLabel }) => {
  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="pc-card p-4" style={{ maxWidth: 800 }}>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Pet Name</label>
            <input className="form-control" value={form.name} onChange={(e) => update('name', e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Category</label>
            <select className="form-select" value={form.category} onChange={(e) => update('category', e.target.value)} required>
              <option value="">Select category</option>
              <option>Dog</option><option>Cat</option><option>Bird</option><option>Rabbit</option><option>Other</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Breed</label>
            <input className="form-control" value={form.breed} onChange={(e) => update('breed', e.target.value)} required />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Age (years)</label>
            <input type="number" min="0" className="form-control" value={form.age} onChange={(e) => update('age', e.target.value)} required />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Gender</label>
            <select className="form-select" value={form.gender} onChange={(e) => update('gender', e.target.value)} required>
              <option>Male</option><option>Female</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Size</label>
            <select className="form-select" value={form.size} onChange={(e) => update('size', e.target.value)}>
              <option>Small</option><option>Medium</option><option>Large</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Color</label>
            <input className="form-control" value={form.color} onChange={(e) => update('color', e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Location</label>
            <input className="form-control" value={form.location} onChange={(e) => update('location', e.target.value)} required />
          </div>
          <div className="col-12">
            <label className="form-label fw-semibold">Description</label>
            <textarea className="form-control" rows="3" value={form.description} onChange={(e) => update('description', e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Health Status</label>
            <input className="form-control" value={form.healthStatus} onChange={(e) => update('healthStatus', e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Vaccination Status</label>
            <select className="form-select" value={form.vaccinationStatus} onChange={(e) => update('vaccinationStatus', e.target.value)}>
              <option>Vaccinated</option><option>Not Vaccinated</option><option>Partially Vaccinated</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Adoption Status</label>
            <select className="form-select" value={form.status} onChange={(e) => update('status', e.target.value)}>
              <option>Available</option><option>Pending</option><option>Adopted</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label fw-semibold">Temperament</label>
            <input className="form-control" value={form.temperament} onChange={(e) => update('temperament', e.target.value)} placeholder="e.g. Friendly, Playful, Loyal" />
          </div>
          <div className="col-md-6">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="goodKids" checked={form.goodWithChildren} onChange={(e) => update('goodWithChildren', e.target.checked)} />
              <label className="form-check-label" htmlFor="goodKids">Good with Children</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="goodPets" checked={form.goodWithPets} onChange={(e) => update('goodWithPets', e.target.checked)} />
              <label className="form-check-label" htmlFor="goodPets">Good with Other Pets</label>
            </div>
          </div>
          <div className="col-12">
            <label className="form-label fw-semibold">Pet Image URL</label>
            <input className="form-control" value={form.image} onChange={(e) => update('image', e.target.value)} placeholder="https://..." required />
            {form.image && <img src={form.image} alt="preview" className="mt-2 rounded" style={{ width: 120, height: 120, objectFit: 'cover' }} />}
          </div>
        </div>
        <button type="submit" className="btn-pc-primary btn mt-4" disabled={submitting}>
          {submitting ? 'Saving...' : submitLabel}
        </button>
      </form>
    </div>
  );
};

export default PetForm;
