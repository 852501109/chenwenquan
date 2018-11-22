import request from '@/utils/request'

  export function getInstitutionAuthById(id) {
    return request({
      url: '/get/getInstitutionAuthById',
      method: 'get',
      params: { id }
    })
  }
  export function getInstitutionAuthList(query) {
    return request({
      url: '/institutionAuth/getInstitutionAuthList',
      method: 'get',
      params: query
    })
  }