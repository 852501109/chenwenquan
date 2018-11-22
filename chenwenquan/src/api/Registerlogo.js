import request from '@/utils/request'
export function existCustomerUnite(cellPhone) {
    return request({
      url: '/customerUnite/existCustomerUnite',
      method: 'get',
      params: {cellPhone}
    })
}
//注册
export function register(cellPhone,sendMterrcode,mtmsgid,passwd) {
  return request({
    url: '/customerUnite/existCustomerUnite',
    method: 'get',
    params: {cellPhone,sendMterrcode,mtmsgid,passwd}
  })
}
export function loginByCode(cellPhone,sendMterrcode,mtmsgid) {
  const data = {
      cellPhone,
      sendMterrcode,
      mtmsgid
  }
  const url =  `/customerUnite/loginByCode?cellPhone=${cellPhone}&sendMterrcode=${sendMterrcode}&mtmsgid=${mtmsgid}`
  return request({
      url: url,
      method: 'post',
      data,
  })
}


//注册
export function loginByPwd(cellPhone,passwd) {
  const data = {
    cellPhone,
    passwd
  }
  const url =  `/customerUnite/loginByPwd?cellPhone=${cellPhone}&passwd=${passwd}`
  return request({
      url: url,
      method: 'post',
      data,
  })
}
//找回密码
export function updatePwd(cellPhone,sendMterrcode,mtmsgid,passwd) {
  const data = {
    cellPhone,
    sendMterrcode,
    mtmsgid,
    passwd
  }
  const url =  `/customerUnite/updatePwd?cellPhone=${cellPhone}&sendMterrcode=${sendMterrcode}&mtmsgid=${mtmsgid}&passwd=${passwd}`
  return request({
      url: url,
      method: 'post',
      data,
  })
}