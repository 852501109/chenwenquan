import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/institutionUnite/updateInstitutionUnite',
    method: 'get',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function loginByCode(cellPhone,sendMterrcode) {
  const data = {
    cellPhone,
    sendMterrcode
  }
  return request({
    url: `/institutionUnite/loginByCode?cellPhone=${cellPhone}&sendMterrcode=${sendMterrcode}`,
    method: 'post',
    data
  })
}

export function loginByPwd(cellPhone,passwd) {
  const data = {
    cellPhone,
    passwd
  }
  return request({
    url: `/institutionUnite/loginByPwd?cellPhone=${cellPhone}&passwd=${encodeURIComponent(passwd)}`,
    method: 'post',
    data
  })
}
