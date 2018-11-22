import request from '@/utils/request'
// 获取验证码
export function getVerificationCode(cellPhone,smsType) {
    const data = {
        cellPhone,
        smsType
    }
    const url =  `/institutionSms/getVerificationCode?cellPhone=${cellPhone}&smsType=${smsType}`
    return request({
      url: url,
      method: 'post',
      data,
    })
}
//验证手机号是否存在
export function existInstitutionUnitet(cellPhone) {
    return request({
      url: '/institutionUnite/existInstitutionUnite',
      method: 'get',
      params:{cellPhone}
    })
}
// 查询邮件接口
export function getInstitutionEmailList(email) {
  return request({
    url: '/institutionEmail/getInstitutionEmailList',
    method: 'get',
    params:{email}
  })
}
//新增邮件接口
export function insertInstitutionEmail(email) {
  const data = {
    email
  }
  const url =  `/institutionEmail/insertInstitutionEmail?cellPhone=${email}`
  return request({
    url: url,
    method: 'post',
    data,
  })
}

