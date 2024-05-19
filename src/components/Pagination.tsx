import { Link } from "react-router-dom";
import { PagedCollection } from "../interfaces/Collection";

interface PaginationProps {
  retrieved: PagedCollection<any> | null;
}

const Pagination = ({ retrieved }: PaginationProps) => {
  const view = retrieved && retrieved["hydra:view"];
  if (!view) {
    return null;
  }

  const {
    "hydra:first": first,
    "hydra:previous": previous,
    "hydra:next": next,
    "hydra:last": last,
  } = view;

  return (
    <nav aria-label="Page navigation" className="flex space-x-2 mt-4 justify-center">
      <Link
        to="."
        className={`px-4 py-2 rounded ${
          previous ? "bg-blue-500 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
        } text-white`}
        aria-label="First page"
      >
        <span aria-hidden="true">&lArr;</span> First
      </Link>
      <Link
        to={
          !previous || previous === first ? "." : encodeURIComponent(previous)
        }
        className={`px-4 py-2 rounded ${
          previous ? "bg-blue-500 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
        } text-white`}
        aria-label="Previous page"
      >
        <span aria-hidden="true">&larr;</span> Previous
      </Link>
      <Link
        to={next ? encodeURIComponent(next) : "#"}
        className={`px-4 py-2 rounded ${
          next ? "bg-blue-500 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
        } text-white`}
        aria-label="Next page"
      >
        Next <span aria-hidden="true">&rarr;</span>
      </Link>
      <Link
        to={last ? encodeURIComponent(last) : "#"}
        className={`px-4 py-2 rounded ${
          next ? "bg-blue-500 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
        } text-white`}
        aria-label="Last page"
      >
        Last <span aria-hidden="true">&rArr;</span>
      </Link>
    </nav>
  );
};

export default Pagination;
