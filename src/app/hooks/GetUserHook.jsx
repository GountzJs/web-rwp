import { LocalStorageService } from "../core/services/LocalStorageService";
import { GetUserService } from "../services/users/GetUserService";

export function GetUserHook({ setUser }) {
  const get = GetUserService();
  const { saveToken, saveUser } = LocalStorageService();

  const getUser = () => {
    get().subscribe(({ user }) => {
      saveToken(user.token);
      saveUser(user.email, user.username, user.bio, user.bio);
      delete user.token;
      setUser(user);
    })
  };

  return getUser;
}