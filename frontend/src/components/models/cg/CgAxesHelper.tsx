import React, { FC } from 'react'

// TODO: Three.js内で使用するためFCXは使用しない
export const CgAxesHelper: FC = () => {
  // TODO: 開発モード時のみ表示
  if (process.env.NODE_ENV !== 'production') {
    return <axesHelper />
  } else {
    return <></>
  }
}
