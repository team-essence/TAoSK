import React, { Suspense, FCX, useState } from 'react'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { CgAxesHelper } from 'components/models/cg/CgAxesHelper'
import { CANVAS_BACKGROUND_IMG, CgCanvasWrapper } from '../cg/CgCanvasWrapper'
import { CgAvatarContainer } from '../cg/CgAvatarContainer'
import Model, { MonsterActionName } from './Dragon1125'
import styled from 'styled-components'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'

export const MonsterAvatar: FCX = ({ className }) => {
  const [monsterActionName, setMonsterActionName] = useState<MonsterActionName>('idle')

  const [canvasBackground, setCanvasBackground] = useState<CANVAS_BACKGROUND_IMG>(
    CANVAS_BACKGROUND_IMG.MORNING,
  )

  const handleChangeCanvasBackground = (backgroundImage: CANVAS_BACKGROUND_IMG) => {
    setCanvasBackground(backgroundImage)
    switch (backgroundImage) {
      case CANVAS_BACKGROUND_IMG.NORMAL:
      case CANVAS_BACKGROUND_IMG.AFTERNOON:
        setMonsterActionName('eat')
        break

      case CANVAS_BACKGROUND_IMG.NIGHT:
        setMonsterActionName('sleeping')
        break

      default:
        setMonsterActionName('idle')
        break
    }
  }

  return (
    <CgAvatarContainer className={className}>
      <CgCanvasWrapper canvasBackgroundImg={canvasBackground}>
        <StyledButtonContainer>
          <StyledButton onClick={() => handleChangeCanvasBackground(CANVAS_BACKGROUND_IMG.MORNING)}>
            1
          </StyledButton>
          <StyledButton onClick={() => handleChangeCanvasBackground(CANVAS_BACKGROUND_IMG.NORMAL)}>
            2
          </StyledButton>
          <StyledButton
            onClick={() => handleChangeCanvasBackground(CANVAS_BACKGROUND_IMG.AFTERNOON)}>
            3
          </StyledButton>
          <StyledButton onClick={() => handleChangeCanvasBackground(CANVAS_BACKGROUND_IMG.NIGHT)}>
            4
          </StyledButton>
        </StyledButtonContainer>

        <Canvas camera={{ fov: 3.8, position: [12, 4, 12] }}>
          <OrbitControls enablePan={false} />

          <Suspense fallback={null}>
            <ambientLight intensity={2} />
            <spotLight intensity={2} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
            <Model actionName={monsterActionName} position={[0, -0.3, 0]} />
            <Environment preset="sunset" />
            <CgAxesHelper />
          </Suspense>
        </Canvas>
      </CgCanvasWrapper>
    </CgAvatarContainer>
  )
}

const StyledButtonContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: ${calculateMinSizeBasedOnFigma(12)} 0;
  top: ${calculateMinSizeBasedOnFigma(10)};
  left: ${calculateMinSizeBasedOnFigma(10)};
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_5};
`

const StyledButton = styled.div`
  width: ${calculateMinSizeBasedOnFigma(20)};
  height: ${calculateMinSizeBasedOnFigma(20)};
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
