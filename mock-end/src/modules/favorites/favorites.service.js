import { DatabaseService } from '../base/services/database.service.js';

export class FavoritesService {
  database;

  constructor() {
    this.database = new DatabaseService();
  }

  async favorited(id, slug) {
    const { articles } = await this.database.read('articles', 'articles');
    const article = articles.find(art => art.slug === slug);
    if(!article) throw { code: 404 };
    const { users } = await this.database.read('users', 'users');
    const user = users.find(us => us.id === id);
    const author = users.find(us => us.id === article.author);
    const { userArticles } = await this.database.read('articles', 'userArticles');
    const userArticle = userArticles.find(usArt => usArt.article === article.id && usArt.user === user.id);
    const { userProfiles } = await this.database.read('profiles', 'userProfiles');
    const userProfile = userProfiles.find(usPrf => usPrf.profile === author.id && usPrf.user === user.id);
    if(!userArticle) {
      userArticles.push({ article: article.id, user: user.id, favorited: true });
      await this.database.edit('articles', 'userArticles', { userArticles });
      article.favoritesCount += 1;
      await this.database.edit('articles', 'articles', { articles });
    } else if(!userArticle.favorited) {
      userArticle.favorited = true;
      await this.database.edit('articles', 'userArticles', { userArticles });
      article.favoritesCount += 1;
      await this.database.edit('articles', 'articles', { articles });
    }
    delete article.id;
    return {
      ...article,
      favorited: true,
      author: {
        username: author.username,
        bio: author.bio,
        image: author.image,
        following: userProfile.following ?? false
      }
    }
  }

  async unfavorited(id, slug) {
    const { articles } = await this.database.read('articles', 'articles');
    const article = articles.find(art => art.slug === slug);
    if(!article) throw { code: 404 };
    const { users } = await this.database.read('users', 'users');
    const user = users.find(us => us.id === id);
    const author = users.find(us => us.id === article.author);
    const { userArticles } = await this.database.read('articles', 'userArticles');
    const userArticle = userArticles.find(usArt => usArt.article === article.id && usArt.user === user.id);
    const { userProfiles } = await this.database.read('profiles', 'userProfiles');
    const userProfile = userProfiles.find(usPrf => usPrf.profile === author.id && usPrf.user === user.id);
    if(userArticle?.favorited) {
      userArticle.favorited = false;
      await this.database.edit('articles', 'userArticles', { userArticles });
      article.favoritesCount -= 1;
      await this.database.edit('articles', 'articles', { articles });
    }
    delete article.id;
    return {
      ...article,
      favorited: false,
      author: {
        username: author.username,
        bio: author.bio,
        image: author.image,
        following: userProfile.following ?? false
      }
    }
  }
}