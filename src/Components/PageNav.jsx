import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function PageNav({ currentPage, nextPage, lastPage }) {
  return (
    <div>
      {currentPage === 1 && lastPage ? null : currentPage === 1 ? (
        <div className="pages">
          <button
            aria-label="next-page"
            onClick={() => {
              nextPage(1);
            }}
          >
            <FaArrowRight />
          </button>
        </div>
      ) : lastPage ? (
        <div className="pages">
          <button
            aria-label="last-page"
            onClick={() => {
              nextPage(-1);
            }}
          >
            <FaArrowLeft />
          </button>
        </div>
      ) : (
        <div className="pages">
          <button
            aria-label="last-page"
            onClick={() => {
              nextPage(-1);
            }}
          >
            <FaArrowLeft />
          </button>
          <button
            aria-label="next-page"
            onClick={() => {
              nextPage(1);
            }}
          >
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}

export default PageNav;
