'use client';

import Cookies from 'js-cookie';
import React from 'react';

function Init({ children }: { children: React.ReactNode }) {
  const colorTheme = Cookies.get('color-theme');
  console.log(colorTheme);

  return <>{children}</>;
}

export default Init;
