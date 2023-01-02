import { v4 } from 'uuid';
import { DatabaseService } from '../base/services/database.service.js';

export class ArticlesService {
  dataBase;

  constructor() {
    this.dataBase = new DatabaseService();
  }

  
  #formatSlug(title) {
    return title.toLowerCase().replace(/ /g, '-');
  }

  async #getGlobalAuthorAuth(filters, users, articles, id) {
    const { limit, offset, author } = filters;
    const athr = users.find(us => us.username === author);
    if(!athr) throw { code: 404 };
    const articlesResponse = articles.filter(atr => atr.author === athr.id).slice(offset, limit + offset);
    const { userProfiles } = await this.dataBase.read('profiles', 'userProfiles');
    const { userArticles } = await this.dataBase.read('articles', 'userArticles');
    const userProfile = userProfiles.find(usPrf => usPrf.user === id && usPrf.author === athr.id);
    return Promise.all(articlesResponse.map(async art => {
      const userArticle = userArticles.find(usArt => usArt.article === art.id && usArt.user === id);
      delete art.id;
      return {
        ...art,
        favorited: userArticle?.favorited ?? false,
        author: {
          username: athr.username,
          bio: athr.bio,
          image: athr.image,
          following: userProfile?.following ?? false
        }
      }
    }))
  }

  #getGlobalAuthor(filters, users, articles) {
    const { limit, offset, author } = filters;
    const athr = users.find(us => us.username === author);
    if(!athr) throw { code: 404 };
    const articlesResponse = articles.filter(atr => atr.author === athr.id).slice(offset, limit + offset);
    return articlesResponse.map(art => {
      delete art.id;
      return {
        ...art,
        favorited: false,
        author: {
          username: athr.username,
          bio: athr.bio,
          image: athr.image,
          following: false
        }
      }
    });
  }

  #getGlobalAll(filters, articles, users) {
    return articles.map(art => {
      const author = users.find(us => us.id === art.author);
      delete art.id;
      return {
        ...art,
        favorited: false,
        author: {
          username: author.username,
          bio: author.bio,
          image: author.image,
          following: false
        }
      }
    }).slice(filters.offset, filters.limit + filters.offset);
  }

  async #getGlobalAllAuth(filters, users, articles, id) {
    const { userProfiles } = await this.dataBase.read('profiles', 'userProfiles');
    const { userArticles } = await this.dataBase.read('articles', 'userArticles');
    return articles.map(art => {
      const author = users.find(us => us.id === art.author);
      const userProfile = userProfiles.find(usPrf => usPrf.user === id && usPrf.profile === author.id);
      const userArticle = userArticles.find(usArt => usArt.article === art.id && usArt.user === id);
      delete art.id;
      return {
        ...art,
        favorited: userArticle?.following ?? false,
        author: {
          username: author.username,
          bio: author.bio,
          image: author.image,
          following: userProfile.following ?? false
        }
      }
    }).slice(filters.offset, filters.limit + filters.offset);
  }



  async #getGlobalFavorited(filters, favorited, users, articles) {
    const { userProfiles } = await this.dataBase.read('profiles', 'userProfiles');
    const userFavorited = users.find(us => us.username === favorited);
    if(!userFavorited) throw { code: 404 };
    const usersFollowing = userProfiles.filter(usPrf => usPrf.user === userFavorited.id && usPrf.following);
    const articleResponse = articles.filter(
      art => usersFollowing.some(us => us.profile === art.author)
    ).slice(filters.offset, filters.limit + filters.offset);
    return articleResponse.map(art => {
      delete art.id;
      const author = users.find(us => us.id === art.author);
      return {
        ...art,
        favorited: false,
        author: {
          username: author.username,
          bio: author.bio,
          image: author.image,
          following: false
        }
      }
    })
  }

  async #getGlobalFavoritedAuth(filters, favorited, users, articles, id) {
    const { userProfiles } = await this.dataBase.read('profiles', 'userProfiles');
    const { userArticles } = await this.dataBase.read('articles', 'userArticles');
    const userFavorited = users.find(us => us.username === favorited);
    if(!userFavorited) throw { code: 404 };
    const usersFollowing = userProfiles.filter(usPrf => usPrf.user === userFavorited.id && usPrf.following);
    const articleResponse = articles.filter(
      art => usersFollowing.some(us => us.profile === art.author)
    ).slice(filters.offset, filters.limit + filters.offset);
    return Promise.all(articleResponse.map(async art => {
      const userArticle = userArticles.find(usArt => usArt.user === id && usArt.article === art.id);
      const userProfile = userProfiles.find(usPrf => usPrf.user === id && usPrf.profile === art.author);
      delete art.id;
      const author = users.find(us => us.id === art.author);
      return {  
        ...art,
        favorited: userArticle?.favorited ?? false,
        author: {
          username: author.username,
          bio: author.bio,
          image: author.image,
          following: userProfile.following ?? false
        }
      }
    }))
  }


  async created(id, title, description, body, tagList) {
    const { articles } = await this.dataBase.read('articles', 'articles');
    const { users } = await this.dataBase.read('users', 'users');
    const user = users.find(us => us.id === id);
    if(articles.some(article => article.title.toLowerCase() === title.toLowerCase())) throw { code: 422, error: ['Title in use'] };
    const createdAt = new Date();
    const updatedAt = new Date();
    articles.push({
      id: v4(),
      slug: this.#formatSlug(title),
      title,
      description,
      body,
      tagList: tagList ?? [],
      author: id,
      favoritesCount: 0,
      createdAt,
      updatedAt
    });
    await this.dataBase.edit('articles', 'articles', { articles });
    return {
      slug: this.#formatSlug(title),
      title,
      description,
      body,
      tagList: tagList ?? [],
      favoritesCount: 0,
      createdAt,
      updatedAt,
      favorited: false,
      author: {
        username: user.username,
        image: user.image,
        bio: user.bio,
        following: false
      }
    }
  }

  async getArticleAuth(id, slug) {
    const { articles } = await this.dataBase.read('articles', 'articles');
    const article = articles.find(art => art.slug === slug);
    if(!article) throw { code: 404 };
    const { users } = await this.dataBase.read('users', 'users');
    const user = users.find(us => us.id === id);
    const author = users.find(us => us.id === article.author);
    const { userArticles } = await this.dataBase.read('articles', 'userArticles');
    const userArticle = userArticles.find(usArt => usArt.article === article.id && usArt.user === user.id);
    const { userProfiles } = await this.dataBase.read('profiles', 'userProfiles');
    const userProfile = userProfiles.find(usPrl => usPrl.user === user.id && usPrl.profile === author.id);
    const { username, bio, image } = author;
    return {
      ...article,
      favorited: userArticle?.favorited ?? false,
      author: {
        username, 
        bio, 
        image, 
        following: userProfile?.following ?? false
      }
    }
  }

  async getArticle(slug) {
    const { articles } = await this.dataBase.read('articles', 'articles');
    const article = articles.find(art => art.slug === slug);
    if(!article) throw { code: 404 };
    const { users } = await this.dataBase.read('users', 'users');
    const author = users.find( us => us.id === article.author);
    const { username, bio, image } = author;
    return {
      ...article,
      favorited: false,
      author: {
        username, 
        bio, 
        image, 
        following: false
      }
    }
  }

  async editArticle(id, slug, articleEdit) {
    const { articles } = await this.dataBase.read('articles', 'articles');
    const article = articles.find(art => art.slug === slug && art.author === id);
    if(!article) throw { code: 404 };
    const { users } = await this.dataBase.read('users', 'users');
    const user = users.find( us => us.id === id);
    const { title, description, body } = articleEdit;
    if(title && title !== article.title && articles.some(art => art.slug === this.#formatSlug(title))) 
      throw { code: 422, error: ['Title in use'] };
    article.slug = title ? this.#formatSlug(title) : article.slug;
    article.title = title || article.title;
    article.description = description || article.description;
    article.body = body || article.body;
    article.updatedAt = new Date();
    await this.dataBase.edit('articles', 'articles', { articles });
    delete article.id;
    return {
      ...article,
      favorited: false,
      author: {
        username: user.username,
        bio: user.bio,
        image: user.image,
        following: false
      }
    }
  }

  async getGlobal(id, limit, offset, author, favorited, tag) {
    const { articles } = await this.dataBase.read('articles', 'articles');
    const { users } = await this.dataBase.read('users', 'users');
    let articlesResponse;
    const filters = { limit, offset };
    if(author) {
      filters.author = author;
      articlesResponse = id
        ? await this.#getGlobalAuthorAuth(filters, users, articles, id)
        : this.#getGlobalAuthor(filters, users, articles);
    } else if(favorited) {
      filters.favorite = favorited;
      articlesResponse = id
        ? await this.#getGlobalFavoritedAuth(filters, favorited, users, articles, id) 
        : await this.#getGlobalFavorited(filters, favorited, users, articles);
    } else {
      articlesResponse = id
        ? await this.#getGlobalAllAuth(filters, users, articles, id) 
        : this.#getGlobalAll(filters, articles, users);
    }
    return { articles: articlesResponse, articlesCount: articles.length };
  }
}
