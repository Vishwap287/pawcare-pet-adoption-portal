import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import PetForm from './PetForm';
import petService from '../../services/petService';

const emptyPet = {
  name: '', category: '', breed: '', age: '', gender: 'Male', size: 'Medium', color: '', price: 0,
  location: '', description: '', healthStatus: 'Healthy', vaccinationStatus: 'Vaccinated',
  status: 'Available', temperament: '', goodWithChildren: true, goodWithPets: true, image: '',
};

const AddPet = () => {
  const [form, setForm] = useState(emptyPet);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await petService.createPet({ ...form, age: Number(form.age), price: Number(form.price) || 0 });
      navigate('/admin/pets');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add pet');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout title="Add New Pet">
      <PetForm form={form} setForm={setForm} onSubmit={handleSubmit} submitting={submitting} error={error} submitLabel="Add Pet" />
    </AdminLayout>
  );
};

export default AddPet;
