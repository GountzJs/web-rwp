export interface IBtnDetailFavorited {
  slug: string;
  favoritesCount: number;
  favorited: boolean;
  changeFavorited: (favorited: boolean, favoritesCount: number) => void;
}
