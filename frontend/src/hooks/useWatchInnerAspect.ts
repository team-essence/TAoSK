import { useEffect, useState } from 'react'

type UseWatchInnerAspectReturn = { aspect: number }

export const useWatchInnerAspect = (side: 'width' | 'height'): UseWatchInnerAspectReturn => {
  const [aspect, setAspect] = useState<number>(0)

  useEffect(() => {
    const updateAspect = () => {
      setAspect(side === 'width' ? window.innerWidth : window.innerHeight)
    }

    updateAspect()
    window.addEventListener('resize', updateAspect)
    return () => window.removeEventListener('resize', updateAspect)
  }, [side])

  return { aspect }
}
