import { useState } from 'react'
import { JsonType } from 'types/completeAnimation'
import { StatusParam } from 'types/status'
import technology from 'components/models/task/animation/config/anim_technology.json'
import plan from 'components/models/task/animation/config/anim_plan.json'
import motivation from 'components/models/task/animation/config/anim_motivation.json'

export const useSetWeaponJson = () => {
  const [json, setJson] = useState<JsonType>(technology)

  const setWeapon = (param: StatusParam) => {
    switch (param) {
      case 'technology':
        return setJson(technology)
      case 'plan':
        return setJson(plan)
      case 'motivation':
        return setJson(motivation)
      default:
        return setJson(technology)
    }
  }

  return { json, setWeapon }
}
