import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Article } from "../../modules/article/components/Article";
import { getArticlesService } from "../../modules/article/services/getArticlesService";
import { ListPagination } from "../../modules/shared/components/ListPagination";
import { UnLoggedHook } from "../../modules/shared/hooks/UnLoggedHook";
import { IArticleSchema } from "../../modules/shared/models/schemas/article.schema";

const limit = 5;

export function FavoritedArticlesPage() {
  const [articles, setArticles] = useState<IArticleSchema[]>([]);
  const [articlesCount, setArticlesCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const { username } = useParams();
  const unlogged = UnLoggedHook();

  useEffect(() => {
    if(username) nextPage(1);
  }, [username])

  const nextPage = (pg: number) => {
    setArticles([]);
    const offset = (pg - 1) * limit;
    setPage(pg);
    setLoading(true);
    getArticlesService(limit, offset, undefined, username)
      .then(res => {
        setArticlesCount(res.articlesCount);
        setArticles(res.articles);
      })
      .catch((err) => {
        if(err?.message === 'missing authorization credentials') unlogged();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const changeFavorited = (slug: string, favorited: boolean, favoritesCount: number) => {
    const arts = articles.map((art: IArticleSchema) => {
      if(art.slug === slug) {
        art.favorited = favorited;
        art.favoritesCount = favoritesCount;
      }
      return art;
    });
    setArticles(arts.filter(art => art.favorited))
  }

  return (
    <>
      { 
        loading &&
        <div className="article-preview">
          Loading articles...
        </div>
      }
      { 
        (!loading && !articles.length ) &&
        <div className="article-preview">
          No articles are here... yet.
        </div>
      }
      {
        !loading && articles.map((art: IArticleSchema, idx: number) => 
          <Article key={idx} article={art} changeFavorited={changeFavorited} />
        )
      }
      {
        !loading && Math.ceil(articlesCount / limit) > 1 &&
        <ListPagination 
          page={page}
          pageTotal={Math.ceil(articlesCount / limit)}
          nextPage={nextPage}
        />
      }
    </>
  )
}