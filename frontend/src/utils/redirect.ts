'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const goToUsername = async () => {
  revalidateTag('/start/username');
  redirect('/start/username');
};

export const goToHome = async () => {
  revalidateTag('/');
  redirect('/');
};
