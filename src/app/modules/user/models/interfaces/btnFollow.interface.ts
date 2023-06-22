export interface IBtnFollow {
  username: string;
  following: boolean;
  changeFollowing: (following: boolean) => void;
}
