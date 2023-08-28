import { GameForm } from '@/components/GameForm';
import { getGame } from '@/lib/game';
import { cookies } from 'next/headers';

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
      <GameForm data={data} />
    </main>
  )
}
