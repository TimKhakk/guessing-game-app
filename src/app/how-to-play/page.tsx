import { ButtonLetter } from "@/components/ButtonLetter";
import { Letter } from "@/components/Letter";
import Link from "next/link";

const BackSvg = () => (
  <svg className="w-[24px] fill-colorTheme1 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM12 11H16V13H12V16L8 12L12 8V11Z"></path></svg>
)

export default function HowToPlay() {
  return (
    <div
      className="flex flex-col gap-4 min-h-screen justify-start p-24"
    >
      <h1 className="text-6xl text-center">How to play</h1>

      <p>
        Sverdle is a clone of <a className="text-colorTheme1 hover:underline" href="https://www.nytimes.com/games/wordle/index.html">Wordle</a>, the
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
        Let's make another guess:
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
        Unlike the original Wordle, Sverdle runs on the server instead of in the browser, making it
        impossible to cheat. It uses <code>&lt;form&gt;</code> and cookies to submit data, meaning you can
        even play with JavaScript disabled!
      </p>

      <Link href="/" className='inline-flex items-center gap-1 text-colorTheme1 hover:underline'><BackSvg /> Go back</Link>
    </div>
  )
}
