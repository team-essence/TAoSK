import { GetProjectQuery } from 'pages/projectDetail/projectDetail.gen'

export type Groups = Pick<GetProjectQuery['getProjectById'], 'groups'>
