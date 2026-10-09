const Loading = ({ text = 'Loading...' }) => (
  <div className="d-flex flex-column align-items-center justify-content-center py-5">
    <div className="spinner-border" style={{ color: 'var(--pc-orange)' }} role="status" />
    <p className="mt-3 text-muted">{text}</p>
  </div>
);

export default Loading;
