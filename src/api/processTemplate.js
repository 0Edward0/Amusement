import axios from '@/utils/request'

const procTemplate = {
  getTemplateList: (queryCondition) => {
    return axios({
      method: 'post',
      url: '/processTemplate/list',
      // 此处注意data只适合post,put,patch
      data: queryCondition,
      // params` 是即将与请求一起发送的 URL 参数
      // params: queryCondition,
      // 后端为responseBody接收时必须要传入此类型 默认为application/x-www-form-urlencoded
      headers: {'Content-Type': ' application/json'}
    })
  },
  getTemplate: (id = 0) => {
    return axios.get(`/processTemplate/get/${id}`)
  },
  updateTemplate: (queryCondition) => {
    return axios({
      method: 'post',
      url: '/processTemplate/update',
      // 此处注意data只适合post,put,patch
      data: queryCondition,
      // params` 是即将与请求一起发送的 URL 参数
      // params: queryCondition,
      // 后端为responseBody接收时必须要传入此类型 默认为application/x-www-form-urlencoded
      headers: {'Content-Type': ' application/json'}
    })
  },
}
export default procTemplate
