import { ArticleHome } from "../models/enums/articleHome.enum";

interface INavArticlesHome {
  select: string;
  setSelect: React.Dispatch<React.SetStateAction<string>>,
  isLogin: boolean;
}

export function NavArticlesHome({ select, setSelect, isLogin }:  INavArticlesHome) {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {
          isLogin &&
          <li className="nav-item">
            <button 
              type="button"
              disabled={select === ArticleHome.Feed}
              className={`nav-link ${select === ArticleHome.Feed && 'active'}`}
              onClick={() => setSelect(ArticleHome.Feed)}
            >
              Your Feed
            </button>
          </li>
        }
        <li className="nav-item">
          <button 
            type="button"
            disabled={select === ArticleHome.Global}
            className={`nav-link ${select === ArticleHome.Global && 'active'}`}
            onClick={() => setSelect(ArticleHome.Global)}
          >
            Global Feed
          </button>
        </li>
        {
          (select !== ArticleHome.Global && select !== ArticleHome.Feed) &&
          <li className="nav-item">
            <span className='nav-link active'>
              <i className="ion-pound"></i>&nbsp;{ select }
            </span>
          </li>
        }
      </ul>
    </div>
  )
}