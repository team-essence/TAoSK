import technology from 'components/models/task/animation/config/anim_sword.json'
import solution from 'components/models/task/animation/config/anim_arrow.json'
import achievement from 'components/models/task/animation/config/anim_gauntlet.json'
import plan from 'components/models/task/animation/config/anim_thor.json'
import motivation from 'components/models/task/animation/config/anim_rod.json'
import design from 'components/models/task/animation/config/anim_book.json'

export type JsonType =
  | typeof plan
  | typeof technology
  | typeof motivation
  | typeof solution
  | typeof achievement
  | typeof design
