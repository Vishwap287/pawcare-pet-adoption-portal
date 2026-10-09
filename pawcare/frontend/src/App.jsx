import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import PawCareDock from './components/ui/PawCareDock';

import Home from './pages/public/Home';
import About from './pages/public/About';
import Pets from './pages/public/Pets';
import PetDetails from './pages/public/PetDetails';
import Categories from './pages/public/Categories';
import HowAdoptionWorks from './pages/public/HowAdoptionWorks';
import Guidelines from './pages/public/Guidelines';
import Contact from './pages/public/Contact';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import NotFound from './pages/public/NotFound';

import UserDashboard from './pages/user/UserDashboard';
import Profile from './pages/user/Profile';
import Favorites from './pages/user/Favorites';
import MyApplications from './pages/user/MyApplications';
import AdoptionHistory from './pages/user/AdoptionHistory';
import AdoptionForm from './pages/user/AdoptionForm';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManagePets from './pages/admin/ManagePets';
import AddPet from './pages/admin/AddPet';
import EditPet from './pages/admin/EditPet';
import ManageUsers from './pages/admin/ManageUsers';
import ManageApplications from './pages/admin/ManageApplications';
import ManageMessages from './pages/admin/ManageMessages';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="d-flex flex-column min-vh-100">
      {!isAdminRoute && <Navbar />}
      <div className="flex-grow-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/how-it-works" element={<HowAdoptionWorks />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User (protected) */}
          <Route path="/user/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/user/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/user/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/user/applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />
          <Route path="/user/history" element={<ProtectedRoute><AdoptionHistory /></ProtectedRoute>} />
          <Route path="/user/adopt/:petId" element={<ProtectedRoute><AdoptionForm /></ProtectedRoute>} />

          {/* Admin (protected) */}
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/pets" element={<AdminRoute><ManagePets /></AdminRoute>} />
          <Route path="/admin/pets/add" element={<AdminRoute><AddPet /></AdminRoute>} />
          <Route path="/admin/pets/edit/:id" element={<AdminRoute><EditPet /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
          <Route path="/admin/applications" element={<AdminRoute><ManageApplications /></AdminRoute>} />
          <Route path="/admin/messages" element={<AdminRoute><ManageMessages /></AdminRoute>} />
          <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <PawCareDock />}
    </div>
  );
}

export default App;
