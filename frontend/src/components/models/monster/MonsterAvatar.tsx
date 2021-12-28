import React, { Suspense, useRef, FCX } from 'react'
import { Mesh } from 'three'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import Model from './DragonIdle'
import styled from 'styled-components'
import { CgAxesHelper } from 'components/cg/CgAxesHelper'

export const MonsterAvatar: FCX = ({ className }) => {
  return (
    <StyledMonsterAvatarContainer className={className}>
      <StyledCanvasWrapper>
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
      </StyledCanvasWrapper>
    </StyledMonsterAvatarContainer>
  )
}

const StyledMonsterAvatarContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`

const StyledCanvasWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
