import { useEffect, useState } from "react";
import { ListPagination } from "../../shared/components/ListPagination";
import { UnLoggedHook } from "../../shared/hooks/UnLoggedHook";
import { IArticleSchema } from "../../shared/models/schemas/article.schema";
import { feedArticlesService } from "../services/feedArticlesService";
import { Article } from "./Article";

const limit = 5;

export function FeedArticles() {
  const [articles, setArticles] = useState<IArticleSchema[]>([]);
  const [articlesCount, setArticlesCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const unlogged = UnLoggedHook();

  useEffect(() => {
    nextPage(1);
  }, [])

  const nextPage = (pg: number) => {
    setArticles([]);
    const offset = (pg - 1) * limit;
    setPage(pg);
    setLoading(true);
    feedArticlesService(limit, offset)
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
    setArticles(articles.map((art: IArticleSchema) => {
      if(art.slug === slug) {
        art.favorited = favorited;
        art.favoritesCount = favoritesCount;
      }
      return art;
    }))
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