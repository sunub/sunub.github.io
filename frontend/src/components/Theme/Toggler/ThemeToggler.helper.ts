import Cookies from 'js-cookie';

function handleChangeTheme() {
  const currTheme = Cookies.get('color-theme') ?? 'light';
  const nextTheme = currTheme === 'light' ? 'dark' : 'light';
  Cookies.set('color-theme', nextTheme, {
    expires: 1000,
  });
  return nextTheme;
}

export default handleChangeTheme;
