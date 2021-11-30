import { Task } from './task'

export type List = {
  id: string
  list_id: string
  sort_id: string
  index: number
  title: string
  tasks: Task[]
}
