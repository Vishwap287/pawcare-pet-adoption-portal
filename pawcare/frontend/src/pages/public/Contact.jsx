import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import contactService from '../../services/contactService';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in your name, email and message.');
      return;
    }
    setLoading(true);
    try {
      await contactService.sendMessage(form);
      setSuccess('Thank you! Your message has been sent. We will get back to you soon.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="section-title text-center">Contact Us</h2>
      <p className="section-subtitle text-center">Have questions about adoption? We'd love to hear from you</p>

      <div className="row g-5">
        <div className="col-lg-7">
          <div className="pc-card p-4">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Name</label>
                  <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Email</label>
                  <input type="email" className="form-control" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Phone</label>
                  <input className="form-control" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Subject</label>
                  <input className="form-control" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Message</label>
                  <textarea className="form-control" rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                </div>
              </div>
              <button type="submit" className="btn-pc-primary btn mt-4" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="pc-card p-4 mb-4">
            <p className="d-flex align-items-center gap-2"><FaMapMarkerAlt color="var(--pc-orange)" /> 12 Companion Street, Bengaluru, India</p>
            <p className="d-flex align-items-center gap-2"><FaPhone color="var(--pc-orange)" /> +91 98765 43210</p>
            <p className="d-flex align-items-center gap-2"><FaEnvelope color="var(--pc-orange)" /> hello@pawcare.com</p>
            <p className="d-flex align-items-center gap-2 mb-0"><FaClock color="var(--pc-orange)" /> Mon–Sat, 9:00 AM – 6:00 PM</p>
            <div className="d-flex gap-3 fs-4 mt-3">
              <a href="#" style={{ color: 'var(--pc-charcoal)' }}><FaFacebook /></a>
              <a href="#" style={{ color: 'var(--pc-charcoal)' }}><FaInstagram /></a>
              <a href="#" style={{ color: 'var(--pc-charcoal)' }}><FaTwitter /></a>
            </div>
          </div>
          <div className="pc-card overflow-hidden" style={{ height: 260 }}>
            <iframe title="map" src="https://www.openstreetmap.org/export/embed.html?bbox=77.55%2C12.90%2C77.65%2C13.00&layer=mapnik" width="100%" height="100%" style={{ border: 0 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
