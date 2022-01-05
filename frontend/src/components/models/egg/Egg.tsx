/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ['default']: THREE.Mesh
  }
  materials: {
    マテリアル: THREE.MeshStandardMaterial
  }
}

const eggModelUrl = 'https://haltokyo.blob.core.windows.net/cg-container/egg.glb'

export default function Model({ ...props }: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF(eggModelUrl) as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} position={[0, 0.25, 0]} scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['default'].geometry}
          material={materials.マテリアル}
        />
      </group>
    </group>
  )
}

useGLTF.preload(eggModelUrl)
