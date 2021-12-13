import { GetProjectQuery } from 'pages/projectDetail/projectDetail.gen'

export type Allocation =
  GetProjectQuery['getProjectById']['lists'][number]['tasks'][number]['allocations'][number]['user']

export type Task = Omit<
  GetProjectQuery['getProjectById']['lists'][number]['tasks'][number],
  'allocations' | 'completed_flg'
> & {
  allocations: Allocation[]
}

export type Occupation = Allocation['occupation']

export type SearchTask = {
  title: string
  lint_index: number
  tasks: Task[]
  isTask: boolean
}
