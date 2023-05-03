export interface IFirstMenuParams {
  systemId: number
}

export interface IChildMenuParams {
  systemId: number
  id: number
}

export interface Menu {
  icon: string
  id: number
  name: string
  orderNum: number
  permission: string
  pid: number
  systemId: number
  type: number
  url: string
  valid: number
  thirdMenus: Menu[]
}
