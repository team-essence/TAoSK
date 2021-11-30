export type avatarGroups = {
  __typename?: 'Group' | undefined
  id: string
  user: {
    __typename?: 'User' | undefined
    id: string
    name: string
    icon_image: string
    occupation_id: number
  }
}[]
