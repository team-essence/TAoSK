export type Allocation = {
  id: string
  name: string
  icon_image: string
  occupation_id: number
}

export type Task = {
  id: string
  title: string
  overview: string
  technology: number
  achievement: number
  solution: number
  motivation: number
  plan: number
  design: number
  vertical_sort: number
  end_date: string
  chatCount: number
  allocations: Allocation[]
}

export type SearchTask = {
  title: string
  lint_index: number
  tasks: Task[]
  isTask: boolean
}
