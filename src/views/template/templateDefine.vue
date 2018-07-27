<template>
  <div>
  <!-- Form -->
  <el-dialog ref="dialog" title="模板信息" :visible.sync="dialogFormVisible" >
    <el-form ref="templateForm" :model="formData" :disabled="formDsiabled">
      <el-form-item label="流程模板KEY" :label-width="formLabelWidth">
        <el-input v-model="formData.key" disabled auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="流程模板名称" :label-width="formLabelWidth"  :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]">
        <el-input v-model="formData.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="description" label="流程模板描述" :label-width="formLabelWidth" :rules="{ required: true, message: '请填写描述', trigger: 'blur' }">
        <el-input v-model="formData.description" auto-complete="off" ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import msg from '@/utils/message'
import proc from '@/api/processTemplate'
export default {
  name: 'templateDefine-vue',
  props: ['dialogFormVisible', 'formData'],
  data () {
    return {
      formDsiabled: false,
      formLabelWidth: '120px'
    }
  },
  watch: {
    formData: function (val, oldval) {
      // console.info(`new:[${JSON.stringify(val)}] old :[${JSON.stringify(oldval)}]`)
    }
  },
  methods: {
    cancel: function () {
      debugger
      this.$props.formData
      // 父级传过来的参数,不能再改变,可以使用emit事件触发父级页面方法变更
      this.$emit('updateVisiable', false)
      this.$store.dispatch('updateAuthor', 'test')
      this.$store.dispatch('setLanguage', 'en')
      // 一次性传值.目标页刷新后就不存咋了.
      // this.$router.push({name: 'main', params: {routerParam: '我是通过router传过来的值'}})
      // 永久性传值,参数会写在url上:http://localhost:1111/#/?routerParam='我是通过router传过来的值'
      this.$router.push({name: 'main', query: {routerParam: '我是通过router传过来的值'}})
    },
    confirm: function () {
      let self = this
      debugger
      this.$refs['templateForm'].validate(valid => {
        if (valid) {
          self.$confirm('确认更改数据吗?').then(() => {
            proc.updateTemplate(self.formData).then(res => {
              self.$emit('updateVisiable', false)
            }).catch(() => {
              msg.message('模板保存失败,请重试', 'error')
            })
          }).catch(() => {})
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
