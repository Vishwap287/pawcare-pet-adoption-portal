import { Link } from 'react-router-dom';
import { FaPaw, FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => (
  <footer className="pc-footer pt-5 pb-5 mt-5 mb-5 mb-md-4">
    <div className="container">
      <div className="row g-4">
        <div className="col-md-4">
          <div className="d-flex align-items-center mb-3">
            <FaPaw size={24} color="var(--pc-orange)" className="me-2" />
            <span className="fs-4 text-white font-heading">PawCare</span>
          </div>
          <p>Connecting loving families with pets who need a second chance at a happy life.</p>
          <div className="d-flex gap-3 fs-5 mt-3">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
        <div className="col-md-2">
          <h6 className="text-white mb-3">Explore</h6>
          <ul className="list-unstyled d-flex flex-column gap-2">
            <li><Link to="/pets">Adopt a Pet</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/guidelines">Guidelines</Link></li>
          </ul>
        </div>
        <div className="col-md-2">
          <h6 className="text-white mb-3">Company</h6>
          <ul className="list-unstyled d-flex flex-column gap-2">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>
        <div className="col-md-4">
          <h6 className="text-white mb-3">Get in Touch</h6>
          <p className="d-flex align-items-center gap-2"><FaMapMarkerAlt /> 12 Companion Street, Bengaluru, India</p>
          <p className="d-flex align-items-center gap-2"><FaPhone /> +91 98765 43210</p>
          <p className="d-flex align-items-center gap-2"><FaEnvelope /> hello@pawcare.com</p>
        </div>
      </div>
      <hr className="border-secondary my-4" />
      <p className="text-center mb-0" style={{ fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} PawCare. All rights reserved. Built as an internship demo project.</p>
    </div>
  </footer>
);

export default Footer;
