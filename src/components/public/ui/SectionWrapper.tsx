import { ReactNode } from 'react'

interface SectionWrapperProps {
  id: string
  className?: string
  children: ReactNode
}

export function SectionWrapper({ id, className = '', children }: SectionWrapperProps) {
  return (
    <section id={id} className={`relative py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </section>
  )
}
