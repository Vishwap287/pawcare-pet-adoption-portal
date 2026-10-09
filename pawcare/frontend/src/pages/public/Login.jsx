import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please enter both email and password');
      return;
    }
    setLoading(true);
    try {
      const data = await login(form);
      const redirectTo = location.state?.from || (data.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
      navigate(redirectTo);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 460 }}>
      <div className="pc-card p-4 p-md-5">
        <h2 className="font-heading text-center mb-1">Welcome Back</h2>
        <p className="text-muted text-center mb-4">Login to your PawCare account</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input type="email" className="form-control" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <input type={showPassword ? 'text' : 'password'} className="form-control" value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="remember" checked={remember}
                onChange={(e) => setRemember(e.target.checked)} />
              <label className="form-check-label" htmlFor="remember">Remember Me</label>
            </div>
            <Link to="/contact" className="text-decoration-none" style={{ color: 'var(--pc-orange)' }}>Forgot Password?</Link>
          </div>

          <button type="submit" className="btn-pc-primary btn w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-4 mb-0">
          Don't have an account? <Link to="/register" style={{ color: 'var(--pc-orange)' }}>Create Account</Link>
        </p>
        <p className="text-center mt-2 mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
          Admin? Use your admin credentials to login here too.
        </p>
      </div>
    </div>
  );
};

export default Login;
