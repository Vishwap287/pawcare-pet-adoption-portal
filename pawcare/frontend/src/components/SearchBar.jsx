import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [value, setValue] = useState(initialValue);

  const submit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={submit} className="d-flex w-100 bg-white rounded-pill shadow-sm p-1 p-sm-2" style={{ maxWidth: 560 }}>
      <input
        type="text"
        className="form-control border-0 rounded-pill px-3"
        placeholder="Search by pet name or breed..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="btn-pc-primary btn d-flex align-items-center gap-2 px-3 px-sm-4 py-2 flex-shrink-0">
        <FaSearch /> <span className="d-none d-sm-inline">Search</span>
      </button>
    </form>
  );
};

export default SearchBar;
