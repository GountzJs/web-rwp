import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FeedArticles } from "../modules/article/components/FeedArticles";
import { GlobalArticles } from "../modules/article/components/GlobalArticles";
import { NavArticlesHome } from "../modules/article/components/NavArticlesHome";
import { TagArticles } from "../modules/article/components/TagArticles";
import { ArticleHome } from "../modules/article/models/enums/articleHome.enum";
import { RootState } from "../modules/shared/redux/store";
import { ListTags } from "../modules/tag/components/ListTags";

export function HomePage() {
  const [select, setSelect] = useState<string>(ArticleHome.Global);
  const isLogin = useSelector((state: RootState) => state.auth.value);

  useEffect(() => {
    isLogin ? setSelect(ArticleHome.Feed) : setSelect(ArticleHome.Global);
  }, [isLogin])

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">

            <NavArticlesHome select={select} setSelect={setSelect} isLogin={Boolean(isLogin)} />

            { select === ArticleHome.Global && <GlobalArticles /> }

            { select === ArticleHome.Feed && <FeedArticles /> }

            { 
              (select !== ArticleHome.Global && select !== ArticleHome.Feed) && 
              <TagArticles tag={select} />
            }

          </div>

          <ListTags setSelect={setSelect} />

        </div>
      </div>
    </div>
  )
}