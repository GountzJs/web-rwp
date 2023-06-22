export interface IBtnDeleteComment {
  slug: string;
  id: number;
  removeComment: (id: number) => void;
}
