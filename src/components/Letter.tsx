import { cn } from "@/lib/ulils/cn";

export function Letter({
  value,
  selected = false,
  missing = false,
  close = false,
  exact = false,
  isCurrent = false,
  className,
}: {
  value: string;
  selected?: boolean;
  missing?: boolean;
  close?: boolean;
  exact?: boolean;
  isCurrent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn('w-full aspect-[1] h-full rounded-sm text-[calc(0.08_*_min(100vw,40vh,380px))] flex items-center justify-center text-center bg-white ', {
        'outline-2 outline outline-colorTheme1': selected,
        'bg-white/50 text-black/50': missing,
        'border-colorTheme2 border-2': close,
        'bg-colorTheme2 text-white': exact,
      }, className)}
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
  )
}
