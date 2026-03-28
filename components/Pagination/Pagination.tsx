"use client";

import css from "./Pagination.module.css";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className={css.container}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={css.button}
      >
        Prev
      </button>

      <span className={css.info}>
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={css.button}
      >
        Next
      </button>
    </div>
  );
}