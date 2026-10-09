const About = () => (
  <div className="container py-5">
    <h2 className="section-title text-center">About PawCare</h2>
    <p className="section-subtitle text-center">Connecting pets with loving homes since day one</p>

    <div className="row g-4 align-items-center mb-5">
      <div className="col-md-6">
        <img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=700" alt="About PawCare" className="img-fluid rounded-4 shadow-sm" />
      </div>
      <div className="col-md-6">
        <h4 className="fw-bold">Our Story</h4>
        <p className="text-muted">PawCare began as a small volunteer effort to rehome stray and shelter animals. Today, we run a full digital adoption platform that has helped hundreds of pets find loving families, while making the adoption process transparent and simple for everyone involved.</p>
      </div>
    </div>

    <div className="row g-4 mb-5">
      <div className="col-md-6">
        <div className="pc-card p-4 h-100">
          <h5 className="fw-bold">Our Mission</h5>
          <p className="text-muted mb-0">To eliminate barriers between loving families and pets in need, ensuring every adoptable animal finds a safe, permanent home.</p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="pc-card p-4 h-100">
          <h5 className="fw-bold">Our Vision</h5>
          <p className="text-muted mb-0">A world where every pet is cared for, every adoption is responsible, and no animal is left without a home.</p>
        </div>
      </div>
    </div>

    <div className="mb-5">
      <h4 className="fw-bold text-center mb-4">Why Pet Adoption Matters</h4>
      <div className="row g-4 text-center">
        {[
          'Reduces the number of animals in shelters',
          'Gives rescued pets a second chance at life',
          'Discourages unethical breeding practices',
          'Creates lifelong bonds between pets and families',
        ].map((point) => (
          <div className="col-md-3" key={point}>
            <div className="pc-card p-3 h-100">
              <p className="mb-0 text-muted">{point}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h4 className="fw-bold text-center mb-4">Our Team</h4>
      <div className="row g-4 text-center">
        {[
          { name: 'Ravi Sharma', role: 'Founder & Director' },
          { name: 'Ananya Iyer', role: 'Veterinary Lead' },
          { name: 'Karan Mehta', role: 'Adoption Coordinator' },
          { name: 'Sneha Nair', role: 'Volunteer Manager' },
        ].map((member) => (
          <div className="col-md-3" key={member.name}>
            <div className="pc-card p-4">
              <div className="rounded-circle mx-auto mb-3" style={{ width: 80, height: 80, background: 'var(--pc-beige)' }} />
              <h6 className="fw-bold mb-0">{member.name}</h6>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default About;
