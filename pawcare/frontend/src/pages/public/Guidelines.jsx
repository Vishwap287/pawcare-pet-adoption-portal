const Guidelines = () => (
  <div className="container py-5" style={{ maxWidth: 900 }}>
    <h2 className="section-title text-center">Adoption Guidelines</h2>
    <p className="section-subtitle text-center">Please review these guidelines carefully before applying</p>

    <div className="pc-card p-4 mb-4">
      <h5 className="fw-bold">Eligibility Requirements</h5>
      <ul>
        <li>Applicants must be at least 21 years of age</li>
        <li>A valid government-issued ID is required</li>
        <li>Landlord/society approval is required for renters</li>
      </ul>
    </div>

    <div className="pc-card p-4 mb-4">
      <h5 className="fw-bold">Home Environment Requirements</h5>
      <ul>
        <li>A safe, secure living space appropriate for the pet's size</li>
        <li>Outdoor space or regular access to walks for dogs</li>
        <li>No history of pet neglect or abandonment</li>
      </ul>
    </div>

    <div className="pc-card p-4 mb-4">
      <h5 className="fw-bold">Financial Responsibility</h5>
      <ul>
        <li>Ability to cover food, grooming and routine veterinary costs</li>
        <li>Preparedness for emergency medical expenses</li>
        <li>Budget for vaccinations and preventive care</li>
      </ul>
    </div>

    <div className="pc-card p-4 mb-4">
      <h5 className="fw-bold">Pet Care Responsibilities</h5>
      <ul>
        <li>Daily feeding, exercise and companionship</li>
        <li>Regular veterinary checkups and vaccinations</li>
        <li>A commitment to the pet's full lifetime</li>
      </ul>
    </div>

    <div className="pc-card p-4">
      <h5 className="fw-bold">Adoption Rules & Important Notes</h5>
      <ul className="mb-0">
        <li>All applications are reviewed by our admin team before approval</li>
        <li>False information on an application may result in rejection</li>
        <li>A signed care agreement is required at the time of application</li>
        <li>PawCare reserves the right to conduct follow-up checks post-adoption</li>
      </ul>
    </div>
  </div>
);

export default Guidelines;
