import React, { Suspense, FCX } from 'react'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Model from './DragonIdle'
import { CgAxesHelper } from 'components/models/cg/CgAxesHelper'
import { CANVAS_BACKGROUND_IMG, CgCanvasWrapper } from '../cg/CgCanvasWrapper'
import { CgAvatarContainer } from '../cg/CgAvatarContainer'

export const MonsterAvatar: FCX = ({ className }) => {
  return (
    <CgAvatarContainer className={className}>
      <CgCanvasWrapper canvasBackgroundImg={CANVAS_BACKGROUND_IMG.MORNING}>
        <Canvas camera={{ fov: 3.8, position: [12, 4, 12] }}>
          <OrbitControls enablePan={false} />

          <Suspense fallback={null}>
            <ambientLight intensity={2} />
            <spotLight intensity={2} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
            <Model position={[0, -0.3, 0]} />
            <Environment preset="sunset" />
            <CgAxesHelper />
          </Suspense>
        </Canvas>
      </CgCanvasWrapper>
    </CgAvatarContainer>
  )
}
