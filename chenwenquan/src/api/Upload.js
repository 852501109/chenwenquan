import request from '@/utils/uploadRequest'
// 上传图片
export function uploadOriginal(extName,fileContent) {
    const data = {
        extName,
        fileContent
    }
    const url =  `/Image/uploadOriginal`
    return request({
        url: url,
        method: 'post',
        data,
    })
}
