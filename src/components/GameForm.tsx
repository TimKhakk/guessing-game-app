'use client'

import submit, { restartGame } from "@/app/actions";
import { cn } from "@/lib/ulils/cn";
import React, { useEffect, useMemo, useRef, useState } from "react";
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

	/** Whether the current guess can be submitted */
	const submittable = data.guesses[currentGuessIdx]?.length === 5;

  function update(event: Event, target: HTMLButtonElement) {
    event.preventDefault();
		const guess = data.guesses[currentGuessIdx];
		const key = (target as HTMLButtonElement).getAttribute(
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
			.querySelector(`[data-key="${event.key}" i]`)! as HTMLButtonElement

    update(event, res)
  })

  const closeClassNames = 'border-blue-600 border-2'
  const missingClassNames = 'bg-white/50 text-black/50'

  const [letterClassNames, description] = useMemo(() => {
    const classnames = {};
    const description = {};

		data.answers.forEach((answer, i) => {
			const guess = data.guesses[i];

			for (let i = 0; i < 5; i += 1) {
				const letter = guess[i];

				if (answer[i] === 'x') {
					classnames[letter] = 'exact';
					description[letter] = 'correct';
				} else if (!classnames[letter]) {
					classnames[letter] = answer[i] === 'c' ? closeClassNames : missingClassNames;
					description[letter] = answer[i] === 'c' ? 'present' : 'absent';
				}
			}

		});
    return [classnames, description]
  }, [data]);

  return (
    <form ref={formRef} className="flex w-full items-center flex-col gap-4" action={submit}>
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
                <div
                  key={colIdx}
                  className={cn('w-full aspect-[1] h-full rounded-sm text-[calc(0.08_*_min(100vw,40vh,380px))] flex items-center justify-center text-center bg-white ', {
                    'border-blue-600 border-2': close,
                    'outline-2 outline outline-red-500': selected,
                    missingClassNames: missing,
                    'bg-blue-600 text-white': exact,
                  })}
                >
                  <span className="hidden">
                    {exact && 'correct'}
                    {exact && 'close'}
                    {exact && 'missing'}
                    {exact && 'empty'}
                  </span>
                  {value}
                  <input disabled={!isCurrent} name="guess" type="hidden" value={value} />
                </div>
              );
            })}
          </div>
        ))}
      </div>


      {hasWon || data.answers.length >= 6 ? (
        <>
          {!hasWon && data.answer && (
            <p>the answer was {data.answer}</p>
          )}
          <button data-key="enter" className="rounded-sm hover:bg-red-500 hover:text-white p-4 border-2 border-red-500" formAction={restartGame}>
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
                  <button
                    className={cn('h-full bg-white border-0 m-0 text-black rounded-sm w-[min(8vw,4vh,40px)] text-[calc(min(8vw,4vh,40px)_*_0.5)] p-1')}
                    key={letter}
                    onClick={(e) => update(e, e.target)}
                    data-key={letter}
                    disabled={data.guesses[currentGuessIdx]?.length === 5}
                    name="key"
                  >
                    {letter}
                  </button>

                  {(rowIdx === arr.length - 1) && (letterIdx === letters.length - 1) && (
                    <button
                      className={cn('uppercase h-full bg-white border-0 m-0 text-black rounded-sm w-[calc(min(8vw,4vh,40px)_*_1.5)] text-[calc(min(8vw,4vh,40px)_*_0.3)] p-1')}
                      onClick={(e) => update(e, e.target)}
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
