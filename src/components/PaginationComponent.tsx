interface PaginationComponentProps {
  page: number;
  total: number;
  onChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ page, total, onChange }) => {
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button 
            type="button" 
            className={`btn btn-sm btn-${page === 1 ? "primary" : "outline-primary"}`} 
            onClick={() => onChange(page - 1)} 
            aria-label="Previous"
            disabled={page === 1}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
        </li>
        {
          Array.from({ length: total }, (_, i) => i + 1).map((item) => (
            <li key={item} className={`page-item mx-1 ${page === item ? "active" : ""}`}>
              <button 
                type="button" 
                className={`btn btn-sm btn-${page === item ? "primary" : "outline-primary"}`} 
                disabled={page === item}
                onClick={() => onChange(item)}
              >
                {item}
              </button>
            </li>
          ))
        }
        <li className={`page-item ${page === total ? "disabled" : ""}`}>
          <button 
            type="button" 
            className={`btn btn-sm btn-${page === total ? "primary" : "outline-primary"}`} 
            onClick={() => onChange(page + 1)} 
            aria-label="Next"
            disabled={page === total}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;
