'use client';

import Cookies from 'js-cookie';
import React from 'react';
import { Theme } from 'type';

function useColorTheme(): Theme {
  const [colorTheme, setColorTheme] = React.useState(() => {
    return Cookies.get('color-theme');
  });

  React.useEffect(() => {
    function changeHandleEvent(isDark: boolean) {
      const nextColorMode = isDark === true ? 'dark' : 'light';

      const expires = 1000;
      let [sameSite, secure]: ['Lax' | 'None', boolean] = ['Lax', true];
      if (process.env.NODE_ENV === 'development') {
        [sameSite, secure] = ['None', false];
      }

      Cookies.set('color-theme', nextColorMode, {
        sameSite,
        secure,
        expires,
      });
      setColorTheme(() => nextColorMode);
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({ matches: isDark }) => changeHandleEvent(isDark));

    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', ({ matches: isDark }) => changeHandleEvent(isDark));
  }, []);

  return colorTheme as Theme;
}

export default useColorTheme;
