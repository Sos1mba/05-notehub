import { useState } from 'react';
import css from './App.module.css';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import NoteModal from '../NoteModal/NoteModal';
import { useDebounce } from 'use-debounce';

function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        <Pagination page={page} setPage={setPage} search={debouncedSearch} />
        <button className={css.button} onClick={() => setShowModal(true)}>
          Create note +
        </button>
      </header>

      <NoteList page={page} search={debouncedSearch} />

      {showModal && <NoteModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default App;
