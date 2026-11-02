interface SectionTitleProps {
  title: string
  subtitle?: string
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          {subtitle}
        </p>
      )}
      <div className="mt-6 h-1 w-20 rounded-full bg-cyan-600/50" />
    </div>
  )
}
