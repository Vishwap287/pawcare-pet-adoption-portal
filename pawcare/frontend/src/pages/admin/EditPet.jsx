import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import PetForm from './PetForm';
import petService from '../../services/petService';
import Loading from '../../components/Loading';

const EditPet = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    petService.getPetById(id).then(setForm).finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await petService.updatePet(id, { ...form, age: Number(form.age) });
      navigate('/admin/pets');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update pet');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !form) return <AdminLayout title="Edit Pet"><Loading /></AdminLayout>;

  return (
    <AdminLayout title={`Edit Pet: ${form.name}`}>
      <PetForm form={form} setForm={setForm} onSubmit={handleSubmit} submitting={submitting} error={error} submitLabel="Save Changes" />
    </AdminLayout>
  );
};

export default EditPet;
