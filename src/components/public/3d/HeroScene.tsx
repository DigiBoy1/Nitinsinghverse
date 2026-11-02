'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Preload } from '@react-three/drei'
// @ts-expect-error maath random types are not fully defined in this version
import * as random from 'maath/random/dist/maath-random.esm'
import * as THREE from 'three'

function ParticleField(props: any) {
  const ref = useRef<THREE.Points>(null!)
  const sphere = useMemo(() => random.inSphere(new Float32Array(3000), { radius: 1.5 }), [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#06b6d4" // cyan-500
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-black">
      {/* Fallback gradient for when 3D is loading or prefers-reduced-motion */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black" />
      
      <div className="absolute inset-0 h-full w-full opacity-60 mix-blend-screen">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleField />
          <Preload all />
        </Canvas>
      </div>
      
      {/* Fade out bottom edge to blend with next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </div>
  )
}
