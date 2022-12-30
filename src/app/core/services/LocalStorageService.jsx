export function LocalStorageService() {
  const saveToken = (token) => {
    localStorage.setItem('jwtToken', token);
  }

  const saveUser = (email, username, bio, image) => localStorage.setItem('user', JSON.stringify({ user: { email, username, bio, image }}));

  const logOut = () => localStorage.clear();

  const isLogin = () => Boolean(localStorage.getItem('jwtToken'));

  const getToken = () => localStorage.getItem('jwtToken');

  const getUser = () => JSON.parse(JSON.stringify(localStorage.getItem('user')));

  return { saveToken, saveUser, getToken, getUser, isLogin, logOut };
}
