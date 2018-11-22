import request from '@/utils/request'

export function changePwdByMobile(cellPhone,sendMterrcode,newPasswd) {
    const data = {
        cellPhone,
        sendMterrcode,
        newPasswd
    }
    return request({
      url: `/institutionUnite/changePwdByMobile?cellPhone=${cellPhone}&sendMterrcode=${sendMterrcode}&newPasswd=${encodeURIComponent(newPasswd)}`,
      method: 'post',
      data
    })
  }