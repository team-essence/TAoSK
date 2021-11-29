import React, { Suspense, useRef, VFC } from 'react'
import { Mesh } from 'three'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import Model from './DragonIdle'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateMinSizeBasedOnFigmaHeight'
import styled from 'styled-components'

export const MonsterAvatar: VFC = () => {
  return (
    <StyledMonsterAvatarContainer>
      <Canvas camera={{ fov: 3.8, position: [12, 4, 12] }}>
        <OrbitControls enablePan={false} />

        <Suspense fallback={null}>
          <ambientLight intensity={2} />
          <spotLight intensity={2} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
          <Model position={[0, -0.3, 0]} />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </StyledMonsterAvatarContainer>
  )
}

const StyledMonsterAvatarContainer = styled.div`
  width: ${calculateMinSizeBasedOnFigmaHeight(346)};
  height: ${calculateMinSizeBasedOnFigmaHeight(346)};
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`
