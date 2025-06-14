import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';

interface PaginationProps {
  page: number;
  setPage: (n: number) => void;
  search: string;
}

function Pagination({ page, setPage, search }: PaginationProps) {
  const { data } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, search }),
  });

  if (!data || data.totalPages <= 1) return null;

  return (
    <ReactPaginate
      pageCount={data.totalPages}
      forcePage={page - 1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      containerClassName={css.container}
      activeClassName={css.active}
      pageClassName={css.page}
      previousLabel="<"
      nextLabel=">"
    />
  );
}

export default Pagination;
