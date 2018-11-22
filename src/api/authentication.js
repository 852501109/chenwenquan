import request from '@/utils/request'
// 机构用户认证
export function auth(institutionId,siteId,state) {
    const data = {
        institutionId,
        siteId,
        state
    }
    const url =  `/institutionAuth/auth?institutionId=${institutionId}&siteId=${siteId}&state=${state}`
    return request({
      url: url,
      method: 'post',
      data,
    })
}
// 机构认证填写基本信息
export function insertInstitutionBaseinfo(institutionName,legalPerson,institutionAddress,institutionDesc,institutionId) {
    const data = {
        institutionName,
        legalPerson,
        institutionAddress,
        institutionDesc,
        institutionId
    }
    const url =  `/institutionBaseinfo/insertInstitutionBaseinfo?institutionName=${institutionName}&legalPerson=${legalPerson}&institutionAddress=${institutionAddress}&institutionDesc=${institutionDesc}&institutionId=${institutionId}`
    return request({
      url: url,
      method: 'post',
      data,
    })
}
// 机构个人认证
export function insertInstitutionAuth(institutionId,siteId,state) {
    const data = {
        institutionId,
        siteId,
        state
    }
    const url =  `/institutionAuth/insertInstitutionAuth?institutionId=${institutionId}&siteId=${siteId}&state=${state}`
    return request({
      url: url,
      method: 'post',
      data,
    })
}

export function getInstitutionAuthById(institutionId) {
    return request({
      url: '/institutionAuth/getInstitutionAuthById',
      method: 'get',
      params: { institutionId }
    })
  }
