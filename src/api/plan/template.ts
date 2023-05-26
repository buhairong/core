import instance from '../base'
import type {
  ITemplateSearch,
  ITemplateList,
  financialSchemeRecordForSetTemplate,
  ITemplateRecord
} from '@/types'

// 查询分页数据
export function getTemplateList(data: ITemplateSearch) {
  return instance<ITemplateList, ITemplateList>({
    url: '/manager/carSubscribeTemplate/listByPage',
    method: 'POST',
    data
  })
}

// 启用、停用模板
export function carSubscribeTemplateEnable(data: { status: number; templateId: number }) {
  return instance({
    url: '/manager/carSubscribeTemplate/enable',
    method: 'PUT',
    data
  })
}

// 删除产品模板
export function carSubscribeTemplateDelete(data: number[]) {
  return instance({
    url: '/manager/carSubscribeTemplate/delete',
    method: 'POST',
    data
  })
}

// 查询指定类型的金融方案
export function selectFinancialScheme(params: { applyService: number }) {
  return instance<financialSchemeRecordForSetTemplate[], financialSchemeRecordForSetTemplate[]>({
    url: '/manager/carSubscribeTemplate/selectFinancialSchemeByType',
    method: 'GET',
    params
  })
}

// 新增产品模板
export function carSubscribeTemplateAdd(data: ITemplateRecord) {
  return instance({
    url: '/manager/carSubscribeTemplate/add',
    method: 'POST',
    data
  })
}

// 修改产品模板
export function carSubscribeTemplateUpdate(data: ITemplateRecord) {
  return instance({
    url: '/manager/carSubscribeTemplate/update',
    method: 'PUT',
    data
  })
}
