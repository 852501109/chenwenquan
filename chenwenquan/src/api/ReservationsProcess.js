import request from '@/utils/request'
// 医生端患者端我的咨询,复诊,全部
export function getDiagnosisConsultation(featureId,consultationState,customerId) {
    return request({
      url: '/customerConsultation/getList',
      method: 'get',
      params: { featureId,consultationState,customerId }
    })
  }
  
//中医咨询
export function insertFirstConsultation(customerId	,featureId ,consultationState ,body) {
    const data = {
        customerId,
        featureId,
        consultationState,
        body
    }
    const url =  `/customerConsultation/insertFirstConsultation?customerId=${customerId}&featureId=${featureId}&consultationState=${consultationState}&body=${body}`
    return request({
        url: url,
        method: 'post',
        data,
    })
}
// 推荐医生列表
export function getPatientDiagnosisConsultation(customerId,recommendPosition,recommendType) {
    return request({
      url: '/recommendCustomer/getList',
      method: 'get',
      params: { recommendPosition,recommendType,customerId }
    })
  }
// 获取预约患者列表
export function getReservationList(processFlag,searchId,featureId) {
    return request({
        url: '/customerReservation/getList',
        method: 'get',
        params: {processFlag ,searchId, featureId }
    })
}
// 无诊疗信息时调用接口
export function getConsultationCache(customerId) {
    return request({
        url: '/customerConsultation/getConsultationCache',
        method: 'get',
        params: {customerId }
    })
}
// 有诊疗信息,选中后调用接口
export function getConsultationWhereHasChat(consultationId) {
    return request({
        url: '/customerConsultationSub/getList',
        method: 'get',
        params: {consultationId }
    })
}
//患者问诊

export function insertCustomerConsultationSub(receiveFeatureId,fromCustomerId ,receiveCustomerId ,fromFeatureId,consultationState,body,consultationId,convType) {
    const data = {
        receiveFeatureId,
        fromCustomerId,
        receiveCustomerId,
        fromFeatureId,
        consultationState,
        body,
        consultationId,
        convType
    }
    const url =  `/customerConsultationSub/insertCustomerConsultationSub?receiveFeatureId=${receiveFeatureId}&fromCustomerId=${fromCustomerId}&receiveCustomerId=${receiveCustomerId}&fromFeatureId=${fromFeatureId}&consultationState=${consultationState}&body=${body}&consultationId=${consultationId}&convType=${convType}`
    return request({
        url: url,
        method: 'post',
        data,
    })
}
// 去咨询（患者--->医生）

export function insertFirstConsultationByDoctor(consultationSubId,institutionId,institutionName,doctorId,consultationId) {
    const data = {
        consultationSubId,
        institutionId,
        institutionName,
        doctorId,
        consultationId
    }
    const url =  `/customerConsultation/insertFirstConsultationByDoctor?consultationSubId=${consultationSubId }&institutionId=${institutionId}&doctorId=${doctorId}&consultationId=${consultationId}`
    return request({
        url: url,
        method: 'post',
        data,
    })
}
//医生详情

export function getDoctorById(customerId) {
    return request({
      url: '/customerAuth/getDoctorById',
      method: 'get',
      params: { customerId }
    })
}
//病情描述
export function insertReservation(customerId,symptom,patientFlag,patientName,birthday,sex,expectedStartTime,expectedEndTime,patientId,processFlag,reservationId,doctorId,patientMobile) {
    const data = {
        customerId,
        symptom,
        patientFlag,
        patientName,
        birthday,
        sex,
        expectedStartTime,
        expectedEndTime,
        patientId,
        processFlag,
        reservationId,
        doctorId,
        patientMobile
    }
    const url =  `customerReservation/insertReservation?customerId=${customerId}&symptom=${symptom}&patientFlag=${patientFlag}&patientName=${patientName}&birthday=${birthday}&sex=${sex}&expectedStartTime=${expectedStartTime}&expectedEndTime=${expectedEndTime}&patientId=${patientId}&processFlag=${processFlag}&reservationId=${reservationId}&doctorId=${doctorId}&patientMobile=${patientMobile}`
    return request({
        url: url,
        method: 'post',
        data,
    })
}
// 获取医生预约时间

export function getScheduleInfoList(institutionId,customerId,weekCode,) {
    return request({
      url: '/customerSchedule/getScheduleInfoList',
      method: 'get',
      params: { institutionId, customerId ,weekCode}
    })
}



export function getCustomerPatientList(customerId,limit) {
    return request({
      url: '/customerPatient/getCustomerPatientList',
      method: 'get',
      params: { customerId,limit}
    })
}
//获取患者列表接口

export function getCustomerPatient(customerId) {
    return request({
      url: '/customerPatient/getList',
      method: 'get',
      params: {customerId}
    })
}