import request from '@/utils/request'


// 注册手机号账号
export function regInstitutionUnite(cellPhone,sendMterrcode,passwd,smsType,customerType) {
  const url = `/institutionUnite/regInstitutionUnite?cellPhone=${cellPhone}&sendMterrcode=${sendMterrcode}&passwd=${encodeURIComponent(passwd)}&smsType=${smsType}&customerType=${customerType}`
  console.log(url)
  const data = {
    cellPhone,
    sendMterrcode,
    passwd,
    smsType,
    customerType
  }
  return request({
    url: url,
    method: 'post',
    data
  })
}