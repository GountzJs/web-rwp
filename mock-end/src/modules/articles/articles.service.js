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

  async #getByAuthor(author) {
    const { articles } = await this.dataBase.read('articles', 'articles');
    return articles.map(art => art.author === author);
  }

  async #getGlobalAuthor(users, author) {
    const user = users.find(us => us.username === author);
    const articles = this.#getByAuthor(user.id);
    return articles.map(article => {
      delete article.id;
      return { 
        ...article,
        author: {
          username: user.username,
          bio: user.bio,
          image: user.image,
          following: false
        }
      }
    });
  }

  async #getGlobalAuthorAuth(id, users, user, author) {
    const athr = users.find(us => us.username === author);
    const articles = this.#getByAuthor(athr.id);
    const userProfile = await this.dataBase.read('', '');
    return Promise.all(articles.map(async article => {
      delete article.id;
      return {
        ...article,
        author: {
          username: athr.username,
          bio: athr.bio,
          image: athr.image,
          following: false
        }
      }
    }));
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
    const { users } = await this.dataBase.read('users', 'users');
    if(author) {
      const articles = this.#getGlobalAuthor(users, author);
      const result = articles.slice(offset, limit + offset);
      return { articles: result, articlesCount: articles.length }
    } else if(favorited) {
      const fvt = users.find(us => us)
    }
  }
}
