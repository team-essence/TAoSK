import React, { FC } from 'react'

/**
 * コンポーネントの遅延読み込み
 * Suspenseと合わせて使う
 *
 * @param {() => Promise<I>} factory
 * @param {K} name
 * @return {*}  
 * @example
  ```js
    const { MyPage } = lazyImport(() => import('pages/mypage/MyPage'), 'MyPage')
  ```
 */
export const lazyImport = <
  T extends React.ComponentType<FC>,
  I extends { [K2 in K]: T },
  K extends keyof I,
>(
  factory: () => Promise<I>,
  name: K,
): I => {
  return Object.create({
    [name]: React.lazy(() => factory().then(module => ({ default: module[name] }))),
  })
}
