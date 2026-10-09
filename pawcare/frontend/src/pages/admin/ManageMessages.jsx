import { useEffect, useState } from 'react';
import { FaTrash, FaEnvelopeOpen } from 'react-icons/fa';
import AdminLayout from './AdminLayout';
import contactService from '../../services/contactService';
import Loading from '../../components/Loading';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => contactService.getMessages().then(setMessages).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleMarkRead = async (id) => {
    await contactService.markAsRead(id);
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await contactService.deleteMessage(id);
    load();
  };

  return (
    <AdminLayout title="Contact Messages">
      {loading ? <Loading /> : messages.length === 0 ? (
        <div className="pc-card p-4 text-center text-muted">No contact messages yet.</div>
      ) : (
        <div className="row g-3">
          {messages.map((m) => (
            <div className="col-12" key={m._id}>
              <div className="pc-card p-3">
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                  <div>
                    <h6 className="fw-bold mb-1">{m.subject || '(No subject)'} <span className={`badge ${m.status === 'Read' ? 'bg-secondary' : 'bg-warning text-dark'} ms-2`}>{m.status}</span></h6>
                    <p className="mb-1 text-muted" style={{ fontSize: '0.85rem' }}>{m.name} &lt;{m.email}&gt; {m.phone && `· ${m.phone}`}</p>
                    <p className="mb-1 text-muted" style={{ fontSize: '0.8rem' }}>{new Date(m.createdAt).toLocaleString()}</p>
                    <p className="mb-0">{m.message}</p>
                  </div>
                  <div className="d-flex gap-2">
                    {m.status !== 'Read' && (
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => handleMarkRead(m._id)}><FaEnvelopeOpen /> Mark Read</button>
                    )}
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(m._id)}><FaTrash /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageMessages;
