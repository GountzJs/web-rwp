export interface IBtnFavorited {
  slug: string;
  favoritesCount: number;
  favorited: boolean;
  changeFavorited: (
    slug: string,
    favorited: boolean,
    favoritesCount: number
  ) => void;
}
