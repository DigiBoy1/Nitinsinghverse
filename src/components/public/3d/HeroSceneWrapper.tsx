'use client'

import dynamic from 'next/dynamic'

// Dynamically import the 3D scene to prevent SSR issues and reduce initial bundle blocking
// We wrap it here to ensure it's loaded only on the client side.
const HeroSceneDynamic = dynamic(
  () => import('./HeroScene').then(mod => mod.HeroScene), 
  { 
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black" />
  }
)

export function HeroSceneWrapper() {
  return <HeroSceneDynamic />
}
