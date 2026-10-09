import { Link } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';

const NotFound = () => (
  <div className="container py-5 text-center">
    <FaPaw size={60} color="var(--pc-orange)" className="mb-3" />
    <h1 className="font-heading">404</h1>
    <p className="text-muted mb-4">Oops! The page you're looking for wandered off, just like a curious pup.</p>
    <Link to="/" className="btn-pc-primary btn">Back to Home</Link>
  </div>
);

export default NotFound;
