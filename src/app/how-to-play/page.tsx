import { ButtonLetter } from "@/components/ButtonLetter";
import { Letter } from "@/components/Letter";
import { BackSvg } from "@/components/svg";
import Link from "next/link";

const GAME_NAME = 'Nerdle';
const ORIGINAL_GAME_NAME = 'Wordle';

export default function HowToPlay() {
  return (
    <div
      className="flex max-w-[min(60vw,1200px)] mx-auto flex-col gap-8 min-h-screen justify-start p-24"
    >
      <h1 className="text-6xl text-center">How to play</h1>

      <p>
        {GAME_NAME} is a clone of <a className="text-colorTheme1 hover:underline" href="https://www.nytimes.com/games/wordle/index.html">{ORIGINAL_GAME_NAME}</a>, the
        word guessing game. To play, enter a five-letter English word. For example:
      </p>

      <div className="max-w-[min(100vw,40vh,320px)] flex flex-col gap-1 w-full h-full justify-start">
        <div className="grid grid-cols-[repeat(5,1fr)] gap-1">
          <Letter value="r" close />
          <Letter value="i" missing />
          <Letter value="t" close />
          <Letter value="z" missing />
          <Letter value="y" exact />
        </div>
      </div>

      <p>
        The <Letter className="inline px-2 pb-1 mx-1 text-base" value="y" exact /> is in the right place. <Letter className="inline px-2 pb-1 mx-1 text-base" value="r" close /> and
        <Letter className="inline px-2 pb-1 mx-1 text-base" value="y" close />
        are the right letters, but in the wrong place. The other letters are wrong, and can be discarded.
        Let&apos;s make another guess:
      </p>

      <div className="max-w-[min(100vw,40vh,320px)] flex flex-col gap-1 w-full h-full justify-start">
        <div className="grid grid-cols-[repeat(5,1fr)] gap-1">
          <Letter value="p" exact />
          <Letter value="a" exact />
          <Letter value="r" exact />
          <Letter value="t" exact />
          <Letter value="y" exact />
        </div>
      </div>

      <p className="text-start">This time we guessed right! You have <strong>six</strong> guesses to get the word.</p>

      <p>
        Unlike the original {ORIGINAL_GAME_NAME}, {GAME_NAME} runs on the server instead of in the browser, making it
        impossible to cheat. It uses <code>&lt;form&gt;</code> and cookies to submit data, meaning you can
        even play with JavaScript disabled!
      </p>

      <Link href="/" className='inline-flex items-center gap-1 text-colorTheme1 hover:underline'><BackSvg /> Go back</Link>
    </div>
  )
}
