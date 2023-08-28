'use server'

import { getGame } from '@/lib/game';
import { GAME_COOKIE_KEY } from '@/lib/game/const';
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers';

export default async function submit(formData: FormData) {
  'use server'
  console.log('formData:', [...formData.entries()]);

  const data = formData;
  const game = getGame(cookies());
  const guess = data.getAll('guess') as string[];

  if (!game.enter(guess)) {
    return;
  }

  console.log('game:', game);
  cookies().set(GAME_COOKIE_KEY, game.toString());
  revalidatePath('/')
}

export async function restartGame() {
  'use server'

  cookies().delete(GAME_COOKIE_KEY);
  revalidatePath('/')
}
