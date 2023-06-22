import { useEffect, useState } from "react";

interface IListPagination { 
  page: number; 
  pageTotal: number;
  nextPage: (page: number) => void
}

export function ListPagination({ page, pageTotal, nextPage }: IListPagination) {
  const [listPages, setListPages] = useState<number[]>([]);

  useEffect(() => {
    const pages: number[] = []
    for (let i = 1; i <= pageTotal; i++) {
      pages.push(i)
    }
    setListPages(pages);
  }, [])

  return (
    <nav>
      <ul className="pagination">
        {
          listPages.map((pg: number, idx: number) =>
            <li
              key={idx}
              className={`page-item ${page === pg ? 'active' : ''}`}
            >
              <button
                type="button"
                disabled={page === pg}
                className="page-link"
                onClick={() => nextPage(pg)}
              >
                { pg }
              </button>
            </li>
          )
        }
      </ul>
    </nav>
  )
}