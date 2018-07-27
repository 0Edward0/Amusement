<template>
  <div class="processTemplate">

    <el-row :gutter="12">

      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>

      <el-form ref="queryform" :model="queryform" label-width="80px">

          <el-col :span="4" >

            <el-form-item label="查询条件">
              <el-select v-model="queryform.selectCond" placeholder="请选择条件" @change="changeSelect">
                <el-option label="模板名称" value="tempName"></el-option>
                <el-option label="模板KEY" value="tempKey"></el-option>
              </el-select>
            </el-form-item>

          </el-col>

          <el-col :span="8" >

              <el-form-item label="模板名称">
                <el-input v-model="queryform.name" @change="changeSelect"></el-input>
              </el-form-item>

          </el-col>

      </el-form>

      <el-col :span="11">
        <el-button type="primary" icon="el-icon-search" @click="listTemplate">搜索</el-button>
      </el-col>

    </el-row>

    <el-table :data="templateData" :header-cell-style="headCell"  >

      <el-table-column prop="name" label="流程模板名称" width="150">
      </el-table-column>
      <el-table-column prop="description" label="流程模板描述" width="150">
      </el-table-column>
      <el-table-column prop="key" label="模板KEY" width="150">
      </el-table-column>
      <el-table-column prop="deploymentId" label="模板发布ID" width="120">
      </el-table-column>
      <el-table-column prop="version" label="流程版本" width="120">
      </el-table-column>
      <el-table-column prop="deployDate" label="发布时间">
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next,total"  @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" :total="templateTotal"> </el-pagination>

    <!--<el-button type="primary" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>-->
  <templateDefine :dialogFormVisible ="dialogFormVisible" :formData="formData" @updateVisiable="updateVisiable"></templateDefine>

  </div>
</template>
<script>
import proc from '@/api/processTemplate'
import msg from '@/utils/message'
import templateDefine from './templateDefine'

export default {
  name: 'processTemplate-vue',
  components: {templateDefine},
  data () {
    return {
      title: '流程模板',
      pageSizes: [100, 200],
      pageSize: 10,
      currentPage: 0,
      dialogFormVisible: false,
      templateTotal: 100,
      templateData: [],
      queryform: {selectCond: 'tempName'},
      queryCondition: {},
      formData: {}
    }
  },
  mounted () {
    // let vm = this
    // this.$root.bus.$on('asideToMain_test', (data) => {
    //   debugger
    //   console.info(data)
    //   vm.title = data
    // })
    // 请求加载模板数据
    this.listTemplate()
  },
  methods: {
    // 总数变动事件
    handleSizeChange: function (val) {
      console.log(`每页共 ${val} 条`)
      this.pageSize = val
      this.listTemplate()
    },
    // 页数变动事件
    handleCurrentChange: function (val) {
      console.log(`当前第 ${val} 页`)
      this.currentPage = val
      this.listTemplate()
    },
    // 表格头部显示样式
    headCell: function () {
      return 'text-align:center'
    },
    // 点击表格修改按钮
    handleEdit: function (index, row) {
      // this.$store.state.author = '更改用户'
      let self = this
      self.dialogFormVisible = true
      proc.getTemplate(row.key).then(res => {
        self.formData = res
      }).catch(() => {
        msg.message('数据请求失败', 'error')
      })

      self.formData = row
    },
    // 点击表格删除按钮
    handleDelete: function (index, row) {
      // 官方vuex更改状态方案
      this.$store.dispatch('updateAuthor', 'vuex官方')
      this.$router.push({name: 'processDeploy'})
    },
    // 查询方法
    listTemplate: function () {
      let self = this
      let queryCondition = {}
      queryCondition['currentPage'] = this.currentPage
      queryCondition['pageSize'] = this.pageSize
      queryCondition['param'] = this.queryCondition
      // proc.getTemplateList(param: JSON.stringify(queryCondition)}).then(res => {
      proc.getTemplateList(JSON.stringify(queryCondition)).then(res => {
        self.templateTotal = res.total
        self.templateData = res.data
      }).catch(() => {
        msg.message('数据请求失败', 'error')
      })
    },
    // 查询条件值改变事件
    changeSelect: function () {
      let selectCond = this.queryform.selectCond
      if (selectCond && selectCond === 'tempName') {
        delete this.queryCondition['key']
        this.queryCondition['name'] = this.queryform.name
      } else {
        delete this.queryCondition['name']
        this.queryCondition['key'] = this.queryform.name
      }
    },
    // 动态显示隐藏dialog
    updateVisiable: function (visiable) {
      this.dialogFormVisible = visiable
    }
  }
}
</script>

<style scoped lang="scss">
  .processTemplate {
    padding:50px 10px 0px 10px;
    .el-col {
      min-height: 36px;
    }
  }
</style>
