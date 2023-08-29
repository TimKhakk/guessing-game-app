import { GameForm } from '@/components/GameForm';
import { InfoSvg } from '@/components/svg';
import { getGame } from '@/lib/game';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function Home() {
  const game = getGame(cookies());

  const data = {
		guesses: game.guesses,
		answers: game.answers,
		answer: game.answers.length >= 6 ? game.answer : null,
	}

  return (
    <main className="flex flex-col gap-4 min-h-screen items-center justify-start p-24">
      <Link href="/how-to-play" className='inline-flex items-center gap-1 text-colorTheme1 hover:underline'>
        <InfoSvg />
        How to play</Link>
      <GameForm data={data} />
    </main>
  )
}
