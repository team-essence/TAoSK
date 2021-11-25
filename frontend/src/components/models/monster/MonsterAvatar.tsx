import React, { Suspense, useRef, VFC } from 'react'
import { Mesh } from 'three'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import Model from './DragonIdle'

export const MonsterAvatar: VFC = () => {
  return (
    <div style={{ width: 400, height: 400 }}>
      <Canvas camera={{ fov: 3.3, position: [12, 10, 12] }}>
        <OrbitControls enablePan={false} />

        <Suspense fallback={null}>
          <ambientLight intensity={2} />
          <spotLight intensity={2} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
          <Model position={[0, -0.3, 0]} />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  )
}
