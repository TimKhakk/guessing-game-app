'use client'

import submitGuess, { restartGame } from "@/app/actions";
import { ButtonLetter } from "@/components/ButtonLetter";
import { Letter } from "@/components/Letter";
import { cn } from "@/lib/ulils/cn";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { useEventListener } from "usehooks-ts";

const MAX_GUESS_COUNT = 6;
const LETTERS_COUNT = 5;

export function GameForm({
  data: initialData,
}: {
  data: {
    guesses: string[];
    answers: string[];
    answer: string | null;
}
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData)
  }, [initialData])

	const hasWon = initialData.answers.at(-1) === 'xxxxx';
	const currentGuessIdx = hasWon ? -1 : initialData.answers.length;
	const submittable = data.guesses[currentGuessIdx]?.length === 5;

  function handleUpdate(event: Event, target: HTMLButtonElement) {
    event.preventDefault();
		const guess = data.guesses[currentGuessIdx];
		const key = (target as HTMLButtonElement)?.getAttribute(
			'data-key'
		);

		if (key === 'backspace') {
      setData((prev) => ({
        ...prev,
        guesses: prev.guesses.map((guess, idx) => (
          idx === currentGuessIdx ? guess.slice(0, -1) : guess
        ))
      }))
		} else if (guess.length < 5) {
      setData((prev) => ({
        ...prev,
        guesses: prev.guesses.map((guess, idx) => (
          idx === currentGuessIdx ? guess + key : guess
        ))
      }))
		}
	}

  useEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      if (!submittable) return;
      document
        .querySelector(`[data-key="${event.key}" i]`)?.dispatchEvent(
          new MouseEvent('click')
        )
      return;
    };
    if (event.metaKey) return;

		const res = document
			.querySelector(`[data-key="${event.key}" i]`) as HTMLButtonElement | null

    if (!res) return;
    handleUpdate(event, res)
  })

  // move to file
  const letterClassNames = useMemo(() => {
    const classnames: Record<string, string> = {};
    const closeClassNames = 'border-colorTheme2 border-2';
    const missingClassNames = 'bg-white/50 text-black/50';
    const exactClassNames = 'bg-colorTheme2 text-white';

		data.answers.forEach((answer, i) => {
			const guess = data.guesses[i];

			for (let i = 0; i < 5; i += 1) {
				const letter = guess[i];

				if (answer[i] === 'x') {
					classnames[letter] = exactClassNames;
				} else if (!classnames[letter]) {
					classnames[letter] = answer[i] === 'c' ? closeClassNames : missingClassNames;
				}
			}

		});
    return classnames
  }, [data]);

  return (
    <form ref={formRef} className="flex w-full items-center flex-col gap-4" action={submitGuess}>
      <div className="max-w-[min(100vw,40vh,380px)] flex flex-col gap-1 w-full h-full justify-start">
        {Array.from({ length: MAX_GUESS_COUNT }, (_, rowIdx) => (
          <div className={cn("grid grid-cols-[repeat(5,1fr)] gap-1", {
            'currentRow': rowIdx === currentGuessIdx,
          })} key={rowIdx}>
            {Array.from({ length: LETTERS_COUNT }, (_, colIdx) => {
              const answer = initialData.answers[rowIdx]?.[colIdx]
              const value = data.guesses[rowIdx]?.[colIdx] ?? ''
              const isCurrent = rowIdx === currentGuessIdx;
              const selected = isCurrent && colIdx === data.guesses[rowIdx].length
              const exact = answer === 'x'
              const close = answer === 'c'
              const missing = answer === '_'
              return (
                <Letter key={colIdx} value={value} selected={selected} missing={missing} close={close} exact={exact} isCurrent={isCurrent} />
              );
            })}
          </div>
        ))}
      </div>

      {hasWon && (
        <ConfettiExplosion force={0.7} width={window.innerWidth} height={window.innerHeight} colors={['#ff3e00', '#40b3ff', '#676778']} />
      )}
      {hasWon || data.answers.length >= 6 ? (
        <>
          {!hasWon && data.answer && (
            <p>the answer was {data.answer}</p>
          )}
          <button data-key="enter" className="rounded-sm hover:bg-colorTheme1 hover:text-white p-4 border-2 border-colorTheme1" formAction={restartGame}>
            {hasWon ? 'you won :)' : `game over :(`} play again?
          </button>
        </>
      ) : (
        <div className="flex h-[min(18vh,10rem)] flex-col justify-center items-center gap-1">
          {(['qwertyuiop', 'asdfghjkl', 'zxcvbnm'] as const).map((row, rowIdx, arr) => (
            <div key={row} className="flex flex-grow items-center justify-center gap-1">
              {[...row].map((letter, letterIdx, letters) => (
                <React.Fragment key={`${rowIdx}-${letterIdx}`}>
                  {(rowIdx === arr.length - 1) && (letterIdx === 0) && (
                    <button
                      className={cn('uppercase h-full bg-white border-0 m-0 text-black rounded-sm w-[calc(min(8vw,4vh,40px)_*_1.5)] text-[calc(min(8vw,4vh,40px)_*_0.3)] p-1', {
                        'border border-red-400': submittable,
                      })}
                      data-key="enter"
                      type="submit"
                      disabled={!submittable}
                    >
                      enter
                    </button>
                  )}
                  <ButtonLetter
                    className={letterClassNames[letter]}
                    onClick={(e) => handleUpdate(e, e.target)}
                    disabled={data.guesses[currentGuessIdx]?.length === 5}
                    letter={letter}
                  />

                  {(rowIdx === arr.length - 1) && (letterIdx === letters.length - 1) && (
                    <button
                      className={cn('uppercase h-full bg-white border-0 m-0 text-black rounded-sm w-[calc(min(8vw,4vh,40px)_*_1.5)] text-[calc(min(8vw,4vh,40px)_*_0.3)] p-1')}
                      onClick={(e) => handleUpdate(e, e.target)}
                      data-key="backspace"
                      name="key"
                      value="backspace"
                    >
                      back
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>
          ))}

        </div>
      )}
    </form>
  )
}
