import { useState } from 'react'
import { JsonType } from 'types/completeAnimation'
import { StatusParam } from 'types/status'
import technology from 'components/models/task/animation/config/anim_sword.json'
import solution from 'components/models/task/animation/config/anim_arrow.json'
import achievement from 'components/models/task/animation/config/anim_gauntlet.json'
import plan from 'components/models/task/animation/config/anim_thor.json'
import motivation from 'components/models/task/animation/config/anim_rod.json'
import design from 'components/models/task/animation/config/anim_book.json'

export const useSetWeaponJson = () => {
  const [json, setJson] = useState<JsonType>(technology)

  const setWeapon = (param: StatusParam) => {
    switch (param) {
      case 'technology':
        return setJson(technology)
      case 'solution':
        return setJson(solution)
      case 'achievement':
        return setJson(achievement)
      case 'plan':
        return setJson(plan)
      case 'motivation':
        return setJson(motivation)
      case 'design':
        return setJson(design)
    }
  }

  return { json, setWeapon }
}
