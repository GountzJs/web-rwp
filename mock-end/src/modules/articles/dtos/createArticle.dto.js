export class CreateArticleDTO {
  article;

  constructor(article) {
    this.article = article;
  }

  validate() {
    const { title, description, body, tagList } = this.article || { undefined };
    const errors = [];
    if(!title) errors.push('Title is requried');
    if(title?.length < 4) errors.push('Title min 4 characters');
    if(title?.length > 25) errors.push('Title max 25 characters');
    if(!description) errors.push('Description is required');
    if(description?.length < 4) errors.push('Description min 4 characters');
    if(description?.length > 50) errors.push('Description max 50 characters');
    if(!body) errors.push('Body is required');
    if(body?.length < 4) errors.push('Body min 4 characters');
    if(body?.length > 50) errors.push('Body max 120 characters');
    if(!Array.isArray(tagList)) errors.push('Tag list is array');
    if(Array.isArray(tagList) && tagList.some(tag => typeof tag !== 'string')) errors.push('Taglist is array of strings');
    return errors;
  }
}