import { GameForm } from '@/components/GameForm';
import { getGame } from '@/lib/game';
import { cookies } from 'next/headers';
import Link from 'next/link';

const InfoSvg = () => (
  <svg className='w-[24px] fill-colorTheme1 inline-flex' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"></path></svg>
);

export default async function Home() {
  const game = getGame(cookies());

  const data = {
		guesses: game.guesses,
		answers: game.answers,
		answer: game.answers.length >= 6 ? game.answer : null,
	}

  return (
    <main className="flex flex-col gap-4 min-h-screen items-center justify-start p-24">
      <p>Answer: {game.answer}</p>
      <Link href="/how-to-play" className='inline-flex items-center gap-1 text-colorTheme1 hover:underline'>
        <InfoSvg />
        How to play</Link>
      <GameForm data={data} />
    </main>
  )
}
