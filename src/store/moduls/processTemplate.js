import proc from '@/api/processTemplate'

// 模板相关模块存储
const processTemplate = {
  state: {
    // 模板数据
    procTemplateList: [],
    procTemplate: {}
  },
  mutations: {
    GET_TEMPLATELIST: (state, list) => {
      state.procTemplateList = list
    },
    SET_TEMPLATE: (state, template) => {
      state.procTemplate = template
    }
  },
  actions: {
    getTemplateList: ({commit}, queryCondition) => {
      return new Promise((resolve, reject) => {
        // 处理查询方法
        proc.getTemplateList(queryCondition).then(res => {
          commit('GET_TEMPLATELIST', res)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getTemplate: ({commit}, template) => {
      commit('SET_TEMPLATE', template)
    }
  }

}
export default processTemplate
